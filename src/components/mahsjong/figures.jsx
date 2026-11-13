import { motion } from 'framer-motion';
import { useSteps } from '../../lib/useSteps.js';
import { EASE } from '../../lib/motion.js';
import { Hand, MjTile, Pile, Prompt, Tag, TimerRing, Turn } from './parts.jsx';

/*
 * One drawn figure per section of the Mah's Jong case. Scroll is the only
 * clock (useSteps): each figure steps forward as it rises up the page and
 * back when the page scrolls up. Reduced motion shows the finished figure.
 * Illustrations of the rules and of each decision, not captures of the build.
 */

const move = { duration: 0.5, ease: EASE };
const PILE = [['6b', '*', '2d', '7c'], ['6b', '*', '4d', '*'], ['1b', '8c', '4d']];
const HAND = ['2b', '3b', '4b', '5d', '5d', '5d', '7c', '8c', '9c', '1d', '2d', '3d', '6c', '6c'];

/* The game: the pile, a hand of four sets and a pair, and a Celestial tile. */
export function BoardFigure() {
  const [ref, step] = useSteps(4);
  return (
    <div className="mj-fig mj-board" ref={ref}>
      <div className="mj-row step" data-on={step >= 1}>
        <Tag>The pile, face up</Tag>
        <Pile rows={PILE} />
        <Tag className="step-fade" data-on={step >= 4} tone="star">✦ Celestial tile</Tag>
      </div>
      <div className="mj-sets step" data-on={step >= 2}>
        {[0, 3, 6, 9].map((i) => (
          <span key={i} className="mj-set" data-on={step >= 3}>
            <Hand tiles={HAND.slice(i, i + 3)} />
            <small>Set of three</small>
          </span>
        ))}
        <span className="mj-set" data-on={step >= 3}>
          <Hand tiles={HAND.slice(12)} />
          <small>Pair</small>
        </span>
      </div>
      <Tag className="step" data-on={step >= 3} tone="result">A full hand: four sets and a pair</Tag>
    </div>
  );
}

/* Decision 1: scoring and the boss go; two hands race. */
export function RaceFigure() {
  const [ref, step] = useSteps(4);
  return (
    <div className="mj-fig mj-two" ref={ref}>
      <div className="mj-col step" data-on={step >= 1}>
        <small className="mj-kicker">First rules</small>
        {['Score phase', 'Shop', '“Grandma” boss with hit points'].map((x) => (
          <span key={x} className="mj-chip" data-cut={step >= 2}>{x}</span>
        ))}
      </div>
      <div className="mj-col step" data-on={step >= 3}>
        <small className="mj-kicker">Revised design</small>
        <span className="mj-racer"><small>You</small><Hand tiles={['2b', '3b', '4b', '5d', '5d', '', '', '']} /></span>
        <span className="mj-racer"><small>Opponent</small><Hand tiles={['7c', '8c', '9c', '', '', '', '', '']} /></span>
        <Tag className="step-fade" data-on={step >= 4} tone="result">First full hand wins</Tag>
      </div>
    </div>
  );
}

/* Decision 2: three roles, and one Celestial tile in use on the pile. */
export function CelestialFigure() {
  const [ref, step] = useSteps(5);
  const rows = step >= 5 ? [PILE[0], ['4d', '*', '*', '6b'], PILE[2]] : PILE;
  return (
    <div className="mj-fig mj-two" ref={ref}>
      <div className="mj-col">
        <small className="mj-kicker">Three roles</small>
        {['Support', 'Risky', 'Disruptor'].map((role, i) => (
          <span key={role} className="mj-role step" data-on={step >= i + 1}><MjTile t="*" />{role}</span>
        ))}
      </div>
      <div className="mj-col step" data-on={step >= 4}>
        <small className="mj-kicker">One in use</small>
        <Prompt>Select the row you want to rearrange</Prompt>
        <Pile rows={rows} litRow={1} dimOthers />
        <Tag className="step-fade" data-on={step >= 5} tone="result">Row rearranged</Tag>
      </div>
    </div>
  );
}

/* Decision 3: no end-turn button; a guide for the action, then the turn ends itself. */
export function TurnsFigure() {
  const [ref, step] = useSteps(4);
  const dropped = step >= 3;
  return (
    <div className="mj-fig mj-two" ref={ref}>
      <div className="mj-col step" data-on={step >= 1}>
        <small className="mj-kicker">First build</small>
        <span className="mj-button" data-cut={step >= 2}>End turn</span>
      </div>
      <div className="mj-col step" data-on={step >= 2}>
        <small className="mj-kicker">Final</small>
        <Turn who={step >= 4 ? 'them' : 'you'} />
        <span className="mj-zone" data-full={dropped}>
          {dropped ? null : 'Drag here to discard'}
          <motion.span className="mj-drag" animate={{ y: dropped ? 0 : 58, x: dropped ? 0 : -40 }} transition={move}>
            <MjTile t="9c" lit={!dropped} />
          </motion.span>
        </span>
        <Hand tiles={['2b', '3b', '4b', '5d', '5d']} />
        <Tag className="step-fade" data-on={step >= 4} tone="result">Turn ends on its own</Tag>
      </div>
    </div>
  );
}

/* Decision 4: 30 seconds became 45; at zero the turn ends. */
export function TimerFigure() {
  const [ref, step] = useSteps(4);
  const left = [45, 45, 45, 20, 0][step];
  return (
    <div className="mj-fig mj-timerfig" ref={ref}>
      <span className="mj-lengths step" data-on={step >= 1}>
        <span className="mj-chip" data-cut={step >= 2}>30 seconds</span>
        <span className="mj-chip step-fade" data-on={step >= 2} data-strong="true">45 seconds</span>
      </span>
      <TimerRing left={left} />
      <Turn who={step >= 4 ? 'them' : 'you'} />
      <Tag className="step-fade" data-on={step >= 4} tone="block">Time is up: the turn ends</Tag>
    </div>
  );
}

/* Decision 5: watched once at start-up became a scene the player plays. */
export function TutorialFigure() {
  const [ref, step] = useSteps(4);
  return (
    <div className="mj-fig mj-two" ref={ref}>
      <div className="mj-col step" data-on={step >= 1}>
        <small className="mj-kicker">First tutorial</small>
        <span className="mj-slide" data-cut={step >= 2}><i>▶</i></span>
        <small>Plays once at start-up</small>
      </div>
      <div className="mj-col step" data-on={step >= 3}>
        <small className="mj-kicker">Rebuilt</small>
        <Pile rows={[PILE[0].slice(0, 3), PILE[2]]} />
        <span className="mj-played">
          <Hand tiles={['2b', '3b', '4b', '5d']} lit={step >= 4 ? [3] : []} />
          <i className="mj-finger step-fade" data-on={step >= 4} aria-hidden="true" />
        </span>
        <Tag className="step-fade" data-on={step >= 4} tone="result">A single-player scene the player plays through</Tag>
      </div>
    </div>
  );
}
