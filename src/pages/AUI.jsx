import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import {
  AskThread,
  ClassContrast,
  DisputeThread,
  LeaveMiniThread,
} from '../components/aui/overview.jsx';

/*
 * The AUI overview: the week-one ask, what the two new domains required of an
 * agent, and the two demo agents. Shares the Onki case's page shell.
 */
export default function AUI() {
  return (
    <Page className="cs-page">
      <header className="cs-hero">
        <h1 className="cs-title">Agents that act on records under policy</h1>
        <p className="cs-subtitle">
          I designed and built two demo agents at Augmented Intelligence: one
          files card disputes, one submits leave requests. Each reads the
          person’s own records and checks policy before it writes.
        </p>
        <div className="cs-meta">
          <div><h4>Organization</h4><p>Augmented Intelligence (AUI)</p></div>
          <div><h4>My role</h4><p>Product Operations (Agents)</p></div>
          <div><h4>Timeline</h4><p>Dec 2025 – Nov 2026</p></div>
          <div><h4>Status</h4><p>Demo agents on mock data</p></div>
        </div>
      </header>

      <section className="cs-section">
        <h2>The ask</h2>
        <p>
          When I joined, the use cases I worked from were ones where an agent
          answered questions or escalated a request to a person.
        </p>
        <p>In my first week, I was asked for demos in two new domains:</p>
        <AskThread />
      </section>

      <section className="cs-section">
        <h2>What the new domains required</h2>
        <h3>In financial services and HR, a request ends in a record</h3>
        <p>
          Those earlier conversations end with an answer or a handoff. A
          dispute or a leave request ends with something written to a company
          system, so the agent has to read the person’s own records, apply the
          company’s policy, and only then write.
        </p>
        <ClassContrast />
        <Reveal className="aui-frame" stagger>
          <Reveal.Item>
            <span>The person</span>
            <p>
              Wants something done: a charge disputed, time off booked. If it
              can’t be done, they need the reason and a next step.
            </p>
          </Reveal.Item>
          <Reveal.Item>
            <span>The goal</span>
            <p>
              Show a working agent in each new domain, and give developers
              something to validate the runtime against.
            </p>
          </Reveal.Item>
          <Reveal.Item>
            <span>The constraint</span>
            <p>
              A write has to follow policy the same way every time. Both
              agents ran on mock records and services, modeled on the systems
              they would act in.
            </p>
          </Reveal.Item>
        </Reveal>
      </section>

      <section className="cs-section" aria-labelledby="aui-dispute-agent">
        <h2 id="aui-dispute-agent">Financial services · Credit card dispute filing</h2>
        <h3>The reason for a dispute decides what the agent needs before it can file</h3>
        <p>
          I modeled accounts and transactions as records tied to the
          cardholder, designed the questions each dispute reason calls for, and
          specified that the filing window counts from promised delivery.
        </p>
        <DisputeThread />
      </section>

      <section className="cs-section" aria-labelledby="aui-leave-agent">
        <h2 id="aui-leave-agent">HR · Leave request submission</h2>
        <h3>A request becomes a draft that a rule can check, and an edit updates the same draft</h3>
        <p>
          I designed the request record and the policy check behind it, so a
          blocked request explains itself and a change doesn’t start the
          conversation over.
        </p>
        <LeaveMiniThread />
        <Link to="/aui-employee-leave" className="project-link aui-after-visual">
          Read the leave request case study →
        </Link>
      </section>

      <Reveal as="section" className="cs-links">
        <Link to="/" className="back-link">← Back to Work</Link>
      </Reveal>
    </Page>
  );
}
