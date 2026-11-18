import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import './fiveobjects.css';

/*
 * Home: one shape, five objects. A single drawn object holds the
 * centre and becomes, as the reader scrolls, each thing Walker has built or
 * studied: a brain, a mahjong tile, the weather clock, the wine kiosk, an
 * agent's reply. Each draws itself in line, holds beside the question it
 * answered, and undraws for the next. Size carries the opening: the name is
 * at display size, then shrinks as the first object draws.
 *
 * Motion follows the scroll and reverses with it. Reduced motion shows all
 * five objects at once, finished.
 */

/* Newest first: the reader meets the current work first, then the
   path back to where the questions started. Order of the Cornell work is
   the path back to the brain. */
const ITEMS = [
  {
    key: 'agent',
    when: 'AI agents',
    question: 'What should the model decide, and what should code?',
    links: [
      { to: '/work/support-agents', label: 'Customer deployments' },
      { to: '/work/policy-agents', label: 'Agents that act on records' },
    ],
    tone: 'ink',
  },
  {
    key: 'kiosk',
    when: 'Onki · AI product and UX · 2025',
    question: 'How should a kiosk talk to a shopper who didn’t ask?',
    links: [{ to: '/projects/aicap', label: 'Voice and touch for wine' }],
    tone: 'result',
  },
  {
    key: 'clock',
    when: 'Human factors · Meta Design Lab',
    question: 'How can an object at home make you notice the weather?',
    links: [{ to: '/projects/weather-clock', label: 'Savoring Weather Clock' }],
    tone: 'message',
  },
  {
    key: 'tile',
    when: 'Game design · project lead · 2025',
    question: 'What rules can two players learn by playing?',
    links: [{ to: '/projects/mahsjong', label: 'Mah’s Jong' }],
    tone: 'block',
  },
  {
    key: 'brain',
    when: 'Neuroscience · Affect and Cognition Lab',
    question: 'How does a brain respond to an image of food?',
    links: [{ to: '/research/fmri-study', label: 'fMRI study' }],
    tone: 'warm',
  },
];

const N = ITEMS.length;
const OPEN = 0.03; // a short lead before the first object draws
const span = (1 - OPEN) / N;
export const windowOf = (i) => [OPEN + i * span, OPEN + (i + 1) * span];

/* A stroke that draws in, holds, then undraws, inside its object's window. */
function Stroke({ p, i, d, delay = 0, fill, className }) {
  const [a, b] = windowOf(i);
  const w = b - a;
  const last = i === N - 1;
  const draw = useTransform(
    p,
    [a - w * 0.05 + delay * w, a + w * 0.4 + delay * w, b - w * 0.18, b],
    [0, 1, 1, last ? 1 : 0],
  );
  const show = useTransform(p, [a - w * 0.06, a, b - w * 0.08, b + 0.001], [0, 1, 1, last ? 1 : 0]);
  return (
    <motion.path
      d={d}
      className={className}
      style={{ pathLength: draw, opacity: show, fill: fill || 'none' }}
    />
  );
}

/* Fills and details that arrive after the line work. */
function Dot({ p, i, at = 0.45, children }) {
  const [a, b] = windowOf(i);
  const w = b - a;
  const last = i === N - 1;
  const o = useTransform(p, [a + w * at, a + w * (at + 0.12), b - w * 0.15, b], [0, 1, 1, last ? 1 : 0]);
  return <motion.g style={{ opacity: o }}>{children}</motion.g>;
}

/* ---------- The five drawings (viewBox 0 0 240 240) ---------- */

function Brain({ p, i }) {
  return (
    <g>
      <Stroke p={p} i={i} d="M120 36 C 72 36 40 66 38 108 C 36 146 58 170 84 182 C 98 196 116 202 132 196 C 160 200 192 182 202 150 C 214 112 196 60 160 44 C 148 38 134 36 120 36 Z" />
      <Stroke p={p} i={i} delay={0.08} d="M120 40 C 116 80 124 120 118 168" />
      <Stroke p={p} i={i} delay={0.12} d="M62 92 C 76 84 88 96 100 88 M58 128 C 74 118 86 134 102 124 M144 86 C 156 96 170 82 184 92 M140 124 C 154 134 168 118 186 128 M80 160 C 92 150 104 160 112 152" />
      <Dot p={p} i={i} at={0.4}>
        <circle cx="124" cy="140" r="9" className="fo-hot" />
        <circle cx="124" cy="140" r="18" className="fo-hot-ring" />
      </Dot>
    </g>
  );
}

/* Mah's Jong: a race to complete a hand. The opponent's tiles face down
   above; yours below, one slot empty; the drawn tile slides in and makes
   the pair that completes the hand. */
