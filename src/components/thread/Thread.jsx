import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { motion, useMotionValueEvent, useTransform } from 'framer-motion';
import { Rise, useReveal, windowFor } from '../../lib/useReveal.jsx';

/*
 * A conversation as a single vertical thread, animated by scroll alone.
 *
 * The motion grammar is the argument: things appear in the order the system
 * reasons. A message arrives. Its words become fields one at a time, each
 * phrase underlining as its chip appears. The steps that reach a decision
 * land left to right. Only then does the reply appear, already coloured by
 * the decision.
 *
 * Scroll is the clock (framer-motion). Each block reads a spring-smoothed
 * scroll progress for its own position, and every bubble, chip and cell
 * fades and lifts on a window of that progress, so the thread moves with
 * the scroll continuously and in reverse when scrolling back. Blocks lower
 * on the page start later because they are lower; no block waits on another.
 * Reduced motion renders every block finished.
 *
 * Every block takes an `index`: its position in the chain, from 0. It is used
 * to light the notes beside the thread.
 *
 * `notes` on <Thread> puts the design decisions beside the conversation. Each
 * note names the block it starts `from`, and lights when that block's turn
 * comes, so the decision is read next to the component it shaped.
 */

const ThreadContext = createContext({ complete: [], setComplete: () => {} });

/* A block's own progress; reports when it has fully arrived, for the notes. */
function useBlock(index) {
  const { setComplete } = useContext(ThreadContext);
  const [ref, p] = useReveal();
  useMotionValueEvent(p, 'change', (v) => setComplete(index, v > 0.97));
  return [ref, p];
}

function Chip({ k, v, note, tone, p, at, of }) {
  return (
    <Rise p={p} at={at} of={of} className="story-chip" data-tone={tone} lift={8}>
      <em>{k}</em><b>{v}</b>{note && <small>{note}</small>}
    </Rise>
  );
}

function Bubble({ who, tone, chips, p, at, of, children }) {
  return (
    <Rise p={p} at={at} of={of} as="div" className="story-bubble" data-tone={tone} lift={14}>
      <div className={`leave-bubble policy-preview-${tone}`}>
        <strong>{who}</strong>
        {chips && (
          <span className="leave-days">
            {chips.map(([n, l]) => <span key={l}><b>{n}</b>{l}</span>)}
          </span>
        )}
        <span>{children}</span>
      </div>
    </Rise>
  );
}

function Label({ p, at, of, children }) {
  return <Rise p={p} at={at} of={of} className="story-label" lift={6}>{children}</Rise>;
}

/* A phrase in the message that underlines as its chip arrives. */
function Mark({ p, at, of, children }) {
  const [a, b] = windowFor(at, of);
  const fill = useTransform(p, [a, b], [0, 1]);
  return (
    <mark data-on="true" className="story-mark">
      {children}
      <motion.i className="story-mark-line" aria-hidden="true" style={{ scaleX: fill }} />
    </mark>
  );
}

/* A row of facts, one after another. */
export function Facts({ index, label, chips }) {
  const [ref, p] = useBlock(index);
  const n = chips.length + 1;
  return (
    <li className="story-state" ref={ref}>
      <Label p={p} at={0} of={n}>{label}</Label>
      <span className="story-chips">
        {chips.map((c, i) => <Chip key={c.k + c.v} {...c} p={p} at={i + 1} of={n} />)}
      </span>
    </li>
  );
}

/* A message arrives; then the draft is built from it, one field at a time.
   A chip with a `mark` underlines that phrase in the bubble as it appears. */
export function MessageToDraft({ index, who, parts, label, chips }) {
  const [ref, p] = useBlock(index);
  const n = chips.length + 2;
  const at = (mark) => 2 + chips.findIndex((c) => c.mark === mark);
  return (
    <li className="story-pair" ref={ref}>
      <Bubble who={who} tone="message" p={p} at={0} of={n}>
        {parts.map((part, i) =>
          typeof part === 'string' ? part : <Mark key={i} p={p} at={at(part.mark)} of={n}>{part.text}</Mark>,
        )}
      </Bubble>
      <div className="story-state">
        <Label p={p} at={1} of={n}>{label}</Label>
        <span className="story-chips">
          {chips.map((c, i) => <Chip key={c.k + c.v} {...c} p={p} at={i + 2} of={n} />)}
        </span>
      </div>
    </li>
  );
}

/* The steps that reach a decision, left to right, decision last. Each cell is
   { k, v, note, tone }; the cell that carries the verdict takes the tone. */
