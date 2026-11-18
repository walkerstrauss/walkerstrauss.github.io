import { Link } from 'react-router-dom';
import { Beat, Plate } from '../components/case/Case.jsx';
import SupportReview from '../components/agents/SupportReview.jsx';
import SupportPath from '../components/agents/SupportPath.jsx';
import TraceRead from '../components/agents/TraceRead.jsx';
import { Check, MessageToDraft, Thread } from '../components/thread/Thread.jsx';

/*
 * One case: two customer support agents taken from requirements to release. Customers are not named and every
 * figure is a fictional illustration.
 */
/* Rendered inside its case page. */
export default function SupportAgentsCase() {
  return (
    <>
        <Beat id="roll-problem" eyebrow="Problem" title="Two support teams had to see what an agent would do on their tickets before it could act on one.">
          <p>
            Each team wanted its agent moved onto a new agent platform, inside the ticketing
            system it already used. Each agent worked against the customer’s
            own systems: accounts, transactions, statements. I had first built
            two <Link to="/work/policy-agents">reference agents</Link> that work this way on mock records.
          </p>
          <Plate label="From requirements to release">
            <SupportPath />
          </Plate>
        </Beat>

        <Beat
          id="requirements"
          eyebrow="Decision 1"
          title="Each requirement became a decision the agent makes on a ticket."
        >
          <p>
            I asked each team to describe its requirements as the set of
            states a user can be in, and flagged the cases that didn’t fit
            one. A status question might need account verification first;
            some cases needed a handoff to a person. For the second agent I
            scoped the requirements from scratch, which surfaced behavior
            the agent still needed, such as when to close a ticket.
          </p>
          <Plate tone="solution" kind="Solution" label="A support requirement as agent decisions">
            <Thread>
              <MessageToDraft index={0} who="User" parts={['Why was I charged a fee this month?']}
                label="Support request" chips={[{ k: 'Intent', v: 'Fee question' }]} />
              <Check index={1} label="Decisions the workflow needs to support" cells={[
                { k: 'Account', v: 'Verify before sharing details' },
                { k: 'Fee', v: 'Find the charge on the statement' },
                { k: 'Handoff', v: 'Send cases the agent can’t resolve to a person' },
              ]} />
            </Thread>
          </Plate>
        </Beat>

        <Beat
          id="integration"
          eyebrow="Decision 2 · Ticketing integration"
          title="I tested the integration inside each customer’s own ticketing system, with their engineers."
        >
          <p>
            I tested the integration and worked with each customer to set up
            the webhook calls from their help desk to the agent’s endpoints. I worked with
            customer engineers to set up test accounts and map their API
            responses to the states the agent had to recognize.
          </p>
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
          eyebrow="Decision 3"
          title="Every reply was checked against what the agent actually did."
        >
          <p>
            A reply can read well and still come from the wrong decision, and
            guessing from the wording leads to fix-and-retry loops that teach
            nobody how the agent behaves. So each test checked what the agent
            decided, what it looked up, and whether anything would change.
          </p>
          <Plate tone="solution" kind="Solution" label="What the agent said, and what it did">
            <TraceRead />
          </Plate>
        </Beat>

        <Beat
          id="review"
          eyebrow="Decision 4"
          title="Before release, each team reviewed the agent’s proposed replies to its own tickets."
        >
          <p>
            I replayed each customer’s existing tickets through the agent,
            presented the results to their team, and revised it over rounds
            of feedback. What gave the teams the confidence to deploy was
            seeing how the agent would answer their own tickets, with
            nothing sent.
          </p>
          <Plate tone="solution" kind="Solution" label="The team sees what the agent would do and say, then it goes live">
            <SupportReview />
          </Plate>
        </Beat>

        <Beat id="migrations" eyebrow="Migrations" title="I also drove customer migrations onto the platform.">
          <p>
            Across those migrations, inference cost fell by more than half.
          </p>
          <Plate label="What each migration took">
            <ol className="path" data-on-all="true" role="list" aria-label="The steps of a migration">
              <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>API mapping</strong><span>The agent’s calls matched to the customer’s APIs</span></li>
              <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>Workflow adaptation</strong><span>Their existing workflows rebuilt on the platform</span></li>
              <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>Regression testing</strong><span>Behavior checked before each release</span></li>
              <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>Production</strong><span>Live in the customer’s own systems</span></li>
            </ol>
          </Plate>
        </Beat>

    </>
  );
}
