import React from 'react';
import { Link } from 'react-router-dom';
import { Beat, CaseHero, CaseLayout, Plate, Trio, NextCase } from '../components/case/Case.jsx';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import SurveyBars from '../components/aicap/SurveyBars.jsx';
import { EvalsFigure, SawTook } from '../components/aicap/research.jsx';
import { ProblemFigure, SolutionFigure } from '../components/aicap/ShelfFigure.jsx';
import {
  StartDemo,
  PreferencesDemo,
  VoiceSyncDemo,
  InterruptDemo,
  RefineDemo,
} from '../components/aicap/demos.jsx';

const SECTIONS = [
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'competitors', label: 'Competitor research' },
  { id: 'users', label: 'User research' },
  { label: 'Decisions', group: true },
  { id: 'stages', label: 'Five stages', sub: true },
  { id: 'first-contact', label: 'The kiosk speaks first', sub: true },
  { id: 'gathering', label: 'Speak, type, or tap', sub: true },
  { id: 'voice-leads', label: 'The voice leads', sub: true },
  { id: 'interrupt', label: 'A tap interrupts', sub: true },
  { id: 'refine', label: 'Recommend, then refine', sub: true },
  { id: 'testing', label: 'Testing' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'role', label: 'My role' },
];

/* Drawn from the interaction spec, the shopper survey and the prototype. */
export default function AICap() {
  return (
    <Page className="cs-page">
      <CaseHero
        meta={['AI Product & UX Designer', 'Onki', 'Jun–Nov 2025']}
        title="Voice and touch for wine recommendations"
        subtitle="I led interaction design for Onki’s in-store wine kiosk: the research, the spec the engineers built from, and the assistant’s prompts and evals."
        facts={[['Team', 'Led two teams: UX and conversation design']]}
      />

      <CaseLayout sections={SECTIONS}>
      <Beat id="problem" eyebrow="Problem" title="A wine aisle can hold hundreds of bottles and few people who can talk about them.">
        <p>
          Staff are busy or on break, and shoppers who don’t know
          much about wine often don’t ask. In our survey, the most common
          complaints about buying wine in a store were too many options (9 of
          19) and not enough guidance (8 of 19).
        </p>
        <Plate tone="problem"><ProblemFigure /></Plate>
      </Beat>

      <Beat id="solution" eyebrow="Solution" title="A screen at eye level that a shopper can speak to, type on, or tap.">
        <p>
          The kiosk is a screen at eye level in the wine aisle. A shopper can speak,
          type, or tap. It recommends a few bottles, explains how each one fits
          what they asked for, and says where to find it on the shelf.
        </p>
        <Plate tone="solution"><SolutionFigure /></Plate>
        <p>
          I wrote the interaction specification the engineers built from:
          second-by-second rules and acceptance criteria for how voice and
          touch work together. The decisions below come from it.
        </p>
      </Beat>

      <Beat id="competitors" eyebrow="Competitor research" title="We studied an earlier wine kiosk, wine apps, and other self-serve screens people use in public.">
        <Plate label="What we saw, and what we took from it"><SawTook /></Plate>
      </Beat>

      <Beat id="users" eyebrow="User research" title="Shoppers wanted to set the pace, and only one wanted voice alone.">
        <p>
          We surveyed 35 shoppers about how they buy wine, and I clustered
          the answers to find the kinds of shoppers we were designing for.
          Twenty answered the questions about the kiosk itself. I also
          talked with the sommelier at the store where the kiosk would go
          about how they approach shoppers, so the flow could follow that
          conversation.
        </p>
        <Plate>
        <SurveyBars
          question="What would make you use the kiosk instead of the store sommelier?"
          n={20}
          note="choose any"
          focus={['Exploring at my own pace', 'Quick, efficient recommendations']}
          data={[
            ['Exploring at my own pace', 13],
            ['Consistently good suggestions', 8],
            ['Staff aren’t available', 7],
            ['Quick, efficient recommendations', 7],
            ['Not being judged on wine knowledge', 6],
            ['More private', 4],
          ]}
        />
        </Plate>
        <Plate>
        <SurveyBars
          question="What are your two biggest concerns with the kiosk?"
          n={19}
          tone="block"
          focus={['Recommendations not personal or accurate']}
          data={[
            ['Recommendations not personal or accurate', 10],
            ['Replacing human interaction', 7],
            ['Understanding what I need', 3],
            ['Feeling awkward using voice in-store', 3],
            ['Camera and microphone privacy', 3],
          ]}
        />
        </Plate>

        <h3 className="cs-subhead">Literature review</h3>
        <p>
          I also reviewed research on voice assistants in public, how people
          respond to recommendations, and how they shop in stores. Each
          decision below opens with what it took from that.
        </p>
      </Beat>

      <Beat id="stages" eyebrow="Design" title="Five stages, from a shopper browsing the aisle to a recommendation.">
        <p>
          At each stage, what the kiosk asks of the shopper and what it shows
          change.
        </p>
        <Plate label="The five stages and what shifts at each">
          <ol className="path" data-on-all="true" role="list" aria-label="The five stages of a kiosk session">
            <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>Browsing</strong><span>Ads play, mic off, nothing asked</span></li>
            <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>Showing interest</strong><span>The screen offers a way in</span></li>
            <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>First contact</strong><span>The kiosk speaks first</span></li>
            <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>Gathering</strong><span>Preferences by voice, text or tap</span></li>
            <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>Recommendation</strong><span>A few bottles, voice and card together</span></li>
          </ol>
        </Plate>
      </Beat>

      <Beat id="first-contact" eyebrow="Decision 1 · First contact" title="The kiosk speaks first.">
        <p>Saying a phrase out loud to a machine in an aisle is awkward, so a shopper never has to. The kiosk stays quiet while someone browses, offers a way in as they come nearer, and greets them itself at arm’s length. “Let’s start” opens the same session by touch.</p>
        <StartDemo />
      </Beat>

      <Beat id="gathering" eyebrow="Decision 2 · Gathering" title="Every step works by speech, text or tap.">
        <p>Spoken input appears as text while the shopper talks, and each preference becomes a chip they can check and remove. “Show me matches” switches on once there is something to match; “Just surprise” is always available for a shopper who wants to skip ahead.</p>
        <PreferencesDemo />
      </Beat>

      <Beat id="voice-leads" eyebrow="Decision 3 · Recommendation" title="The card follows the voice.">
        <p>The voice gives the short pitch: name, price, origin, a taste, and where to find the bottle. The card holds the detail to scan. To keep the two together, I had the assistant say a short detail sentence just before it names the first wine, so the card turns as that sentence starts.</p>
        <VoiceSyncDemo />
      </Beat>

      <Beat id="interrupt" eyebrow="Decision 4 · Recommendation" title="A tap stops the voice.">
        <p>Shoppers tap while the assistant is still talking. In the spec, a tap is an interruption: the voice stops, the caption finishes its phrase so nothing is cut off mid-word, and the assistant answers the tap instead of finishing its old plan.</p>
        <InterruptDemo />
      </Beat>

      <Beat id="refine" eyebrow="Decision 5 · Back to gathering" title="The assistant recommends early, then refines.">
        <p>Early versions questioned shoppers until it felt like an interrogation. The assistant now never asks more than one question in a row without recommending a wine. Each answer narrows the next set, and earlier picks stay in the carousel as history.</p>
        <RefineDemo />
      </Beat>

      <Beat id="testing" eyebrow="Testing" title="My prompts graded consistently in the B range; the originals, around C.">
        <p>
          I built the evals: five simulated shoppers (an excited newcomer, an
          anxious one, an insecure one, a controlling one and one looking for
          validation), each conversation graded on a rubric and scored as a
          mean and spread per shopper. Each prompt change answered something
          a test or a tester found:
        </p>
        <ul className="cs-list">
          <li>Repeated phrases and full wine names said again: the assistant now refers back to a wine the way a person would.</li>
          <li>The price read out every time, though it was on the card: now only when the shopper asks.</li>
          <li>Too many questions: once the shopper gives a concrete cue, it moves on.</li>
          <li>A tester said they were under the drinking age and still got suggestions: I proposed a top tier of rules above everything else, starting with no invented wines and nothing off-topic.</li>
        </ul>
        <Plate label="How the assistant was graded"><EvalsFigure /></Plate>
      </Beat>

      <Beat id="outcome" eyebrow="Outcome" title="The kiosk built from the spec made a sale in its first store pilot.">
        <p>
          After my part ended, Onki’s first kiosk pilot, at a wine and
          spirits store in Tribeca in February 2026, produced a confirmed
          sale. A three-store New York pilot began in August 2026.{' '}
          <a href="https://onki.ai/pages/about" target="_blank" rel="noopener noreferrer">Onki’s milestones</a>
        </p>
      </Beat>

      <Beat id="role" eyebrow="My role" title="I led interaction design across two teams.">
        <Trio items={[
          ['Led', 'The UX and conversation design teams: set priorities, assigned the work, ran the meetings.'],
          ['Specified', 'Wrote the frontend specs, turned them into tasks, and worked through them with the frontend and backend engineers.'],
          ['Presented', 'Took the team’s work to the CTO and the engineers.'],
        ]} />
      </Beat>

      <NextCase from="/projects/aicap"><a href="https://onki.ai" target="_blank" rel="noopener noreferrer" className="project-link">Visit Onki →</a></NextCase>
      </CaseLayout>
    </Page>
  );
}
