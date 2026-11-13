import { useRef } from 'react';
import { useInView } from 'framer-motion';

export default function PolicyDecisionPreview({
  label, request, blocked, reason, change, result, next, caption = 'Illustrative example',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <figure className="policy-preview" ref={ref} data-in-view={inView}>
      <div className="policy-preview-label">{label}</div>
      <div className="policy-preview-message">“{request}”</div>
      <div className="policy-preview-block">
        <strong>{blocked}</strong><span>{reason}</span>
      </div>
      <div className="policy-preview-check">{change}</div>
      <div className="policy-preview-result">
        <strong>{result}</strong>{next && <span>{next}</span>}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
