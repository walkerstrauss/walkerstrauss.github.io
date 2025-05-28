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
  return <h2 className="page">Projects Page (Coming Soon)</h2>;
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