import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../Reveal.jsx';
import { DURATION, EASE } from '../../lib/motion.js';
import './case.css';

/*
 * The case-study format shared by every AUI case.
 *
 * One reading column with the page's sections listed beside it. Each section
 * is a "beat": a small label, one statement as the headline, at most two
 * sentences, then one figure on a plate. Plates are colour-coded the same way
 * on every page: red for the problem, green for the solution, plain for
 * context. The figure carries the argument; the text only frames it.
 */

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/*
 * Every case study on the site sits in this layout. Pass `sections` (a stable
 * array defined outside the component) to name them, or leave it out and the
 * list is read from the page's own section headings.
 */
export function CaseLayout({ sections: given, children }) {
  const body = useRef(null);
  const [found, setFound] = useState([]);
  const sections = given || found;
  const [active, setActive] = useState(given?.[0]?.id);

  useEffect(() => {
    if (given || !body.current) return;
    const list = [...body.current.querySelectorAll('.cs-section > h2')].map((h) => {
      const section = h.parentElement;
      if (!section.id) section.id = slug(h.textContent);
      return { id: section.id, label: h.textContent };
    });
    setFound(list);
    setActive(list[0]?.id);
  }, [given]);

  /* The current section is the last one whose top has passed a line a third
     of the way down the screen. Worked out from positions on scroll, so it
     cannot flip between two sections the way overlapping observers can. */
  useEffect(() => {
    const ids = sections.filter((s) => !s.group).map((s) => s.id);
    if (!ids.length) return undefined;
    let frame = 0;
    const measure = () => {
      frame = 0;
      /* Never above where a jump lands (96px), so the item just clicked is
         always the current one, whatever the window height. */
      const line = Math.max(window.innerHeight * 0.35, 160);
      let current = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      });
      /* A short last section can never reach the line; the end of the page
         belongs to it. */
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) current = ids[ids.length - 1];
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections]);

  const jump = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* A group header ("Decisions") names the items under it. It is not a place
     on the page, so it is never the current item; it reads as current while
     one of its items is. */
  const groupOf = {};
  let open = null;
  sections.forEach((s, i) => {
    if (s.group) open = i;
    else if (s.sub && open !== null) groupOf[s.id] = open;
    else open = null;
  });

  return (
    <div className="case">
      <nav className="case-nav" aria-label="On this page">
        <ol role="list">
          {sections.map((s, i) => (s.group ? (
            <li key={s.label} className="case-nav-group" data-open={groupOf[active] === i ? 'true' : undefined}>
              {s.label}
            </li>
          ) : (
            <li key={s.id} data-sub={s.sub ? 'true' : undefined}>
              {active === s.id && (
                <motion.span
                  layoutId="case-nav-dot"
                  className="case-nav-dot"
                  transition={{ duration: DURATION.page, ease: EASE }}
                />
              )}
              <a href={`#${s.id}`} onClick={(e) => jump(e, s.id)} aria-current={active === s.id ? 'true' : undefined}>
                {s.label}
              </a>
            </li>
          )))}
        </ol>
      </nav>
      <div className="case-body" ref={body}>{children}</div>
    </div>
  );
}

/* A section: label, statement, then whatever frames or shows it. */
export function Beat({ id, eyebrow, title, children }) {
  return (
    <section className="beat" id={id}>
      <Reveal>
        <span className="section-label">{eyebrow}</span>
        <h2 className="beat-title">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

/* The muted first half of a decision headline: "Instead of X," */
export function Instead({ children }) {
  return <span className="beat-instead">{children} </span>;
}

/* A figure on a tinted plate. tone: "problem" | "solution" | undefined. */
export function Plate({ tone, kind, label, children }) {
  return (
    <div className="plate" data-tone={tone}>
      {label && (
        <p className="plate-label">
          {kind && <span>{kind}: </span>}
          {label}
        </p>
      )}
      <div className="plate-card">{children}</div>
    </div>
  );
}

/* Who, what for, under what limit: three short lines, no boxes. */
export function Trio({ items }) {
  return (
    <Reveal as="dl" className="trio" stagger>
      {items.map(([k, v]) => (
        <Reveal.Item key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </Reveal.Item>
      ))}
    </Reveal>
  );
}
