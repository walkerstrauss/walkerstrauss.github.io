import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../../lib/motion.js';
import { useScenes } from '../aui/CasePreview.jsx';
import { MjTile } from '../mahsjong/parts.jsx';
import { ClockDrawing } from '../weatherclock/RealFigures.jsx';
import '../case/case.css';
import './earlier.css';

/*
 * Home cards for the Cornell work, in the same language as the AUI tiles
 * (plate, white cells, tone pills, one step at a time) so the page reads as
 * one system. Each traces its case page: what went in, what Walker made or
 * did, what came out. Wording is taken from the case pages.
 */

/* Weather Clock: live weather becomes light and a line of text on the clock.
   The clock follows the project's exterior diagram; the light patterns are the
   project's own. */
const WEATHER = [
  { steps: 4, weather: 'rainy', label: 'Rain', light: 'Rain pattern', text: 'A short poetic line' },
  { steps: 4, weather: 'sunny', label: 'Sun', light: 'Sun pattern', text: 'A short poetic line' },
  { steps: 4, weather: 'snowy', label: 'Snow', light: 'Snow pattern', text: 'A short poetic line' },
];

export function WeatherClockCard() {
  const [ref, at] = useScenes(WEATHER);
  const s = WEATHER[at.scene];
  return (
    <div className="mini ec" ref={ref} aria-hidden="true">
      <ClockDrawing className="ec-clock" weather={at.step >= 2 ? s.weather : undefined} frame={at.step} turns={at.scene * 3 + (at.step >= 3 ? 3 : 0)} text={at.step >= 4 ? 'a short poetic line' : ''} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={at.scene} className="ec-trace" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <span className="ec-cell mini-step" data-on={at.step >= 1}><small>Live weather</small>{s.label}</span>
          <span className="ec-cell mini-step" data-on={at.step >= 2}><small>Light</small>{s.light}</span>
          <span className="ec-cell mini-step" data-on={at.step >= 3}><small>Motion</small>The vane turns</span>
          <span className="ec-cell mini-step" data-on={at.step >= 4}><small>Display</small>{s.text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* fMRI study: the question as a plain research heading, then the data path
   Walker scripted, shown as files. Nothing chat-like. */
const FMRI = [{ steps: 4 }];
const PATH = [
  ['Scanner', 'sub-01.dcm', false],
  ['Converted', 'sub-01_bold.nii', true],
  ['Organized', 'BIDS/sub-01/func/', true],
  ['Checked', 'alignment · completeness', true],
];

export function FmriCard() {
  const [ref, at] = useScenes(FMRI);
  return (
    <div className="mini ec ec-col ec-fmri" ref={ref} aria-hidden="true">
      <span className="ec-rq"><small>Research question</small>How does the hypothalamus respond to images of food?</span>
      <ol className="ec-files" role="list">
        {PATH.map(([k, v, mine], i) => (
          <li key={k} data-on={at.step >= i + 1 ? 'true' : 'false'} data-mine={mine}>
            <small>{k}</small><code>{v}</code>
          </li>
        ))}
      </ol>
      <span className="ec-by"><i /> My scripts</span>
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
