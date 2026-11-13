import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';

/*
 * Scroll as the only clock, for any figure.
 *
 * Returns [ref, step]. Attach the ref to the figure. `step` counts from 0 to
 * `count` as the figure's top edge travels from near the bottom of the
 * viewport to its middle, and counts back down when the page scrolls up, so
 * every figure plays forward and backward. Reduced motion returns `count`
 * straight away: the finished figure, nothing moving.
 *
 * Pair it with the .step / .step-fade classes and a data-on attribute.
 */
export function useSteps(count, offset = ['start 0.92', 'start 0.42']) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const [step, setStep] = useState(0);

  const absorb = useCallback((p) => {
    setStep(Math.min(count, Math.floor(p * (count + 1))));
  }, [count]);

  useMotionValueEvent(scrollYProgress, 'change', absorb);
  useEffect(() => { absorb(scrollYProgress.get()); }, [absorb, scrollYProgress]);

  return [ref, reduced ? count : step];
}
