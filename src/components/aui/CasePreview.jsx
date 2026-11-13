import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion.js';
import '../case/case.css';

/*
 * Tiles for the AUI pages. Each one plays, in miniature, what the page behind
 * it shows, using that page's own examples and colours (blue for the person,
 * red for a block or a hold, green for an allowed write), so the tile is a
 * preview of the destination and not a separate illustration.
 *
 * A tile plays only while it is on screen, one step at a time, holds on the
 * outcome, then moves to its next scene. Reduced motion shows the first
 * scene finished and still. Fictional wording; not a product interface.
 */

/* From the reference agents case: the leave request that is blocked with a
   reason, and the dispute that is inside its filing window. */
const LEAVE = {
  kind: 'thread',
  msg: 'Can I take two weeks off starting June 7?',
  cells: [['Requested', '10 working days'], ['Available', '6 days']],
  reply: { tone: 'block', text: 'You have 6 days available, so I haven’t submitted this. Would one week work?' },
  end: { tone: 'result', text: 'One week submitted, within policy' },
};
const DISPUTE = {
  kind: 'thread',
  msg: 'The sofa I ordered never arrived. Can I dispute the charge?',
  cells: [['Since promised delivery', '25 days'], ['Filing window', '60 days']],
  reply: { text: 'That’s inside the filing window. Shall I file it?' },
  end: { tone: 'result', text: 'Dispute filed' },
};

/* From the customer rollout case: a ticket whose proposed reply is held for
   the support team, and the route a ticket takes through the integration. */
const TICKET = {
  kind: 'thread',
  msg: 'I’m still waiting for my payment. Can you check?',
  reply: { text: 'I can look into that. What was the amount?' },
  end: { tone: 'result', text: 'Shown to the support team before anything is sent' },
};
const ROUTE = {
  kind: 'route',
  nodes: ['Ticket', 'Webhook', 'Customer APIs', 'Reply or handoff'],
};

const stepsIn = (scene) => (scene.kind === 'route' ? scene.nodes.length : scene.cells ? 4 : 3);

function useScenes(scenes) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduced = useReducedMotion();
  /* Starts on the first scene already finished, so a glance shows the
     outcome before anything has moved. */
  const [at, setAt] = useState({ scene: 0, step: stepsIn(scenes[0]) });

  useEffect(() => {
    if (!inView || reduced) return undefined;
    const last = at.step >= stepsIn(scenes[at.scene]);
    const t = setTimeout(() => {
      setAt((a) => (a.step >= stepsIn(scenes[a.scene])
        ? { scene: (a.scene + 1) % scenes.length, step: 0 }
        : { scene: a.scene, step: a.step + 1 }));
    }, last ? 2600 : at.step === 0 ? 500 : 1000);
    return () => clearTimeout(t);
  }, [inView, reduced, at, scenes]);

  return [ref, reduced ? { scene: 0, step: stepsIn(scenes[0]) } : at];
}

function Scene({ scene, step }) {
  if (scene.kind === 'route') {
    return (
      <ol className="mini-route" role="list">
        {scene.nodes.map((n, i) => (
          <li key={n} data-on={step > i ? 'true' : 'false'}>{n}</li>
        ))}
      </ol>
    );
  }
  let n = 1;
  return (
    <div className="mini-thread">
      <span className="mini-msg mini-step" data-on={step >= n}>{scene.msg}</span>
      {scene.cells && (
        <span className="mini-cells mini-step" data-on={step >= ++n}>
          {scene.cells.map(([k, v]) => (
            <span key={k}><small>{k}</small>{v}</span>
          ))}
        </span>
      )}
      <span className="mini-reply mini-step" data-tone={scene.reply.tone} data-on={step >= ++n}>{scene.reply.text}</span>
      <span className="mini-end mini-step" data-tone={scene.end.tone} data-on={step >= ++n}>{scene.end.text}</span>
    </div>
  );
}

function Preview({ scenes, labels }) {
  const [ref, at] = useScenes(scenes);
  return (
    <div className="mini" ref={ref} aria-hidden="true">
      {labels && <span className="mini-label">{labels[at.scene]}</span>}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={at.scene}
          className="mini-stage"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <Scene scene={scenes[at.scene]} step={at.step} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const REFERENCE = [LEAVE, DISPUTE];
const SUPPORT = [TICKET, ROUTE];
const HUB = [LEAVE, TICKET];
const HUB_LABELS = ['Reference agents', 'Customer rollouts'];

/* Tile for the reference agents case. */
export function ReferencePreview() {
  return <Preview scenes={REFERENCE} />;
}

/* Tile for the customer rollout case. */
export function SupportPreview() {
  return <Preview scenes={SUPPORT} />;
}

/* Home tile for the AUI page: one scene from each of its two cases, named. */
export function AUIHomePreview() {
  return <Preview scenes={HUB} labels={HUB_LABELS} />;
}
