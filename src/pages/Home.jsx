import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import { Tile, Tiles } from '../components/Tiles.jsx';
import AUIWorkPreview from '../components/AUIWorkPreview.jsx';
import AICapPreview from '../components/aicap/AICapPreview.jsx';

/* Work: the case studies from jobs. Then prototypes, research and games. */
const work = [
  {
    title: 'Enterprise agents at AUI, from first build to production',
    line: 'Product Operations · Built reference agents, took a customer’s payments support agent live, and onboarded customer teams.',
    to: '/aui',
    preview: AUIWorkPreview,
  },
  {
    title: 'A wine kiosk shoppers can talk to or tap',
    line: 'Onki · Led interaction design for an in-store kiosk. A shopper survey made touch a complete path, not a backup for voice.',
    to: '/projects/aicap',
    // Coded kiosk cycling through the flow, the same component as the case study.
    preview: AICapPreview,
  },
];

/* Everything else is a plain list: a title and one line each. */
const more = [
  {
    label: 'Meta Design Lab',
    title: 'Savoring Weather Clock',
    line: 'A home device that turns live weather into a prompt to notice it.',
    to: '/projects/weather-clock',
  },
  {
    label: 'Cornell · Research',
    title: 'fMRI study on food imagery',
    line: 'Ran scan sessions and wrote the scripts that prepared imaging data for analysis.',
    to: '/research/fmri-study',
  },
  {
    label: 'Cornell · Game design',
    title: 'Mah’s Jong',
    line: 'Project lead on a two-player strategy game built in C++.',
    to: '/projects/mahsjong',
  },
];

const contacts = [
  { label: 'Email', href: 'mailto:walkerstrauss@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/walkerstrauss' },
  { label: 'GitHub', href: 'https://github.com/walkerstrauss' },
];

/* The name, what he does, and where to reach him: centered, and still. It
   fades in once with the rest of the page and does nothing on scroll. */
function Hero() {
  return (
    <Reveal className="home-container hero" stagger>
      <Reveal.Item as="h1">Walker Strauss</Reveal.Item>
      <Reveal.Item as="p" className="hero-statement">
        Building human-centered conversational AI products for regulated industries
      </Reveal.Item>
      <Reveal.Item className="contact-links">
        {contacts.map((c) => (
          <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer">
            {c.label}
          </a>
        ))}
      </Reveal.Item>
    </Reveal>
  );
}

export default function Home() {
  return (
    <Page className="home">
      <Hero />

      <Tiles cols={2} label="Work">
        {work.map((item) => (
          <Tile key={item.to} to={item.to} title={item.title} line={item.line}>
            <item.preview />
          </Tile>
        ))}
      </Tiles>

      <section className="tiles-group">
        <span className="section-label">Projects and research</span>
        <Reveal className="cs-index" stagger>
          {more.map((item) => (
            <Reveal.Item as={Link} key={item.to} to={item.to} className="cs-index-item">
              <div className="cs-index-label">{item.label}</div>
              <div>
                <h3 className="cs-index-title">{item.title}</h3>
                <p className="cs-index-desc">{item.line}</p>
              </div>
              <span className="cs-index-arrow" aria-hidden="true">→</span>
            </Reveal.Item>
          ))}
        </Reveal>
      </section>
    </Page>
  );
}