export function Check({ index, label = 'How the reply is reached', cells }) {
  const [ref, p] = useBlock(index);
  const n = cells.length + 1;
  return (
    <li className="story-check" ref={ref}>
      <Label p={p} at={0} of={n}>{label}</Label>
      <ol className="ls-check" role="list" style={{ '--cells': cells.length }}>
        {cells.map((c, i) => (
          <Rise key={c.k + c.v} as="li" p={p} at={i + 1} of={n} data-tone={c.tone} lift={8}>
            <span>{c.k}</span>
            <b>{c.v}</b>
            {c.note && <small>{c.note}</small>}
          </Rise>
        ))}
      </ol>
    </li>
  );
}

/* What a decision leads to: stages joined by a line that draws as the scroll
   reaches each one, ending on the state that matters (an agent live). Each
   stage is { k, v, tone, live }. */
export function Release({ index, label, stages }) {
  const [ref, p] = useBlock(index);
  const n = stages.length + 1;
  const [a] = windowFor(1, n);
  const [, b] = windowFor(n - 1, n);
  const draw = useTransform(p, [a, b], [0, 1]);
  return (
    <li className="story-release" ref={ref}>
      <Label p={p} at={0} of={n}>{label}</Label>
      <div className="rl-path" style={{ '--stages': stages.length }}>
        <motion.i className="rl-line" aria-hidden="true" style={{ '--draw': draw }} />
        <ol role="list">
          {stages.map((s, i) => (
            <Rise key={s.k + s.v} as="li" p={p} at={i + 1} of={n} data-tone={s.tone} data-live={s.live ? 'true' : undefined} lift={8}>
              <span className="rl-dot" aria-hidden="true" />
              <span className="rl-k">{s.k}</span>
              <b>{s.v}</b>
            </Rise>
          ))}
        </ol>
      </div>
    </li>
  );
}

/* Research: what was found, then what it put in the spec, one item at a time. */
export function Finding({ index, source, label = 'In the spec', chips, children }) {
  const [ref, p] = useBlock(index);
  const n = chips.length + 2;
  return (
    <li className="story-finding" ref={ref}>
      <Rise p={p} at={0} of={n} as="div" className="story-finding-text">
        <span>{source}</span>
        <p>{children}</p>
      </Rise>
      <div className="story-state">
        <Label p={p} at={1} of={n}>{label}</Label>
        <span className="story-chips">
          {chips.map((c, i) => <Chip key={c.k + c.v} {...c} p={p} at={i + 2} of={n} />)}
        </span>
      </div>
    </li>
  );
}

export function Reply({ index, who, tone, chips, children }) {
  const [ref, p] = useBlock(index);
  return (
    <li ref={ref}>
      <Bubble who={who} tone={tone} chips={chips} p={p} at={0} of={1}>{children}</Bubble>
    </li>
  );
}

/* One run of the same turn: what the agent said, then the decision behind it.
   Stacked runs put differing wording beside an identical decision cell. */
export function Run({ index, who, tone, cell, children }) {
  const [ref, p] = useBlock(index);
  return (
    <li className="story-run" ref={ref}>
      <Bubble who={who} tone={tone} p={p} at={0} of={2}>{children}</Bubble>
      <div className="story-check">
        <ol className="ls-check" role="list" style={{ '--cells': 1 }}>
          <Rise as="li" p={p} at={1} of={2} data-tone={cell.tone} lift={8}>
            <span>{cell.k}</span>
            <b>{cell.v}</b>
            {cell.note && <small>{cell.note}</small>}
          </Rise>
        </ol>
      </div>
    </li>
  );
}

/* Narration and earlier turns are not chained; kept for older call sites. */

/* The decisions beside the thread. The current one is lit; earlier ones stay
   legible. Uses the same list as the kiosk walkthroughs on the Onki case. */
function Notes({ notes, complete }) {
  let now = 0;
  notes.forEach((n, i) => {
    if (n.from === 0 || complete[n.from - 1] === true) now = i;
  });
  return (
    <ol className="story-notes ax-notes" role="list">
      {notes.map((n, i) => (
        <li key={n.label} data-state={i < now ? 'past' : i === now ? 'now' : 'next'}>
          <span className="ax-tick" aria-hidden="true" />
          <div>
            <strong>{n.label}</strong>
            <span>{n.rule}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* `wide` lets a thread that is not a conversation (research rows, a model)
   run the full page width instead of sitting at chat width. */
export function Thread({ caption, notes, wide, children }) {
  const [complete, setCompleteState] = useState([]);
  const setComplete = useCallback((i, value) => {
    setCompleteState((c) => {
      if ((c[i] === true) === value) return c;
      const next = c.slice();
      next[i] = value;
      return next;
    });
  }, []);
  const value = useMemo(() => ({ complete, setComplete }), [complete, setComplete]);

  return (
    <ThreadContext.Provider value={value}>
      <figure className={notes ? 'story story-with-notes' : wide ? 'story story-wide' : 'story'}>
        <ol className="story-list" role="list">{children}</ol>
        {notes && <Notes notes={notes} complete={complete} />}
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </ThreadContext.Provider>
  );
}
