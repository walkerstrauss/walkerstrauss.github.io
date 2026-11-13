import { useSteps } from '../../lib/useSteps.js';
import PATTERNS from './patterns.json';
import './clock.css';

/*
 * The Weather Clock, redrawn in the site's style from the project's own
 * exterior diagram (assets/weather-clock/diagram1.png: front wall, side
 * wall, roof slope with the chimney and vane, round window, display, reset)
 * and driven by the project's own code (~/meta-design-lab/
 * weather-clock-savoring): the window plays the real 8 by 8 light patterns
 * from patterns.h, the vane turns when the weather changes, and the display
 * shows a generated line. Scroll is the clock on the case page.
 */

/* A pattern byte is a hue on the LED matrix: 0xfe white, 0xff off. */
const colour = (b) => (b === 0xff ? null : b === 0xfe ? '#ffffff' : `hsl(${Math.round((b / 255) * 360)} 85% 60%)`);

/*
 * The house is a real box put through one camera, so every edge, the round
 * window, the display and the chimney share the same perspective. Proportions
 * and viewpoint are measured from diagram1.png: front wall W wide, walls H
 * high, roof rising R to a centred ridge, D deep, seen from the front-right
 * and slightly above.
 */
const W = 1; const H = 1; const R = 0.45; const D = 0.47;
const YAW = (42 * Math.PI) / 180; const PITCH = (13 * Math.PI) / 180; const CAM = 9;
const raw = (x, y, z) => {
  const sx = x * Math.cos(YAW) + z * Math.sin(YAW);
  const d = -x * Math.sin(YAW) + z * Math.cos(YAW);
  const sy = y * Math.cos(PITCH) + d * Math.sin(PITCH);
  const depth = d * Math.cos(PITCH) - y * Math.sin(PITCH);
  const k = CAM / (CAM + depth);
  return [sx * k, sy * k];
};
const SCALE = 172; const OX = 34; const OY = 300;
const P = (x, y, z = 0) => { const [u, v] = raw(x, y, z); return [OX + u * SCALE, OY - v * SCALE]; };
const pts = (list) => list.map((p) => P(...p).map((n) => n.toFixed(1)).join(',')).join(' ');
const roofY = (x) => H + (R * (W - x)) / (W / 2);

const FRONT = pts([[0, 0], [0, H], [W / 2, H + R], [W, H], [W, 0]]);
const SIDE = pts([[W, 0, 0], [W, H, 0], [W, H, D], [W, 0, D]]);
const ROOF = pts([[W / 2, H + R, 0], [W / 2, H + R, D], [W, H, D], [W, H, 0]]);
const GROUND = pts([[-0.06, 0, -0.1], [W + 0.1, 0, -0.1], [W + 0.1, 0, D + 0.12], [-0.06, 0, D + 0.12]]);

/* Round window on the front wall, just under the eaves. */
const WIN = { x: 0.5, y: 0.93, r: 0.115 };
const WINDOW = pts(Array.from({ length: 40 }, (_, i) => {
  const a = (i / 40) * Math.PI * 2;
  return [WIN.x + WIN.r * Math.cos(a), WIN.y + WIN.r * Math.sin(a)];
}));
const CELL = (WIN.r * 2) / 8;
const LEDS = Array.from({ length: 64 }, (_, i) => {
  const r = Math.floor(i / 8); const c = i % 8;
  const x0 = WIN.x - WIN.r + c * CELL + CELL * 0.14; const y1 = WIN.y + WIN.r - r * CELL - CELL * 0.14;
  const x1 = x0 + CELL * 0.72; const y0 = y1 - CELL * 0.72;
  return pts([[x0, y0], [x0, y1], [x1, y1], [x1, y0]]);
});

/* Text display on the lower front wall. */
const DISP = { x0: 0.11, x1: 0.88, y0: 0.14, y1: 0.57 };
const DISPLAY = pts([[DISP.x0, DISP.y0], [DISP.x0, DISP.y1], [DISP.x1, DISP.y1], [DISP.x1, DISP.y0]]);
const dp = (u, v) => [DISP.x0 + u * (DISP.x1 - DISP.x0), DISP.y0 + v * (DISP.y1 - DISP.y0)];
const LINES = [[0.12, 0.88, 0.7], [0.12, 0.88, 0.5], [0.12, 0.6, 0.3]].map(([u0, u1, v]) => pts([dp(u0, v), dp(u1, v)]));
/* The display's own plane as a matrix, so real text sits on it. */
const TW = 120; const TH = 68;
const TEXT_MATRIX = (() => {
  const tl = P(DISP.x0, DISP.y1); const tr = P(DISP.x1, DISP.y1); const bl = P(DISP.x0, DISP.y0);
  return `matrix(${[(tr[0] - tl[0]) / TW, (tr[1] - tl[1]) / TW, (bl[0] - tl[0]) / TH, (bl[1] - tl[1]) / TH, tl[0], tl[1]].map((n) => n.toFixed(4)).join(' ')})`;
})();

