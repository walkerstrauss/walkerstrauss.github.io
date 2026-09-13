// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
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

/*
 * Routes live inside AnimatePresence so each page's exit variant runs before
 * the next one mounts. mode="wait" keeps the two from overlapping, and the
 * scroll reset fires in onExitComplete: doing it in an effect on the incoming
 * page would yank the viewport while the outgoing page was still visible.
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
    >
      <Routes location={location} key={location.pathname}>
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
    </AnimatePresence>
  );
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
    /* reducedMotion="user" makes every animation below respect the OS setting.
       The CSS media query in App.css covers hover and focus transitions. */
    <MotionConfig reducedMotion="user">
      <Router>
        <header>
          <Navbar />
        </header>
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </Router>
    </MotionConfig>
  );
}

export default App;