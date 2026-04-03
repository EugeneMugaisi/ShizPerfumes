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
                src="/src/assets/Catalog/14.png" 
                alt="High Quality Perfume" 
              />
              <div className="feature-bg-text">Great</div>
            </div>
            {/* Floral Accent */}
            <img 
              src="/src/assets/ShizPerfumes/IMG_7693.JPG" 
              alt="Floral decor" 
              className="floral-accent"
            />
          </div>
          <div className="feature-content">
            <div className="feature-title-small">Quality First</div>
            <h2 className="feature-heading">AUTHENTICITY IS OUR CORE VALUE</h2>
            <div className="feature-subheading">
              Every bottle in our collection is 100% original, sourced directly from authorized distributors.
            </div>
            <p className="feature-description">
              At Shiz Perfumes, we understand that a fragrance is more than just a scent—it's an investment in your personal identity. We are dedicated to providing our customers with only the highest quality, authentic designer and niche perfumes. Our rigorous selection process ensures that you receive a genuine product that delivers the performance, longevity, and complexity intended by its creators.
            </p>
            <button className="btn-feature" onClick={() => onNavigate('shop')}>EXPLORE COLLECTION</button>
          </div>
        </div>

        {/* Row 2 */}
        <div className="feature-row reverse" style={{ marginTop: '20px' }}>
          <div className="feature-image-wrapper">
            <div className="feature-image-container">
              <img 
                src="/src/assets/Catalog/28.png" 
                alt="Dressing Complete" 
              />
              <div className="feature-bg-text" style={{ left: 'auto', right: '-40px' }}>Aroma</div>
            </div>
          </div>
          <div className="feature-content">
            <div className="feature-title-small">The Final Touch</div>
            <h2 className="feature-heading">A SCENT THAT COMPLETES YOUR STYLE</h2>
            <p className="feature-description">
              No outfit is truly complete without the invisible accessory of a captivating fragrance. Whether you're dressing for a high-stakes board meeting, a romantic evening, or a casual weekend outing, the right perfume adds a layer of confidence and sophistication that leaves a lasting impression. Let Shiz Perfumes help you find that final, essential piece of your daily ensemble.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
