import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import AICapThumb from '../assets/aicap/aicap-thumb.png';
import MahsjongThumb from '../assets/mahsjong/mahsjong-thumb.mp4';
import WeatherClockThumb from '../assets/weather-clock/weatherclock-thumb.png';
import FMRIThumb from '../assets/fmri/fmri-thumb.png';
import AUIMark from '../components/AUIMark.jsx';

const projects = [
  {
    title: "AUI",
    subtitle: "Deploying and governing neuro-symbolic AI agents on Apollo-1",
    link: "/aui",
    // Drawn wordmark rather than a screenshot; inherits the theme colour.
    mark: AUIMark,
  },
  {
    title: "AICap",
    subtitle: "Multimodal AI Wine Recommendation Kiosk",
    link: "/projects/aicap",
    image: AICapThumb,
  },
  {
    title: "Savoring Weather Clock",
    subtitle: "Arduino-based Interactive Clock Merging Weather Data, AI, and Psychology",
    link: "/projects/weather-clock",
    image: WeatherClockThumb,
  },
  {
    title: "fMRI Study on Food Imagery",
    subtitle: "Exploring Hypothalamic Responses to Food Cues",
    link: "/research/fmri-study",
    image: FMRIThumb,
  },
  {
    title: "Mah's Jong",
    subtitle: "Competitive Mahjong-inspired 1v1 Strategy Game",
    link: "/projects/mahsjong",
    video: MahsjongThumb,
  },
];

const contacts = [
  { label: "Email", href: "mailto:walkerstrauss@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/walkerstrauss" },
  { label: "GitHub", href: "https://github.com/walkerstrauss" },
];

const connections = [
  {
    title: "Intelligent / Interactive Systems",
    body: "My projects are focused on the user experience of collaborating with intelligent systems. Across home appliances, retail recommender systems, and enterprise AI, I’m interested in simplifying human-computer collaboration through intentional design.",
  },
  {
    title: "Backed by Research",
    body: "My interest in interactive products stems from my background in psychology and neuroscience research, meaning all my work is influenced by research on human behavior and cognition. I always pair rapid building/iteration with data-driven ideation.",
  },
  {
    title: "Built for Hand-offs",
    body: "My background in computer science and software engineering means I design with the implementation in mind, not only in pixels and styling but in functions and classes. At AUI that inverted: the hand-off is the product, and I build the CLI, schemas, and frameworks that let other engineers and coding agents build correctly the first time.",
  },
  {
    title: "Cross-functional Collaboration",
    body: "I’m a proven team-leader and cross-functional collaborator. My interdisciplinary background in CS, design and psychology allows me to foster communication between teams. I can present ideas to diverse audiences and create a good work environment for all.",
  },
];

export default function Home() {
  return (
    <Page>
      <div className="home-container">
        <div
          className="hero"
        >
          <h1>Walker Strauss</h1>

          <h2>
            Building AI products from user research to deployed agents
          </h2>

          <div className="contact-links">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Reveal className="thumb-grid" stagger>
        {projects.map((proj) => (
          <Reveal.Item as={Link} key={proj.link} to={proj.link} className="thumb-card">
            <div className="thumb-media">
              {proj.mark ? (
                <div className="thumb-mark">
                  <proj.mark />
                </div>
              ) : proj.video ? (
                <video
                  src={proj.video}
                  className="thumb-image"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img src={proj.image} alt={proj.title} className="thumb-image" />
              )}
            </div>

            <div className="thumb-caption">
              <h3>{proj.title}</h3>
              <p>{proj.subtitle}</p>
            </div>
          </Reveal.Item>
        ))}
      </Reveal>

      <Reveal as="section" className="connecting-work">
        <h2>What connects my work?</h2>

        <div className="connecting-grid">
          {connections.map((c) => (
            <div className="connecting-card" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Page>
  );
}
