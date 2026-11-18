import { motion, useTransform } from 'framer-motion';
import { useReveal, windowFor } from '../../lib/useReveal.jsx';

/*
 * Policy-agent research, drawn as a chart. Each leave policy is a strip
 * of days: the notice it needs before leave can start (hatched), a marker for
 * the start, then the longest stretch it allows (filled). Six policies, six
 * different shapes: that is the complexity the spec had to hold. Scroll
 * draws the strips left to right (framer-motion, scroll-linked), then lifts
 * the employee's row and brings in the one rule that reads whichever row
 * applies. Values are fictional.
 */

const DAYS = 36;
const POLICIES = [
  { name: 'Salaried', unit: 'half-day units', notice: 7, stretch: 10, below: 'No' },
  { name: 'Salaried, west', unit: 'hourly units', notice: 5, stretch: 15, below: 'No' },
  { name: 'Hourly', unit: 'hourly units', notice: 2, stretch: 5, below: 'No' },
  { name: 'Part-time', unit: 'full days', notice: 14, stretch: 5, below: 'Up to 2 days' },
  { name: 'Unlimited', unit: 'full days', notice: 7, stretch: 20, below: 'n/a' },
  { name: 'Contractor', unit: 'full days', notice: 3, stretch: 10, below: 'No' },
];
const MINE = 0;
const DRAW = 0.72; // share of the scroll spent drawing the strips

function Row({ policy, i, p }) {
  const [a, b] = windowFor(i, POLICIES.length, 2.2).map((t) => t * DRAW);
  const mid = a + (b - a) * 0.45;
  const noticeX = useTransform(p, [a, mid], [0, 1]);
  const stretchX = useTransform(p, [mid, b], [0, 1]);
  const clip = (v) => `inset(0 ${(1 - v) * 100}% 0 0 round 4px)`;
  const noticeClip = useTransform(noticeX, clip);
  const stretchClip = useTransform(stretchX, clip);
  const textOpacity = useTransform(p, [a, a + (b - a) * 0.3], [0, 1]);
  const mine = i === MINE;
  const rowOpacity = useTransform(p, [0.8, 0.9], [1, mine ? 1 : 0.32]);
  const lift = useTransform(p, [0.8, 0.9], [0, mine ? 1 : 0]);
  const pct = (d) => `${(d / DAYS) * 100}%`;
  // A bar too short to hold its label on a narrow strip carries it outside.
  const short = policy.stretch < 8;
  return (
    <motion.div className="pc-row" style={{ opacity: rowOpacity }} data-mine={mine || undefined}>
      <motion.div className="pc-glow" aria-hidden="true" style={{ opacity: lift }} />
      <motion.div className="pc-name" style={{ opacity: textOpacity }}>
        <b>{policy.name}</b>
        <span>{policy.unit}</span>
        {mine && <motion.em style={{ opacity: lift }}>This employee</motion.em>}
      </motion.div>
      <div className="pc-strip" role="img" aria-label={`${policy.notice} days notice, longest stretch ${policy.stretch} days`}>
        <motion.span className="pc-notice" style={{ width: pct(policy.notice), clipPath: noticeClip }} />
        <motion.span className="pc-start" style={{ left: pct(policy.notice), opacity: stretchX }} />
        <motion.span className="pc-stretch" data-short={short || undefined} style={{ left: pct(policy.notice), width: pct(policy.stretch), clipPath: stretchClip }}>
          <i>{policy.stretch} days</i>
        </motion.span>
        {short && (
          <motion.i className="pc-out" aria-hidden="true" style={{ left: pct(policy.notice + policy.stretch), opacity: stretchX }}>
            {policy.stretch} days
          </motion.i>
        )}
      </div>
      <motion.div className="pc-below" style={{ opacity: textOpacity }}>{policy.below}</motion.div>
    </motion.div>
  );
}

export default function Spec() {
  const [ref, p] = useReveal(['start 0.92', 'start 0.4']);
  const ruleOpacity = useTransform(p, [0.86, 0.98], [0, 1]);
  const ruleY = useTransform(p, [0.86, 0.98], [14, 0]);
  return (
    <figure className="pc" ref={ref} aria-label="Six leave policies drawn as strips of days, and one rule">
      <div className="pc-head" aria-hidden="true">
        <span>Policy</span>
        <span className="pc-legend">
          <i className="pc-key pc-key-notice" />Notice before leave
          <i className="pc-key pc-key-start" />Start
          <i className="pc-key pc-key-stretch" />Longest stretch
        </span>
        <span>Below zero</span>
      </div>
      <div className="pc-rows">
        {POLICIES.map((policy, i) => <Row key={policy.name} policy={policy} i={i} p={p} />)}
      </div>
      <motion.div className="pc-rule" style={{ opacity: ruleOpacity, y: ruleY }}>
        <span className="pc-rule-label">One rule, written once</span>
        <span className="pc-rule-text">Working days requested ≤ days available, <u>under this employee’s policy</u></span>
        <span className="pc-rule-note">It reads whichever row applies, so the same facts always give the same decision.</span>
      </motion.div>
    </figure>
  );
}
