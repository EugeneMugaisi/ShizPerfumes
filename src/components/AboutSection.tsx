import React from 'react';
import '../styles/AboutSection.css';

interface AboutSectionProps {
  onNavigate: (page: string) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <section className="section-padding">
      <div className="container about-section">
        <div className="about-content">
          <div className="about-title-small">About ShizPerfumes</div>
          <h2 className="about-heading">PERFECT PERFUME</h2>
          
          <div className="about-subheading">
            Your journey to finding the perfect signature scent starts here with Kenya's premier fragrance destination.
          </div>
          
          <div className="about-description">
            Shiz Perfumes has established itself as the leading supplier of authentic designer and niche fragrances in Kenya. We pride ourselves on curating an exclusive collection of the world's most sought-after scents, ensuring every bottle we deliver is a testament to luxury and individuality. Our passion for olfactory excellence and commitment to customer satisfaction has made us the trusted choice for fragrance enthusiasts across the country.
          </div>
          
          <div className="about-stats">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Perfumes sold</p>
            </div>
            <div className="stat-item">
              <h3>300+</h3>
              <p>Happy Customers</p>
            </div>
          </div>
          
          <button className="btn-explore" onClick={() => onNavigate('shop')}>EXPLORE MORE</button>
        </div>
        
        <div className="about-image-wrapper">
          <div className="about-image-container">
            <img 
              src="/src/assets/ShizPerfumes/IMG_7716.JPG" 
              alt="Perfume being used" 
            />
            <div className="play-btn"></div>
          </div>
          <div className="bg-text-new">new</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
