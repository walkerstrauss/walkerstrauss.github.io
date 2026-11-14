import { Beat, Instead, Plate, Trio } from '../components/case/Case.jsx';
import PaymentsReview from '../components/aui/PaymentsReview.jsx';
import PaymentsPath from '../components/aui/PaymentsPath.jsx';
import { Check, MessageToDraft, Thread } from '../components/thread/Thread.jsx';
import { useSteps } from '../lib/useSteps.js';

/* One round of the teams’ review, as the page describes it. */
const ROUND = [
  ['Replay', 'A past ticket runs through the agent'],
  ['Proposed reply', 'The team reads it; nothing is sent'],
  ['Feedback', 'The subscription is managed in the rider’s app store account'],
  ['New rule', 'Send the rider there, and say why'],
  ['Replay again', 'The team sees the revised reply'],
];

function FeedbackRound() {
  const [ref, step] = useSteps(ROUND.length);
  return (
    <ol className="path" role="list" ref={ref} aria-label="One round of feedback">
      {ROUND.map(([k, v], i) => (
        <li key={k} data-on={step >= i + 1 ? 'true' : 'false'}><span className="path-mark" aria-hidden="true" /><strong>{k}</strong><span>{v}</span></li>
      ))}
    </ol>
  );
}

/*
 * One case: two customer support agents (a payments company and a transit
 * app) taken from requirements to release. Customers are not named and every
 * figure is a fictional illustration. Sources: S071, S219–S220, S232, S328,
 * S341, AUI-012, AUI-013.
 */
