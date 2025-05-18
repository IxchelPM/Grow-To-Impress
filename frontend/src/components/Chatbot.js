import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Chatbot.css';
import api from '../utils/axiosConfig'; 

function Chatbot() {
  // State to hold messages between the user and the bot
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' }
  ]);
  // State to hold the user's current input
  const [userInput, setUserInput] = useState('');
  // State to handle dropdown visibility for logout
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Scroll to the latest message whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Updates user input as they type
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Sends the user's message to the bot and handles the response
  const handleSend = () => {
    if (userInput.trim()) {
      // Adds user's message to messages list
      const newMessages = [...messages, { sender: 'user', text: userInput }];
      setMessages(newMessages);
      setUserInput('');

      // Sends user's message to the backend
      fetch('/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Adds bot's response to messages list
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: data.response },
          ]);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  // Handles user logout
  const handleLogout = async () => {
    try {
      await api.get('/logout'); // Requests logout from backend
      navigate('/login'); // Redirects to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      {/* Navbar with links to other pages */}
      <header className="navbar">
        <Link to="/home"><img src="/grow_to_impress_logo.png" alt="logo" className="logo" /></Link>
        <div className="navbar-links">
          <Link to="/how-to-section" className="nav-link">LEARN HOW TO</Link>
          <Link to="/chatbot" className="nav-link active">IXIA</Link>
          <Link to="/resources" className="nav-link">GUIDES</Link>
          <Link to="/stories" className="nav-link">STORIES OF INSPIRATION</Link>
        </div>
        {/* Three dots menu for logout */}
        <div className="three-dots-menu" onClick={() => setShowDropdown(!showDropdown)}>
          &#x22EE; {/* Vertical ellipsis */}
        </div>
        {showDropdown && (
          <div className="dropdown-menu">
            <button onClick={handleLogout} className="dropdown-link">Logout</button>
          </div>
        )}
      </header>

      {/* Chat interface */}
      <div className="chat-canvas">
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.sender === 'bot' && (
                <img
                  src="/Gemini_Generated_Image_6opy9e6opy9e6opy.jpg"
                  className="avatar"
                  alt="Bot Avatar"
                />
              )}
              <div className="message-content">{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Reference for scrolling to the latest message */}
        </div>
        <div className="typing-area">
          <div className="typing-form">
            {/* Input for user messages */}
            <input
              type="text"
              className="typing-input"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            {/* Button to send message */}
            <button id="send-message-button" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
