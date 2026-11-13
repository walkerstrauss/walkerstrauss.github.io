import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';

/* Case studies from jobs (AUI, Onki) live under Work on the home page. */
const groups = [
  {
    heading: "Physical computing",
    items: [
      {
        title: "Savoring Weather Clock",
        label: "Meta Design Lab",
        description: "A home device that turns live weather into a prompt to notice it.",
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
        description: "Project lead on a two-player strategy game built in C++ on the CUGL framework.",
        to: "/projects/mahsjong",
      },
      {
        title: "Death of a Deal",
        label: "Cornell · Game Design",
        description: "A physics platformer built in Java with LibGDX by a team of nine.",
        to: "/projects/death-of-a-deal",
      },
      {
        title: "Tojiba Crash",
        label: "Sanko Game Corp",
        description: "A browser game built for a client in HTML5, CSS and JavaScript.",
        to: "/projects/tojiba-crash",
      },
    ],
  },
];

export default function Projects() {
  return (
    <Page className="projects-container">
      <div>
                <h1 className="cs-title">Projects</h1>
        <p className="cs-subtitle">
          A physical-computing prototype and three games, from Cornell and a client project.
        </p>
      </div>

      {groups.map((group) => (
        <React.Fragment key={group.heading}>
          <h2 className="cs-index-group">{group.heading}</h2>
          <Reveal className="cs-index" stagger>
            {group.items.map((p) => (
              <Reveal.Item as={Link} key={p.to} to={p.to} className="cs-index-item">
                <div className="cs-index-label">{p.label}</div>
                <div>
                  <h3 className="cs-index-title">{p.title}</h3>
                  <p className="cs-index-desc">{p.description}</p>
                </div>
                <span className="cs-index-arrow" aria-hidden="true">→</span>
              </Reveal.Item>
            ))}
          </Reveal>
        </React.Fragment>
      ))}

      <div className="cs-links">
        <Link to="/research" className="project-link">Browse research →</Link>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </Page>
  );
}
