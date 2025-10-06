import React from 'react';
import { Link } from 'react-router-dom';

export default function Mahsjong() {
  return (
    <div className="projects-container">
      <div className="project-page">
        <h2>Mah's Jong</h2>
      <p>
        Competitive Mahjong-inspired game built in C++ using the CUGL engine. I led programming and gameplay design for this 1v1 strategy game with custom tile effects, animations, and tutorial scenes.
      </p>

      <h3>My Role</h3>
      <ul>
        <li>Lead developer and designer</li>
        <li>Implemented animation controller and scene system</li>
        <li>Directed playtesting and polish for final release</li>
      </ul>

      <h3>Technologies</h3>
      <p>C++, CUGL, JSON</p>

      <p>
        GitHub: <a href="https://github.com/walkerstrauss/mahsjong" target="_blank" rel="noopener noreferrer">https://github.com/walkerstrauss/mahsjong</a>
      </p>

        <div style={{ marginTop: '2rem' }}>
          <Link to="/projects" className="back-link">← Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}


