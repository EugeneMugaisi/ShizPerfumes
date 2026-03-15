import React from 'react';
import '../styles/Header.css';

interface HeaderProps {
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  return (
    <header className="main-header">
      <div className="container header-container">
        <div className="header-left">
          {/* Grid icon and navigation removed */}
        </div>

        <div className="header-center">
          <h1 className="logo">SHIZ PERFUMES.</h1>
        </div>

        <div className="header-right">
          <nav className="nav-right">
            <ul>
              <li><a href="#">SHOP <span className="arrow">▼</span></a></li>
              <li><a href="#">CONTACTS</a></li>
            </ul>
          </nav>
          <div className="header-icons">
            <button className="icon-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button className="icon-btn" aria-label="Favorites">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <button className="icon-btn cart-btn" aria-label="Shopping Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="cart-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
