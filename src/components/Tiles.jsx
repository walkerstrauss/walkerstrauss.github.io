import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { revealVariants, staggerVariants, viewport } from '../lib/motion.js';

/*
 * The one tile grid: the home page and the AUI page both use it, so a tile
 * looks and moves the same wherever it appears.
 *
 * The tiles settle in one after another the first time they are seen. The
 * grid itself is never scaled or shifted, so its edges always line up with
 * the label above it and the rest of the page.
 */
const MotionLink = motion.create(Link);

export function Tiles({ cols = 2, label, note, children }) {
  return (
    <section className="tiles-group">
      {label && <Reveal as="span" className="section-label">{label}</Reveal>}
      {note && <Reveal as="p" className="tiles-note">{note}</Reveal>}
      <motion.div
        className="tiles"
        data-cols={cols}
        variants={staggerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {children}
      </motion.div>
    </section>
  );
}

/* `children` is the tile's picture: a coded preview, a video or an image. */
export function Tile({ to, title, line, children }) {
  return (
    <MotionLink to={to} className="thumb-card" variants={revealVariants}>
      <div className="thumb-media">{children}</div>
      <div className="thumb-caption">
        <h3>{title}</h3>
        <p>{line}</p>
      </div>
    </MotionLink>
  );
}
