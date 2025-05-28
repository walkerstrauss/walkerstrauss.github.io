// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Walker Strauss</h1>
        <p className="tagline">Psychologist · Game Developer · Researcher · Designer</p>

        <nav className="nav-links">
          <Link to="/projects">Projects</Link>
          <Link to="/research">Research</Link>
          <Link to="/artwork">Artwork</Link>
          <Link to="/blog">Blog</Link>
        </nav>
      </div>
    </div>
  );
}

function Projects() {
   const projectData = [
    {
      title: "Mah's Jong",
      description: "Mobile game developed in C++ and CUGL, led a team of 5 programmers and 3 designers. Features action tiles and strategic multiplayer gameplay.",
      link: "https://github.com/walkerstrauss/mahsjong"
    },
    {
      title: "Savoring Weather Clock",
      description: "Arduino-based device that pulls weather data and generates poetic messages. Uses OpenWeather + OpenAI API to encourage eco-awareness and gratitude.",
      link: "https://github.com/walkerstrauss/weather-clock-savoring"
    }
  ];

  return (
    <div className="projects-container">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projectData.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function Research() {
  return <h2 className="page">Research Page (Coming Soon)</h2>;
}

function Artwork() {
  return <h2 className="page">Artwork Page (Coming Soon)</h2>;
}

function Blog() {
  return <h2 className="page">Blog Page (Coming Soon)</h2>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/research" element={<Research />} />
        <Route path="/artwork" element={<Artwork />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;