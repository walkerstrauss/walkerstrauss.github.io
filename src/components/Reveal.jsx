import React from 'react';
import { motion } from 'framer-motion';
import { revealVariants, staggerVariants, viewport } from '../lib/motion.js';

/* motion.create() returns a new component type each call, so a fresh one per
   render would remount the subtree on every paint. Cache by component. */
const cache = new Map();
function motionFor(as) {
  if (typeof as === 'string') return motion[as] || motion.div;
  if (!cache.has(as)) cache.set(as, motion.create(as));
  return cache.get(as);
}

/*
 * Reveals its children as they scroll into view, once.
 *
 * `as` takes a tag name or a component, so the animated element can be the
 * real grid child rather than a wrapper. That matters: wrapping a grid item
 * in an extra div makes the wrapper the child and silently breaks any
 * :nth-child() rules targeting the item.
 *
 * `stagger` makes this a sequencing parent; its children should be
 * <Reveal.Item> so they inherit timing instead of each observing separately.
 */
export default function Reveal({ as = 'div', className, stagger = false, children, ...rest }) {
  const Tag = motionFor(as);
  return (
    <Tag
      className={className}
      variants={stagger ? staggerVariants : revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      {...rest}
    >
      {children}
    </Tag>
  );
}

Reveal.Item = function RevealItem({ as = 'div', className, children, ...rest }) {
  const Tag = motionFor(as);
  return (
    <Tag className={className} variants={revealVariants} {...rest}>
      {children}
    </Tag>
  );
};
