import { Link } from 'react-router-dom';
import { Beat, CaseHero, CaseLayout, Plate, Trio, NextCase } from '../components/case/Case.jsx';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import { ProblemFigure, ProcessTimeline } from '../components/weatherclock/RealFigures.jsx';
import { AtWork, Checks, Findings, Path, Patterns, PromptToLine, TwoHalves, Vane } from '../components/weatherclock/Figures.jsx';

/*
 * The Savoring Weather Clock in the layout of the other case pages: problem,
 * solution, research, then each decision with one
 * figure on a plate, then the system and the process.
 *
 * The clock is shown at work once, under Solution, stepped by the scroll.
 * Each later figure shows the one thing its decision is about. Behaviour is
 * taken from the sketch's code; research and options from Walker's Dec 6,
 * Dec 20 and Feb 10 documents.
 */
const SECTIONS = [
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'research', label: 'Research' },
  { label: 'Decisions', group: true },
  { id: 'when', label: 'Moves only on a change', sub: true },
  { id: 'words', label: 'Technique never named', sub: true },
  { id: 'act', label: 'Appreciate, then act', sub: true },
  { id: 'motion', label: 'A motor for the vane', sub: true },
  { id: 'light', label: 'Light plays the weather', sub: true },
  { id: 'system', label: 'System' },
  { id: 'process', label: 'Process and roles' },
  { id: 'outcome', label: 'Outcome' },
];

const ROLES = [
  ['Me', 'Interaction design and product design. I also wrote the system code.'],
  ['Gaeul Han', 'Modeled and built the housing.'],
  ['Xinyi Zhou', 'Built the electronics: motor, touch sensor and lighting.'],
];

const FINDINGS = [
  {
    title: 'Savoring is a set of techniques, and each one can be prompted',
    text: 'For an earlier device concept of Gaeul’s, I went through each behavior and named the technique it supports. A prompt to notice soft drizzle is sensory-perceptual sharpening. A wave that makes you stop and appreciate calm weather is counting blessings.',
    rule: 'Every line carries one of ten savoring techniques.',
  },
  {
    title: 'Gratitude has a larger effect in the moment',
    text: 'Gratitude experienced in real time has a larger effect on how people treat others than gratitude in general. So the device should prompt a person to appreciate what is happening before it suggests they do anything.',
    rule: 'The clock speaks when the weather turns, and each line appreciates before it suggests an act.',
  },
  {
    title: 'Ambient, playful cues invite people to interact',
    text: 'I studied Yo-Yo Machines, the Interaction Research Studio’s low-cost playful communication devices. They are built from small modules with simple hardware, and their ambient cues and playful feedback are what draw people in.',
    rule: 'A window of light and a vane that moves.',
  },
];

const STEPS = [
  ['Six fields, seven kinds of weather', 'The board asks the Google Maps Weather API for current conditions and keeps six fields. The condition type, one of 44, becomes one of seven categories.'],
  ['A turn that never blocks the loop', 'The motor is timed against the board’s own counter, so a touch still registers while the vane turns.'],
  ['A reply is checked before it is shown', 'The reply is read key by key. If anything is missing, the display says so and the reason goes to the serial log.'],
];


