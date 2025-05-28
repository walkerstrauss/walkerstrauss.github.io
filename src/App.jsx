// src/App.jsx
import React from 'react';
import { useState } from 'react';
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
    }, 
    {
      title: "Death of a Deal",
      description: "Desktop game developed in Java and LibGDX. Contributed to software development, core mechanic design, artistic direction and asset creation.",
      link: "https://github.com/zachseidner1/death-of-a-deal"
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
      <div style={{ marginTop: '2rem' }}>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  );
}

function Research() {
  const researchItems = [
    {
      title: "fMRI Study on Food Imagery and the Hypothalamus",
      role: "Affect and Cognition Lab · Cornell University",
      description:
        "Analyzed functional connectivity using fMRI to investigate how the hypothalamus evaluates food-related stimuli. Led participant onboarding, task execution, and MRI data preprocessing.",
      year: "2023 – Present"
    },
    {
      title: "Visual vs. Textual Environmental Education Study",
      role: "Independent Research · Cornell University",
      description:
        "Surveyed Cornell undergraduates to compare the impact of visual and textual materials on environmental attitudes using SPSS for data analysis.",
      year: "2023"
    }
  ];

  return (
    <div className="projects-container">
      <h2>Research</h2>
      <div className="projects-grid">
        {researchItems.map((item, index) => (
          <div key={index} className="project-card">
            <h3>{item.title}</h3>
            <p><strong>{item.role}</strong></p>
            <p>{item.description}</p>
            <p style={{ fontStyle: 'italic', color: '#666' }}>{item.year}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  );
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