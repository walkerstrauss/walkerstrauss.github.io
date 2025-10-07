import React from 'react';
import { Link } from 'react-router-dom';

export default function WeatherClock() {
  return (
    <div className="projects-container">
      <div className="project-page">
        <h2>Savoring Weather Clock</h2>

        <p>
          The <strong>Savoring Weather Clock</strong> is an interactive home device that transforms live weather data
          into poetic and sensory experiences. Developed within the <em>Meta Design Lab</em> at Cornell University under
          the guidance of <strong>Professor Jay Yoon</strong>, the project explores how design and computation can
          encourage reflection, gratitude, and environmental awareness. I led the backend system architecture and
          overall product design, creating the logic that connects the clock’s sensors, lighting, motion, and display
          into a single expressive system. <strong>Gaeul Han</strong> and I co-developed the concept through weekly
          brain-writing sessions with Professor Yoon, and <strong>Xinyi Zhou</strong> later joined to help implement the
          physical system, focusing on the motor, touch sensor, and interactive lighting.
        </p>

        {/* <img src="path/to/early_sketch.jpg" alt="Early sketches of the Savoring Weather Clock" className="project-image" /> */}

        <h3>Concept and Intent</h3>
        <p>
          The Savoring Weather Clock began as part of an exploration in the Meta Design Lab into technologies that help
          people slow down and notice the world around them. The central question was how an everyday object might make
          environmental awareness feel emotional rather than informational. Drawing from <em>savoring theory</em> in
          positive psychology, we envisioned a device that interprets real-time weather data and responds with gentle
          movement, light, and language. The goal was not to alert or inform, but to quietly invite reflection. The
          clock transforms temperature, humidity, and wind into moments of poetic attention that fit naturally into the
          rhythm of daily life.
        </p>

        {/* <img src="path/to/concept_sketches.jpg" alt="Concept sketches exploring form and behavior" /> */}

        <h3>Design Process</h3>
        <p>
          The project developed through a series of iterative idea exchanges in the lab. Each week, Gaeul and I created
          new concept sketches and wrote short descriptions of potential interactions, then shared and refined them in
          meetings with Professor Yoon. Through this process, we explored how physical gestures and poetic language
          could represent natural changes in a way that felt personal and calm. The idea of a weather clock emerged from
          these conversations as a metaphor for time, attention, and change. Once the conceptual direction was
          established, <strong>Xinyi Zhou</strong> joined the project to help prototype the system and develop its
          physical expressivity through motor behavior and lighting.
        </p>

        {/* <img src="path/to/module_diagram.jpg" alt="System architecture diagram showing modular components" /> */}

        <h3>Interaction Framework</h3>
        <p>
          I structured the interaction logic of the clock around four savoring strategies: sensory-perceptual
          sharpening, counting blessings, memory building, and sharing with others. Each weather condition activates a
          distinct combination of light, motion, and generated text that encourages a short moment of reflection. When
          it rains, the device might emit a soft blue ripple and display a message about stillness. On a clear day, it
          might produce a warm amber glow and a phrase about warmth or renewal. The system is designed to move at a
          slower tempo than most devices, creating an atmosphere of awareness that unfolds gently over time.
        </p>

        {/* <img src="path/to/interaction_diagram.jpg" alt="Interaction flow diagram of savoring logic" /> */}

        <h3>System Integration</h3>
        <p>
          My main responsibility was connecting all the modules into a cohesive system. I designed and programmed the
          backend architecture using an <em>Arduino UNO R4 WiFi</em> microcontroller that receives real-time weather
          data from the Google Maps API, parses it using <em>ArduinoJson</em>, and requests a short reflective message
          from the OpenAI API. I wrote modular code for the lighting, motor, display, and touch components, creating a
          shared timing model that synchronizes the emotional rhythm of the device. The challenge was not only to make
          the system functional but to make it feel alive and responsive. Every sequence of movement, color, and text
          was adjusted to evoke a sense of presence and emotional coherence.
        </p>

        {/* <img src="path/to/system_diagram.jpg" alt="System diagram of Arduino integration and sensor inputs" /> */}

        <h3>Collaboration and Refinement</h3>
        <p>
          While I managed the system logic and data flow, <strong>Xinyi Zhou</strong> focused on the physical
          implementation. She developed the motor gestures, calibrated the touch sensor, and choreographed the light
          patterns that define the clock’s visible personality. Together, we iterated on timing and tone to make sure
          the physical and digital elements moved in harmony. The collaboration allowed us to merge two perspectives:
          mine centered on the system’s behavioral logic and emotional mapping, and hers on the tactile and sensory
          qualities that bring those ideas to life.
        </p>

        <h3>Product Design Contributions</h3>
        <p>
          As design lead, I was responsible for defining the clock’s character and emotional rhythm. I built a system
          that translates weather data into expressive states, wrote the logic that connects them, and documented each
          behavior in narrative form to preserve design intent during implementation. I also guided decisions about
          when the clock should speak or remain silent, and how to time its transitions so they would feel natural. My
          goal was to make the device feel companionable and intentional, not reactive or performative. Through this
          process, the clock became a model for designing emotion-centered technology that responds to the world
          quietly, but meaningfully.
        </p>

        <h3>Reflection</h3>
        <p>
          Working on the Savoring Weather Clock with <strong>Professor Jay Yoon</strong>, <strong>Gaeul Han</strong>,
          and <strong>Xinyi Zhou</strong> showed me how product design can blend research, art, and engineering into a
          single practice. The project taught me to think of data as an expressive material and interaction as a form of
          empathy. It deepened my understanding of how technology can be poetic, how software can support emotional
          nuance, and how collaborative design can turn abstract theory into tangible experience. The finished prototype
          embodies this approach, functioning not only as a device that reports the weather but as one that invites
          awareness and gratitude for the simple act of noticing it.
        </p>

        {/* <img src="path/to/final_prototype.jpg" alt="Final prototype of Savoring Weather Clock" /> */}

        <p>
          <a href="https://github.com/walkerstrauss/weather-clock-savoring">View on GitHub →</a>
        </p>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/projects" className="back-link">← Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}