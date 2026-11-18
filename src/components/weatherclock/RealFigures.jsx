import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useReducedMotion } from 'framer-motion';
import { useSteps } from '../../lib/useSteps.js';
import { EASE } from '../../lib/motion.js';
import PATTERNS from './patterns.json';
import { entryFor, lineFor } from './lines.js';
import './clock.css';

/*
 * The Weather Clock, drawn in the site's style and used as the guiding visual
 * of its case page: every decision is shown as something that happens on the
 * clock.
 *
 * Form: the project's own diagrams (assets/weather-clock/diagram1.png for the
 * exterior; diagram2.png and diagram3.png for where the parts sit inside).
 * They are references for a new drawing, not traced or pasted.
 * Behaviour: the project's own code (~/meta-design-lab/weather-clock-savoring).
 * The window plays the real 8 by 8 light patterns from patterns.h, one frame
 * a second; the vane turns when the weather category changes; the display
 * takes a generated line. No generated line is on record, so the display
 * shows bars unless real text is passed in.
 */

/* A pattern byte is a hue on the LED matrix: 0xfe white, 0xff off. */
const colour = (b) => (b === 0xff ? null : b === 0xfe ? '#ffffff' : `hsl(${Math.round((b / 255) * 360)} 85% 62%)`);

/* The colour a weather's patterns use most, for the glow round the window. */
const TINT = Object.fromEntries(Object.entries(PATTERNS).map(([name, frames]) => {
  const count = {};
  frames.flat(2).forEach((b) => { if (b < 0xfe) count[b] = (count[b] || 0) + 1; });
  const top = Object.entries(count).sort((a, b) => b[1] - a[1])[0];
  return [name, top ? `hsl(${Math.round((top[0] / 255) * 360)} 80% 62%)` : '#ffffff'];
}));

/*
 * The house is a real box put through one camera, so every edge, the round
 * window, the display, the chimney and the parts inside share one
 * perspective, and the clock can be drawn from any side. Proportions are
 * measured from diagram1.png: front wall W wide, walls H high, roof rising R
 * to a centred ridge, D deep. `yaw` turns the clock about its upright axis:
 * 0 faces the front, 42 is the diagram's front-right quarter view, 180 the
 * back. Change the drawing here, never by hand-placing points.
 */
