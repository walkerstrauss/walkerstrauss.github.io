import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';

/*
 * Home-page tile for the fMRI study, in the manner of the AICap demos: flat
 * solid shapes, rounded corners, slow eased changes.
 *
 * It plays the study's method in two beats. The participant sees a fixation
 * cross, then a food image (blue card: what goes in). While the image is up,
 * the region the study measured, deep on the midline, lights green (what is
 * read out). It shows the procedure, not a finding.
 *
 * Blue and green are the site's message and result colours; the film stays
 * dark in both themes because it is a scan, not page chrome. Stylized.
 */

const FILM = '#1d1d20';
const BONE = '#ededf0';
const TISSUE = '#a9a9b0';
const REST = '#77777e';
const BLUE = '#e5eff3';
const BLUE_INK = '#20353d';
const RED = '#b4473a';
const GREEN = '#2f7a4f';
const GREEN_LIT = '#6cc493';
const EASE = [0.2, 0, 0.2, 1];

const FOODS = [
  <g key="apple">
    <circle cx="67" cy="104" r="15" fill={RED} />
    <rect x="65.5" y="83" width="3" height="8" rx="1.5" fill={BLUE_INK} />
    <ellipse cx="74" cy="87" rx="6" ry="3" fill={GREEN} transform="rotate(-25 74 87)" />
  </g>,
  <path key="slice" d="M51 88 H83 L67 119 Z" fill={RED} stroke={RED} strokeWidth="5" strokeLinejoin="round" />,
  <circle key="donut" cx="67" cy="100" r="13" fill="none" stroke={RED} strokeWidth="10" />,
];

/* Left hemisphere; the right is its mirror image. */
function Hemisphere() {
  return (
    <g>
      <path d="M147.5 52 C123 52 112 74 112 100 C112 126 123 148 147.5 148 Z" fill={TISSUE} />
      <g stroke={FILM} strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M114 84 q8 0 12 6" />
        <path d="M114 114 q9 -1 13 4" />
        <path d="M137 55 q-1 8 4 12" />
      </g>
    </g>
  );
}

export default function FmriPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(1);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    const t = setTimeout(() => setTick((n) => n + 1), tick % 2 ? 2600 : 1100);
    return () => clearTimeout(t);
  }, [inView, reduce, tick]);

  const shown = reduce || tick % 2 === 1;
  const food = FOODS[Math.floor(tick / 2) % FOODS.length];

  return (
    <svg
      ref={ref}
      className="fmri-preview"
      viewBox="0 0 300 200"
      role="img"
      aria-label="A participant is shown a food image while a brain scan reads one region deep in the middle of the brain"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      {/* What the participant sees. */}
      <rect x="30" y="63" width="74" height="74" rx="12" fill={BLUE} />
      <AnimatePresence mode="wait" initial={false}>
        {shown ? (
          <motion.g key={`food-${Math.floor(tick / 2)}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
            {food}
          </motion.g>
        ) : (
          <motion.g key="fix" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} fill={BLUE_INK}>
            <rect x="60" y="98.5" width="14" height="3" rx="1.5" />
            <rect x="65.5" y="93" width="3" height="14" rx="1.5" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* The scan. */}
      <rect x="140" y="16" width="116" height="168" rx="12" fill={FILM} />
      <g transform="translate(48 0)">
        <ellipse cx="150" cy="100" rx="46" ry="58" fill="none" stroke={BONE} strokeWidth="5" />
        <Hemisphere />
        <g transform="translate(300 0) scale(-1 1)"><Hemisphere /></g>
        <motion.rect
          x="142" y="100" width="16" height="14" rx="4"
          initial={false}
          animate={{ fill: shown ? GREEN_LIT : REST }}
          transition={{ duration: 0.6, delay: shown && !reduce ? 0.35 : 0, ease: EASE }}
        />
      </g>
    </svg>
  );
}
