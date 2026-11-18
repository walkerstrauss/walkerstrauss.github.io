import React from 'react';
import { Link } from 'react-router-dom';
import { Beat, CaseHero, CaseLayout, NextCase } from '../components/case/Case.jsx';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';

const SECTIONS = [
  { id: 'question', label: 'Research question' },
  { id: 'role', label: 'My role' },
  { id: 'data', label: 'Data preparation' },
];

export default function FmriStudy() {
  return (
    <Page className="cs-page">
      <CaseHero
        meta={['Research assistant', 'Affect and Cognition Lab, Cornell University', '2023–2025']}
        title="fMRI study on food imagery and the hypothalamus"
        subtitle="How the hypothalamus represents and evaluates food-related imagery."
        facts={[['Built with', 'Bash, Python, dcm2niix, AFNI']]}
      />

      <CaseLayout sections={SECTIONS}>
      <Beat id="question" eyebrow="Research question" title="How do imagery and taste associations affect what people later recall?">
        <p>
          Food cues can trigger emotional and physiological responses. The experiment pairs an incidental encoding task with a recognition test after the scan, to see how imagery and taste associations affect later recall and how that interacts with hunger signals mediated by the hypothalamus.
        </p>
      </Beat>

      <Beat id="role" eyebrow="My role" title="I ran the scan sessions and prepared the imaging and behavioral data.">
        <p>
          I wrote Bash and Python scripts that convert MRI data from DICOM to NIfTI and organize it in BIDS format. I helped set up the experiment’s directory structure, designed the behavioral stimuli for the incidental encoding task, and ran participant onboarding and in-scan task monitoring.
        </p>
      </Beat>

      <Beat id="data" eyebrow="Data preparation" title="Every scan is named and organized the same way across sessions.">
        <p>
          The scripts use dcm2niix to read DICOM headers and rename scans by acquisition type, so anatomical, diffusion and functional runs map the same way across sessions. I added quality checks for alignment and completeness before preprocessing in AFNI.
        </p>
      </Beat>

      <NextCase from="/research/fmri-study" />

      </CaseLayout>
    </Page>
  );
}