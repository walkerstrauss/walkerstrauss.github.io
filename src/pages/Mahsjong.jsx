import React from 'react';
import { Link } from 'react-router-dom';

export default function Mahsjong() {
  return (
    <div className="projects-container">
      <div className="project-page">
        <h2>Mah’s Jong</h2>

        <p>
          <strong>Mah’s Jong</strong> is a two-player digital strategy game inspired by traditional mahjong and built
          from the ground up using C++ and the CUGL framework. Developed in the Advanced Game Development course at Cornell,
          the project was recognized for its completeness and polish. I served as project lead while contributing
          heavily to both design and programming, guiding the team through every phase from concept to final release.
        </p>

        <h3>Leadership and Coordination</h3>
        <p>
          As project lead I organized and led weekly meetings, maintained our production schedule, and coordinated
          between design and development teams. I created detailed task descriptions that translated design goals into
          actionable programming tasks and kept our sprint boards up to date. I managed our team’s workflow across
          Notion and Slack, ensuring that every contributor understood their responsibilities and deadlines while
          keeping communication clear and constructive. This framework gave us consistency and accountability while
          still allowing creative freedom in design discussions.
        </p>

        <h3>Design Direction</h3>
        <p>
          I worked closely with our designers to define the tone, pace, and identity of Mah’s Jong. The goal was to
          preserve the tactile satisfaction of physical tiles while introducing dynamic abilities and action tiles that
          made each match unpredictable and engaging. I shaped the interface layout, the flow of the tutorial, and the
          balance of game effects to ensure that play remained strategic yet accessible. Many of these systems grew
          out of collaborative sketch sessions and internal prototypes that I then implemented and tested with the team.
        </p>

        <h3>Programming and Systems Design</h3>
        <p>
          Beyond leadership, I was deeply involved in the core codebase. I developed the animation system that powers
          our tile interactions, creating an <em>AnimationController</em> framework that supports fading, scaling, and
          sprite sheet transitions. I also implemented the <em>AnimatedNode</em> class to unify motion and visual
          updates across all interactive elements. These systems became the foundation for later features such as tile
          selection, pile shuffling, and drag-and-drop mechanics. I wrote and maintained key scene logic including the
          tutorial and information scenes, integrating them into the overall game loop so that every state felt seamless
          and consistent.
        </p>

        <h3>Development Process</h3>
        <p>
          Our collaboration was structured around clear communication and iterative feedback. I used our Notion space
          to track weekly goals and bug fixes, documenting progress after every milestone. On Slack, we coordinated
          implementation details and discussed design adjustments in real time. These platforms became the backbone of
          our development rhythm, allowing us to move quickly while maintaining shared clarity about priorities. By the
          time of our closed beta and final showcase, Mah’s Jong featured complete animation systems, refined gameplay
          balance, and an in-game tutorial that made the experience accessible to new players.
        </p>

        <h3>Reflection</h3>
        <p>
          Leading Mah’s Jong taught me how to combine creative vision with technical direction. I learned to balance
          management and design work, to make architectural decisions while keeping the team aligned on aesthetic and
          experiential goals. The project became a turning point in my understanding of collaborative game development
          and of how leadership in design means creating conditions for others to do their best work. Seeing players
          respond to our final build reminded me how small, deliberate choices in animation, timing, and flow can bring
          an entire system to life.
        </p>

        <p style={{ marginTop: '2rem' }}>
          <a href="https://github.com/walkerstrauss/mahsjong">View on GitHub →</a>
        </p>

        <div style={{ marginTop: '2rem' }}>
          <Link to="/projects">← Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}