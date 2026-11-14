import React from 'react';
import { Link } from 'react-router-dom';
import { CaseLayout, Plate } from '../components/case/Case.jsx';
import Basis from '../components/case/Basis.jsx';
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
        <p>
          Alongside the survey I reviewed published research on voice
          assistants in public places, how people respond to recommendations
          and their explanations, and shopping behavior in stores. Each stage
          below starts with the findings behind its rules.
        </p>
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

        <Basis
          rows={[
            { finding: 'Wake-word failures and social awkwardness in public are the main things holding back voice assistants; a trial of starting by gaze instead was preferred in public.', source: 'Look and Talk: gaze-triggered activation of an AI assistant', rule: 'The kiosk starts the session itself when a shopper comes close. The wake phrase is optional.' },
            { finding: 'People describe using voice commands around strangers as uncomfortable.', source: '(Non-)Interacting with Conversational Agents, 2020 · interviews, 29 people' },
            { finding: '3 of 19 named feeling awkward using voice in a store as a top concern.', source: 'Our shopper survey', rule: 'A tap on “Let’s start” opens the same session.' },
          ]}
        />

        <StartDemo
          title="Browsing to first contact: Onki speaks first"
          intro="Saying a phrase out loud to a machine in an aisle is awkward, so a shopper never has to. The kiosk stays quiet while someone browses, offers a way in as they come nearer, and greets them itself at arm’s length. “Let’s start” opens the same session by touch."
        />

        <Basis
          rows={[
            { finding: 'People change how they talk to a conversational system when others are watching, and ask less when someone is waiting behind them.', source: 'Candello et al., CHI 2019', rule: 'Every voice action has a touch or text equivalent, and preset questions are always on screen.' },
            { finding: 'One of 20 wanted voice alone. Eight preferred presets and buttons.', source: 'Our shopper survey', rule: 'Touch is a complete path through the session.' },
          ]}
        />

        <PreferencesDemo
          title="Gathering: speak, type, or tap, and see what was heard"
          intro="Spoken input appears as text while the shopper talks, and each preference becomes a chip they can check and remove. “Show me matches” switches on once there is something to match; “Just surprise” is always available for a shopper who wants to skip ahead."
        />

        <Basis
          rows={[
            { finding: 'Explaining a recommendation raises trust and makes the system’s reasoning easier to follow.', source: 'Chen, Lin & Yi, Journal of Retailing and Consumer Services, 2025', rule: 'Each pick says how it matches what the shopper asked for.' },
            { finding: '10 of 19 worried recommendations would not be personal or accurate. 9 of 19 said stores have too many options.', source: 'Our shopper survey', rule: 'A few bottles at a time, each with its reason and its place on the shelf.' },
          ]}
        />

        <VoiceSyncDemo
          title="Recommendation: the voice leads, the screen follows"
          intro="The voice gives the short pitch: name, price, origin, a taste, and where to find the bottle. The card holds the detail to scan. I tied the card to the voice, so the screen always shows the wine being talked about."
        />

        <Basis
          rows={[
            { finding: 'A sales robot with no way to interrupt it; in my notes I marked that as the gap between it and a human conversation.', source: 'Hanschmann, Gnewuch & Maedche, Saleshat, 2023', rule: 'A tap counts as an interruption, the same as speaking over the assistant.' },
          ]}
        />

        <InterruptDemo
          title="Recommendation: a tap interrupts, like speaking over it"
          intro="Shoppers tap while the assistant is still talking. I defined a tap as an interruption: the voice stops, the caption finishes its phrase so nothing is cut off mid-word, and the assistant answers the tap instead of finishing its old plan."
        />

        <Basis
          rows={[
            { finding: 'People unfamiliar with a product don’t know which questions to ask, and want the assistant to take the lead.', source: 'Hanschmann, Gnewuch & Maedche, Saleshat, 2023', rule: 'Recommend within two turns, then ask one question at a time.' },
            { finding: 'People who know a domain prefer a fast, direct style; people who don’t choose better with a more guided one. Letting them switch worked best.', source: 'Kostric, Balog & Gadiraju, UMAP 2025', rule: 'Presets and “Just surprise” let a shopper skip ahead; questions guide the ones who want it.' },
            { finding: '13 of 20 would choose the kiosk to explore at their own pace.', source: 'Our shopper survey' },
          ]}
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
