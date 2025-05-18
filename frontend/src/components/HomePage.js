import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import api from '../utils/axiosConfig'; 

function HomePage() {
    // State to handle dropdown visibility for logout
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    // Array of motivational quotes to display
    const quotes = [
        "Don't let anyone rob you of your imagination, your creativity, or your curiosity. – Mae Jemison",
        "I was taught that the way of progress was neither swift nor easy. – Marie Curie",
        "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence. – Helen Keller",
        "Success isn’t about how much money you make; it’s about the difference you make in people’s lives. – Michelle Obama",
        "Do not wait for someone else to come and speak for you. It's you who can change the world. – Malala Yousafzai"
    ];

    // Selects a random quote from the list to display
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // Handles user logout
    const handleLogout = async () => {
        try {
            await api.get('/logout'); // Sends request to backend to logout
            navigate('/login'); // Redirects to login page
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div id="home-page-container">
            {/* Navbar with links to other pages */}
            <header id="home-navbar">
                <Link to="/home">
                    <img src="/grow_to_impress_logo.png" alt="logo" className="logo" />
                </Link>
                <div className="navbar-links">
                    <Link to="/how-to-section" className="nav-link">LEARN HOW TO</Link>
                    <Link to="/chatbot" className="nav-link">IXIA</Link>
                    <Link to="/resources" className="nav-link">GUIDES</Link>
                    <Link to="/stories" className="nav-link">STORIES OF INSPIRATION</Link>
                    {/* Three dots menu for logout */}
                    <div className="three-dots-menu" onClick={() => setShowDropdown(!showDropdown)}>
                        &#x22EE; {/* Vertical ellipsis */}
                    </div>
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout} className="dropdown-link">Logout</button>
                        </div>
                    )}
                </div>
            </header>
            {/* Main content of the home page */}
            <div className="home-content-container">
                <p>Welcome to Grow to Impress! Here, you will find a wealth of resources to help you grow, both personally and professionally. Explore our sections to learn new skills, get inspired by others, and find the support you need on your journey.</p>
                <p className="quote">{randomQuote}</p> {/* Displays a random motivational quote */}
            </div>
            {/* Section for 'Learn How To' */}
            <div className="section" id="how-to-section">
                <img src="/Gemini_Generated_Image_6ze6ir6ze6ir6ze6.jpeg" alt="How To" className="section-image" />
                <div className="section-text">
                    <h3><Link to="/how-to-section">LEARN HOW TO</Link></h3>
                    <p>The Learn How to section is a 21-day guide to help you achieve specific goals by forming new habits. Each day you complete, a flower symbolizing your progress will grow, with the goal of making it bloom fully at the end of the 21 days. Simply select a goal, check off each completed day, and watch as your habit-building journey unfolds, rewarding you with a blooming flower at the finish line! 🌸</p>
                </div>
            </div>
            {/* Section for 'IXIA Chatbot' */}
            <div className="section" id="chatbot-section">
                <img src="/Gemini_Generated_Image_ghgrbkghgrbkghgr.jpeg" alt="IXIA Chatbot" className="section-image" />
                <div className="section-text">
                    <h3><Link to="/chatbot">IXIA</Link></h3>
                    <p>Interact with IXIA, an AI chatbot that provides motivational support and personalized guidance to help you stay on track with your goals.</p>
                </div>
            </div>
            {/* Section for 'Guides' */}
            <div className="section" id="guides-section">
                <img src="/Gemini_Generated_Image_kxn534kxn534kxn5.jpeg" alt="Guides" className="section-image" />
                <div className="section-text">
                    <h3><Link to="/resources">GUIDES</Link></h3>
                    <p>Access a variety of educational resources and step-by-step guides tailored to help you achieve both personal and professional goals.</p>
                </div>
            </div>
            {/* Section for 'Stories of Inspiration' */}
            <div className="section" id="stories-section">
                <img src="/Gemini_Generated_Image_wnz0xvwnz0xvwnz0.jpeg" alt="Stories of Inspiration" className="section-image" />
                <div className="section-text">
                    <h3><Link to="/stories">STORIES OF INSPIRATION</Link></h3>
                    <p>Read real-life stories of inspiration from people who have overcome challenges and made a difference. Let their experiences motivate you on your own journey.</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

