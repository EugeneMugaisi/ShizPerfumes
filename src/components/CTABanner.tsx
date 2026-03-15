import React from 'react';
import '../styles/CTABanner.css';

const CTABanner: React.FC = () => {
  return (
    <section className="cta-banner">
      <div className="container cta-container">
        <div className="cta-content">
          <h2 className="cta-heading">Find Your Beauty Guide</h2>
          <p className="cta-subheading">
            ShizPerfumes is committed to cruelty-free product formulation, & testing.
          </p>
        </div>
        
        <div className="cta-button-wrapper">
          <a href="/find-out" className="btn-cta">FIND OUT</a>
        </div>
      </div>
      <div className="cta-bg-text">Perfect</div>
    </section>
  );
};

export default CTABanner;
