import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../styles/Resources.css';
import api from '../utils/axiosConfig'; 

function Resources() {
  // State to store URL input
  const [url, setUrl] = useState('');
  // State to store video summary
  const [summary, setSummary] = useState(null);
  // State to indicate loading status
  const [loading, setLoading] = useState(false);
  // State to store error message
  const [error, setError] = useState(null);
  // State to store selected topic
  const [selectedTopic, setSelectedTopic] = useState("Ted Talk Summarization");
  // State to store guide content
  const [guideContent, setGuideContent] = useState(null);
  // State to manage dropdown visibility for logout
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // List of example TED Talk links
  const exampleLinks = [
    { title: "A guide to believing in yourself (but for real this time) -  Catherine Reitman", url: "https://www.youtube.com/watch?v=jpRqbP9Nv9k" },
    { title: "Don't Believe Everything You Think - Lauren Weinstein", url: "https://www.youtube.com/watch?v=Xdhmgp4IUL0" },
    { title: "Get comfortable with being uncomfortable - Luvvie Ajayi Jones", url: "https://www.youtube.com/watch?v=QijH4UAqGD8" },
    { title: "The Likability Dilemma for Women Leaders - Robin Hauser", url: "https://www.youtube.com/watch?v=T2I4tus05hI" },
    { title: "Six behaviors to increase your confidence - Emily Jaenson", url: "https://www.youtube.com/watch?v=IitIl2C3Iy8" },
    { title: "What it takes to be a great leader - Roselinde Torres", url: "https://www.youtube.com/watch?v=aUYSDEYdmzw" },
    { title: "What makes you special? - Mariana Atencio", url: "https://www.youtube.com/watch?v=MY5SatbZMAo" },
    { title: "Why we have too few women leaders - Sheryl Sandberg", url: "https://www.youtube.com/watch?v=18uDutylDa4" },
    { title: "You are contagious - Vanessa Van Edwards", url: "https://www.youtube.com/watch?v=cef35Fk7YD8" },
  ];

  // Log URL updates whenever URL changes
  useEffect(() => {
    if (url) {
      console.log("URL updated:", url);
    }
  }, [url]);

  // Handle submission of input URL
  const handleInputSubmit = async (e) => {
    e.preventDefault();
    await submitUrl(url);
  };

  // Handle click of example TED Talk link
  const handleExampleSubmit = async (exampleUrl) => {
    setUrl(exampleUrl);
    console.log("Example URL clicked:", exampleUrl); // Log the example URL clicked
    await submitUrl(exampleUrl);
  };

  // Function to submit URL for summarization
  const submitUrl = async (submitUrl) => {
    setLoading(true);
    setError(null);
    setSummary(null);

    if (!submitUrl) {
      setError("URL cannot be empty. Please enter a valid URL.");
      setLoading(false);
      return;
    }

    console.log("Full request body being sent to summarize-video:", JSON.stringify({ url: submitUrl })); // Log the URL being sent

    try {
      const response = await fetch('/summarize-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: submitUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to summarize video. Please check the URL or try again.");
      }

      const data = await response.json();
      setSummary(data.summary);
      setUrl(''); // Clear URL input after submission
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch guide content with retry mechanism
  const fetchGuideWithRetry = async (endpoint, maxRetries = 5) => {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          const markdownData = await response.text();
          try {
            // Try parsing as JSON if possible
            const parsedData = JSON.parse(markdownData);
            if (parsedData.guide) {
              return parsedData.guide;
            }
          } catch (e) {
            // If parsing fails, assume it's already markdown
            return markdownData;
          }
        }
      } catch (error) {
        console.error("Error fetching guide:", error);
      }
      retries += 1;
    }
    throw new Error("Failed to load guide content after multiple attempts.");
  };

  // Handle selection of a topic to load corresponding guide
  const handleTopicSelect = async (topic) => {
    setSelectedTopic(topic);
    setGuideContent(null); // Reset content when a new topic is selected
    setSummary(null); // Clear summary when switching topics
    setLoading(true);
    setError(null);

    // Check if the guide is already stored in sessionStorage
    const cachedGuide = sessionStorage.getItem(`guide_${topic}`);
    if (cachedGuide) {
      setGuideContent(cachedGuide);
      setLoading(false);
      return;
    }

    let endpoint;
    if (topic === "Mentorship") {
      endpoint = "/generate-mentorship-guide";
    } else if (topic === "Women in Management") {
      endpoint = "/generate-resources";
    } else if (topic === "Scholarships") {
      endpoint = "/generate-scholarship-guide";
    } else if (topic === "Google Resources") {
      setGuideContent(`Additional Google resources: Learn Faster, Study Smarter

Our product uses Gemini, Google's super smart AI, to help you with your journey! Gemini can answer your questions, summarize notes, and even turn your PDFs into podcasts! 🤯 Check out [NotebookLM](https://notebooklm.google.com/) and the [Gemini](https://gemini.google.com/app) platform for more awesome AI tools. ✨`);
      setLoading(false);
      return;
    }

    if (endpoint) {
      try {
        const guide = await fetchGuideWithRetry(endpoint);
        setGuideContent(guide);
        sessionStorage.setItem(`guide_${topic}`, guide); // Store guide in sessionStorage
      } catch (error) {
        console.error("Error fetching guide:", error);
        setError("Error fetching guide content. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false); // Ensure loading is set to false if no fetch is needed
    }
  };

  // Handles user logout
  const handleLogout = async () => {
    try {
        // Send a request to the backend logout endpoint
        await api.get('/logout');
        navigate('/login');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

  return (
    <div className="resources-page">
      {/* Navbar from the first version */}
      <header className="navbar">
        <Link to="/home">
          <img src="/grow_to_impress_logo.png" alt="logo" className="logo" />
        </Link>
        <div className="navbar-links">
          <Link to="/how-to-section" className="nav-link">LEARN HOW TO</Link>
          <Link to="/chatbot" className="nav-link">IXIA</Link>
          <Link to="/resources" className="nav-link active">GUIDES</Link>
          <Link to="/stories" className="nav-link">STORIES OF INSPIRATION</Link>
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
  
      {/* Content Container */}
      <div className="resources-content-container">
        <div className="topics-list">
          <ul>
            <li
              className={selectedTopic === "Ted Talk Summarization" ? "selected" : ""}
              onClick={() => handleTopicSelect("Ted Talk Summarization")}
            >
              Ted Talk Summarization
            </li>
            <li
              className={selectedTopic === "Mentorship" ? "selected" : ""}
              onClick={() => handleTopicSelect("Mentorship")}
            >
              Mentorship
            </li>
            <li
              className={selectedTopic === "Women in Management" ? "selected" : ""}
              onClick={() => handleTopicSelect("Women in Management")}
            >
              Women in Management
            </li>
            <li
              className={selectedTopic === "Scholarships" ? "selected" : ""}
              onClick={() => handleTopicSelect("Scholarships")}
            >
              Scholarships
            </li>
            <li
              className={selectedTopic === "Google Resources" ? "selected" : ""}
              onClick={() => handleTopicSelect("Google Resources")}
            >
              Google Resources
            </li>
          </ul>
        </div>
  
        <div className="main-content">
          {/* TED Talk Summarization Section */}
          {selectedTopic === "Ted Talk Summarization" && (
            <div className="submission-area">
              <h2>Submit a TED Talk for Summarization</h2>
              <p className="greeting-message">
                Start your journey with these inspiring TED Talks! Just click on any video to see a quick summary and get tips to reach the goals they talk about. If there’s another TED Talk you’re interested in, just drop the YouTube link, and we’ll pull together everything for you!
              </p>
              <p className="note">
                <em>Note: Getting your TED Talk summaries takes a little time! The length of the video affects how long it’ll take – for example, a 15-minute video usually takes about a minute and a half to get the summary ready :) So, hang tight, and we’ll have the highlights sent over soon!</em>
              </p>
              <form onSubmit={handleInputSubmit}>
                <div className="input-group">
                  <input
                    type="url"
                    placeholder="Enter TED Talk URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                  <button type="submit" disabled={loading}>Submit</button>
                </div>
              </form>
  
              {/* Example Links Section */}
              <div className="example-links">
                <h3>Example TED Talks</h3>
                <ul>
                  {exampleLinks.map((example, index) => (
                    <li key={index}>
                      <button
                        className="example-link"
                        onClick={() => handleExampleSubmit(example.url)}
                      >
                        {example.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
  
              {/* Display summary and messages only if URL has been submitted */}
              {loading && <p className="loading-message">Loading summary...</p>}
              {error && <p className="error-message">{error}</p>}
              {summary && (
                <div className="summary-result">
                  <h3>Video Summary</h3>
                  <ReactMarkdown>{summary}</ReactMarkdown>
                </div>
              )}
            </div>
          )}
  
          {/* Guide Content Section */}
          {selectedTopic !== "Ted Talk Summarization" && (
            <div>
              {loading && <p className="loading-message">Loading {selectedTopic} guide...</p>}
              {guideContent && (
                <div className="guide-content">
                  <h3>{selectedTopic} Guide</h3>
                  <ReactMarkdown>{guideContent}</ReactMarkdown>
                </div>
              )}
              {error && <p className="error-message">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Resources;