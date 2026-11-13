import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useSteps } from '../../lib/useSteps.js';

/*
 * A conversation as a single vertical thread, animated by scroll alone.
 *
 * The motion grammar is the argument: things appear in the order the system
 * reasons. A message arrives. Its words become fields one at a time, each
 * phrase underlining as its chip appears. The steps that reach a decision
 * land left to right. Only then does the reply appear, already coloured by
 * the decision.
 *
 * Scroll is the clock. Each block plays its steps as its top edge travels
 * from near the bottom of the viewport to its middle, and scrolling back up
 * unplays them in reverse so any moment can be replayed. Blocks are chained:
 * a block cannot start before the one above it has finished, and it clears
 * as soon as the one above it is no longer complete. Reduced motion renders a
 * block complete as soon as it is allowed.
 *
 * Every block takes an `index`: its position in the chain, from 0.
 *
 * `notes` on <Thread> puts the design decisions beside the conversation. Each
 * note names the block it starts `from`, and lights when that block's turn
 * comes, so the decision is read next to the component it shaped.
 */

const ThreadContext = createContext({ complete: [], setComplete: () => {} });

/* Steps 1..count, driven by the block's own scroll progress, held at 0 until
   the block above has finished. */
function useBlock(index, count) {
  const { complete, setComplete } = useContext(ThreadContext);
  const [ref, own] = useSteps(count);

  const allowed = index === 0 || complete[index - 1] === true;
  const phase = allowed ? own : 0;

  useEffect(() => {
    setComplete(index, phase >= count);
  }, [phase, count, index, setComplete]);

  return [ref, phase];
}

function Chip({ k, v, note, tone, on }) {
  return (
    <span className="story-chip" data-tone={tone} data-on={on}>
      <em>{k}</em><b>{v}</b>{note && <small>{note}</small>}
    </span>
  );
}

function Bubble({ who, tone, chips, on, children }) {
  return (
    <div className="story-bubble" data-tone={tone} data-on={on}>
      <div className={`leave-bubble policy-preview-${tone}`}>
        <strong>{who}</strong>
        {chips && (
          <span className="leave-days">
            {chips.map(([n, l]) => <span key={l}><b>{n}</b>{l}</span>)}
          </span>
        )}
        <span>{children}</span>
      </div>
    </div>
  );
}

/* A row of facts, one after another. */
export function Facts({ index, label, chips }) {
  const [ref, phase] = useBlock(index, chips.length);
  return (
    <li className="story-state" ref={ref}>
      <span className="story-label" data-on={phase >= 1}>{label}</span>
      <span className="story-chips">
        {chips.map((c, i) => <Chip key={c.k + c.v} {...c} on={phase >= i + 1} />)}
      </span>
    </li>
  );
}

/* A message arrives; then the draft is built from it, one field at a time.
   A chip with a `mark` underlines that phrase in the bubble as it appears. */
export function MessageToDraft({ index, who, parts, label, chips }) {
  const [ref, phase] = useBlock(index, chips.length + 1);
  const lit = new Set(chips.filter((c, i) => c.mark && phase >= i + 2).map((c) => c.mark));
  return (
    <li className="story-pair" ref={ref}>
      <Bubble who={who} tone="message" on={phase >= 1}>
        {parts.map((p, i) =>
          typeof p === 'string' ? p : <mark key={i} data-on={lit.has(p.mark)}>{p.text}</mark>,
        )}
      </Bubble>
      <div className="story-state">
        <span className="story-label" data-on={phase >= 2}>{label}</span>
        <span className="story-chips">
          {chips.map((c, i) => <Chip key={c.k + c.v} {...c} on={phase >= i + 2} />)}
        </span>
      </div>
    </li>
  );
}

/* The steps that reach a decision, left to right, decision last. Each cell is
   { k, v, note, tone }; the cell that carries the verdict takes the tone. */
export function Check({ index, label = 'How the reply is reached', cells }) {
  const [ref, phase] = useBlock(index, cells.length + 1);
  return (
    <li className="story-check" ref={ref}>
      <span className="story-label" data-on={phase >= 1}>{label}</span>
      <ol className="ls-check" role="list" style={{ '--cells': cells.length }}>
        {cells.map((c, i) => (
          <li key={c.k + c.v} data-on={phase >= i + 2} data-tone={c.tone}>
            <span>{c.k}</span>
            <b>{c.v}</b>
            {c.note && <small>{c.note}</small>}
          </li>
        ))}
      </ol>
    </li>
  );
}

/* Research: what was found, then what it put in the spec, one item at a time.
   The finding is a sentence; its consequences are chips in the same structure
   register as the draft, so a reader can match them to the thread. */
export function Finding({ index, source, label = 'In the spec', chips, children }) {
  const [ref, phase] = useBlock(index, chips.length + 1);
  return (
    <li className="story-finding" ref={ref}>
      <div className="story-finding-text" data-on={phase >= 1}>
        <span>{source}</span>
        <p>{children}</p>
      </div>
      <div className="story-state">
        <span className="story-label" data-on={phase >= 2}>{label}</span>
        <span className="story-chips">
          {chips.map((c, i) => <Chip key={c.k + c.v} {...c} on={phase >= i + 2} />)}
        </span>
      </div>
    </li>
  );
}

export function Reply({ index, who, tone, chips, children }) {
  const [ref, phase] = useBlock(index, 1);
  return (
    <li ref={ref}>
      <Bubble who={who} tone={tone} chips={chips} on={phase >= 1}>{children}</Bubble>
    </li>
  );
}

/* One run of the same turn: what the agent said, then the decision behind it.
   Stacked runs put differing wording beside an identical decision cell. */
export function Run({ index, who, tone, cell, children }) {
  const [ref, phase] = useBlock(index, 2);
  return (
    <li className="story-run" ref={ref}>
      <Bubble who={who} tone={tone} on={phase >= 1}>{children}</Bubble>
      <div className="story-check">
        <ol className="ls-check" role="list" style={{ '--cells': 1 }}>
          <li data-on={phase >= 2} data-tone={cell.tone}>
            <span>{cell.k}</span>
            <b>{cell.v}</b>
            {cell.note && <small>{cell.note}</small>}
          </li>
        </ol>
      </div>
    </li>
  );
}

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
