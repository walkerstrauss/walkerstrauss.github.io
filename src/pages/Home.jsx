import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import MahsjongThumb from '../assets/mahsjong/mahsjong-thumb.mp4';
import WeatherClockThumb from '../assets/weather-clock/weatherclock-thumb.png';
import FMRIThumb from '../assets/fmri/fmri-thumb.png';
import LeavePreview from '../components/LeavePreview.jsx';
import AICapPreview from '../components/aicap/AICapPreview.jsx';

const projects = [
  {
    title: "Agents that act on records under policy",
    subtitle: "AUI · Two demo agents for financial services and HR: card disputes and leave requests.",
    link: "/aui",
    preview: LeavePreview,
  },
  {
    title: "Voice and touch for wine recommendations",
    subtitle: "Onki · Led kiosk interaction design and tested how the assistant handled shopper preferences",
    link: "/projects/aicap",
    // Coded kiosk cycling through the flow, the same component as the case study.
    preview: AICapPreview,
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

export default function Home() {
  return (
    <Page>
      <div className="home-container">
        <div
          className="hero"
        >
          <h1>Walker Strauss</h1>

          <h2>
            Building human-centered conversational AI products for regulated industries
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
              {proj.preview ? (
                <proj.preview />
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

    </Page>
  );
}
