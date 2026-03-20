import React from 'react';
import '../styles/ProductGrid.css';

import { Product as ProductType } from '../data/products';

interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: string;
  oldPrice?: string;
  onSale: boolean;
}

interface ProductGridProps {
  title: string;
  subtitle: string;
  onAddToCart: (product: any) => void;
  onNavigate: (page: string) => void;
  wishlistItems: ProductType[];
  onToggleWishlist: (product: any) => void;
}

const products: Product[] = [
  {
    id: 1,
    name: "Lé Perfume Aroma",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400",
    rating: 4,
    price: "Ksh. 14,500",
    oldPrice: "Ksh. 16,500",
    onSale: true
  },
  {
    id: 2,
    name: "Midnight Rose",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400",
    rating: 5,
    price: "Ksh. 12,000",
    onSale: false
  },
  {
    id: 3,
    name: "Harrel Scent",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400",
    rating: 4,
    price: "Ksh. 10,500",
    oldPrice: "Ksh. 14,000",
    onSale: true
  },
  {
    id: 4,
    name: "Oceanic Mist",
    image: "https://images.unsplash.com/photo-1616948055662-2330a383d22a?auto=format&fit=crop&q=80&w=400",
    rating: 3,
    price: "Ksh. 9,800",
    onSale: false
  },
  {
    id: 5,
    name: "Gold Essence",
    image: "https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&q=80&w=400",
    rating: 5,
    price: "Ksh. 18,500",
    onSale: false
  },
  {
    id: 6,
    name: "Royal Oud",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=400",
    rating: 4,
    price: "Ksh. 17,500",
    onSale: true
  },
  {
    id: 7,
    name: "Night Bloom",
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=400",
    rating: 5,
    price: "Ksh. 19,500",
    onSale: false
  },
  {
    id: 8,
    name: "Velvet Amber",
    image: "https://images.unsplash.com/photo-1557170334-a7c3a4e2ef38?auto=format&fit=crop&q=80&w=400",
    rating: 4,
    price: "Ksh. 16,800",
    onSale: false
  }
];

const ProductGrid: React.FC<ProductGridProps> = ({ title, subtitle, onAddToCart, onNavigate, wishlistItems, onToggleWishlist }) => {
  const isLiked = (id: number) => wishlistItems.some(item => item.id === id);

  return (
    <section className="product-grid-section">
      <div className="container">
        <div className="section-title">
          <span>{subtitle}</span>
          <h2>{title}</h2>
          <p>The stylish and organized cosmetic products</p>
        </div>
        
        <div className="products-container">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => onNavigate(`product-${product.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-image-wrapper">
                {product.onSale && <div className="sale-badge">SALE</div>}
                <div 
                  className={`wishlist-btn ${isLiked(product.id) ? 'liked' : ''}`}
                  onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
                >
                  ♡
                </div>
                <img src={product.image} alt={product.name} />
              </div>
              
              <div className="product-rating">
                {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
              </div>
              <h3 className="product-name">{product.name}</h3>
              
              <div className="product-footer">
                <button className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
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
      </div>
    </section>
  );
};

export default ProductGrid;
