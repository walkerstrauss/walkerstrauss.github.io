import React from 'react';
import { Link } from 'react-router-dom';

export default function Projects() {
  const projects = [
    {
      title: "AICap",
      description: "A multimodal AI wine recommendation kiosk built for Onki AI.",
      to: "/projects/aicap"
    },
    {
      title: "Mah’s Jong",
      description: "Competitive Mahjong-inspired 1v1 strategy game built in C++/CUGL.",
      to: "/projects/mahsjong"
    },
    {
      title: "Savoring Weather Clock",
      description: "Arduino-based interactive clock merging weather data, AI, and psychology.",
      to: "/projects/weather-clock"
    },
    {
      title: "Death of a Deal",
      description: "A Java/LibGDX game exploring narrative-driven decision making.",
      to: "/projects/death-of-a-deal"
    }
  ];

  return (
    <div className="projects-container">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((p) => (
          <div key={p.to} className="project-card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <Link to={p.to}>View Project →</Link>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  );
}