const rect = (x, y, w, h, r = 5) =>
  `M${x + r} ${y} h${w - 2 * r} a${r} ${r} 0 0 1 ${r} ${r} v${h - 2 * r} a${r} ${r} 0 0 1 -${r} ${r} h-${w - 2 * r} a${r} ${r} 0 0 1 -${r} -${r} v-${h - 2 * r} a${r} ${r} 0 0 1 ${r} -${r} Z`;
const TW = 38;
const TH = 52;
const MINE = [
  { x: 6, n: '3' },
  { x: 52, n: '4' },
  { x: 98, n: '5' },
  { x: 144, n: '7', red: true },
];
const SLOT = 190;
function Tile({ p, i }) {
  const [a, b] = windowOf(i);
  const w = b - a;
  const last = i === N - 1;
  const mx = useTransform(p, [a + w * 0.45, a + w * 0.7], [-82, 0]);
  const my = useTransform(p, [a + w * 0.45, a + w * 0.7], [-72, 0]);
  const tileIn = useTransform(p, [a + w * 0.3, a + w * 0.42, b - w * 0.15, b], [0, 1, 1, last ? 1 : 0]);
  const done = useTransform(p, [a + w * 0.68, a + w * 0.75, b - w * 0.15, b], [0, 1, 1, last ? 1 : 0]);
  return (
    <g>
      {[29, 75, 121, 167].map((x, k) => (
        <Stroke key={x} p={p} i={i} delay={k * 0.03} d={rect(x, 26, TW, TH)} className="fo-faint" />
      ))}
      {MINE.map((t, k) => (
        <Stroke key={t.x} p={p} i={i} delay={0.08 + k * 0.03} d={rect(t.x, 158, TW, TH)} />
      ))}
      <Stroke p={p} i={i} delay={0.2} d={rect(SLOT, 158, TW, TH)} className="fo-slot" />
      <Dot p={p} i={i} at={0.32}>
        {MINE.map((t) => (
          <text key={t.x} x={t.x + TW / 2} y={192} className={t.red ? 'fo-num fo-glyph-tone' : 'fo-num'}>{t.n}</text>
        ))}
      </Dot>
      <motion.g style={{ x: mx, y: my, opacity: tileIn }}>
        <path d={rect(SLOT, 158, TW, TH)} className="fo-moving" />
        <text x={SLOT + TW / 2} y={192} className="fo-num fo-glyph-tone">7</text>
      </motion.g>
      <motion.path d="M150 222 H226" className="fo-done" style={{ opacity: done }} />
    </g>
  );
}

function Clock({ p, i }) {
  const [a, b] = windowOf(i);
  const turn = useTransform(p, [a, (a + b) / 2, b], [-35, 35, -10]);
  return (
    <g>
      <Stroke p={p} i={i} d="M64 108 L120 60 L176 108 V196 H64 Z" />
      <Stroke p={p} i={i} delay={0.06} d="M120 60 V34" />
      <motion.g style={{ rotate: turn }}>
        <Stroke p={p} i={i} delay={0.1} d="M98 34 H142 M136 28 L144 34 L136 40" />
      </motion.g>
      <Stroke p={p} i={i} delay={0.12} d="M120 106 m-22 0 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0" />
      <Stroke p={p} i={i} delay={0.16} d="M86 150 h68 v28 h-68 Z" className="fo-faint" />
      <Dot p={p} i={i} at={0.42}>
        {[[-8, -8], [0, -8], [8, -8], [-8, 0], [0, 0], [8, 0], [-8, 8], [0, 8], [8, 8]].map(([x, y], k) => (
          <circle key={k} cx={120 + x} cy={106 + y} r="2.6" className="fo-led" style={{ opacity: 0.35 + ((k * 37) % 10) / 15 }} />
        ))}
        <path d="M94 162 h40 M94 170 h28" className="fo-faint" />
      </Dot>
    </g>
  );
}

function Kiosk({ p, i }) {
  return (
    <g>
      <Stroke p={p} i={i} d="M78 30 h84 a8 8 0 0 1 8 8 v136 a8 8 0 0 1 -8 8 h-84 a8 8 0 0 1 -8 -8 v-136 a8 8 0 0 1 8 -8 Z" />
      <Stroke p={p} i={i} delay={0.06} d="M120 182 V206 M92 210 H148" />
      <Stroke p={p} i={i} delay={0.1} d="M112 52 h16 v18 c0 8 12 14 12 30 v52 a6 6 0 0 1 -6 6 h-28 a6 6 0 0 1 -6 -6 v-52 c0 -16 12 -22 12 -30 Z" />
      <Dot p={p} i={i} at={0.42}>
        <rect x="108" y="112" width="24" height="26" rx="2" className="fo-label" />
        <path d="M186 74 a22 22 0 0 1 0 40 M196 64 a36 36 0 0 1 0 60" className="fo-voice" />
      </Dot>
    </g>
  );
}

