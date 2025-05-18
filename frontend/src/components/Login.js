import React, { useState } from 'react'; 
import api from '../utils/axiosConfig'; 
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'; // Import the CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handles login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Attempt login with '/' endpoint
      let response = await api.post('/', { email, password });
      console.log("Login response from '/' endpoint:", response);

      if (response.status === 200) {
        navigate('/home'); // Navigate to home page on success
        return;
      }
    } catch (error) {
      console.log("Failed login at '/' endpoint. Trying '/login'.", error);
    }

    try {
      // If login with '/' fails, attempt login with '/login' endpoint
      let response2 = await api.post('/login', { email, password });
      console.log("Login response from '/login' endpoint:", response2);

      if (response2.status === 200) {
        navigate('/home'); // Navigate to home page on success
      } else {
        setError('Invalid credentials'); // Display error for invalid credentials
      }
    } catch (error) {
      console.error("Login error:", error);
      setError('Invalid credentials'); // Set error message if login fails
    }
  };

  return (
    <div className="container">
      {/* Welcome Section (Left) */}
      <div className="welcome-section">
        <h2>Welcome to GROW TO IMPRESS – Your Journey Begins Here!</h2>
        <p>We believe in the power of young women like you to lead, innovate, and achieve.</p>
        <p>Whether you’re here to build new skills, find guidance, or get inspired, know that this platform is crafted with heart and purpose. We’ve created every resource with you in mind, helping you unlock your full potential, one step at a time.</p>
      </div>
      {/* Sign In Section (Right) */}
      <div className="sign-in-section">
        <form onSubmit={handleLogin}>
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
          <button type="submit">Sign In</button>
          {error && <p className="error">{error}</p>} {/* Displays error message if login fails */}
          <div className="forgot-password">
          <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <div className="signup-link">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
