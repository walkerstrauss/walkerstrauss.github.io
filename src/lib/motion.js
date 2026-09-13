/*
 * One motion language for the whole site.
 *
 * Rules this encodes, each of which the previous implementation broke:
 *
 *  - One easing curve and two durations. Timing used to range across five
 *    values in JS and five more in CSS, which reads as drift, not rhythm.
 *    EASE is the same cubic-bezier the stylesheet already uses for hover, so
 *    entrance and interaction feel like the same system.
 *  - Movement is small. 8-12px, never 20-40px. At larger offsets the page
 *    reads as assembling itself rather than settling.
 *  - Below the fold reveals on scroll, never on mount. Mount animations for
 *    off-screen content finish unseen and leave the content invisible until
 *    they do.
 *  - Reveals fire once. Re-animating on every scroll-past is a nuisance.
 *  - Hover and focus stay in CSS. Only entrances live here.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in App.jsx, which zeroes transforms for users who ask for it. The CSS media
 * query in App.css covers the hover transitions.
 */

export const EASE = [0.2, 0, 0.2, 1];

export const DURATION = {
  page: 0.26,
  reveal: 0.5,
};

/* Route transitions. Deliberately quicker than reveals and barely displaced:
   a page change should feel like a cut with a soft edge, not a slide. */
export const pageVariants = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.page, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: DURATION.page * 0.65, ease: EASE },
  },
};

/* Scroll reveals. */
export const revealVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE },
  },
};

/* Parent of a group that should reveal in sequence. Children use
   revealVariants and inherit the timing from here. */
export const staggerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.03 },
  },
};

/* Start the reveal slightly before the element is fully on screen, and only
   ever run it once. */
export const viewport = { once: true, margin: '0px 0px -12% 0px' };
