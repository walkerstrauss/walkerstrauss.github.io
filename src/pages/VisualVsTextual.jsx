import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import paperPDF from '../assets/visual-vs-textual/Comparing-the-Effects-of-Forms-of-Environmental-Education-Strauss-2023.pdf';

export default function VisualVsTextual() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="projects-container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className="project-page"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <motion.h2 variants={itemVariants}>
          Comparing the Effects of Forms of Environmental Education
        </motion.h2>

        <motion.p variants={itemVariants}>
          This study examined how different forms of environmental education—visual, graphical, and textual—affect
          people’s environmental attitudes. Conducted at Cornell University, the research aimed to understand whether
          visual or data-driven educational materials can evoke stronger pro-environmental values than traditional text.
          It was completed as an independent research project under faculty mentorship in 2023.
        </motion.p>

        <motion.h3 variants={itemVariants}>Research Focus</motion.h3>
        <motion.p variants={itemVariants}>
          The study was designed to test how message format influences the way people internalize ecological ideas.
          Prior literature suggested that imagery of natural beauty can evoke awe and emotional connection, while
          infographics may engage analytical reasoning and enhance message clarity. Text, meanwhile, has historically
          been the dominant mode of education. The central question was whether these different modalities produce
          measurable differences in environmental attitude change.
        </motion.p>

        <motion.h3 variants={itemVariants}>Methodology</motion.h3>
        <motion.p variants={itemVariants}>
          172 undergraduate participants were recruited through Cornell’s SONA platform and randomly assigned to one of
          three experimental conditions: visual, graphical, or textual. Participants completed the first half of the
          New Ecological Paradigm (NEP) scale to assess baseline environmental attitudes, viewed an educational stimulus
          based on their condition, and then completed the remaining NEP items. The survey was hosted on Qualtrics, and
          data analysis was performed in SPSS using paired t-tests and one-way ANOVA to compare pre- and post-intervention
          scores across groups.
        </motion.p>

        <motion.h3 variants={itemVariants}>Results</motion.h3>
        <motion.p variants={itemVariants}>
          All three conditions—visual, graphical, and textual—produced significant positive shifts in environmental
          attitudes. However, no single format outperformed the others statistically. Participants exposed to images,
          infographics, or written passages all reported stronger pro-environmental worldviews following the intervention.
          This finding suggests that exposure to environmental content itself, regardless of format, may be sufficient to
          shift attitudes in a positive direction.
        </motion.p>

        <motion.h3 variants={itemVariants}>Discussion</motion.h3>
        <motion.p variants={itemVariants}>
          The results highlight the robustness of environmental education across media. While visual and graphical
          materials may engage emotion and cognition differently, their impact on ecological concern appears comparable
          to that of text-based learning. This challenges the assumption that visuals are inherently superior for
          environmental messaging, and instead emphasizes the importance of accessibility, message framing, and emotional
          resonance across all formats.
        </motion.p>

        <motion.h3 variants={itemVariants}>My Role</motion.h3>
        <motion.p variants={itemVariants}>
          I independently designed and implemented the study from hypothesis formation to data analysis. This included
          sourcing stimuli, programming the Qualtrics experiment, managing participant recruitment through SONA,
          conducting statistical tests in SPSS, and writing the research report. The project strengthened my skills in
          quantitative experimental design, environmental psychology, and data interpretation, while deepening my
          understanding of how educational framing influences attitude change.
        </motion.p>

        <motion.h3 variants={itemVariants}>Reflection</motion.h3>
        <motion.p variants={itemVariants}>
          Conducting this research taught me how different forms of educational material can meaningfully
          affect the way people interpret environmental issues. It also reinforced the importance of combining emotional
          engagement with cognitive clarity when designing educational experiences. This lesson now informs much of my
          work in UX and behavioral design through an understanding of how presentation shapes perception and action.
        </motion.p>

        <motion.p variants={itemVariants} style={{ marginTop: '2rem', textAlign: 'center' }}>
          <motion.a
            href={paperPDF}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Paper (PDF) →
          </motion.a>
        </motion.p>

        <motion.div
          style={{ marginTop: '2rem' }}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/research" className="back-link">
            ← Back to Research
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}