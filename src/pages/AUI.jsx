import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import { Beat, CaseLayout, Trio } from '../components/case/Case.jsx';
import AUIReferenceAgents from './AUIReferenceAgents.jsx';
import AUIPayments from './AUIPayments.jsx';
import '../components/case/case.css';

/*
 * The AUI year as one story (S346). The argument, chosen by Walker: he
 * designs what a conversational AI is allowed to decide, and what code or a
 * person decides instead. Part 1 is the reference agents (code decides the
 * rules), Part 2 the two customer rollouts (a person reviews before
 * release), Part 3 the runtime feature that came out of them (the model is
 * never asked). Customers are not named; figures are fictional illustrations.
 */
const SECTIONS = [
  { id: 'argument', label: 'Who decides' },
  { label: 'Code decides the rules', group: true },
  { id: 'check-first', label: 'Check before writing', sub: true },
  { id: 'reason', label: 'The reason decides', sub: true },
  { id: 'block', label: 'A block explains itself', sub: true },
  { id: 'edit', label: 'Edit the same draft', sub: true },
  { id: 'result', label: 'Same facts, same decision', sub: true },
  { label: 'A person reviews', group: true },
  { id: 'requirements', label: 'Requirements as decisions', sub: true },
  { id: 'integration', label: 'Ticketing integration', sub: true },
  { id: 'tests', label: 'Test the decision', sub: true },
  { id: 'review', label: 'Review before rollout', sub: true },
  { label: 'The model is never asked', group: true },
  { id: 'linked-state', label: 'User-linked state', sub: true },
  { id: 'outcome', label: 'Outcome' },
  { id: 'takeaway', label: 'Takeaway' },
  { id: 'role', label: 'Also in the role' },
];

const SPLIT = [
  ['The model', 'Reads what the person asked for and words the reply.'],
  ['Code', 'Checks the policy, keeps the current value, and allows or blocks the write.'],
  ['A person', 'Sees what the agent would do on real tickets before it is released.'],
];

const ROLE = [
  ['Other customer migrations', 'Drove migrations for other AUI customers. Those deployments are the ones behind the inference-cost result at the top of this page.'],
  ['Testing and evaluation', 'Wrote test conversations and checked agent behavior against requirements.'],
  ['Developer enablement', 'Onboarded customer teams onto AUI’s CLI and wrote reusable guidance for builders.'],
];

export default function AUI() {
  return (
    <Page className="cs-page">
      <header className="cs-hero">
        <h1 className="cs-title">What the model decides, what code decides, and what a person decides</h1>
        <p className="cs-subtitle">
          At AUI I built two reference agents and took two customers’ support
          agents from requirements to release. Each one came down to the same
          design question: which decisions should a model never be asked to make?
        </p>
        <div className="cs-meta">
          <div><h4>Organization</h4><p><a href="https://www.aui.io/" target="_blank" rel="noopener noreferrer">Augmented Intelligence (AUI)</a></p></div>
          <div><h4>My role</h4><p>Product Operations (Agents)</p></div>
          <div><h4>Timeline</h4><p>Dec 2025 – Nov 2026</p></div>
        </div>
        {/* Results first (S362). The cost figure is AUI's published one; the
            contribution wording is Walker's approved framing (S167). */}
        <dl className="results" aria-label="Results">
          <div>
            <dt>60–90%</dt>
            <dd>
              <a href="https://www.aui.io/results" target="_blank" rel="noopener noreferrer">lower inference cost</a>{' '}
              across three production deployments, where I drove the customer migrations: API mapping, workflow
              adaptation and regression testing.
            </dd>
          </div>
          <div>
            <dt>2 agents released</dt>
            <dd>Two customers’ support agents, released in phases after each team reviewed proposed replies to its own tickets.</dd>
          </div>
          <div>
            <dt>2 product capabilities</dt>
            <dd>Review before rollout and user-linked state, both prototyped with the team in that work, are now part of the product.</dd>
          </div>
        </dl>
      </header>

      <CaseLayout sections={SECTIONS}>
        <Beat id="argument" eyebrow="Who decides" title="A model is good at understanding a request. It should not be what decides whether a rule is met.">
          <p>
            AUI builds enterprise agents that act on records: filing a
            dispute, submitting leave, answering a support ticket. In that
            work a wrong answer is a wrong record, so each decision is given
            to whichever of three can be held to it.
          </p>
          <Trio items={SPLIT} />
        </Beat>

        <AUIReferenceAgents />
        <AUIPayments />

        <Beat id="role" eyebrow="Also in the role" title="The rest of the year.">
          <Trio items={ROLE} />
        </Beat>

        <div className="cs-links">
          <Link to="/" className="back-link">← Back to home</Link>
        </div>
      </CaseLayout>
    </Page>
  );
}
