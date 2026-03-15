import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-column footer-about">
            <h3>ShizPerfumes</h3>
            <p>
              Experience the art of luxury fragrance. We curate the world's most 
              extraordinary scents to help you find your unique olfactory identity.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon">FB</a>
              <a href="#" className="social-icon">TW</a>
              <a href="#" className="social-icon">IG</a>
              <a href="#" className="social-icon">PI</a>
            </div>
          </div>

          {/* Shop Categories */}
          <div className="footer-column footer-links">
            <h3>Shop</h3>
            <ul>
              <li><a href="#">Best Sellers</a></li>
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Men's Fragrance</a></li>
              <li><a href="#">Women's Fragrance</a></li>
              <li><a href="#">Luxury Series</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-column footer-links">
            <h3>Support</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Shipping & Returns</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()} ShizPerfumes. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
