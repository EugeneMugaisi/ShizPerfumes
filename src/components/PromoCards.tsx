import React from 'react';
import '../styles/PromoCards.css';

const PromoCards: React.FC = () => {
  return (
    <section className="promo-cards section-padding">
      <div className="container promo-container">
        <div className="promo-card promo-left">
          <div className="promo-content">
            <span className="promo-subtitle">Best price</span>
            <h3 className="promo-title">Perfume Flower Collection</h3>
            <button className="btn-primary btn-small">SHOP NOW</button>
          </div>
          <div className="promo-image">
            <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=300&auto=format&fit=crop" alt="Flower Collection" />
          </div>
        </div>
        
        <div className="promo-card promo-right">
          <div className="promo-content">
            <span className="promo-subtitle">New perfume</span>
            <h3 className="promo-title">Perfume Cool Collection</h3>
            <button className="btn-primary btn-small">SHOP NOW</button>
          </div>
          <div className="promo-image">
            <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=300&auto=format&fit=crop" alt="Cool Collection" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoCards;
