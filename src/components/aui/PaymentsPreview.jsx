import '../case/case.css';

/* Tile for the payments case: a customer's ticket, and the agent's reply held
   for the support team to review. Fictional wording; not a product interface. */
export default function PaymentsPreview() {
  return (
    <div className="pay-preview" aria-hidden="true">
      <div className="pay-preview-flow">
        <span className="pay-preview-msg">I’m still waiting for my payment.</span>
        <span className="pay-preview-reply">
          I can look into that. What was the amount?
          <small>Held for review</small>
        </span>
      </div>
    </div>
  );
}
