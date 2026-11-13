import { Thread, Facts, Run } from './thread/Thread.jsx';

/*
 * Same facts, same decision. The structured request is shown once; then three
 * runs of the same blocked turn. Each run's wording differs. The decision cell
 * beside each one is identical, and that repetition is the figure's point.
 *
 * Why a figure: "the wording varies, the decision does not" is a claim a
 * reader has to take on trust in prose and can check at a glance here.
 * Illustrative replay with fictional values.
 */

const RUNS = [
  'I can’t submit two weeks. That’s 10 working days and you have 6. Would one week work?',
  'Two weeks would use 10 working days against the 6 you have, so I can’t submit it. One week would fit.',
  'That request is over your balance, 10 days against 6, so I’m unable to submit it. Want to try one week?',
];

const DECISION = { k: 'Rule · within balance', v: '10 > 6 · Blocked', note: 'nothing written', tone: 'block' };

export default function SameDecisionReplay() {
  return (
    <Thread wide caption="Illustrative replay. The wording changes from run to run. The decision, and the write it withholds, do not.">
      <Facts
        index={0}
        label="The same structured request, every run"
        chips={[
          { k: 'Working days', v: '10' },
          { k: 'Available', v: '6' },
          { k: 'Negative balance', v: 'Not allowed' },
        ]}
      />
      {RUNS.map((text, i) => (
        <Run key={text} index={i + 1} who={`Run ${i + 1} · Agent`} tone="block" cell={DECISION}>
          {text}
        </Run>
      ))}
    </Thread>
  );
}
