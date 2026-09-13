import React from 'react';
import { Link } from 'react-router-dom';
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

      <Reveal as="section" className="cs-section">
        <h2>Overview</h2>

        <p>
          <strong>Tojiba Crash</strong> is a web-based video game developed at <em>Sanko Game Corp</em>, built using
          HTML5, CSS, and JavaScript. I managed the development process to align with the client’s specifications and
          iterative feedback, ensuring that every build reflected both the technical requirements and the creative
          spirit of the original inspiration, <em>Nanaca Crash</em>.
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
        <h2>Development and Collaboration</h2>
        <p>
          I worked within a structured development cycle that emphasized responsive communication and iterative updates.
          Each week, I provided summaries of newly implemented features and coordinated revisions based on client input.
          Using Git for version control, I followed established best practices for collaborative development, ensuring
          clean commits, maintainable code, and consistent build stability across environments.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Design and Technical Refinement</h2>
        <p>
          My work focused on refining the game’s physics, graphics, and interactive systems to deliver a smooth and
          polished user experience. Through ongoing testing and gameplay analysis, I balanced responsiveness and visual
          clarity, adjusting character motion and impact mechanics to preserve the energetic and chaotic feel that made
          the original browser game, <em>Nanaca Crash</em>, so memorable. Each iteration brought the game closer to a
          faithful but modernized reimagining of the classic.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Outcome</h2>
        <p>
          The final version of <strong>Tojiba Crash</strong> met client expectations for playability, visual style, and
          overall polish. The project demonstrated my ability to manage an external development pipeline, merge
          technical precision with creative vision, and deliver a complete web-based game experience that honored the
          tone and mechanics of its source material.
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
        <Link to="/projects" className="back-link">← Back to Projects</Link>
      </Reveal>

    </Page>
  );
}