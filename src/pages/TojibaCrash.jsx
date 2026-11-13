import React from 'react';
import { Link } from 'react-router-dom';
import { CaseLayout } from '../components/case/Case.jsx';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import TojibaCrashImg from '../assets/tojiba-crash/tojiba-crash.png';

export default function TojibaCrash() {
  return (
    <Page className="cs-page">
      <div className="cs-hero">
        <span className="cs-eyebrow">Sanko Game Corp</span>
        <h1 className="cs-title">Tojiba Crash</h1>
        <p className="cs-subtitle">A web-based game inspired by Nanaca Crash, built for a client in HTML5, CSS, and JavaScript.</p>
      </div>

      <CaseLayout>
      <Reveal as="section" className="cs-section">
        <h2>Overview</h2>

        <p>
          Tojiba Crash is a browser game built at <em>Sanko Game Corp</em> in HTML5, CSS and JavaScript, inspired by <em>Nanaca Crash</em>. I managed development against the client’s specifications and feedback.
        </p>

         <div 
            className="project-image"
            style={{ margin: '2rem 0' }}
        >
            <img 
            src={TojibaCrashImg} 
            alt="A screenshot of Tojiba Crash gameplay."
            style={{
                width: '100%',
                maxWidth: '400px'
            }}
            />
        </div>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Working with the client</h2>
        <p>
          Each week I sent the client a summary of new features and coordinated revisions from their input. The project used Git for version control.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Game feel</h2>
        <p>
          I worked on the physics, graphics and interactions, adjusting character motion and impact mechanics through playtesting to keep the fast, chaotic feel of the original.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-links">
        <a
          href="https://github.com/walkerstrauss/nanaca-crash-clone"
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          View on GitHub →
        </a>
        <Link to="/" className="back-link">← Back to home</Link>
      </Reveal>

      </CaseLayout>
    </Page>
  );
}