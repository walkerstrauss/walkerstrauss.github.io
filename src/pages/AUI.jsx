import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';

export default function AUI() {
  return (
    <Page className="cs-page">
      {/* ================= Hero ================= */}
      <div className="cs-hero">
        <span className="cs-eyebrow">Current work</span>

        <h1 className="cs-title">
          AUI: Making neuro-symbolic agents deployable, auditable, and safe
        </h1>

        <p className="cs-subtitle">
          I deploy and govern AI agents built on Apollo-1, AUI’s neuro-symbolic
          foundation model, for enterprise and regulated-industry customers, and build
          the tooling that lets other engineers build agents on it correctly.
        </p>

        <div className="cs-meta">
          <div>
            <h4>Organization</h4>
            <p>Augmented Intelligence (AUI)</p>
          </div>
          <div>
            <h4>My role</h4>
            <p>Product Operations (Agents)</p>
          </div>
          <div>
            <h4>Timeline</h4>
            <p>Dec 2025 – Present</p>
          </div>
          <div>
            <h4>Team</h4>
            <p>Product • Engineering • GTM</p>
          </div>
        </div>

        <div className="cs-skills">
          <div>
            <h4>Agent Development &amp; Systems Design</h4>
            <p>
              Requirements translation, identity and access-control logic, auditable
              workflow design
            </p>
          </div>
          <div>
            <h4>Developer Tooling</h4>
            <p>
              CLI and schema design, frameworks that teach coding agents to build
              correctly
            </p>
          </div>
          <div>
            <h4>Customer Enablement</h4>
            <p>
              Platform onboarding, proof-of-concept scoping, deployment feedback into
              product
            </p>
          </div>
        </div>
      </div>

      {/* ================= Overview ================= */}
      <Reveal as="section" className="cs-section">
        <h2>Overview</h2>
        <p>
          AUI builds Apollo-1, a neuro-symbolic foundation model that separates a
          model’s conversational fluency from the procedural logic it has to follow.
          The model composes language, but a symbolic layer decides what it’s allowed
          to know, disclose, or act on. I joined AUI to help take that architecture from
          a promising model into agents that Fortune 500 and enterprise customers can
          actually run in production, in industries where a wrong disclosure is a real
          liability, not just a bad user experience.
        </p>
        <p>
          What drew me to AUI was that it sat at the end of a line my work had already
          been tracing. I started in psychology and neuroscience research, studying how
          people behave and how the systems around them shape that behavior. That led
          into interaction design and conversational AI, where the question became how a
          person and a model negotiate intent. At AUI it has become commercial
          partnerships and developer experience: what an enterprise needs before it will
          trust an agent, and what an engineer needs to build one correctly.
        </p>
        <p>
          My work spans two things that turned out to be inseparable: deploying and
          configuring individual customer agents against demanding, security-sensitive
          requirements, and turning what I learned doing that into reusable tooling,
          first a CLI and now a schema-based workflow, that lets other engineers, including
          coding agents, build correctly on Apollo-1 without relearning the platform’s
          nuances from scratch.
        </p>
      </Reveal>

      {/* ================= Problem ================= */}
      <Reveal as="section" className="cs-section">
        <h2>Problem</h2>
        <p>
          Generative AI works for users; it does not reliably work for companies. A
          model that reasons through weights can be steered, but it cannot be
          guaranteed, which is exactly what an enterprise needs before it will put an
          agent in front of its customers. Apollo-1 answers that with neuro-symbolic
          reasoning: conversation handled by the model, rules enforced by code.
        </p>
        <p>
          That gap isn’t abstract once you’re in front of a real customer. One partner,
          an enterprise payouts platform, came to us after three separate
          proof-of-concepts with other conversational AI vendors had failed. Their
          requirements weren’t unusual for a security-conscious business: never confirm
          or deny whether an account exists to an unverified party, verify identity
          through different signals depending on the type of request, and never let a
          user iteratively probe their way into someone else’s data. Ordinary LLM-based
          agents kept failing at exactly this kind of requirement, not because the
          model was unintelligent, but because a model that decides what to say by
          predicting plausible next tokens has no structural mechanism for staying
          silent about something it technically knows. That’s the actual problem I work
          on: rules that can’t just be requested of a language model; they have to be
          built into the architecture, so the model doesn’t have the information
          available to leak in the first place.
        </p>
      </Reveal>

      {/* ================= What I do ================= */}
      <Reveal as="section" className="cs-section">
        <h2>What I do</h2>

        <h3 className="cs-callout">Deployment &amp; systems design</h3>
        <p>
          I translate a customer’s actual operational requirements (often adversarial,
          security-sensitive, and inconsistent with how most conversational AI is built)
          into workflows Apollo-1’s symbolic layer can enforce. For the payouts
          platform above, that meant designing identity verification that never
          discloses whether an account exists, matches identity via different signals
          depending on request type, and structurally can’t be talked around by a
          persistent or malicious user.
        </p>

        <h3 className="cs-callout">Developer tooling</h3>
        <p>
          Deploying enough agents myself taught me where the platform’s real learning
          curve was, so I turned that into tooling: I worked on the CLI that let
          engineers build, chat with, evaluate, deploy, and analyze agents on Apollo-1
          as an npm package, and wrote the frameworks and prose instructions that teach
          coding agents to use it correctly. That work has since evolved into a
          schema-based agent builder as the platform matured, but the underlying goal
          hasn’t changed: compress deep platform knowledge into something a
          less-experienced engineer, human or AI, can use correctly on the first try.
        </p>

        <h3 className="cs-callout">Customer partnership</h3>
        <p>
          I work directly with the enterprise customers deploying these agents, from
          platform onboarding through proof-of-concept, and feed what I learn back into
          the platform. The clearest example: an improvement to how the runtime separates
          ground-truth, endpoint-sourced facts from user-provided claims was shaped
          directly by what that deployment needed, and it is what finally let us
          structurally implement the payouts platform’s requirements.
        </p>
      </Reveal>

      {/* ================= Selected work ================= */}
      <Reveal as="section" className="cs-section">
        <h2>Selected work</h2>

        <div className="cs-card-grid">
          <div className="cs-card">
            <h4>Enterprise payouts platform: customer service agent</h4>
            <p>
              Designed and deployed a customer-service agent connected to the client’s
              ticketing system, handling account-access and payout inquiries for their
              payees. The core challenge was identity verification that never confirms
              or denies information to an unverified party, a requirement that had
              failed three prior proof-of-concepts with other vendors. The agent is now
              live, taking real action in the client’s systems, reliably and auditably.
            </p>
          </div>

          <div className="cs-card">
            <h4>CLI &amp; developer tooling for Apollo-1</h4>
            <p>
              Built and documented the npm-based CLI for building, testing, evaluating,
              and deploying agents on Apollo-1, then wrote the frameworks and prose that
              let coding agents build agents on the platform correctly.
            </p>
          </div>

          <div className="cs-card">
            <h4>Platform-level AI assistant</h4>
            <p>
              Used insights from real deployments to shape the instructions and schema
              behind a platform-level assistant that helps build and govern
              neuro-symbolic agents through natural language, improving reliability and
              developer experience.
            </p>
          </div>

          <div className="cs-card">
            <h4>Fortune 500 &amp; enterprise onboarding</h4>
            <p>
              Partnered with multiple Fortune 500 and regulated-industry customers to
              onboard them onto the platform, and worked with them to drive
              proof-of-concepts for use cases that fit the strengths of the
              neuro-symbolic architecture.
            </p>
          </div>
        </div>
      </Reveal>

      {/*
        ================= Media =================
        Drop screenshots in src/assets/aui/, import them at the top of this file,
        and uncomment. Two-up by default; the grid reflows to one column on mobile.

        <div className="image-flex">
          <div className="image-pair">
            <img src={someImg} alt="" className="project-img" />
            <p className="image-caption">Caption</p>
          </div>
          <div className="image-pair">
            <img src={otherImg} alt="" className="project-img" />
            <p className="image-caption">Caption</p>
          </div>
        </div>
      */}

      {/* ================= Impact ================= */}
      <Reveal as="section" className="cs-section">
        <h2>Impact</h2>
        <p>
          Multiple customers are now running Apollo-1 agents connected directly to their
          ticketing systems, taking real action on their behalf, reliably and auditably
          by their own teams. The payouts platform deployment above shipped after three
          prior vendors failed on the same requirements. The runtime improvement to how
          the platform separates ground-truth from user-provided facts, which I helped
          push for based on that deployment, is now part of how the platform enforces
          disclosure policy.
        </p>
      </Reveal>

      {/* ================= Reflection ================= */}
      <Reveal as="section" className="cs-section">
        <h2>Reflection</h2>
        <p>
          The earlier projects taught me to design for people. This is teaching me to
          design for a system whose reasoning has to be inspectable, not just plausible.
          The hard problem isn’t getting an agent to sound right; it’s proving,
          structurally, what it cannot do. It’s also taught me that the highest-leverage
          work isn’t always the agent in front of the customer: the tooling that lets
          someone else build the next ten agents correctly on the first try compounds in
          a way one well-built agent doesn’t.
        </p>
      </Reveal>

      {/* ================= Links ================= */}
      <Reveal as="section" className="cs-links">
        <a
          href="https://aui.io"
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          Visit AUI →
        </a>
        <div className="cs-links-group">
          <Link to="/projects" className="back-link">← Back to Projects</Link>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </Reveal>
    </Page>
  );
}
