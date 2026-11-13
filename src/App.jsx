// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import './App.css';

import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Research from './pages/Research.jsx';
import AUI from './pages/AUI.jsx';
import AUIPayments from './pages/AUIPayments.jsx';
import AUIReferenceAgents from './pages/AUIReferenceAgents.jsx';

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
        <Route path="/aui/payments" element={<AUIPayments />} />
        <Route path="/aui/reference-agents" element={<AUIReferenceAgents />} />
        {/* The leave case moved into the reference agents case; keep its old address working. */}
        <Route path="/aui-employee-leave" element={<Navigate to="/aui/reference-agents" replace />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/research" element={<Research />} />
        <Route path="/projects/aicap" element={<AICap />} />
        <Route path="/projects/mahsjong" element={<Mahsjong />} />
        <Route path="/projects/weather-clock" element={<WeatherClock />} />
        <Route path="/projects/death-of-a-deal" element={<DeathOfADeal />} />
        <Route path="/research/fmri-study" element={<FmriStudy />} />
        <Route path="/research/visual-vs-textual" element={<VisualVsTextual />} />
        <Route path="/projects/tojiba-crash" element={<TojibaCrash />} />
        {/* Every route above is linked from the site. Anything else, including
            the addresses of pages that have been retired, goes home. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

/*
 * Three sections that don't overlap. Work: the case studies from jobs (AUI,
 * Onki), which lead the home page. Projects: prototypes and games. Research:
 * the psychology and neuroscience studies. A case study lights the section it
 * belongs to, wherever its address happens to sit.
 */
const WORK_PATHS = ['/', '/aui', '/aui/payments', '/aui/reference-agents', '/projects/aicap'];

function Navbar() {
  const { pathname } = useLocation();
  const inWork = WORK_PATHS.includes(pathname);
  /* On the home page the name is the headline, so the header leaves it out. */
  return (
    <nav className="navbar">
      <Link to="/" className="logo" data-hidden={pathname === '/' ? 'true' : undefined}>Walker Strauss</Link>
      <div className="nav-links">
        <NavLink to="/" end className={() => (inWork ? 'active' : undefined)}>Work</NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => (isActive && !inWork ? 'active' : undefined)}
        >
          Projects
        </NavLink>
        <NavLink to="/research">Research</NavLink>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2026 Walker Strauss. All rights reserved.</p>
    </footer>
  );
}

function App() {
  return (
    /* reducedMotion="user" makes every animation below respect the OS setting.
       The CSS media query in App.css covers hover and focus transitions. */
    <MotionConfig reducedMotion="user">
      <Router>
        <header className="site-header">
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