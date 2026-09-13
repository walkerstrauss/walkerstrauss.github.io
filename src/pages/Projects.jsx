import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';

const groups = [
  {
    heading: "AI & interactive systems",
    items: [
      {
        title: "AUI",
        label: "Augmented Intelligence · Current",
        description: "Deploying and governing AI agents on Apollo-1, AUI's neuro-symbolic foundation model, for enterprise and regulated-industry customers.",
        to: "/aui",
      },
      {
        title: "AICap",
        label: "Onki AI",
        description: "A multimodal AI wine recommendation kiosk built for Onki AI.",
        to: "/projects/aicap",
      },
      {
        title: "Savoring Weather Clock",
        label: "Meta Design Lab",
        description: "Arduino-based interactive clock merging weather data, AI, and psychology.",
        to: "/projects/weather-clock",
      },
    ],
  },
  {
    heading: "Games",
    items: [
      {
        title: "Mah's Jong",
        label: "Cornell · Game Design",
        description: "Competitive Mahjong-inspired 1v1 strategy game built in C++/CUGL.",
        to: "/projects/mahsjong",
      },
      {
        title: "Death of a Deal",
        label: "Shiny Burger Studios",
        description: "A Java/LibGDX physics platformer exploring narrative-driven decision making.",
        to: "/projects/death-of-a-deal",
      },
      {
        title: "Tojiba Crash",
        label: "Sanko Game Corp",
        description: "Web-based game inspired by Nanaca Crash, developed at Sanko Game Corp.",
        to: "/projects/tojiba-crash",
      },
    ],
  },
];

export default function Projects() {
  return (
    <Page className="projects-container">
      <div>
        <span className="cs-eyebrow">Selected work</span>
        <h1 className="cs-title">Projects</h1>
        <p className="cs-subtitle">
          AI products and interactive systems, built end to end from research
          through implementation.
        </p>
      </div>

      {groups.map((group) => (
        <React.Fragment key={group.heading}>
          <h2 className="cs-index-group">{group.heading}</h2>
          <div className="cs-index">
            {group.items.map((p) => (
              <Link key={p.to} to={p.to} className="cs-index-item">
                <div className="cs-index-label">{p.label}</div>
                <div>
                  <h3 className="cs-index-title">{p.title}</h3>
                  <p className="cs-index-desc">{p.description}</p>
                </div>
                <span className="cs-index-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </React.Fragment>
      ))}

      <div className="cs-links">
        <Link to="/research" className="project-link">Browse research →</Link>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </Page>
  );
}
