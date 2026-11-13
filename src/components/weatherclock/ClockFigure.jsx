import { useReducedMotion } from 'framer-motion';
import { useSteps } from '../../lib/useSteps.js';
import { ClockScene, Marker } from './parts.jsx';
import './weatherclock.css';

/*
 * The clock from outside, and what it does with the weather.
 *
 * The question it answers: what is this object, and what happens on it when
 * the weather comes in? The form alone (a small house with a round window, a
 * display and an arm on the roof) does not show that the three parts answer
 * one input, in order. Playing it does: the weather arrives, the window
 * glows, the arm turns, the message appears. It plays with scroll, forward
 * and back, like every figure on the case pages; reduced motion shows the
 * finished state with nothing moving.
 *
 * Stylized: three flat faces stand in for the box, the message on the display
 * is bars (the words are in the list beside it), and one condition is shown,
 * the clear day in amber that the Interaction Framework section describes.
 * It shows the behaviour, not a finding.
 */

const STEPS = [
  { title: 'Weather in', text: 'Live temperature, humidity and wind reach the clock.' },
  { title: 'Light', text: 'The round window glows: warm amber on a clear day, soft blue in rain.' },
  { title: 'Motion', text: 'The arm on the roof turns, slowly.' },
  {
    title: 'Message',
    text: 'A short line appears on the display, such as “With steam that rises, a cup so fine, / Nine forty-one, it’s coffee time.”',
  },
];

export default function ClockFigure({ label }) {
  const [ref, step] = useSteps(STEPS.length);
  const reduce = useReducedMotion();

  return (
    <figure className="wc wc-fig" ref={ref}>
      <div className="wc-plate">
        <ClockScene
          role="img"
          aria-label={label}
          weather={step >= 1 ? 'clear' : null}
          glow={step >= 2 ? 'amber' : 'off'}
          turns={step >= 3 ? 1 : 0}
          message={step >= 4 ? 0 : null}
          still={Boolean(reduce)}
        >
          <Marker n={1} x={94} y={69} on={step >= 1} />
          <Marker n={2} x={207} y={93} on={step >= 2} />
          <Marker n={3} x={270} y={45} on={step >= 3} />
          <Marker n={4} x={218} y={122} on={step >= 4} />
        </ClockScene>
      </div>
      <ol className="wc-steps" role="list">
        {STEPS.map((s, i) => (
          <li key={s.title} className="step" data-on={step > i}>
            <b>{i + 1}</b>
            <div>
              <strong>{s.title}</strong>
              <span>{s.text}</span>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
