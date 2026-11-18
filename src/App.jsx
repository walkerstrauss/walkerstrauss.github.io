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
import SupportAgents from './pages/SupportAgents.jsx';

import AICap from './pages/AICap.jsx';
import Mahsjong from './pages/Mahsjong.jsx';
import WeatherClock from './pages/WeatherClock.jsx';
import FmriStudy from './pages/FmriStudy.jsx';
import PolicyAgents from './pages/PolicyAgents.jsx';
import './ground.css';

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
        <Route path="/work/support-agents" element={<SupportAgents />} />
        <Route path="/work/policy-agents" element={<PolicyAgents />} />
        <Route path="/projects" element={<Navigate to="/" replace />} />
        <Route path="/research" element={<Navigate to="/" replace />} />
        <Route path="/projects/aicap" element={<AICap />} />
        <Route path="/projects/mahsjong" element={<Mahsjong />} />
        <Route path="/projects/weather-clock" element={<WeatherClock />} />
        <Route path="/projects/death-of-a-deal" element={<Navigate to="/" replace />} />
        <Route path="/research/fmri-study" element={<FmriStudy />} />
        <Route path="/research/visual-vs-textual" element={<Navigate to="/" replace />} />
        <Route path="/projects/tojiba-crash" element={<Navigate to="/" replace />} />
        {/* Every route above is linked from the site. Anything else, including
            the addresses of pages that have been retired, goes home. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

/* The header is the name and how to reach him. The work is all on the home
   page, so there are no section links. */
const CONTACTS = [
  { label: 'Email', href: 'mailto:walkerstrauss@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/walkerstrauss' },
  { label: 'GitHub', href: 'https://github.com/walkerstrauss' },
];

function Navbar({ nameHidden = false }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo" data-hidden={nameHidden ? 'true' : undefined} tabIndex={nameHidden ? -1 : undefined} aria-hidden={nameHidden || undefined}>Walker Strauss</Link>
      <div className="nav-links">
        {CONTACTS.map((c) => (
          <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer">{c.label}</a>
        ))}
      </div>
    </nav>
  );
}

/* Every page opens on an ink cover. The header takes the cover's ground
   while the cover is under it and turns to paper once the cover has scrolled
   away, so the top of a page is one surface. */
function SiteHeader() {
  const { pathname } = useLocation();
  const [onCover, setOnCover] = React.useState(true);
  const bar = React.useRef(null);
  React.useEffect(() => {
    const main = document.querySelector('main');
    let frame = 0;
    const measure = () => {
      frame = 0;
      const page = main?.firstElementChild;
      /* Between two pages there is nothing to measure: keep the last state. */
      if (!page) return;
      const cover = page.querySelector('.cover');
      if (!cover) { setOnCover(false); return; }
      /* Where the cover is laid out, not where it is drawn: a page slides
         a little as it arrives, and its drawn box would be read mid-slide. */
      let top = 0;
      for (let el = cover; el; el = el.offsetParent) top += el.offsetTop;
      const line = window.scrollY + bar.current.offsetHeight;
      setOnCover(line >= top - 1 && line < top + cover.offsetHeight);
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    const pages = new MutationObserver(queue);
    if (main) pages.observe(main, { childList: true });
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      pages.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <header className="site-header" ref={bar} data-on-cover={onCover ? 'true' : undefined}>
      {/* The home cover already shows the name at display size, so the header
          keeps its own back until the cover has scrolled away. */}
      <Navbar nameHidden={pathname === '/' && onCover} />
    </header>
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
        <SiteHeader />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </Router>
    </MotionConfig>
  );
}

export default App;