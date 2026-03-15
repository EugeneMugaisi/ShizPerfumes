import React from 'react';
import '../styles/Gallery.css';

const Gallery: React.FC = () => {
  const galleryItems = [
    { id: 1, title: 'Summer Collection', image: 'https://images.unsplash.com/photo-1541604193435-225878994a21?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Elegant Scents', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Floral Notes', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Citrus Bliss', image: 'https://images.unsplash.com/photo-1557170334-a7c3a4e2ef38?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Luxury Series', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Night Out', image: 'https://images.unsplash.com/photo-1616984268282-552424b225d7?auto=format&fit=crop&q=80&w=800' },
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
