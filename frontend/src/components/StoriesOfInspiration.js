import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/StoriesOfInspiration.css';
import api from '../utils/axiosConfig'; 

function StoriesOfInspiration() {
  // State to store form data for story submission
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    yourStory: '',
    image: null,
  });
  // State to store success message after submitting story
  const [successMessage, setSuccessMessage] = useState('');
  // State to store error message if submission fails
  const [errorMessage, setErrorMessage] = useState('');
  // State to store the list of approved stories
  const [stories, setStories] = useState([]);
  // State to store the current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State to manage dropdown visibility for logout
  const [showDropdown, setShowDropdown] = useState(false);
  const cardsPerPage = 9;
  const navigate = useNavigate();

  // Fetch approved stories on component mount
  useEffect(() => {
    const fetchApprovedStories = async () => {
      try {
        const response = await axios.get('/approved-stories');
        setStories(response.data);
      } catch (error) {
        console.error("Failed to fetch approved stories", error);
      }
    };
    fetchApprovedStories();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change for image
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle story submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('yourStory', formData.yourStory);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.post('/submit-story', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        setSuccessMessage('Thank you! Your story has been successfully submitted.');
        setFormData({
          name: '',
          email: '',
          yourStory: '',
          image: null,
        });
        setTimeout(() => setSuccessMessage(''), 5000); // Clear success message after 5 seconds
      }
    } catch (error) {
      setErrorMessage('Failed to submit story. Please try again.');
      setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
        await api.get('/logout'); // Send a request to the backend logout endpoint
        navigate('/login'); // Redirect to login page
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

  // Pagination logic to determine which stories to display
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = stories.slice(indexOfFirstCard, indexOfLastCard);

  // Handle moving to the next page of stories
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  // Handle moving to the previous page of stories
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <div className="stories-page">
      {/* Navbar */}
      <header className="navbar">
        <Link to="/home"><img src="/grow_to_impress_logo.png" alt="logo" className="logo" /></Link>
        <div className="navbar-links">
          <Link to="/how-to-section" className="nav-link">LEARN HOW TO</Link>
          <Link to="/chatbot" className="nav-link">IXIA</Link>
          <Link to="/resources" className="nav-link">GUIDES</Link>
          <Link to="/stories" className="nav-link active">STORIES OF INSPIRATION</Link>
        </div>
        <div className="three-dots-menu" onClick={() => setShowDropdown(!showDropdown)}>
          &#x22EE; {/* Vertical ellipsis (three dots) */}
        </div>
        {showDropdown && (
          <div className="dropdown-menu">
            <button onClick={handleLogout} className="dropdown-link">Logout</button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="stories-content-container">
        <div className="submission-container">
          <h1>Stories of Inspiration</h1>
          <h2>Share Your Journey and Inspire Others</h2>
          <p>We're excited to feature stories of resilience, growth, and achievement from our community. If you have a story that could inspire others, we would love to hear it!</p>
          
          {/* Story submission form */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="yourStory"
              placeholder="Share your story here..."
              value={formData.yourStory}
              onChange={handleChange}
              required
            ></textarea>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
            />
            <button type="submit">Submit Story</button>
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
        </div>

        {/* Gallery of approved stories */}
        <div className="stories-gallery">
          {currentCards.map(story => (
            <Link key={story.id} to={`/story/${story.id}`} className="story-card-link">
              <div className="story-card">
                <img src={story.image} alt="User submitted" />
                <div>
                  <h3>{story.name}</h3>
                  <p>{story.story.substring(0, 100)}...</p> {/* Truncated for preview */}
                </div>
              </div>
            </Link>
          ))}

          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={nextPage} disabled={indexOfLastCard >= stories.length}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoriesOfInspiration;