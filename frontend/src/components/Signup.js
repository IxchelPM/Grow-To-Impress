import React, { useState } from 'react';
import api from '../utils/axiosConfig'; // Import the API instance
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Import the CSS file

function Signup() {
  // State to store email input
  const [email, setEmail] = useState('');
  // State to store password input
  const [password, setPassword] = useState('');
  // State to store confirm password input
  const [confirmPassword, setConfirmPassword] = useState('');
  // State to store error messages
  const [error, setError] = useState('');
  // State to store success message
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handles the signup process
  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    console.log("Attempting signup with:", { email, password });

    try {
      // Make API call to signup endpoint
      const response = await api.post('/signup', { email, password });
      console.log("Signup response:", response);

      if (response.status === 201) {
        setMessage('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.response?.data?.error || 'Signup failed.');
    }
  };

  return (
    <div className="container">
      <div className="welcome-section">
        <h2>Welcome to GROW TO IMPRESS – Your Journey Begins Here!</h2>
        <p>We believe in the power of young women like you to lead, innovate, and achieve.</p>
        <p>Whether you’re here to build new skills, find guidance, or get inspired, know that this platform is crafted with heart and purpose. We’ve created every resource with you in mind, helping you unlock your full potential, one step at a time.</p>
      </div>
      <div className="right-section">
        {/* Signup form */}
        <form onSubmit={handleSignup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your Password"
            required
          />
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button type="submit">Sign Up</button>
          {error && <p className="error">{error}</p>} {/* Display error message if any */}
          {message && <p className="message">{message}</p>} {/* Display success message */}
          <div className="login-link">
            <p>Already have an account? <a href="/login">Log in</a></p> {/* Link to login page */}
          </div>
        </form>
      </div>  
    </div>
  );
}

export default Signup;
