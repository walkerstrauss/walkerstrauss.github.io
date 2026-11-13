import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import LeaveStory from '../components/LeaveStory.jsx';
import LeaveResearch from '../components/LeaveResearch.jsx';
import SameDecisionReplay from '../components/SameDecisionReplay.jsx';
import { useSteps } from '../lib/useSteps.js';

/* The problem and its answer as one pair of replies, in the thread's own
   vocabulary. Plays with scroll: the dead end first, then the reply that shows
   its reason. */
function Bubble({ who, tone, children }) {
  return (
    <div className="dec-bubble" data-tone={tone}>
      <strong>{who}</strong>
      <span>{children}</span>
    </div>
  );
}

function BlockedPair() {
  const [ref, step] = useSteps(2);
  return (
    <figure className="dec-solo" ref={ref}>
      <div className="dec-pair">
        <div className="dec-cell step" data-on={step >= 1}>
          <span>A block with no reason</span>
          <Bubble who="Agent" tone="block">I’m unable to submit that request.</Bubble>
        </div>
        <i aria-hidden="true" className="step-fade" data-on={step >= 2}>→</i>
        <div className="dec-cell step" data-on={step >= 2}>
          <span>A block with the rule and its inputs</span>
          <Bubble who="Agent · Request blocked" tone="block">
            <span className="leave-days"><span><b>10</b>requested</span><span><b>6</b>available</span></span>
            Would one week work?
          </Bubble>
        </div>
      </div>
      <figcaption>Illustrative replies.</figcaption>
    </figure>
  );
}

export default function AUIEmployeeLeave() {
  return (
    <Page className="cs-page cs-case">
      <header className="cs-hero">
        <h1 className="cs-title">Holding structured state across turns</h1>
        <p className="cs-subtitle">
          An HR leave agent demo at Augmented Intelligence. I designed the
          request record and the policy check behind it, so a blocked request
          explains itself and an edit updates the same request instead of
          starting over.
        </p>
        <ul className="cs-tags" aria-label="Tags">
          <li>Conversation design</li>
          <li>Data modeling</li>
          <li>Policy rules</li>
          <li>Reference demo</li>
        </ul>
        <div className="cs-meta">
          <div><h4>Organization</h4><p>Augmented Intelligence</p></div>
          <div><h4>My role</h4><p>Product Operations (Agents)</p></div>
          <div><h4>Status</h4><p>Reference demo, shown here with fictional data</p></div>
        </div>
      </header>

      <section className="cs-section">
        <h2>Problem</h2>
        <h3>Dates alone don’t say whether a request can go through</h3>
        <p>
          An employee wants to know whether their dates work and what to change
          if they don’t. The employer needs the policy applied the same way
          every time, before anything is written. A rule can’t run on a
          sentence, so the request has to become structured facts first.
        </p>
        <BlockedPair />
      </section>

      <section className="cs-section" aria-labelledby="leave-request-walkthrough">
        <h2 id="leave-request-walkthrough">One request, turn by turn</h2>
        <p>
          The agent already holds the balance and the policy from the record.
          What the employee says becomes fields in a draft. A rule reads both
          and decides before anything is written.
        </p>
        <LeaveStory />
      </section>

      <section className="cs-section">
        <h2>Research and spec</h2>
        <h3>Three findings, and what each one put in the data model</h3>
        <p>
          Before configuring anything, I read through employee self-service
          workflows and leave policies. Each finding became a record or a rule
          in the spec, which is why the conversation above can check a request
          before it writes one.
        </p>
        <LeaveResearch />
      </section>

      <section className="cs-section">
        <h2>What the demo proved</h2>
        <h3>Same facts, same decision</h3>
        <p>
          Once the request is understood the same way, the decision is fixed:
          the check is a comparison on the structured request, so it resolves
          identically on every run. The reply’s wording varies. The action and
          the decision do not, and the execution trace records the rule and
          the values it read. In the demo, the same request produced the same
          decision and the same write every time.
        </p>
        <SameDecisionReplay />
      </section>

      <section className="cs-section">
        <h2>Mock data first</h2>
        <h3>Prove the use case before a real system is connected</h3>
        <p>
          A use case has to be proven before a real HR system is connected to
          it, and a modeled environment is how. I built the records and
          services the demo needed, scoped by session so one demo could not
          alter another. Between December 2025 and January 2026 the order was
          the records first, then the mock services, then one request end to
          end, then the policies, with the same conversations run again after
          each change.
        </p>
      </section>

      <Reveal as="section" className="cs-links">
        <Link to="/aui" className="back-link">← Back to AUI work</Link>
      </Reveal>
    </Page>
  );
}
