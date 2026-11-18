import { createContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { revealVariants, staggerVariants, viewport } from '../lib/motion.js';

/*
 * The one tile grid: the home page and the agent page both use it, so a tile
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

/* Whether the reader is pointing at or focused on a tile. A tile's
   preview rests on its finished frame and plays its one moment only when the
   reader reaches for the tile, so the motion answers the reader instead of
   running on a clock. */
export const TileActive = createContext(false);

/* `children` is the tile's picture: a coded preview, a video or an image. */
export function Tile({ id, to, title, line, children }) {
  const [active, setActive] = useState(false);
  const on = () => setActive(true);
  const off = () => setActive(false);
  return (
    <MotionLink
      id={id}
      to={to}
      className="thumb-card"
      variants={revealVariants}
      onPointerEnter={on}
      onPointerLeave={off}
      onFocus={on}
      onBlur={off}
    >
      <div className="thumb-media" aria-hidden="true">
        <TileActive.Provider value={active}>{children}</TileActive.Provider>
      </div>
      <div className="thumb-caption">
        <h3>{title}</h3>
        <p>{line}</p>
        <span className="thumb-cta">Read the case <span aria-hidden="true">→</span></span>
      </div>
    </MotionLink>
  );
}
