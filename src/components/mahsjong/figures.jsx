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

/* Decision 2: the eight Celestial tiles in their three roles, with one tile
   from each role in use. Names and effects are from the team's level design
   slides. */
const ROLES = [
  ['Support', ['Rat’s Gambit: draw any tile from the pile', 'Pig’s Fortune: draw any tile from the discard', 'Dragon’s Dance: rearrange a row of the pile']],
  ['Risky', ['Monkey’s Bargain: trade one tile with the opponent', 'Rooster’s Crow: shuffle the pile']],
  ['Disruptor', ['Ox’s Burden: two random tiles can’t be used in a set', 'Rabbit’s Leap: change the rank of an opponent’s tile', 'Snake’s Molt: change the suit of an opponent’s tile']],
];

export function CelestialFigure() {
  const [ref, step] = useSteps(6);
  const row = step >= 2 ? ['4d', '*', '*', '6b'] : PILE[1];
  const traded = step >= 4;
  const molted = step >= 6;
  return (
    <div className="mj-fig mj-three" ref={ref}>
      <div className="mj-col mj-rolecol step" data-on={step >= 1}>
        <span className="mj-role"><MjTile t="*" />{ROLES[0][0]}</span>
        <ul className="mj-effects">{ROLES[0][1].map((x) => <li key={x}>{x}</li>)}</ul>
        <small className="mj-kicker">Dragon’s Dance</small>
        <Pile rows={[row]} litRow={0} />
        <Tag className="step-fade" data-on={step >= 2} tone="result">Row rearranged</Tag>
      </div>
      <div className="mj-col mj-rolecol step" data-on={step >= 3}>
        <span className="mj-role"><MjTile t="*" />{ROLES[1][0]}</span>
        <ul className="mj-effects">{ROLES[1][1].map((x) => <li key={x}>{x}</li>)}</ul>
        <small className="mj-kicker">Monkey’s Bargain</small>
        <span className="mj-racer"><small>You</small><Hand tiles={['2b', '3b', traded ? '4b' : '9c']} lit={[2]} /></span>
        <span className="mj-racer"><small>Opponent</small><Hand tiles={['7c', '8c', traded ? '9c' : '4b']} lit={[2]} /></span>
        <Tag className="step-fade" data-on={traded} tone="result">One tile traded: both sets complete</Tag>
      </div>
      <div className="mj-col mj-rolecol step" data-on={step >= 5}>
        <span className="mj-role"><MjTile t="*" />{ROLES[2][0]}</span>
        <ul className="mj-effects">{ROLES[2][1].map((x) => <li key={x}>{x}</li>)}</ul>
        <small className="mj-kicker">Snake’s Molt</small>
        <span className="mj-racer"><small>Opponent</small><Hand tiles={['7c', '8c', molted ? '9d' : '9c']} lit={[2]} /></span>
        <Tag className="step-fade" data-on={molted} tone="block">Suit changed: the set is broken</Tag>
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

/* Decision 5: watched once at start-up became a scene the player plays.
   The five lessons are the tutorial's own scene files (tu-drawFromPile,
   tu-drawDiscarded, tu-dragToDiscard, tu-playset, tu-playCelestialTile). */
const LESSONS = [
  ['Draw from the pile', ['6b', '2d', '7c'], [1]],
  ['Draw the discarded tile', ['5d'], [0]],
  ['Drag to discard', ['9c'], [0]],
  ['Play a set', ['5d', '5d', '5d'], [0, 1, 2]],
  ['Play a Celestial tile', ['*'], [0]],
];

export function TutorialFigure() {
  const [ref, step] = useSteps(2 + LESSONS.length);
  const at = step - 3;
  return (
    <div className="mj-fig mj-two" ref={ref}>
      <div className="mj-col step" data-on={step >= 1}>
        <small className="mj-kicker">First tutorial</small>
        <span className="mj-slide" data-cut={step >= 2}><i>▶</i></span>
        <small>Plays once at start-up</small>
      </div>
      <div className="mj-col step" data-on={step >= 2}>
        <small className="mj-kicker">Rebuilt: five lessons, each one played</small>
        <ol className="mj-lessons" role="list">
          {LESSONS.map(([name, tiles, lit], i) => (
            <li key={name} data-state={i < at ? 'past' : i === at ? 'now' : 'next'}>
              <Hand tiles={tiles} lit={i === at ? lit : []} />
              <span>{name}</span>
            </li>
          ))}
        </ol>
        <Tag className="step-fade" data-on={at >= LESSONS.length - 1} tone="result">A single-player scene the player plays through</Tag>
      </div>
    </div>
  );
}

/* Decision 1, before: the first rules as written (Mah's Jong Rules.pdf).
   Four phases a turn, points for sets, and a boss with hit points. The
   scores are the document's own example, turn 3. */
const PHASES = ['Draw', 'Play', 'Score', 'Shop'];
const SCORED = [['Three of a kind', '+3'], ['Three of a kind', '+3'], ['Combo', '+3'], ['Pair', '+2']];

export function FirstRulesFigure() {
  const [ref, step] = useSteps(PHASES.length + SCORED.length + 1);
  const scored = Math.max(0, Math.min(SCORED.length, step - PHASES.length));
  const won = step > PHASES.length + SCORED.length - 1 && scored === SCORED.length;
  return (
    <div className="mj-fig mj-first" ref={ref}>
      <ol className="path" role="list" aria-label="The four phases of a turn in the first rules">
        {PHASES.map((ph, i) => (
          <li key={ph} data-on={step >= i + 1 ? 'true' : 'false'}><span className="path-mark" aria-hidden="true" /><strong>{ph}</strong></li>
        ))}
      </ol>
      <div className="mj-score step" data-on={step >= PHASES.length}>
        <div className="mj-score-list">
          <small className="mj-kicker">One turn, scored</small>
          {SCORED.map(([what, pts], i) => (
            <span key={i} className="mj-score-row step-fade" data-on={scored >= i + 1}><span>{what}</span><b>{pts}</b></span>
          ))}
          <span className="mj-score-row mj-score-total step-fade" data-on={scored >= SCORED.length}><span>Turn total</span><b>+11</b></span>
        </div>
        <div className="mj-boss">
          <small className="mj-kicker">“Grandma” · boss hit points</small>
          <span className="mj-hp" aria-hidden="true"><i style={{ transform: `scaleX(${1 - scored / SCORED.length})` }} /></span>
          <Tag className="step-fade" data-on={won} tone="block">Points beat the boss; no opponent</Tag>
        </div>
      </div>
    </div>
  );
}

/* Leading the team: one sprint plan (Closed Beta, from the team report).
   Every task had an owner, a due date and a priority from 1 to 5. Tasks are
   the report's own, shortened; roles stand in for names. Lanes appear in
   priority order. */
const SPRINT = [
  [5, [
    ['Software lead', 'Match model for the shared state of a game', 'Apr 11'],
    ['Programmer', 'Finish the animation controller, add special-tile animations', 'Apr 13'],
    ['Programmer', 'Finish the audio controller, add the first sounds', 'Apr 11'],
    ['Programmer', 'Special tile: rearrange a row, with the designer’s UI', 'Apr 17'],
    ['Me', 'Load every new scene and its UI into the game', 'Apr 14'],
    ['Design lead', 'Design the action tile assets', 'Apr 9'],
    ['UX lead', 'Export the tutorial page for the programmers', 'Apr 11'],
  ]],
  [4, [
    ['UX lead', 'Tutorial page in Figma', 'Apr 9'],
    ['Designer', 'Rework the gameplay scene from feedback', 'Apr 11'],
    ['Programmer', 'Interface for drawing any tile', 'Apr 18'],
  ]],
  [3, [
    ['Designer', 'Refine details in Figma', 'Apr 10'],
    ['Programmer', 'Find the remaining music', 'Apr 17'],
  ]],
  [2, [
    ['Design lead', 'Component sheet for the style guide', 'Apr 10'],
    ['Design lead', 'Resize the grandma icon', 'Apr 8'],
  ]],
];

export function SprintFigure() {
  const [ref, step] = useSteps(SPRINT.length);
  return (
    <div className="mj-sprint" ref={ref} role="table" aria-label="One sprint’s tasks by priority">
      {SPRINT.map(([prio, tasks], i) => (
        <div key={prio} className="mj-lane step" data-on={step >= i + 1} role="row">
          <span className="mj-prio" role="rowheader" data-top={prio === 5}><b>{prio}</b><small>priority</small></span>
          <span className="mj-tasks" role="cell">
            {tasks.map(([who, what, due]) => (
              <span key={what} className="mj-task" data-me={who === 'Me'}>
                <small>{who} · {due}</small>
                {what}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

/* Between designers and programmers: how a designed screen reached the game. */
const HANDOFF = [
  ['Design', 'A designer lays out the screen in Figma'],
  ['Export', 'The layout is exported as a scene file'],
  ['Load', 'A programmer loads the scene into the game'],
  ['Fit', 'Buttons, transitions and mobile sizing are checked'],
];

export function HandoffFigure() {
  const [ref, step] = useSteps(HANDOFF.length);
  return (
    <ol className="path" ref={ref} role="list" aria-label="How a designed screen reached the game">
      {HANDOFF.map(([k, v], i) => (
        <li key={k} data-on={step >= i + 1 ? 'true' : 'false'}><span className="path-mark" aria-hidden="true" /><strong>{k}</strong><span>{v}</span></li>
      ))}
    </ol>
  );
}

/* The game: taking the opponent's discard means showing a set for good. */
export function DiscardFigure() {
  const [ref, step] = useSteps(4);
  const taken = step >= 3;
  return (
    <div className="mj-fig mj-discard" ref={ref}>
      <div className="mj-col step" data-on={step >= 1}>
        <small className="mj-kicker">Discard</small>
        <Hand tiles={[taken ? '' : '6c']} lit={step === 2 ? [0] : []} />
        <small>{taken ? 'Taken' : 'The opponent’s last discard'}</small>
      </div>
      <div className="mj-col step" data-on={step >= 2}>
        <small className="mj-kicker">Your hand</small>
        <Hand tiles={taken ? ['2b', '3b', '9d'] : ['2b', '3b', '6c', '6c', '9d']} lit={step === 2 ? [2, 3] : []} />
        <small>{taken ? 'Three tiles left to work with' : 'Two tiles that the discard would complete'}</small>
      </div>
      <div className="mj-col step" data-on={taken}>
        <small className="mj-kicker">Shown set</small>
        <Hand tiles={['6c', '6c', '6c']} />
        <Tag className="step-fade" data-on={step >= 4} tone="block">Face up for the rest of the game</Tag>
      </div>
    </div>
  );
}

/* What each sprint put first. Dates: release tags in the repository and the
   release task in the team report. Priorities: the report's own summaries of
   the alpha and the closed beta plan. */
const SPRINTS = [
  ['Gameplay prototype', 'Mar 1', 'The rules, playable'],
  ['Alpha', 'Mar 28', 'Every core mechanic working over the network; mobile controls and screen sizes'],
  ['Closed beta', 'April', 'Animation, audio, the new special tiles, and scenes reworked from alpha feedback'],
  ['Version 4.0', 'May 17', 'The last tagged release'],
];

export function SprintsFigure() {
  const [ref, step] = useSteps(SPRINTS.length);
  return (
    <ol className="path" ref={ref} role="list" aria-label="What each sprint put first">
      {SPRINTS.map(([name, when, what], i) => (
        <li key={name} data-on={step >= i + 1 ? 'true' : 'false'}><span className="path-mark" aria-hidden="true" /><strong>{name}</strong><small>{when}</small><span>{what}</span></li>
      ))}
    </ol>
  );
}

/* My role: the game's screens and systems, with the ones Walker built marked.
   From the page's own list (commit history) and his done tasks in the team
   report (the pause scene). */
const SCREENS = [
  ['Landing'], ['Menu'], ['Host and client'], ['Game'],
  ['Discard pile', 'built'], ['Pause', 'built'], ['Settings', 'built'], ['Info', 'built'],
  ['Help', 'built'], ['Game over', 'built'], ['Tutorial', 'shared'],
];
const SYSTEMS = [['AnimatedNode class', 'built'], ['Animation controller', 'shared']];

export function ScreensFigure() {
  const [ref, step] = useSteps(3);
  const state = (kind) => (kind === 'built' && step >= 2) || (kind === 'shared' && step >= 3) ? kind : undefined;
  return (
    <div className="mj-fig mj-screens-fig" ref={ref}>
      <small className="mj-kicker step" data-on={step >= 1}>Screens</small>
      <div className="mj-screens step" data-on={step >= 1}>
        {SCREENS.map(([name, kind]) => <span key={name} className="mj-screen" data-mine={state(kind)}>{name}</span>)}
      </div>
      <small className="mj-kicker step" data-on={step >= 1}>Systems</small>
      <div className="mj-screens step" data-on={step >= 1}>
        {SYSTEMS.map(([name, kind]) => <span key={name} className="mj-screen" data-mine={state(kind)}>{name}</span>)}
      </div>
      <div className="mj-legend">
        <span className="step-fade" data-on={step >= 2}><i data-mine="built" />Built by me</span>
        <span className="step-fade" data-on={step >= 3}><i data-mine="shared" />Started by me, finished with teammates</span>
      </div>
    </div>
  );
}
