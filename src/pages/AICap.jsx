import React from 'react';
import { Link } from 'react-router-dom';
import { CaseLayout, Plate } from '../components/case/Case.jsx';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import SurveyBars from '../components/aicap/SurveyBars.jsx';
import { SawTook, TestLoop, TwentyPeople } from '../components/aicap/research.jsx';
import { ProblemFigure, SolutionFigure } from '../components/aicap/ShelfFigure.jsx';
import {
  StartDemo,
  PreferencesDemo,
  VoiceSyncDemo,
  InterruptDemo,
  RefineDemo,
} from '../components/aicap/demos.jsx';

/* Drawn from the interaction spec, the shopper survey and the prototype. */
export default function AICap() {
  return (
    <Page className="cs-page">
      <div className="cs-hero">
        <h1 className="cs-title">Voice and touch for wine recommendations</h1>
        <p className="cs-subtitle">
          I led interaction design for Onki’s in-store wine kiosk and tested how the assistant handled shopper preferences.
        </p>
        <div className="cs-meta">
          <div><h4>Organization</h4><p>Onki</p></div>
          <div><h4>My role</h4><p>AI Product &amp; UX Designer</p></div>
          <div><h4>Timeline</h4><p>Jun–Nov 2025</p></div>
          <div><h4>Team</h4><p>Co-founders + small cross-functional team</p></div>
        </div>
      </div>

      <CaseLayout>
      <Reveal as="section" className="cs-section">
        <h2>Problem</h2>
        <p>
          A wine aisle can hold hundreds of bottles and few people who can talk
          about them. Staff are busy or on break, and shoppers who don’t know
          much about wine often don’t ask. In our survey, the most common
          complaints about buying wine in a store were too many options (9 of
          19) and not enough guidance (8 of 19).
        </p>
        <ProblemFigure />
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Solution</h2>
        <p>
          AICap is a screen at eye level in the wine aisle. A shopper can speak,
          type, or tap. It recommends a few bottles, explains how each one fits
          what they asked for, and says where to find it on the shelf.
        </p>
        <SolutionFigure />
        <p>
          I led the UX and conversation design and wrote the interaction
          specification: second-by-second rules and acceptance criteria for how
          voice and touch work together. The design decisions below are drawn
          from that spec.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>Competitor research</h2>
        <p>
          We looked at an earlier wine kiosk, wine apps, and other self-serve
          screens people use in public.
        </p>
        <SawTook />
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>User research</h2>
        <p>
          We surveyed 35 shoppers about how they buy wine. Twenty answered
          the questions about AICap itself.
          I also interviewed the pilot store’s owner and sommelier about how
          the sommelier approaches shoppers, so the flow could follow that
          conversation.
        </p>
        <TwentyPeople />
        <p className="sv-takeaway">
          Only one person wanted voice alone. Touch had to work for the whole
          flow, with voice alongside it.
        </p>
        <SurveyBars
          question="What would make you use AICap instead of the store sommelier?"
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
        <p className="sv-takeaway">
          Shoppers wanted to set the pace. The assistant recommends early and
          lets them skip ahead.
        </p>
        <SurveyBars
          question="What are your two biggest concerns with AICap?"
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
        <p className="sv-takeaway">
          Each recommendation says how it matches what the shopper asked for.
          No one preferred AICap to the sommelier (11 had no preference, 9
          preferred the sommelier), so we designed it to supplement staff.
        </p>

        <h3 className="cs-subhead">Literature review</h3>
        <ul className="cs-list">
          <li><strong>Wake words feel awkward in public</strong> → the kiosk speaks first when a shopper comes close; the phrase is optional.</li>
          <li><strong>Too much choice reduces conversion</strong> → recommend a few bottles at a time.</li>
          <li><strong>Shoppers feel dismissed without tailored reasons</strong> → explain each pick against stated preferences.</li>
          <li><strong>Finding products causes stress</strong> → say where each bottle is.</li>
          <li><strong>Always support touch-only use</strong> → every voice action has a touch equivalent.</li>
        </ul>
      </Reveal>

      <section className="cs-section cs-decisions">
        <h2>What changes at each stage</h2>
        <p>
          I specified the kiosk as five stages, from a shopper browsing the
          aisle to a recommendation. At each shift, what the kiosk asks of the
          shopper and what it shows change. Scroll through a demo to step
          through it; scroll back to replay.
        </p>
        <Plate label="The five stages and what shifts at each">
          <ol className="path" data-on-all="true" role="list" aria-label="The five stages of a kiosk session">
            <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>Browsing</strong><span>Ads play, mic off, nothing asked</span></li>
            <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>Showing interest</strong><span>The screen offers a way in</span></li>
            <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>First contact</strong><span>Onki speaks first</span></li>
            <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>Gathering</strong><span>Preferences by voice, text or tap</span></li>
            <li data-on="true"><span className="path-mark" aria-hidden="true" /><strong>Recommendation</strong><span>A few bottles, voice and card together</span></li>
          </ol>
        </Plate>

        <StartDemo
          title="Browsing to first contact: Onki speaks first"
          intro="Saying a phrase out loud to a machine in an aisle is awkward, so a shopper never has to. The kiosk stays quiet while someone browses, offers a way in as they come nearer, and greets them itself at arm’s length. “Let’s start” opens the same session by touch."
        />

        <PreferencesDemo
          title="Gathering: speak, type, or tap, and see what was heard"
          intro="Spoken input appears as text while the shopper talks, and each preference becomes a chip they can check and remove. “Show me matches” switches on once there is something to match; “Just surprise” is always available for a shopper who wants to skip ahead."
        />

        <VoiceSyncDemo
          title="Recommendation: the voice leads, the screen follows"
          intro="The voice gives the short pitch: name, price, origin, a taste, and where to find the bottle. The card holds the detail to scan. I tied the card to the voice, so the screen always shows the wine being talked about."
        />

        <InterruptDemo
          title="Recommendation: a tap interrupts, like speaking over it"
          intro="Shoppers tap while the assistant is still talking. I defined a tap as an interruption: the voice stops, the caption finishes its phrase so nothing is cut off mid-word, and the assistant answers the tap instead of finishing its old plan."
        />

        <RefineDemo
          title="Back to gathering: recommend first, then refine"
          intro="The assistant recommends within two turns and asks one question at a time. Each answer narrows the next set, and earlier picks stay in the carousel as history."
        />
      </section>

      <Reveal as="section" className="cs-section">
        <h2>Testing the conversation</h2>
        <p>
          I revised the assistant’s prompts so it could ask a focused question
          when a preference was unclear and move toward a recommendation once
          it had enough information. I also changed how it referred to wines
          the shopper had already discussed.
        </p>
        <p>
          I extended our Python evaluation harness with simulated shoppers and
          a rubric.
        </p>
        <TestLoop />
      </Reveal>

      <Reveal as="section" className="cs-section">
        <h2>What we built</h2>
        <p>
          The team brought the kiosk into an early retail pilot. My work produced
          an interaction specification, prompt changes, and repeatable tests for
          how the assistant handled preferences across turns.
        </p>
      </Reveal>

      <Reveal as="section" className="cs-links">
        <a href="https://onki.ai" target="_blank" rel="noopener noreferrer" className="project-link">Visit Onki →</a>
        <Link to="/" className="back-link">← Back to home</Link>
      </Reveal>
      </CaseLayout>
    </Page>
  );
}
