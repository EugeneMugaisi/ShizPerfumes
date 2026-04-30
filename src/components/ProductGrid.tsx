import React from 'react';
import '../styles/ProductGrid.css';

import { Product as ProductType } from '../data/products';

interface ProductGridProps {
  title: string;
  subtitle: string;
  products: ProductType[];
  onAddToCart: (product: ProductType) => void;
  onNavigate: (page: string) => void;
  wishlistItems: ProductType[];
  onToggleWishlist: (product: ProductType) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, subtitle, products, onAddToCart, onNavigate, wishlistItems, onToggleWishlist }) => {
  const isLiked = (id: number) => wishlistItems.some(item => item.id === id);

  // Use only first 8 products for best sellers if not specified
  const bestSellers = products.slice(0, 8);

  return (
    <section className="product-grid-section">
      <div className="container">
        <div className="section-title">
          <span>{subtitle}</span>
          <h2>{title}</h2>
          <p>The stylish and organized cosmetic products</p>
        </div>
        
        <div className="products-container">
          {bestSellers.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => onNavigate(`product-${product.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-image-wrapper">
                {product.onSale && <div className="sale-badge">SALE</div>}
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

        <div className="view-all-container">
          <button className="btn-primary" onClick={() => window.open(window.location.origin + window.location.pathname + '?page=shop', '_blank', 'noopener,noreferrer')}>
            VIEW ALL PRODUCTS
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
