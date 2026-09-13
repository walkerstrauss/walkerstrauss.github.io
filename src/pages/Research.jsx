import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';

const researchItems = [
  {
    title: "fMRI Study on Food Imagery and the Hypothalamus",
    label: "2023 – 2025",
    role: "Affect and Cognition Lab · Cornell University",
    description:
      "Analyzed functional connectivity using fMRI to investigate how the hypothalamus evaluates food-related stimuli. Led participant onboarding, task execution, and MRI data preprocessing.",
    path: "/research/fmri-study",
  },
  {
    title: "Visual vs. Textual Environmental Education Study",
    label: "2023",
    role: "Independent Research · Cornell University",
    description:
      "Surveyed Cornell undergraduates to compare the impact of visual and textual materials on environmental attitudes using SPSS for data analysis.",
    path: "/research/visual-vs-textual",
  },
];

export default function Research() {
  return (
    <Page className="projects-container">
      <div>
        <span className="cs-eyebrow">Psychology &amp; neuroscience</span>
        <h1 className="cs-title">Research</h1>
        <p className="cs-subtitle">
          The behavioral and cognitive research that grounds how I design.
        </p>
      </div>

      <Reveal className="cs-index" stagger>
        {researchItems.map((item) => (
          <Reveal.Item
            as={Link}
            key={item.path}
            to={item.path}
            className="cs-index-item"
          >
            <div className="cs-index-label">{item.label}</div>
            <div>
              <h3 className="cs-index-title">{item.title}</h3>
              <p className="cs-index-desc">
                <strong>{item.role}</strong>
                <br />
                {item.description}
              </p>
            </div>
            <span className="cs-index-arrow" aria-hidden="true">→</span>
          </Reveal.Item>
        ))}
      </Reveal>

      <div
        className="cs-links"
      >
        <Link to="/projects" className="project-link">Browse projects →</Link>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </Page>
  );
}
