import { Link } from 'react-router-dom';
import { Beat, Plate, PlatePair } from '../components/case/Case.jsx';
import Spec from '../components/agents/Spec.jsx';
import { ClassContrast } from '../components/agents/overview.jsx';
import SameDecisionReplay from '../components/SameDecisionReplay.jsx';
import { Check, Facts, MessageToDraft, Reply, Thread } from '../components/thread/Thread.jsx';

/*
 * One case: the two demo agents. Problem, the spec research behind the
 * decisions, then one leave request told start to finish across Decisions
 * 1–3 (check, a block that says why, an edit through to the yes), the same
 * approach on a dispute (Decision 4), and the result. The separate
 * end-to-end walkthrough and its toggle were removed.
 * Every figure is illustrative, with fictional people, policies and wording.
 */

/* Rendered inside its case page. */
export default function PolicyAgentsCase({ whoDecides }) {
  return (
    <>
        <Beat id="ref-problem" eyebrow="Problem" title="In financial services and HR, a request ends in a record.">
          <p>
            Many support conversations end with an answer or a handoff to a
            person. A dispute or a leave request ends with something written
            to a company system, so the agent has to read the person’s own
            records, apply the company’s policy, and only then write.
          </p>
          <Plate label="Answering a question, and acting on a record">
            <ClassContrast />
          </Plate>
          <p>
            The person wants something done: a charge disputed, time off
            booked. If it can’t be done, they need the reason and a next step.
          </p>
        </Beat>

        <Beat id="spec" eyebrow="Research" title="Before building, I specified how leave policy works.">
          <p>
            The HR agents I reviewed collected a request and passed it on.
            Whether it met policy was decided later, by someone else.
          </p>
          <Plate tone="problem" kind="Problem" label="The request is taken; the policy is checked days later">
            <Thread>
              <Reply index={0} who="Employee" tone="message">Can I take two weeks off starting June 7?</Reply>
              <Reply index={1} who="HR agent" tone="check">Done. I’ve sent your request for approval.</Reply>
              <Facts index={2} label="Three days later, from the manager" chips={[
                { k: 'Request', v: 'Rejected · not enough balance', tone: 'block' },
              ]} />
            </Thread>
          </Plate>
          <p>
            So I wrote the policy data the agent decides with. Every policy
            sets its own notice, units and limits, and the rules are written
            once against whichever policy applies, so the agent can check
            before it writes.
          </p>
          <Plate tone="solution" kind="Solution" label="Six policies, one rule">
            <Spec />
          </Plate>
        </Beat>

        {whoDecides}

        <Beat
          id="check-first"
          eyebrow="Decision 1"
          title="The agent checks a request before it writes anything."
        >
          <p>
            The request stays a draft until a rule has read it against the
            employee’s own balance and policy.
          </p>
          <Plate tone="solution" kind="Solution" label="A draft that a rule can check">
            <Thread>
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
          id="block"
          eyebrow="Decision 2"
          title="A block shows the rule, its inputs and a way forward."
        >
          <p>
            With the rule and the numbers in the reply, the employee knows
            what to change.
          </p>
<PlatePair>
          <Plate tone="problem" kind="Problem" label="A block with no reason">
            <Thread>
              <Reply index={0} who="Agent" tone="block">I’m unable to submit that request.</Reply>
            </Thread>
          </Plate>
          <Plate tone="solution" kind="Solution" label="The rule and its inputs, with a way forward">
            <Thread>
              <Reply index={0} who="Agent · Request blocked" tone="block" chips={[['10', 'working days requested'], ['6', 'available']]}>
                I can’t submit two weeks. Your policy only covers leave you’ve
                already earned, and two weeks is 10 working days against the 6
                you have. Would one week work?
              </Reply>
            </Thread>
          </Plate>
          </PlatePair>
        </Beat>

        <Beat
          id="edit"
          eyebrow="Decision 3"
          title="An edit updates the same draft."
        >
          <p>
            The start date stays. The days are recalculated, the same check
            runs again, and nothing is written until the employee says yes.
          </p>
          <Plate tone="solution" kind="Solution" label="Same draft, one field changed, then written">
            <Thread>
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
              <Reply index={3} who="Employee" tone="message">Yes.</Reply>
              <Facts index={4} label="Written, after the yes" chips={[
                { k: 'Status', v: 'Submitted', tone: 'result' },
                { k: 'Vacation available', v: '6 → 1', tone: 'result' },
              ]} />
            </Thread>
          </Plate>
        </Beat>

        <Beat
          id="reason"
          eyebrow="Decision 4 · A second domain"
          title="In a card dispute, the reason decides what the agent asks."
        >
          <p>
            Each dispute reason needs different facts. A missing one blocks the filing and becomes the
            next question.
          </p>
          <Plate tone="solution" kind="Solution" label="The missing fact becomes the question">
            <Thread>
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

        <Beat id="result" eyebrow="Result" title="Three runs of the same request gave the same decision.">
          <p>
            The reply’s wording varies from run to run. The decision and the
            write do not. In the demos, the same request produced the same decision
            every time.
          </p>
          <Plate tone="solution" kind="Result" label="Three runs, one decision">
            <SameDecisionReplay />
          </Plate>
        </Beat>

        <Beat id="mock-records" eyebrow="Outcome" title="I built these agents on mock records.">
          <p>
            I ran both agents on mock records and services, a separate copy
            for each session, so they could act on realistic accounts before
            any customer opened a real system.
          </p>
          <p>
            <Link to="/work/support-agents">The customer deployments →</Link>
          </p>
        </Beat>
    </>
  );
}
