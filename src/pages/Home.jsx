import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import { Tile, Tiles } from '../components/Tiles.jsx';
import { AUIHomePreview } from '../components/aui/CasePreview.jsx';
import AICapPreview from '../components/aicap/AICapPreview.jsx';

/* The whole site on one page, most recent work first (S342). */
const research = [
  {
    label: '2023 – 2025',
    title: 'fMRI study on food imagery and the hypothalamus',
    line: 'Affect and Cognition Lab. Helped run scan sessions and wrote the scripts that prepared imaging and behavioral data for analysis.',
    to: '/research/fmri-study',
  },
  {
    label: '2023',
    title: 'Visual vs. textual environmental education',
    line: 'Independent study with 172 undergraduates comparing how images, infographics and text change environmental attitudes.',
    to: '/research/visual-vs-textual',
  },
];

const projects = [
  {
    label: 'Meta Design Lab',
    title: 'Savoring Weather Clock',
    line: 'A home device that turns live weather into a prompt to notice it.',
    to: '/projects/weather-clock',
  },
  {
    label: 'Cornell · Game design',
    title: 'Mah’s Jong',
    line: 'Project lead on a two-player mahjong race. A case study in five design decisions.',
    to: '/projects/mahsjong',
  },
  {
    label: 'Cornell · Game design',
    title: 'Death of a Deal',
    line: 'A physics platformer built in Java with LibGDX by a team of nine.',
    to: '/projects/death-of-a-deal',
  },
  {
    label: 'Sanko Game Corp',
    title: 'Tojiba Crash',
    line: 'A browser game built for a client in HTML5, CSS and JavaScript.',
    to: '/projects/tojiba-crash',
  },
];

function Rows({ items }) {
  return (
    <Reveal className="cs-index" stagger>
      {items.map((item) => (
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
  );
}

export default function Home() {
  return (
    <Page className="cs-page home">
      <Reveal className="hero" stagger>
        <Reveal.Item as="h1">Walker Strauss</Reveal.Item>
        <Reveal.Item as="p" className="hero-statement">
          Building human-centered conversational AI products for regulated industries
        </Reveal.Item>
      </Reveal>

      {/* Most recent first. The two jobs get tiles that preview their pages;
          projects and research are lists. Everything spans the page width,
          so the page stays centered under the name. */}
      <Tiles cols={2} label="Work">
        <Tile
          to="/aui"
          title="Enterprise agents at AUI, from first build to production"
          line="Product Operations · Built reference agents, took two customers’ support agents from requirements to release, and onboarded customer teams."
        >
          <AUIHomePreview />
        </Tile>
        <Tile
          to="/projects/aicap"
          title="A wine kiosk shoppers can talk to or tap"
          line="Onki · Led interaction design for an in-store kiosk. A shopper survey made touch a complete path, not a backup for voice."
        >
          <AICapPreview />
        </Tile>
      </Tiles>

      <section className="page-section">
        <span className="section-label">Projects</span>
        <Rows items={projects} />
      </section>

      <section className="page-section">
        <span className="section-label">Research</span>
        <Rows items={research} />
      </section>
    </Page>
  );
}
