import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import weatherClockImg from '../assets/weather-clock/clock.png';
import weatherClockInsideImg from '../assets/weather-clock/inside2.png';
import gradImg from '../assets/weather-clock/grad.png';


export default function WeatherClock() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="projects-container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="project-page"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <motion.h2 variants={itemVariants}>Savoring Weather Clock</motion.h2>

        <motion.p variants={itemVariants}>
          The <strong>Savoring Weather Clock</strong> is an interactive home device that transforms live weather data
          into poetic and sensory experiences. Developed within the <em>Meta Design Lab</em> at Cornell University under
          the guidance of <strong>Professor Jay Yoon</strong>, the project explores how design and computation can
          encourage reflection, gratitude, and environmental awareness. I led the backend system architecture and
          overall product design, creating the logic that connects the clock’s sensors, lighting, motion, and display
          into a single expressive system. <strong>Gaeul Han</strong> and I co-developed the concept through weekly
          brain-writing sessions with Professor Yoon, and <strong>Xinyi Zhou</strong> later joined to help implement the
          physical system, focusing on the motor, touch sensor, and interactive lighting.
        </motion.p>

        <motion.h3 variants={itemVariants}>Concept and Intent</motion.h3>
        <motion.p variants={itemVariants}>
          The Savoring Weather Clock began as part of an exploration in the Meta Design Lab into technologies that help
          people slow down and notice the world around them. The central question was how an everyday object might make
          environmental awareness feel emotional rather than informational. Drawing from <em>savoring theory</em> in
          positive psychology, we envisioned a device that interprets real-time weather data and responds with gentle
          movement, light, and language. The goal was not to alert or inform, but to quietly invite reflection. The
          clock transforms temperature, humidity, and wind into moments of poetic attention that fit naturally into the
          rhythm of daily life.
        </motion.p>

        <motion.h3 variants={itemVariants}>Design Process</motion.h3>
        <motion.p variants={itemVariants}>
          The project developed through a series of iterative idea exchanges in the lab. Each week, Gaeul and I created
          new concept sketches and wrote short descriptions of potential interactions, then shared and refined them in
          meetings with Professor Yoon. Through this process, we explored how physical gestures and poetic language
          could represent natural changes in a way that felt personal and calm. The idea of a weather clock emerged from
          these conversations as a metaphor for time, attention, and change. Once the conceptual direction was
          established, <strong>Xinyi Zhou</strong> joined the project to help prototype the system and develop its
          physical expressivity through motor behavior and lighting.
        </motion.p>

        <motion.div 
          className="project-image"
          variants={itemVariants}
          style={{ textAlign: 'center', margin: '2rem 0' }}
        >
          <img 
            src={weatherClockImg} 
            alt="The Savoring Weather Clock prototype showing lighting and display integration"
            style={{
              width: '100%',
              maxWidth: '400px',
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          />
        </motion.div>

        <motion.h3 variants={itemVariants}>Interaction Framework</motion.h3>
        <motion.p variants={itemVariants}>
          I structured the interaction logic of the clock around four savoring strategies: sensory-perceptual
          sharpening, counting blessings, memory building, and sharing with others. Each weather condition activates a
          distinct combination of light, motion, and generated text that encourages a short moment of reflection. When
          it rains, the device might emit a soft blue ripple and display a message about stillness. On a clear day, it
          might produce a warm amber glow and a phrase about warmth or renewal. The system is designed to move at a
          slower tempo than most devices, creating an atmosphere of awareness that unfolds gently over time.
        </motion.p>

        <motion.h3 variants={itemVariants}>System Integration</motion.h3>
        <motion.p variants={itemVariants}>
          My main responsibility was connecting all the modules into a cohesive system. I designed and programmed the
          backend architecture using an <em>Arduino UNO R4 WiFi</em> microcontroller that receives real-time weather
          data from the Google Maps Weather API, parses it using <em>ArduinoJson</em>, and requests a short reflective message
          from the OpenAI API. I wrote modular code for the lighting, motor, display, and touch components, creating a
          shared timing model that synchronizes the emotional rhythm of the device. The challenge was not only to make
          the system functional but to make it feel alive and responsive. Every sequence of movement, color, and text
          was adjusted to evoke a sense of presence and emotional coherence.
        </motion.p>

        <motion.div 
          className="project-image"
          variants={itemVariants}
          style={{ textAlign: 'center', margin: '2rem 0' }}
        >
          <img 
            src={weatherClockInsideImg} 
            alt="The inside of the Savoring Weather Clock prototype showing the parts and wiring"
            style={{
              width: '100%',
              maxWidth: '400px',
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          />
        </motion.div>


        <motion.h3 variants={itemVariants}>Collaboration and Refinement</motion.h3>
        <motion.p variants={itemVariants}>
          While I managed the system logic and data flow, <strong>Xinyi Zhou</strong> focused on the physical
          implementation. She developed the motor gestures, calibrated the touch sensor, and choreographed the light
          patterns that define the clock’s visible personality. Together, we iterated on timing and tone to make sure
          the physical and digital elements moved in harmony. The collaboration allowed us to merge two perspectives:
          mine centered on the system’s behavioral logic and emotional mapping, and hers on the tactile and sensory
          qualities that bring those ideas to life.
        </motion.p>

        <motion.h3 variants={itemVariants}>Product Design Contributions</motion.h3>
        <motion.p variants={itemVariants}>
          As design lead, I was responsible for defining the clock’s character and emotional rhythm. I built a system
          that translates weather data into expressive states, wrote the logic that connects them, and documented each
          behavior in narrative form to preserve design intent during implementation. I also guided decisions about
          when the clock should speak or remain silent, and how to time its transitions so they would feel natural. My
          goal was to make the device feel companionable and intentional, not reactive or performative. Through this
          process, the clock became a model for designing emotion-centered technology that responds to the world
          quietly, but meaningfully.
        </motion.p>

        <motion.div 
          className="project-image"
          variants={itemVariants}
          style={{ textAlign: 'center', margin: '2rem 0' }}
        >
          <img 
            src={gradImg} 
            alt="An image of Walker with the clock and the whiteboard he architected the system design on"
            style={{
              width: '100%',
              maxWidth: '400px',
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          />
        </motion.div>

        <motion.h3 variants={itemVariants}>Reflection</motion.h3>
        <motion.p variants={itemVariants}>
          Working on the Savoring Weather Clock with <strong>Professor Jay Yoon</strong>, <strong>Gaeul Han</strong>,
          and <strong>Xinyi Zhou</strong> showed me how product design can blend research, art, and engineering into a
          single practice. The project taught me to think of data as an expressive material and interaction as a form of
          empathy. It deepened my understanding of how technology can be poetic, how software can support emotional
          nuance, and how collaborative design can turn abstract theory into tangible experience. The finished prototype
          embodies this approach, functioning not only as a device that reports the weather but as one that invites
          awareness and gratitude for the simple act of noticing it.
        </motion.p>

        <motion.div 
          style={{ textAlign: 'center', marginTop: '2rem' }}
          variants={itemVariants}
        >
          <a 
            href="https://github.com/walkerstrauss/weather-clock-savoring" 
            className="project-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub →
          </a>
        </motion.div>

        <motion.div 
          style={{ marginTop: '2rem' }}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/projects" className="back-link">← Back to Projects</Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}