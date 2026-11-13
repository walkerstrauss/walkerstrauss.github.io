/*
 * The problem and the solution drawn on the same shelf.
 *
 * Problem: a wall of bottles that all look alike, with the two most common
 * survey complaints beside it. Solution: the same wall with three bottles
 * picked out, each with the reason it fits and where it sits.
 *
 * Survey counts are from the Onki shopper survey (19 answered this question).
 * The request, picks and shelf positions are illustrative.
 *
 * Both play with scroll, forward and back. Problem: the wall is there from the
 * start and the two complaints land on it. Solution: the request arrives, then
 * each pick lights on the shelf together with its reason in the list.
 */
import { useSteps } from '../../lib/useSteps.js';

const ROWS = 5;
const COLS = 24;

const PICKS = [
  { at: 1 * COLS + 5, name: 'Costa Marina 2022', price: '$18', why: 'For the seafood course', where: 'Shelf 2, left' },
  { at: 2 * COLS + 14, name: 'Soleil Blanc 2021', price: '$19', why: 'White meat, fish in sauce', where: 'Shelf 3, middle' },
  { at: 3 * COLS + 20, name: 'Villa Monte 2020', price: '$20', why: 'Cheese and grilled meat', where: 'Shelf 4, right' },
];

/* `shown` is how many of the picks are lit so far. */
function Shelf({ picks = [], shown = picks.length }) {
  const byIndex = new Map(picks.map((p, i) => [p.at, i + 1]));
  return (
    <div className="shelf" data-picked={shown > 0} aria-hidden="true">
      {Array.from({ length: ROWS }, (_, r) => (
        <div className="shelf-row" key={r}>
          {Array.from({ length: COLS }, (_, c) => {
            const n = byIndex.get(r * COLS + c);
            const lit = n && n <= shown;
            return (
              <i key={c} data-pick={lit ? n : undefined}>
                {n && <b className="step-fade" data-on={Boolean(lit)}>{n}</b>}
              </i>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function ProblemFigure() {
  const [ref, step] = useSteps(2);
  return (
    <figure className="shelf-fig" ref={ref}>
      <div className="shelf-fig-main">
        <p className="shelf-fig-label">The aisle today</p>
        <Shelf />
        <p className="shelf-fig-note">Hundreds of bottles. No one free to ask.</p>
      </div>
      <dl className="shelf-stats">
        <div className="step" data-on={step >= 1}><dt>9 <small>of 19</small></dt><dd>said there are too many options</dd></div>
        <div className="step" data-on={step >= 2}><dt>8 <small>of 19</small></dt><dd>said there isn’t enough guidance</dd></div>
      </dl>
    </figure>
  );
}

export function SolutionFigure() {
  const [ref, step] = useSteps(PICKS.length + 1);
  const shown = Math.max(0, step - 1);
  return (
    <figure className="shelf-fig" ref={ref}>
      <div className="shelf-fig-main">
        <p className="shelf-fig-label">With AICap</p>
        <p className="shelf-ask step" data-on={step >= 1}>“A wine for a dinner party, under $25”</p>
        <Shelf picks={PICKS} shown={shown} />
      </div>
      <ol className="shelf-picks" role="list">
        {PICKS.map((p, i) => (
          <li key={p.name} className="step" data-on={i < shown}>
            <b>{i + 1}</b>
            <div>
              <strong>{p.name} · {p.price}</strong>
              <span>{p.why}</span>
              <small>{p.where}</small>
            </div>
          </li>
        ))}
      </ol>
      <figcaption>Illustrative request and shelf positions. A few bottles, why each fits, and where to find it.</figcaption>
    </figure>
  );
}
