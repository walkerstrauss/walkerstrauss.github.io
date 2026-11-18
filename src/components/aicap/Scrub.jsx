import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

/*
 * A demo whose screen changes state. In the page flow a changing
 * screen can't line up with the reader: it starts stepping while half of it
 * is below the fold and finishes with its top under the header. So it holds
 * still, fully in view, only while it steps: about a fifth of a screen per
 * step, then it scrolls on. The note for the current step is lit beside it.
 * Scrolling back reverses it. (Figures whose parts accumulate, like the agent
 * thread, never hold: they build in the flow.)
 *
 * `persist` is for one object that changes state (the weather clock): it
 * stays mounted across steps, so its own motion plays between them (a turn,
 * a new light pattern) where separate screens would cross-fade.
 */
export default function Scrub({ steps, children, caption, title, intro, persist = false }) {
  const ref = useRef(null);
  const at = useRef(0);
  const [i, setI] = useState(0);
  const [fits, setFits] = useState(true);
  const hold = steps.length * 22; // vh

  // framer-motion's page scroll value drives the step.
  const { scrollY } = useScroll();
  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const pin = window.innerWidth <= 820 ? 64 : 88;
    const vh = window.innerHeight;
    const sticky = el.querySelector('.ax-sticky');
    const h = sticky ? sticky.offsetHeight : 0;
    // Hold only a figure that fits under the header; a taller one would
    // be cut off while held, so it steps in the flow instead.
    const ok = !sticky || h <= vh - pin - 8;
    setFits((was) => (was === ok ? was : ok));
    // While held, the figure sits in the middle of the screen below the header.
    const stick = ok ? Math.round(pin + Math.max(0, (vh - pin - h) / 2)) : pin;
    if (stick !== at.current) { at.current = stick; el.style.setProperty('--ax-top', `${stick}px`); }
    const top = el.getBoundingClientRect().top;
    const p = ok ? (stick - top) / ((hold / 100) * vh) : (0.9 * vh - top) / (0.88 * vh);
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length)));
    setI((cur) => (cur === next ? cur : next));
  }, [hold, steps.length]);
  useMotionValueEvent(scrollY, 'change', update);
  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  return (
    <figure className={fits ? 'ax-scrub ax-hold' : 'ax-scrub ax-hold ax-flow'} ref={ref} style={{ '--ax-hold': `${hold}vh` }}>
      <div className="ax-sticky">
        <div className="ax-stage ax-stack">
          {/* Every state is laid out in the same cell, so the stage is as
              tall as its tallest state and never jumps; only the current
              one is shown. */}
          {persist
            ? <div className="ax-layer" data-on="true">{children(i)}</div>
            : steps.map((_, k) => (
              <div className="ax-layer" key={k} data-on={k === i} aria-hidden={k !== i}>{children(k)}</div>
            ))}
        </div>
        <div className="ax-side">
          {title && <h3 className="ax-title">{title}</h3>}
          {intro && <p className="ax-intro">{intro}</p>}
        {/* The figure's notes (shared fig- classes): the current one on a
            hairline that meets the object, numbered steps above it, and
            the full list kept for screen readers. */}
        <ol className="fig-steps" aria-hidden="true">
          {steps.map((s, k) => (
            <li key={s.label} data-state={k < i ? 'past' : k === i ? 'now' : 'next'}>{k + 1}</li>
          ))}
        </ol>
        <div className="fig-stack" aria-hidden="true">
          {steps.map((s, k) => (
            <div key={s.label} className="fig-note" data-on={k === i} data-tone={s.tone}>
              <span className="fig-k">{s.label}</span>
              {s.rule && <p>{s.rule}</p>}
            </div>
          ))}
        </div>
        <ol className="sr-only">
          {steps.map((s) => <li key={s.label}>{s.label}{s.rule ? `: ${s.rule}` : ''}</li>)}
        </ol>
          {caption && <figcaption className="cs-caption ax-caption">{caption}</figcaption>}
        </div>
      </div>
      <div className="ax-hold-room" aria-hidden="true" />
    </figure>
  );
}
