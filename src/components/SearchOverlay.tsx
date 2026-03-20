import React, { useState, useEffect } from 'react';
import { products, Product } from '../data/products';
import '../styles/SearchOverlay.css';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Limit to top 5 results

    setSearchResults(results);
  }, [searchTerm]);

  if (!isOpen) return null;

  const handleResultClick = (productId: number) => {
    onNavigate(`product-${productId}`);
    onClose();
    setSearchTerm('');
  };

  return (
    <div className={`search-overlay ${isOpen ? 'open' : ''}`}>
      <div className="search-overlay-inner">
        <button className="close-search" onClick={onClose}>×</button>
        
        <div className="search-container">
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <div className="search-results">
            {searchResults.length > 0 ? (
              <div className="results-list">
                <h3>Product Results</h3>
                {searchResults.map(product => (
                  <div 
                    key={product.id} 
                    className="search-result-item"
                    onClick={() => handleResultClick(product.id)}
                  >
                    <div className="result-img">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="result-details">
                      <h4>{product.name}</h4>
                      <span className="result-cat">{product.category}</span>
                      <span className="result-price">Ksh. {product.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                <button 
                  className="view-all-results" 
                  onClick={() => { onNavigate('shop'); onClose(); }}
                >
                  View all results
                </button>
              </div>
            ) : searchTerm.trim() !== '' ? (
              <div className="no-results-msg">
                No products found matching "{searchTerm}"
              </div>
            ) : (
              <div className="popular-searches">
                <h3>Popular Searches</h3>
                <div className="popular-tags">
                  <span onClick={() => setSearchTerm('Floral')}>Floral</span>
                  <span onClick={() => setSearchTerm('Woody')}>Woody</span>
                  <span onClick={() => setSearchTerm('Gift Sets')}>Gift Sets</span>
                  <span onClick={() => setSearchTerm('Oud')}>Oud</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
