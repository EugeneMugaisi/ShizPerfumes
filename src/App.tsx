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
import { Product } from './data/products';
import { useProducts } from './hooks/useProducts';
import { SellerAuthProvider } from "./seller/SellerAuthContext";
import ProtectedRoute from "./seller/components/ProtectedRoute";
import SellerDashboard from "./seller/pages/SellerDashboard";

interface CartItem {
  product: Product;
  quantity: number;
}

function App() {
  const { products, loading: productsLoading, seedDatabase } = useProducts();
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('shiz_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlistItems, setWishlistItems] = useState<any[]>(() => {
    const savedWishlist = localStorage.getItem('shiz_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Save to localStorage whenever cart changes
    localStorage.setItem('shiz_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // Save to localStorage whenever wishlist changes
    localStorage.setItem('shiz_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    // Sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'shiz_cart' && e.newValue) {
        setCartItems(JSON.parse(e.newValue));
      }
      if (e.key === 'shiz_wishlist' && e.newValue) {
        setWishlistItems(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check for page in URL query params
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    if (pageParam) {
      setCurrentPage(pageParam);
    }

    // Hide loading screen after 3 seconds minimum
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 3000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearTimeout(timer);
    };
  }, []);

  const isLoading = productsLoading || !isAppReady;

  useEffect(() => {
    // Seed initial data if Firestore is empty
    if (!productsLoading && products.length === 0) {
      seedDatabase();
    }
  }, [productsLoading, products.length, seedDatabase]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (product: Product) => {
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
    const url = window.location.origin + window.location.pathname + (page === 'home' ? '' : '?page=' + page);
    window.history.pushState({}, '', url);
    window.scrollTo(0, 0);
  };

  const handleHomeClick = () => {
    setCurrentPage('home');
    window.history.pushState({}, '', window.location.origin + window.location.pathname);
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
            products={products}
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
          products={products}
          onAddToCart={addToCart} 
          onNavigate={navigateTo} 
          wishlistItems={wishlistItems}
          onToggleWishlist={toggleWishlist}
        />
      );
    } else if (currentPage === 'cart') {
      return <Cart cartItems={cartItems} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} onNavigate={navigateTo} />;
    } else if (currentPage === 'checkout') {
      return <Checkout cartItems={cartItems} onNavigate={navigateTo} onClearCart={() => setCartItems([])} />;
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
        <>
          <GiftSets 
            onAddToCart={addToCart} 
            onNavigate={navigateTo} 
            wishlistItems={wishlistItems}
            onToggleWishlist={toggleWishlist}
          />
        </>
      );
    } else if (currentPage === 'contacts') {
      return <Contacts onNavigate={navigateTo} />;
    } else if (currentPage === 'seller') {
    return (
    <ProtectedRoute>
      <SellerDashboard />
    </ProtectedRoute>
    );
    } else if (currentPage.startsWith('product-'))
    {
      const productId = parseInt(currentPage.replace('product-', ''));
      const product = products.find(p => p.id === productId);
      if (product) {
        const relatedProducts = products
          .filter(p => p.category === product.category && p.id !== product.id)
          .slice(0, 4);
        return (
          <ProductDetail 
            product={product} 
            onAddToCart={addToCart} 
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
        products={products}
        onAddToCart={addToCart} 
        onNavigate={navigateTo} 
        wishlistItems={wishlistItems}
        onToggleWishlist={toggleWishlist}
      />
    );
  };

  return (
    <SellerAuthProvider>
      <div className="App">
        {isLoading && <LoadingScreen />}
        <Header 
          cartCount={cartCount} 
          onNavigate={navigateTo} 
          onHomeNavigate={handleHomeClick}
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
    </SellerAuthProvider>
  );
}

export default App;
