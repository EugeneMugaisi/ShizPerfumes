import React, { useState } from 'react';
import { Product } from '../data/products';
import '../styles/Checkout.css';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CheckoutProps {
  cartItems: CartItem[];
  onNavigate: (page: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onNavigate }) => {
  const [paymentMethod, setPaymentMethod] = useState('bank');
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 500 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order placed successfully! Thank you for shopping with Shiz Perfumes.');
    onNavigate('home');
  };

  return (
    <div className="checkout-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title">Checkout</h1>
          <div className="breadcrumb">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a> / 
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('cart'); }}>Cart</a> / 
            <span>Checkout</span>
          </div>
        </div>
      </div>

      <div className="container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-content">
            <div className="billing-details">
              <h2 className="checkout-section-title">Billing Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input type="text" id="firstName" required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input type="text" id="lastName" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="company">Company Name (Optional)</label>
                <input type="text" id="company" />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country / Region *</label>
                <select id="country" required>
                  <option value="Kenya">Kenya</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Rwanda">Rwanda</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="address">Street Address *</label>
                <input type="text" id="address" placeholder="House number and street name" required />
                <input type="text" className="mt-10" placeholder="Apartment, suite, unit, etc. (optional)" />
              </div>

              <div className="form-group">
                <label htmlFor="city">Town / City *</label>
                <input type="text" id="city" required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input type="tel" id="phone" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" required />
              </div>

              <div className="form-group checkbox-group">
                <input type="checkbox" id="createAccount" />
                <label htmlFor="createAccount">Create an account?</label>
              </div>

              <h2 className="checkout-section-title mt-40">Additional Information</h2>
              <div className="form-group">
                <label htmlFor="notes">Order Notes (Optional)</label>
                <textarea id="notes" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
              </div>
            </div>

            <div className="order-review">
              <div className="order-summary-card">
                <h2 className="checkout-section-title">Your Order</h2>
                <div className="order-table-header">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>
                
                <div className="order-items-list">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="order-item">
                      <span className="order-item-name">
                        {item.product.name} <strong className="product-qty">× {item.quantity}</strong>
                      </span>
                      <span className="order-item-price">
                        Ksh. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-summary-footer">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>Ksh. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="summary-line">
                    <span>Shipping</span>
                    <span>Ksh. {shipping.toLocaleString()}</span>
                  </div>
                  <div className="summary-line total-line">
                    <span>Total</span>
                    <span className="total-amount">Ksh. {total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="payment-methods">
                  <div className="payment-option">
                    <input 
                      type="radio" 
                      id="bank" 
                      name="payment" 
                      value="bank" 
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                    />
                    <label htmlFor="bank">Direct Bank Transfer</label>
                    {paymentMethod === 'bank' && (
                      <div className="payment-description">
                        Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                      </div>
                    )}
                  </div>

                  <div className="payment-option">
                    <input 
                      type="radio" 
                      id="cod" 
                      name="payment" 
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <label htmlFor="cod">Cash on Delivery</label>
                    {paymentMethod === 'cod' && (
                      <div className="payment-description">
                        Pay with cash upon delivery of your products.
                      </div>
                    )}
                  </div>

                  <div className="payment-option">
                    <input 
                      type="radio" 
                      id="mpesa" 
                      name="payment" 
                      value="mpesa"
                      checked={paymentMethod === 'mpesa'}
                      onChange={() => setPaymentMethod('mpesa')}
                    />
                    <label htmlFor="mpesa">Lipa na M-Pesa</label>
                    {paymentMethod === 'mpesa' && (
                      <div className="payment-description">
                        Pay using M-Pesa. A prompt will be sent to your phone.
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn-primary place-order-btn">
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