/* Rendered inside the one AUI page (S346). */
export default function AUIPayments() {
  return (
    <>
        <Beat id="roll-problem" eyebrow="Part 2 · A person reviews before release" title="A support team has to trust what an agent will do before it acts.">
          <Trio items={[
            ['The people', 'Two support teams, and the customers and riders writing in to them.'],
            ['The goal', 'Move each team’s agent onto AUI inside the ticketing system they already used.'],
            ['The constraint', 'The team had to see how it would handle their tickets before it could act on one.'],
          ]} />
          <Plate label="From requirements to release">
            <PaymentsPath />
          </Plate>
        </Beat>

        <Beat
          id="requirements"
          eyebrow="Part 2 · Decision 1"
          title={<><Instead>Instead of a list of topics,</Instead>each requirement became a decision the agent makes on a ticket.</>}
        >
          <p>
            A status question might need account verification or another
            detail. Some cases needed a handoff to a person. For the transit
            agent, I set aside an inherited build and its test cases and
            started again from the support responsibilities the customer had
            agreed to. That audit surfaced missing and incorrect behavior,
            including when to close a ticket and how to answer subscription
            questions.
          </p>
          <Plate tone="solution" kind="Solution" label="A support requirement as agent decisions">
            <Thread caption="Illustrative example.">
              <MessageToDraft index={0} who="Customer" parts={['Can you tell me whether my payment arrived?']}
                label="Support request" chips={[{ k: 'Intent', v: 'Payment status' }]} />
              <Check index={1} label="Decisions the workflow needs to support" cells={[
                { k: 'Account', v: 'Verify before sharing details' },
                { k: 'Payment', v: 'Identify the transfer' },
                { k: 'Handoff', v: 'Send cases the agent can’t resolve to a person' },
              ]} />
            </Thread>
          </Plate>
        </Beat>

        <Beat
          id="integration"
          eyebrow="Part 2 · Decision 2 · Ticketing integration"
          title="The integration was tested inside each customer’s own ticketing system, with their engineers."
        >
          <p>
            I tested the integration and worked with each customer to set up
            the webhook calls from their help desk to our endpoints. For the
            payments customer, I worked with their head of customer success
            and their engineers to get test accounts and to match what their
            APIs returned to the customer states the agent had to recognize.
          </p>
          <Plate label="One gap found while matching API responses to customer states">
            <Thread caption="Illustrative layout of a real gap.">
              <Check index={0} label="What the customer’s endpoint returned" cells={[
                { k: 'Document', v: 'Upload required' },
                { k: 'Upload link', v: 'Not returned', tone: 'block' },
              ]} />
              <Check index={1} label="What the agent has to do with it" cells={[
                { k: 'Recognize the state', v: 'A document is needed' },
                { k: 'Tell the customer', v: 'Where to upload it', note: 'not possible without the link', tone: 'block' },
              ]} />
              <Check index={2} label="Resolved with their engineers" cells={[
                { k: 'They provided', v: 'A development environment' },
                { k: 'And', v: 'Endpoints to validate against', tone: 'result' },
              ]} />
            </Thread>
          </Plate>
          <Plate label="How a ticket reaches the agent and comes back">
            <ol className="path" data-on-all="true" role="list" aria-label="A ticket’s route through the integration">
              <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>Ticket</strong><span>A customer writes in to the help desk</span></li>
              <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>Webhook</strong><span>The help desk calls the agent’s endpoint</span></li>
              <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>Customer APIs</strong><span>The agent looks up the account’s state</span></li>
              <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>Reply or handoff</strong><span>Written back to the same ticket</span></li>
            </ol>
          </Plate>
        </Beat>

        <Beat
          id="tests"
          eyebrow="Part 2 · Decision 3"
          title={<><Instead>Instead of judging how a reply reads,</Instead>each test checks what the agent decided.</>}
        >
          <p>
            For each requirement, the tests checked four things: which rule
            was evaluated, which tool ran, which details were required, and
            what would be written.
          </p>
          <Plate tone="solution" kind="Solution" label="What one test checks">
            <Thread caption="Illustrative test.">
              <MessageToDraft index={0} who="Test message" parts={['Can you tell me whether my payment arrived?']}
                label="Requirement under test" chips={[{ k: 'Requirement', v: 'Verify before sharing details' }]} />
              <Check index={1} label="Checked in the agent’s decision, not its wording" cells={[
                { k: 'Rule evaluated', v: 'Verify account' },
                { k: 'Tool run', v: 'None yet' },
                { k: 'Detail required', v: 'Account email' },
                { k: 'Write', v: 'None', tone: 'result' },
              ]} />
            </Thread>
          </Plate>
        </Beat>

        <Beat
          id="review"
          eyebrow="Part 2 · Decision 4"
          title={<><Instead>Instead of asking the team to trust test results,</Instead>they reviewed proposed replies to their own tickets.</>}
        >
          <p>
            I replayed each customer’s existing tickets through the agent,
            presented the results to their team, and revised it over rounds
            of feedback. What gave the teams the confidence to deploy was
            seeing in real time how the agent would respond to their
            incoming tickets, with nothing sent. Release then went out in
            phases.
          </p>
          <Plate label="One round of feedback, from the transit customer">
            <FeedbackRound />
          </Plate>
          <Plate tone="solution" kind="Solution" label="The reply is proposed; the ticket is untouched">
            <PaymentsReview />
          </Plate>
        </Beat>

        <Beat
          id="linked-state"
          eyebrow="Part 3 · The model is never asked"
          title={<><Instead>Instead of asking the model to choose between the old email and the new one,</Instead>the runtime keeps one current value.</>}
        >
          <p>
            This is where a real use case shaped the runtime. Code decides
            which value is current, so the model is never asked whether to
            use the old email or the new one. I prototyped and validated the
            behavior, and the team shipped it as a reusable runtime feature.
          </p>
          <Plate tone="solution" kind="Solution" label="The correction replaces the old value; nothing is left to choose">
            <Thread caption="Fictional conversation.">
              <MessageToDraft index={0} who="Customer" parts={['I use a ', { mark: 'email', text: 'different email' }, ' for that account.']}
                label="Linked to this customer"
                chips={[{ k: 'Email', v: 'The one just given', note: 'replaces the one on file', mark: 'email' }]} />
              <Check index={1} label="Who decides which email to use" cells={[
                { k: 'Model', v: 'Not asked to choose' },
                { k: 'Runtime', v: 'One current value' },
                { k: 'Account lookup', v: 'Uses the current email', tone: 'result' },
              ]} />
            </Thread>
          </Plate>
        </Beat>

        <Beat id="outcome" eyebrow="Outcome" title="Both teams saw what their agent would do before it acted, and released it.">
          <dl className="outcomes">
            <div>
              <dt>The customers</dt>
              <dd>Each released its agent in phases after reviewing its behavior on their own tickets.</dd>
            </div>
            <div>
              <dt>Review before rollout</dt>
              <dd>Became part of AUI’s core commands and rollout practices.</dd>
            </div>
            <div>
              <dt>User-linked state</dt>
              <dd>Shipped as a reusable runtime feature.</dd>
            </div>
          </dl>
        </Beat>

        <Beat id="takeaway" eyebrow="Takeaway" title="Real requirements are what shape a runtime.">
          <p>
            Review before rollout and user-linked state both started as
            something a customer needed on their own tickets, and both are
            now available to every team that builds on the product.
          </p>
        </Beat>
    </>
  );
}
