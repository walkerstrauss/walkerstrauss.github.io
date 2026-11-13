import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import { Tile, Tiles } from '../components/Tiles.jsx';
import AUIWorkPreview from '../components/AUIWorkPreview.jsx';
import PaymentsPreview from '../components/aui/PaymentsPreview.jsx';
import '../components/case/case.css';

/*
 * The AUI page: what the company builds (in its own public words, linked),
 * what my role covered, and the two case studies. The cases carry the detail.
 */
const CASES = [
  {
    to: '/aui/reference-agents',
    preview: AUIWorkPreview,
    title: 'Agents that act on records under policy',
    line: 'Two demo agents: one files card disputes, one submits leave requests.',
  },
  {
    to: '/aui/payments',
    preview: PaymentsPreview,
    title: 'Taking a payments support agent from requirements to rollout',
    line: 'Scoping what the agent could do, and letting the support team review it before it went live.',
  },
];

const ROLE = [
  ['Other customer agents', 'Built and maintained support agents for other AUI customers.'],
  ['Testing and evaluation', 'Wrote test conversations and checked agent behavior against requirements.'],
  ['Developer enablement', 'Onboarded customer teams onto AUI’s CLI and wrote reusable guidance for builders.'],
];

export default function AUI() {
  return (
    <Page className="cs-page">
      <header className="cs-hero">
        <h1 className="cs-title">Building and deploying enterprise agents at AUI</h1>
        <p className="cs-subtitle">
          I built reference agents, took a customer’s support agent from
          requirements to production, and onboarded customer teams onto the
          tools to build their own.
        </p>
        <div className="cs-meta">
          <div><h4>Organization</h4><p><a href="https://www.aui.io/" target="_blank" rel="noopener noreferrer">Augmented Intelligence (AUI)</a></p></div>
          <div><h4>My role</h4><p>Product Operations (Agents)</p></div>
          <div><h4>Timeline</h4><p>Dec 2025 – Nov 2026</p></div>
        </div>
      </header>

      <Reveal as="section" className="hub-about">
        <span className="section-label">About AUI</span>
        <p className="hub-quote">AUI builds enterprise agents that can be trusted to act.</p>
        <p>
          A team defines the work and the rules. <a href="https://www.aui.io/" target="_blank" rel="noopener noreferrer">AUI’s</a> neuro-symbolic
          runtime enforces each policy deterministically and makes every
          decision traceable.
        </p>
      </Reveal>

      <Tiles cols={2} label="Case studies">
        {CASES.map((c) => (
          <Tile key={c.to} to={c.to} title={c.title} line={c.line}>
            <c.preview />
          </Tile>
        ))}
      </Tiles>

      <section className="page-section">
        <span className="section-label">Also in the role</span>
        <Reveal as="dl" className="hub-role" stagger>
          {ROLE.map(([k, v]) => (
            <Reveal.Item key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </Reveal.Item>
          ))}
        </Reveal>
      </section>

      <section className="cs-links">
        <Link to="/" className="back-link">← Back to Work</Link>
      </section>
    </Page>
  );
}
