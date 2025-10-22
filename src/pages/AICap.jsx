import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import preferencesImg from "../assets/aicap/aicap-preferences.png";
import recommendationsImg from "../assets/aicap/aicap-recommendations.png";
import demoVideo from "../assets/aicap/demo.mp4";

export default function AICap() {
  const page = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const reveal = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="cs-page"
      variants={page}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Hero */}
      <motion.div className="cs-hero" variants={reveal}>
        <h1 className="cs-title">AICap: Personalized shopping via multimodal AI kiosk</h1>
        <p className="cs-subtitle">
          Reimagining the consumer experience for physical retail in the GenAI era
        </p>

        {/* Metadata grid */}
        <div className="cs-meta">
          <div>
            <h4>Organization</h4>
            <p>Onki</p>
          </div>
          <div>
            <h4>My roles</h4>
            <p>User Researcher, Product/UX Designer, AI Product Manager, Prompt Engineer</p>
          </div>
          <div>
            <h4>Timeline</h4>
            <p>Jun–Nov 2025</p>
          </div>
          <div>
            <h4>Team</h4>
            <p>Co-founders + small cross-functional team</p>
          </div>
        </div>

        {/* Skills list */}
        <div className="cs-skills">
          <div>
            <h4>Research</h4>
            <p>Literature Review, User Research, Survey Design, EFA &amp; Clustering, Data Visualization, Persona Definition</p>
          </div>
          <div>
            <h4>UX Design</h4>
            <p>User-Centered Design, AI Product Design, Interaction Design, Wireframing, Prototyping, Figma</p>
          </div>
          <div>
            <h4>Product</h4>
            <p>Technical Product Specifications, Conversational AI Design, AI Product Management, Prompt Engineering</p>
          </div>
        </div>
      </motion.div>

      {/* Overview */}
      <motion.section className="cs-section" variants={reveal}>
        <h2>Overview</h2>
        <p>
          AICap is a multimodal AI sommelier revolutionizing the in-store wine selection experience through personalized
          product recommendations from natural conversation. Throughout my time at the company, I worked closely with Onki’s
          co-founders, Yue Liu and Kai Liao, to develop a product addressing consumer frictions in physical retail,
          increasing conversion and providing actionable data for stores.
        </p>
        <p>
          I played a leading role in driving product design and development, grounding AICap in user studies, market
          research, and literature reviews as well as leading UX and conversation design.
        </p>
      </motion.section>

      {/* Problem */}
      <motion.section className="cs-section" variants={reveal}>
        <h2>Problem</h2>
        <p>
          Consumer frictions in physical retail limit conversion and store staff are often perceived as unavailable or
          lacking product knowledge. In busy wine aisles, shoppers face hundreds of SKUs, inconsistent staff availability,
          and social friction around asking for help, which leads to slow or uncertain decisions and missed sales. Younger
          shoppers are also less familiar with wine categories, increasing the need for simple, confidence-building
          guidance.
        </p>
      </motion.section>

      {/* Solution */}
      <motion.section className="cs-section" variants={reveal}>
        <h2>Solution</h2>
        <p>
          AICap turns passerby curiosity into a confident list of recommendations in under two minutes through a
          voice-and-touch flow. We approached the design of AICap with the goal of supplementing store staff, not
          replacing them—much of the process was aligning the interaction with the experience of talking to a human
          sommelier.
        </p>
        <h3 className="cs-callout">Unlimited product knowledge</h3>
        <p>
          Learn more about wine through AICap’s educational responses and get answers to any questions you might have
          about the world of wine.
        </p>
        <h3 className="cs-callout">Speak or tap, no pressure</h3>
        <p>
          AICap supports both voice- and touch-based input, combining the ease of natural conversation with the
          efficiency and privacy of e-commerce.
        </p>
        <h3 className="cs-callout">Tailored recommendations</h3>
        <p>
          Tired of endlessly searching for the right wine for the occasion? AICap’s recommendations allow for a simple
          and rewarding wine-buying experience that will elevate your next dinner party or gift.
        </p>
      </motion.section>

      {/* Research */}
      <motion.section className="cs-section" variants={reveal}>
        <h2>Research</h2>
        <p>
          AICap is a product grounded in user studies, market research, and literature reviews.
        </p>

        <h3>User research</h3>
        <p className="cs-italic">Understanding our users</p>
        <p className="card-group">
          <strong>Wine buying habits:</strong> where do users shop for wine, how often, and for what occasions?
          <br />
          <strong>Sources of recommendation:</strong> what sources do users trust when it comes to recommendations for
          wine bottle purchases.
          <br />
          <strong>Willingness to use AICap:</strong> what would make users more willing to use a voice-based
          conversational recommendation kiosk in wine stores? What are their concerns?
        </p>
        <p>We distributed a survey to 35 participants through in-person recruitment and online forums.</p>

        <h3>EFA &amp; Clustering</h3>
        <p>
          We used exploratory factor analysis and k-means clustering of Likert-scale attitudes towards wine to determine
          relevant user personas to inform our design. The Likert-scale used was the <em>Wine Attitudes Scale for Consumer Research</em>, a validated scale measuring opinions on wine consumption and its cultural and social importance.
        </p>

        <h3>Clusters</h3>
        <p>
          We identified four distinct behavior clusters among survey respondents. Each cluster was defined by its wine
          purchasing behavior, occasion-based motivation, digital engagement patterns, and preferred interaction style
          with AICap. For each, we identified relevant design considerations related to their preferences and behavior.
        </p>

        <h3>Insights</h3>
        <ul className="cs-list">
          <li>
            Digital aversion is high → social proof and simple UI are extremely important
          </li>
          <li>
            Occasion and food pairing, as well as price or sale / discount are the most important factors for users when
            choosing a bottle → highlight these preferences when presenting multiple bottles
          </li>
          <li>
            Voice-shy shoppers need social safety → whisper mode, voice output transcription, and mute options will
            reduce friction
          </li>
          <li>
            Quality of suggestions and self-pacing would make users more likely to engage with AICap → ensure wine data
            is comprehensive and accurate
          </li>
        </ul>

        <h3>Literature review</h3>
        <h4 className="cs-subhead">Consumer Frictions in Physical Retail</h4>
        <ul className="cs-list">
          <li>
            <strong>Lack of knowledge:</strong> satisfaction decreases with the use of proxies (price, brands) instead of
            product characteristics → AICap serves as both recommender and educator to empower informed choices.
          </li>
          <li>
            <strong>Product location:</strong> difficulty locating products leads to stress → include product-location
            functionality.
          </li>
          <li>
            <strong>Lack of personalization:</strong> customers feel dismissed without tailored recommendations →
            personalize and explain how suggestions map to stated preferences.
          </li>
          <li>
            <strong>Overwhelming choice:</strong> cognitive overload reduces conversion → narrow choices to a select few.
          </li>
        </ul>

        <h4 className="cs-subhead">Increasing Use of Voice-Based Engagement in Public Spaces</h4>
        <ul className="cs-list">
          <li>
            <strong>Wake words:</strong> can feel awkward → trigger engagement based on distance/attention instead.
          </li>
          <li>
            <strong>New social norm:</strong> show social proof to normalize using voice in-store.
          </li>
          <li>
            <strong>Social/environmental awareness:</strong> adapt volume and behavior to context.
          </li>
          <li>
            <strong>Opt-out options:</strong> always support touch-only flows.
          </li>
          <li>
            <strong>Sensitive data:</strong> avoid prompting or repeating private information.
          </li>
        </ul>
      </motion.section>

      {/* Design Ideation */}
      <motion.section className="cs-section" variants={reveal}>
        <h2>Design Ideation</h2>
        <p>
          The design of AICap’s UX included identifying the pages and components necessary for the ideal user journey,
          developing a framework for modular design, and prototyping common use cases.
        </p>

        <motion.div className="cs-video" variants={reveal}>
          <video 
            src={demoVideo} 
            controls 
            className="cs-demo-video"
          />
        </motion.div>

        <h3 className="cs-subhead">Notable Design Decisions</h3>

        <div className="cs-card-grid">
          <div className="cs-card">
            <h4>Distance-based Navigation</h4>
            <p>
              A simple “Let’s Start” button serves as a manual fallback for faulty computer vision.
            </p>
          </div>

          <div className="cs-card">
            <h4>Preset Questions</h4>
            <p>
              Contextual quick-actions at the bottom of each screen help users understand capability
              and provide shortcuts to streamline recommendations.
            </p>
          </div>

          <div className="cs-card">
            <h4>Preference Chips</h4>
            <p>
              Compact chips allow quick scanning of captured preferences like occasion, pairing, and varietal.
            </p>
          </div>

          <div className="cs-card">
            <h4>“Just Surprise” & “Show Me Matches”</h4>
            <p>
              Fast-forward buttons let time-pressed shoppers jump straight to recommendations with minimal input.
            </p>
          </div>

          <div className="cs-card">
            <h4>Framework & Prototypes</h4>
            <p>
              The UX was modularized into reusable components and documented for engineers, with
              high-fidelity prototypes demonstrating voice-forward interaction.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.div className="image-flex" variants={reveal}>
        <div className="image-pair">
          <img
            src={preferencesImg}
            alt="AICap Preferences Screen"
            className="project-img"
          />
          <p className="image-caption">Preference Selection Interface</p>
        </div>

        <div className="image-pair">
          <img
            src={recommendationsImg}
            alt="AICap Recommendations Screen"
            className="project-img"
          />
          <p className="image-caption">Recommendation Results Screen</p>
        </div>
      </motion.div>

      {/* Reflection */}
      <motion.section className="cs-section" variants={reveal}>
        <h2>Reflection</h2>
        <p>
          Designing AICap reinforced for me that good interaction design is as much about emotion as it is about logic.
          The project challenged me to consider how movement, color, and phrasing can shape perception in subtle but
          powerful ways. It also deepened my understanding of how design frameworks can guide AI behavior to feel
          deliberate and coherent. The lessons from AICap extend beyond wine discovery and point toward a future where
          conversational interfaces are not only intelligent but capable of genuine warmth and character.
        </p>
      </motion.section>

      {/* Links */}
      <motion.section className="cs-links" variants={reveal}>
        <a
          href="https://onki.ai/pages/aicap-marketing-intro"
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          View AICap Marketing Intro →
        </a>
        <Link to="/projects" className="back-link">← Back to Projects</Link>
      </motion.section>
    </motion.div>
  );
}