import React from 'react';
import { Product } from '../data/products';
import '../styles/Wishlist.css';

interface WishlistProps {
  wishlistItems: Product[];
  onRemoveFromWishlist: (id: number) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ wishlistItems, onRemoveFromWishlist, onAddToCart, onNavigate }) => {
  return (
    <div className="wishlist-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title">My Wishlist</h1>
          <div className="breadcrumb">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a> / <span>Wishlist</span>
          </div>
        </div>
      </div>

      <div className="container">
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-wishlist-icon">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#eee" strokeWidth="1">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h2>Your wishlist is empty.</h2>
            <p>You haven't added any products to your wishlist yet.</p>
            <button className="btn-primary" onClick={() => onNavigate('shop')}>GO TO SHOP</button>
          </div>
        ) : (
          <div className="wishlist-table-container">
            <table className="wishlist-table">
              <thead>
                <tr>
                  <th className="remove-col"></th>
                  <th className="product-img-col"></th>
                  <th className="product-name-col">Product Name</th>
                  <th className="unit-price-col">Unit Price</th>
                  <th className="stock-status-col">Stock Status</th>
                  <th className="action-col"></th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((product) => (
                  <tr key={product.id}>
                    <td className="remove-cell">
                      <button className="remove-btn" onClick={() => onRemoveFromWishlist(product.id)}>×</button>
                    </td>
                    <td className="product-img-cell">
                      <div className="wishlist-product-img">
                        <img src={product.image} alt={product.name} />
                      </div>
                    </td>
                    <td className="product-name-cell">
                      <h4 className="wishlist-product-name" onClick={() => onNavigate(`product-${product.id}`)}>{product.name}</h4>
                    </td>
                    <td className="unit-price-cell">
                      Ksh. {product.price.toLocaleString()}
                    </td>
                    <td className="stock-status-cell">
                      <span className="stock-in">In Stock</span>
                    </td>
                    <td className="action-cell">
                      <button className="btn-primary btn-small" onClick={() => onAddToCart(product)}>
                        ADD TO CART
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
