import { Check, MessageToDraft, Release, Reply, Thread } from '../thread/Thread.jsx';

/* The pre-rollout review: on a ticket from its own help desk, the team sees
   what the agent would do and the reply it would send. That preview is what
   led to the agent going live. Fictional ticket. */
export default function SupportReview() {
  return (
    <Thread>
      <MessageToDraft index={0} who="Customer" parts={['There’s a fee on my statement I don’t recognize. Can you check?']}
        label="A ticket from the team’s own help desk" chips={[{ k: 'Request', v: 'Explain a fee' }]} />
      <Check index={1} label="What the agent would do" cells={[
        { k: 'First', v: 'Verify the account' },
        { k: 'Then', v: 'Find the fee on the statement' },
      ]} />
      <Reply index={2} who="Proposed reply" tone="message">
        I can look into that fee. First I need to confirm it’s your account: what’s the email on file?
      </Reply>
      <Release index={3} label="What the team’s review led to" stages={[
        { k: 'Team review', v: 'Approved', tone: 'result' },
        { k: 'Release', v: 'After review', tone: 'result' },
        { k: 'Help desk', v: 'Agent live', tone: 'result', live: true },
      ]} />
    </Thread>
  );
}
