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

/* What acting on a record asks of an agent that answering a question does
   not. One row per question, the two side by side. */
const CONTRAST = [
  {
    k: 'Someone asks',
    before: <span className="cc-bubble">What’s included in the plan?</span>,
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
      <div className="cc-grid" role="table" aria-label="An agent that answers compared with one that acts on a record">
        <div className="cc-row cc-head" role="row">
          <span role="columnheader" aria-hidden="true" />
          <div role="columnheader">
            <span>Question answering</span>
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
