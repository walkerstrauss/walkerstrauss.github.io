import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import KioskScreen from './KioskScreen.jsx';

/*
 * Home-page tile: the same coded kiosk, cycling through the flow on its own
 * while the tile is on screen. Stops on the recommendation screen for users
 * who ask for reduced motion.
 */
const frames = [
  { scene: 'idle', sensing: true, agent: 'Hi! I’m Onki AICap! I’m here to help you with your wine selection!' },
  { scene: 'welcome', agent: 'Welcome! Happy to find the perfect wine for you!', input: 'Can you suggest a wine for a 6 person dinner party', listening: true },
  { scene: 'welcome', agent: 'Okay, seafood sounds like a good choice!', input: 'We are cooking seafood', chips: ['Dinner', 'Seafood'], matchesEnabled: true },
  { scene: 'recs', agent: 'I would suggest Costa Marina 2022 ($18, Italy), bright and citrus-led, excellent with seafood.', chips: ['Dinner', 'Seafood'] },
];

export default function AICapPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % frames.length), 2600);
    return () => clearInterval(t);
  }, [inView, reduce]);

  const frame = reduce ? frames[frames.length - 1] : frames[i];

  return (
    <div className="aicap-preview" ref={ref} aria-label="AICap kiosk flow: greeting, voice request, preferences, recommendation" role="img">
      <KioskScreen {...frame} />
    </div>
  );
}
