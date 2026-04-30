import React, { useState } from 'react';
import '../styles/ProductGrid.css';
import '../styles/NewArrivals.css';

import { Product as ProductType, products } from '../data/products';

interface NewArrivalsProps {
  onAddToCart: (product: ProductType) => void;
  wishlistItems: ProductType[];
  onToggleWishlist: (product: ProductType) => void;
  onNavigate: (page: string) => void;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ onAddToCart, wishlistItems, onToggleWishlist, onNavigate }) => {
  const isLiked = (id: number) => wishlistItems.some(item => item.id === id);
  
  // Use new products from data
  const newArrivals = products.filter(p => p.isNew);

  return (
    <section className="product-grid-section new-arrivals-section">
      <div className="container arrivals-container">
        <div className="section-title">
          <span>Latest Additions</span>
          <h2>New Arrivals</h2>
          <p>Experience the season's newest fragrance discoveries</p>
        </div>
        
        <div className="products-container">
          {newArrivals.map((product) => (
            <div key={product.id} className="product-card" onClick={() => onNavigate(`product-${product.id}`)} style={{ cursor: 'pointer' }}>
              <div className="product-image-wrapper">
                <div className="sale-badge">NEW</div>
                <div 
                  className={`wishlist-btn ${isLiked(product.id) ? 'liked' : ''}`}
                  onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
                >
                  ♡
                </div>
                <img src={product.image} alt={product.name} />
              </div>
              
              <div className="product-rating">
                {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
              </div>
              <h3 className="product-name">{product.name}</h3>
              
              <div className="product-footer">
                <button className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
                  ADD TO CART
                </button>
                <div className="product-price">
                  {product.oldPrice && <span className="old-price">Ksh. {product.oldPrice.toLocaleString()}</span>}
                  <span className="current-price">
                    {product.sizes && product.sizes.length > 0 
                      ? `From Ksh. ${Math.min(...product.sizes.map(s => s.price)).toLocaleString()}`
                      : `Ksh. ${product.price.toLocaleString()}`
                    }
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-wrapper">
          <button className="btn-primary" onClick={() => onNavigate('shop')}>VIEW ALL</button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
