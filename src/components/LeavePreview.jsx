import PolicyDecisionPreview from './PolicyDecisionPreview.jsx';

export default function LeavePreview() {
  return (
    <PolicyDecisionPreview
      label="Employee leave"
      request="Can I take two weeks off starting June 7?"
      blocked="Request blocked"
      reason="10 working days requested, 6 available"
      change="Make it one week."
      result="5 days · ready to confirm"
      caption="Illustrative example"
    />
  );
}
