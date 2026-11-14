import { useSteps } from '../../lib/useSteps.js';

/*
 * The research behind a design rule (S362): what a study or the project's own
 * research found, and the rule it led to. Each finding names its source.
 * Findings come from Walker's literature-review notes and lab documents;
 * nothing is added here that is not in them or already on the page.
 *
 * rows: [{ finding, source, rule }]. A row without `rule` continues the rule
 * of the row above it.
 */
export default function Basis({ label = 'The research behind it', ruleLabel = 'The rule it led to', rows }) {
  const [ref, step] = useSteps(rows.length);
  return (
    <div className="basis" ref={ref} role="table" aria-label={label}>
      <div className="basis-head" role="row">
        <span role="columnheader">{label}</span>
        <span role="columnheader">{ruleLabel}</span>
      </div>
      {rows.map((r, i) => (
        <div className="basis-row step" data-on={step >= i + 1} role="row" key={r.finding}>
          <span role="cell" className="basis-finding">
            {r.finding}
            <small>{r.source}</small>
          </span>
          <span role="cell" className={r.rule ? 'basis-rule' : 'basis-rule is-empty'}>{r.rule}</span>
        </div>
      ))}
    </div>
  );
}
