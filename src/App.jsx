// src/App.jsx
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
} from 'react-router-dom';
import './App.css';
import ThemeToggle from "./components/ThemeToggle.jsx";

import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Research from './pages/Research.jsx';
import Blog from './pages/Blog.jsx';
import AUI from './pages/AUI.jsx';

import AICap from './pages/AICap.jsx';
import Mahsjong from './pages/Mahsjong.jsx';
import WeatherClock from './pages/WeatherClock.jsx';
import DeathOfADeal from './pages/DeathOfADeal.jsx';
import FmriStudy from './pages/FmriStudy.jsx';
import VisualVsTextual from './pages/VisualVsTextual.jsx';
import TojibaCrash from './pages/TojibaCrash.jsx';

// React Router keeps the scroll position across route changes; reset it so each
// page opens at its title rather than partway down the previous page.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Walker Strauss</Link>
      <div className="nav-links">
        <NavLink to="/aui">Work</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/research">Research</NavLink>
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
      <ScrollToTop />
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aui" element={<AUI />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/research" element={<Research />} />
          {/* Reachable by URL; hidden from the navbar until it has a post. */}
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