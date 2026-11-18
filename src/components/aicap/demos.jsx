import { AnimatePresence, motion } from 'framer-motion';
import Scrub from './Scrub.jsx';
import { Bottle } from './KioskScreen.jsx';
import Pin from './Pin.jsx';
import { Caption, Chip, DetailCard, InputBar, MatchButtons, MiniCard, Presets } from './parts.jsx';

/*
 * Five scroll-scrubbed demos, one per voice + touch decision. Step rules quote
 * or paraphrase the MMVP UX framework spec (AICap_Product_Spec.pdf) and the
 * full front-end spec; assistant lines come from the prototype recording.
 */

const PRESETS_START = ['I’d like to find a dry Rosé', 'Show me some wines from Italy', 'Suggest a bottle that pairs well with seafood', 'I want a White wine for my friend'];
const PRESETS_RECS = ['Recommend a sweeter option', 'Show me more white wines like this one', 'I want wines that pair with steak', 'Show me vintages from 2020'];

/* ---- 1. Starting a session ---------------------------------------------- */

const startSteps = [
  { label: 'Why the kiosk starts', rule: 'People feel awkward saying a wake phrase to a device in public. 3 of 19 shoppers named feeling awkward using voice in a store as a top concern.' },
  { label: 'Browsing · 3 m or more away', rule: 'The ad carousel plays, the microphone stays off, and nothing is asked of the shopper.' },
  { label: 'Showing interest · 1–2 m away', rule: 'The screen offers a hello or a tap, and neither is needed to begin.' },
  { label: 'First contact · within 1 m', rule: 'Onki speaks first. The greeting appears within 150–300 ms of the shopper coming close.' },
  { label: 'Or a tap on “Let’s start”', rule: 'The start button opens the same session by touch.' },
];

