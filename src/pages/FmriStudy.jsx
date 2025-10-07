import React from 'react';
import { Link } from 'react-router-dom';

export default function FmriStudy() {
  return (
    <div className="projects-container">
      <div className="project-page">
        <h2>fMRI Study on Food Imagery and the Hypothalamus</h2>

        <p>
          This project investigates how the brain represents and evaluates food-related imagery, with a focus on the
          hypothalamus and its interaction with affective and memory networks. Conducted at Cornell University’s
          <strong> Affect and Cognition Lab</strong>, the study examines how visual exposure to food stimuli influences
          motivation, emotion, and recall. I joined the lab as a research assistant to help design, organize, and
          process the neuroimaging pipeline, connecting behavioral and physiological data into a coherent analytical
          framework.
        </p>

        <h3>Research Focus</h3>
        <p>
          The study builds on prior work showing that food cues can trigger both emotional and physiological responses,
          linking memory systems to bodily states. Our experiment combines an incidental encoding paradigm with
          post-scan recognition testing to explore how imagery and taste associations affect subsequent recall. The
          central question is how appetitive visual experiences interact with hunger and internal state signals
          mediated by the hypothalamus.
        </p>

        <h3>My Role</h3>
        <p>
          I contributed to the design and implementation of the study’s data infrastructure, working with <em>DICOM</em>
          and <em>NIfTI</em> formats to prepare MRI data for analysis. I wrote Bash and Python scripts to automate
          conversion and organization into <em>BIDS</em> format, handling preprocessing steps including motion
          correction, slice timing adjustment, and metadata extraction. I also helped construct the experimental
          directory structure, designed the behavioral stimuli for incidental encoding, and assisted with participant
          onboarding and in-scan task monitoring.
        </p>

        <h3>Data Processing and Analysis</h3>
        <p>
          To standardize our workflow, I created scripts that used <em>dcm2niix</em> and <em>jq</em> to extract key
          information from DICOM headers and rename scans based on acquisition type. This ensured consistent mapping
          across sessions for anatomical, diffusion, and functional runs. I then developed quality control procedures to
          verify alignment and completeness before preprocessing in AFNI. These steps allowed the team to manage
          multi-session data from multiple participants efficiently and reproducibly, preparing the dataset for
          functional connectivity and activation analysis.
        </p>

        <h3>Scientific Insight</h3>
        <p>
          The study’s results contribute to our understanding of how the hypothalamus and limbic regions respond to
          emotionally charged sensory cues. By examining incidental encoding rather than explicit memory tasks, the work
          provides a clearer picture of how food-related affect influences spontaneous attention and neural encoding.
          My involvement gave me experience in the technical and conceptual sides of fMRI research—how raw imaging data
          becomes psychological evidence through careful structure, processing, and interpretation.
        </p>

        <h3>Reflection</h3>
        <p>
          Working in the Affect and Cognition Lab taught me to think critically about data design, not just data
          analysis. Building the infrastructure for large-scale fMRI studies required both precision and creativity.
          It helped me understand how experimental psychology, programming, and neuroscience intersect, and how small
          implementation details can shape scientific insight. This project strengthened my foundation in
          neuroimaging methods and deepened my appreciation for research as both a technical and interpretive practice.
        </p>

        <div style={{ marginTop: '1rem' }}>
          <Link to="/projects">← Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}