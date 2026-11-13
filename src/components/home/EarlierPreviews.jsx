import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../../lib/motion.js';
import { useScenes } from '../aui/CasePreview.jsx';
import { MjTile } from '../mahsjong/parts.jsx';
import clockDrawing from '../../assets/weather-clock/clock.png';
import '../case/case.css';
import './earlier.css';

/*
 * Home cards for the Cornell work, in the same language as the AUI tiles
 * (plate, white cells, tone pills, one step at a time) so the page reads as
 * one system. Each traces its case page: what went in, what Walker made or
 * did, what came out. Wording is taken from the case pages.
 */

/* Weather Clock: live weather becomes light and a line of text on the clock.
   The drawing is the project's own; the window colour is laid over it. */
const WEATHER = [
  { steps: 3, weather: 'Rain', light: 'Soft blue ripple', text: 'A line about stillness', glow: '#7fb2cf' },
  { steps: 3, weather: 'Clear day', light: 'Warm amber glow', text: 'A line to notice it', glow: '#e9b04a' },
];

export function WeatherClockCard() {
  const [ref, at] = useScenes(WEATHER);
  const s = WEATHER[at.scene];
  return (
    <div className="mini ec" ref={ref} aria-hidden="true">
      <div className="ec-clock">
        <img src={clockDrawing} alt="" />
        <motion.i
          className="ec-window"
          animate={{ backgroundColor: at.step >= 2 ? s.glow : 'rgba(255,255,255,0)' }}
          transition={{ duration: 1.2, ease: EASE }}
        />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={at.scene} className="ec-trace" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <span className="ec-cell mini-step" data-on={at.step >= 1}><small>Live weather</small>{s.weather}</span>
          <span className="ec-cell mini-step" data-on={at.step >= 2}><small>Light</small>{s.light}</span>
          <span className="ec-cell mini-step" data-on={at.step >= 3}><small>On the display</small>{s.text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* fMRI study: the question, then the data path Walker scripted. */
const FMRI = [{ steps: 5 }];
const PATH = ['Scan session', 'DICOM to NIfTI', 'Organized as BIDS', 'Quality checks'];

export function FmriCard() {
  const [ref, at] = useScenes(FMRI);
  return (
    <div className="mini ec ec-col" ref={ref} aria-hidden="true">
      <span className="ec-question mini-step" data-on={at.step >= 1}>How does the hypothalamus respond to images of food?</span>
      <ol className="mini-route ec-route" role="list">
        {PATH.map((n, i) => <li key={n} data-on={at.step >= i + 2 ? 'true' : 'false'}>{n}</li>)}
      </ol>
      <span className="ec-by">Steps 2–4: scripts I wrote</span>
    </div>
  );
}

/* Mah's Jong: two hands filling, the race the team redesigned the game into. */
const RACE = [{ steps: 3 }];
const YOU = ['2b', '3b', '4b', '5d', '5d'];
const THEM = ['7c', '8c', '1d', '2d'];

export function MahsjongCard() {
  const [ref, at] = useScenes(RACE);
  return (
    <div className="mini ec ec-col" ref={ref} aria-hidden="true">
      <div className="ec-hand"><small>You</small><span>{YOU.map((t, i) => <MjTile key={i} t={t} />)}<MjTile t="5d" className="mini-step" data-on={at.step >= 1} lit={at.step === 1} /></span></div>
      <div className="ec-hand"><small>Opponent</small><span>{THEM.map((t, i) => <MjTile key={i} t={t} />)}<MjTile t="9c" className="mini-step" data-on={at.step >= 2} lit={at.step === 2} /></span></div>
      <span className="mini-end mini-step" data-tone="result" data-on={at.step >= 3}>A two-player race to complete a hand</span>
    </div>
  );
}
