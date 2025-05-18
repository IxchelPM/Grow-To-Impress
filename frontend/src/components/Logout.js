import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  // Handles the logout process
  const handleLogout = () => {
    // Logic to clear user session or token goes here
    console.log("User has been logged out");
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="logout-page">
      {/* Navbar with links to other pages */}
      <header className="navbar">
        <Link to="/home">
          <img src="/grow_to_impress_logo.png" alt="logo" className="logo" />
        </Link>
        <div className="navbar-links">
          <Link to="/how-to-section" className="nav-link">LEARN HOW TO</Link>
          <Link to="/chatbot" className="nav-link">IXIA</Link>
          <Link to="/resources" className="nav-link">GUIDES</Link>
          <Link to="/stories" className="nav-link">STORIES OF INSPIRATION</Link>
        </div>
      </header>

      {/* Logout confirmation content */}
      <div className="logout-content-container">
        <h1>Are you sure you want to log out?</h1>
        <button onClick={handleLogout} className="logout-button">Yes, Logout</button> {/* Button to confirm logout */}
        <Link to="/home" className="cancel-link">No, go back to home</Link> {/* Link to cancel logout and return to home page */}
      </div>
    </div>
  );
}

export default Logout;
