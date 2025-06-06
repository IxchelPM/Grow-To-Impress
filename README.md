# Grow to Impress

A web platform designed to empower young girls (ages 14–19) with personal development tools, AI support, and mentorship guidance, especially in male-dominated fields like tech.
Built by first-generation college students, **Grow to Impress** helps girls build confidence, gain skills, and find mentorship. Our mission supports **UN Sustainable Development Goal 5**: *Achieve gender equality and empower all women and girls*.

## Features

* AI-powered personal growth assistant (IXIA), 21-day habit-building goal guides, and TED Talk summarization tool
* Mentorship and scholarship resources
* Leadership networking guide
* Real-world stories from women in tech
* Clean, accessible UI and progress tracking

## Sections Overview

### Learn How To

Six interactive 21-day guides to help users:

* **Build a Club** – Learn how to form a community at school or college  
* **Earn Certifications** – Find free online courses and programs  
* **Build Confidence** – Daily prompts and mindset exercises  
* **Recognize Healthy Relationships** – Understand support vs. toxicity  
* **Save Your First $1,000** – Learn financial literacy basics  
* **Improve Communication** – Practice assertive and effective speaking  

Includes a built-in daily progress tracker.

### IXIA - Your AI Accountability Partner

* Available 24/7 for personalized guidance
* Offers encouragement, goal tracking, and resources
* Provides a safe space to dream and grow
* Built using **Google AI API**, integrated into the web app

### Guides

Resources to support personal and professional growth:

* **TED Talk Summarizer** – Submit a YouTube link and get key insights
* **Mentorship Finder** – Curated links to help find mentors
* **Women in Management** – Step-by-step LinkedIn networking guide
* **Scholarship Planner** – Track and access education funding

### Stories of Inspiration

* Real stories and photos from women in tech
* Encouraging messages and career advice
* LinkedIn profiles for connection
* Highlights diverse paths to success

## Development Workflow

### Model Development

* Prompt testing in Google Colab using Python and Jupyter Notebooks
* Final model integrated into the backend

### Frontend Integration
* Built with React
* Connected to Flask API routes for AI and backend functionality

### UI/UX Design
* Pastel-themed visuals (flowers, leaves, elegant clipart)
* Mobile-friendly and user-focused design

## AI and Safety
* Default safety and temperature settings used
* All prompts are designed to be safe, supportive, and empowering

##  Tech Stack

*   **Backend:**
    *   Python
    *   Flask (Web Framework)
    *   SQLite (Database)
    *   Google Generative AI (Gemini API for AI features)
    *   Flask-Bcrypt (Password Hashing)
    *   Flask-CORS (Cross-Origin Resource Sharing)
    *   `yt-dlp` (YouTube video downloading)
    *   Pillow (Image processing)
*   **Frontend:**
    *   React.js
    *   JavaScript 
    *   HTML5 & CSS3
    *   Axios (HTTP Client)
    *   React Router (Client-side routing)
*   **Development:**
    *   Node.js & npm (Frontend package management & build)
