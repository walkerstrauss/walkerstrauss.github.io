import { useContext, useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { TileActive } from '../Tiles.jsx';
import KioskScreen from './KioskScreen.jsx';

/*
 * Home-page tile: the coded kiosk, resting on the recommendation and
 * replaying the flow when the reader reaches for the tile.
 */
const frames = [
  { scene: 'idle', sensing: true, agent: 'Hi! I’m Onki AICap! I’m here to help you with your wine selection!' },
  { scene: 'welcome', agent: 'Welcome! Happy to find the perfect wine for you!', input: 'Can you suggest a wine for a 6 person dinner party', listening: true },
  { scene: 'welcome', agent: 'Okay, seafood sounds like a good choice!', input: 'We are cooking seafood', chips: ['Dinner', 'Seafood'], matchesEnabled: true },
  { scene: 'recs', agent: 'I would suggest Costa Marina 2022 ($18, Italy), bright and citrus-led, excellent with seafood.', chips: ['Dinner', 'Seafood'] },
];

export default function AICapPreview() {
  const ref = useRef(null);
  const active = useContext(TileActive);
  const touch = typeof window !== 'undefined' && window.matchMedia?.('(hover: none)').matches;
  const seen = useInView(ref, { amount: 0.6, once: true });
  const reduce = useReducedMotion();
  const last = frames.length - 1;
  const [i, setI] = useState(last);

  /* Rests on the recommendation; replays the flow when the reader reaches
     for the tile, or once on touch screens as it comes into view. */
  useEffect(() => {
    const play = active || (touch && seen);
    if (reduce || !play) { setI(last); return undefined; }
    setI(0);
    const controls = animate(0, last, {
      duration: 0.7 * last,
      ease: 'linear',
      onUpdate: (v) => setI(Math.floor(v + 0.001)),
    });
    return () => controls.stop();
  }, [active, touch, seen, reduce, last]);

  return (
    <div className="aicap-preview" ref={ref} aria-label="Kiosk flow: greeting, voice request, preferences, recommendation" role="img">
      <KioskScreen {...frames[i]} />
    </div>
  );
}