const W = 1; const H = 1; const R = 0.45; const D = 0.47;
const CAM = 9; const EYE = 2.1; const SCALE = 172; const CX = 125; const OY = 305;
const xy = (p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
const roofY = (x) => H + (R * (W - x)) / (W / 2);

/* Round window on the front wall, just under the eaves. Local units: 8 by 8,
   one per LED. */
const WIN = { x: 0.5, y: 0.94, r: 0.12 };
/* Text display on the lower front wall. Local units: 120 by 68. */
const DISP = { x0: 0.11, x1: 0.88, y0: 0.14, y1: 0.57 };
const TW = 120; const TH = 68;
/* Line lengths for a message on the display. */
const BARS = [[0.8, 0.92, 0.5], [0.88, 0.64, 0.76], [0.7, 0.9, 0.42], [0.92, 0.6, 0.82]];
/* Chimney on the right roof slope, holding the vane. */
const CH = { x0: 0.68, x1: 0.83, z0: 0.12, z1: 0.3, top: H + R * 0.64 + 0.09 };
const VX = (CH.x0 + CH.x1) / 2; const VZ = (CH.z0 + CH.z1) / 2; const VTOP = CH.top + 0.14; const REACH = 0.135;
/* Inside, placed as in the cutaway diagrams: the motor under the chimney with
   its shaft up to the vane, the light matrix behind the window, the board
   standing beside the display. */
const SERVO = { r: 0.068, y0: 0.84, y1: 1.05 };
const BX = 0.9;
const BUTTON_AT = [W, 0.095, 0.16];
const BOARD_AT = [BX, 0.4, 0.24];

const rect = (axis, at, a0, a1, b0, b1) => (axis === 'x'
  ? [[at, a0, b0], [at, a1, b0], [at, a1, b1], [at, a0, b1]]
  : [[a0, b0, at], [a0, b1, at], [a1, b1, at], [a1, b0, at]]);

const SHAPES = [
  { name: 'front', cls: 'ck-wall ck-front', n: [0, 0, -1], at: [[0, 0, 0], [0, H, 0], [W / 2, H + R, 0], [W, H, 0], [W, 0, 0]] },
  { name: 'back', cls: 'ck-wall ck-front', n: [0, 0, 1], at: [[0, 0, D], [0, H, D], [W / 2, H + R, D], [W, H, D], [W, 0, D]] },
  { name: 'left', cls: 'ck-wall ck-side', n: [-1, 0, 0], at: rect('x', 0, 0, H, 0, D) },
  { name: 'right', cls: 'ck-wall ck-side', n: [1, 0, 0], at: rect('x', W, 0, H, 0, D) },
  { name: 'roofL', cls: 'ck-wall ck-roof', n: [-R, W / 2, 0], at: [[W / 2, H + R, 0], [W / 2, H + R, D], [0, H, D], [0, H, 0]] },
  { name: 'roofR', cls: 'ck-wall ck-roof', n: [R, W / 2, 0], at: [[W / 2, H + R, 0], [W / 2, H + R, D], [W, H, D], [W, H, 0]] },
  { name: 'chF', chimney: true, cls: 'ck-part', n: [0, 0, -1], bias: 0.25, at: [[CH.x0, roofY(CH.x0), CH.z0], [CH.x0, CH.top, CH.z0], [CH.x1, CH.top, CH.z0], [CH.x1, roofY(CH.x1), CH.z0]] },
  { name: 'chB', chimney: true, cls: 'ck-part', n: [0, 0, 1], bias: 0.25, at: [[CH.x0, roofY(CH.x0), CH.z1], [CH.x0, CH.top, CH.z1], [CH.x1, CH.top, CH.z1], [CH.x1, roofY(CH.x1), CH.z1]] },
  { name: 'chL', chimney: true, cls: 'ck-part ck-ch-side', n: [-1, 0, 0], bias: 0.25, at: rect('x', CH.x0, roofY(CH.x0), CH.top, CH.z0, CH.z1) },
  { name: 'chR', chimney: true, cls: 'ck-part ck-ch-side', n: [1, 0, 0], bias: 0.25, at: rect('x', CH.x1, roofY(CH.x1), CH.top, CH.z0, CH.z1) },
  { name: 'chT', chimney: true, cls: 'ck-part ck-ch-top', n: [0, 1, 0], bias: 0.25, at: [[CH.x0, CH.top, CH.z0], [CH.x0, CH.top, CH.z1], [CH.x1, CH.top, CH.z1], [CH.x1, CH.top, CH.z0]] },
  /* Inside. Thin plates, seen from either side. */
  { name: 'matrix', inner: true, cls: 'ck-in', hot: 'light', at: rect('z', 0.03, 0.34, 0.66, 0.77, 1.1) },
  { name: 'panel', inner: true, cls: 'ck-in ck-panel', hot: 'display', at: rect('z', 0.04, DISP.x0, DISP.x1, DISP.y0, DISP.y1) },
  { name: 'board', inner: true, cls: 'ck-in ck-board', hot: 'board', at: rect('x', BX, 0.05, 0.64, 0.07, 0.42) },
  { name: 'chip', inner: true, cls: 'ck-in ck-board-chip', bias: 0.01, at: rect('x', BX, 0.28, 0.46, 0.16, 0.33) },
  { name: 'servo', inner: true, at: [[VX, SERVO.y0, VZ], [VX, SERVO.y1, VZ]] },
  { name: 'wires', inner: true, bias: -0.02, at: [BOARD_AT] },
];

const MODELS = new Map();
export function clockModel(yawDeg) { return build(yawDeg); }
function build(yawDeg) {
  const key = Math.round(yawDeg * 2) / 2;
  if (MODELS.has(key)) return MODELS.get(key);
  const yaw = (key * Math.PI) / 180; const c = Math.cos(yaw); const s = Math.sin(yaw);
  /* A pinhole camera at eye height, CAM in front of the clock, looking level:
     upright edges stay upright, as in the diagram. */
  const eye = [W / 2 + CAM * s, EYE, D / 2 - CAM * c];
  const depth = (x, y, z) => -(x - W / 2) * s + (z - D / 2) * c;
  const P = (x, y, z = 0) => {
    const k = CAM / (CAM + depth(x, y, z));
    return [CX + ((x - W / 2) * c + (z - D / 2) * s) * k * SCALE, OY - ((y - EYE) * k + EYE) * SCALE];
  };
  const pts = (list) => list.map((p) => xy(P(...p))).join(' ');
  const patch = (tl, tr, bl, w, h) => {
    const a = P(...tl); const b = P(...tr); const o = P(...bl);
    return `matrix(${[(b[0] - a[0]) / w, (b[1] - a[1]) / w, (o[0] - a[0]) / h, (o[1] - a[1]) / h, a[0], a[1]].map((n) => n.toFixed(4)).join(' ')})`;
  };
  const items = SHAPES.map((f) => {
    const p0 = f.at[0];
    const facing = f.n ? f.n[0] * (p0[0] - eye[0]) + f.n[1] * (p0[1] - eye[1]) + f.n[2] * (p0[2] - eye[2]) < 0 : true;
    const d = f.at.reduce((a, p) => a + depth(...p), 0) / f.at.length - (f.bias || 0);
    return { ...f, facing, d, points: pts(f.at) };
  }).sort((a, b) => b.d - a.d);
  const sees = Object.fromEntries(items.map((f) => [f.name, f.facing]));

  const ring = (y) => Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    return P(VX + SERVO.r * Math.cos(a), y, VZ + SERVO.r * Math.sin(a));
  });
  const top = ring(SERVO.y1); const base = ring(SERVO.y0);
  const edge = (list, pick) => list.reduce((best, p) => (pick(p[0], best[0]) ? p : best));
  const curve = (from, to, bend) => {
    const a = P(...from); const b = P(...to);
    return `M${xy(a)} Q${((a[0] + b[0]) / 2 + bend[0]).toFixed(1)},${((a[1] + b[1]) / 2 + bend[1]).toFixed(1)} ${xy(b)}`;
  };
  const m = {
    P, items, sees,
    /* Where a note can point: one spot per part a reader is told about. */
    at: {
      light: P(WIN.x - WIN.r, WIN.y, 0),
      lightR: P(WIN.x + WIN.r, WIN.y, 0),
      displayTop: P(DISP.x0, DISP.y1 - 0.09, 0),
      displayBottom: P(DISP.x1, DISP.y0 + 0.1, 0),
      display: P(DISP.x0, (DISP.y0 + DISP.y1) / 2, 0),
      vane: P(VX + REACH * 0.6, VTOP, VZ),
      motor: P(CH.x1, (CH.top + roofY(CH.x1)) / 2, CH.z0),
      button: P(...BUTTON_AT),
    },
    ground: pts([[-0.08, 0, -0.1], [W + 0.08, 0, -0.1], [W + 0.08, 0, D + 0.1], [-0.08, 0, D + 0.1]]),
    win: patch([WIN.x - WIN.r, WIN.y + WIN.r, 0], [WIN.x + WIN.r, WIN.y + WIN.r, 0], [WIN.x - WIN.r, WIN.y - WIN.r, 0], 8, 8),
    disp: patch([DISP.x0, DISP.y1, 0], [DISP.x1, DISP.y1, 0], [DISP.x0, DISP.y0, 0], TW, TH),
    display: pts(rect('z', 0, DISP.x0, DISP.x1, DISP.y0, DISP.y1)),
    button: pts(rect('x', W, 0.05, 0.14, 0.08, 0.24)),
    buttonAt: P(...BUTTON_AT),
    /* The back wall, 100 units wide from its own left edge, 145 high. */
    rear: patch([W, H + R, D], [0, H + R, D], [W, 0, D], 100, 145),
    /* Seen from the left, the ridge hides the foot of the post. */
    post: pts([[VX, sees.roofR ? CH.top : H + R, VZ], [VX, VTOP, VZ]]),
    servo: {
      base: base.map(xy).join(' '), top: top.map(xy).join(' '),
      body: [edge(top, (a, b) => a < b), edge(top, (a, b) => a > b), edge(base, (a, b) => a > b), edge(base, (a, b) => a < b)].map(xy).join(' '),
      shaft: pts([[VX, SERVO.y1, VZ], [VX, CH.top, VZ]]),
    },
    wires: {
      light: curve(BOARD_AT, [0.6, 0.86, 0.03], [10, -18]),
      servo: curve(BOARD_AT, [VX, SERVO.y0 + 0.04, VZ], [12, 0]),
      display: curve(BOARD_AT, [0.8, 0.3, 0.04], [0, 14]),
      button: curve(BOARD_AT, BUTTON_AT, [8, 6]),
    },
  };
  if (MODELS.size > 800) MODELS.clear();
  MODELS.set(key, m);
  return m;
}

