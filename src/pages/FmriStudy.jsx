import React from 'react';
import { Link } from 'react-router-dom';
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

      <Reveal as="section" className="cs-section">
        <h2>Overview</h2>

        <p>
          This project investigates how the brain represents and evaluates food-related imagery, with a focus on the
          hypothalamus and its interaction with affective and memory networks. Conducted at Cornell University’s
          <strong> Affect and Cognition Lab</strong>, the study examines how visual exposure to food stimuli influences
          motivation, emotion, and recall. I joined the lab as a research assistant to help design, organize, and
          process the neuroimaging pipeline, connecting behavioral and physiological data into a coherent analytical
          framework.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Research Focus</h2>
        <p>
          The study builds on prior work showing that food cues can trigger both emotional and physiological responses,
          linking memory systems to bodily states. Our experiment combines an incidental encoding paradigm with
          post-scan recognition testing to explore how imagery and taste associations affect subsequent recall. The
          central question is how appetitive visual experiences interact with hunger and internal state signals mediated
          by the hypothalamus.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>My Role</h2>
        <p>
          I contributed to the design and implementation of the study’s data infrastructure, working with <em>DICOM</em>{' '}
          and <em>NIfTI</em> formats to prepare MRI data for analysis. I wrote Bash and Python scripts to automate
          conversion and organization into <em>BIDS</em> format, handling preprocessing steps including motion
          correction, slice timing adjustment, and metadata extraction. I also helped construct the experimental
          directory structure, designed the behavioral stimuli for incidental encoding, and assisted with participant
          onboarding and in-scan task monitoring.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Data Processing and Analysis</h2>
        <p>
          To standardize our workflow, I created scripts that used <em>dcm2niix</em> to extract key
          information from DICOM headers and rename scans based on acquisition type. This ensured consistent mapping
          across sessions for anatomical, diffusion, and functional runs. I then developed quality control procedures to
          verify alignment and completeness before preprocessing in AFNI. These steps allowed the team to manage
          multi-session data from multiple participants efficiently and reproducibly, preparing the dataset for
          functional connectivity and activation analysis.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Scientific Insight</h2>
        <p>
          The study’s results contribute to our understanding of how the hypothalamus and limbic regions respond to
          emotionally charged sensory cues. By examining incidental encoding rather than explicit memory tasks, the work
          provides a clearer picture of how food-related affect influences spontaneous attention and neural encoding. My
          involvement gave me experience in the technical and conceptual sides of fMRI research: how raw imaging data
          becomes psychological evidence through careful structure, processing, and interpretation.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Reflection</h2>
        <p>
          Working in the Affect and Cognition Lab taught me to think critically about data design, not just data
          analysis. Building the infrastructure for large-scale fMRI studies required both precision and creativity. It
          helped me understand how experimental psychology, programming, and neuroscience intersect, and how small
          implementation details can shape scientific insight. This project strengthened my foundation in neuroimaging
          methods and deepened my appreciation for research as both a technical and interpretive practice.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-links">
        <Link to="/research" className="back-link">← Back to Research</Link>
      </Reveal>

    </Page>
  );
}