/* Reset button, low on the side wall. */
const BUTTON = pts([[W, 0.05, 0.08], [W, 0.14, 0.08], [W, 0.14, 0.24], [W, 0.05, 0.24]]);

/* Chimney on the right roof slope, holding the vane. */
const CH = { x0: 0.64, x1: 0.8, z0: 0.12, z1: 0.3, top: H + R * 0.72 + 0.1 };
const CH_FRONT = pts([[CH.x0, roofY(CH.x0), CH.z0], [CH.x0, CH.top, CH.z0], [CH.x1, CH.top, CH.z0], [CH.x1, roofY(CH.x1), CH.z0]]);
const CH_SIDE = pts([[CH.x1, roofY(CH.x1), CH.z0], [CH.x1, CH.top, CH.z0], [CH.x1, CH.top, CH.z1], [CH.x1, roofY(CH.x1), CH.z1]]);
const CH_TOP = pts([[CH.x0, CH.top, CH.z0], [CH.x0, CH.top, CH.z1], [CH.x1, CH.top, CH.z1], [CH.x1, CH.top, CH.z0]]);
const VX = (CH.x0 + CH.x1) / 2; const VZ = (CH.z0 + CH.z1) / 2; const VTOP = CH.top + 0.13;
const POST = pts([[VX, CH.top, VZ], [VX, VTOP, VZ]]);
const ARM = pts([[VX - 0.13, VTOP, VZ], [VX + 0.13, VTOP, VZ]]);
const CUPS = [P(VX - 0.13, VTOP, VZ), P(VX + 0.13, VTOP, VZ)];

/* The light behind the round window, showing one frame of a weather's pattern. */
function Matrix({ weather, frame = 0 }) {
  const frames = weather ? PATTERNS[weather] : null;
  const rows = frames ? frames[frame % frames.length] : null;
  return (
    <g className="ck-matrix" clipPath="url(#ck-window)">
      <polygon className="ck-window" points={WINDOW} />
      {LEDS.map((points, i) => {
        const fill = rows ? colour(rows[Math.floor(i / 8)][i % 8]) : null;
        return <polygon key={i} className="ck-led" points={points} style={{ fill: fill || undefined }} />;
      })}
    </g>
  );
}

/*
 * weather: which light pattern plays. frame: which frame of it. text: the
 * display's line. turns: spins the vane. hot: the part to pick out.
 * view "rear" shows the back panel.
 */
export function ClockDrawing({ view = 'front', weather, frame, text, turns = 0, hot, className = '' }) {
  if (view === 'rear') {
    return (
      <svg className={`ck ${className}`} viewBox="0 0 250 345" role="img" aria-label="The weather clock from behind">
        <ellipse className="ck-shadow" cx="125" cy="330" rx="100" ry="9" />
        <path className="ck-wall" d="M45 120 L125 30 L205 120 L205 318 L45 318 Z" />
        <path className="ck-part" data-hot={hot === 'key'} d="M125 78 a7 7 0 1 1 0.01 0 M120 90 L130 90 L129 106 L121 106 Z" />
        {[[62, 140], [188, 140], [62, 298], [188, 298]].map(([x, y]) => <circle key={`${x}${y}`} className="ck-part" data-hot={hot === 'bolts'} cx={x} cy={y} r="4.5" />)}
        <rect className="ck-part" data-hot={hot === 'ports'} x="106" y="322" width="14" height="7" rx="3.5" />
        <circle className="ck-part" data-hot={hot === 'ports'} cx="136" cy="325.5" r="4.5" />
      </svg>
    );
  }
  return (
    <svg className={`ck ${className}`} viewBox="0 0 250 345" role="img" aria-label="The weather clock: a small house with a weather vane, a round window of light and a text display">
      <defs><clipPath id="ck-window"><polygon points={WINDOW} /></clipPath></defs>
      <polygon className="ck-ground" points={GROUND} />
      <polygon className="ck-wall ck-roof" points={ROOF} />
      <polygon className="ck-wall ck-side" points={SIDE} />
      <polygon className="ck-wall" points={FRONT} />
      <g className="ck-chimney" data-hot={hot === 'servo'}>
        <polygon className="ck-part ck-ch-top" points={CH_TOP} />
        <polygon className="ck-part ck-ch-side" points={CH_SIDE} />
        <polygon className="ck-part" points={CH_FRONT} />
      </g>
      <g className="ck-vane">
        <polyline points={POST} />
        <g className="ck-arm" style={{ transform: `rotateY(${turns * 180}deg)` }}>
          <polyline points={ARM} />
          {CUPS.map(([x, y]) => <ellipse key={x} cx={x} cy={y} rx="6" ry="7.5" />)}
        </g>
      </g>
      <Matrix weather={weather} frame={frame} />
      <polygon className="ck-rim" points={WINDOW} data-hot={hot === 'light'} />
      <polygon className="ck-part ck-dark" data-hot={hot === 'display'} points={DISPLAY} />
      <g className="ck-lines" data-off={text ? 'true' : undefined}>{LINES.map((l) => <polyline key={l} points={l} />)}</g>
      <foreignObject x="0" y="0" width={TW} height={TH} transform={TEXT_MATRIX}>
        <div className="ck-text" data-on={text ? 'true' : 'false'}>{text}</div>
      </foreignObject>
      <polygon className="ck-part" data-hot={hot === 'button'} points={BUTTON} />
    </svg>
  );
}

