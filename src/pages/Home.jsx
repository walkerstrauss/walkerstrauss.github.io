import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import { Tile, Tiles } from '../components/Tiles.jsx';
import { AUIHomePreview } from '../components/aui/CasePreview.jsx';
import AICapPreview from '../components/aicap/AICapPreview.jsx';
import { FmriCard, MahsjongCard, WeatherClockCard } from '../components/home/EarlierPreviews.jsx';

/*
 * Home, in two eras (S345).
 *
 * Order carries the story: the two jobs come first, newest
 * first, then the Cornell work it grew out of. Size carries the weight: the
 * two jobs get large tiles that play their case; the four Cornell pieces get
 * small cards. A reader who stops after one screen has seen the jobs.
 */

export default function Home() {
  return (
    <Page className="cs-page home">
      <Reveal className="hero" stagger>
        <Reveal.Item as="h1">Walker Strauss</Reveal.Item>
        <Reveal.Item as="p" className="hero-statement">
          I design what a conversational AI is allowed to decide, and what code or a person decides instead
        </Reveal.Item>
      </Reveal>


      <Tiles cols={2} label="Work">
        <Tile
          to="/aui"
          title="AUI: what the model decides, what code decides, what a person reviews"
          line="2025 – 2026 · Product Operations. Reference agents that check policy before they write, and two customers’ support agents reviewed by their teams before release."
        >
          <AUIHomePreview />
        </Tile>
        <Tile
          to="/projects/aicap"
          title="Onki: when a kiosk speaks first, listens, and yields to a tap"
          line="2025 · AI Product & UX Designer. Interaction rules for an in-store wine kiosk, stage by stage, drawn from a shopper survey and research on choice and attention."
        >
          <AICapPreview />
        </Tile>
      </Tiles>

      <Tiles cols={3} label="Earlier, at Cornell">
        <Tile to="/projects/weather-clock" title="Savoring Weather Clock" line="Meta Design Lab. A home device that turns live weather into a prompt to notice it.">
          <WeatherClockCard />
        </Tile>
        <Tile to="/projects/mahsjong" title="Mah’s Jong" line="Project lead on a two-player mahjong race.">
          <MahsjongCard />
        </Tile>
        <Tile to="/research/fmri-study" title="fMRI study on food imagery" line="Affect and Cognition Lab. Ran scan sessions and wrote the data-preparation scripts.">
          <FmriCard />
        </Tile>
      </Tiles>
    </Page>
  );
}
