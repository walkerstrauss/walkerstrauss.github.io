import { Thread, Facts, MessageToDraft, Check, Reply } from '../thread/Thread.jsx';
import { useSteps } from '../../lib/useSteps.js';

/*
 * Figures for the AUI overview. All of them use the thread's vocabulary:
 * blue for what a person says, red for a block, green for an allowed action
 * or a write; chips and cells for structured facts.
 *
 * Everything shown is illustrative. People, merchants, balances, windows and
 * wording are fictional, and none of it is a product interface.
 */

/* The week-one ask, handled the way the agents handle a message: the words
   become structured facts, and the facts produce a decision. */
export function AskThread() {
  return (
    <Thread caption="The ask, read the way these agents read a message: its words become structured facts, and the facts produce a decision.">
      <MessageToDraft
        index={0}
        who="The ask · week one"
        parts={[
          'Build ',
          { mark: 'demo', text: 'demos' },
          ' for the ',
          { mark: 'fs', text: 'financial services' },
          ' and ',
          { mark: 'hr', text: 'HR' },
          ' domains.',
        ]}
        label="From the ask"
        chips={[
          { k: 'Deliverable', v: 'Working demo agents', mark: 'demo' },
          { k: 'Domain', v: 'Financial services', mark: 'fs' },
          { k: 'Domain', v: 'HR', mark: 'hr' },
        ]}
      />

      <Facts
        index={1}
        label="Scoped from there"
        chips={[
          { k: 'Use case', v: 'Credit card dispute filing' },
          { k: 'Use case', v: 'Leave request submission' },
          { k: 'Audience', v: 'Potential clients' },
          { k: 'Audience', v: 'Developers', note: 'for runtime validation' },
          { k: 'Audience', v: 'Coding agents', note: 'later' },
        ]}
      />

      <Check
        index={2}
        label="Decision · two demo agents"
        cells={[
          {
            k: 'Financial services',
            v: 'Card dispute agent',
            note: 'files a dispute on a cardholder’s charge',
            tone: 'result',
          },
          {
            k: 'HR',
            v: 'Leave request agent',
            note: 'submits time off against an employee’s balance',
            tone: 'result',
          },
        ]}
      />
    </Thread>
  );
}

/* What the new domains asked of an agent that the earlier use cases did not.
   One row per question, the two side by side. */
const CONTRAST = [
  {
    k: 'Someone asks',
    before: <span className="cc-bubble">What does the warranty cover?</span>,
    after: (
      <>
        <span className="cc-bubble">Can I dispute this charge?</span>
        <span className="cc-bubble">Can I take two weeks off?</span>
      </>
    ),
  },
  {
    k: 'The agent reads',
    before: <span className="cc-chip">Product information</span>,
    after: (
      <>
        <span className="cc-chip">That person’s own records</span>
        <span className="cc-chip">The policy that applies to them</span>
      </>
    ),
  },
  {
    k: 'Before it acts',
    before: <span className="cc-none">Nothing to decide</span>,
    after: (
      <>
        <span className="cc-chip" data-tone="block">Blocked, with the reason</span>
        <span className="cc-chip" data-tone="result">Allowed</span>
        <small>A rule decides, the same way every time</small>
      </>
    ),
  },
  {
    k: 'It ends with',
    before: (
      <>
        <span className="cc-chip">An answer</span>
        <span className="cc-chip">A request escalated to a person</span>
      </>
    ),
    after: (
      <>
        <span className="cc-chip" data-tone="result">A record written</span>
        <small>dispute filed · leave submitted</small>
      </>
    ),
  },
];

/* Scroll fills the table a cell at a time, left then right, row by row, so the
   reader meets each difference in order. Scrolling back empties it. */
export function ClassContrast() {
  const [ref, step] = useSteps(CONTRAST.length * 2);
  return (
    <figure className="cc" ref={ref}>
      <div className="cc-grid" role="table" aria-label="Earlier use cases compared with the two new domains">
        <div className="cc-row cc-head" role="row">
          <span role="columnheader" aria-hidden="true" />
          <div role="columnheader">
            <span>Use cases when I joined</span>
            <strong>Answer or escalate</strong>
          </div>
          <div role="columnheader">
            <span>Financial services and HR</span>
            <strong>Act on a record, under policy</strong>
          </div>
        </div>
        {CONTRAST.map((row, i) => (
          <div className="cc-row" role="row" key={row.k}>
            <span className="cc-k" role="rowheader">{row.k}</span>
            <div className="cc-cell step" data-on={step >= i * 2 + 1} role="cell" data-label="Answer or escalate">{row.before}</div>
            <div className="cc-cell step" data-on={step >= i * 2 + 2} role="cell" data-label="Act on a record, under policy">{row.after}</div>
          </div>
        ))}
      </div>
      <figcaption>Illustrative comparison.</figcaption>
    </figure>
  );
}

/* Card dispute filing. Three decisions in one request: the account is already
   in context, the reason decides what is needed, and the filing window counts
   from the date the rule calls for. */
