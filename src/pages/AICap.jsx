import React from 'react';
import { Link } from 'react-router-dom';

export default function AICap() {
  return (
    <div className="projects-container">
      <div className="project-page">
        <h2>AICap</h2>

        <p>
          <strong>AICap</strong> is a multimodal AI wine recommendation kiosk created at <em>Onki AI</em>. It helps
          customers discover wines through a blend of voice and touch interaction. I led user experience and product
          design for the in-store pilot, shaping both the interface and the conversational behavior to make the
          experience feel natural and human.
        </p>

        <p>
          I began by defining how the conversation would flow, how the system would respond to users, and how it would
          transition between touch and voice. The goal was to make the AI approachable, confident, and emotionally
          intelligent. I designed the interaction framework in Figma, pairing each conversational state with its visual
          representation and timing every animation to match speech. Every detail of the interface was guided by
          behavioral psychology and research on trust in human–machine interaction.
        </p>

        <p>
          I worked closely with engineers to integrate live data capture for voice and touch events. I structured the
          JSON schema used to log interactions and developed a process for reviewing engagement data after each session.
          This data revealed how people explored the kiosk, which questions they skipped, and how tone or phrasing
          influenced engagement. These insights informed a reinforcement system that could adjust the agent’s language
          and feedback in real time.
        </p>

        <p>
          During the pilot, AICap completed more than one hundred customer interactions in a physical store. The results
          showed that a conversational interface can increase confidence in product discovery and create a sense of
          dialogue between the user and the machine. Subtle choices in timing, tone, and movement helped turn what could
          have been a transactional experience into one that felt warm and personal. The pilot established the UX and
          behavioral foundations for Onki’s continuing multimodal agent platform, which I continue to refine through
          design documentation, interaction modeling, and testing.
        </p>

        <div style={{ marginTop: '2rem' }}>
          <Link to="/projects" className="back-link">← Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}