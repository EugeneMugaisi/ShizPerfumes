import React from 'react';
import '../styles/Gallery.css';

const Gallery: React.FC = () => {
  const galleryItems = [
    { id: 1, title: 'Summer Collection', image: '/src/assets/Catalog/56.png' },
    { id: 2, title: 'Elegant Scents', image: '/src/assets/Catalog/59.png' },
    { id: 3, title: 'Floral Notes', image: '/src/assets/Catalog/58.png' },
    { id: 4, title: 'Citrus Bliss', image: '/src/assets/Catalog/60.png' },
    { id: 5, title: 'Luxury Series', image: '/src/assets/Catalog/61.png' },
    { id: 6, title: 'Night Out', image: '/src/assets/Catalog/63.png' },
  ];

  return (
    <section className="gallery-section">
      <div className="container">
        <div className="section-title">
          <span>Our Lookbook</span>
          <h2>Visual Fragrance Story</h2>
          <p>Discover the essence of our most iconic scents through our visual gallery.</p>
        </div>
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div key={item.id} className="gallery-item">
              <div 
                className="gallery-img-container"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {/* Image placeholder with styling from CSS */}
              </div>
              <div className="gallery-overlay">
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
