import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../../lib/motion.js';

/*
 * The AICap kiosk screen, rebuilt in markup from the Onki prototype
 * (src/assets/aicap/demo.mp4) rather than shown as a recording, so each
 * component can be pointed at and animated on its own.
 *
 * Copy, product data and component states are taken from the prototype:
 * the greeting, the blank-label bottle, "Show me matches" staying disabled
 * until a preference is captured, the mute badge on the assistant's line,
 * preset questions that change once recommendations are on screen, and the
 * two-bottle carousel.
 *
 * Everything is sized in em off a container-query font size, so the same
 * screen renders as a 340px walkthrough frame or a small home-page tile.
 *
 * `highlight` names the regions a design decision is about. They get a ring
 * and the matching step number; everything else recedes.
 */

const PRESETS = {
  start: [
    'I’d like to find a dry Rosé',
    'Show me some wines from Italy',
    'Suggest a bottle that pairs well with seafood',
    'I want a White wine for my friend',
    'Recommend a popular',
  ],
  recs: [
    'Recommend a sweeter option',
    'Show me more white wines like this one',
    'I want wines that pair with steak',
    'Show me vintages from 2020',
  ],
};

const fade = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
  exit: { opacity: 0, y: -3, transition: { duration: 0.2, ease: EASE } },
};

function Region({ id, highlight, badge, className = '', children, ...rest }) {
  const state = !highlight?.length ? 'none' : highlight.includes(id) ? 'on' : 'off';
  return (
    <div className={`k-region ${className}`} data-hl={state} {...rest}>
      {state === 'on' && badge != null && highlight[0] === id && (
        <motion.span
          className="k-badge"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {badge}
        </motion.span>
      )}
      {children}
    </div>
  );
}

function Avatar({ speaking, muted }) {
  return (
    <span className="k-avatar" aria-hidden="true">
      <span className="k-eyes"><i /><i /></span>
      {speaking !== undefined && (
        <span className={`k-mute ${muted ? 'is-muted' : ''} ${speaking ? 'is-speaking' : ''}`}>
          <svg viewBox="0 0 16 16">
            <path d="M2 6h3l4-3v10l-4-3H2z" fill="currentColor" />
            {muted ? (
              <path d="M11 6l4 4M15 6l-4 4" stroke="currentColor" strokeWidth="1.4" fill="none" />
            ) : (
              <>
                <path className="k-wave k-wave-1" d="M11 6.2a2.5 2.5 0 0 1 0 3.6" stroke="currentColor" strokeWidth="1.3" fill="none" />
                <path className="k-wave k-wave-2" d="M12.8 4.6a5 5 0 0 1 0 6.8" stroke="currentColor" strokeWidth="1.3" fill="none" />
              </>
            )}
          </svg>
        </span>
      )}
    </span>
  );
}

export function Bottle({ tone = 'red', className = '', children }) {
  const fill = tone === 'white' ? '#cfc58a' : tone === 'blank' ? '#141414' : '#2a1719';
  const cap = tone === 'white' ? '#9ea3a6' : '#141414';
  return (
    <div className={`k-bottle k-bottle-${tone} ${className}`}>
      <svg viewBox="0 0 60 200" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <path d="M23 6h14v44c0 9 17 20 17 38v104a5 5 0 0 1-5 5H11a5 5 0 0 1-5-5V88c0-18 17-29 17-38z" fill={fill} />
        <rect x="23" y="4" width="14" height="22" rx="2" fill={cap} />
        {tone !== 'blank' && <rect x="9" y="112" width="42" height="52" rx="1.5" fill="#efe9d8" />}
      </svg>
      {children}
    </div>
  );
}

