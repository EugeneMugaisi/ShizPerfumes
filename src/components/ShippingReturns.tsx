import React from 'react';
import '../styles/globals.css';

interface ShippingReturnsProps {
  onNavigate: (page: string) => void;
}

const ShippingReturns: React.FC<ShippingReturnsProps> = ({ onNavigate }) => {
  return (
    <div className="shipping-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title">Shipping & Returns</h1>
          <div className="breadcrumb">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a> / <span>Shipping & Returns</span>
          </div>
        </div>
      </div>

      <div className="container section-padding">
        <div className="legal-content" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Shipping Policy</h2>
            <div style={{ marginTop: '20px' }}>
              <h3>Delivery Locations</h3>
              <p>We currently deliver across all major towns in Kenya, including Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret. For international shipping inquiries, please contact our support team.</p>
              
              <h3 style={{ marginTop: '20px' }}>Shipping Costs</h3>
              <p>A flat rate of <strong>Ksh. 500</strong> is charged for deliveries within Kenya. We may offer free shipping during special promotional periods.</p>
              
              <h3 style={{ marginTop: '20px' }}>Delivery Timelines</h3>
              <ul>
                <li><strong>Nairobi:</strong> 1-2 business days.</li>
                <li><strong>Outside Nairobi:</strong> 2-4 business days.</li>
              </ul>
              <p>Orders placed before 12:00 PM are typically processed the same day.</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Returns & Refunds</h2>
            <div style={{ marginTop: '20px' }}>
              <h3>Return Conditions</h3>
              <p>Due to the nature of our products (fragrances), we only accept returns if:</p>
              <ul>
                <li>The product delivered is incorrect.</li>
                <li>The product was damaged during transit.</li>
                <li>The product is defective.</li>
              </ul>
              <p>The item must be in its original, unopened packaging with all seals intact.</p>
              
              <h3 style={{ marginTop: '20px' }}>Return Process</h3>
              <p>To initiate a return, please contact us within 24 hours of receiving your order at support@shizperfumes.co.ke with your order number and photos of the item.</p>
              
              <h3 style={{ marginTop: '20px' }}>Refunds</h3>
              <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed via your original method of payment or M-Pesa within 5-7 business days.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturns;
