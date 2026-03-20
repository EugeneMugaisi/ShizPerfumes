import React from 'react';
import { products, Product } from '../data/products';
import '../styles/GiftSets.css';

interface GiftSetsProps {
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string) => void;
  wishlistItems: Product[];
  onToggleWishlist: (product: Product) => void;
}

const GiftSets: React.FC<GiftSetsProps> = ({ onAddToCart, onNavigate, wishlistItems, onToggleWishlist }) => {
  const giftSets = products.filter(p => p.category === "Gift Sets");
  const isLiked = (id: number) => wishlistItems.some(item => item.id === id);

  return (
    <div className="gift-sets-page">
      <div className="catalog-header gift-header">
        <div className="container">
          <h1 className="catalog-title">Curated Gift Sets</h1>
          <p className="gift-subtitle">Exquisite collections for the perfect gift</p>
          <div className="breadcrumb">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a> / <span>Gift Sets</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="gift-banner">
          <div className="gift-banner-content">
            <h2>The Art of Gifting</h2>
            <p>Make every occasion unforgettable with our specially curated perfume collections. Wrapped in luxury, delivered with love.</p>
            <button className="btn-primary" onClick={() => window.scrollTo(0, 800)}>EXPLORE COLLECTIONS</button>
          </div>
        </div>

        <div className="catalog-products-grid gift-sets-grid">
          {giftSets.map((product) => (
            <div 
              key={product.id} 
              className="product-card gift-set-card" 
              onClick={() => onNavigate(`product-${product.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-image-wrapper">
                {product.onSale && <div className="sale-badge">GIFT SALE</div>}
                <div 
                  className={`wishlist-btn ${isLiked(product.id) ? 'liked' : ''}`}
                  onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
                >
                  ♡
                </div>
                <img src={product.image} alt={product.name} />
              </div>
              
              <div className="product-info">
                <div className="product-category">Special Collection</div>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                  {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                </div>
                <div className="product-footer">
                  <div className="product-price">
                    {product.oldPrice && <span className="old-price">Ksh. {product.oldPrice.toLocaleString()}</span>}
                    <span className="current-price">Ksh. {product.price.toLocaleString()}</span>
                  </div>
                  <button className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="gift-features">
          <div className="gift-feature">
            <div className="feature-icon">🎁</div>
            <h3>Premium Packaging</h3>
            <p>Each set comes in our signature luxury gift box with a personalized note.</p>
          </div>
          <div className="gift-feature">
            <div className="feature-icon">🚚</div>
            <h3>Express Delivery</h3>
            <p>Fast and secure shipping to ensure your gift arrives on time.</p>
          </div>
          <div className="gift-feature">
            <div className="feature-icon">✨</div>
            <h3>Exclusive Scented</h3>
            <p>Our sets include limited edition fragrances not available individually.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftSets;