function Agent({ p, i }) {
  return (
    <g>
      <Stroke p={p} i={i} d="M48 52 h144 a12 12 0 0 1 12 12 v68 a12 12 0 0 1 -12 12 h-104 l-26 22 v-22 h-14 a12 12 0 0 1 -12 -12 v-68 a12 12 0 0 1 12 -12 Z" />
      <Stroke p={p} i={i} delay={0.08} d="M62 80 h100 M62 98 h116 M62 116 h70" className="fo-faint" />
      <Stroke p={p} i={i} delay={0.12} d="M150 168 h52 v38 h-52 Z" />
      <Dot p={p} i={i} at={0.45}>
        <path d="M164 187 l8 8 l16 -16" className="fo-check" />
      </Dot>
    </g>
  );
}

export const DRAW = { brain: Brain, tile: Tile, clock: Clock, kiosk: Kiosk, agent: Agent };

/* ---------- Text beside the drawing ---------- */

function Caption({ p, i, item }) {
  const [a, b] = windowOf(i);
  const w = b - a;
  const last = i === N - 1;
  /* The caption is on screen for as long as its drawing is: it arrives as
     the first line starts and leaves as the last line goes. */
  const first = i === 0;
  const o = useTransform(p, [a - w * 0.06, a + w * 0.04, b - w * 0.1, b], [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const y = useTransform(p, [a - w * 0.06, a + w * 0.04, b - w * 0.1, b], [first ? 0 : 14, 0, 0, last ? 0 : -14]);
  const visibility = useTransform(o, (v) => (v > 0.5 ? 'visible' : 'hidden'));
  return (
    <motion.div className="fo-cap" data-tone={item.tone} style={{ opacity: o, y, visibility }}>
      <span className="fo-when">{item.when}</span>
      <p className="fo-q">{item.question}</p>
      <span className="fo-links">
        {item.links.map((l) => (
          <Link key={l.to} to={l.to} className="fo-link">{l.label} <span aria-hidden="true">→</span></Link>
        ))}
      </span>
    </motion.div>
  );
}

function Progress({ p }) {
  return (
    <ol className="fo-ticks" aria-hidden="true">
      {ITEMS.map((item, i) => <Tick key={item.key} p={p} i={i} tone={item.tone} />)}
    </ol>
  );
}
function Tick({ p, i, tone }) {
  const [a, b] = windowOf(i);
  const fill = useTransform(p, [a, b], [0, 1]);
  return (
    <li data-tone={tone}><motion.span style={{ scaleX: fill }} /></li>
  );
}

export { ITEMS, N };

export default function FiveObjects() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.6, restDelta: 0.0005 });
  const one = useMotionValue(1);
  const p = reduced ? one : smooth;

  if (reduced) {
    return (
      <section className="fo fo-still" aria-labelledby="fo-head">
        <h2 id="fo-head" className="section-label">Psychology and computer science</h2>
        <ol className="fo-still-list" role="list">
          {ITEMS.map((item) => {
            const D = DRAW[item.key];
            return (
              <li key={item.key} data-tone={item.tone}>
                <svg viewBox="0 0 240 240" className="fo-svg" aria-hidden="true"><D p={one} i={N - 1} /></svg>
                <span className="fo-when">{item.when}</span>
                <Link to={item.links[0].to} className="fo-q">{item.question}</Link>
              </li>
            );
          })}
        </ol>
      </section>
    );
  }

  return (
    <section className="fo" ref={ref} aria-labelledby="fo-head">
      <div className="fo-stage">
        <div className="fo-head">
          <h2 id="fo-head" className="section-label">Psychology and computer science</h2>
          <p className="fo-intro">I studied how people perceive and decide, and how to build the systems they use.</p>
        </div>
        <div className="fo-body">
          <svg viewBox="0 0 240 240" className="fo-svg" role="img" aria-label="A drawing that becomes an agent's reply, a wine kiosk, a weather clock, a mahjong hand and a brain">
            {ITEMS.map((item, i) => {
              const D = DRAW[item.key];
              return <g key={item.key} data-tone={item.tone} className="fo-obj"><D p={p} i={i} /></g>;
            })}
          </svg>
          <div className="fo-caps">
            {ITEMS.map((item, i) => <Caption key={item.key} p={p} i={i} item={item} />)}
          </div>
        </div>
        <Progress p={p} />
      </div>
    </section>
  );
}

/* The top of the home page: the name and the line, both there on arrival.
   The name eases down in size as the reader starts to scroll. */
export function HomeHero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 400], [1, reduced ? 1 : 0.88]);
  return (
    <header className="fo-hero cover">
      <motion.h1 className="fo-name" style={{ scale }}>Walker Strauss</motion.h1>
      <p className="fo-line">I build AI agents that hold up when a real user calls in.</p>
    </header>
  );
}