function Promos() {
  return (
    <div className="k-promos" aria-hidden="true">
      <div className="k-promo-track">
        {[0, 1].map((n) => (
          <div className="k-promo-set" key={n}>
            <div className="k-promo k-promo-fr"><b>Best of<br />France</b><small>Series</small><Bottle tone="red" /></div>
            <div className="k-promo k-promo-eu"><b>Taste<br />Europe</b><small>3 bottles for $49</small></div>
            <div className="k-promo k-promo-new"><b>New<br />arrivals</b><Bottle tone="red" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Typed({ text }) {
  const words = text.split(' ');
  return (
    <motion.span
      key={text}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.12 } } }}
        >
          {w}{i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function KioskScreen({
  scene = 'idle',
  agent,
  input = '',
  listening = false,
  muted = false,
  chips = [],
  matchesEnabled = false,
  pressed,
  tapPreset,
  sensing = false,
  highlight = [],
  badge,
  className = '',
}) {
  const presets = scene === 'recs' ? PRESETS.recs : PRESETS.start;
  const r = { highlight, badge };

  return (
    <div className={`kiosk ${className}`} data-scene={scene}>
      <span className={`k-camera ${sensing ? 'is-sensing' : ''}`} aria-hidden="true" />
      <div className="k-screen">
        <Region id="transcript" {...r} className={`k-transcript ${scene === 'idle' ? 'is-idle' : ''}`}>
          <Avatar speaking={scene === 'idle' ? undefined : !muted} muted={muted} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={agent} {...fade}>{agent}</motion.p>
          </AnimatePresence>
        </Region>

        <AnimatePresence mode="wait" initial={false}>
          {scene === 'idle' && (
            <motion.div key="idle" className="k-body k-body-idle" {...fade}>
              <Region id="promos" {...r}><Promos /></Region>
              <Region id="start" {...r} className="k-start-wrap">
                <span className="k-start">
                  <svg viewBox="0 0 12 16" aria-hidden="true"><path d="M3 1h6l-.6 6a2.6 2.6 0 0 1-4.8 0z M6 9v5 M4 15h4" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
                  Let’s start
                </span>
              </Region>
            </motion.div>
          )}

          {scene === 'welcome' && (
            <motion.div key="welcome" className="k-body k-body-olive" {...fade}>
              <Region id="chips" {...r} className="k-hero-bottle">
                <Bottle tone="blank">
                  <div className="k-label">
                    {chips.length === 0 ? (
                      <span className="k-label-empty">Let’s find the best wine match for you!</span>
                    ) : (
                      <span className="k-label-chips">
                        <AnimatePresence initial={false}>
                          {chips.map((c, i) => (
                            <motion.span
                              key={c}
                              className="k-chip"
                              initial={{ opacity: 0, scale: 0.6 }}
                              animate={{ opacity: 1, scale: 1, transition: { delay: 0.25 + i * 0.45, duration: 0.3, ease: EASE } }}
                            >
                              {c}
                            </motion.span>
                          ))}
                        </AnimatePresence>
                      </span>
                    )}
                  </div>
                </Bottle>
              </Region>
              <Region id="fastforward" {...r} className="k-ff">
                <motion.span
                  className={`k-btn k-btn-matches ${matchesEnabled ? 'is-on' : ''}`}
                  animate={pressed === 'matches' ? { scale: [1, 0.94, 1] } : { scale: 1 }}
                  transition={pressed === 'matches' ? { duration: 0.5, delay: 0.9, repeat: Infinity, repeatDelay: 1.6 } : undefined}
                >
                  Show me matches
                </motion.span>
                <span className="k-btn k-btn-surprise">✦ Just surprise</span>
              </Region>
            </motion.div>
          )}

          {scene === 'recs' && (
            <motion.div key="recs" className="k-body k-body-recs" {...fade}>
              <div className="k-filter">
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.2" /><circle cx="6" cy="5" r="1.6" fill="#fff" stroke="currentColor" /><circle cx="10" cy="11" r="1.6" fill="#fff" stroke="currentColor" /></svg>
                {chips.join(', ')}
              </div>
              <div className="k-rec-stage">
                <Region id="card" {...r} className="k-card">
                  <Bottle tone="white" className="k-card-bottle" />
                  <div className="k-card-info">
                    <h5>2022 Costa Marina, Ottaviano Lambruschi</h5>
                    <div className="k-price">$ 18</div>
                    <div className="k-tags"><span>Mineral</span><span>Saline</span><span>Fresh Herbal</span></div>
                    <dl>
                      <div><dt>Region</dt><dd>Colli di Luni, Liguria, Italy</dd></div>
                      <div><dt>Varietal</dt><dd>Vermentino</dd></div>
                      <div><dt>ABV</dt><dd>13.5%</dd></div>
                    </dl>
                    <p className="k-sub">Tasting notes</p>
                    <p>Citrus, Peach, Mineral</p>
                    <Region id="pairing" {...r} className="k-pairing">
                      <p className="k-sub">Optimal pairings</p>
                      <p>Seafood, Shrimp Scampi, Light salads</p>
                    </Region>
                  </div>
                </Region>
                <Region id="carousel" {...r} className="k-carousel">
                  <div className="k-thumb is-active"><Bottle tone="white" /><span>2022 Costa Marina</span></div>
                  <div className="k-thumb"><Bottle tone="red" /><span>Vinya Del Mar Azul Tempranillo</span></div>
                </Region>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {scene !== 'idle' && (
          <div className="k-bottom">
            <Region id="input" {...r} className="k-input">
              <span className="k-input-text">
                {input ? <Typed text={input} /> : <span className="k-placeholder">Can you suggest a…</span>}
              </span>
              <span className={`k-orb ${listening ? 'is-listening' : ''}`} aria-hidden="true" />
            </Region>
            <Region id="presets" {...r} className="k-presets">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={scene === 'recs' ? 'recs' : 'start'} className="k-preset-row" {...fade}>
                  {presets.map((p, i) => (
                    <span key={p} className={`k-preset ${tapPreset === i ? 'is-tapped' : ''}`}>
                      {p}
                      {tapPreset === i && <i className="k-tap" aria-hidden="true" />}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </Region>
          </div>
        )}
      </div>
    </div>
  );
}
