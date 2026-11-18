import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../../lib/motion.js';
import './research.css';

/*
 * A note on the kiosk itself. Wraps the part of the screen a step is about
 * and sets a chip on its edge, so the point of the step reads on the screen
 * without the list beside it. The chip is the agent thread's .story-chip:
 * green (tone "result") when the screen just did the thing the step names.
 */
export default function Pin({ note, tone, children, className = '' }) {
  return (
    <div className={`ax-pin ${className}`}>
      {children}
      <AnimatePresence initial={false}>
        {note && (
          <motion.span
            key={note} className="ax-pin-note" aria-hidden="true"
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE, delay: 0.15 }}
          >
            <span className="story-chip" data-on="true" data-tone={tone}>{note}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
