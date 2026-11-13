import './AUIWorkPreview.css';

export default function AUIWorkPreview() {
  return (
    <div className="aui-work-preview" aria-hidden="true">
      <div className="aui-work-flow">
      <div className="aui-work-inputs">
        <span>Dispute a charge</span>
        <span>Request time off</span>
      </div>
      <div className="aui-work-check">
        <span>Read the record</span>
        <span>Check the policy</span>
      </div>
      <div className="aui-work-results">
        <span>File a dispute</span>
        <span>Submit leave</span>
      </div>
      </div>
    </div>
  );
}
