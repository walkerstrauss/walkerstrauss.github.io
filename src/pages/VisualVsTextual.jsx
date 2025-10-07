import React from 'react';
import { Link } from 'react-router-dom';

export default function VisualVsTextual() {
  return (
    <div className="projects-container">
      <div className="project-page">
        <h2>Comparing the Effects of Forms of Environmental Education</h2>

        <p>
          This study examined how different forms of environmental education—visual, graphical, and textual—affect
          people’s environmental attitudes. Conducted at Cornell University, the research aimed to understand whether
          visual or data-driven educational materials can evoke stronger pro-environmental values than traditional text.
          It was completed as an independent research project under faculty mentorship in 2023.
        </p>

        <h3>Research Focus</h3>
        <p>
          The study was designed to test how message format influences the way people internalize ecological ideas.
          Prior literature suggested that imagery of natural beauty can evoke awe and emotional connection, while
          infographics may engage analytical reasoning and enhance message clarity. Text, meanwhile, has historically
          been the dominant mode of education. The central question was whether these different modalities produce
          measurable differences in environmental attitude change.
        </p>

        <h3>Methodology</h3>
        <p>
          172 undergraduate participants were recruited through Cornell’s SONA platform and randomly assigned to one of
          three experimental conditions: visual, graphical, or textual. Participants completed the first half of the
          New Ecological Paradigm (NEP) scale to assess baseline environmental attitudes, viewed an educational stimulus
          based on their condition, and then completed the remaining NEP items. The survey was hosted on Qualtrics, and
          data analysis was performed in SPSS using paired t-tests and one-way ANOVA to compare pre- and post-intervention
          scores across groups.
        </p>

        <h3>Results</h3>
        <p>
          All three conditions—visual, graphical, and textual—produced significant positive shifts in environmental
          attitudes. However, no single format outperformed the others statistically. Participants exposed to images,
          infographics, or written passages all reported stronger pro-environmental worldviews following the intervention.
          This finding suggests that exposure to environmental content itself, regardless of format, may be sufficient to
          shift attitudes in a positive direction.
        </p>

        <h3>Discussion</h3>
        <p>
          The results highlight the robustness of environmental education across media. While visual and graphical
          materials may engage emotion and cognition differently, their impact on ecological concern appears comparable
          to that of text-based learning. This challenges the assumption that visuals are inherently superior for
          environmental messaging, and instead emphasizes the importance of accessibility, message framing, and emotional
          resonance across all formats.
        </p>

        <h3>My Role</h3>
        <p>
          I independently designed and implemented the study from hypothesis formation to data analysis. This included
          sourcing stimuli, programming the Qualtrics experiment, managing participant recruitment through SONA,
          conducting statistical tests in SPSS, and writing the research report. The project strengthened my skills in
          quantitative experimental design, environmental psychology, and data interpretation, while deepening my
          understanding of how educational framing influences attitude change.
        </p>

        <h3>Reflection</h3>
        <p>
          Conducting this research taught me how small differences in design—color, pacing, framing—can meaningfully
          affect the way people interpret environmental issues. It also reinforced the importance of combining emotional
          engagement with cognitive clarity when designing educational experiences. This lesson now informs much of my
          work in UX and behavioral design: that meaningful communication often depends less on the format itself and
          more on the way the message connects to human attention and emotion.
        </p>

        <div style={{ marginTop: '1rem' }}>
          <Link to="/projects">← Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}