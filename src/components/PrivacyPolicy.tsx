import React from 'react';
import '../styles/globals.css';

interface PrivacyPolicyProps {
  onNavigate: (page: string) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  return (
    <div className="privacy-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title">Privacy Policy</h1>
          <div className="breadcrumb">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a> / <span>Privacy Policy</span>
          </div>
        </div>
      </div>

      <div className="container section-padding">
        <div className="legal-content" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          <section style={{ marginBottom: '30px' }}>
            <h2>1. Introduction</h2>
            <p>Welcome to ShizPerfumes. We value your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2>2. The Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul>
              <li><strong>Identity Data:</strong> includes first name, last name.</li>
              <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Financial Data:</strong> includes payment details (processed securely via third-party providers).</li>
              <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2>3. How We Use Your Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul>
              <li>To register you as a new customer.</li>
              <li>To process and deliver your order including managing payments, fees and charges.</li>
              <li>To manage our relationship with you.</li>
              <li>To enable you to partake in a prize draw, competition or complete a survey.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2>4. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2>5. Contact Us</h2>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
            <p>Email: support@shizperfumes.co.ke</p>
            <p>Phone: +254 11 8916154</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
