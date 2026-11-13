import React from 'react';
import { Link } from 'react-router-dom';
import { CaseLayout } from '../components/case/Case.jsx';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import ClockFigure from '../components/weatherclock/ClockFigure.jsx';
import InsideFigure from '../components/weatherclock/InsideFigure.jsx';

export default function WeatherClock() {
  return (
    <Page className="cs-page">
      <div className="cs-hero">
        <span className="cs-eyebrow">Meta Design Lab · Cornell University</span>
        <h1 className="cs-title">Savoring Weather Clock</h1>
        <p className="cs-subtitle">A home device that turns live weather into a prompt to notice it.</p>
      </div>

      <CaseLayout>
      <Reveal as="section" className="cs-section">
        <h2>Overview</h2>

        <p>
          The Savoring Weather Clock is a home device that turns live weather into a short prompt to notice it, using light, motion and a line of generated text. It was built in the Meta Design Lab at Cornell under Professor Jay Yoon. I led product design and wrote the system code. Gaeul Han and I developed the concept, and Xinyi Zhou built the motor, touch sensor and lighting.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Concept</h2>
        <p>
          The lab was exploring technology that helps people slow down. The question for this project was how an everyday object could make the weather something a person notices, not information they check. The design draws on <em>savoring theory</em> from positive psychology: the clock is not meant to alert or inform.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Process</h2>
        <p>
          Each week Gaeul and I sketched concepts and wrote short descriptions of possible interactions, then refined them with Professor Yoon. The weather clock came out of those sessions. Once the direction was set, Xinyi Zhou joined to prototype the motor behavior and lighting.
        </p>

        <div 
          className="project-image"
          style={{ margin: '2rem 0' }}
        >
          <ClockFigure label="The Savoring Weather Clock prototype showing lighting and display integration" />
        </div>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Interaction</h2>
        <p>
          I organized the clock’s behavior around four savoring strategies: sensory-perceptual sharpening, counting blessings, memory building, and sharing with others. Each weather condition triggers its own combination of light, motion and generated text. Rain might bring a soft blue ripple and a line about stillness; a clear day, a warm amber glow. The clock moves more slowly than most devices on purpose.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>System</h2>
        <p>
          An <em>Arduino UNO R4 WiFi</em> fetches live weather from the Google Maps Weather API, parses it with <em>ArduinoJson</em>, and requests a short message from the OpenAI API. I wrote separate modules for the lighting, motor, display and touch sensor, and a shared timing model that keeps them in step.
        </p>

        <div 
          className="project-image"
          style={{ margin: '2rem 0' }}
        >
          <InsideFigure label="The inside of the Savoring Weather Clock prototype showing the parts and wiring" />
        </div>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Design decisions</h2>
        <p>
          I decided when the clock speaks and when it stays silent, and how long its transitions take. I documented each behavior in narrative form so the intent survived implementation.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-links">
        <a
          href="https://github.com/walkerstrauss/weather-clock-savoring"
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          View on GitHub →
        </a>
        <Link to="/" className="back-link">← Back to home</Link>
      </Reveal>

      </CaseLayout>
    </Page>
  );
}