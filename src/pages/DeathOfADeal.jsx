import React from 'react';
import { Link } from 'react-router-dom';

export default function DeathOfADeal() {
  return (
    <div className="projects-container">
      <div className="project-page">
        <h2>Death of a Deal</h2>

        <p>
          <strong>Death of a Deal</strong> is a physics-based platformer developed in Java using the LibGDX engine by
          <em> Shiny Burger Studios</em>, a team of nine designers and programmers. The game takes place in the haunted
          town of Hallowville, where the player embodies a guardian angel statue brought to life to protect an abandoned
          mansion from being sold by a fearless real-estate agent. By switching between statue and ghost forms, the
          player must race through decaying halls and collapsing platforms to scare away potential buyers before they
          complete their tour.
        </p>

        <h3>My Role</h3>
        <p>
          I worked across gameplay programming, level design, and art direction, helping the team translate the game’s
          concept into a playable and visually coherent experience. My primary focus was on the design of core mechanics
          and player feedback systems, ensuring that each transformation between statue and ghost felt distinct,
          powerful, and responsive. I implemented early versions of the freeze and momentum logic, refined collision
          behavior, and collaborated closely with the design team to tune the balance of speed, weight, and control that
          defined the final feel of the game.
        </p>

        <h3>Design Goals and Collaboration</h3>
        <p>
          The design process centered on finding the right balance between exhilaration, foresight, and satisfaction.
          Each level was designed as a puzzle of momentum, timing, and environment reading. As a team, we wanted players
          to experience both the weight of their stone form and the freedom of their ghost form, discovering new ways to
          combine those states to traverse complex rooms. I contributed to iterative level sketches and playtesting
          cycles, analyzing how players adapted to the shifting density and timing of our mechanics. These insights
          informed refinements in map layout and obstacle rhythm that made the experience feel intuitive while still
          demanding skill.
        </p>

        <h3>Game Feel and Aesthetic Direction</h3>
        <p>
          I also contributed to the visual direction and overall atmosphere of the game. Our world design drew from
          gothic architecture and whimsical exaggeration, aiming for a tone that was eerie but playful. I helped develop
          the lighting palette, texture references, and animation pacing to create a sense of momentum and tension that
          matched the physics-based gameplay. Every detail, from the way cobweb platforms stretched to the way the
          statue cracked upon impact, was designed to make the game’s physics feel alive.
        </p>

        <h3>Reflection</h3>
        <p>
          Working on <strong>Death of a Deal</strong> taught me the importance of unifying mechanical design and visual
          storytelling. The project was a lesson in teamwork and communication—how to guide creative ideas through
          iteration, how to negotiate aesthetic differences, and how to preserve playfulness even in a demanding
          development cycle. It remains one of the most technically and creatively rewarding experiences I’ve had, a
          project that combined narrative, physics, and collaboration into a cohesive, spirited work.
        </p>

        <p style={{ marginTop: '2rem' }}>
          <a href="https://github.com/zachseidner1/death-of-a-deal">View on GitHub →</a>
        </p>

        <div style={{ marginTop: '1rem' }}>
          <Link to="/projects">← Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}