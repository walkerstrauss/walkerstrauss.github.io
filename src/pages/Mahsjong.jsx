import React from 'react';
import { Link } from 'react-router-dom';
import { CaseLayout } from '../components/case/Case.jsx';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import demoVideo from '../assets/mahsjong/gameplay.mp4';
import MahsjongImg from '../assets/mahsjong/mj.png';

export default function Mahsjong() {
  return (
    <Page className="cs-page">
      <div className="cs-hero">
        <span className="cs-eyebrow">Cornell · Game Design</span>
        <h1 className="cs-title">Mah’s Jong</h1>
        <p className="cs-subtitle">A two-player strategy game based on mahjong, built in C++ on the CUGL framework.</p>
      </div>

      <CaseLayout>
      <Reveal as="section" className="cs-section">
        <h2>Overview</h2>
        <div 
            className="project-image"
            style={{ margin: '2rem 0' }}
        >
            <img 
            src={MahsjongImg} 
            alt="Mah's Jong poster"
            style={{
                width: '100%',
                maxWidth: '400px'
            }}
            />
        </div>
      
        <p>
          Mah’s Jong is a two-player strategy game based on mahjong, built in C++ on the CUGL framework in Cornell’s Advanced Game Development course. I was project lead and also worked on design and programming.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Project lead</h2>
        <p>
          I ran weekly meetings, kept the production schedule, and coordinated the designers and programmers. I wrote the task descriptions that turned design goals into programming work and kept the sprint boards current in Notion.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Design</h2>
        <p>
          The aim was to keep the feel of physical tiles while adding abilities and action tiles that change each match. I worked with the designers on the interface layout, the tutorial flow and the balance of game effects.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Programming</h2>
        <p>
          I built the animation system behind the tile interactions: an <em>AnimationController</em> that handles fading, scaling and sprite-sheet transitions, and an <em>AnimatedNode</em> class that unifies motion and visual updates. Tile selection, pile shuffling and drag-and-drop were built on it. I also wrote the tutorial and information scenes.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Final build</h2>
        <p>
          By the closed beta and final showcase, the game had complete animation systems, an in-game tutorial and tuned balance.
        </p>
      </Reveal>

        <Reveal>
        <h3>Gameplay Demo</h3>

        <video
          src={demoVideo}
          controls
          playsInline
          className="cs-demo-video"
          style={{ maxWidth: '900px', margin: '2rem 0' }}
        />

        <div
          className="cs-caption"
          style={{ marginBottom: '2rem' }}
        >
          Demo gameplay footage captured from the final build. 
          <br />
          <em>
            Note: There is a slight mismatch in timing between the top and bottom displays in this recording that does
            not exist in the actual game.
          </em>
        </div>
      </Reveal>

      <Reveal as="section" className="cs-links">
        <a
          href="https://github.com/walkerstrauss/mahsjong"
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