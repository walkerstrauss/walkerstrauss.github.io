import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DOADImg from '../assets/doad/death-of-a-deal.png';

export default function DeathOfADeal() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
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
        <motion.h2 variants={itemVariants}>Death of a Deal</motion.h2>

        <motion.p variants={itemVariants}>
          <strong>Death of a Deal</strong> is a physics-based platformer developed in Java using the LibGDX engine by
          <em> Shiny Burger Studios</em>, a team of nine designers and programmers. The game takes place in the haunted
          town of Hallowville, where the player embodies a guardian angel statue brought to life to protect an abandoned
          mansion from being sold by a fearless real-estate agent. By switching between statue and ghost forms, the
          player must race through decaying halls and collapsing platforms to scare away potential buyers before they
          complete their tour.
        </motion.p>

        <motion.h3 variants={itemVariants}>My Role</motion.h3>
        <motion.p variants={itemVariants}>
          I worked across gameplay programming, level design, and art direction, helping the team translate the game’s
          concept into a playable and visually coherent experience. My primary focus was on the design of core mechanics
          and player feedback systems, ensuring that each transformation between statue and ghost felt distinct,
          powerful, and responsive. I implemented early versions of the freeze and momentum logic, refined collision
          behavior, and collaborated closely with the design team to tune the balance of speed, weight, and control that
          defined the final feel of the game.
        </motion.p>

        <motion.h3 variants={itemVariants}>Design Goals and Collaboration</motion.h3>
        <motion.p variants={itemVariants}>
          The design process centered on finding the right balance between exhilaration, foresight, and satisfaction.
          Each level was designed as a puzzle of momentum, timing, and environment reading. As a team, we wanted players
          to experience both the weight of their stone form and the freedom of their ghost form, discovering new ways to
          combine those states to traverse complex rooms. I contributed to iterative level sketches and playtesting
          cycles, analyzing how players adapted to the shifting density and timing of our mechanics. These insights
          informed refinements in map layout and obstacle rhythm that made the experience feel intuitive while still
          demanding skill.
        </motion.p>

        <motion.div
          className="project-image"
          variants={itemVariants}
          style={{ textAlign: 'center', margin: '2rem 0' }}
        >
          <motion.img
            src={DOADImg}
            alt="Image of Game Manual from Death of a Deal"
            className="project-img"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              width: '100%',
              maxWidth: '680px',
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          />
        </motion.div>

        <motion.h3 variants={itemVariants}>Game Feel and Aesthetic Direction</motion.h3>
        <motion.p variants={itemVariants}>
          I also contributed to the visual direction and overall atmosphere of the game. Our world design drew from
          gothic architecture and whimsical exaggeration, aiming for a tone that was eerie but playful. I helped develop
          the lighting palette, texture references, and animation pacing to create a sense of momentum and tension that
          matched the physics-based gameplay. Every detail, from the way cobweb platforms stretched to the way the
          statue cracked upon impact, was designed to make the game’s physics feel alive.
        </motion.p>

        <motion.h3 variants={itemVariants}>Reflection</motion.h3>
        <motion.p variants={itemVariants}>
          Working on <strong>Death of a Deal</strong> taught me the importance of unifying mechanical design and visual
          storytelling. The project was a lesson in teamwork and communication—how to guide creative ideas through
          iteration, how to negotiate aesthetic differences, and how to preserve playfulness even in a demanding
          development cycle. It remains one of the most technically and creatively rewarding experiences I’ve had, a
          project that combined narrative, physics, and collaboration into a cohesive, spirited work.
        </motion.p>

        <motion.p variants={itemVariants} style={{ marginTop: '2rem' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <motion.a
            href="https://github.com/zachseidner1/death-of-a-deal"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View on GitHub →
          </motion.a>
        </motion.p>

        <motion.div
          style={{ marginTop: '1rem' }}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/projects">← Back to Projects</Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}