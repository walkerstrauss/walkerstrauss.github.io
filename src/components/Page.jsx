import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../lib/motion.js';

/*
 * Route-level wrapper. Exists so every page shares one entrance and one exit,
 * and so the exit actually fires: the variants only work because <Routes> is
 * inside an <AnimatePresence> in App.jsx. The previous implementation declared
 * exit variants on nine pages with no AnimatePresence anywhere, so none of
 * them ever ran.
 */
export default function Page({ className, children, ...rest }) {
  return (
    <motion.div
      className={className}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      {...rest}
    >
      {children}
    </motion.div>
  );
}
