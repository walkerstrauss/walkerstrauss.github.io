import { useSteps } from '../../lib/useSteps.js';
import './clock.css';

/*
 * The Weather Clock, redrawn from the project's own diagrams in the site's
 * line style (S349): the labelled exterior, the front/quarter/rear views,
 * the interior cutaway, and the early concept map. Proportions and parts
 * follow those diagrams; nothing is added that they do not show. Scroll is
 * the clock on the case page.
 */

const DOTS = [];
for (let r = 0; r < 5; r += 1) for (let c = 0; c < 5; c += 1) DOTS.push([74 + c * 5.5, 94 + r * 5.5]);

function Shell({ dim }) {
  return (
    <g className="ck-shell" data-dim={dim ? 'true' : undefined}>
      <path d="M40 90 L100 30 L160 90 L160 240 L40 240 Z" />
      <path className="ck-thin" d="M122 52 L122 40 L140 40 L140 70" />
    </g>
  );
}

/* The vane: a post in the chimney, an arm, a cup at each end. `turns` spins it. */
function Vane({ turns = 0 }) {
  return (
    <g className="ck-vane">
      <path d="M131 40 L131 22" />
      <g className="ck-arm" style={{ transform: `rotateY(${turns * 180}deg)` }}>
        <path d="M113 22 L149 22" />
        <circle cx="113" cy="22" r="6" />
        <circle cx="149" cy="22" r="6" />
      </g>
    </g>
  );
}

/*
 * view: "front" (what a person sees), "inside" (the cutaway) or "rear".
 * glow: the window's colour. text: the display's line. hot: the part to ring.
 */
export function ClockDrawing({ view = 'front', glow, text, turns = 0, hot, className = '' }) {
  return (
    <svg className={`ck ${className}`} viewBox="0 0 200 256" role="img" aria-label={`The weather clock, ${view} view`}>
      <Shell dim={view !== 'front'} />
      <Vane turns={turns} />
      {view === 'front' && (
        <>
          <circle className="ck-window" cx="85" cy="105" r="15" style={{ fill: glow || undefined }} data-lit={glow ? 'true' : undefined} />
          <g className="ck-dots" data-lit={glow ? 'true' : undefined}>{DOTS.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" />)}</g>
          <rect className="ck-display" x="52" y="150" width="78" height="62" rx="3" />
          <foreignObject x="56" y="154" width="70" height="54">
            <div className="ck-text" data-on={text ? 'true' : 'false'}>{text}</div>
          </foreignObject>
        </>
      )}
      {view === 'inside' && (
        <>
          <rect className="ck-part" data-hot={hot === 'servo'} x="120" y="72" width="22" height="30" rx="5" />
          <path className="ck-thin" d="M131 72 L131 40" />
          <rect className="ck-part" data-hot={hot === 'light'} x="70" y="90" width="30" height="30" rx="2" />
          <rect className="ck-part ck-dark" data-hot={hot === 'display'} x="52" y="150" width="70" height="62" rx="3" />
          <rect className="ck-part ck-board" data-hot={hot === 'board'} x="128" y="146" width="16" height="78" rx="2" />
          <rect className="ck-part" data-hot={hot === 'button'} x="94" y="224" width="14" height="12" rx="2" />
        </>
      )}
      {view === 'rear' && (
        <>
          <path className="ck-part" data-hot={hot === 'key'} d="M100 58 a6 6 0 1 1 0.01 0 M96 68 L104 68 L103 80 L97 80 Z" />
          {[[52, 104], [148, 104], [52, 226], [148, 226]].map(([x, y]) => <circle key={`${x}${y}`} className="ck-part" data-hot={hot === 'bolts'} cx={x} cy={y} r="3.5" />)}
          <rect className="ck-part" data-hot={hot === 'ports'} x="88" y="238" width="10" height="5" rx="2.5" />
          <circle className="ck-part" data-hot={hot === 'ports'} cx="110" cy="240.5" r="3.5" />
        </>
      )}
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
  { label: 'Rain outside', note: 'Live weather arrives.' },
  { label: 'The window turns a soft blue', note: 'Light, changing slowly.', glow: '#6fb4dd' },
  { label: 'The weather vane turns', note: 'Motion.', glow: '#6fb4dd', turns: 2 },
  { label: 'A line appears on the display', note: 'Generated text: a line about stillness.', glow: '#6fb4dd', turns: 2, text: 'a line about stillness' },
  { label: 'A clear day', note: 'The same clock, a warm amber glow.', glow: '#f0b24a', turns: 4 },
];

/* Decision 1: what one change in the weather does to the clock. */
export function WeatherToClock() {
  const [ref, step] = useSteps(WEATHER.length);
  const s = step >= 1 ? WEATHER[step - 1] : {};
  return (
    <div className="ck-fig" ref={ref}>
      <ClockDrawing glow={s.glow} text={s.text} turns={s.turns || 0} />
      <Steps items={WEATHER} step={step} />
    </div>
  );
}

const INSIDE = [
  { hot: 'board', label: 'Arduino UNO R4 WiFi', note: 'Fetches live weather and requests a short message.' },
  { hot: 'light', label: 'Light, behind the window', note: 'Its own module.' },
  { hot: 'servo', label: 'Servo motor', note: 'Turns the weather vane.' },
  { hot: 'display', label: 'Text display', note: 'Shows the generated line.' },
  { hot: 'button', label: 'Push button', note: 'Input from the person.' },
];

/* System: the cutaway, one part at a time. */
export function InsideParts() {
  const [ref, step] = useSteps(INSIDE.length);
  return (
    <div className="ck-fig" ref={ref}>
      <ClockDrawing view="inside" hot={step >= 1 ? INSIDE[step - 1].hot : undefined} turns={step === 3 ? 2 : 0} />
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
  ['The device', ['An air-care appliance']],
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
