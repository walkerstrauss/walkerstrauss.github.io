import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { SCROLL_RANGE, SCROLL_SPRING, arrive } from './motion.js';

/*
 * Scroll as the only clock, for any figure.
 *
 * Returns [ref, step, on]. Attach `ref` to the figure. Its scroll progress
 * (framer useScroll, smoothed by useSpring) runs as the figure's top travels
 * from near the bottom of the viewport to just above its middle, and back.
 *
 *   step  a whole number 0..count, for logic: which content or colour shows.
 *   on(k) a ref for an element that should arrive at step k. While the page
 *         scrolls, the hook sets that element's opacity (and, for .step, its
 *         lift) every frame from the continuous progress, with neighbouring
 *         elements overlapping, so it moves with the scroll instead of
 *         snapping to a step and then fading. No re-render per frame.
 *
 * Elements keep data-on for colours and states. Reduced motion returns
 * `count` straight away: the finished figure, nothing moving.
 */
export function useSteps(count, offset = SCROLL_RANGE) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING);
  const [step, setStep] = useState(0);
  const registry = useRef(new Map());
  const cache = useRef(new Map());

  const paint = useCallback((p) => {
    const s = p * (count + 1);
    setStep(Math.min(count, Math.floor(s)));
    if (reduced) return;
    registry.current.forEach((k, el) => {
      if (!el.isConnected) { registry.current.delete(el); return; }
      // Part k arrives across two steps of the range, eased at both ends, so
      // it overlaps the parts before and after it.
      const t = arrive((s - (k - 1)) / 2);
      // Bars that grow from an axis follow the scroll the same way.
      if (el.classList.contains('sv-bar')) {
        el.style.transition = 'none';
        el.style.transform = `scaleX(${t.toFixed(3)})`;
        return;
      }
      const fades = el.classList.contains('step') || el.classList.contains('step-fade');
      if (!fades) return;
      el.style.transition = 'none';
      el.style.opacity = String(t);
      if (el.classList.contains('step')) el.style.transform = t >= 1 ? 'none' : `translateY(${((1 - t) * 12).toFixed(2)}px)`;
    });
  }, [count, reduced]);

  useMotionValueEvent(smooth, 'change', paint);
  useEffect(() => { paint(smooth.get()); }, [paint, smooth]);

  const on = useCallback((k) => {
    let fn = cache.current.get(k);
    if (!fn) {
      fn = (el) => { if (el) registry.current.set(el, k); };
      cache.current.set(k, fn);
    }
    return fn;
  }, []);

  return [ref, reduced ? count : step, on];
}
