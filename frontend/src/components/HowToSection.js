import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/HowToSection.css';

function HowToSection({ userId }) {
  const [selected, setSelected] = useState("Building Your Club");
  const [guide, setGuide] = useState([]);
  const [checkedDays, setCheckedDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [flowerSizes, setFlowerSizes] = useState(new Array(6).fill(20));
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // List of available topics for guides
  const topics = useCallback(() => [
    "Building Your Club",
    "Getting Certifications and Courses",
    "Building Confidence",
    "Recognizing Healthy Relationships",
    "Saving Your First $1,000",
    "Improving Communication Skills"
  ], []);

  // Fetch guide and user progress based on selected topic
  const fetchGuideAndProgress = useCallback(async (goalIndex) => {
    setLoading(true);
    const selectedTopic = topics()[goalIndex];
  
    try {
      const response = await axios.get(`/get-guide/${selectedTopic}`);
      let rawResponse = response.data;
  
      if (typeof rawResponse === "string") {
         rawResponse = rawResponse.replace(/```json|```/g, '').trim();
  
        try {
           rawResponse = JSON.parse(rawResponse);
        } catch (parseError) {
          console.error("Failed to parse cleaned response:", parseError);
          throw new Error("Invalid JSON format after cleaning");
        }
      }
  
      const guideResponse = rawResponse.daily_guide;
  
      if (guideResponse) {
        const guideData = guideResponse.guide;
        setGuide(guideData);
  
        const progressResponse = await axios.post('/get-user-progress', { user_id: userId });
        const userProgress = progressResponse.data.progress || {};
  
        const completedDays = userProgress[selectedTopic]
          ? userProgress[selectedTopic].filter(day => day.completed).map(day => day.day)
          : [];
  
        setCheckedDays(completedDays);
  
        setFlowerSizes(prevSizes =>
          prevSizes.map((size, index) => Math.min(20 + completedDays.length * 2, 50))
        );
  
        const firstIncompleteDayIndex = guideData.findIndex(day => !completedDays.includes(day.day));
        setCurrentDayIndex(firstIncompleteDayIndex >= 0 ? firstIncompleteDayIndex : guideData.length - 1);
      } else {
        console.error("Guide data not found in the response.");
      }
    } catch (error) {
      console.error("Error fetching guide or progress:", error);
    }
    setLoading(false);
  }, [userId, topics]);
  
  
  
  // Fetch guide and progress whenever selected topic changes
  useEffect(() => {
    const goalIndex = topics().indexOf(selected);
    fetchGuideAndProgress(goalIndex);
  }, [selected, userId, fetchGuideAndProgress, topics]);

  // Handle checkbox to update completed days
  const handleCheckboxChange = async (day) => {
    setIsUpdating(true);
    const updatedCheckedDays = checkedDays.includes(day)
      ? checkedDays.filter(d => d !== day)
      : [...checkedDays, day];

    setCheckedDays(updatedCheckedDays);
    setFlowerSizes(prevSizes => prevSizes.map((size, index) => Math.min(20 + updatedCheckedDays.length * 2, 50)));
    setCurrentDayIndex((prevIndex) => Math.min(prevIndex + 1, guide.length - 1));

    try {
      await axios.post('/update-day-completion', {
        user_id: userId,
        topic: selected,
        day,
        completed: updatedCheckedDays.includes(day)
      });
    } catch (error) {
      console.error("Failed to update day completion status:", error);
    }
    setIsUpdating(false);
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await axios.get('/logout'); // Sends request to backend to logout
      navigate('/login'); // Redirects to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const currentDay = guide[currentDayIndex];

  // Component for rendering a flower icon representing progress
  const Flower = ({ size }) => {
    const intensity = Math.min((size - 20) / 30, 1);
    const petalColor = interpolateColor('#FFC0CB', '#FF1493', intensity);
    const centerColor = interpolateColor('#FFD700', '#FF8C00', intensity);
    const stemColor = interpolateColor('#90EE90', '#228B22', intensity);

    return (
      <svg width={size * 2} height={size * 3} viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stem */}
        <path d="M50 150 C 40 100, 60 80, 50 50" stroke={stemColor} strokeWidth="4" fill="none" />
        
        {/* Symmetric Leaves positioned lower on the stem */}
        <path d="M50 120 C 40 110, 30 100, 40 90" fill={stemColor} /> {/* Left leaf */}
        <path d="M50 120 C 60 110, 70 100, 60 90" fill={stemColor} /> {/* Right leaf */}
        
        {/* Flower head */}
        <g transform="translate(50, 50) scale(0.5)">
          {[0, 60, 120, 180, 240, 300].map((rotation, index) => (
            <path key={index} d="M0 0 C30 -50 70 -50 100 0 C70 50 30 50 0 0" fill={petalColor} transform={`rotate(${rotation})`} />
          ))}
          <circle cx="0" cy="0" r="10" fill={centerColor} />
        </g>
      </svg>
    );
  };

  return (
    <div className="how-to-section">
      {/* Navbar */}
      <header className="navbar">
        <Link to="/home"><img src="/grow_to_impress_logo.png" alt="logo" className="logo" /></Link>
        <div className="navbar-links">
          <Link to="/how-to-section" className="nav-link active">LEARN HOW TO</Link>
          <Link to="/chatbot" className="nav-link">IXIA</Link>
          <Link to="/resources" className="nav-link">GUIDES</Link>
          <Link to="/stories" className="nav-link">STORIES OF INSPIRATION</Link>
          <div className="three-dots-menu" onClick={() => setShowDropdown(!showDropdown)}>
            &#x22EE; {/* Vertical ellipsis (three dots) */}
          </div>
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={handleLogout} className="dropdown-link">Logout</button>
            </div>
          )}
        </div>
      </header>

      {/* Content Container */}
      <div className="how-to-content-container">
        <div className="how-to-topics-list">
          <ul>
            {topics().map(topic => (
              <li
                key={topic}
                onClick={() => { setSelected(topic); setCurrentDayIndex(0); setCheckedDays([]); }}
                className={selected === topic ? "selected" : ""}
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="how-main-content">
          {/* Flower Row Above the Day Item Content */}
          <div className="flower-row" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            {flowerSizes.map((size, index) => (
              <Flower key={index} size={size} />
            ))}
          </div>

          <h2>{selected}: 21-Day Plan</h2>
          {loading ? (
            <p>Loading guide...</p>
          ) : currentDay ? (
            <div className={`day-item ${checkedDays.includes(currentDay.day) ? 'completed' : ''}`}>
              <div className="day-title">
                <input
                  type="checkbox"
                  checked={checkedDays.includes(currentDay.day)}
                  onChange={() => handleCheckboxChange(currentDay.day)}
                  disabled={isUpdating}
                />
                <span>Day {currentDay.day}: {currentDay.title}</span>
              </div>
              <ul className="approaches">
                {currentDay.approaches.map((approach, index) => (
                  <li key={index}>{approach}</li>
                ))}
              </ul>
              <div className="navigation-buttons">
                <button className="prev-button" onClick={() => setCurrentDayIndex(currentDayIndex - 1)} disabled={currentDayIndex === 0}>
                  &#8592;
                </button>
                <button className="next-button" onClick={() => setCurrentDayIndex(currentDayIndex + 1)} disabled={currentDayIndex === guide.length - 1}>
                  &#8594;
                </button>
              </div>
            </div>
          ) : (
            <p>All days completed! 🎉</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to interpolate between two colors
function interpolateColor(color1, color2, factor) {
  const parse = (c) => parseInt(c, 16);
  const r1 = parse(color1.slice(1, 3)), g1 = parse(color1.slice(3, 5)), b1 = parse(color1.slice(5, 7));
  const r2 = parse(color2.slice(1, 3)), g2 = parse(color2.slice(3, 5)), b2 = parse(color2.slice(5, 7));
  const r = Math.round(r1 + factor * (r2 - r1)).toString(16).padStart(2, '0');
  const g = Math.round(g1 + factor * (g2 - g1)).toString(16).padStart(2, '0');
  const b = Math.round(b1 + factor * (b2 - b1)).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

export default HowToSection;
