import React, { useState } from 'react';
import '../styles/ProductGrid.css';
import '../styles/NewArrivals.css';

interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: string;
  oldPrice?: string;
  onSale: boolean;
}

interface NewArrivalsProps {
  onAddToCart: () => void;
}

const newProducts: Product[] = [
  {
    id: 101,
    name: "Golden Sands",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=400",
    rating: 5,
    price: "Ksh. 15,500",
    onSale: false
  },
  {
    id: 102,
    name: "Summer Breeze",
    image: "https://images.unsplash.com/photo-1557170334-a7c3a4e2ef38?auto=format&fit=crop&q=80&w=400",
    rating: 4,
    price: "Ksh. 11,500",
    oldPrice: "Ksh. 13,500",
    onSale: true
  },
  {
    id: 103,
    name: "Oud Royale",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=400",
    rating: 5,
    price: "Ksh. 25,000",
    onSale: false
  }
];

const NewArrivals: React.FC<NewArrivalsProps> = ({ onAddToCart }) => {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedProducts(prev => 
      prev.includes(id) ? prev.filter(productId => productId !== id) : [...prev, id]
    );
  };

  return (
    <section className="product-grid-section new-arrivals-section">
      <div className="container arrivals-container">
        <div className="section-title">
          <span>Latest Additions</span>
          <h2>New Arrivals</h2>
          <p>Experience the season's newest fragrance discoveries</p>
        </div>
        
        <div className="products-container">
          {newProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <div className="sale-badge">NEW</div>
                <div 
                  className={`wishlist-btn ${likedProducts.includes(product.id) ? 'liked' : ''}`}
                  onClick={() => toggleLike(product.id)}
                >
                  {likedProducts.includes(product.id) ? '♥' : '♡'}
                </div>
                <img src={product.image} alt={product.name} />
              </div>
              
              <div className="product-rating">
                {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
              </div>
              <h3 className="product-name">{product.name}</h3>
              
              <div className="product-footer">
                <button className="add-to-cart-btn" onClick={onAddToCart}>
                  ADD TO CART
                </button>
                <div className="product-price">
                  {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
                  <span className="current-price">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-wrapper">
          <a href="/shop" className="btn-primary">VIEW ALL</a>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
