import { Children, isValidElement, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import Reveal from '../Reveal.jsx';
import { WORK } from '../home/work.jsx';
import { DURATION, EASE } from '../../lib/motion.js';
import './case.css';

/*
 * The case-study format shared by every agent case.
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
  const reduced = useReducedMotion();
  const body = useRef(null);
  const navRef = useRef(null);
  const [found, setFound] = useState([]);
  const sections = given || found;
  const [active, setActive] = useState(given?.[0]?.id);
  const [passed, setPassed] = useState(false);

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
     of the way down the screen; on phones, the line just under the section
     bar, so the bar names a section once its own heading has gone under it
     and never repeats the heading still on screen. Worked out from positions
     on scroll, so it cannot flip between two sections the way overlapping
     observers can. */
  useEffect(() => {
    const ids = sections.filter((s) => !s.group).map((s) => s.id);
    if (!ids.length) return undefined;
    let frame = 0;
    const measure = () => {
      frame = 0;
      /* Never above where a jump lands (96px), so the item just clicked is
         always the current one, whatever the window height. */
      /* Where the bar's bottom sits once it is stuck under the header, so the
         line does not move with the bar before it sticks. */
      const bar = document.querySelector('.case-bar');
      const head = document.querySelector('.site-header');
      const barBottom = bar && bar.offsetParent ? (head ? head.offsetHeight : 64) + bar.offsetHeight : 0;
      const line = barBottom ? barBottom + 24 : Math.max(window.innerHeight * 0.35, 160);
      let current = ids[0];
      let any = false;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) { current = id; any = true; }
      });
      /* A short last section can never reach the line; on wide screens the
         end of the page belongs to it. The phone bar waits for the heading to
         pass under it, since the heading is still on screen. */
      const doc = document.documentElement;
      if (!barBottom && window.innerHeight + window.scrollY >= doc.scrollHeight - 2) current = ids[ids.length - 1];
      setActive(current);
      setPassed(any);
      /* When the case ends, the side list fades as it leaves, instead of
         being cut off under the header. */
      const nav = navRef.current;
      if (nav && nav.offsetParent) {
        const over = 104 - nav.getBoundingClientRect().top;
        nav.style.opacity = over > 0 ? String(Math.max(0, 1 - over / 160).toFixed(3)) : '';
      }
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

  /* Phones: the side list is hidden below 1000px, so a bar under the
     header names the current section and fills as the page is read. Tapping
     it opens the full list. */
  const current = sections.find((s) => s.id === active);
  const groupLabel = current && groupOf[current.id] !== undefined ? sections[groupOf[current.id]].label : null;

  /* How far through the page the reader is: one value, drawn as a line
     under the header on wide screens and inside the section bar on phones. */
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  /* The next case is its own band across the page, after the reading
     column and its side list have ended. */
  const kids = Children.toArray(children);
  const isNext = (k) => isValidElement(k) && k.type === NextCase;
  const next = kids.filter(isNext);
  const reading = kids.filter((k) => !isNext(k));

  return (
    <>
    <motion.span className="case-progress" style={{ scaleX: fill }} aria-hidden="true" />
    <div className="case">
      <CaseBar
        sections={sections}
        active={active}
        /* Until the first heading has gone under the bar, the bar names the
           list it opens rather than a section still on screen. */
        label={current && passed ? (groupLabel ? `${groupLabel} · ${current.label}` : current.label) : 'Contents'}
        jump={jump}
        fill={fill}
      />
      <nav className="case-nav" ref={navRef} aria-label="On this page">
        <ol role="list">
          {sections.map((s, i) => (s.group ? (
            <li key={s.label} className="case-nav-group" data-open={groupOf[active] === i ? 'true' : undefined}>
              {s.label}
            </li>
          ) : (
            <li key={s.id} data-sub={s.sub ? 'true' : undefined}>
              {active === s.id && (
                /* The dot travels on a light spring, stretches a little
                   along its path and squashes as it lands on the section
                   being read. */
                <motion.span
                  layoutId="case-nav-dot"
                  className="case-nav-dot"
                  transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 520, damping: 24, mass: 0.6 }}
                >
                  <motion.i
                    key={s.id}
                    initial={false}
                    animate={reduced ? { scaleX: 1, scaleY: 1 } : { scaleY: [1, 1.7, 0.72, 1.12, 1], scaleX: [1, 0.74, 1.3, 0.94, 1] }}
                    transition={{ duration: 0.5, times: [0, 0.3, 0.58, 0.8, 1], ease: 'easeOut' }}
                  />
                </motion.span>
              )}
              <a href={`#${s.id}`} onClick={(e) => jump(e, s.id)} aria-current={active === s.id ? 'true' : undefined}>
                {s.label}
              </a>
            </li>
          )))}
        </ol>
      </nav>
      <div className="case-body" ref={body}>{reading}</div>
    </div>
    {next}
    </>
  );
}

