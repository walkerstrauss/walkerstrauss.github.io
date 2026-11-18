import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../../lib/motion.js';
import { Bottle } from './KioskScreen.jsx';

/*
 * AICap interface components at reading size, for placing inline in the case
 * study. Visuals follow the Onki prototype (src/assets/aicap/demo.mp4);
 * behaviour follows the MMVP UX framework spec.
 */

export const WINES = {
  villa: { name: 'Villa Erbice Monte Tombole Valpolicella, 2020', short: 'Villa Monte 2020', price: 20, tone: 'red', tags: ['Fruity', 'Balanced', 'Full-bodied'], region: 'Veneto, Italy', notes: 'Cherry, Plum, Violet', pairings: 'Cheese, Grilled meat' },
  soleil: { name: '2021 Lauriga Soleil Blanc de Lauriga', short: 'Soleil Blanc 2021', price: 19, tone: 'white', tags: ['Fresh', 'Toasty', 'Aromatic'], region: 'St. Emilion, Bordeaux, France', notes: 'Peach, Pear, Vanilla, Toast', pairings: 'White meat, Fish in sauce' },
  costa: { name: '2022 Costa Marina, Ottaviano Lambruschi', short: 'Costa Marina 2022', price: 18, tone: 'white', tags: ['Mineral', 'Saline', 'Fresh Herbal'], region: 'Colli di Luni, Liguria, Italy', notes: 'Citrus, Peach, Mineral', pairings: 'Seafood, Shrimp scampi, Light salads' },
  azul: { name: 'Vinya Del Mar Azul D.O. Catalunya Tinto Tempranillo 2021', short: 'Mar Azul 2021', price: 22, tone: 'red', tags: ['Fresh Red', 'Light Body', 'Everyday Easy'], region: 'Catalunya, Spain', notes: 'Cherry, Violet, Raspberry, Floral', pairings: 'Tapas, Pasta, Grilled meat, Roast chicken' },
};

const fade = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export function Avatar({ speaking = false, size }) {
  return (
    <span className="ax-avatar" style={size ? { fontSize: size } : undefined} aria-hidden="true">
      <span className="ax-eyes"><i /><i /></span>
      <span className={`ax-speaker ${speaking ? 'is-speaking' : ''}`}>
        <svg viewBox="0 0 16 16">
          <path d="M2 6h3l4-3v10l-4-3H2z" fill="currentColor" />
          <path className="ax-wave" d="M11 6.2a2.5 2.5 0 0 1 0 3.6" stroke="currentColor" strokeWidth="1.3" fill="none" />
          <path className="ax-wave ax-wave-2" d="M12.8 4.6a5 5 0 0 1 0 6.8" stroke="currentColor" strokeWidth="1.3" fill="none" />
        </svg>
      </span>
    </span>
  );
}

/* Assistant caption: one punctuation chunk at a time, at most three lines.
   `mark` wraps a phrase in the chunk to point at it. `cut` shows where speech
   stopped while the text finished its chunk. */
export function Caption({ text, speaking = false, mark, cut }) {
  let body = text;
  if (cut && text.startsWith(cut)) {
    body = <>{cut}<span className="ax-unspoken">{text.slice(cut.length)}</span></>;
  } else if (mark && text.includes(mark)) {
    const [a, b] = text.split(mark);
    body = <>{a}<mark>{mark}</mark>{b}</>;
  }
  return (
    <div className="ax-caption-card">
      <Avatar speaking={speaking} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.p key={text} {...fade}>
          {body}
          {cut && <span className="ax-cut">Voice stopped at the tap. Text finished the chunk, unspoken.</span>}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* Shopper input bar: placeholder, live words in black, gray once complete. */
export function InputBar({ state = 'idle', words = '', placeholder = 'Talk to me. Or pick a question below.' }) {
  return (
    <div className={`ax-input is-${state}`}>
      <span className="ax-input-text">
        {state === 'idle' || state === 'listening' ? (
          <span className="ax-placeholder">{placeholder}</span>
        ) : (
          words
        )}
        {state === 'speaking' && <span className="ax-cursor" aria-hidden="true" />}
      </span>
      <span className="ax-mic" aria-hidden="true" />
    </div>
  );
}

export function Chip({ children, removable, removing, dark }) {
  return (
    <motion.span
      layout
      className={`ax-chip ${dark ? 'is-dark' : ''} ${removing ? 'is-removing' : ''}`}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.25, ease: EASE } }}
      exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.2 } }}
    >
      {children}
      {removable && <span className="ax-chip-x" aria-hidden="true">×{removing && <i className="ax-tap" />}</span>}
    </motion.span>
  );
}

export function MatchButtons({ enabled, pressed }) {
  return (
    <div className="ax-ff">
      <span className={`ax-btn ax-btn-matches ${enabled ? 'is-on' : ''} ${pressed ? 'is-pressed' : ''}`}>Show me matches</span>
      <span className="ax-btn ax-btn-surprise">✦ Just surprise</span>
    </div>
  );
}

export function Presets({ items, tapped }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={items.join('|') || 'none'} className="ax-presets" {...fade}>
        {items.length === 0 ? (
          <span className="ax-presets-empty">Presets hidden while the assistant speaks</span>
        ) : (
          items.map((p, i) => (
            <span key={p} className={`ax-preset ${tapped === i ? 'is-tapped' : ''}`}>
              {p}
              {tapped === i && <i className="ax-tap" />}
            </span>
          ))
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export function DetailCard({ id }) {
  const w = WINES[id];
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={id} className="ax-detail" {...fade}>
        <Bottle tone={w.tone} className="ax-detail-bottle" />
        <div className="ax-detail-info">
          <h5>{w.name}</h5>
          <strong className="ax-price">$ {w.price}</strong>
          <div className="ax-tags">{w.tags.map((t) => <span key={t}>{t}</span>)}</div>
          <dl>
            <div><dt>Region</dt><dd>{w.region}</dd></div>
            <div><dt>Tasting notes</dt><dd>{w.notes}</dd></div>
            <div><dt>Optimal pairings</dt><dd>{w.pairings}</dd></div>
          </dl>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function MiniCard({ id, selected, tapped, faded }) {
  const w = WINES[id];
  return (
    <motion.div
      layout
      className={`ax-mini ${selected ? 'is-selected' : ''} ${faded ? 'is-history' : ''}`}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: faded ? 0.45 : 1, x: 0, transition: { duration: 0.35, ease: EASE } }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      <Bottle tone={w.tone} />
      <span>{w.short}</span>
      {tapped && <i className="ax-tap" />}
    </motion.div>
  );
}
