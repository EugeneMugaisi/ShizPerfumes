import React from 'react';
import { Product } from '../data/products';
import '../styles/Cart.css';

interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedPrice?: number;
}

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, delta: number, selectedSize?: string) => void;
  onRemoveItem: (id: number, selectedSize?: string) => void;
  onNavigate: (page: string) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onUpdateQuantity, onRemoveItem, onNavigate }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + ((item.selectedPrice || item.product.price) * item.quantity), 0);
  const total = subtotal;

  return (
    <div className="cart-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title">Shopping Cart</h1>
          <div className="breadcrumb">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a> / <span>Cart</span>
          </div>
        </div>
      </div>

      <div className="container">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
               <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="var(--border-color)" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <h2>Your cart is currently empty.</h2>
            <p>Looks like you hasn't made your choice yet.</p>
            <button className="btn-primary" onClick={() => onNavigate('shop')}>RETURN TO SHOP</button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-table-container">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th className="product-col">Product</th>
                    <th className="price-col">Price</th>
                    <th className="quantity-col">Quantity</th>
                    <th className="subtotal-col">Subtotal</th>
                    <th className="remove-col"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={`${item.product.id}-${item.selectedSize || index}`}>
                      <td className="product-cell">
                        <div className="cart-product-info">
                          <div className="cart-product-img">
                            <img src={item.product.image} alt={item.product.name} />
                          </div>
                          <div>
                            <h4 className="cart-product-name" onClick={() => onNavigate(`product-${item.product.id}`)}>{item.product.name}</h4>
                            <span className="cart-product-cat">{item.product.category}</span>
                            {item.selectedSize && <div className="cart-product-size">Size: {item.selectedSize}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="price-cell">Ksh. {(item.selectedPrice || item.product.price).toLocaleString()}</td>
                      <td className="quantity-cell">
                        <div className="quantity-selector cart-qty">
                          <button onClick={() => onUpdateQuantity(item.product.id, -1, item.selectedSize)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.product.id, 1, item.selectedSize)}>+</button>
                        </div>
                      </td>
                      <td className="subtotal-cell">Ksh. {((item.selectedPrice || item.product.price) * item.quantity).toLocaleString()}</td>
                      <td className="remove-cell">
                        <button className="remove-btn" onClick={() => onRemoveItem(item.product.id, item.selectedSize)}>×</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="cart-actions-row">
                <div className="coupon-section">
                  <input type="text" placeholder="Coupon code" />
                  <button className="btn-secondary">APPLY COUPON</button>
                </div>
                <button className="btn-secondary update-cart-btn">UPDATE CART</button>
              </div>
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Cart Totals</h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>Ksh. {subtotal.toLocaleString()}</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>Ksh. {total.toLocaleString()}</span>
                </div>
                <button className="btn-primary checkout-btn" onClick={() => onNavigate('checkout')}>
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
