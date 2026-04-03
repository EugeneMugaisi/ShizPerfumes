import React from 'react';
import '../styles/SaleBanner.css';

interface SaleBannerProps {
  onNavigate: (page: string) => void;
}

const SaleBanner: React.FC<SaleBannerProps> = ({ onNavigate }) => {
  return (
    <section className="sale-banner-section">
      <div className="container sale-banner-container">
        <div className="sale-banner-content">
          <div className="perfume-tag-wrapper">
            <span className="brush-stroke"></span>
            <span className="perfume-tag">Perfume</span>
          </div>
          <h2 className="sale-banner-title">Exclusive Sale</h2>
          <p className="sale-banner-desc">
            Discover our premium selection of designer fragrances at irresistible prices. 
            Elevate your collection with scents that define elegance.
          </p>
          <button className="btn-shop-now" onClick={() => onNavigate('shop')}>SHOP NOW</button>
        </div>
        
        <div className="sale-banner-image">
          <div className="discount-badge">
            <span className="discount-percent">-50%</span>
            <span className="discount-text">SALE</span>
          </div>
          <img 
            src="/src/assets/Catalog/37.png" 
            alt="Premium Perfume Bottle" 
            className="main-perfume-img"
          />
          <img 
            src="/src/assets/Catalog/37.png" 
            alt="Reflection" 
            className="perfume-reflection"
          />
        </div>
      </div>
    </section>
  );
};

export default SaleBanner;
