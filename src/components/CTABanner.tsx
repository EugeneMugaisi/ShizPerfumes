import React from 'react';
import '../styles/CTABanner.css';

interface CTABannerProps {
  onNavigate: (page: string) => void;
}

const CTABanner: React.FC<CTABannerProps> = ({ onNavigate }) => {
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
          <button className="btn-cta" onClick={() => onNavigate('finder')}>FIND OUT</button>
        </div>
      </div>
      <div className="cta-bg-text">Perfect</div>
    </section>
  );
};

export default CTABanner;
