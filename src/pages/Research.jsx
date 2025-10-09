import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Research() {
  const researchItems = [
    {
      title: "fMRI Study on Food Imagery and the Hypothalamus",
      role: "Affect and Cognition Lab · Cornell University",
      description:
        "Analyzed functional connectivity using fMRI to investigate how the hypothalamus evaluates food-related stimuli. Led participant onboarding, task execution, and MRI data preprocessing.",
      year: "2023 – Present",
      path: "/research/fmri-study"
    },
    {
      title: "Visual vs. Textual Environmental Education Study",
      role: "Independent Research · Cornell University",
      description:
        "Surveyed Cornell undergraduates to compare the impact of visual and textual materials on environmental attitudes using SPSS for data analysis.",
      year: "2023",
      path: "/research/visual-vs-textual"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
        Research
      </motion.h2>
      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {researchItems.map((item, index) => (
          <motion.div
            key={index}
            className="project-card"
            variants={cardVariants}
            whileInView={{ 
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" }
            }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <h3>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={item.path} className="project-link">{item.title}</Link>
              </motion.div>
            </h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <strong>{item.role}</strong>
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {item.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div 
        style={{ marginTop: '2rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
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


