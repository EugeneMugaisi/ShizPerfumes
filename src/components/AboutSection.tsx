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
            Popularized through customer relationships with some of the world's most recognizable faces.
          </div>
          
          <div className="about-description">
            Merluccid hake redlip blenny discus snake mudhead large-eye bream scissor-tail rasbora opaleye char dogfish beachsalmon, sand tilefish. Spiny eel skipping goby fierasfer tarwhine Blind goby tidewater goby rocket danio armorhead catfish streamer.
          </div>
          
          <div className="about-stats">
            <div className="stat-item">
              <h3>470 k</h3>
              <p>Perfumes sold</p>
            </div>
            <div className="stat-item">
              <h3>10 years</h3>
              <p>Perfect years</p>
            </div>
          </div>
          
          <button className="btn-explore" onClick={() => onNavigate('shop')}>EXPLORE MORE</button>
        </div>
        
        <div className="about-image-wrapper">
          <div className="about-image-container">
            <img 
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000" 
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
