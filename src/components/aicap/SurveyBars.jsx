import { useSteps } from '../../lib/useSteps.js';

/*
 * One survey question as a single-series horizontal bar chart. Counts are
 * labelled directly (n is small, so percentages would overstate precision).
 * `focus` lists the answers the design decision rests on; the rest recede.
 * `tone` colours the focus bars in the site's shared language: "message"
 * (blue) for what shoppers said they want, "block" (red) for a concern.
 * Bars grow one at a time with scroll and shrink again on the way back.
 * Data: the Onki shopper survey.
 */
export default function SurveyBars({ question, n, data, focus = [], note, tone = 'message' }) {
  const max = Math.max(...data.map(([, v]) => v));
  const [ref, step] = useSteps(data.length);
  return (
    <figure className="sv" data-tone={tone} ref={ref}>
      <figcaption>
        <strong>{question}</strong>
        <span>{n} respondents{note ? ` · ${note}` : ''}</span>
      </figcaption>
      <ul role="list">
        {data.map(([label, v], k) => (
          <li key={label} className={focus.includes(label) ? 'is-focus' : ''} title={`${label}: ${v} of ${n}`}>
            <span className="sv-label">{label}</span>
            <span className="sv-track">
              <span className="sv-bar" data-on={step >= k + 1} style={{ width: `${(v / max) * 100}%` }} />
              <span className="sv-value step-fade" data-on={step >= k + 1}>{v}</span>
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
