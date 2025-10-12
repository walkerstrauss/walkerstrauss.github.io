import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="home-container">
      <motion.div
        className="hero"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants}>Walker Strauss</motion.h1>

        <motion.p
          className="tagline"
          variants={itemVariants}
          animate={{
            textShadow: [
              "0 0 0px rgba(100, 181, 246, 0)",
              "0 0 10px rgba(100, 181, 246, 0.3)",
              "0 0 0px rgba(100, 181, 246, 0)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          "Designing technology that feels human."
        </motion.p>

        <motion.p variants={itemVariants}>
          I build thoughtful, emotionally-aware systems that connect psychology,
          design, and AI to create more human digital experiences.
        </motion.p>

        {/* === Contact Section === */}
        <motion.div
          className="contact-links"
          variants={itemVariants}
          style={{
            marginTop: "2.5rem",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            justifyContent: "center",
            fontSize: "1rem",
          }}
        >
          <motion.a
            href="mailto:was236@cornell.edu"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, color: "#90caf9" }}
            transition={{ duration: 0.2 }}
          >
            Email
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/walkerstrauss"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, color: "#90caf9" }}
            transition={{ duration: 0.2 }}
          >
            LinkedIn
          </motion.a>

          <motion.a
            href="https://github.com/walkerstrauss"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, color: "#90caf9" }}
            transition={{ duration: 0.2 }}
          >
            GitHub
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}