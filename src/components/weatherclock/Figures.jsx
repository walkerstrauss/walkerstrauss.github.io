

import PATTERNS from './patterns.json';
import { NAME, WEATHERS } from './RealFigures.jsx';
import { entryFor } from './lines.js';
import GuidedClock from './Guided.jsx';
import Scrub from '../aicap/Scrub.jsx';
import { useSteps } from '../../lib/useSteps.js';
import './figures.css';

/*
 * Figures for the Weather Clock case, in the layout of the other case pages:
 * one figure per decision, on a plate, played by scroll.
 *
 * The clock itself is shown at work once (AtWork). Every other figure shows
 * the one thing its decision is about: when each output fires, how the prompt becomes
 * a line, the two halves of a line, the seven light patterns, the path from
 * a weather reading to the display. Behaviour is from the sketch's code; the
 * lines are from lines.js.
 */

/* ---- The clock, once: what it does when the weather turns ------------------
   Held while it steps. One clock stays on screen and turns to face each part
   as that part acts, so the change of light and the turn of the vane are
   seen, not listed. Each step keeps what the steps before it set. */
const AT_WORK = [
  { label: 'Weather', rule: 'The clock reads the live weather. Here it has just turned to rain.', yaw: 36, notes: [] },
  { label: 'Light', rule: 'Its window plays a pattern for the weather.', yaw: 0, notes: [{ at: 'light', label: 'Light: a pattern for the weather', side: 'left' }] },
  { label: 'Vane', rule: 'The vane turns for five seconds.', yaw: 64, notes: [{ at: 'vane', label: 'The vane turns when the weather changes', side: 'right' }] },
  { label: 'Words', rule: 'A language model writes a line from the live weather for the display.', yaw: 0, notes: [{ at: 'display', label: 'A line a language model writes from the weather', side: 'left', dy: 22 }] },
  { label: 'Touch', rule: 'A touch asks for a new line. The light holds and the vane stays still.', yaw: 36, notes: [{ at: 'button', label: 'Touch for a new line', side: 'right' }] },
];

export function AtWork() {
  return (
    <div className="wc-held"><Scrub steps={AT_WORK} persist>
      {(i) => {
        const line = i >= 3 ? entryFor('rainy', i >= 4 ? 1 : 0).line : '';
        return (
          <GuidedClock
            yaw={AT_WORK[i].yaw} weather={i >= 1 ? 'rainy' : undefined} live text={line}
            turns={i >= 2 ? 3 : 0} press={i >= 4 ? 1 : undefined} notes={AT_WORK[i].notes}
            label={i ? `The weather clock in rainy weather${line ? `, showing: ${line}` : ''}` : 'The weather clock before its first weather reading'}
          />
        );
      }}
    </Scrub></div>
  );
}

/* ---- Research: each finding, shown on the clock ---------------------------
   One clock, pinned, turned to the part each finding became. The notes on
   the clock carry the point; the paragraph beside it is there for whoever
   wants the reading behind it. */
const FIND_STAGE = [
  () => {
    const e = entryFor('cloudy', 1);
    return {
      yaw: 0, weather: 'cloudy', text: e.line, turns: 0,
      notes: [
        { at: 'displayTop', label: `Technique drawn: ${e.technique.toLowerCase()}`, side: 'left' },
        { at: 'displayBottom', label: 'Never named in the line', side: 'right' },
      ],
    };
  },
  () => {
    const e = entryFor('rainy', 0);
    return {
      yaw: 0, weather: 'rainy', text: e.line, turns: 3,
      notes: [
        { at: 'vane', label: 'Speaks when the weather turns', side: 'right', tone: 'result' },
        { at: 'displayTop', label: 'First, appreciate the moment', side: 'left' },
        { at: 'displayBottom', label: 'Then one small act', side: 'right' },
      ],
    };
  },
  () => {
    const e = entryFor('rainy', 0);
    return {
      yaw: 50, weather: 'rainy', live: true, text: e.line, turns: 6,
      notes: [
        { at: 'light', label: 'Ambient: light that plays the weather', side: 'left' },
        { at: 'vane', label: 'Playful: a vane that turns', side: 'right' },
        { at: 'button', label: 'Touch for a new line', side: 'right' },
      ],
    };
  },
];

