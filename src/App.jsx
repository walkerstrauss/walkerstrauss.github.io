// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ThemeToggle from "./components/ThemeToggle.jsx";

import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Research from './pages/Research.jsx';
import Artwork from './pages/Artwork.jsx';
import Blog from './pages/Blog.jsx';

import AICap from './pages/AICap.jsx';
import Mahsjong from './pages/Mahsjong.jsx';
import WeatherClock from './pages/WeatherClock.jsx';
import DeathOfADeal from './pages/DeathOfADeal.jsx';
import FmriStudy from './pages/FmriStudy.jsx';
import VisualVsTextual from './pages/VisualVsTextual.jsx';
import TojibaCrash from './pages/TojibaCrash.jsx';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Walker Strauss</Link>
      <div className="nav-links">
        <Link to="/projects">Projects</Link>
        <Link to="/research">Research</Link>
        <Link to="/artwork">Artwork</Link>
        <Link to="/blog">Blog</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2025 Walker Strauss. All rights reserved.</p>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/research" element={<Research />} />
          <Route path="/artwork" element={<Artwork />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects/aicap" element={<AICap />} />
          <Route path="/projects/mahsjong" element={<Mahsjong />} />
          <Route path="/projects/weather-clock" element={<WeatherClock />} />
          <Route path="/projects/death-of-a-deal" element={<DeathOfADeal />} />
          <Route path="/research/fmri-study" element={<FmriStudy />} />
          <Route path="/research/visual-vs-textual" element={<VisualVsTextual />} />
          <Route path="/projects/tojiba-crash" element={<TojibaCrash />} />
        </Routes>
      </main>
        <Footer />
    </Router>
  );
}

export default App;