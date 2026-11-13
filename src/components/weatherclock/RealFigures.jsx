import { useSteps } from '../../lib/useSteps.js';
import './clock.css';

/*
 * The Weather Clock, redrawn from the project's own diagrams in the site's
 * line style (S349): the labelled exterior, the front/quarter/rear views,
 * the interior cutaway, and the early concept map. Proportions and parts
 * follow those diagrams; nothing is added that they do not show. Scroll is
 * the clock on the case page.
 */

/* The LED matrix behind the window: a 5 by 5 grid. */
const DOTS = [];
for (let r = 0; r < 5; r += 1) for (let c = 0; c < 5; c += 1) DOTS.push([117 + c * 4.6, 88 + r * 4.6]);

/*
 * The quarter view from Gaeul Han's diagram (the site's original thumbnail):
 * a see-through house with the parts visible inside. The same drawing serves
 * every figure. glow: the light's colour. text: the display's line. turns:
 * spins the vane. hot: the part to pick out. view "rear" shows the back.
 */
export function ClockDrawing({ view = 'front', glow, text, turns = 0, hot, className = '' }) {
  if (view === 'rear') {
    return (
      <svg className={`ck ${className}`} viewBox="0 0 280 260" role="img" aria-label="The weather clock from behind">
        <ellipse className="ck-shadow" cx="140" cy="240" rx="95" ry="9" />
        <path className="ck-wall" d="M70 95 L140 32 L210 95 L210 228 L70 228 Z" />
        <path className="ck-part" data-hot={hot === 'key'} d="M140 62 a6 6 0 1 1 0.01 0 M136 72 L144 72 L143 84 L137 84 Z" />
        {[[84, 110], [196, 110], [84, 214], [196, 214]].map(([x, y]) => <circle key={`${x}${y}`} className="ck-part" data-hot={hot === 'bolts'} cx={x} cy={y} r="4" />)}
        <rect className="ck-part" data-hot={hot === 'ports'} x="124" y="232" width="12" height="6" rx="3" />
        <circle className="ck-part" data-hot={hot === 'ports'} cx="150" cy="235" r="4" />
      </svg>
    );
  }
  return (
    <svg className={`ck ${className}`} viewBox="0 0 280 260" role="img" aria-label="The weather clock, seen from the front quarter with its parts visible">
      <ellipse className="ck-shadow" cx="140" cy="242" rx="100" ry="9" />
      {/* side wall, gable wall, roof slope */}
      <path className="ck-wall" d="M58 82 L96 98 L96 236 L58 212 Z" />
      <path className="ck-wall" d="M96 98 L152 36 L218 92 L218 218 L96 236 Z" />
      <path className="ck-wall ck-roof" d="M58 82 L118 22 L152 36 L96 98 Z" />

      {/* board on the side wall */}
      <path className="ck-part ck-board" data-hot={hot === 'board'} d="M66 142 L90 153 L90 222 L66 208 Z" />
      {/* push button */}
      <path className="ck-part" data-hot={hot === 'button'} d="M70 214 L80 219 L80 229 L70 224 Z" />
      {/* servo under the vane */}
      <rect className="ck-part" data-hot={hot === 'servo'} x="96" y="62" width="18" height="26" rx="6" />
      <g className="ck-vane">
        <path d="M105 62 L105 16" />
        <g className="ck-arm" style={{ transform: `rotateY(${turns * 180}deg)` }}>
          <path d="M86 16 L124 16" />
          <ellipse cx="86" cy="16" rx="7" ry="6" />
          <ellipse cx="124" cy="16" rx="7" ry="6" />
        </g>
      </g>
      {/* light behind the round window */}
      <rect className="ck-part ck-matrix" data-hot={hot === 'light'} x="113" y="84" width="27" height="27" rx="4" style={{ fill: glow || undefined }} data-lit={glow ? 'true' : undefined} />
      <g className="ck-dots" data-lit={glow ? 'true' : undefined}>{DOTS.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" />)}</g>
      {/* text display */}
      <path className="ck-part ck-dark" data-hot={hot === 'display'} d="M110 140 L204 130 L204 196 L110 210 Z" />
      <g className="ck-lines" data-off={text ? 'true' : undefined}><path d="M122 160 L190 152" /><path d="M122 172 L190 164" /><path d="M122 184 L166 179" /></g>
      <foreignObject x="114" y="140" width="86" height="60">
        <div className="ck-text" data-on={text ? 'true' : 'false'}>{text}</div>
      </foreignObject>
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
      <ClockDrawing hot={step >= 1 ? INSIDE[step - 1].hot : undefined} turns={step === 3 ? 2 : 0} />
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
