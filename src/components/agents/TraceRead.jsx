import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useReveal, windowFor } from '../../lib/useReveal.jsx';
import { arrive } from '../../lib/motion.js';

/*
 * What the agent said, and what it did. The reply is the page's chat bubble
 * (the same fill, edge and label as every other bubble on the page) with a
 * tail, and it arrives as the reader scrolls, like the rest. Beside it,
 * small notes sit level with the words they explain, each on a straight
 * hairline that stops at the bubble's edge. The last note meets the tail's
 * tip: what the agent did, outside the words. Fictional wording.
 */
const NOTES = [
  { id: 'pay', k: 'Understood', v: 'a fee question' },
  { id: 'verify', k: 'Decided', v: 'verify the account first' },
  { id: 'email', k: 'Asked for', v: 'the email on file' },
  { id: 'tail', k: 'Did', v: 'nothing looked up or changed', tone: 'result' },
];
const N = NOTES.length + 1;
const R = 16;
const I = 0.5; // a 1px edge sits on the pixel grid
const TAIL = { x: 30, w: 18, h: 18 };

/* One closed path: top, right, bottom back to the tail, the tail's diagonal
   down to its tip, straight up, then home. */
function bubblePath(w, h) {
  const { x, w: tw, h: th } = TAIL;
  const r = R - I;
  return [
    `M${R} ${I}`, `H${w - R}`, `A${r} ${r} 0 0 1 ${w - I} ${R}`,
    `V${h - R}`, `A${r} ${r} 0 0 1 ${w - R} ${h - I}`,
    `H${x + tw}`, `L${x} ${h - I + th}`, `V${h - I}`,
    `H${R}`, `A${r} ${r} 0 0 1 ${I} ${h - R}`, `V${R}`, `A${r} ${r} 0 0 1 ${R} ${I}`, 'Z',
  ].join(' ');
}

function Phrase({ id, p, at, refs, children }) {
  const [a, b] = windowFor(at, N);
  const fill = useTransform(p, [a, b], [0, 1]);
  return (
    <span className="tr-mark" ref={(el) => { refs.current[id] = el; }}>
      {children}
      <motion.i style={{ scaleX: fill }} aria-hidden="true" />
    </span>
  );
}

function Lead({ i, p, pos }) {
  const [a, b] = windowFor(i + 1, N);
  const o = useTransform(p, [a, b], [0, 1]);
  const draw = useTransform(p, [a, b], [0, 1]);
  if (!pos) return null;
  return (
    <motion.g style={{ opacity: o }}>
      <motion.path className="tr-lead" d={`M${pos.nx} ${pos.y} H${pos.tx}`} style={{ pathLength: draw }} />
      <circle className="tr-dot" cx={pos.tx} cy={pos.y} r="2.6" />
    </motion.g>
  );
}

function Note({ n, i, p, top, setRef }) {
  const [a, b] = windowFor(i + 1, N);
  const o = useTransform(p, [a, b], [0, 1]);
  return (
    <motion.li className="tr-note" data-tone={n.tone} ref={setRef} style={{ opacity: o, top }}>
      <span>{n.k}</span> {n.v}
    </motion.li>
  );
}

export default function TraceRead() {
  const [ref, p] = useReveal();
  const box = useRef(null);
  const bubble = useRef(null);
  const refs = useRef({});
  const notes = useRef({});
  const [geo, setGeo] = useState({ w: 0, h: 0, pos: {} });
  const [a0, b0] = windowFor(0, N);
  const shown = useTransform(p, [a0, b0], [0, 1], { ease: arrive });
  const lift = useTransform(p, [a0, b0], [12, 0], { ease: arrive });

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    const measure = () => {
      const o = el.getBoundingClientRect();
      const lifted = bubble.current.getBoundingClientRect();
      const dy = lifted.top - (bubble.current.offsetTop + o.top);
      const bb = { left: lifted.left, right: lifted.right, width: lifted.width, height: lifted.height, top: lifted.top - dy, bottom: lifted.bottom - dy };
      const list = el.querySelector('.tr-notes').getBoundingClientRect();
      const col = list.left - o.left;
      const colTop = list.top - o.top; // notes are placed inside their own column
      const pos = {};
      let floor = -Infinity;
      NOTES.forEach((n) => {
        const m = notes.current[n.id];
        if (!m) return;
        const mh = m.getBoundingClientRect().height;
        let y;
        let tx;
        if (n.id === 'tail') {
          y = bb.bottom - o.top + TAIL.h - I;
          tx = bb.left - o.left + TAIL.x;
        } else {
          const t = refs.current[n.id].getBoundingClientRect();
          y = t.top - dy - o.top + t.height / 2;
          tx = bb.right - o.left;
        }
        y = Math.max(y, floor);
        floor = y + mh + 6;
        pos[n.id] = { y, tx, nx: col - 10, top: y - mh / 2 - colTop };
      });
      setGeo({ w: bb.width, h: bb.height, pos });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="tr" ref={(el) => { box.current = el; ref.current = el; }}>
      <motion.div className="tr-bubble" ref={bubble} style={{ opacity: shown, y: lift }}>
        {geo.w > 0 && (
          <svg className="tr-outline" width={geo.w} height={geo.h + TAIL.h} aria-hidden="true">
            <path d={bubblePath(geo.w, geo.h)} />
          </svg>
        )}
        <span className="tr-who">Agent</span>
        <p>
          I can look into that <Phrase id="pay" p={p} at={1} refs={refs}>fee</Phrase>. First I need to{' '}
          <Phrase id="verify" p={p} at={2} refs={refs}>confirm it’s your account</Phrase>: what’s the{' '}
          <Phrase id="email" p={p} at={3} refs={refs}>email on file</Phrase>?
        </p>
      </motion.div>
      <ol className="tr-notes" role="list" aria-label="What the agent did">
        {NOTES.map((n, i) => (
          <Note key={n.id} n={n} i={i} p={p} top={geo.pos[n.id]?.top} setRef={(el) => { notes.current[n.id] = el; }} />
        ))}
      </ol>
      <svg className="tr-lines" aria-hidden="true">
        {NOTES.map((n, i) => <Lead key={n.id} i={i} p={p} pos={geo.pos[n.id]} />)}
      </svg>
    </div>
  );
}
