import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import { Beat, CaseLayout, Instead, Plate, Trio } from '../components/case/Case.jsx';
import PaymentsReview from '../components/aui/PaymentsReview.jsx';
import PaymentsPath from '../components/aui/PaymentsPath.jsx';
import { Check, MessageToDraft, Thread } from '../components/thread/Thread.jsx';

/*
 * One case: a payments support agent, from requirements to production. The
 * customer is not named and every figure is a fictional illustration.
 */
const SECTIONS = [
  { id: 'problem', label: 'Problem' },
  { label: 'Decisions', group: true },
  { id: 'requirements', label: 'Requirements as decisions', sub: true },
  { id: 'tests', label: 'Test the decision', sub: true },
  { id: 'review', label: 'Review before rollout', sub: true },
  { id: 'linked-state', label: 'User-linked state', sub: true },
  { id: 'outcome', label: 'Outcome' },
  { id: 'takeaway', label: 'Takeaway' },
];

export default function AUIPayments() {
  return (
    <Page className="cs-page">
      <header className="cs-hero">
        <h1 className="cs-title">Taking a payments support agent from requirements to rollout</h1>
        <p className="cs-subtitle">
          I scoped and led the migration of a payments support agent: what it
          could answer, when it should hand a ticket to a person, and how the
          support team could review its behavior before it went live.
        </p>
        <div className="cs-meta">
          <div><h4>Organization</h4><p><a href="https://www.aui.io/" target="_blank" rel="noopener noreferrer">Augmented Intelligence (AUI)</a></p></div>
          <div><h4>My role</h4><p>Product Operations (Agents)</p></div>
          <div><h4>Status</h4><p className="status-live">Live in production</p></div>
        </div>
      </header>

      <CaseLayout sections={SECTIONS}>
        <Beat id="problem" eyebrow="Problem" title="A support team has to trust what an agent will do before it acts.">
          <p>
            The team needed a way to trust that, once deployed, the agent would
            take the correct actions on their tickets.
          </p>
          <Trio items={[
            ['The people', 'A support team, and the customers writing in about account access and payment status.'],
            ['The goal', 'Take the agent live in the team’s existing help desk.'],
            ['The constraint', 'The team had to see how it would handle their tickets before it could act on one.'],
          ]} />
          <Plate label="From requirements to production">
            <PaymentsPath />
          </Plate>
        </Beat>

        <Beat
          id="requirements"
          eyebrow="Decision 1"
          title={<><Instead>Instead of a list of topics,</Instead>each requirement became a decision the agent makes on a ticket.</>}
        >
          <p>
            A status question might need account verification or another
            detail. Some cases needed a handoff to a person.
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
          id="tests"
          eyebrow="Decision 2"
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
          eyebrow="Decision 3"
          title={<><Instead>Instead of asking the team to trust test results,</Instead>they reviewed proposed replies to their own tickets.</>}
        >
          <p>
            I presented the agent to the customer’s team and revised it over
            rounds of feedback. What gave them the confidence to deploy was
            seeing in real time how it would respond to their incoming
            tickets, with nothing sent.
          </p>
          <Plate tone="solution" kind="Solution" label="The reply is proposed; the ticket is untouched">
            <PaymentsReview />
          </Plate>
        </Beat>

        <Beat
          id="linked-state"
          eyebrow="Decision 4 · User-linked state"
          title={<><Instead>Instead of asking the model to choose between the old email and the new one,</Instead>the runtime keeps one current value.</>}
        >
          <p>
            This is where a real use case shaped the runtime. The engine’s
            strength is that code decides, and a model isn’t asked to decide
            what a model shouldn’t. Once this is configured, the agent is
            never asked whether to use the old email or the new one. I
            prototyped and validated the behavior, and the team shipped it as
            a reusable runtime feature.
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

        <Beat id="outcome" eyebrow="Outcome" title="The team saw what the agent would do before it acted, and deployed it.">
          <Plate tone="solution" kind="Result" label="Requirements to production">
            <PaymentsPath done />
          </Plate>
          <dl className="outcomes">
            <div>
              <dt>The customer</dt>
              <dd>Deployed the agent after reviewing its behavior on their own tickets. It is live in production.</dd>
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
            Both product changes started as something this customer needed.
            The answer was the same each time: let code decide, and don’t ask
            a model to decide what a model shouldn’t.
          </p>
        </Beat>

        <div className="cs-links">
          <Link to="/aui" className="back-link">← Back to AUI</Link>
          <Link to="/aui/reference-agents" className="project-link">Next: the reference agents case →</Link>
        </div>
      </CaseLayout>
    </Page>
  );
}
