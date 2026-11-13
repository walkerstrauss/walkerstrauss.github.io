import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import { Tile, Tiles } from '../components/Tiles.jsx';
import { AUIHomePreview } from '../components/aui/CasePreview.jsx';
import AICapPreview from '../components/aicap/AICapPreview.jsx';
import WeatherClockPreview from '../components/weatherclock/WeatherClockPreview.jsx';
import FmriPreview from '../components/fmri/FmriPreview.jsx';
import mahsjongBoard from '../assets/mahsjong/mahsjong_6400.PNG';

/*
 * Home, in two eras (S345).
 *
 * Order carries the story: the work since graduating comes first, newest
 * first, then the Cornell work it grew out of. Size carries the weight: the
 * two jobs get large tiles that play their case; the four Cornell pieces get
 * small cards. A reader who stops after one screen has seen the jobs.
 */

/* The study's three conditions, side by side. Stylized. */
function ConditionsPreview() {
  return (
    <div className="cond" aria-hidden="true">
      <span className="cond-card"><i className="cond-img" />Image</span>
      <span className="cond-card"><i className="cond-chart"><b /><b /><b /></i>Infographic</span>
      <span className="cond-card"><i className="cond-text"><b /><b /><b /></i>Text</span>
    </div>
  );
}

export default function Home() {
  return (
    <Page className="cs-page home">
      <Reveal className="hero" stagger>
        <Reveal.Item as="h1">Walker Strauss</Reveal.Item>
        <Reveal.Item as="p" className="hero-statement">
          Designing and deploying conversational AI, from user research to customer rollout
        </Reveal.Item>
      </Reveal>


      <Tiles cols={2} label="Since graduating" note="Conversational AI for real users: first a voice kiosk in a store, then enterprise agents for customers.">
        <Tile
          to="/aui"
          title="Enterprise agents at AUI, from first build to production"
          line="2025 – 2026 · Product Operations. Built reference agents, took two customers’ support agents from requirements to release, and onboarded customer teams."
        >
          <AUIHomePreview />
        </Tile>
        <Tile
          to="/projects/aicap"
          title="A wine kiosk shoppers can talk to or tap"
          line="2025 · AI Product & UX Designer at Onki. Led interaction design for an in-store kiosk that speaks first and works fully by touch."
        >
          <AICapPreview />
        </Tile>
      </Tiles>

      <Tiles cols={4} label="At Cornell" note="Design projects and psychology research.">
        <Tile to="/projects/weather-clock" title="Savoring Weather Clock" line="Meta Design Lab. A home device that turns live weather into a prompt to notice it.">
          <WeatherClockPreview />
        </Tile>
        <Tile to="/projects/mahsjong" title="Mah’s Jong" line="Project lead on a two-player mahjong race.">
          <img src={mahsjongBoard} alt="" loading="lazy" />
        </Tile>
        <Tile to="/research/fmri-study" title="fMRI study on food imagery" line="Affect and Cognition Lab. Ran scan sessions and wrote the data-preparation scripts.">
          <FmriPreview />
        </Tile>
        <Tile to="/research/visual-vs-textual" title="Visual vs. textual environmental education" line="Independent study with 172 undergraduates.">
          <ConditionsPreview />
        </Tile>
      </Tiles>
    </Page>
  );
}
