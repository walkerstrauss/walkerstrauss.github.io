import { Link } from 'react-router-dom';
import { useMotionValue } from 'framer-motion';
import { DRAW, N } from './FiveObjects.jsx';

/*
 * The end of the home page: every case, newest first, as one index.
 * The drawing above is the path; this is where to go next. Each row carries
 * its object's drawing small, so the reader can match a row to what they just
 * scrolled through. Replaces the two tile grids, which repeated the drawing.
 */
const CASES = [
  { obj: 'agent', tone: 'ink', to: '/work/support-agents', title: 'Customer deployments, from requirements to release', meta: 'Agent deployment' },
  { obj: 'agent', tone: 'ink', to: '/work/policy-agents', title: 'Agents that act on records under policy', meta: 'Agent design' },
  { obj: 'kiosk', tone: 'result', to: '/projects/aicap', title: 'Voice and touch for wine recommendations', meta: 'Onki · led interaction design · 2025' },
  { obj: 'clock', tone: 'message', to: '/projects/weather-clock', title: 'Savoring Weather Clock', meta: 'Meta Design Lab, Cornell · interaction and system code' },
  { obj: 'tile', tone: 'block', to: '/projects/mahsjong', title: 'Mah’s Jong', meta: 'Project lead, team of nine · 2025' },
  { obj: 'brain', tone: 'warm', to: '/research/fmri-study', title: 'fMRI study on food imagery and the hypothalamus', meta: 'Affect and Cognition Lab, Cornell · research assistant' },
];

function Glyph({ obj }) {
  const done = useMotionValue(1);
  const D = DRAW[obj];
  return (
    <svg viewBox="0 0 240 240" className="fo-svg ci-glyph" aria-hidden="true">
      <D p={done} i={N - 1} />
    </svg>
  );
}

export default function CaseIndex() {
  return (
    <section className="ci" aria-labelledby="ci-head">
      <h2 id="ci-head" className="section-label">The work, newest first</h2>
      <ol className="ci-list" role="list">
        {CASES.map((c) => (
          <li key={c.to} data-tone={c.tone}>
            <Link to={c.to} className="ci-row">
              <Glyph obj={c.obj} />
              <span className="ci-title">{c.title}</span>
              <span className="ci-meta">{c.meta}</span>
              <span className="ci-arrow" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
