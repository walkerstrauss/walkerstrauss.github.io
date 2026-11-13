import React from 'react';
import { Link } from 'react-router-dom';
import { CaseLayout } from '../components/case/Case.jsx';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import DOADImg from '../assets/doad/death-of-a-deal.png';

export default function DeathOfADeal() {
  return (
    <Page className="cs-page">
      <div className="cs-hero">
        <span className="cs-eyebrow">Cornell · Game Design</span>
        <h1 className="cs-title">Death of a Deal</h1>
        <p className="cs-subtitle">A physics platformer built in Java with LibGDX by a team of nine.</p>
      </div>

      <CaseLayout>
      <Reveal as="section" className="cs-section">
        <h2>Overview</h2>

        <p>
          Death of a Deal is a physics platformer built in Java with LibGDX by <em>Shiny Burger Studios</em>, a team of nine. The player is a guardian angel statue brought to life to stop a haunted mansion from being sold, switching between statue and ghost forms to scare off buyers before their tour ends.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>My role</h2>
        <p>
          I worked on gameplay programming, level design and art direction. I implemented early versions of the freeze and momentum logic, refined collision behavior, and tuned speed, weight and control with the design team.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Level design</h2>
        <p>
          Each level is a puzzle of momentum and timing: the statue is heavy, the ghost is free, and rooms ask the player to combine the two. I contributed level sketches and took part in playtests, and what we saw fed changes to map layout and obstacle spacing.
        </p>

        <div
          className="project-image"
          style={{ margin: '2rem 0' }}
        >
          <img
            src={DOADImg}
            alt="Image of Game Manual from Death of a Deal"
            className="project-img"
            style={{
              width: '100%',
              maxWidth: '680px'
            }}
          />
        </div>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Art direction</h2>
        <p>
          The look draws on gothic architecture, exaggerated to be eerie but playful. I helped set the lighting palette, texture references and animation pacing.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-links">
        <a
          href="https://github.com/zachseidner1/death-of-a-deal"
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          View on GitHub →
        </a>
        <Link to="/projects" className="back-link">← Back to Projects</Link>
      </Reveal>

      </CaseLayout>
    </Page>
  );
}