/* The frame a window shows: its fullest frame. The patterns are not played on
   a timer; on this page motion follows the scroll, so a figure that wants to
   show a pattern steps through it with the reader. */
function useFrame(weather) {
  return weather ? PATTERNS[weather].length - 1 : 0;
}

/* A number that eases to its target: used to turn the clock between steps. */
export function useEased(target, duration = 1.1) {
  const reduced = useReducedMotion();
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (reduced) { from.current = target; setV(target); return undefined; }
    const run = animate(from.current, target, { duration, ease: EASE, onUpdate: (x) => { from.current = x; setV(x); } });
    return () => run.stop();
  }, [target, duration, reduced]);
  return v;
}

/* The arm with two cups, turning about the post. `turns` counts half-turns. */
function Vane({ turns, m }) {
  const reduced = useReducedMotion();
  const target = 0.3 + turns * Math.PI;
  const [a, setA] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (reduced) { from.current = target; setA(target); return undefined; }
    const run = animate(from.current, target, { duration: 2.6, ease: EASE, onUpdate: (x) => { from.current = x; setA(x); } });
    return () => run.stop();
  }, [target, reduced]);
  const end = (sign) => m.P(VX + sign * REACH * Math.cos(a), VTOP, VZ + sign * REACH * Math.sin(a));
  const p = end(1); const q = end(-1);
  /* The nearer cup is drawn larger; "nearer" is lower on screen here. */
  const lean = (p[1] - q[1]) / 14;
  return (
    <g className="ck-vane">
      <polyline points={m.post} />
      <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} />
      <circle cx={p[0]} cy={p[1]} r={6.4 * (1 + 0.12 * lean)} />
      <circle cx={q[0]} cy={q[1]} r={6.4 * (1 - 0.12 * lean)} />
    </g>
  );
}