export default function WeatherClock() {
  return (
    <Page className="cs-page">
      <CaseHero
        meta={['Interaction design, conversation design, system code', 'Meta Design Lab, Cornell, under Professor Jay Yoon', 'Nov 2024 – Feb 2025']}
        title="Savoring Weather Clock"
        subtitle="An interactive, AI-powered home appliance that turns live weather into a prompt to notice it."
        facts={[['Built with', 'Arduino UNO R4 WiFi, Google Maps Weather API, OpenAI API']]}
      />

      <CaseLayout sections={SECTIONS}>
        <Beat id="problem" eyebrow="Problem" title="People check the weather on a phone and move on.">
          <p>
            The lab was exploring technology that helps people slow down. The
            question for this project was how an everyday object could make
            the weather something a person notices.
          </p>
          <Plate><ProblemFigure /></Plate>
        </Beat>

        <Beat id="solution" eyebrow="Solution" title="A clock for the home that shows the weather with light, a turning vane and a line of text.">
          <p>
            The clock sits on a wall or a shelf at home and reads the live
            weather. When the weather changes, its window plays a pattern for
            it, the vane turns, and a language model writes a line from the
            live weather for the display. A touch asks for a new line.
          </p>
          <AtWork />
        </Beat>

        <Beat id="research" eyebrow="Research" title="The design draws on savoring: the techniques people use to notice a good moment and make it last.">
          <p>Three things I read shaped what the clock does.</p>
          <Findings items={FINDINGS} />
        </Beat>

        <Beat id="when" eyebrow="Decision 1 · Interaction design" title="The clock moves only when the weather changes.">
          <p>
            I listed three ways the clock could decide when to speak: when a
            part of the device moves, on a timer, or when the person asks. The
            clock writes a new line on every check and on a touch, and keeps
            light and motion for the moment the weather itself changes.
          </p>
          <Plate label="Six moments on the clock: what each one sets off"><Checks /></Plate>
        </Beat>

        <Beat id="words" eyebrow="Decision 2 · Conversation design" title="Each line carries a savoring technique without naming it.">
          <p>
            The words are written by a language model, so the design is in the
            prompt. I tested it until its lines carried the technique
            without naming or teaching it.
          </p>
          <Plate label="What the prompt is given, and the line that comes back"><PromptToLine /></Plate>
        </Beat>

        <Beat id="act" eyebrow="Decision 3 · Conversation design" title="Each line appreciates the weather first, then suggests one small act.">
          <p>
            Gratitude has a larger effect in the moment, so each line opens
            with appreciation. The act that follows comes from one of four
            kinds of sustainable behavior in the prompt (ecological, frugal,
            altruistic or equitable), and the model is told not to mention
            sustainability.
          </p>
          <Plate label="Three lines, each in two halves"><TwoHalves /></Plate>
        </Beat>

        <Beat id="motion" eyebrow="Decision 4 · Interaction design" title="A motor turns the vane when the weather changes.">
          <p>
            The vane is the clock’s playful piece: when a motor turns it, the
            movement is enough to get a person’s attention without forcing
            them to engage.
          </p>
          <Plate label="The vane, and the motor that turns it"><Vane /></Plate>
        </Beat>

        <Beat id="light" eyebrow="Decision 5 · Interaction design" title="The light plays the weather.">
          <p>
            I considered three triggers for the light: an idle animation, a
            signal while a line is being written, or a response when someone
            comes near or touches the clock. The built clock ties the light to
            the weather.
          </p>
          <Patterns />
        </Beat>

        <Beat id="system" eyebrow="System" title="One loop keeps the light, the motor, the display and the touch in step.">
          <p>
            I wrote the code as separate modules with one loop over them. We
            first planned an ESP32 with indoor air sensors; the clock as built
            is an Arduino UNO R4 WiFi working from live weather alone.
          </p>
          <Plate label="From a weather reading to the display"><Path /></Plate>
          <Trio items={STEPS} />
        </Beat>

        <Beat id="process" eyebrow="Process and roles" title="November to February, from first ideas to the clock.">
          <p>
            Each week Gaeul and I sketched concepts and wrote short
            descriptions of possible interactions, then refined them with
            Professor Yoon. Once the direction was set, Xinyi Zhou joined to
            prototype the motor behavior and lighting.
          </p>
          <Plate><ProcessTimeline /></Plate>
          <Trio items={ROLES} />
        </Beat>

        <Beat id="outcome" eyebrow="Outcome" title="Built, shown, and now being piloted in people’s homes.">
          <p>
            The pilot is still running, and a paper is in preparation
            (Han, Strauss, Zhou &amp; Yoon).
          </p>
        </Beat>

        <NextCase from="/projects/weather-clock"><a href="https://github.com/walkerstrauss/weather-clock-savoring" target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub →</a></NextCase>
      </CaseLayout>
    </Page>
  );
}
