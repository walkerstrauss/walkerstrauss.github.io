import { Link } from 'react-router-dom';
import { Beat, CaseLayout, Instead, Plate, Trio } from '../components/case/Case.jsx';
import Basis from '../components/case/Basis.jsx';
import Page from '../components/Page.jsx';
import { CheckVsNotice, ConceptMap, InsideParts, InteractionChoice, ProcessTimeline, RearParts, WeatherToClock, WhenItSpeaks } from '../components/weatherclock/RealFigures.jsx';

/*
 * The Savoring Weather Clock as a case (S349): problem, the decisions, the
 * system, who did what. Figures are redrawn from the project's own diagrams
 * in the site's line style. Facts are from the earlier page.
 */
const SECTIONS = [
  { id: 'problem', label: 'Problem' },
  { label: 'Decisions', group: true },
  { id: 'savoring', label: 'Savoring, not alerts', sub: true },
  { id: 'pace', label: 'Slow on purpose', sub: true },
  { id: 'motion', label: 'A motor, not a ball', sub: true },
  { id: 'system', label: 'System' },
  { id: 'process', label: 'Process and roles' },
];

const ROLES = [
  ['Me', 'Interaction design and product design. I also wrote the system code.'],
  ['Gaeul Han', 'Modeled and built the housing.'],
  ['Xinyi Zhou', 'Built the electronics: motor, touch sensor and lighting.'],
];

export default function WeatherClock() {
  return (
    <Page className="cs-page">
      <header className="cs-hero">
        <h1 className="cs-title">Savoring Weather Clock</h1>
        <p className="cs-subtitle">A home device that turns live weather into a prompt to notice it.</p>
        <div className="cs-meta">
          <div><h4>Lab</h4><p>Meta Design Lab, Cornell, under Professor Jay Yoon</p></div>
          <div><h4>My role</h4><p>Interaction and product design, system code</p></div>
          <div><h4>Built with</h4><p>Arduino UNO R4 WiFi</p></div>
        </div>
      </header>

      <CaseLayout sections={SECTIONS}>
        <Beat id="problem" eyebrow="Problem" title="Weather is information people check, not something they notice.">
          <p>
            The lab was exploring technology that helps people slow down. The
            question for this project was how an everyday object could make
            the weather something a person notices.
          </p>
          <Plate label="The same rain, two ways">
            <CheckVsNotice />
          </Plate>
        </Beat>

        <Beat
          id="savoring"
          eyebrow="Decision 1"
          title={<><Instead>Instead of alerting or informing,</Instead>the clock is built on savoring theory.</>}
        >
          <p>
            The design draws on savoring theory from positive psychology:
            the techniques people use to notice a good moment and make it
            last. In December I went through the concept behavior by
            behavior, named the savoring technique each one supports, and
            used research on gratitude to change when the device speaks.
            The clock that was built writes each line from the live weather
            and one of ten savoring techniques.
          </p>
          <Plate label="From my December 6 notes, on the concept that came before the clock">
            <Basis
              label="What the device does"
              ruleLabel="The savoring technique it supports"
              rows={[
                { finding: 'Prompts you to notice the soft drizzle outside.', source: 'Read the Air, variation 2', rule: 'Sensory-perceptual sharpening' },
                { finding: 'Waves, so you stop and appreciate the calm weather.', source: 'Read the Air, variation 2', rule: 'Counting blessings' },
                { finding: 'Turns the day’s air into a picture you can keep.', source: 'Read the Air, variation 2', rule: 'Memory building, temporal awareness' },
                { finding: 'A share button passes today’s weather to someone at home.', source: 'Read the Air, variation 3', rule: 'Sharing with others' },
              ]}
            />
            <Basis
              label="The research"
              ruleLabel="What I changed"
              rows={[
                { finding: 'Gratitude felt in the moment has a larger effect than gratitude recalled afterwards.', source: 'Gratitude research discussed in the lab', rule: 'Prompt the person to appreciate the moment while it is happening, before the device asks anything of them.' },
              ]}
            />
          </Plate>
          <Plate label="One change in the weather, on the clock">
            <WeatherToClock />
          </Plate>
        </Beat>

        <Beat
          id="pace"
          eyebrow="Decision 2"
          title={<><Instead>Instead of responding at once,</Instead>the clock moves more slowly than most devices, on purpose.</>}
        >
          <p>
            I decided when the clock speaks and when it stays silent, and how
            long its transitions take. I documented each behavior in
            narrative form so the intent survived implementation.
          </p>
          <Plate label="What the clock does, and when">
            <WhenItSpeaks />
          </Plate>
        </Beat>

        <Beat
          id="motion"
          eyebrow="Decision 3"
          title={<><Instead>Instead of a ball that drops when a message arrives,</Instead>a motor moves the clock.</>}
        >
          <p>
            In February I compared two playful physical interactions for the
            moment a message appears. The clock was built with a motor that
            turns the weather vane.
          </p>
          <Plate label="The two options, with the points from my notes">
            <InteractionChoice />
          </Plate>
        </Beat>

        <Beat id="system" eyebrow="System" title="Separate modules for light, motor, display and touch, kept in step by one timing model.">
          <p>
            An Arduino UNO R4 WiFi fetches live weather from the Google Maps
            Weather API, parses it with ArduinoJson, and requests a short
            message from the OpenAI API. I wrote the modules and the shared
            timing model.
          </p>
          <Plate label="The clock, part by part">
            <InsideParts />
          </Plate>
        </Beat>

        <Beat id="process" eyebrow="Process and roles" title="Weekly sketches, then a prototype.">
          <p>
            Each week Gaeul and I sketched concepts and wrote short
            descriptions of possible interactions, then refined them with
            Professor Yoon. Once the direction was set, Xinyi Zhou joined to
            prototype the motor behavior and lighting.
          </p>
          <Plate label="Five weekly documents, from first ideas to the clock">
            <ProcessTimeline />
          </Plate>
          <Plate label="From the first week: the map for one of the three ideas, Savoring Clean Air">
            <ConceptMap />
          </Plate>
          <Plate label="The back and underside of the build">
            <RearParts />
          </Plate>
          <Trio items={ROLES} />
        </Beat>

        <div className="cs-links">
          <a href="https://github.com/walkerstrauss/weather-clock-savoring" target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub →</a>
          <Link to="/" className="back-link">← Back to home</Link>
        </div>
      </CaseLayout>
    </Page>
  );
}
