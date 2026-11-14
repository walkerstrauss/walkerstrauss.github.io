import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import { Beat, CaseLayout, Instead, Plate } from '../components/case/Case.jsx';
import {
  BoardFigure,
  CelestialFigure,
  DiscardFigure,
  FirstRulesFigure,
  HandoffFigure,
  RaceFigure,
  ScreensFigure,
  SprintFigure,
  SprintsFigure,
  TimerFigure,
  TurnsFigure,
  TutorialFigure,
} from '../components/mahsjong/figures.jsx';

/*
 * Mah's Jong as a case: the design decisions the team's documents and the
 * repository history actually record, with who did what. Evidence: the rules
 * PDF, the two architecture specifications, the team report, the level design
 * slides and the commit history (S341). No reasons or playtest results are
 * written down in those documents, so none are claimed here. Every figure is
 * drawn; there are no photographs or sketches (S366). The leadership section
 * is from the team's Alpha Release Report (~/cs4152/mahsjong1/report.pdf):
 * its activity breakdown and the Closed Beta sprint plan.
 */
const SECTIONS = [
  { id: 'game', label: 'The game' },
  { id: 'lead', label: 'Leading the team' },
  { label: 'Decisions', group: true },
  { id: 'race', label: 'A race, not a score', sub: true },
  { id: 'celestial', label: 'Celestial tiles', sub: true },
  { id: 'turns', label: 'Guided turns', sub: true },
  { id: 'timer', label: 'Timed turns', sub: true },
  { id: 'tutorial', label: 'Playable tutorial', sub: true },
  { id: 'role', label: 'My role' },
];

export default function Mahsjong() {
  return (
    <Page className="cs-page">
      <header className="cs-hero">
        <h1 className="cs-title">Mah’s Jong</h1>
        <p className="cs-subtitle">
          A two-player race to build a mahjong hand, made by a team of nine
          students in C++ on the CUGL framework. As project lead I set each
          sprint’s tasks and priorities with the software lead, and I built
          several of the game’s scenes and systems.
        </p>
        <div className="cs-meta">
          <div><h4>Course</h4><p>Advanced Game Development, Cornell</p></div>
          <div><h4>My role</h4><p>Project lead, programmer</p></div>
          <div><h4>Team</h4><p>Nine: programmers and designers</p></div>
          <div><h4>Timeline</h4><p>Feb – Jun 2025</p></div>
        </div>
      </header>

      <CaseLayout sections={SECTIONS}>
        <Beat id="game" eyebrow="The game" title="Two players race to complete a mahjong hand.">
          <p>
            A full hand is four sets of three and a pair. Each turn a player
            draws from the pile or the discard, then discards. Taking the
            discard means revealing a permanent set. The pile is a visible
            layered grid, and eight zodiac “Celestial” tiles help a player or
            disrupt their opponent.
          </p>
          <Plate label="The pile and a full hand, drawn">
            <BoardFigure />
          </Plate>
          <Plate label="Taking the discard: the set it completes is shown for good">
            <DiscardFigure />
          </Plate>
        </Beat>

        <Beat id="lead" eyebrow="Leading the team" title="Every task in a sprint had an owner, a due date and a priority.">
          <p>
            The team was nine programmers and designers, with a software
            lead, a design lead and a UX lead. The software lead and I
            decided together what each sprint would deliver and in what
            order. I set every task’s owner, due date, expected time and
            priority from 1 to 5, and wrote the detailed task descriptions
            the team worked from.
          </p>
          <Plate label="One sprint, by priority: the plan for the closed beta">
            <SprintFigure />
          </Plate>
          <p>
            I also ran the handoff between the designers and the
            programmers. Designers built each screen in Figma and exported
            it; programmers loaded it into the game. In that sprint, loading
            every new scene was my own top-priority task.
          </p>
          <Plate label="Between designers and programmers: how a screen reached the game">
            <HandoffFigure />
          </Plate>
          <Plate label="What each sprint put first">
            <SprintsFigure />
          </Plate>
        </Beat>

        <Beat
          id="race"
          eyebrow="Decision 1"
          title={<><Instead>Instead of a solo scoring game against a boss,</Instead>the game became a one-on-one race.</>}
        >
          <p>
            The first rules had draw, play and score phases, a shop, and a
            “Grandma” boss with hit points. The team’s revised design dropped
            the scoring and the boss. I removed the grandma tiles and the
            score display from the build.
          </p>
          <Plate tone="problem" kind="Before" label="The first rules: four phases a turn, points for sets, a boss to beat">
            <FirstRulesFigure />
          </Plate>
          <Plate tone="solution" kind="After" label="What was dropped, and what the game became">
            <RaceFigure />
          </Plate>
        </Beat>

        <Beat
          id="celestial"
          eyebrow="Decision 2"
          title={<><Instead>Instead of generic action tiles,</Instead>special tiles became Celestial tiles with three roles.</>}
        >
          <p>
            The designers grouped the eight tiles as Support, Risky and
            Disruptor: help yourself, gamble, or get in the opponent’s way. I took
            part in brainstorming the early action-tile designs and built the
            animations that show an opponent’s Celestial tile taking effect.
          </p>
          <Plate tone="solution" kind="After" label="Three roles, with one tile from each in use">
            <CelestialFigure />
          </Plate>
        </Beat>

        <Beat
          id="turns"
          eyebrow="Decision 3"
          title={<><Instead>Instead of an end-turn button,</Instead>the game ends the turn and shows what can be done next.</>}
        >
          <p>
            I first built an end-turn button, then limited it to the moments
            a turn could end, then replaced it with automatic turn ending and
            on-screen guides for each action.
          </p>
          <Plate tone="solution" kind="After" label="The guide for discarding, then the turn passes">
            <TurnsFigure />
          </Plate>
        </Beat>

        <Beat id="timer" eyebrow="Decision 4" title="Turns are timed: 45 seconds, up from the first 30.">
          <p>
            I implemented the turn timer, which ends the turn when it runs
            out, and lengthened it to 45 seconds. A teammate later reworked
            the timers.
          </p>
          <Plate label="The turn timer">
            <TimerFigure />
          </Plate>
        </Beat>

        <Beat
          id="tutorial"
          eyebrow="Decision 5"
          title={<><Instead>Instead of a tutorial that plays once at start-up,</Instead>the tutorial became a playable single-player scene.</>}
        >
          <p>
            A teammate built the first tutorial. I rebuilt it with another
            programmer as a scene the player plays through, from a designer’s
            Figma layout.
          </p>
          <Plate tone="solution" kind="After" label="From watched once to played through">
            <TutorialFigure />
          </Plate>
        </Beat>

        <Beat id="role" eyebrow="My role" title="Project lead, and a programmer on the game’s scenes.">
          <p>
            As project lead I set the team’s tasks and priorities with the
            software lead, wrote the detailed task descriptions, and ran the
            handoff between the designers and the programmers. In code I built the discard pile and its interface;
            the settings, game-over, info and help scenes; and the
            AnimatedNode class. I started the animation controller and the
            tutorial scene, which teammates and I finished together.
          </p>
          <Plate label="The game’s screens and systems, and the ones I built">
            <ScreensFigure />
          </Plate>
        </Beat>

        <div className="cs-links">
          <Link to="/" className="back-link">← Back to home</Link>
          <a href="https://github.com/walkerstrauss/mahsjong" target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub →</a>
        </div>
      </CaseLayout>
    </Page>
  );
}