const DISPUTE_NOTES = [
  {
    from: 0,
    label: 'The account is already in context',
    rule: 'The card and its charges belong to the cardholder. The agent reads them from the record and matches the charge, instead of asking the cardholder to pick one.',
  },
  {
    from: 2,
    label: 'The reason decides what to ask',
    rule: 'Each dispute reason needs different facts. A missing one blocks the filing and becomes the next question.',
  },
  {
    from: 4,
    label: 'The window counts from the right date',
    rule: 'For an order that never arrived, the clock starts at promised delivery. Counted from purchase, this dispute would be turned away.',
  },
  {
    from: 6,
    label: 'Confirm, then write',
    rule: 'The filing carries the charge, reason and amount from the draft, and waits for a yes.',
  },
];

export function DisputeThread() {
  return (
    <Thread
      notes={DISPUTE_NOTES}
      caption="Illustrative conversation, policy and record. Fictional data; not a product interface."
    >
      <Facts
        index={0}
        label="From the cardholder’s record, before the first message"
        chips={[
          { k: 'Card', v: 'ending 4417' },
          { k: 'Charge', v: 'Alder & Pine · $840.00', note: '70 days ago' },
        ]}
      />

      <MessageToDraft
        index={1}
        who="Cardholder"
        parts={[
          'The ',
          { mark: 'charge', text: 'sofa I ordered from Alder & Pine' },
          ' ',
          { mark: 'reason', text: 'never arrived' },
          '. Can I dispute the charge?',
        ]}
        label="Draft, from the message"
        chips={[
          { k: 'Charge', v: 'Alder & Pine · $840.00', note: 'matched on the account', mark: 'charge' },
          { k: 'Reason', v: 'Not received', mark: 'reason' },
        ]}
      />

      <Check
        index={2}
        cells={[
          { k: 'Reason', v: 'Not received' },
          { k: 'This reason needs', v: 'Promised delivery date', note: 'not in the draft yet' },
          { k: 'Rule · facts complete', v: 'Missing · Can’t file yet', note: 'nothing written · ask for the date', tone: 'block' },
        ]}
      />

      <Reply index={3} who="Agent · Can’t file yet" tone="block">
        For an order that didn’t arrive, I need the date delivery was promised.
      </Reply>

      <MessageToDraft
        index={4}
        who="Cardholder"
        parts={['It was supposed to come ', { mark: 'date', text: 'on April 15' }, '.']}
        label="Same draft, one fact added"
        chips={[
          { k: 'Reason', v: 'Not received', note: 'kept' },
          { k: 'Promised delivery', v: 'April 15', mark: 'date' },
        ]}
      />

      <Check
        index={5}
        cells={[
          { k: 'Since promised delivery', v: '25 days', note: 'the purchase was 70 days ago' },
          { k: 'Filing window', v: '60 days', note: 'from promised delivery, for this reason' },
          { k: 'Rule · within window', v: '25 ≤ 60 · Can be filed', note: 'once confirmed', tone: 'result' },
        ]}
      />

      <Reply index={6} who="Agent · Within the filing window" tone="result" chips={[['$840.00', 'Alder & Pine'], ['Not received', 'reason']]}>
        Should I file this dispute?
      </Reply>

      <Reply index={7} who="Cardholder" tone="message">Yes.</Reply>

      <Facts
        index={8}
        label="Written"
        chips={[
          { k: 'Dispute', v: 'Filed', note: 'charge, reason and amount from the draft', tone: 'result' },
        ]}
      />

      <Reply index={9} who="Agent · Filed" tone="result">
        Filed. The card issuer reviews it from here.
      </Reply>
    </Thread>
  );
}

/* Leave request submission, in miniature. The full thread is the case study. */
const LEAVE_NOTES = [
  {
    from: 0,
    label: 'State starts before the conversation',
    rule: 'The balance and the policy that governs this employee come from the record.',
  },
  {
    from: 1,
    label: 'Words become a draft',
    rule: '“Two weeks” and “June 7” become fields a rule can read.',
  },
  {
    from: 2,
    label: 'The block shows its inputs',
    rule: 'Ten working days against six available, and a way forward.',
  },
  {
    from: 4,
    label: 'An edit updates the same draft',
    rule: 'The start date stays. The days are recalculated, the rule runs again, and the write waits for a yes.',
  },
];

export function LeaveMiniThread() {
  return (
    <Thread
      notes={LEAVE_NOTES}
      caption="Illustrative conversation, policy and record. Fictional data; not a product interface."
    >
      <Facts
        index={0}
        label="From the employee’s record, before the first message"
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
          { k: 'Length', v: '2 weeks', mark: 'length' },
          { k: 'Start', v: 'June 7', mark: 'start' },
        ]}
      />

      <Check
        index={2}
        cells={[
          { k: 'Working days', v: '10', note: 'calculated from the dates' },
          { k: 'Compared with', v: '6 available', note: 'under this employee’s policy' },
          { k: 'Rule · within balance', v: '10 > 6 · Blocked', note: 'nothing written · ask for a change', tone: 'block' },
        ]}
      />

      <Reply index={3} who="Agent · Request blocked" tone="block" chips={[['10', 'working days requested'], ['6', 'available']]}>
        I can’t submit two weeks. Would one week work?
      </Reply>

      <Facts
        index={4}
        label="After “make it one week” and a yes"
        chips={[
          { k: 'Start', v: 'June 7', note: 'kept' },
          { k: 'Working days', v: '10 → 5', note: 'recalculated' },
          { k: 'Rule', v: '5 ≤ 6', note: 'within policy', tone: 'result' },
          { k: 'Status', v: 'Submitted', tone: 'result' },
        ]}
      />
    </Thread>
  );
}
