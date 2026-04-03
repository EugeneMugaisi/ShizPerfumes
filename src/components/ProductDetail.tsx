import React, { useState } from 'react';
import { Product } from '../data/products';
import '../styles/ProductDetail.css';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onNavigate: (page: string) => void;
  relatedProducts: Product[];
  wishlistItems: Product[];
  onToggleWishlist: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onAddToCart, 
  onNavigate, 
  relatedProducts,
  wishlistItems,
  onToggleWishlist 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const isLiked = (id: number) => wishlistItems.some(item => item.id === id);

  return (
    <div className="product-detail-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title">{product.name}</h1>
          <div className="breadcrumb">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a> / 
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('shop'); }}>Shop</a> / 
            <span>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="product-detail-container">
          <div className="product-detail-left">
            <div className="main-product-image">
              {product.onSale && <div className="detail-sale-badge">SALE</div>}
              {product.isNew && <div className="detail-sale-badge new-badge">NEW</div>}
              <div 
                className={`wishlist-btn detail-wishlist ${isLiked(product.id) ? 'liked' : ''}`}
                onClick={() => onToggleWishlist(product)}
                style={{ opacity: 1, transform: 'none', top: '20px', right: '20px' }}
              >
                ♡
              </div>
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <div className="product-detail-right">
            <div className="detail-category">{product.category}</div>
            <h2 className="detail-name">{product.name}</h2>
            <div className="detail-rating">
              {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
              <span className="review-count">(12 Customer Reviews)</span>
            </div>
            
            <div className="detail-price">
              {product.oldPrice && <span className="detail-old-price">Ksh. {product.oldPrice.toLocaleString()}</span>}
              <span className="detail-current-price">Ksh. {product.price.toLocaleString()}</span>
            </div>

            <p className="short-description">
              {product.description || `Experience the essence of luxury with ${product.name}. This exquisite fragrance combines premium notes to create a lasting impression that is both sophisticated and alluring. Perfect for any occasion where you want to stand out.`}
            </p>

            <div className="detail-actions">
              <div className="quantity-selector">
                <button onClick={decrementQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={incrementQuantity}>+</button>
              </div>
              <button className="btn-primary detail-add-to-cart" onClick={() => onAddToCart(product, quantity)}>
                ADD TO CART
              </button>
            </div>

            <div className="detail-meta">
              <div className="meta-item">
                <strong>SKU:</strong> <span>SP-{product.id}00-X</span>
              </div>
              <div className="meta-item">
                <strong>Category:</strong> <span>{product.category}</span>
              </div>
              {product.fragranceFamily && (
                <div className="meta-item">
                  <strong>Fragrance Family:</strong> <span>{product.fragranceFamily}</span>
                </div>
              )}
              {product.scentType && (
                <div className="meta-item">
                  <strong>Scent Type:</strong> <span>{product.scentType}</span>
                </div>
              )}
              <div className="meta-item">
                <strong>Tags:</strong> <span>Perfume, Luxury, {product.category}</span>
              </div>
            </div>

            <div className="detail-share">
              <span>Share:</span>
              <div className="share-links">
                <a href="#">Fb</a>
                <a href="#">Tw</a>
                <a href="#">Ig</a>
                <a href="#">Pn</a>
              </div>
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <div className="tabs-header">
            <button 
              className={activeTab === 'description' ? 'active' : ''} 
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={activeTab === 'additional' ? 'active' : ''} 
              onClick={() => setActiveTab('additional')}
            >
              Additional Information
            </button>
            <button 
              className={activeTab === 'reviews' ? 'active' : ''} 
              onClick={() => setActiveTab('reviews')}
            >
              Reviews (12)
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-content">
                <p>Designed for the modern connoisseur, {product.name} is a masterpiece of olfactory art. Every note has been carefully selected and blended to evoke a sense of timeless elegance and contemporary style.</p>
                <p>The fragrance opens with vibrant top notes that awaken the senses, followed by a heart of complex floral and spicy accords, and finally settling into a warm, rich base that lingers beautifully on the skin throughout the day and into the night.</p>
              </div>
            )}
            {activeTab === 'additional' && (
              <div className="additional-content">
                <table className="info-table">
                  <tbody>
                    {product.fragranceFamily && (
                      <tr>
                        <th>Fragrance Family</th>
                        <td>{product.fragranceFamily}</td>
                      </tr>
                    )}
                    {product.scentType && (
                      <tr>
                        <th>Scent Type</th>
                        <td>{product.scentType}</td>
                      </tr>
                    )}
                    <tr>
                      <th>Weight</th>
                      <td>0.5 kg</td>
                    </tr>
                    <tr>
                      <th>Dimensions</th>
                      <td>10 × 10 × 15 cm</td>
                    </tr>
                    <tr>
                      <th>Volume</th>
                      <td>50ml, 100ml</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <p>No reviews yet. Be the first to review "{product.name}"</p>
              </div>
            )}
          </div>
        </div>

        <div className="related-products">
          <h2 className="section-title-sm">Related Products</h2>
          <div className="catalog-products-grid">
            {relatedProducts.slice(0, 4).map((rp) => (
              <div key={rp.id} className="product-card" onClick={() => { onNavigate(`product-${rp.id}`); window.scrollTo(0,0); }}>
                 <div className="product-image-wrapper">
                  {rp.onSale && <div className="sale-badge">SALE</div>}
                  {rp.isNew && <div className="sale-badge new-badge">NEW</div>}
                  <div 
                    className={`wishlist-btn ${isLiked(rp.id) ? 'liked' : ''}`}
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(rp); }}
                  >
                    ♡
                  </div>
                  <img src={rp.image} alt={rp.name} />
                </div>
                
                <div className="product-info">
                  <div className="product-category">{rp.category}</div>
                  <h3 className="product-name">{rp.name}</h3>
                  <div className="product-rating">
                    {'★'.repeat(rp.rating)}{'☆'.repeat(5 - rp.rating)}
                  </div>
                  <div className="product-footer">
                    <div className="product-price">
                      {rp.oldPrice && <span className="old-price">Ksh. {rp.oldPrice.toLocaleString()}</span>}
                      <span className="current-price">Ksh. {rp.price.toLocaleString()}</span>
                    </div>
                    <button className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); onAddToCart(rp, 1); }}>
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
