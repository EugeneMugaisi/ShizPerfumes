import React, { useState, useEffect } from 'react';
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
import ShopCatalog from './components/ShopCatalog';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <Header cartCount={cartCount} onNavigate={navigateTo} currentPage={currentPage} />
      <main>
        {currentPage === 'home' ? (
          <>
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
          </>
        ) : (
          <ShopCatalog onAddToCart={addToCart} onNavigate={navigateTo} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
