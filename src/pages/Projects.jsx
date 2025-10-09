import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    {
      title: "AICap",
      description: "A multimodal AI wine recommendation kiosk built for Onki AI.",
      to: "/projects/aicap"
    },
    {
      title: "Mah's Jong",
      description: "Competitive Mahjong-inspired 1v1 strategy game built in C++/CUGL.",
      to: "/projects/mahsjong"
    },
    {
      title: "Savoring Weather Clock",
      description: "Arduino-based interactive clock merging weather data, AI, and psychology.",
      to: "/projects/weather-clock"
    },
    {
      title: "Death of a Deal",
      description: "A Java/LibGDX game exploring narrative-driven decision making.",
      to: "/projects/death-of-a-deal"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="projects-container">
      <motion.h2
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Projects
      </motion.h2>
      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((p, index) => (
          <motion.div
            key={p.to}
            className="project-card"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={p.to}>View Project →</Link>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div 
        style={{ marginTop: '2rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="back-link">← Back to Home</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}