/*
 * yaw       the side the clock is seen from, in degrees (42 is the quarter view)
 * weather   which light pattern plays (a key of patterns.json), or none
 * frame     a fixed frame; leave out with `live` to let the pattern run
 * line      a number: a message is on the display; changing it rewrites it
 * text      real words for the display, in place of bars
 * turns     half-turns the vane has made
 * hot       the part to pick out: light | servo | display | button | board
 * inside    walls turn to glass and the parts inside show
 * flow      wires carrying a signal: any of light, servo, display, button
 * press     a number; changing it shows a touch on the button
 * children  drawn on top; a function receives the model (P, sees)
 */
export function ClockDrawing({
  yaw = 42, weather, frame, line, text, turns = 0, hot, inside = false, flow = [], press,
  className = '', viewBox = '0 0 250 345', label, children,
}) {
  const id = useId().replace(/:/g, '');
  const running = useFrame(weather);
  const m = build(yaw);
  const frames = weather ? PATTERNS[weather] : null;
  const rows = frames ? frames[(frame === undefined ? running : frame) % frames.length] : null;
  const bars = line === undefined || line === null ? null : BARS[line % BARS.length];

  const onFront = (
    <g key="on-front">
      <g transform={m.win}>
        <circle className="ck-glow" data-on={rows ? 'true' : 'false'} cx="4" cy="4" r="9" fill={`url(#${id}g)`} />
        <g clipPath={`url(#${id}w)`}>
          <circle className="ck-window" cx="4" cy="4" r="4" />
          {Array.from({ length: 64 }, (_, i) => {
            const fill = rows ? colour(rows[Math.floor(i / 8)][i % 8]) : null;
            return <circle key={i} className="ck-led" cx={(i % 8) + 0.5} cy={Math.floor(i / 8) + 0.5} r="0.33" style={{ fill: fill || undefined }} />;
          })}
        </g>
        <circle className="ck-rim" cx="4" cy="4" r="4" data-hot={hot === 'light'} />
      </g>
      <polygon className="ck-part ck-dark" data-hot={hot === 'display'} points={m.display} />
      <g transform={m.disp}>
        {bars && !text && (
          <g key={line} className="ck-bars">
            {bars.map((w, i) => <rect key={i} x="13" y={15 + i * 15} width={w * (TW - 26)} height="5.5" rx="2.75" style={{ animationDelay: `${0.25 + i * 0.28}s` }} />)}
          </g>
        )}
        <foreignObject x="0" y="0" width={TW} height={TH}>
          <div key={text} className="ck-text" data-on={text ? 'true' : 'false'}>{text}</div>
        </foreignObject>
      </g>
    </g>
  );
  const onRight = (
    <g key="on-right">
      <polygon className="ck-part ck-button" data-hot={hot === 'button'} points={m.button} />
      {press ? <circle key={press} className="ck-press" cx={m.buttonAt[0]} cy={m.buttonAt[1]} r="7" /> : null}
    </g>
  );
  const onBack = (
    <g key="on-back" transform={m.rear} className="ck-rear">
      <circle cx="50" cy="31" r="5.5" />
      <rect x="47.4" y="31" width="5.2" height="13" rx="2.6" />
      {[[11, 62], [89, 62], [11, 134], [89, 134]].map(([x, y]) => <circle key={`${x}${y}`} className="ck-screw" cx={x} cy={y} r="3" />)}
    </g>
  );

  return (
    <svg
      className={`ck ${className}`}
      viewBox={viewBox}
      role="img"
      data-inside={inside ? 'true' : undefined}
      aria-label={label || 'The weather clock, a home appliance with a weather vane, a round window of light and a text display'}
    >
      <defs>
        <clipPath id={`${id}w`}><circle cx="4" cy="4" r="4" /></clipPath>
        <radialGradient id={`${id}g`}>
          <stop offset="0.3" stopColor={weather ? TINT[weather] : '#fff'} stopOpacity="0.42" />
          <stop offset="1" stopColor={weather ? TINT[weather] : '#fff'} stopOpacity="0" />
        </radialGradient>
      </defs>
      <polygon className="ck-ground" points={m.ground} />
      {m.items.map((f) => {
        if (f.inner) {
          if (!inside) return null;
          if (f.name === 'servo') {
            return (
              <g key="servo" className="ck-servo ck-inner" data-hot={hot === 'servo'}>
                <polygon className="ck-in" points={m.servo.base} />
                <polygon className="ck-in ck-servo-body" points={m.servo.body} />
                <polygon className="ck-in" points={m.servo.top} />
                <polyline className="ck-shaft" points={m.servo.shaft} />
              </g>
            );
          }
          if (f.name === 'wires') {
            return (
              <g key="wires" className="ck-inner">
                {Object.entries(m.wires).map(([k, d]) => (
                  <g key={k}>
                    <path className="ck-wire" d={d} />
                    <path className="ck-wire ck-wire-live" data-on={flow.includes(k)} d={d} pathLength="1" />
                  </g>
                ))}
              </g>
            );
          }
          return <polygon key={f.name} className={`${f.cls} ck-inner`} data-hot={f.hot ? hot === f.hot : undefined} points={f.points} />;
        }
        if (!f.facing && !inside) return null;
        const face = <polygon key={f.name} className={f.cls} data-away={f.facing ? undefined : 'true'} data-chimney={f.chimney ? 'true' : undefined} data-hot={f.chimney && hot === 'servo' ? 'true' : undefined} points={f.points} />;
        if (!f.facing) return face;
        if (f.name === 'front') return [face, onFront];
        if (f.name === 'right') return [face, onRight];
        if (f.name === 'back') return [face, onBack];
        return face;
      })}
      <Vane turns={turns} m={m} />
      {typeof children === 'function' ? children(m) : children}
    </svg>
  );
}

