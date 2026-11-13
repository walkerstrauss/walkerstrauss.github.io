import { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

/*
 * A scroll-scrubbed demo. The block is several viewports tall; its stage stays
 * pinned while the page scrolls through it, and scroll progress picks the
 * current step. The component on stage renders that step, and the matching
 * rule from the spec is lit in the list beside it.
 *
 * Scrolling back reverses it, so a reader can replay any moment.
 */
export default function Scrub({ steps, children, caption, title, intro, perStep = 38 }) {
  const ref = useRef(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setI((cur) => (cur === next ? cur : next));
  });

  return (
    <figure className="ax-scrub" ref={ref} style={{ '--ax-len': `${steps.length * perStep + 60}vh` }}>
      <div className="ax-sticky">
        <div className="ax-stage">{children(i)}</div>
        <div className="ax-side">
          {title && <h3 className="ax-title">{title}</h3>}
          {intro && <p className="ax-intro">{intro}</p>}
        <ol className="ax-notes" role="list">
          {steps.map((s, k) => (
            <li key={s.label} data-state={k < i ? 'past' : k === i ? 'now' : 'next'}>
              <span className="ax-tick" aria-hidden="true" />
              <div>
                <strong>{s.label}</strong>
                {s.rule && <span>{s.rule}</span>}
              </div>
            </li>
          ))}
        </ol>
          {caption && <figcaption className="cs-caption ax-caption">{caption}</figcaption>}
        </div>
      </div>
    </figure>
  );
}
