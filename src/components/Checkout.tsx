import React, { useState } from 'react';
import { Product } from '../data/products';
import '../styles/Checkout.css';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed
import { sendOrderConfirmationEmail } from "../seller/services/emailService";
import { useCustomerAuth } from '../context/CustomerAuthContext';

interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedPrice?: number;
}

interface CheckoutProps {
  cartItems: CartItem[];
  onNavigate: (page: string) => void;
  onClearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onNavigate, onClearCart }: CheckoutProps) => {
  const { currentUser } = useCustomerAuth();
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const subtotal = cartItems.reduce((sum, item) => sum + ((item.selectedPrice || item.product.price) * item.quantity), 0);
  const shipping = subtotal > 0 ? 500 : 0;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    
    const orderData = {
      customer: {
          uid: currentUser?.uid || null,
          firstName: formData.get('firstName') as string || '',
          lastName: formData.get('lastName') as string || '',
          email: formData.get('email') as string || '',
          phone: formData.get('phone') as string || '',
          address: formData.get('address') as string || '',
          city: formData.get('city') as string || '',
          country: formData.get('country') as string || '',
        },
      items: cartItems.map(item => ({
        id: item.product.id,
        firebaseId: item.product.firebaseId || null,
        name: item.product.name,
        price: item.selectedPrice || item.product.price,
        size: item.selectedSize || null,
        quantity: item.quantity
      })),
      subtotal,
      shipping,
      total,
      paymentMethod,
      status: 'pending',
      createdAt: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), orderData);

      // Send confirmation email to customer
      await sendOrderConfirmationEmail({
        id: docRef.id,
        customer: orderData.customer,
        items: orderData.items,
        total: orderData.total,
      });

      alert('Order placed successfully! Check your email for confirmation.');

      try {
        onClearCart();
      } catch (cleanupError) {
        console.warn("Cart cleanup issue:", cleanupError);
      }

      onNavigate('home');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('There was an error placing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                  <input type="text" id="firstName" name="firstName" required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input type="text" id="lastName" name="lastName" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="company">Company Name (Optional)</label>
                <input type="text" id="company" name="company" />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country / Region *</label>
                <select id="country" name="country" required>
                  <option value="Kenya">Kenya</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="address">Street Address *</label>
                <input type="text" id="address" name="address" placeholder="House number and street name" required />
                <input type="text" name="address2" className="mt-10" placeholder="Apartment, suite, unit, etc. (optional)" />
              </div>

              <div className="form-group">
                <label htmlFor="city">Town / City *</label>
                <input type="text" id="city" name="city" required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input type="tel" id="phone" name="phone" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" required />
              </div>

              {!currentUser && (
                <div className="form-group checkbox-group">
                  <input type="checkbox" id="createAccount" />
                  <label htmlFor="createAccount">Create an account?</label>
                </div>
              )}

              <h2 className="checkout-section-title mt-40">Additional Information</h2>
              <div className="form-group">
                <label htmlFor="notes">Order Notes (Optional)</label>
                <textarea id="notes" name="notes" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
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
                  {cartItems.map((item, index) => (
                    <div key={`${item.product.id}-${item.selectedSize || index}`} className="order-item">
                      <span className="order-item-name">
                        {item.product.name} {item.selectedSize && `(${item.selectedSize})`} <strong className="product-qty">× {item.quantity}</strong>
                      </span>
                      <span className="order-item-price">
                        Ksh. {((item.selectedPrice || item.product.price) * item.quantity).toLocaleString()}
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

                <button type="submit" className="btn-primary place-order-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'PROCESSING...' : 'PLACE ORDER'}
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