/* ---- The weather outside, as a card beside the clock --------------------- */

const GLYPH = {
  sunny: (
    <g className="ck-sun">
      <circle r="8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => <line key={deg} y1="-12.5" y2="-17" transform={`rotate(${deg})`} />)}
    </g>
  ),
  cloudy: <path className="ck-cloud" d="M-13 6 a7 7 0 0 1 1 -14 a9 9 0 0 1 17 -2 a7.5 7.5 0 0 1 7 16 Z" />,
  rainy: (
    <g>
      <path className="ck-cloud" d="M-13 1 a7 7 0 0 1 1 -14 a9 9 0 0 1 17 -2 a7.5 7.5 0 0 1 7 16 Z" />
      {[-8, 0, 8].map((x) => <line key={x} className="ck-drop" x1={x + 1.5} y1="7" x2={x - 1.5} y2="15" />)}
    </g>
  ),
  snowy: (
    <g>
      <path className="ck-cloud" d="M-13 1 a7 7 0 0 1 1 -14 a9 9 0 0 1 17 -2 a7.5 7.5 0 0 1 7 16 Z" />
      {[-8, 0, 8].map((x, i) => <circle key={x} className="ck-flake" cx={x} cy={i === 1 ? 14 : 10} r="1.7" />)}
    </g>
  ),
  windy: (
    <g className="ck-wind">
      <path d="M-15 -6 H5 a4.5 4.5 0 1 0 -4.5 -4.5" />
      <path d="M-15 2 H11 a4.5 4.5 0 1 1 -4.5 4.5" />
      <path d="M-15 10 H-2" />
    </g>
  ),
  hail: (
    <g>
      <path className="ck-cloud" d="M-13 1 a7 7 0 0 1 1 -14 a9 9 0 0 1 17 -2 a7.5 7.5 0 0 1 7 16 Z" />
      {[-8, 0, 8].map((x, i) => <circle key={x} className="ck-stone" cx={x} cy={i === 1 ? 14.5 : 10} r="2.4" />)}
    </g>
  ),
  thunder: (
    <g>
      <path className="ck-cloud" d="M-13 1 a7 7 0 0 1 1 -14 a9 9 0 0 1 17 -2 a7.5 7.5 0 0 1 7 16 Z" />
      <path className="ck-bolt" d="M2 4 L-4 12 H1 L-2 19 L6 9 H1 Z" />
    </g>
  ),
};