export function StartDemo({ title, intro }) {
  return (
    <Scrub title={title} intro={intro} steps={startSteps}>
      {(step) => {
        if (step === 0) {
          return (
            <div className="ax-start">
              <div className="ax-ruler" aria-hidden="true">
                <span className="ax-ruler-kiosk" />
                {[['≤1 m', 0, 28], ['1–2 m', 28, 62], ['≥3 m', 62, 100]].map(([l, a, b], k) => (
                  <span key={l} className={`ax-zone ${k === 0 ? 'is-on' : ''}`} style={{ left: `${a}%`, width: `${b - a}%` }}>{l}</span>
                ))}
                <motion.span className="ax-shopper" animate={{ left: '24%' }} transition={{ duration: 0.6, ease: [0.2, 0, 0.2, 1] }} />
              </div>
              <Pin note="At arm’s length, waiting for a phrase" tone="block">
                <div className="ax-panel ax-start-screen">
                  <div className="ax-approach">
                    <span className="ax-mic" />
                    <p>Say “Hi Onki” to begin.</p>
                  </div>
                </div>
              </Pin>
            </div>
          );
        }
        const i = step - 1;
        const pos = [86, 56, 24, 24][i];
        return (
          <div className="ax-start">
            <div className="ax-ruler" aria-hidden="true">
              <span className="ax-ruler-kiosk" />
              {[['≤1 m', 0, 28], ['1–2 m', 28, 62], ['≥3 m', 62, 100]].map(([l, a, b], k) => (
                <span key={l} className={`ax-zone ${2 - k === i || (i === 3 && k === 0) ? 'is-on' : ''}`} style={{ left: `${a}%`, width: `${b - a}%` }}>{l}</span>
              ))}
              <motion.span className="ax-shopper" animate={{ left: `${pos}%` }} transition={{ duration: 0.6, ease: [0.2, 0, 0.2, 1] }} />
            </div>
            <Pin note={['Mic off: nothing asked', 'A hello or a tap, neither needed', 'Onki speaks first', 'Same session, by touch'][i]} tone={i >= 2 ? 'result' : undefined}>
            <div className="ax-panel ax-start-screen">
              <AnimatePresence mode="wait" initial={false}>
                {i === 0 && (
                  <motion.div key="a" className="ax-attract" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="ax-ads"><span className="ax-ad ax-ad-fr">Best of France</span><span className="ax-ad ax-ad-eu">Taste Europe</span><span className="ax-ad ax-ad-new">New arrivals</span></div>
                    <span className="ax-mic-off">Mic off</span>
                  </motion.div>
                )}
                {i === 1 && (
                  <motion.div key="b" className="ax-approach" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <span className="ax-mic is-pulse" />
                    <p>Say “Hi Onki” or tap.<br />Or just walk up.</p>
                  </motion.div>
                )}
                {i >= 2 && (
                  <motion.div key="c" className="ax-greet" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <Caption text="Hi! I’m Onki AICap! I’m here to help you with your wine selection!" speaking />
                    <span className={`ax-start-btn ${i === 3 ? 'is-pressed' : ''}`}>Let’s start{i === 3 && <i className="ax-tap" />}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </Pin>
          </div>
        );
      }}
    </Scrub>
  );
}

/* ---- 2. From speech to preferences -------------------------------------- */

const SPOKEN = 'I’m looking for a red or white French wine as a gift';
const prefSteps = [
  { label: 'Why every path works alone', rule: 'People ask less of a voice system when others are watching or waiting. 1 of 20 shoppers wanted voice alone; 8 preferred presets and buttons.' },
  { label: 'Listening', rule: 'The mic bubble turns active within 1 s of speech.' },
  { label: 'Words appear as they’re spoken', rule: 'Live transcription in black, within about 100 ms.' },
  { label: 'The turn ends', rule: 'After 1 s of silence the words turn gray, so the shopper knows they’ve been heard.' },
  { label: 'Preferences become chips', rule: 'Added in the order they were detected, about 100 ms apart. “Show me matches” turns on once one exists.' },
  { label: 'Tap × to drop one', rule: 'Removing a chip sends the change to the assistant as a sentence, and the matches update.' },
];

export function PreferencesDemo({ title, intro }) {
  return (
    <Scrub title={title} intro={intro} steps={prefSteps}>
      {(step) => {
        if (step === 0) {
          return (
            <div className="ax-panel ax-prefs">
              <div className="ax-prefs-bottle">
                <Bottle tone="blank"><div className="ax-label"><span className="ax-label-empty">Let’s find the best wine match for you!</span></div></Bottle>
              </div>
              <Pin note="Speak, or nothing happens" tone="block">
                <InputBar state="listening" placeholder="Listening…" />
              </Pin>
            </div>
          );
        }
        const i = step - 1;
        const words = i === 1 ? SPOKEN.split(' ').slice(0, 7).join(' ') : SPOKEN;
        const chips = i < 3 ? [] : ['Red', 'White', 'France', 'Gift'];
        return (
          <div className="ax-panel ax-prefs">
            <Pin note={i === 3 ? 'Chips in the order heard' : i === 4 ? 'Removal sent as a sentence' : null} tone="result">
            <div className="ax-prefs-bottle">
              <Bottle tone="blank">
                <div className="ax-label">
                  {chips.length === 0 ? (
                    <span className="ax-label-empty">Let’s find the best wine match for you!</span>
                  ) : (
                    <div className="ax-label-chips">
                      <AnimatePresence>
                        {chips.map((c) => <Chip key={c} dark removable removing={i === 4 && c === 'White'}>{c}</Chip>)}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </Bottle>
            </div>
            </Pin>
            <Pin note={i === 3 ? 'On once a preference exists' : null} tone="result" className="ax-pin-left ax-pin-above">
              <MatchButtons enabled={chips.length > 0} pressed={false} />
            </Pin>
            <Pin note={['Listening within 1 s', 'Words as spoken', 'Gray: heard', null, null][i]}>
              <InputBar
                state={['listening', 'speaking', 'done', 'done', 'done'][i]}
                words={i === 4 ? 'Remove White' : words}
              />
            </Pin>
          </div>
        );
      }}
    </Scrub>
  );
}

/* ---- 3. Voice leads, the screen follows --------------------------------- */

const VILLA = 'Villa Monte 2020 ($20, Italy) is a smooth red with soft fruit—good for groups—in the Italy section.';
const SOLEIL = 'Or Soleil Blanc 2021 ($19, France) with light, floral notes—in the France section.';
const syncSteps = [
  { label: 'Why the card follows the voice', rule: 'Explaining a pick raises trust, and spoken explanations are hard to hold in mind. 10 of 19 shoppers worried the picks would not be personal.' },
  { label: 'The voice names a wine', rule: 'The card switches at the start of the chunk that names it. Captions update at punctuation, never mid-phrase.' },
  { label: 'First mention says where it is', rule: 'Price, origin, taste, and the aisle, in one or two sentences.' },
  { label: 'The next wine takes over', rule: 'The carousel crossfades to the second card as its name is spoken.' },
  { label: 'Then one question', rule: 'One question per reply, asked after the picks, so the next turn can narrow them.' },
];

export function VoiceSyncDemo({ title, intro }) {
  return (
    <Scrub title={title} intro={intro} steps={syncSteps}>
      {(step) => {
        if (step === 0) {
          return (
            <div className="ax-panel ax-sync">
              <Caption text={SOLEIL} speaking />
              <Pin note="The card shows a different wine" tone="block">
                <DetailCard id="villa" />
              </Pin>
              <div className="ax-carousel">
                <MiniCard id="villa" selected />
                <MiniCard id="soleil" />
              </div>
            </div>
          );
        }
        const i = step - 1;
        const text = [VILLA, VILLA, SOLEIL, 'What dish do you plan to serve?'][i];
        const sel = i < 2 ? 'villa' : 'soleil';
        return (
          <div className="ax-panel ax-sync">
            <Pin note={i === 1 ? 'Says where it is' : i === 3 ? 'One question, after the picks' : null}>
              <Caption text={text} speaking={i < 3} mark={i === 1 ? 'in the Italy section' : undefined} />
            </Pin>
            <Pin note={i === 0 ? 'Switches as the name is spoken' : null} tone="result">
              <DetailCard id={sel} />
            </Pin>
            <Pin note={i === 2 ? 'Next wine named, next card' : null} tone="result">
              <div className="ax-carousel">
                <MiniCard id="villa" selected={sel === 'villa'} />
                <MiniCard id="soleil" selected={sel === 'soleil'} />
              </div>
            </Pin>
          </div>
        );
      }}
    </Scrub>
  );
}

/* ---- 4. Taps interrupt --------------------------------------------------- */

const COSTA_HALF = 'I would suggest Costa Marina 2022 ($18, Italy), bright and citrus-led';
const COSTA_FULL = 'I would suggest Costa Marina 2022 ($18, Italy), bright and citrus-led—excellent with seafood—in the Italy section.';
const tapSteps = [
  { label: 'Why a tap interrupts', rule: 'A sales assistant that can’t be interrupted stops feeling like a conversation with a person.' },
  { label: 'Mid-pitch', rule: 'The assistant is speaking about the first recommendation.' },
  { label: 'The shopper taps Mar Azul', rule: 'A tap is handled as input, the same way speech is, so it interrupts.' },
  { label: 'The voice stops', rule: 'Audio fades within 150 ms. The caption finishes its current chunk, then stops. Card switches still queued are cancelled.' },
  { label: 'The tap gets an answer', rule: 'Tapping a card that isn’t selected gets one spoken sentence about that wine, with no pop-up.' },
];

export function InterruptDemo({ title, intro }) {
  return (
    <Scrub title={title} intro={intro} steps={tapSteps}>
      {(step) => {
        if (step === 0) {
          return (
            <div className="ax-panel ax-sync">
              <Pin note="The tap waits until the pitch ends" tone="block">
                <Caption text={COSTA_FULL} speaking />
              </Pin>
              <DetailCard id="costa" />
              <div className="ax-carousel">
                <MiniCard id="costa" selected />
                <MiniCard id="azul" tapped />
              </div>
            </div>
          );
        }
        const i = step - 1;
        const sel = i < 3 ? 'costa' : 'azul';
        const text = i < 2 ? COSTA_HALF : i === 2 ? COSTA_FULL : 'Mar Azul 2021 ($22, Spain) has saline freshness for grilled fish—in the Spain section.';
        return (
          <div className="ax-panel ax-sync">
            <Pin note={i === 2 ? 'Voice fades within 150 ms' : null} tone="result">
              <Caption text={text} speaking={i < 2 || i === 3} cut={i === 2 ? COSTA_HALF : undefined} />
            </Pin>
            <Pin note={i === 3 ? 'One spoken sentence, no pop-up' : null} tone="result">
              <DetailCard id={sel} />
            </Pin>
            <Pin note={i === 1 ? 'A tap is input, like speech' : null}>
              <div className="ax-carousel">
                <MiniCard id="costa" selected={sel === 'costa'} />
                <MiniCard id="azul" selected={sel === 'azul'} tapped={i === 1 || i === 2} />
              </div>
            </Pin>
          </div>
        );
      }}
    </Scrub>
  );
}

/* ---- 5. Recommend first, then refine ------------------------------------ */

const refineSteps = [
  { label: 'Why it recommends early', rule: 'People new to wine don’t know which questions to ask and want the assistant to lead; people who know wine want it fast.' },
  { label: 'Two picks straight away', rule: 'Picks come before the first question.' },
  { label: 'The shopper answers the question', rule: 'The answer becomes a preference chip.' },
  { label: 'New picks arrive on the right', rule: 'New recommendations sit right of a divider; earlier ones stay as history. A wine recommended again moves instead of appearing twice.' },
  { label: 'Presets follow the conversation', rule: 'Hidden while the voice speaks. A new set of up to six, each under ten words, appears about 200 ms after it ends.' },
];

export function RefineDemo({ title, intro }) {
  return (
    <Scrub title={title} intro={intro} steps={refineSteps}>
      {(step) => {
        if (step === 0) {
          return (
            <div className="ax-panel ax-refine">
              <Pin note="Four questions, no wine yet" tone="block">
                <Caption text="What’s the occasion? What’s your budget? Red or white? What will you be eating?" speaking />
              </Pin>
              <InputBar state="listening" />
              <Presets items={PRESETS_START} />
            </div>
          );
        }
        const i = step - 1;
        const chips = i === 0 ? ['Dinner'] : ['Dinner', 'Seafood'];
        const caption = ['Here are two wines that are perfect for a group dinner! What are you planning to cook?', 'Here are two wines that are perfect for a group dinner! What are you planning to cook?', 'Okay, seafood sounds like a good choice!', 'These two options pair well with seafood. Let me know if you’d like to learn more about either option.'][i];
        return (
          <div className="ax-panel ax-refine">
            <Caption text={caption} speaking={i === 2} />
            <Pin note={i === 1 ? 'The answer becomes a chip' : null} tone="result">
              <div className="ax-filter">
                <AnimatePresence initial={false}>{chips.map((c) => <Chip key={c}>{c}</Chip>)}</AnimatePresence>
              </div>
            </Pin>
            <Pin note={i === 0 ? 'Two picks, before more questions' : i === 2 ? 'New picks right of the divider' : null} tone={i === 2 ? 'result' : undefined}>
            <motion.div layout className="ax-carousel ax-carousel-history">
              <AnimatePresence initial={false}>
                <MiniCard key="villa" id="villa" faded={i >= 2} selected={i < 2} />
                <MiniCard key="soleil" id="soleil" faded={i >= 2} />
                {i >= 2 && <motion.span key="div" layout className="ax-divider" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>New</motion.span>}
                {i >= 2 && <MiniCard key="costa" id="costa" selected />}
                {i >= 2 && <MiniCard key="azul" id="azul" />}
              </AnimatePresence>
            </motion.div>
            </Pin>
            <InputBar state={i === 0 ? 'listening' : 'done'} words="We are cooking seafood" />
            <Pin note={i === 3 ? 'New presets once the voice ends' : null} tone="result" className="ax-pin-below">
              <Presets items={i === 2 ? [] : i === 3 ? PRESETS_RECS : PRESETS_START} />
            </Pin>
          </div>
        );
      }}
    </Scrub>
  );
}

/* ---- From research to the screen ------------------------------------------
   Each finding is shown as the part of the kiosk it became. The kiosk is
   the same one the decisions below use; the chip names what changed. */

const FOUND = [
  { label: '1 of 20 wanted voice alone', rule: 'Touch had to work for the whole flow, with voice alongside it.' },
  { label: '13 of 20 would use it to explore at their own pace', rule: 'Recommend early, and let a shopper skip ahead at any point.' },
  { label: '10 of 19 feared the picks would not be personal', rule: 'Each pick says how it matches what was asked, and where it is on the shelf.' },
  { label: 'A wine app’s short overview that expands into detail', rule: 'The card: essentials up front, the rest a glance away.' },
  { label: 'Talking to a machine with others around is uncomfortable', rule: 'Onki speaks first when someone comes close. A tap starts the same session.' },
];

export function ResearchToScreen() {
  return (
    <Scrub steps={FOUND} perStep={42}>
      {(i) => {
        if (i <= 1) {
          return (
            <div className="ax-panel ax-prefs">
              <div className="ax-prefs-bottle">
                <Bottle tone="blank"><div className="ax-label"><div className="ax-label-chips">{['Red', 'France', 'Gift'].map((c) => <Chip key={c} dark removable>{c}</Chip>)}</div></div></Bottle>
              </div>
              <Pin note={i === 1 ? 'Skip ahead at any point' : null} tone="result">
                <MatchButtons enabled pressed={false} />
              </Pin>
              <Pin note={i === 0 ? 'Every step works by voice, text or tap' : null} tone="result">
                <InputBar state="done" words="A French red, as a gift" />
              </Pin>
            </div>
          );
        }
        if (i <= 3) {
          return (
            <div className="ax-panel ax-sync">
              <Pin note={i === 2 ? 'Why it fits, and where it is' : null} tone="result">
                <Caption text={VILLA} mark="in the Italy section" />
              </Pin>
              <Pin note={i === 3 ? 'Essentials first' : null} tone="result">
                <DetailCard id="villa" />
              </Pin>
              <div className="ax-carousel">
                <MiniCard id="villa" selected />
                <MiniCard id="soleil" />
              </div>
            </div>
          );
        }
        return (
          <div className="ax-start">
            <Pin note="Onki speaks first" tone="result">
              <div className="ax-panel ax-start-screen">
                <div className="ax-greet">
                  <Caption text="Hi! I’m Onki AICap! I’m here to help you with your wine selection!" speaking />
                  <span className="ax-start-btn">Let’s start</span>
                </div>
              </div>
            </Pin>
          </div>
        );
      }}
    </Scrub>
  );
}
