import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import { Beat, CaseLayout } from '../components/case/Case.jsx';
import { Tile, Tiles } from '../components/Tiles.jsx';
import AUIWorkPreview from '../components/AUIWorkPreview.jsx';
import AICapPreview from '../components/aicap/AICapPreview.jsx';

/*
 * The whole site on one page, in the case-study layout: the outline on the
 * left is the path from research to product, and the blue dot follows it down.
 * Order is Walker's choice (S341): research first, then projects, then the
 * two jobs. Each stop links to its own page.
 */
const SECTIONS = [
  { id: 'research', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'onki', label: 'Onki' },
  { id: 'aui', label: 'AUI' },
];

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

      <CaseLayout sections={SECTIONS}>
        <Beat id="research" eyebrow="Research · Cornell" title="Psychology and neuroscience research">
          <p>The behavioral and cognitive research that grounds how I design.</p>
          <Rows items={research} />
        </Beat>

        <Beat id="projects" eyebrow="Projects" title="A physical-computing prototype and three games">
          <Rows items={projects} />
        </Beat>

        <Beat id="onki" eyebrow="Onki" title="A wine kiosk shoppers can talk to or tap">
          <p>
            I led interaction design for an in-store kiosk. A shopper survey
            made touch a complete path, not a backup for voice.
          </p>
          <Tiles cols={1}>
            <Tile to="/projects/aicap" title="Voice and touch for wine recommendations" line="Read the case study">
              <AICapPreview />
            </Tile>
          </Tiles>
        </Beat>

        <Beat id="aui" eyebrow="AUI · Dec 2025 – Nov 2026" title="Enterprise agents, from first build to production">
          <p>
            In Product Operations I built reference agents, took two
            customers’ support agents from requirements to release, and
            onboarded customer teams.
          </p>
          <Tiles cols={1}>
            <Tile to="/aui" title="Building and deploying enterprise agents at AUI" line="Two case studies: reference agents, and two customer support rollouts">
              <AUIWorkPreview />
            </Tile>
          </Tiles>
        </Beat>
      </CaseLayout>
    </Page>
  );
}
