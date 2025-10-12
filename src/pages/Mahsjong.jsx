import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import demoVideo from '../assets/mahsjong/gameplay.mp4';

export default function Mahsjong() {
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
        <motion.h2 variants={itemVariants}>Mah’s Jong</motion.h2>

        <motion.p variants={itemVariants}>
          <strong>Mah’s Jong</strong> is a two-player digital strategy game inspired by traditional mahjong and built
          from the ground up using C++ and the CUGL framework. Developed in the Advanced Game Development course at
          Cornell, the project was recognized for its completeness and polish. I served as project lead while
          contributing heavily to both design and programming, guiding the team through every phase from concept to
          final release.
        </motion.p>

        <motion.h3 variants={itemVariants}>Leadership and Coordination</motion.h3>
        <motion.p variants={itemVariants}>
          As project lead I organized and led weekly meetings, maintained our production schedule, and coordinated
          between design and development teams. I created detailed task descriptions that translated design goals into
          actionable programming tasks and kept our sprint boards up to date. I managed our team’s workflow across
          Notion and Slack, ensuring that every contributor understood their responsibilities and deadlines while
          keeping communication clear and constructive. This framework gave us consistency and accountability while
          still allowing creative freedom in design discussions.
        </motion.p>

        <motion.h3 variants={itemVariants}>Design Direction</motion.h3>
        <motion.p variants={itemVariants}>
          I worked closely with our designers to define the tone, pace, and identity of Mah’s Jong. The goal was to
          preserve the tactile satisfaction of physical tiles while introducing dynamic abilities and action tiles that
          made each match unpredictable and engaging. I shaped the interface layout, the flow of the tutorial, and the
          balance of game effects to ensure that play remained strategic yet accessible. Many of these systems grew
          out of collaborative sketch sessions and internal prototypes that I then implemented and tested with the team.
        </motion.p>

        <motion.h3 variants={itemVariants}>Programming and Systems Design</motion.h3>
        <motion.p variants={itemVariants}>
          Beyond leadership, I was deeply involved in the core codebase. I developed the animation system that powers
          our tile interactions, creating an <em>AnimationController</em> framework that supports fading, scaling, and
          sprite-sheet transitions. I also implemented the <em>AnimatedNode</em> class to unify motion and visual
          updates across all interactive elements. These systems became the foundation for later features such as tile
          selection, pile shuffling, and drag-and-drop mechanics. I wrote and maintained key scene logic including the
          tutorial and information scenes, integrating them into the overall game loop so that every state felt seamless
          and consistent.
        </motion.p>

        <motion.h3 variants={itemVariants}>Development Process</motion.h3>
        <motion.p variants={itemVariants}>
          Our collaboration was structured around clear communication and iterative feedback. I used our Notion space
          to track weekly goals and bug fixes, documenting progress after every milestone. On Slack, we coordinated
          implementation details and discussed design adjustments in real time. These platforms became the backbone of
          our development rhythm, allowing us to move quickly while maintaining shared clarity about priorities. By the
          time of our closed beta and final showcase, Mah’s Jong featured complete animation systems, refined gameplay
          balance, and an in-game tutorial that made the experience accessible to new players.
        </motion.p>

        <motion.h3 style={{ marginTop: '2.5rem' }} variants={itemVariants}>
          Gameplay Demo
        </motion.h3>

        <motion.video
          src={demoVideo}
          controls
          playsInline
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            width: '100%',
            maxWidth: '900px',
            borderRadius: '12px',
            margin: '2rem auto',
            display: 'block',
          }}
          variants={itemVariants}
        />

        <motion.div
          variants={itemVariants}
          style={{
            textAlign: 'center',
            color: '#aaa',
            fontSize: '0.9rem',
            marginBottom: '2rem',
            lineHeight: '1.5',
          }}
        >
          Demo gameplay footage captured from the final build. 
          <br />
          <em>
            Note: There is a slight mismatch in timing between the top and bottom displays in this recording that does
            not exist in the actual game.
          </em>
        </motion.div>

        <motion.h3 variants={itemVariants}>Reflection</motion.h3>
        <motion.p variants={itemVariants}>
          Leading Mah’s Jong taught me how to combine creative vision with technical direction. I learned to balance
          management and design work, to make architectural decisions while keeping the team aligned on aesthetic and
          experiential goals. The project became a turning point in my understanding of collaborative game development
          and of how leadership in design means creating conditions for others to do their best work. Seeing players
          respond to our final build reminded me how small, deliberate choices in animation, timing, and flow can bring
          an entire system to life.
        </motion.p>

        <motion.p variants={itemVariants} style={{ marginTop: '2rem' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <a href="https://github.com/walkerstrauss/mahsjong">View on GitHub →</a>
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