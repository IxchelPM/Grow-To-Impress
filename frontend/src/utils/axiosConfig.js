// src/api.js
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
