import { useSteps } from '../../lib/useSteps.js';

/*
 * The whole engagement on one line, so the case reads on a skim: four stages
 * from requirements to production. Each lights as the page scrolls. `done`
 * shows the finished path (used again at the result).
 */
const STAGES = [
  ['Requirements', 'What the agent answers, verifies and hands off'],
  ['Tests', 'Every requirement checked against what the agent decides'],
  ['Customer review', 'Feedback rounds, and proposed replies on live tickets'],
  ['Production', 'Live in the team’s help desk'],
];

export default function PaymentsPath({ done = false }) {
  const [ref, step] = useSteps(STAGES.length);
  return (
    <ol className="path" ref={ref} role="list" aria-label="From requirements to production, in four stages">
      {STAGES.map(([name, line], i) => (
        <li key={name} data-on={done || step > i ? 'true' : 'false'}>
          <span className="path-mark" aria-hidden="true" />
          <strong>{name}</strong>
          <span>{line}</span>
        </li>
      ))}
    </ol>
  );
}
