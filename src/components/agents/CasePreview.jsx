import { useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { TileActive } from '../Tiles.jsx';
import { EASE } from '../../lib/motion.js';
import '../case/case.css';

/*
 * Tiles for the agent pages. Each one plays, in miniature, what the page behind
 * it shows, using that page's own examples and colours (blue for the person,
 * red for a block or a hold, green for an allowed write), so the tile is a
 * preview of the destination and not a separate illustration.
 *
 * A tile rests on its finished scene and replays it when the reader points
 * at or focuses it. Reduced motion keeps the finished frame. Fictional wording; not a product interface.
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

/* From the customer rollout case: a ticket and the agent's reply, then the
   path that reply took to release, named as the page names its stages. The
   tile ends on the release, which the team's review made possible. */
const TICKET = {
  kind: 'thread',
  msg: 'There’s a fee on my statement I don’t recognize. Can you check?',
  reply: { text: 'I can look into that. First, what’s the email on file?' },
  stages: ['Tests', 'Customer review', 'Released'],
};

const stepsIn = (scene) => scene.steps ?? (scene.kind === 'route'
  ? scene.nodes.length
  : 2 + (scene.cells ? 1 : 0) + (scene.end ? 1 : 0) + (scene.stages?.length ?? 0));

/* A tile's one moment. At rest it shows the first scene finished.
   When the reader points at or focuses the tile, the scene replays from its
   first step; on touch screens it plays once as the tile comes into view.
   Reduced motion keeps the finished frame. */
export function useScenes(scenes) {
  const ref = useRef(null);
  const active = useContext(TileActive);
  const touch = typeof window !== 'undefined' && window.matchMedia?.('(hover: none)').matches;
  const seen = useInView(ref, { amount: 0.6, once: true });
  const reduced = useReducedMotion();
  const total = stepsIn(scenes[0]);
  const [step, setStep] = useState(total);

  useEffect(() => {
    const play = active || (touch && seen);
    if (reduced || !play) { setStep(total); return undefined; }
    setStep(0);
    const controls = animate(0, total, {
      duration: 0.45 * total,
      ease: 'linear',
      onUpdate: (v) => setStep(Math.floor(v + 0.001)),
    });
    return () => controls.stop();
  }, [active, touch, seen, reduced, total]);

  return [ref, { scene: 0, step }];
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
      {scene.end && (
        <span className="mini-end mini-step" data-tone={scene.end.tone} data-on={step >= ++n}>{scene.end.text}</span>
      )}
      {scene.stages && (
        <span className="mini-stages">
          {scene.stages.map((name) => (
            <span key={name} className="mini-stages-item mini-step" data-on={step >= ++n}>{name}</span>
          ))}
        </span>
      )}
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

const REFERENCE = [LEAVE];
const SUPPORT = [TICKET];
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

/* Home tile for the agent page: one scene from each of its two cases, named. */
export function AgentsHomePreview() {
  return <Preview scenes={HUB} labels={HUB_LABELS} />;
}
