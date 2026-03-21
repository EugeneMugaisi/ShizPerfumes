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
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import MyAccount from './components/MyAccount';
import Wishlist from './components/Wishlist';
import FragranceFinder from './components/FragranceFinder';
import GiftSets from './components/GiftSets';
import SearchOverlay from './components/SearchOverlay';
import Contacts from './components/Contacts';
import LoadingScreen from './components/LoadingScreen';
import { products } from './data/products';

interface CartItem {
  product: any;
  quantity: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (product: any) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    if (currentPage === 'home') {
      return (
        <>
          <Hero onNavigate={navigateTo} />
          <PromoCards onNavigate={navigateTo} />
          <FragranceTypes />
          <AboutSection onNavigate={navigateTo} />
          <CTABanner onNavigate={navigateTo} />
          <ProductGrid 
            title="Best Sellers Products" 
            subtitle="Best products" 
            onAddToCart={addToCart} 
            onNavigate={navigateTo}
            wishlistItems={wishlistItems}
            onToggleWishlist={toggleWishlist}
          />
          <SaleBanner onNavigate={navigateTo} />
          <FeatureSection onNavigate={navigateTo} />
          <Gallery />
          <NewArrivals 
            onAddToCart={addToCart} 
            wishlistItems={wishlistItems}
            onToggleWishlist={toggleWishlist}
            onNavigate={navigateTo}
          />
          <Testimonials />
        </>
      );
    } else if (currentPage === 'shop') {
      return (
        <ShopCatalog 
          onAddToCart={addToCart} 
          onNavigate={navigateTo} 
          wishlistItems={wishlistItems}
          onToggleWishlist={toggleWishlist}
        />
      );
    } else if (currentPage === 'cart') {
      return <Cart cartItems={cartItems} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} onNavigate={navigateTo} />;
    } else if (currentPage === 'checkout') {
      return <Checkout cartItems={cartItems} onNavigate={navigateTo} />;
    } else if (currentPage === 'account') {
      return <MyAccount onNavigate={navigateTo} />;
    } else if (currentPage === 'wishlist') {
      return (
        <Wishlist 
          wishlistItems={wishlistItems} 
          onRemoveFromWishlist={removeFromWishlist} 
          onAddToCart={addToCart} 
          onNavigate={navigateTo} 
        />
      );
    } else if (currentPage === 'finder') {
      return <FragranceFinder onNavigate={navigateTo} />;
    } else if (currentPage === 'giftsets') {
      return (
        <GiftSets 
          onAddToCart={addToCart} 
          onNavigate={navigateTo} 
          wishlistItems={wishlistItems}
          onToggleWishlist={toggleWishlist}
        />
      );
    } else if (currentPage === 'contacts') {
      return <Contacts onNavigate={navigateTo} />;
    } else if (currentPage.startsWith('product-')) {
      const productId = parseInt(currentPage.replace('product-', ''));
      const product = products.find(p => p.id === productId);
      if (product) {
        const relatedProducts = products
          .filter(p => p.category === product.category && p.id !== product.id)
          .slice(0, 4);
        return (
          <ProductDetail 
            product={product} 
            onAddToCart={() => addToCart(product)} 
            onNavigate={navigateTo}
            relatedProducts={relatedProducts}
            wishlistItems={wishlistItems}
            onToggleWishlist={toggleWishlist}
          />
        );
      }
    }
    return (
      <ShopCatalog 
        onAddToCart={addToCart} 
        onNavigate={navigateTo} 
        wishlistItems={wishlistItems}
        onToggleWishlist={toggleWishlist}
      />
    );
  };

  return (
    <div className="App">
      {isLoading && <LoadingScreen />}
      <Header 
        cartCount={cartCount} 
        onNavigate={navigateTo} 
        currentPage={currentPage}
        onSearchOpen={() => setIsSearchOpen(true)}
      />
      <main>
        {renderContent()}
      </main>
      <Footer onNavigate={navigateTo} />
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNavigate={navigateTo}
      />
    </div>
  );
}

export default App;