function Steps({ items, step }) {
  return (
    <ol className="ck-steps">
      {items.map((w, i) => (
        <li key={w.label} data-on={step >= i + 1} data-now={step === i + 1}>
          <strong>{w.label}</strong>
          <span>{w.note}</span>
        </li>
      ))}
    </ol>
  );
}

const WEATHER = [
  { label: 'The weather changes to rain', note: 'The clock checks live weather on a timer.' },
  { label: 'The window plays the rain pattern', note: 'One of the light patterns written for rain.', weather: 'rainy', frame: 0 },
  { label: 'The vane turns for five seconds', note: 'Only when the weather has changed.', weather: 'rainy', frame: 1, turns: 3 },
  { label: 'A line appears on the display', note: 'Generated from the weather and a savoring technique, 150 characters at most.', weather: 'rainy', frame: 2, turns: 3, text: 'a short poetic line about the rain' },
  { label: 'Later, the sun comes out', note: 'A different pattern, and the vane turns again.', weather: 'sunny', frame: 0, turns: 6 },
];

/* Decision 1: what one change in the weather does to the clock. */
export function WeatherToClock() {
  const [ref, step] = useSteps(WEATHER.length);
  const s = step >= 1 ? WEATHER[step - 1] : {};
  return (
    <div className="ck-fig" ref={ref}>
      <ClockDrawing weather={s.weather} frame={s.frame} text={s.text} turns={s.turns || 0} />
      <Steps items={WEATHER} step={step} />
    </div>
  );
}

/* Decision 2: what the clock does and when, from the main loop. */
const WHEN = [
  ['The weather changes', true, true, true],
  ['The weather stays the same', false, false, true],
  ['Someone touches the clock', false, false, true],
];

export function WhenItSpeaks() {
  const [ref, step] = useSteps(WHEN.length);
  return (
    <div className="ck-when" ref={ref} role="table" aria-label="What the clock does and when">
      <div role="row" className="ck-when-head"><span role="columnheader" /><span role="columnheader">Light pattern</span><span role="columnheader">Vane turns</span><span role="columnheader">New line</span></div>
      {WHEN.map(([k, light, vane, line], i) => (
        <div key={k} role="row" className="ck-when-row step" data-on={step >= i + 1}>
          <span role="rowheader">{k}</span>
          {[light, vane, line].map((on, n) => <span key={n} role="cell" data-yes={on}>{on ? 'Yes' : 'Stays still'}</span>)}
        </div>
      ))}
    </div>
  );
}

const INSIDE = [
  { hot: 'light', label: 'Light matrix, behind the round window', note: 'Plays the pattern for the current weather.' },
  { hot: 'servo', label: 'Motor, under the chimney', note: 'Turns the weather vane.' },
  { hot: 'display', label: 'Text display', note: 'Shows the generated line.' },
  { hot: 'button', label: 'Touch input', note: 'Asks for a new line.' },
];

