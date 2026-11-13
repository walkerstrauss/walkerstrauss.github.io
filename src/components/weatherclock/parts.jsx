import { useEffect } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { EASE } from '../../lib/motion.js';

/*
 * Shared drawing parts for the Savoring Weather Clock figures: the arm with
 * two cups on the roof, and the clock seen from outside. Flat solid shapes,
 * rounded corners, slow eased changes. All colour comes from weatherclock.css.
 */

const FADE = { duration: 0.3, ease: EASE };

/*
 * The arm on the roof. `turns` counts half-turns about the post; changing it
 * eases the arm round (or back). `tilt` squashes the circle the cups travel
 * into an ellipse for the three-quarter view; 0 is a straight-on view, where
 * the cups slide past each other. `still` jumps straight to the end position.
 */
export function CupArm({ x, y, reach, cup, tilt = 0, rest = 0, turns = 0, delay = 0, still = false }) {
  const target = rest + turns * Math.PI;
  const angle = useMotionValue(target);

  useEffect(() => {
    if (still) {
      angle.set(target);
      return undefined;
    }
    const run = animate(angle, target, { duration: 1.8, delay, ease: EASE });
    return () => run.stop();
  }, [angle, target, delay, still]);

  const depth = tilt ? 0.18 : 0.1;
  const ax = useTransform(angle, (a) => x + reach * Math.cos(a));
  const ay = useTransform(angle, (a) => y + tilt * reach * Math.sin(a));
  const ar = useTransform(angle, (a) => cup * (1 + depth * Math.sin(a)));
  const bx = useTransform(angle, (a) => x - reach * Math.cos(a));
  const by = useTransform(angle, (a) => y - tilt * reach * Math.sin(a));
  const br = useTransform(angle, (a) => cup * (1 - depth * Math.sin(a)));

  return (
    <g className="wc-arm">
      <motion.line x1={ax} y1={ay} x2={bx} y2={by} />
      <motion.circle cx={ax} cy={ay} r={ar} />
      <motion.circle cx={bx} cy={by} r={br} />
    </g>
  );
}

/* Weather symbols, drawn around 0,0 and placed on the card. */
const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

const WEATHER = {
  clear: (
    <g className="wc-sun">
      <circle r="9.5" />
      {RAYS.map((deg) => (
        <rect key={deg} x="-1.5" y="-19.5" width="3" height="6" rx="1.5" transform={`rotate(${deg})`} />
      ))}
    </g>
  ),
  rain: (
    <g>
      <g className="wc-cloud">
        <rect x="-17" y="-8" width="34" height="13" rx="6.5" />
        <circle cx="-5" cy="-9" r="8.5" />
        <circle cx="6" cy="-6" r="6.5" />
      </g>
      <g className="wc-drops">
        <rect x="-11" y="10" width="3" height="8" rx="1.5" transform="rotate(16 -9.5 14)" />
        <rect x="-1.5" y="10" width="3" height="8" rx="1.5" transform="rotate(16 0 14)" />
        <rect x="8" y="10" width="3" height="8" rx="1.5" transform="rotate(16 9.5 14)" />
      </g>
    </g>
  ),
};

/* Line lengths for the message on the display. Bars, not words. */
const LINES = [
  [50, 42, 26],
  [44, 52, 34],
];

/*
 * The clock from outside, with the weather it is given on a card to its left.
 *
 *   weather  'clear' | 'rain' | null   what is on the card
 *   glow     'amber' | 'blue' | 'off'  the round window
 *   turns    number of half-turns the roof arm has made
 *   message  index into LINES, or null for a blank display
 */
export function ClockScene({
  weather = null,
  glow = 'off',
  turns = 0,
  message = null,
  still = false,
  armDelay = 0,
  messageDelay = 0,
  children,
  ...svgProps
}) {
  return (
    <svg viewBox="0 0 300 200" {...svgProps}>
      {/* What goes in. */}
      <rect className="wc-card" x="32" y="69" width="62" height="62" rx="12" />
      <g transform="translate(63 100)">
        <AnimatePresence mode="wait" initial={false}>
          {weather && (
            <motion.g key={weather} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={FADE}>
              {WEATHER[weather]}
            </motion.g>
          )}
        </AnimatePresence>
      </g>

      {/* The clock: side wall, roof, front. */}
      <path className="wc-face wc-side" d="M230 98 L268 92 L268 164 L230 176 Z" />
      <path className="wc-face wc-roof" d="M184 46 L222 42 L268 92 L230 98 Z" />
      <path className="wc-face wc-front" d="M138 172 L138 98 L184 46 L230 98 L230 176 Z" />

      {/* Light. */}
      <circle className="wc-halo" data-glow={glow} cx="182" cy="94" r="17" />
      <circle className="wc-window" data-glow={glow} cx="182" cy="94" r="11" />

      {/* Message. */}
      <rect className="wc-screen" x="152" y="122" width="66" height="38" rx="4" />
      <AnimatePresence mode="wait" initial={false}>
        {message !== null && (
          <motion.g
            key={message}
            className="wc-lines"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ...FADE, duration: 0.45, delay: still ? 0 : messageDelay } }}
            exit={{ opacity: 0, transition: FADE }}
          >
            {LINES[message % LINES.length].map((w, i) => (
              <rect key={i} x="159" y={130.5 + i * 9} width={w} height="3.5" rx="1.75" />
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Motion. */}
      <rect className="wc-post" x="224.25" y="36" width="3.5" height="35" rx="1.75" />
      <CupArm x={226} y={36} reach={25} cup={6} tilt={0.28} rest={Math.PI - 0.4} turns={turns} delay={armDelay} still={still} />

      {children}
    </svg>
  );
}

/* A numbered badge that ties a part of a drawing to its line in the list. */
export function Marker({ n, x, y, on = true }) {
  return (
    <g className="wc-marker step-fade" data-on={on}>
      <circle cx={x} cy={y} r="6.5" />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central">{n}</text>
    </g>
  );
}
