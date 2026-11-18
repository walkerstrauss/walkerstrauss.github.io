import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TileActive } from '../Tiles.jsx';
import { WORK } from './work.jsx';

/*
 * The work, newest first, all on view at once so it is easy to scan and come
 * back to. Each card pairs the case with a small piece of the real thing (the agent's
 * conversation, the kiosk screen, the clock, the tiles, the data pipeline),
 * which rests finished and replays its one moment when the reader points at
 * or focuses the row.
 */


/* Only a pointer that moves counts as reaching for the card. Scrolling slides
   cards under a resting cursor, and a finger that starts a scroll on a card
   also enters it; neither should replay the preview. Touch screens play it
   once as it comes into view instead. */
/* Every card shows its whole moment at every width: when the drawing is
   taller or wider than its frame, it is scaled down, about the frame's
   centre, until all of it fits. Measured from the drawing's parts, so it
   works for any preview (a thread, the kiosk, the clock, the tiles). */
function Fit({ children }) {
  const outer = useRef(null);
  const inner = useRef(null);
  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return undefined;
    const fit = () => {
      i.style.transform = 'none';
      const f = o.getBoundingClientRect();
      if (!f.width || !f.height) return;
      let top = f.top; let bottom = f.bottom; let left = f.left; let right = f.right;
      i.querySelectorAll('*').forEach((el) => {
        const b = el.getBoundingClientRect();
        if (!b.width || !b.height) return;
        top = Math.min(top, b.top); bottom = Math.max(bottom, b.bottom);
        left = Math.min(left, b.left); right = Math.max(right, b.right);
      });
      const margin = 12;
      const s = Math.min(1, (f.height - margin) / (bottom - top), (f.width - margin) / (right - left));
      if (s >= 0.995) return;
      const dx = (left + right) / 2 - (f.left + f.right) / 2;
      const dy = (top + bottom) / 2 - (f.top + f.bottom) / 2;
      i.style.transform = `translate(${-dx * s}px, ${-dy * s}px) scale(${s})`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(o);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);
  return (
    <span className="wl-fit" ref={outer}>
      <span className="wl-fit-in" ref={inner}>{children}</span>
    </span>
  );
}

/* The last part of a meta line is the date; keep it on one line. */
function Meta({ text }) {
  const i = text.lastIndexOf(' · ');
  if (i < 0) return text;
  return <>{text.slice(0, i + 3)}<span className="nowrap">{text.slice(i + 3)}</span></>;
}

const reaching = (e) => e.pointerType !== 'touch' && (e.movementX !== 0 || e.movementY !== 0);

function Row({ row }) {
  const [active, setActive] = useState(false);
  const on = () => setActive(true);
  const off = () => setActive(false);
  const move = (e) => { if (!active && reaching(e)) on(); };
  const { Preview } = row;
  return (
    <li className="wl-row">
      <Link
        to={row.to}
        className="wl-link"
        onPointerMove={move}
        onPointerLeave={off}
        onFocus={on}
        onBlur={off}
      >
        <span className="wl-text">
          <span className="wl-meta"><Meta text={row.meta} /></span>
          <span className="wl-title">{row.title}</span>
          <span className="wl-q">{row.q}</span>
          <span className="wl-go">Read the case <span aria-hidden="true">→</span></span>
        </span>
        <span className="wl-preview thumb-media" aria-hidden="true">
          <Fit><TileActive.Provider value={active}><Preview /></TileActive.Provider></Fit>
        </span>
      </Link>
    </li>
  );
}

export default function WorkList() {
  return (
    <section className="wl" aria-labelledby="wl-head">
      <div className="wl-head">
        <h2 id="wl-head" className="section-label">The work, newest first</h2>
      </div>
      <ol className="wl-list" role="list">
        {WORK.map((row) => <Row key={row.to} row={row} />)}
      </ol>
    </section>
  );
}