/* System: the parts a person sees, one at a time. */
export function InsideParts() {
  const [ref, step] = useSteps(INSIDE.length);
  return (
    <div className="ck-fig" ref={ref}>
      <ClockDrawing hot={step >= 1 ? INSIDE[step - 1].hot : undefined} weather={step === 1 ? 'cloudy' : undefined} turns={step === 2 ? 3 : 0} text={step === 3 ? 'a short poetic line' : ''} />
      <Steps items={INSIDE} step={step} />
    </div>
  );
}

const REAR = [
  { hot: 'key', label: 'Key holder', note: 'For wall mounting.' },
  { hot: 'bolts', label: 'Bolts', note: 'The back panel comes off.' },
  { hot: 'ports', label: 'C-type and power ports', note: 'Underneath.' },
];

/* The rear and underside, from the labelled exterior diagram. */
export function RearParts() {
  const [ref, step] = useSteps(REAR.length);
  return (
    <div className="ck-fig" ref={ref}>
      <ClockDrawing view="rear" hot={step >= 1 ? REAR[step - 1].hot : undefined} />
      <Steps items={REAR} step={step} />
    </div>
  );
}

/* The early concept map, column by column, in its own words. */
const MAP = [
  ['The device', ['An air purifier']],
  ['What it does', ['Implicit signaling', 'Auto setting reminders', 'Invitations to reflect']],
  ['What follows', ['Product upkeep', 'Save energy', 'More free time', 'Access to clean air']],
  ['For the person', ['Increased savoring and gratitude', 'Increased attachment', 'Longer product lifetime']],
];

export function ConceptMap() {
  const [ref, step] = useSteps(MAP.length);
  return (
    <div className="ck-map" ref={ref}>
      {MAP.map(([head, nodes], i) => (
        <div key={head} className="ck-col step" data-on={step >= i + 1}>
          <small>{head}</small>
          {nodes.map((n) => <span key={n} data-key={n === 'Increased savoring and gratitude' ? 'true' : undefined}>{n}</span>)}
        </div>
      ))}
    </div>
  );
}

/* The weekly documents, in order (~/meta-design-lab, Nov 15 to Feb 10). */
const WEEKS = [
  ['Nov 15', 'Three ideas for savoring home appliances: a recipe assistant, clean air, clothing care.'],
  ['Nov 22', 'Who acts and who receives: the recipe assistant as acts of kindness.'],
  ['Dec 6', 'Brain writing on Gaeul’s Read the Air: which savoring technique each behavior supports.'],
  ['Dec 20', 'The Weather Clock as four modules: sensing, display, playful motion, connection.'],
  ['Feb 10', 'Display logic, and a choice between two playful interactions.'],
];

export function ProcessTimeline() {
  const [ref, step] = useSteps(WEEKS.length);
  return (
    <ol className="path" role="list" ref={ref} aria-label="The weekly sessions, from first ideas to the clock">
      {WEEKS.map(([d, text], i) => (
        <li key={d} data-on={step >= i + 1 ? 'true' : 'false'}><span className="path-mark" aria-hidden="true" /><strong>{d}</strong><span>{text}</span></li>
      ))}
    </ol>
  );
}

/* The Feb 10 comparison of two playful interactions, in its own points. */
const OPTIONS = [
  {
    name: 'A motor that waves or knocks',
    chosen: true,
    plus: ['Precise timing and frequency', 'Wave or knock, fast or slow', 'We already had a motor'],
    minus: ['Movement may be hard to perfect', 'Motor noise could distract', 'Motors wear out'],
  },
  {
    name: 'A ball that drops',
    plus: ['A simple mechanism', 'Playful sight and sound', 'Shows whether people respond'],
    minus: ['The ball can roll away or get lost', 'People may ignore it over time', 'Does not fit what a clock does'],
  },
];

export function InteractionChoice() {
  const [ref, step] = useSteps(3);
  return (
    <div className="ck-choice" ref={ref}>
      {OPTIONS.map((o, i) => (
        <div key={o.name} className="ck-option step" data-on={step >= i + 1} data-chosen={o.chosen && step >= 3 ? 'true' : undefined}>
          <strong>{o.name}</strong>
          <ul data-kind="plus">{o.plus.map((p) => <li key={p}>{p}</li>)}</ul>
          <ul data-kind="minus">{o.minus.map((p) => <li key={p}>{p}</li>)}</ul>
          {o.chosen && <span className="ck-chosen step-fade" data-on={step >= 3}>Built: the motor turns the weather vane</span>}
        </div>
      ))}
    </div>
  );
}
