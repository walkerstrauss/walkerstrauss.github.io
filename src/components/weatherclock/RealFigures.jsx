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

/* The light behind the round window, showing one frame of a weather's pattern. */
function Matrix({ weather, frame = 0 }) {
  const frames = weather ? PATTERNS[weather] : null;
  const rows = frames ? frames[frame % frames.length] : null;
  return (
    <g className="ck-matrix" clipPath="url(#ck-window)">
      <circle className="ck-window" cx="91" cy="123" r="17" />
      {Array.from({ length: 64 }, (_, i) => {
        const r = Math.floor(i / 8); const c = i % 8;
        const fill = rows ? colour(rows[r][c]) : null;
        return <rect key={i} className="ck-led" x={75 + c * 4.1} y={107 + r * 4.1} width="3.1" height="3.1" rx="0.8" style={{ fill: fill || undefined }} data-on={fill ? 'true' : undefined} />;
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
      <defs><clipPath id="ck-window"><circle cx="91" cy="123" r="17" /></clipPath></defs>
      <ellipse className="ck-shadow" cx="130" cy="330" rx="112" ry="10" />
      {/* side wall, roof slope, front wall */}
      <path className="ck-wall ck-side" d="M169.5 120 L232.5 107 L232.5 306 L169.5 328 Z" />
      <path className="ck-wall ck-roof" d="M91.5 22.5 L159 10 L232.5 107 L169.5 120 Z" />
      <path className="ck-wall" d="M18 97.5 L91.5 22.5 L169.5 120 L169.5 328 L18 298 Z" />
      {/* chimney and vane */}
      <g className="ck-chimney" data-hot={hot === 'servo'}>
        <path className="ck-part" d="M161 68 L180 72 L180 100 L161 78 Z" />
        <path className="ck-part" d="M180 72 L196 66 L196 92 L180 100 Z" />
        <path className="ck-part" d="M161 68 L177 62 L196 66 L180 72 Z" />
      </g>
      <g className="ck-vane">
        <path d="M178 66 L178 36" />
        <g className="ck-arm" style={{ transform: `rotateY(${turns * 180}deg)` }}>
          <path d="M158 34 L198 34" />
          <ellipse cx="158" cy="34" rx="8" ry="7" />
          <ellipse cx="198" cy="34" rx="8" ry="7" />
        </g>
      </g>
      {/* round window with the light behind it */}
      <g data-hot={hot === 'light'} className="ck-hotwrap"><Matrix weather={weather} frame={frame} /></g>
      <circle className="ck-rim" cx="91" cy="123" r="17" data-hot={hot === 'light'} />
      {/* text display */}
      <path className="ck-part ck-dark" data-hot={hot === 'display'} d="M35 187 L151 199 L151 292 L35 283 Z" />
      <g className="ck-lines" data-off={text ? 'true' : undefined}><path d="M50 215 L136 224" /><path d="M50 232 L136 241" /><path d="M50 249 L104 254.5" /></g>
      <foreignObject x="40" y="196" width="106" height="86">
        <div className="ck-text" data-on={text ? 'true' : 'false'}>{text}</div>
      </foreignObject>
      {/* push button on the side wall */}
      <path className="ck-part" data-hot={hot === 'button'} d="M176 298 L189 294.5 L189 311 L176 315 Z" />
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
