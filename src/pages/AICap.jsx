import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AICap() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="projects-container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="project-page"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <motion.h2 variants={itemVariants}>AICap</motion.h2>

        <motion.p variants={itemVariants}>
          <strong>AICap</strong> is a multimodal AI wine recommendation kiosk created at <em>Onki AI</em>. It helps
          customers discover wines through a blend of voice and touch interaction. I led user experience and product
          design for the in-store pilot, shaping both the interface and the conversational behavior to make the
          experience feel natural and human.
        </motion.p>

        <motion.h3 variants={itemVariants}>Design Goals</motion.h3>
        <motion.p variants={itemVariants}>
          AICap was built to make technology feel more human. Instead of approaching the project as a functional kiosk,
          we designed it as a conversational presence that listens, responds, and adapts. The goal was to build an AI
          interface that could interpret tone, pacing, and gesture to create an atmosphere of trust and curiosity.
        </motion.p>
        <motion.p variants={itemVariants}>
          Every decision, from the cadence of the voice output to the rhythm of the lighting animations, was intended to
          communicate empathy and attentiveness. We wanted customers to feel that they were in dialogue with the system,
          not merely using it.
        </motion.p>

        <motion.h3 variants={itemVariants}>Design Process</motion.h3>
        <motion.p variants={itemVariants}>
          I began by defining the structure of each conversation and how it would move between touch and voice. Using
          <strong> Figma</strong>, I created detailed flow diagrams mapping user intents to system responses, visual
          states, and animations. Each touch interaction triggered a specific visual and auditory feedback loop designed
          to feel consistent with the system’s voice and personality.
        </motion.p>
        <motion.p variants={itemVariants}>
          The design drew from behavioral psychology and human–computer interaction research. I studied how tone,
          hesitation, and timing affect user trust and designed each conversational turn to reflect that awareness. By
          pairing these psychological principles with visual design, the kiosk invited a slower, more mindful mode of
          engagement than typical AI interfaces.
        </motion.p>

        <motion.h3 variants={itemVariants}>System Architecture</motion.h3>
        <motion.p variants={itemVariants}>
          Working closely with engineers, I designed the JSON schema that organized multimodal data from voice, touch,
          and animation states. The schema allowed us to track engagement patterns across sessions and to analyze how
          phrasing, timing, or tone influenced user interaction. I also developed the process for reviewing this data,
          translating raw event logs into insight about user rhythm and attention.
        </motion.p>
        <motion.p variants={itemVariants}>
          The interface itself was built using React and ran on an asynchronous event model that synchronized visual and
          auditory feedback. Each conversational state was rendered dynamically, with transitions timed to speech and
          gesture, creating a sense of real presence. This integration between psychology, engineering, and design
          became the foundation for Onki’s ongoing multimodal agent platform.
        </motion.p>

        <motion.h3 variants={itemVariants}>Reflection</motion.h3>
        <motion.p variants={itemVariants}>
          Designing AICap reinforced for me that good interaction design is as much about emotion as it is about logic.
          The project challenged me to consider how movement, color, and phrasing can shape perception in subtle but
          powerful ways. It also deepened my understanding of how design frameworks can guide AI behavior to feel
          deliberate and coherent.
        </motion.p>
        <motion.p variants={itemVariants}>
          I continue to refine this work as part of Onki’s larger effort to create emotionally intelligent AI systems.
          The lessons from AICap extend beyond wine discovery. They point toward a future where conversational
          interfaces are not only intelligent but capable of genuine warmth and character.
        </motion.p>

        <motion.div 
          style={{ marginTop: '2rem' }}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/projects" className="back-link">← Back to Projects</Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}