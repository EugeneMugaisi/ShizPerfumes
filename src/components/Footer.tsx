import React from 'react';
import '../styles/Footer.css';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
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
              <a href="https://www.instagram.com/shizperfumes?igsh=MTA4d2U5YThvbXc2cg==" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@shizperfumes?_r=1&_t=ZS-94sUZdSYVKk" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div className="footer-column footer-links">
            <h3>Shop</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('shop'); }}>Best Sellers</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('shop'); }}>New Arrivals</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('shop'); }}>Men's Fragrance</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('shop'); }}>Women's Fragrance</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('shop'); }}>Luxury Series</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-column footer-links">
            <h3>Support</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>About Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contacts'); }}>Contact Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Terms of Service</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Shipping & Returns</a></li>
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
