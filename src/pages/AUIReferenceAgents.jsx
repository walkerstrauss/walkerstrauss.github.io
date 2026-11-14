import { useState } from 'react';
import { Beat, Instead, Plate, Trio } from '../components/case/Case.jsx';
import { ClassContrast, DisputeThread } from '../components/aui/overview.jsx';
import LeaveStory from '../components/LeaveStory.jsx';
import SameDecisionReplay from '../components/SameDecisionReplay.jsx';
import { Check, Facts, MessageToDraft, Reply, Thread } from '../components/thread/Thread.jsx';

/*
 * One case: the two demo agents. Problem, four decisions (each with the one
 * figure that shows it), the full conversations on demand, and the result.
 * Every figure is illustrative, with fictional people, policies and wording.
 */
const NOTE = 'Illustrative, with fictional data.';

function Walkthrough() {
  const [which, setWhich] = useState('dispute');
  return (
    <>
      <div className="case-switch" role="group" aria-label="Choose a conversation">
        <button type="button" aria-pressed={which === 'dispute'} onClick={() => setWhich('dispute')}>Card dispute</button>
        <button type="button" aria-pressed={which === 'leave'} onClick={() => setWhich('leave')}>Leave request</button>
      </div>
      <Plate>
        {which === 'dispute' ? <DisputeThread key="dispute" /> : <LeaveStory key="leave" />}
      </Plate>
    </>
  );
}

