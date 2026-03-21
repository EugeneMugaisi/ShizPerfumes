import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';

const slides = [
  {
    id: 1,
    subtitle: 'Hot Gift',
    title: 'A Little Surprise',
    description: 'Electric ray demoiselle squeaker unicorn fish Kafue pike bango temperate ocean-bass, yellow bass coffinfish yellowfin customers.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop',
    color: 'var(--bg-secondary)'
  },
  {
    id: 2,
    subtitle: 'Luxury Scents',
    title: 'Essence of Elegance',
    description: 'Discover our exclusive collection of premium fragrances crafted with the finest ingredients from around the world.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop',
    color: 'var(--bg-secondary)'
  },
  {
    id: 3,
    subtitle: 'New Arrival',
    title: 'Midnight Bloom',
    description: 'Experience the mystery of the night with our latest floral masterpiece. A scent that lingers and captivates the senses.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
    color: 'var(--bg-secondary)'
  }
];

interface HeroProps {
  onNavigate: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  const slide = slides[currentSlide];

  return (
    <section className="hero">
      <div className="hero-slides-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className="hero-slide" 
            style={{ backgroundColor: slide.color }}
          >
            <div className="hero-container container">
              <div className="hero-content">
                <div className="hero-image-wrapper">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className={`hero-perfume-img ${index === currentSlide ? 'animate-in' : ''}`}
                  />
                </div>
                <div className="hero-text">
                  <span className={`hero-subtitle ${index === currentSlide ? 'animate-in-up' : ''}`}>{slide.subtitle}</span>
                  <h2 className={`hero-title ${index === currentSlide ? 'animate-in-up delay-1' : ''}`}>{slide.title}</h2>
                  <p className={`hero-description ${index === currentSlide ? 'animate-in-up delay-2' : ''}`}>
                    {slide.description}
                  </p>
                  <button 
                    className={`btn-primary ${index === currentSlide ? 'animate-in-up delay-3' : ''}`}
                    onClick={() => onNavigate('shop')}
                  >
                    DISCOVER
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="hero-nav hero-nav-prev" onClick={prevSlide}>
        <span>PREVIOUS</span>
      </div>
      <div className="hero-nav hero-nav-next" onClick={nextSlide}>
        <span>NEXT</span>
      </div>
    </section>
  );
};

export default Hero;
