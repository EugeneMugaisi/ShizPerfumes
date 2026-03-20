import React from 'react';
import '../styles/Contacts.css';

interface ContactsProps {
  onNavigate: (page: string) => void;
}

const Contacts: React.FC<ContactsProps> = ({ onNavigate }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
  };

  return (
    <div className="contacts-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title">Contact Us</h1>
          <div className="breadcrumb">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a> / <span>Contact Us</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="contacts-container">
          <div className="contact-info-section">
            <div className="info-block">
              <span className="info-subtitle">Get in touch</span>
              <h2 className="info-title">Visit Our Store</h2>
              <p className="info-desc">Our showroom is located in the heart of the city. Come experience our full collection in person.</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-text">
                    <h4>Location</h4>
                    <p>123 Fragrance Avenue, Nairobi, Kenya</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-text">
                    <h4>Phone</h4>
                    <p>+254 712 345 678</p>
                    <p>+254 798 765 432</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <p>hello@shizperfumes.com</p>
                    <p>support@shizperfumes.com</p>
                  </div>
                </div>
              </div>

              <div className="opening-hours">
                <h3>Opening Hours</h3>
                <div className="hours-row">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="hours-row">
                  <span>Saturday</span>
                  <span>10:00 AM - 5:00 PM</span>
                </div>
                <div className="hours-row">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <div className="form-card">
              <h2 className="form-title">Send us a message</h2>
              <p>Have a question or feedback? We'd love to hear from you.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" placeholder="John Doe" required />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="john@example.com" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" placeholder="How can we help?" required />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" placeholder="Write your message here..." required></textarea>
                </div>

                <button type="submit" className="btn-primary submit-btn">
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
