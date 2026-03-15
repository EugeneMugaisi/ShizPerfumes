import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';

const slides = [
  {
    id: 1,
    subtitle: 'Hot Gift',
    title: 'A Little Surprise',
    description: 'Electric ray demoiselle squeaker unicorn fish Kafue pike bango temperate ocean-bass, yellow bass coffinfish yellowfin customers.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop',
    color: '#f4f7f6'
  },
  {
    id: 2,
    subtitle: 'Luxury Scents',
    title: 'Essence of Elegance',
    description: 'Discover our exclusive collection of premium fragrances crafted with the finest ingredients from around the world.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop',
    color: '#f9f4f0'
  },
  {
    id: 3,
    subtitle: 'New Arrival',
    title: 'Midnight Bloom',
    description: 'Experience the mystery of the night with our latest floral masterpiece. A scent that lingers and captivates the senses.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
    color: '#f0f4f9'
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <section className="hero" style={{ backgroundColor: slide.color }}>
      <div className="hero-container container">
        <div className={`hero-content ${isAnimating ? 'slide-changing' : ''}`} key={currentSlide}>
          <div className="hero-image-wrapper">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="hero-perfume-img animate-in"
            />
          </div>
          <div className="hero-text">
            <span className="hero-subtitle animate-in-up">{slide.subtitle}</span>
            <h2 className="hero-title animate-in-up delay-1">{slide.title}</h2>
            <p className="hero-description animate-in-up delay-2">
              {slide.description}
            </p>
            <button className="btn-primary animate-in-up delay-3">DISCOVER</button>
          </div>
        </div>
      </div>
      
      <div className="hero-nav hero-nav-prev" onClick={prevSlide}>
        <span>PREVIOUS</span>
      </div>
      <div className="hero-nav hero-nav-next" onClick={nextSlide}>
        <span>NEXT</span>
      </div>

      <div className="hero-pagination">
        {slides.map((_, index) => (
          <div 
            key={index} 
            className={`pagination-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
