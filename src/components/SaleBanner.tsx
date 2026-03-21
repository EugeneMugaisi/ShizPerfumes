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
          <h2 className="sale-banner-title">Fresh Aroma</h2>
          <p className="sale-banner-desc">
            Dogteeth tetra coley Ragfish yellow-and-black triplefin grenadier 
            dogfish shark torpedo scaly dragonfish flathead
          </p>
          <button className="btn-shop-now" onClick={() => onNavigate('shop')}>SHOP NOW</button>
        </div>
        
        <div className="sale-banner-image">
          <div className="discount-badge">
            <span className="discount-percent">-50%</span>
            <span className="discount-text">SALE</span>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600" 
            alt="Premium Perfume Bottle" 
            className="main-perfume-img"
          />
          {/* Simulated floral decoration */}
          <div className="floral-decor">
            <img 
              src="https://images.unsplash.com/photo-1563245339-6b2e44c20790?auto=format&fit=crop&q=80&w=400" 
              alt="Rose" 
              style={{ width: '100%', opacity: 0.6, transform: 'rotate(-15deg)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleBanner;
