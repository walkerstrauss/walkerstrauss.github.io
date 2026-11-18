import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import { Beat, CaseHero, CaseLayout, Trio, NextCase } from '../components/case/Case.jsx';
import SupportAgentsCase from './SupportAgentsCase.jsx';
import '../components/case/case.css';

/*
 * Agent work, case 1 of 2: end-to-end customer deployments. Conversational
 * agents with API tools in regulated industries, taken from requirements to
 * release, plus the migrations behind the cost result. Case 2, the
 * reference agents, is /work/policy-agents; the two link to each other.
 * Customers are not named; figures are fictional illustrations.
 */
const SECTIONS = [
  { id: 'roll-problem', label: 'Problem' },
  { label: 'Decisions', group: true },
  { id: 'requirements', label: 'Requirements as decisions', sub: true },
  { id: 'integration', label: 'Ticketing integration', sub: true },
  { id: 'tests', label: 'Check what it did', sub: true },
  { id: 'review', label: 'Review before rollout', sub: true },
  { id: 'migrations', label: 'Migrations' },
  { id: 'role', label: 'Related work' },
];

const ROLE = [
  ['Reference agents', <>Built card-dispute and HR leave reference agents. <Link to="/work/policy-agents">Read that case →</Link></>],
  ['Testing and evaluation', 'Wrote test conversations and checked agent behavior against requirements.'],
  ['Developer enablement', 'Onboarded customer teams onto the platform’s command-line tool and wrote reusable guidance for builders.'],
];

export default function SupportAgents() {
  return (
    <Page className="cs-page">
      <CaseHero
        meta={['Agent deployment']}
        title="Customer deployments, from requirements to release"
        subtitle={<>
          I took customers’ conversational agents, with API tools in
          regulated industries, from requirements to release.
        </>}
        results={[
          ['Over 50%', 'lower inference cost', 'Across the customer migrations I drove.'],
          ['2', 'agents released', 'After each team reviewed the agent’s replies to its own tickets.'],
        ]}
        facts={[['Examples', 'Fictional data throughout']]}
      />

      <CaseLayout sections={SECTIONS}>
        <SupportAgentsCase />

        <Beat id="role" eyebrow="Related work" title="Testing, enablement, and the reference agents.">
          <Trio items={ROLE} />
        </Beat>

        <NextCase from="/work/support-agents" />
      </CaseLayout>
    </Page>
  );
}