export const WEATHERS = [
  ['sunny', 'Sunny'], ['cloudy', 'Cloudy'], ['windy', 'Windy'], ['rainy', 'Rainy'], ['snowy', 'Snowy'], ['hail', 'Hail'], ['thunder', 'Thunder'],
];
export const NAME = Object.fromEntries(WEATHERS);

/* Drawn inside a ClockDrawing whose viewBox starts at -104. `sent` is a
   number; changing it sends a pulse from the card to the clock. */
export function WeatherCard({ weather, sent }) {
  return (
    <g className="ck-card">
      <text className="ck-card-label" x="-64" y="118" textAnchor="middle">Outside</text>
      <rect x="-95" y="126" width="62" height="62" rx="12" />
      <g transform="translate(-64 157)">
        <AnimatePresence mode="wait" initial={false}>
          {weather && (
            <motion.g key={weather} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
              {GLYPH[weather]}
            </motion.g>
          )}
        </AnimatePresence>
      </g>
      <text className="ck-card-name" x="-64" y="204" textAnchor="middle">{weather ? NAME[weather] : ''}</text>
      <path className="ck-link" d="M-27 157 H24" />
      {sent ? <path key={sent} className="ck-link ck-link-live" d="M-27 157 H24" pathLength="1" /> : null}
    </g>
  );
}

