import { useScenes } from '../agents/CasePreview.jsx';
import { MjTile } from '../mahsjong/parts.jsx';
import GuidedClock from '../weatherclock/Guided.jsx';
import { lineFor } from '../weatherclock/lines.js';
import '../case/case.css';
import './earlier.css';

/*
 * Home cards for the Cornell work, in the same language as the agent tiles
 * (plate, white cells, tone pills, one step at a time) so the page reads as
 * one system. Each traces its case page: what went in, what Walker made or
 * did, what came out. Wording is taken from the case pages.
 */

/* Weather Clock: the clock as its case page draws it, turned a quarter, with
   notes on hairlines. Live weather comes in; the window, the vane and the
   display answer in turn, then a touch. */
const CLOCK = [{ steps: 4 }];

export function WeatherClockCard() {
  const [ref, at] = useScenes(CLOCK);
  const s = at.step;
  return (
    <div className="mini ec ec-guide" ref={ref} aria-hidden="true">
      <GuidedClock
        yaw={36} weather={s >= 1 ? 'rainy' : undefined} frame={s} turns={s >= 2 ? 3 : 0}
        text={s >= 3 ? lineFor('rainy', s >= 4 ? 1 : 0) : ''} press={s >= 4 ? 1 : undefined}
        notes={[
          ...(s >= 1 ? [{ at: 'light', label: 'Rain pattern' }] : []),
          ...(s >= 2 ? [{ at: 'vane', label: 'The vane turns' }] : []),
          ...(s >= 3 ? [{ at: 'display', label: 'A new line', dy: 22 }] : []),
          ...(s >= 4 ? [{ at: 'button', label: 'Touch for a new line', side: 'right' }] : []),
        ]}
      />
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
