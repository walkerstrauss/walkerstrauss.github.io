import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import { Beat, CaseHero, CaseLayout, Trio, NextCase } from '../components/case/Case.jsx';
import PolicyAgentsCase from './PolicyAgentsCase.jsx';
import '../components/case/case.css';

/*
 * Agent work, case 2 of 2: the reference agents (card disputes and HR
 * leave). Who decides, the problem, the spec research, four decisions, the
 * result, and the outcome: the mock records they ran on, now how a new
 * agent starts. Links back to case 1 (/work/support-agents). Fictional data throughout.
 */
const SECTIONS = [
  { id: 'ref-problem', label: 'Problem' },
  { id: 'spec', label: 'Research' },
  { id: 'argument', label: 'Who decides' },
  { label: 'Decisions', group: true },
  { id: 'check-first', label: 'Check before writing', sub: true },
  { id: 'block', label: 'A block explains itself', sub: true },
  { id: 'edit', label: 'Edit the same draft', sub: true },
  { id: 'reason', label: 'The reason decides', sub: true },
  { id: 'result', label: 'Three runs, one decision' },
  { id: 'mock-records', label: 'Outcome: mock records' },
];

const SPLIT = [
  ['The model', 'Reads what the person asked for and words the reply.'],
  ['Code', 'Checks the policy and allows or blocks the write.'],
  ['The person', 'Confirms before anything is written.'],
];

export default function PolicyAgents() {
  return (
    <Page className="cs-page">
      <CaseHero
        meta={['Agent design']}
        title="Agents that act on records under policy"
        subtitle={<>
          Two reference agents I built, for card disputes and HR leave.
        </>}
        facts={[['Examples', 'Fictional data throughout']]}
      />

      <CaseLayout sections={SECTIONS}>
        <PolicyAgentsCase whoDecides={(
        <Beat id="argument" eyebrow="Who decides" title="The model reads the request. Code decides whether a rule is met.">
          <p>
            Here a wrong answer is a wrong record, so each decision goes to
            whichever of the three can be held to it.
          </p>
          <Trio items={SPLIT} />
        </Beat>
        )} />

        <NextCase from="/work/policy-agents" />
      </CaseLayout>
    </Page>
  );
}
