import React, { useEffect, useState } from 'react'; 
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/StoryDetail.css';
import api from '../utils/axiosConfig'; 

function StoryDetail() {
  const { id } = useParams(); // Get the story ID from the route parameters
  const [story, setStory] = useState(null); // State to store the story details
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility for logout
  const navigate = useNavigate();

  // Fetch the story details when the component mounts or when the ID changes
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`/story/${id}`); // Fetch story by ID
        console.log("Story data:", response.data); // Log response data
        setStory(response.data); // Set the story data
      } catch (error) {
        console.error("Failed to fetch story", error); // Handle errors in fetching
      }
    };
    fetchStory();
  }, [id]);

  // Handle user logout
  const handleLogout = async () => {
    try {
        await api.get('/logout'); // Send a request to the backend logout endpoint
        navigate('/login'); // Redirect to login page
    } catch (error) {
        console.error('Logout failed:', error); // Log any errors
    }
  };

  // Display loading message if story is not yet loaded
  if (!story) return <p>Loading story...</p>;

  // Extract image URL if available
  const imageUrl = story.image ? story.image : null;

  return (
    <div className="story-detail-page">
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
      
      {/* Story Details */}
      <div className="story-detail-container">
        {imageUrl && <img src={imageUrl} alt="User submitted" />} {/* Display image if available */}
        <h1>{story.name}</h1> {/* Display story author's name */}
        <p>{story.story}</p> {/* Display full story text */}
      </div>
    </div>
  );
}

export default StoryDetail;
