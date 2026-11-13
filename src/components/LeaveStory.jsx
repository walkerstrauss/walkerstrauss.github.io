import { Thread, Facts, MessageToDraft, Check, Reply } from './thread/Thread.jsx';

/*
 * One leave request, turn by turn. The thread mechanics (scroll as the clock,
 * chained blocks, phrases becoming fields) live in thread/Thread.jsx.
 *
 * Illustrative: fictional employee, policy and wording. Not a product surface.
 */

/* The four design decisions, listed beside the conversation. Each lights when
   the block it shaped is about to play. */
const DECISIONS = [
  {
    from: 0,
    label: 'Start a structured request from the first message',
    rule: 'Otherwise the agent re-asks for what it was just told, and nothing can be checked.',
  },
  {
    from: 2,
    label: 'Derive the facts a rule needs before the rule runs',
    rule: '“Two weeks” isn’t a number the policy can compare. The calendar makes it one.',
  },
  {
    from: 3,
    label: 'Block with the rule and its inputs in the reply',
    rule: 'A block without its reason is a dead end. With the numbers, the employee knows what to change.',
  },
  {
    from: 4,
    label: 'Edit the same request, run the same check',
    rule: 'The start date stays. Only the working days and the check change, and the write waits for both.',
  },
];

/* The three steps that reach the leave decision. */
function balanceCheck(days, daysNote, verdict) {
  const block = verdict === 'block';
  return [
    { k: 'Working days', v: days, note: daysNote },
    { k: 'Compared with', v: '6 available', note: 'under this employee’s policy' },
    {
      k: 'Rule · within balance',
      v: block ? '10 > 6 · Blocked' : '5 ≤ 6 · Within policy',
      note: block ? 'nothing written · ask for a change' : 'can be submitted once confirmed',
      tone: verdict,
    },
  ];
}

export default function LeaveStory() {
  return (
    <Thread
      notes={DECISIONS}
      caption="Illustrative conversation, policy and record. Fictional data; not a product interface."
    >
      <Facts
        index={0}
        label="From the record, before the first message"
        chips={[
          { k: 'Vacation available', v: '6 days' },
          { k: 'Policy', v: 'Accrued leave only', note: 'no negative balance' },
        ]}
      />

      <MessageToDraft
        index={1}
        who="Employee"
        parts={['Can I take ', { mark: 'length', text: 'two weeks' }, ' off starting ', { mark: 'start', text: 'June 7' }, '?']}
        label="Draft, from the message"
        chips={[
          { k: 'Type', v: 'Vacation', note: 'default' },
          { k: 'Length', v: '2 weeks', mark: 'length' },
          { k: 'Start', v: 'June 7', mark: 'start' },
        ]}
      />

      <Check index={2} cells={balanceCheck('10', 'calculated from the dates', 'block')} />

      <Reply index={3} who="Agent · Request blocked" tone="block" chips={[['10', 'working days requested'], ['6', 'available']]}>
        I can’t submit two weeks. Would one week work?
      </Reply>

      <MessageToDraft
        index={4}
        who="Employee"
        parts={['Yes, make it ', { mark: 'length', text: 'one week' }, '.']}
        label="Same draft, edited"
        chips={[
          { k: 'Start', v: 'June 7', note: 'kept' },
          { k: 'Length', v: '1 week', note: 'was 2 weeks', mark: 'length' },
        ]}
      />

      <Check index={5} cells={balanceCheck('5', 'recalculated', 'result')} />

      <Reply index={6} who="Agent · Within policy" tone="result" chips={[['5', 'working days'], ['June 7', 'start date kept']]}>
        Should I submit June 7–11?
      </Reply>

      <Reply index={7} who="Employee" tone="message">Yes.</Reply>

      <Facts
        index={8}
        label="Written"
        chips={[
          { k: 'Status', v: 'Submitted', tone: 'result' },
          { k: 'Vacation available', v: '6 → 1', note: 'updated', tone: 'result' },
        ]}
      />

      <Reply index={9} who="Agent · Submitted" tone="result">
        Submitted June 7–11. You have 1 vacation day left.
      </Reply>
    </Thread>
  );
}
