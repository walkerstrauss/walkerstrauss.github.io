import { useSteps } from '../../lib/useSteps.js';

/*
 * The whole engagement on one line, so the case reads on a skim: five stages
 * from requirements to release. Each lights as the page scrolls. `done`
 * shows the finished path (used again at the result).
 */
const STAGES = [
  ['Requirements', 'What each agent answers, verifies and hands off'],
  ['Integration', 'Webhooks and APIs tested in the customer’s ticketing system'],
  ['Tests', 'Every requirement checked against what the agent decides'],
  ['Customer review', 'Ticket replays, feedback rounds, proposed replies on live tickets'],
  ['Release', 'In phases, on the team’s own help desk'],
];

export default function PaymentsPath({ done = false }) {
  const [ref, step] = useSteps(STAGES.length);
  return (
    <ol className="path" ref={ref} role="list" aria-label="From requirements to release, in five stages">
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
