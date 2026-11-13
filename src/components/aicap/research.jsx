import { useSteps } from '../../lib/useSteps.js';
import './research.css';

/*
 * Figures for the Onki research sections. Every number and finding is the
 * page's own (the shopper survey and the review of other products); nothing
 * is added here.
 */

/* Twenty respondents, one glyph each, grouped by how they'd prefer to use
   the kiosk. The single "voice only" person is the point. */
const MODES = [
  ['Touch: presets and buttons', 8, 'touch'],
  ['Voice and touch', 4, 'touch'],
  ['Touch and text', 2, 'touch'],
  ['Text', 3, 'other'],
  ['I wouldn’t use it', 2, 'other'],
  ['Voice only', 1, 'voice'],
];

function Person() {
  return (
    <svg viewBox="0 0 20 34" aria-hidden="true">
      <circle cx="10" cy="6" r="5" />
      <path d="M3 34V19a7 7 0 0 1 14 0v15z" />
    </svg>
  );
}

export function TwentyPeople() {
  const [ref, step] = useSteps(MODES.length);
  return (
    <figure className="rs-people" ref={ref}>
      <figcaption>
        <strong>Which way would you prefer to use AICap?</strong>
        <span>20 respondents</span>
      </figcaption>
      <div className="rs-groups" role="list">
        {MODES.map(([label, n, kind], i) => (
          <div key={label} role="listitem" className="rs-group" data-kind={kind} data-on={step >= i + 1} aria-label={`${label}: ${n} of 20`}>
            <span className="rs-glyphs">{Array.from({ length: n }, (_, k) => <Person key={k} />)}</span>
            <span className="rs-label"><b>{n}</b> {label}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}

/* What we looked at, what we saw there, and what it put in the design. */
const SEEN = [
  ['An earlier in-store wine kiosk', 'Savvo Digital Sommelier', 'Testers wanted to explore before being guided, and preferred a more playful prototype.', 'A friendly, playful tone. Shoppers set the pace.'],
  ['Wine apps and online stores', 'Vivino, Wine.com, Winc', 'Winc’s short overview expands into detail.', 'The recommendation card: essentials up front, the rest a glance away.'],
  ['Self-serve screens in public', 'Ordering kiosks, self-checkout, shelf screens', 'People feel self-conscious talking to a machine with others around.', 'Touch is a complete path, not a backup for voice.'],
];

export function SawTook() {
  const [ref, step] = useSteps(SEEN.length * 2);
  return (
    <div className="rs-saw" ref={ref} role="table" aria-label="What we saw in other products and what we took from each">
      <div className="rs-saw-head" role="row"><span role="columnheader">We looked at</span><span role="columnheader">What we saw</span><span role="columnheader">What we took</span></div>
      {SEEN.map(([kind, names, saw, took], i) => (
        <div className="rs-saw-row" role="row" key={kind}>
          <span role="rowheader"><b>{kind}</b><small>{names}</small></span>
          <span role="cell" className="rs-cell step" data-on={step >= i * 2 + 1}>{saw}</span>
          <span role="cell" className="rs-cell rs-took step" data-on={step >= i * 2 + 2}>{took}</span>
        </div>
      ))}
    </div>
  );
}

/* How a conversation was tested: a simulated shopper talks to the assistant,
   and a rubric checks the transcript. */
const RUBRIC = ['Stayed on topic', 'Avoided repetition', 'Asked about preferences at the right time'];

export function TestLoop() {
  const [ref, step] = useSteps(2 + RUBRIC.length);
  return (
    <div className="rs-test" ref={ref}>
      <ol className="path" role="list" aria-label="How a conversation was tested">
        <li data-on={step >= 1 ? 'true' : 'false'}><span className="path-mark" aria-hidden="true" /><strong>Simulated shopper</strong><span>Plays a shopper with preferences</span></li>
        <li data-on={step >= 2 ? 'true' : 'false'}><span className="path-mark" aria-hidden="true" /><strong>Conversation</strong><span>The assistant answers over several turns</span></li>
        <li data-on={step >= 3 ? 'true' : 'false'}><span className="path-mark" aria-hidden="true" /><strong>Rubric</strong><span>The transcript is checked</span></li>
      </ol>
      <ul className="rs-rubric" role="list" aria-label="What the rubric checks">
        {RUBRIC.map((r, i) => <li key={r} className="step" data-on={step >= i + 3}>{r}</li>)}
      </ul>
    </div>
  );
}
