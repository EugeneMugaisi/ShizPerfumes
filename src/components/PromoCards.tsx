import React from 'react';
import '../styles/PromoCards.css';

interface PromoCardsProps {
  onNavigate: (page: string) => void;
}

const PromoCards: React.FC<PromoCardsProps> = ({ onNavigate }) => {
  return (
    <section className="promo-cards section-padding">
      <div className="container promo-container">
        <div className="promo-card promo-left">
          <div className="promo-content">
            <span className="promo-subtitle">Best price</span>
            <h3 className="promo-title">A Perfume for Everyone</h3>
            <button className="btn-primary btn-small" onClick={() => onNavigate('shop')}>SHOP NOW</button>
          </div>
          <div className="promo-image">
            <img src="/src/assets/ShizPerfumes/IMG_7797.JPG" alt="Flower Collection" />
          </div>
        </div>
        
        <div className="promo-card promo-right">
          <div className="promo-content">
            <span className="promo-subtitle">New perfume</span>
            <h3 className="promo-title">Explore New Collection</h3>
            <button className="btn-primary btn-small" onClick={() => onNavigate('shop')}>SHOP NOW</button>
          </div>
          <div className="promo-image">
            <img src="/src/assets/ShizPerfumes/IMG_7386.JPG" alt="Cool Collection" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoCards;
