import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { ClockScene } from './parts.jsx';
import './weatherclock.css';

/*
 * Home-page tile for the Savoring Weather Clock, in the manner of the fMRI
 * and AICap tiles: flat solid shapes, rounded corners, slow eased changes.
 *
 * The question it answers: what does this object do? A still picture of a
 * small house cannot say, because the project is the change. So the tile
 * plays one exchange on a loop. The weather on the card changes (what goes
 * in); the round window takes a colour, the arm on the roof turns, and a new
 * message is written on the display (what comes out). The two conditions and
 * their colours are the ones the case page names: a clear day in amber, rain
 * in blue. It shows the behaviour, not a result.
 *
 * Stylized: the house is the prototype's form reduced to three flat faces,
 * the message is bars rather than words, and the timing is compressed. The
 * real clock is slower. Reduced motion holds the clear-day state.
 */

const FRAMES = [
  { weather: 'clear', glow: 'amber', message: 0 },
  { weather: 'rain', glow: 'blue', message: 1 },
];

const HOLD = 4400;

export default function WeatherClockPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    const t = setTimeout(() => setTick((n) => n + 1), HOLD);
    return () => clearTimeout(t);
  }, [inView, reduce, tick]);

  const frame = FRAMES[reduce ? 0 : tick % FRAMES.length];

  return (
    <div
      ref={ref}
      className="wc wc-preview"
      role="img"
      aria-label="A small house-shaped clock. When the weather changes, its round window changes colour, the arm on its roof turns, and a new message appears on its display"
    >
      <ClockScene
        className="wc-preview-art"
        aria-hidden="true"
        weather={frame.weather}
        glow={frame.glow}
        message={frame.message}
        turns={reduce ? 0 : tick}
        still={Boolean(reduce)}
        armDelay={0.5}
        messageDelay={0.9}
      />
    </div>
  );
}
