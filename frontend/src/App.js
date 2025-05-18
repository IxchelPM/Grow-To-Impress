import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HowToSection from './components/HowToSection';
import StoriesOfInspiration from './components/StoriesOfInspiration';
import StoryDetail from './components/StoryDetail';
import Resources from './components/Resources';
import Chatbot from './components/Chatbot';
import HomePage from './components/HomePage';
import Logout from './components/Logout'; 
function App() {
  console.log("App component loaded");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default to Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/stories" element={<StoriesOfInspiration />} />
        <Route path="/story/:id" element={<StoryDetail />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/how-to-section" element={<HowToSection />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/logout" component={Logout} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