/* Rendered inside the one AUI page (S346). */
export default function AUIReferenceAgents() {
  return (
    <>
        <Beat id="ref-problem" eyebrow="Part 1 · Code decides the rules" title="In financial services and HR, a request ends in a record.">
          <p>
            Many support conversations end with an answer or a handoff to a
            person. A dispute or a leave request ends with something written
            to a company system, so the agent has to read the person’s own
            records, apply the company’s policy, and only then write.
          </p>
          <Plate label="Answering a question, and acting on a record">
            <ClassContrast />
          </Plate>
          <Trio items={[
            ['The person', 'Wants something done: a charge disputed, time off booked. If it can’t be done, they need the reason and a next step.'],
            ['The goal', 'A working agent in each domain for sales demos. They were also used as regression signals for the runtime.'],
            ['The constraint', 'A write has to follow policy the same way every time. Both agents ran on mock records and services.'],
          ]} />
        </Beat>

        <Beat
          id="check-first"
          eyebrow="Part 1 · Decision 1"
          title={<><Instead>Instead of collecting a request and checking it later,</Instead>the agent checks before it writes.</>}
        >
          <p>
            The self-service workflows I reviewed collect a leave request and
            pass it on. Here the request stays a draft until a rule has read it.
          </p>
          <Plate tone="solution" kind="Solution" label="A draft that a rule can check">
            <Thread caption={NOTE}>
              <Facts index={0} label="From the record, before the first message" chips={[
                { k: 'Vacation available', v: '6 days' },
                { k: 'Policy', v: 'Accrued leave only', note: 'no negative balance' },
              ]} />
              <MessageToDraft index={1} who="Employee"
                parts={['Can I take ', { mark: 'length', text: 'two weeks' }, ' off starting ', { mark: 'start', text: 'June 7' }, '?']}
                label="Draft, from the message"
                chips={[{ k: 'Length', v: '2 weeks', mark: 'length' }, { k: 'Start', v: 'June 7', mark: 'start' }]} />
              <Check index={2} cells={[
                { k: 'Working days', v: '10', note: 'calculated from the dates' },
                { k: 'Compared with', v: '6 available', note: 'under this employee’s policy' },
                { k: 'Rule · within balance', v: '10 > 6 · Blocked', note: 'nothing written', tone: 'block' },
              ]} />
            </Thread>
          </Plate>
        </Beat>

        <Beat
          id="reason"
          eyebrow="Part 1 · Decision 2"
          title={<><Instead>Instead of one fixed set of questions,</Instead>the reason for a dispute decides what the agent asks.</>}
        >
          <p>
            Each dispute reason needs different facts. A missing one blocks the
            filing and becomes the next question.
          </p>
          <Plate tone="solution" kind="Solution" label="The missing fact becomes the question">
            <Thread caption={NOTE}>
              <MessageToDraft index={0} who="Cardholder"
                parts={['The ', { mark: 'charge', text: 'sofa I ordered from Alder & Pine' }, ' ', { mark: 'reason', text: 'never arrived' }, '. Can I dispute the charge?']}
                label="Draft, from the message"
                chips={[
                  { k: 'Charge', v: 'Alder & Pine · $840.00', note: 'matched on the account', mark: 'charge' },
                  { k: 'Reason', v: 'Not received', mark: 'reason' },
                ]} />
              <Check index={1} cells={[
                { k: 'Reason', v: 'Not received' },
                { k: 'This reason needs', v: 'Promised delivery date', note: 'not in the draft yet' },
                { k: 'Rule · facts complete', v: 'Missing · Can’t file yet', note: 'nothing written', tone: 'block' },
              ]} />
              <Reply index={2} who="Agent · Can’t file yet" tone="block">
                For an order that didn’t arrive, I need the date delivery was promised.
              </Reply>
            </Thread>
          </Plate>
        </Beat>

        <Beat
          id="block"
          eyebrow="Part 1 · Decision 3"
          title={<><Instead>Instead of a refusal,</Instead>a block shows the rule and its inputs.</>}
        >
          <p>
            A block without its reason is a dead end. With the numbers, the
            employee knows what to change.
          </p>
          <Plate tone="problem" kind="Problem" label="A block with no reason">
            <Thread>
              <Reply index={0} who="Agent" tone="block">I’m unable to submit that request.</Reply>
            </Thread>
          </Plate>
          <Plate tone="solution" kind="Solution" label="The rule and its inputs, with a way forward">
            <Thread caption={NOTE}>
              <Reply index={0} who="Agent · Request blocked" tone="block" chips={[['10', 'working days requested'], ['6', 'available']]}>
                I can’t submit two weeks. Would one week work?
              </Reply>
            </Thread>
          </Plate>
        </Beat>

        <Beat
          id="edit"
          eyebrow="Part 1 · Decision 4"
          title={<><Instead>Instead of starting over,</Instead>an edit updates the same draft.</>}
        >
          <p>
            The start date stays. The days are recalculated, the same check
            runs again, and the write waits for a yes.
          </p>
          <Plate tone="solution" kind="Solution" label="Same draft, one field changed">
            <Thread caption={NOTE}>
              <MessageToDraft index={0} who="Employee"
                parts={['Yes, make it ', { mark: 'length', text: 'one week' }, '.']}
                label="Same draft, edited"
                chips={[{ k: 'Start', v: 'June 7', note: 'kept' }, { k: 'Length', v: '1 week', note: 'was 2 weeks', mark: 'length' }]} />
              <Check index={1} cells={[
                { k: 'Working days', v: '5', note: 'recalculated' },
                { k: 'Compared with', v: '6 available', note: 'under this employee’s policy' },
                { k: 'Rule · within balance', v: '5 ≤ 6 · Within policy', note: 'can be submitted once confirmed', tone: 'result' },
              ]} />
              <Reply index={2} who="Agent · Within policy" tone="result" chips={[['5', 'working days'], ['June 7', 'start date kept']]}>
                Should I submit June 7–11?
              </Reply>
            </Thread>
          </Plate>
        </Beat>

        <Beat id="end-to-end" eyebrow="Part 1 · End to end" title="One request, start to finish.">
          <p>Each conversation plays as you scroll, with its decisions beside it.</p>
          <Walkthrough />
        </Beat>

        <Beat id="result" eyebrow="Part 1 · Result" title="Same facts, same decision.">
          <p>
            The reply’s wording varies from run to run. The decision and the
            write do not, and the trace records the rule and the values it
            read. In the demos, the same request produced the same decision
            every time.
          </p>
          <Plate tone="solution" kind="Result" label="Three runs, one decision">
            <SameDecisionReplay />
          </Plate>
        </Beat>
    </>
  );
}
