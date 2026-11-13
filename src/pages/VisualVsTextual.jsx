import React from 'react';
import { Link } from 'react-router-dom';
import { CaseLayout } from '../components/case/Case.jsx';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import paperPDF from '../assets/visual-vs-textual/Comparing-the-Effects-of-Forms-of-Environmental-Education-Strauss-2023.pdf';

export default function VisualVsTextual() {
  return (
    <Page className="cs-page">
      <div className="cs-hero">
        <span className="cs-eyebrow">Independent Research · Cornell University</span>
        <h1 className="cs-title">Comparing the Effects of Forms of Environmental Education</h1>
        <p className="cs-subtitle">Comparing how visual, graphical, and textual materials shape environmental attitudes.</p>
      </div>

      <CaseLayout>
      <Reveal as="section" className="cs-section">
        <h2>Overview</h2>

        <p>
          This study tested whether the format of environmental education (images, infographics or text) changes its effect on environmental attitudes. I ran it as an independent research project at Cornell in 2023 under faculty mentorship.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Research question</h2>
        <p>
          Earlier work suggested that images of nature evoke awe and emotional connection, and that infographics engage analytical reasoning, while text has been the default. The question was whether the three formats produce measurably different changes in environmental attitudes.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Methodology</h2>
        <p>
          172 undergraduate participants were recruited through Cornell’s SONA platform and randomly assigned to one of
          three experimental conditions: visual, graphical, or textual. Participants completed the first half of the
          New Ecological Paradigm (NEP) scale to assess baseline environmental attitudes, viewed an educational stimulus
          based on their condition, and then completed the remaining NEP items. The survey was hosted on Qualtrics, and
          data analysis was performed in SPSS using paired t-tests and one-way ANOVA to compare pre- and post-intervention
          scores across groups.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Results</h2>
        <p>
          All three conditions (visual, graphical, and textual) produced significant positive shifts in environmental
          attitudes. However, no single format outperformed the others statistically. Participants exposed to images,
          infographics, or written passages all reported stronger pro-environmental worldviews following the intervention.
          This finding suggests that exposure to environmental content itself, regardless of format, may be sufficient to
          shift attitudes in a positive direction.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Discussion</h2>
        <p>
          The assumption that visuals work better for environmental messaging did not hold here: the three formats had comparable effects.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>My role</h2>
        <p>
          I designed and ran the study: sourcing stimuli, building the Qualtrics experiment, recruiting through SONA, running the statistics in SPSS, and writing the report.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-links">
        <a
          href={paperPDF}
          className="project-link"
        >
          View Full Paper (PDF) →
        </a>
        <Link to="/" className="back-link">← Back to home</Link>
      </Reveal>

      </CaseLayout>
    </Page>
  );
}