export const SCENE_BOX = '-104 0 354 345';

/* What the clock just did, under the drawing: the three outputs, each either
   changed or left alone. */
export function Outputs({ light, vane, line }) {
  const cell = (k, on, yes, no) => (
    <span key={k} data-on={on ? 'true' : 'false'}><small>{k}</small>{on ? yes : no}</span>
  );
  return (
    <div className="ck-outputs">
      {cell('Light', light, 'New pattern', 'Same pattern')}
      {cell('Vane', vane, 'Turns for 5 s', 'Stays still')}
      {cell('Words', line, 'New line', 'Same line')}
    </div>
  );
}

/* What is on the display, large enough to read, with the reading it came
   from. `draw` also names the technique and behavior that were drawn; `text`
   replaces the line (an error message, for instance). */
export function Said({ weather, n, draw = false, text }) {
  const e = n === null || n === undefined ? null : entryFor(weather, n);
  const line = text || (e ? e.line : '\u00a0');
  return (
    <div className="ck-line" aria-live="polite">
      <small>{e ? `${e.reading.text} · ${e.reading.temperature}° · feels like ${e.reading.feelsLike}° · humidity ${e.reading.relativeHumidity}%` : 'On the display'}</small>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p key={line} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
          {line}
        </motion.p>
      </AnimatePresence>
      <span className="ck-draw" data-on={draw && e && !text ? 'true' : 'false'}>{e ? `Drawn for this line: ${e.technique} · ${e.behavior}` : '\u00a0'}</span>
    </div>
  );
}

/* ---- Problem: the same weather as an alert ------------------------------- */

export function ProblemFigure() {
  const [ref, step, on] = useSteps(2);
  return (
    <figure className="ck-problem" ref={ref}>
      <div className="ck-alert step" data-on={step >= 1} ref={on(1)} data-done={step >= 2} aria-label="A weather app alert">
        <small>Weather · now</small>
        <b>Rain starting soon</b>
      </div>
      <p className="ck-problem-note step-fade" data-on={step >= 2} ref={on(2)}>Opened, read, dismissed.</p>
    </figure>
  );
}

/* ---- Process: the weekly documents, in order ----------------------------- */

const WEEKS = [
  ['Nov 15', 'Three ideas for savoring home appliances: a recipe assistant, clean air, clothing care.'],
  ['Nov 22', 'The recipe assistant as acts of kindness: who acts, and who receives.'],
  ['Dec 6', 'Each behavior of an earlier device of Gaeul’s, mapped to the savoring technique it supports.'],
  ['Dec 20', 'The Weather Clock, planned as four modules: sensing, display, playful motion, connection.'],
  ['Feb 10', 'Display logic, and the motor that turns the vane.'],
];

export function ProcessTimeline() {
  const [ref, step, on] = useSteps(WEEKS.length, ['start 0.98', 'start 0.72']);
  return (
    <ol className="path" role="list" ref={ref} aria-label="The weekly sessions, from first ideas to the clock">
      {WEEKS.map(([d, text], i) => (
        <li key={d} data-on={step >= i + 1 ? 'true' : 'false'} ref={on(i + 1)}><span className="path-mark" aria-hidden="true" /><strong>{d}</strong><span>{text}</span></li>
      ))}
    </ol>
  );
}
