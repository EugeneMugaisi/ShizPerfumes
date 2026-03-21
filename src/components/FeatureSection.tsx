import React from 'react';
import '../styles/FeatureSection.css';

interface FeatureSectionProps {
  onNavigate: (page: string) => void;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ onNavigate }) => {
  return (
    <section className="section-padding">
      <div className="container">
        {/* Row 1 */}
        <div className="feature-row">
          <div className="feature-image-wrapper">
            <div className="feature-image-container">
              <img 
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800" 
                alt="High Quality Perfume" 
              />
              <div className="feature-bg-text">Great</div>
            </div>
            {/* Floral Accent */}
            <img 
              src="https://images.unsplash.com/photo-1563245339-6b2e44c20790?auto=format&fit=crop&q=80&w=400" 
              alt="Floral decor" 
              className="floral-accent"
            />
          </div>
          <div className="feature-content">
            <div className="feature-title-small">Features</div>
            <h2 className="feature-heading">ONLY HIGH QUALITY IS THE CORE VALUE FOR US</h2>
            <div className="feature-subheading">
              Palfmoon yellow moray tompot blenny, cuchia tompot blenny; smelt southern flounder grunt sculpin yellowbanded perch.
            </div>
            <p className="feature-description">
              Searobin freshwater hatchetfish sea bass orangestriped triggerfish white croaker. Pollock pencil catfish airbreathing catfish vendace pygmy sunfish spaghetti. Dogteeth tetra coley. Merluccid hake redlip blenny discus snake mudhead large-eye bream scissor-tail rasbora opaleye char dogfish beachsalmon, sand tilefish. Spiny eel skipping goby fierasfer tarwhine Blind goby tidewater goby rocket danio armorhead catfish streamer.
            </p>
            <button className="btn-feature" onClick={() => onNavigate('shop')}>EXPLORE MORE</button>
          </div>
        </div>

        {/* Row 2 */}
        <div className="feature-row reverse" style={{ marginTop: '20px' }}>
          <div className="feature-image-wrapper">
            <div className="feature-image-container">
              <img 
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" 
                alt="Dressing Complete" 
              />
              <div className="feature-bg-text" style={{ left: 'auto', right: '-40px' }}>Aroma</div>
            </div>
          </div>
          <div className="feature-content">
            <div className="feature-title-small">Features</div>
            <h2 className="feature-heading">A PERFUME THAT MAKES DRESSING COMPLETE</h2>
            <p className="feature-description">
              Flabby whalefish ocean sunfish trench rocket danio Colorado squawfish, cowfish round stiw perch zebra.
              Merluccid hake redlip blenny discus snake mudhead large-eye bream scissor-tail rasbora opaleye char dogfish beachsalmon, sand tilefish. 
              Spiny eel skipping goby fierasfer tarwhine Blind goby tidewater goby rocket danio armorhead catfish streamer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
