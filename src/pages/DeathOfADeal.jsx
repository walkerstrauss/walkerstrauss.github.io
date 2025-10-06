import React from 'react';
import { Link } from 'react-router-dom';

export default function DeathOfADeal() {
  return (
    <div className="projects-container">
      <div className="project-page">
        <h2>Death of a Deal</h2>
      <p>
        A Java/LibGDX game exploring narrative-driven decision making. I contributed to gameplay programming, mechanic design, art direction, and asset creation.
      </p>

      <h3>My Role</h3>
      <ul>
        <li>Developed gameplay systems and logic</li>
        <li>Created visual assets and directed tone</li>
        <li>Collaborated across code and art pipelines</li>
      </ul>

      <h3>Technologies</h3>
      <p>Java, LibGDX</p>

      <p>
        GitHub: <a href="https://github.com/zachseidner1/death-of-a-deal" target="_blank" rel="noopener noreferrer">https://github.com/zachseidner1/death-of-a-deal</a>
      </p>

        <div style={{ marginTop: '2rem' }}>
          <Link to="/projects" className="back-link">← Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}


