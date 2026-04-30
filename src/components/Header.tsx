import React from 'react';
import '../styles/Header.css';
import logo from '../assets/Logo/ShizPerfumesLogo.png';

import { User } from 'firebase/auth';

interface HeaderProps {
  cartCount: number;
  onNavigate: (page: string) => void;
  onHomeNavigate: () => void;
  currentPage: string;
  onSearchOpen: () => void;
  currentUser?: User | null;
  customerName?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  onNavigate, 
  onHomeNavigate, 
  currentPage, 
  onSearchOpen,
  currentUser,
  customerName 
}) => {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    setIsShopDropdownOpen(false);
  };

  const handleHomeNavigate = () => {
    onHomeNavigate();
    setIsMobileMenuOpen(false);
    setIsShopDropdownOpen(false);
  };

  const handleShopClick = (e: React.MouseEvent) => {
    if (window.innerWidth <= 991) {
      e.preventDefault();
      setIsShopDropdownOpen(!isShopDropdownOpen);
    }
  };

  return (
    <header className="main-header">
      <div className="container header-container">
        <div className="header-left">
          <button 
            className="mobile-menu-toggle" 
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              if (isMobileMenuOpen) setIsShopDropdownOpen(false);
            }}
            aria-label="Toggle Menu"
          >
            <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        <div className="header-center">
          <div className="logo-container" onClick={handleHomeNavigate}>
            <img src={logo} alt="Shiz Perfumes Logo" className="logo-img" />
          </div>
        </div>

        <div className="header-right">
          <nav className={`nav-right ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <ul>
              <li className={currentPage === 'home' ? 'active' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleHomeNavigate(); }}>HOME</a>
              </li>
              <li 
                className={`dropdown-container ${currentPage === 'shop' || currentPage === 'finder' || currentPage === 'giftsets' ? 'active' : ''}`}
              >
                <a href="#" onClick={handleShopClick}>
                  SHOP <span className="arrow">▼</span>
                </a>
                <ul className={`dropdown-menu ${isShopDropdownOpen ? 'show-mobile' : ''}`}>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('shop'); }}>SHOP CATALOG</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('men'); }}>MEN'S FRAGRANCES</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('women'); }}>WOMEN'S FRAGRANCES</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('finder'); }}>FRAGRANCE FINDER</a></li>
                </ul>
              </li>
              <li className={currentPage === 'contacts' ? 'active' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('contacts'); }}>CONTACTS</a>
              </li>
              <li className={`mobile-only ${currentPage === 'cart' ? 'active' : ''}`}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('cart'); }}>
                  CART ({cartCount})
                </a>
              </li>
            </ul>
          </nav>
          <div className="header-icons">
            <button className="icon-btn" aria-label="Search" onClick={onSearchOpen}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button className="icon-btn" aria-label="Favorites" onClick={() => onNavigate('wishlist')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <button className="icon-btn" aria-label="My Account" onClick={() => onNavigate('account')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
            <button className="icon-btn cart-btn" aria-label="Shopping Cart" onClick={() => onNavigate('cart')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