export function Findings({ items }) {
  const steps = items.map((f) => ({ label: f.title, rule: f.rule, more: f.text }));
  return (
    <div className="wc-held"><Scrub steps={steps} persist>
      {(i) => {
        const st = FIND_STAGE[i]();
        return <GuidedClock {...st} label={`The clock, for the finding: ${items[i].title}`} />;
      }}
    </Scrub></div>
  );
}

/* ---- When each output fires ------------------------------------------------ */
const CHECKS = [
  { by: 'Check', weather: 'sunny' },
  { by: 'Check', weather: 'sunny' },
  { by: 'Touch', weather: 'sunny' },
  { by: 'Check', weather: 'rainy' },
  { by: 'Check', weather: 'rainy' },
  { by: 'Check', weather: 'cloudy' },
].map((c, i, all) => ({ ...c, changed: i === 0 || all[i - 1].weather !== c.weather }));

export function Checks() {
  const [ref, step, on] = useSteps(CHECKS.length);
  const i = Math.max(0, step - 1);
  const now = CHECKS[i];
  const turns = 3 * CHECKS.slice(0, i + 1).filter((c) => c.changed).length;
  const line = step ? entryFor(now.weather, i).line : '';
  const track = (name, fires) => (
    <tr>
      <th scope="row">{name}</th>
      {CHECKS.map((c, k) => <td key={k} className="step-fade" data-on={k < step} ref={on(k + 1)} data-now={k === i && step > 0}><i data-fire={fires(c)} /></td>)}
    </tr>
  );
  return (
    <div className="wc-with-clock" ref={ref}>
      <GuidedClock
        yaw={52} weather={step ? now.weather : undefined} live text={line} turns={turns}
        press={now.by === 'Touch' && step ? i : undefined}
        label={step ? `The clock at this moment, in ${NAME[now.weather].toLowerCase()} weather, showing: ${line}` : 'The clock before its first weather reading'}
        notes={!step ? [] : [
          { at: 'light', label: now.changed ? 'New light pattern' : 'Light holds', side: 'left', tone: now.changed ? 'result' : undefined },
          { at: 'display', label: 'New line', side: 'left', dy: 24, tone: 'result' },
          { at: 'vane', label: now.changed ? 'Vane turns: the weather changed' : 'Vane stays still', side: 'right', tone: now.changed ? 'result' : undefined },
          ...(now.by === 'Touch' ? [{ at: 'button', label: 'A touch: words only', side: 'right' }] : []),
        ]}
      />
      <table className="wc-checks">
        <thead>
          <tr><td />{CHECKS.map((c, k) => <th key={k} scope="col" className="step-fade" data-on={k < step} ref={on(k + 1)} data-touch={c.by === 'Touch'}>{c.by}</th>)}</tr>
        </thead>
        <tbody>
          <tr className="wc-weather">
            <th scope="row">Outside</th>
            {CHECKS.map((c, k) => <td key={k} className="step-fade" data-on={k < step} ref={on(k + 1)} data-changed={c.changed}>{c.by === 'Touch' ? '' : NAME[c.weather]}</td>)}
          </tr>
          {track('Light', (c) => c.changed)}
          {track('Vane', (c) => c.changed)}
          {track('Words', () => true)}
        </tbody>
      </table>
    </div>
  );
}

/* ---- The display, large ---------------------------------------------------- */
const Display = ({ on = true, children }) => <div className="wc-display"><p className="step-fade" data-on={on}>{children}</p></div>;

/* ---- The prompt becomes a line -------------------------------------------- */
export function PromptToLine() {
  const [ref, step, on] = useSteps(4);
  const e = entryFor('rainy', 0); const w = e.reading;
  return (
    <div className="wc-prompt" ref={ref}>
      <dl>
        <div data-on={step >= 1} ref={on(1)}><dt>Live weather, filled in</dt><dd>“The current weather is: <mark>{w.text}</mark> it is <mark>{w.temperature}</mark> degrees outside, but feels like <mark>{w.feelsLike}</mark> degrees. The current relative humidity is <mark>{w.relativeHumidity}</mark>…”</dd></div>
        <div data-on={step >= 2} ref={on(2)}><dt>One savoring technique of ten, drawn at random</dt><dd><mark>{e.technique}</mark>: “Paying close, deliberate attention to one’s sensory experiences.”</dd></div>
        <div data-on={step >= 3} ref={on(3)}><dt>Rules for the voice</dt><dd>“Dont mention psychological terms or name techniques—let them be felt, not explained. Your tone is warm, poetic, and quietly encouraging.”</dd></div>
      </dl>
      <div className="wc-prompt-out">
        <span className="wc-label">On the display</span>
        <Display on={step >= 4}>{e.line}</Display>
      </div>
    </div>
  );
}

