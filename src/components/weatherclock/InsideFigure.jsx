import { useReducedMotion } from 'framer-motion';
import { useSteps } from '../../lib/useSteps.js';
import { CupArm, Marker } from './parts.jsx';
import './weatherclock.css';

/*
 * The clock with its front off: the parts, and the order a signal passes
 * through them.
 *
 * The question it answers: what is inside, and how does a weather reading end
 * up as movement? A still drawing of the wiring shows that parts are joined
 * but not which way anything travels. Playing it does: the board takes the
 * weather in (blue), a signal runs up one wire to the motor (green), and the
 * motor turns the arm on the roof. Last, the remaining wires darken to show
 * that the other parts hang off the same board. It plays with scroll, forward
 * and back; reduced motion shows the finished state with nothing moving.
 *
 * Only two parts are named, because only two can be identified from the
 * original drawing and the page text: the Arduino board and the motor under
 * the roof arm. Every other part is drawn as a plain grey shape where the
 * drawing has it and is left unlabelled.
 *
 * Stylized: the drawing's tangle of wires is reduced to one line per part,
 * parts are flat blocks, and the timing is compressed. It shows how the
 * prototype is put together, not a measurement.
 */

const STEPS = [
  {
    title: 'Weather in',
    text: 'The Arduino UNO R4 WiFi receives live weather data and requests a short message to go with it.',
  },
  {
    title: 'Board to motor',
    text: 'A signal runs up the wire to the motor, and the motor turns the arm on the roof.',
  },
  {
    title: 'One board, every part',
    text: 'The other wires run from the same board, which also handles the light, the display and the touch sensor.',
  },
];

/* One wire per part, fanned so that none cross. Each starts on the board. */
const TO_MOTOR = 'M72 259 C72 210 136 210 136 157';
const TO_REST = [
  'M88 259 C88 200 170 205 170 152',
  'M104 259 C104 180 228 195 216 101',
  'M120 259 C120 215 215 228 244 228',
  'M132 259 C132 238 190 240 190 271',
];

function Wire({ d, tone, on }) {
  return (
    <>
      <path className="wc-wire" d={d} />
      <path className="wc-wire wc-wire-live" data-tone={tone} data-on={on} d={d} pathLength="1" />
    </>
  );
}

export default function InsideFigure({ label }) {
  const [ref, step] = useSteps(STEPS.length);
  const reduce = useReducedMotion();

  return (
    <figure className="wc wc-fig wc-fig-inside" ref={ref}>
      <div className="wc-plate">
        <svg viewBox="0 0 300 322" role="img" aria-label={label}>
          {/* The box, front removed. */}
          <path className="wc-room" d="M30 143 L150 19 L270 143 L270 306 L30 306 Z" />
          <path className="wc-part" d="M61 65 H95 V77 L61 112 Z" />

          {/* Parts the drawing shows but does not name. */}
          <circle className="wc-part" cx="150" cy="47" r="6" />
          <rect className="wc-part" x="122" y="97" width="66" height="55" rx="4" />
          <rect className="wc-part" x="192" y="87" width="30" height="6" rx="3" transform="rotate(46 207 90)" />
          <rect className="wc-part" x="237" y="147" width="31" height="30" rx="4" />
          <circle className="wc-hole" cx="252.5" cy="162" r="5" />
          <rect className="wc-part" x="244" y="180" width="12" height="123" rx="3" />
          <rect className="wc-part" x="170" y="271" width="42" height="26" rx="5" />
          <rect className="wc-part" x="166" y="295" width="50" height="8" rx="3" />
          <rect className="wc-part" x="32" y="161" width="95" height="6" rx="3" />

          {/* Wires. */}
          {TO_REST.map((d) => <Wire key={d} d={d} tone="ink" on={step >= 3} />)}
          <Wire d={TO_MOTOR} tone="out" on={step >= 2} />

          {/* The motor, and the shaft up through the roof to the arm. */}
          <g className="wc-named" data-tone="out" data-on={step >= 2}>
            <rect x="56" y="132" width="53" height="28" rx="4" />
            <rect x="107" y="135" width="38" height="22" rx="5" />
          </g>

          {/* The board. */}
          <g className="wc-named" data-tone="in" data-on={step >= 1}>
            <rect x="44" y="275" width="98" height="28" rx="4" />
            <rect x="62" y="259" width="76" height="18" rx="3" />
          </g>

          <path className="wc-shell" d="M22 151 L150 19 L278 151" />
          <path className="wc-shell" d="M30 143 V306 H270 V143" />

          <rect className="wc-post" x="76.25" y="23" width="3.5" height="110" rx="1.75" />
          <CupArm x={78} y={23} reach={28} cup={8.5} turns={step >= 2 ? 1 : 0} delay={0.55} still={Boolean(reduce)} />

          <Marker n={1} x={52} y={265} on={step >= 1} />
          <Marker n={2} x={44} y={146} on={step >= 2} />
          <Marker n={3} x={229} y={198} on={step >= 3} />
        </svg>
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
