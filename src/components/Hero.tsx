import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';

const slides = [
  {
    id: 1,
    subtitle: 'New Arrival',
    title: 'Discover Luxury',
    description: 'Explore our latest collection of premium fragrances that define elegance and sophistication.',
    image: '/src/assets/Catalog/23.png',
    color: 'var(--bg-secondary)'
  },
  {
    id: 2,
    subtitle: 'Best Seller',
    title: 'Essence of Beauty',
    description: 'Find your signature scent from our most loved fragrances, curated for every personality.',
    image: '/src/assets/Catalog/2.png',
    color: 'var(--bg-secondary)'
  },
  {
    id: 3,
    subtitle: 'Limited Edition',
    title: 'Timeless Fragrance',
    description: 'Experience the magic of unique blends that captivate the senses and leave a lasting impression.',
    image: '/src/assets/Catalog/25.png',
    color: 'var(--bg-secondary)'
  }
];

// Add clone of first slide for circular animation
const allSlides = [...slides, { ...slides[0], id: 'clone-first' }];

interface HeroProps {
  onNavigate: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [useTransition, setUseTransition] = useState(true);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setUseTransition(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setUseTransition(true);
    if (currentSlide === 0) {
      // jump to clone-end without transition then slide to last
      setUseTransition(false);
      setCurrentSlide(slides.length);
      setTimeout(() => {
        setUseTransition(true);
        setCurrentSlide(slides.length - 1);
      }, 20);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (currentSlide === slides.length) {
      // We reached the clone, jump back to real first slide after animation
      const timer = setTimeout(() => {
        setUseTransition(false);
        setCurrentSlide(0);
      }, 1000); // match transition time in CSS
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  return (
    <section className="hero">
      <div 
        className="hero-slides-container" 
        style={{ 
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: useTransition ? 'transform 1s cubic-bezier(0.77, 0, 0.175, 1)' : 'none'
        }}
      >
        {allSlides.map((slide, index) => (
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
                    className={`hero-perfume-img ${index === (currentSlide % slides.length) ? 'animate-in' : ''}`}
                  />
                </div>
                <div className="hero-text">
                  <span className={`hero-subtitle ${index === (currentSlide % slides.length) ? 'animate-in-up' : ''}`}>{slide.subtitle}</span>
                  <h2 className={`hero-title ${index === (currentSlide % slides.length) ? 'animate-in-up delay-1' : ''}`}>{slide.title}</h2>
                  <p className={`hero-description ${index === (currentSlide % slides.length) ? 'animate-in-up delay-2' : ''}`}>
                    {slide.description}
                  </p>
                  <button 
                    className={`btn-primary ${index === (currentSlide % slides.length) ? 'animate-in-up delay-3' : ''}`}
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
