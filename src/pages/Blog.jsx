import React from 'react';
import { motion } from 'framer-motion';

export default function Blog() {
  return (
    <div className="page">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Blog Page (Coming Soon)
      </motion.h2>
    </div>
  );
}


