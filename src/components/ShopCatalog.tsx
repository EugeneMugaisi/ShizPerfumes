import React, { useState, useEffect } from 'react';
import { products, categories, Product } from '../data/products';
import '../styles/ShopCatalog.css';

interface ShopCatalogProps {
  onAddToCart: () => void;
  onNavigate: (page: string) => void;
}

const ShopCatalog: React.FC<ShopCatalogProps> = ({ onAddToCart, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [priceRange, setPriceRange] = useState(30000);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    let result = products;
    
    if (selectedCategory !== "All Products") {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    result = result.filter(p => p.price <= priceRange);

    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [selectedCategory, priceRange, searchTerm]); // Add searchTerm to dependency array

  const toggleLike = (id: number) => {
    setLikedProducts(prev => 
      prev.includes(id) ? prev.filter(productId => productId !== id) : [...prev, id]
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="shop-catalog-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title">Shop Catalog</h1>
          <div className="breadcrumb">
            <a href="/" onClick={() => onNavigate('home')}>Home</a> / <span>Shop Catalog</span>
          </div>
        </div>
      </div>

      <div className="container catalog-container">
        <aside className="catalog-sidebar">
          <div className="filter-section">
            <h3 className="filter-title">Product Categories</h3>
            <ul className="category-list">
              {categories.map(category => (
                <li 
                  key={category} 
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                  <span className="count">
                    ({category === "All Products" 
                      ? products.length 
                      : products.filter(p => p.category === category).length})
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Filter by Price</h3>
            <div className="price-filter">
              <input 
                type="range" 
                min="0" 
                max="30000" 
                step="500" 
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="price-slider"
              />
              <div className="price-labels">
                <span>Ksh. 0</span>
                <span>Ksh. {priceRange.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Popular Tags</h3>
            <div className="tags-container">
              <span className="tag">Perfume</span>
              <span className="tag">New</span>
              <span className="tag">Trending</span>
              <span className="tag">Sale</span>
              <span className="tag">Luxury</span>
            </div>
          </div>
        </aside>

        <main className="catalog-main">
          <div className="catalog-results-info">
            <p>Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} results</p>
            <div className="catalog-actions"> {/* New div to group sorting and search */}
              <div className="catalog-sorting">
                <select>
                  <option>Default Sorting</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                </select>
              </div>
              <div className="catalog-search">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="catalog-products-grid">
            {currentProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  {product.onSale && <div className="sale-badge">SALE</div>}
                  {product.isNew && <div className="sale-badge new-badge">NEW</div>}
                  <div 
                    className={`wishlist-btn ${likedProducts.includes(product.id) ? 'liked' : ''}`}
                    onClick={() => toggleLike(product.id)}
                  >
                    {likedProducts.includes(product.id) ? '♥' : '♡'}
                  </div>
                  <img src={product.image} alt={product.name} />
                </div>
                
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                  </div>
                  <div className="product-footer">
                    <div className="product-price">
                      {product.oldPrice && <span className="old-price">Ksh. {product.oldPrice.toLocaleString()}</span>}
                      <span className="current-price">Ksh. {product.price.toLocaleString()}</span>
                    </div>
                    <button className="add-to-cart-btn" onClick={() => onAddToCart()}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <p>No products found matching your criteria.</p>
              <button className="btn-primary" onClick={() => { setSelectedCategory("All Products"); setPriceRange(30000); setSearchTerm(""); }}>
                Clear Filters
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i + 1} 
                  onClick={() => paginate(i + 1)} 
                  className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopCatalog;

  const toggleLike = (id: number) => {
    setLikedProducts(prev => 
      prev.includes(id) ? prev.filter(productId => productId !== id) : [...prev, id]
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="shop-catalog-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title">Shop Catalog</h1>
          <div className="breadcrumb">
            <a href="/" onClick={() => onNavigate('home')}>Home</a> / <span>Shop Catalog</span>
          </div>
        </div>
      </div>

      <div className="container catalog-container">
        <aside className="catalog-sidebar">
          <div className="filter-section">
            <h3 className="filter-title">Product Categories</h3>
            <ul className="category-list">
              {categories.map(category => (
                <li 
                  key={category} 
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                  <span className="count">
                    ({category === "All Products" 
                      ? products.length 
                      : products.filter(p => p.category === category).length})
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Filter by Price</h3>
            <div className="price-filter">
              <input 
                type="range" 
                min="0" 
                max="30000" 
                step="500" 
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="price-slider"
              />
              <div className="price-labels">
                <span>Ksh. 0</span>
                <span>Ksh. {priceRange.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Popular Tags</h3>
            <div className="tags-container">
              <span className="tag">Perfume</span>
              <span className="tag">New</span>
              <span className="tag">Trending</span>
              <span className="tag">Sale</span>
              <span className="tag">Luxury</span>
            </div>
          </div>
        </aside>

        <main className="catalog-main">
          <div className="catalog-results-info">
            <p>Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} results</p>
            <div className="catalog-sorting">
              <select>
                <option>Default Sorting</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
              </select>
            </div>
          </div>

          <div className="catalog-products-grid">
            {currentProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  {product.onSale && <div className="sale-badge">SALE</div>}
                  {product.isNew && <div className="sale-badge new-badge">NEW</div>}
                  <div 
                    className={`wishlist-btn ${likedProducts.includes(product.id) ? 'liked' : ''}`}
                    onClick={() => toggleLike(product.id)}
                  >
                    {likedProducts.includes(product.id) ? '♥' : '♡'}
                  </div>
                  <img src={product.image} alt={product.name} />
                </div>
                
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                  </div>
                  <div className="product-footer">
                    <div className="product-price">
                      {product.oldPrice && <span className="old-price">Ksh. {product.oldPrice.toLocaleString()}</span>}
                      <span className="current-price">Ksh. {product.price.toLocaleString()}</span>
                    </div>
                    <button className="add-to-cart-btn" onClick={() => onAddToCart()}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <p>No products found matching your criteria.</p>
              <button className="btn-primary" onClick={() => { setSelectedCategory("All Products"); setPriceRange(30000); }}>
                Clear Filters
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i + 1} 
                  onClick={() => paginate(i + 1)} 
                  className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopCatalog;