function CaseBar({ sections, active, label, jump, fill }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="case-bar" data-open={open ? 'true' : undefined}>
      <button
        type="button"
        className="case-bar-button"
        aria-expanded={open}
        aria-controls="case-bar-list"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="case-bar-label">{label}</span>
        <span className="case-bar-chev" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <motion.span className="case-bar-fill" style={{ scaleX: fill }} aria-hidden="true" />
      {open && (
        <ol id="case-bar-list" className="case-bar-list" role="list">
          {sections.filter((s) => !s.group).map((s) => (
            <li key={s.id} data-sub={s.sub ? 'true' : undefined}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? 'true' : undefined}
                onClick={(e) => { setOpen(false); jump(e, s.id); }}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      )}
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

/* A figure on the page under one hairline. No box and no tint: the
   drawn object carries the weight. `kind` (Problem, Solution, Before…) is a
   quiet word in the tone's colour, so the role reads without a wash.
   tone: "problem" | "solution" | undefined. */
export function Plate({ tone, kind, label, children }) {
  return (
    <figure className="plate" data-tone={tone}>
      {(kind || label) && (
        <figcaption className="plate-label">
          {kind && <span className="plate-kind">{kind}</span>}
          {label}
        </figcaption>
      )}
      <div className="plate-card">{children}</div>
    </figure>
  );
}

/* A before and its after. Side by side when the column has room for
   both, so the two read as one comparison; stacked when it does not. Use it
   only when both figures are small; a large figure keeps the full width. */
export function PlatePair({ children }) {
  return <div className="plate-pair">{children}</div>;
}

/* The case's cover, the same on every page: one meta line (role ·
   organization · dates), the title in the serif, the claim, and results as
   accent numerals when there are numbers. It is type only, set from the
   page's left edge. `facts` is a quiet second line for anything else worth
   knowing (team, tools, data). */
export function CaseHero({ meta, title, subtitle, results, facts }) {
  /* The tab names the case, so a reader with several open can tell them apart. */
  useEffect(() => {
    if (typeof title !== 'string') return undefined;
    document.title = `${title} · Walker Strauss`;
    return () => { document.title = 'Walker Strauss'; };
  }, [title]);
  return (
    <header className="cs-hero ch cover">
      <p className="ch-meta">
        {meta.map((m, i) => <span key={i}>{m}</span>)}
      </p>
      <h1 className="cs-title">{title}</h1>
      <p className="cs-subtitle">{subtitle}</p>
      {results && (
        <dl className="ch-results" aria-label="Results">
          {results.map(([n, what, how]) => (
            <div key={n + how}>
              <dt><b>{n}</b><span>{what}</span></dt>
              <dd>{how}</dd>
            </div>
          ))}
        </dl>
      )}
      {facts && (
        <p className="ch-facts">
          {facts.map(([k, v]) => <span key={k}><em>{k}</em> {v}</span>)}
        </p>
      )}
    </header>
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

/* The end of every case: the next case's cover, in the home page's order,
   set as that page's own cover sets it, so following the link lands on the
   band just read. The last case leads back to the start of the list. */
export function NextCase({ from, children }) {
  const k = WORK.findIndex((w) => w.to === from);
  const next = WORK[(k + 1) % WORK.length];
  return (
    <nav className="next-case cover" aria-label="Next case">
      <Link to={next.to} className="next-case-link">
        <span className="wl-meta">Next case · {next.meta}</span>
        <span className="wl-title">{next.title}</span>
        <span className="wl-go">Read it <span aria-hidden="true">→</span></span>
      </Link>
      <div className="cs-links">
        {children}
        <Link to="/" className="back-link back-home"><span aria-hidden="true">←</span> All work</Link>
      </div>
    </nav>
  );
}