/* ---- One line, two halves -------------------------------------------------- */
export function TwoHalves() {
  const [ref, step, on] = useSteps(3);
  const rows = [['sunny', 0], ['cloudy', 1], ['rainy', 0]].map((r) => {
    const e = entryFor(r[0], r[1]);
    const cut = e.line.indexOf('. ') + 1;
    return { name: e.reading.text, first: e.line.slice(0, cut), then: e.line.slice(cut + 1) };
  });
  return (
    <table className="wc-halves" ref={ref}>
      <thead><tr><td /><th scope="col">Appreciate</th><th scope="col">Then one small act</th></tr></thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r.name} className="step" data-on={i < step} ref={on(i + 1)}><th scope="row">{r.name}</th><td>{r.first}</td><td>{r.then}</td></tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---- Seven kinds of weather, seven patterns ------------------------------- */
const hue = (b) => (b === 0xff ? null : b === 0xfe ? '#ffffff' : `hsl(${Math.round((b / 255) * 360)} 85% 62%)`);

export function Patterns() {
  const steps = WEATHERS.map(([, name]) => ({ label: name, rule: `The window plays the ${name.toLowerCase()} pattern.` }));
  return (
    <div className="wc-held"><Scrub steps={steps} persist>
      {(i) => {
        const [picked, name] = WEATHERS[i];
        return (
          <div className="wc-with-clock">
            <GuidedClock
              yaw={0} weather={picked} live text={entryFor(picked, 0).line} turns={3}
              label={`The clock's window showing the ${name.toLowerCase()} pattern`}
              notes={[{ at: 'light', label: `${name}: its own pattern on 64 lights`, side: 'left' }]}
            />
            <ul className="wc-patterns" role="list" aria-hidden="true">
              {WEATHERS.map(([w, n]) => {
                const frames = PATTERNS[w];
                const rows = frames[frames.length - 1];
                return (
                  <li key={w} data-on={w === picked ? 'true' : undefined}>
                    <svg viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="4" />
                      {rows.flatMap((row, y) => row.map((b, x) => (Math.hypot(x - 3.5, y - 3.5) > 4.1 ? null : <circle key={`${x}${y}`} cx={x + 0.5} cy={y + 0.5} r="0.3" style={{ fill: hue(b) || undefined }} />)))}
                    </svg>
                    <span>{n}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }}
    </Scrub></div>
  );
}

/* ---- The vane and its motor ------------------------------------------------
   The clock from the side, so the motor under the chimney and the vane it
   turns are both in view. The vane turns once as the figure arrives. */
export function Vane() {
  const [ref, step] = useSteps(1);
  return (
    <div className="wc-with-clock" ref={ref}>
      <GuidedClock
        yaw={64} weather="windy" live text={entryFor('windy', 0).line} turns={step * 3}
        label="The clock from the side: the motor under the chimney turns the vane"
        notes={[
          { at: 'vane', label: 'The vane: five seconds per change', side: 'right' },
          { at: 'motor', label: 'The motor sits under the chimney', side: 'left' },
        ]}
      />
    </div>
  );
}

/* ---- From a weather reading to the display -------------------------------- */
const PATH = [
  ['Weather reply', 'Six fields kept'],
  ['Kind of weather', 'One of seven'],
  ['Prompt', 'Weather, technique, behavior'],
  ['Language model', 'One line, 150 characters'],
  ['Check', 'Reply read key by key'],
  ['Display', 'The line, or an error'],
];

export function Path() {
  const [ref, step, on] = useSteps(PATH.length);
  return (
    <div className="wc-path" ref={ref}>
      <ol className="path" role="list" style={{ '--path-n': PATH.length }}>
        {PATH.map(([k, v], i) => <li key={k} data-on={i < step} ref={on(i + 1)}><span className="path-mark" aria-hidden="true" /><strong>{k}</strong><span>{v}</span></li>)}
      </ol>
      <p className="step" data-on={step >= 2} ref={on(2)}><b>If the kind of weather changed</b><span>the light plays its pattern and the motor turns the vane for five seconds, without holding up the loop.</span></p>
    </div>
  );
}
