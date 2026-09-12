import React from 'react';
import { Link } from 'react-router-dom';

export default function Blog() {
  return (
    <div className="page">
      <div>
        <span className="cs-eyebrow">Writing</span>
        <h1 className="cs-title">Blog</h1>
        <p className="cs-subtitle">
          Notes on design, AI products, and the research behind them. Coming soon.
        </p>

        <div className="cs-links">
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
