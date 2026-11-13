import { Link } from 'react-router-dom';
import { Beat, CaseLayout, Instead, Plate, Trio } from '../components/case/Case.jsx';
import Page from '../components/Page.jsx';
import { ConceptMap, InsideParts, RearParts, WeatherToClock, WhenItSpeaks } from '../components/weatherclock/RealFigures.jsx';

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
  { id: 'system', label: 'System' },
  { id: 'process', label: 'Process and roles' },
];

const ROLES = [
  ['Me', 'Led product design and wrote the system code.'],
  ['Gaeul Han', 'Developed the concept with me.'],
  ['Xinyi Zhou', 'Built the motor, touch sensor and lighting.'],
];

export default function WeatherClock() {
  return (
    <Page className="cs-page">
      <header className="cs-hero">
        <h1 className="cs-title">Savoring Weather Clock</h1>
        <p className="cs-subtitle">A home device that turns live weather into a prompt to notice it.</p>
        <div className="cs-meta">
          <div><h4>Lab</h4><p>Meta Design Lab, Cornell, under Professor Jay Yoon</p></div>
          <div><h4>My role</h4><p>Product design lead, system code</p></div>
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
        </Beat>

        <Beat
          id="savoring"
          eyebrow="Decision 1"
          title={<><Instead>Instead of alerting or informing,</Instead>the clock is built on savoring theory.</>}
        >
          <p>
            The design draws on savoring theory from positive psychology. I
            organized the clock’s behavior around four savoring strategies:
            sensory-perceptual sharpening, counting blessings, memory
            building, and sharing with others. Each weather condition
            triggers its own combination of light, motion and generated text.
          </p>
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
          <Plate label="An earlier concept from those sessions, for an air-care appliance">
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
