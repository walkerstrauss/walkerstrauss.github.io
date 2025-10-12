import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TojibaCrashImg from '../assets/tojiba-crash/tojiba-crash.png';

export default function TojibaCrash() {
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
        <motion.h2 variants={itemVariants}>Tojiba Crash</motion.h2>

        <motion.p variants={itemVariants}>
          <strong>Tojiba Crash</strong> is a web-based video game developed at <em>Sanko Game Corp</em>, built using
          HTML5, CSS, and JavaScript. I managed the development process to align with the client’s specifications and
          iterative feedback, ensuring that every build reflected both the technical requirements and the creative
          spirit of the original inspiration, <em>Nanaca Crash</em>.
        </motion.p>

         <motion.div 
            className="project-image"
            variants={itemVariants}
            style={{ textAlign: 'center', margin: '2rem 0' }}
        >
            <img 
            src={TojibaCrashImg} 
            alt="A screenshot of Tojiba Crash gameplay."
            style={{
                width: '100%',
                maxWidth: '400px',
                borderRadius: '12px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
            />
        </motion.div>

        <motion.h3 variants={itemVariants}>Development and Collaboration</motion.h3>
        <motion.p variants={itemVariants}>
          I worked within a structured development cycle that emphasized responsive communication and iterative updates.
          Each week, I provided summaries of newly implemented features and coordinated revisions based on client input.
          Using Git for version control, I followed established best practices for collaborative development, ensuring
          clean commits, maintainable code, and consistent build stability across environments.
        </motion.p>

        <motion.h3 variants={itemVariants}>Design and Technical Refinement</motion.h3>
        <motion.p variants={itemVariants}>
          My work focused on refining the game’s physics, graphics, and interactive systems to deliver a smooth and
          polished user experience. Through ongoing testing and gameplay analysis, I balanced responsiveness and visual
          clarity, adjusting character motion and impact mechanics to preserve the energetic and chaotic feel that made
          the original browser game, <em>Nanaca Crash</em>, so memorable. Each iteration brought the game closer to a
          faithful but modernized reimagining of the classic.
        </motion.p>

        <motion.h3 variants={itemVariants}>Outcome</motion.h3>
        <motion.p variants={itemVariants}>
          The final version of <strong>Tojiba Crash</strong> met client expectations for playability, visual style, and
          overall polish. The project demonstrated my ability to manage an external development pipeline, merge
          technical precision with creative vision, and deliver a complete web-based game experience that honored the
          tone and mechanics of its source material.
        </motion.p>

        <motion.p 
            variants={itemVariants} 
            style={{ marginTop: '2rem' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="https://github.com/walkerstrauss/nanaca-crash-clone">View on GitHub →</a>
        </motion.p>
        <motion.div
          style={{ marginTop: '2rem' }}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/projects" className="back-link">
            ← Back to Projects
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}