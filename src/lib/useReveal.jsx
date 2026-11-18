import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { SCROLL_RANGE, SCROLL_SPRING, arrive } from './motion.js';

/*
 * Scroll-linked reveal. Returns [ref, p]: p is a MotionValue from 0 to
 * 1 that follows the figure as its top travels from near the bottom of the
 * screen to just above the middle, smoothed by a spring. Nothing re-renders
 * while it moves: elements read p through useTransform, so motion tracks the
 * scroll continuously instead of jumping between steps. Reduced motion: p is
 * 1, the finished figure.
 */
export function useReveal(offset = SCROLL_RANGE) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING);
  const done = useMotionValue(1);
  return [ref, reduced ? done : smooth];
}

/* The window of p in which item `at` (0-based) of `of` arrives. Windows
   overlap, so neighbouring items move together rather than in turn. */
export function windowFor(at, of, spread = 2) {
  const step = 1 / (of + spread - 1);
  const start = at * step;
  return [start, Math.min(1, start + spread * step)];
}

/*
 * <Rise p at of>: fades and lifts its children in as p crosses its window.
 * `as` picks the element (span by default). data-on stays "true" so the
 * site's CSS shows the element; framer owns opacity and position.
 */
export function Rise({ p, at, of, as = 'span', lift = 12, className, style, children, ...rest }) {
  const [a, b] = windowFor(at, of);
  const opacity = useTransform(p, [a, b], [0, 1], { ease: arrive });
  const y = useTransform(p, [a, b], [lift, 0], { ease: arrive });
  const M = motion[as];
  return (
    <M className={className} data-on="true" style={{ ...style, opacity, y, transition: 'none' }} {...rest}>
      {children}
    </M>
  );
}
