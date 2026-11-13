import { Check, MessageToDraft, Reply, Thread } from '../thread/Thread.jsx';

/* The pre-rollout review: the team sees what the agent would send on a real
   incoming ticket while nothing reaches the customer. Fictional ticket. */
export default function PaymentsReview() {
  return (
    <Thread caption="Fictional ticket and reply illustrating the review.">
      <MessageToDraft index={0} who="Customer" parts={['I’m still waiting for my payment. Can you check?']}
        label="What the team can inspect" chips={[{ k: 'Request', v: 'Check payment status' }]} />
      <Reply index={1} who="Proposed reply" tone="message">
        I can look into that. What was the amount and about when were you expecting it?
      </Reply>
      <Check index={2} label="What happened on the help desk" cells={[
        { k: 'Reply', v: 'Held for review', tone: 'block' },
        { k: 'Ticket', v: 'Unchanged' },
      ]} />
    </Thread>
  );
}
