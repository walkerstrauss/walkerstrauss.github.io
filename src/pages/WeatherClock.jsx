import React from 'react';
import { Link } from 'react-router-dom';

export default function WeatherClock() {
  return (
    <div className="projects-container">
      <div className="project-page">
        <h2>Savoring Weather Clock</h2>
      <p>
        Arduino-based interactive clock merging weather data, AI, and psychology to create poetic reflections on daily weather.
      </p>

      <h3>My Role</h3>
      <ul>
        <li>Wrote Arduino code for motor, LED, and touch modules</li>
        <li>Integrated Google Maps Weather + OpenAI APIs</li>
        <li>Designed modular architecture for IoT extensions</li>
      </ul>

      <h3>Technologies</h3>
      <p>Arduino UNO R4, C++, OpenAI API, WiFiS3, ArduinoJson</p>

      <p>
        GitHub: <a href="https://github.com/walkerstrauss/weather-clock-savoring" target="_blank" rel="noopener noreferrer">https://github.com/walkerstrauss/weather-clock-savoring</a>
      </p>

        <div style={{ marginTop: '2rem' }}>
          <Link to="/projects" className="back-link">← Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}


