import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../../lib/motion.js';
import { ClockDrawing, clockModel, useEased } from './RealFigures.jsx';

/*
 * The clock as the guide of a figure. It always turns to face the part the
 * point is about, and that part carries a short note on a hairline, so a
 * reader can get the point from the object without reading the paragraph.
 *
 *   front (0)          the display and the window: anything about words or light
 *   quarter (36–52)    front and the right wall: the whole object, the touch pad
 *   side (64)          the chimney and the right wall: motion
 *
 * notes   [{ at, label, side }]: `at` is a spot from the model (light,
 *         lightR, display, displayTop, displayBottom, vane, motor, button);
 *         side is left or right of the house.
 * Everything else goes to ClockDrawing. A change of yaw eases, so the turn
 * between two steps is visible and always toward the next part named.
 */
const BOX = [-80, 22, 410, 323];
const EDGE = { left: 24, right: 226 };

export default function GuidedClock({ yaw = 36, notes = [], label, ...rest }) {
  const y = useEased(yaw, 1.2);
  const m = clockModel(y);
  const [bx, by, bw, bh] = BOX;
  const placed = notes.map((n) => {
    const p = m.at[n.at];
    const side = n.side || (p[0] < 125 ? 'left' : 'right');
    const ex = EDGE[side];
    const kx = p[0] + (side === 'left' ? -12 : 12);
    const ty = p[1] + (n.dy || 0);
    return { ...n, p, side, ex, kx, ty, key: `${n.at}-${n.label}` };
  });
  return (
    <div className="wc-guide">
      <ClockDrawing className="ck-render ck-guide" yaw={y} viewBox={BOX.join(' ')} label={[label, ...notes.map((n) => n.label)].filter(Boolean).join('. ')} {...rest}>
        <AnimatePresence initial={false}>
          {placed.map((n) => (
            <motion.g
              key={n.key} className="ck-note"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.35 }}
            >
              <path d={`M${n.ex},${n.ty} L${n.kx.toFixed(1)},${n.ty.toFixed(1)} L${n.p[0].toFixed(1)},${n.p[1].toFixed(1)}`} />
              <circle cx={n.p[0]} cy={n.p[1]} r="2.1" />
            </motion.g>
          ))}
        </AnimatePresence>
      </ClockDrawing>
      <AnimatePresence initial={false}>
        {placed.map((n) => (
          <motion.span
            key={n.key} className="wc-note" data-side={n.side} aria-hidden="true"
            style={{
              top: `${((n.ty - by) / bh) * 100}%`,
              ...(n.side === 'left'
                ? { right: `${((bx + bw - (n.ex - 5)) / bw) * 100}%` }
                : { left: `${((n.ex + 5 - bx) / bw) * 100}%` }),
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.35 }}
          >
            {/* The agent thread's chip, so a note on the clock reads the same
                as a fact on the thread: green when the clock acted. */}
            <span className="story-chip" data-on="true" data-tone={n.tone}>{n.label}</span>
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
