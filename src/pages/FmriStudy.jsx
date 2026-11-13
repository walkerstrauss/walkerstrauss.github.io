import React from 'react';
import { Link } from 'react-router-dom';
import { CaseLayout } from '../components/case/Case.jsx';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';

export default function FmriStudy() {
  return (
    <Page className="cs-page">
      <div className="cs-hero">
        <span className="cs-eyebrow">Affect and Cognition Lab · Cornell University</span>
        <h1 className="cs-title">fMRI Study on Food Imagery and the Hypothalamus</h1>
        <p className="cs-subtitle">How the hypothalamus represents and evaluates food-related imagery.</p>
      </div>

      <CaseLayout>
      <Reveal as="section" className="cs-section">
        <h2>Overview</h2>

        <p>
          The study looks at how the brain represents and evaluates images of food, focusing on the hypothalamus and its interaction with affective and memory networks. It was run at Cornell’s Affect and Cognition Lab. As a research assistant I helped run scan sessions and wrote the scripts that prepared imaging and behavioral data for analysis.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Research question</h2>
        <p>
          Food cues can trigger emotional and physiological responses. The experiment pairs an incidental encoding task with a recognition test after the scan, to see how imagery and taste associations affect later recall and how that interacts with hunger signals mediated by the hypothalamus.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>My role</h2>
        <p>
          I wrote Bash and Python scripts that convert MRI data from <em>DICOM</em> to <em>NIfTI</em> and organize it in <em>BIDS</em> format. I helped set up the experiment’s directory structure, designed the behavioral stimuli for the incidental encoding task, and assisted with participant onboarding and in-scan task monitoring.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Data preparation</h2>
        <p>
          The scripts use <em>dcm2niix</em> to read DICOM headers and rename scans by acquisition type, so anatomical, diffusion and functional runs map the same way across sessions. I added quality checks for alignment and completeness before preprocessing in AFNI.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-links">
        <Link to="/research" className="back-link">← Back to Research</Link>
      </Reveal>

      </CaseLayout>
    </Page>
  );
}