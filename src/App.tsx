import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PromoCards from './components/PromoCards';
import FragranceTypes from './components/FragranceTypes';
import AboutSection from './components/AboutSection';
import CTABanner from './components/CTABanner';
import ProductGrid from './components/ProductGrid';
import FeatureSection from './components/FeatureSection';
import Gallery from './components/Gallery';
import NewArrivals from './components/NewArrivals';
import SaleBanner from './components/SaleBanner';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="App">
      <Header cartCount={cartCount} />
      <main>
        <Hero />
        <PromoCards />
        <FragranceTypes />
        <AboutSection />
        <CTABanner />
        <ProductGrid title="Best Sellers Products" subtitle="Best products" onAddToCart={addToCart} />
        <SaleBanner />
        <FeatureSection />
        <Gallery />
        <NewArrivals onAddToCart={addToCart} />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
