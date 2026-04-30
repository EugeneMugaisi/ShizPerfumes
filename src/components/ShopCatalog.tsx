import React, { useState, useEffect } from 'react';
import { Product, categories } from '../data/products';
import '../styles/ShopCatalog.css';

interface ShopCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string) => void;
  wishlistItems: Product[];
  onToggleWishlist: (product: Product) => void;
  initialFilter?: string;
}

const ShopCatalog: React.FC<ShopCatalogProps> = ({ products, onAddToCart, onNavigate, wishlistItems, onToggleWishlist, initialFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [priceRange, setPriceRange] = useState(50000);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [sortBy, setSortBy] = useState("Default Sorting");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    if (initialFilter) {
      if (initialFilter === 'best-sellers') {
        setSortBy("Rating: High to Low");
      } else if (initialFilter === 'new-arrivals') {
        setSelectedTag("New");
      } else if (initialFilter === 'men') {
        // Handled in main useEffect
      } else if (initialFilter === 'women') {
        // Handled in main useEffect
      } else if (initialFilter === 'luxury') {
        setSelectedTag("Luxury");
      }
    }
  }, [initialFilter]);

  useEffect(() => {
    let result = [...products];
    
    if (selectedCategory !== "All Products") {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (initialFilter) {
      if (initialFilter === 'new-arrivals') {
        result = result.filter(p => p.isNew);
      } else if (initialFilter === 'men') {
        result = result.filter(p => p.scentType === 'Masculine');
      } else if (initialFilter === 'women') {
        result = result.filter(p => p.scentType === 'Feminine');
      } else if (initialFilter === 'luxury') {
        result = result.filter(p => p.price > 20000);
      }
    }

    if (selectedTag) {
      if (selectedTag === "New") {
        result = result.filter(p => p.isNew);
      } else if (selectedTag === "Sale") {
        result = result.filter(p => p.onSale);
      } else if (selectedTag === "Luxury") {
        result = result.filter(p => p.price > 20000);
      } else if (selectedTag === "Trending") {
        result = result.filter(p => p.rating >= 4);
      }
      // "Perfume" tag essentially shows all or could be used as a reset
    }
    
    result = result.filter(p => p.price <= priceRange);

    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply Sorting
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Rating: High to Low") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Rating: Low to High") {
      result.sort((a, b) => a.rating - b.rating);
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [selectedCategory, priceRange, searchTerm, sortBy, initialFilter, products, selectedTag]); // Add sortBy to dependency array

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const isLiked = (id: number) => wishlistItems.some(item => item.id === id);

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
                  onClick={() => {
                    setSelectedCategory(category);
                    if (initialFilter) onNavigate('shop');
                  }}
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
                max="50000" 
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
              {["Perfume", "New", "Trending", "Sale", "Luxury"].map(tag => (
                <span 
                  key={tag} 
                  className={`tag ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => {
                    if (tag === "Perfume") {
                      setSelectedTag(null);
                      setSelectedCategory("All Products");
                      onNavigate('shop');
                    } else {
                      setSelectedTag(tag === selectedTag ? null : tag);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">New Arrivals</h3>
            <div className="new-arrivals-sidebar">
              {products.filter(p => p.isNew).slice(0, 3).map(product => (
                <div 
                  key={product.id} 
                  className="sidebar-product"
                  onClick={() => onNavigate(`product-${product.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="sidebar-product-img">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="sidebar-product-info">
                    <h4 className="sidebar-product-name">{product.name}</h4>
                    <div className="sidebar-product-rating">
                      {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                    </div>
                    <div className="sidebar-product-price">
                      Ksh. {product.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="catalog-main">
          <div className="catalog-results-info">
            <p>Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} results</p>
            <div className="catalog-actions"> {/* New div to group sorting and search */}
              <div className="catalog-sorting">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option>Default Sorting</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                  <option>Rating: Low to High</option>
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
              <div 
                key={product.id} 
                className="product-card" 
                onClick={() => onNavigate(`product-${product.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="product-image-wrapper">
                  {product.onSale && <div className="sale-badge">SALE</div>}
                  {product.isNew && <div className="sale-badge new-badge">NEW</div>}
                  <div 
                    className={`wishlist-btn ${isLiked(product.id) ? 'liked' : ''}`}
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
                  >
                    ♡
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
                      <span className="current-price">
                        {product.sizes && product.sizes.length > 0 
                          ? `From Ksh. ${Math.min(...product.sizes.map(s => s.price)).toLocaleString()}`
                          : `Ksh. ${product.price.toLocaleString()}`
                        }
                      </span>
                    </div>
                    <button className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
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
              <button className="btn-primary" onClick={() => { setSelectedCategory("All Products"); setPriceRange(50000); setSearchTerm(""); setSelectedTag(null); onNavigate('shop'); }}>
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
