import React from 'react';
import { Link } from 'react-router-dom';

export default function Research() {
  const researchItems = [
    {
      title: "fMRI Study on Food Imagery and the Hypothalamus",
      role: "Affect and Cognition Lab · Cornell University",
      description:
        "Analyzed functional connectivity using fMRI to investigate how the hypothalamus evaluates food-related stimuli. Led participant onboarding, task execution, and MRI data preprocessing.",
      year: "2023 – Present",
      path: "/research/fmri-study"
    },
    {
      title: "Visual vs. Textual Environmental Education Study",
      role: "Independent Research · Cornell University",
      description:
        "Surveyed Cornell undergraduates to compare the impact of visual and textual materials on environmental attitudes using SPSS for data analysis.",
      year: "2023",
      path: "/research/visual-vs-textual"
    }
  ];

  return (
    <div className="projects-container">
      <h2>Research</h2>
      <div className="projects-grid">
        {researchItems.map((item, index) => (
          <div key={index} className="project-card">
            <h3>
              <Link to={item.path} className="project-link">{item.title}</Link>
            </h3>
            <p><strong>{item.role}</strong></p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  );
}


