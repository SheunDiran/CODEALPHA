import React, { useState, useEffect } from 'react';
import { ScreenId, ViewportMode, SimulationState, ThemeMode, Product, ProductVariant, CartItem, Order } from './types/store';
import { PRODUCTS, SIGNATURE_LOOK, INITIAL_CART_ITEMS, INITIAL_SAVED_PRODUCT_IDS, DEMO_ORDERS } from './data/mockData';
import { ReviewToolbar } from './components/ReviewToolbar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ArchitectureModal } from './components/ArchitectureModal';
import { BagDrawer } from './components/BagDrawer';
import { AppIntroSplash } from './components/AppIntroSplash';

// Screens
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { ShopScreen } from './components/screens/ShopScreen';
import { ProductDetailScreen } from './components/screens/ProductDetailScreen';
import { ShopTheLookScreen } from './components/screens/ShopTheLookScreen';
import { SavedItemsScreen } from './components/screens/SavedItemsScreen';
import { BagScreen } from './components/screens/BagScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { RegisterScreen } from './components/screens/RegisterScreen';
import { CheckoutScreen } from './components/screens/CheckoutScreen';
import { OrderConfirmationScreen } from './components/screens/OrderConfirmationScreen';
import { OrderHistoryScreen } from './components/screens/OrderHistoryScreen';
import { OrderDetailScreen } from './components/screens/OrderDetailScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedOrder, setSelectedOrder] = useState<Order>(DEMO_ORDERS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [savedProductIds, setSavedProductIds] = useState<string[]>(INITIAL_SAVED_PRODUCT_IDS);
  const [orders, setOrders] = useState<Order[]>(DEMO_ORDERS);

  const [isBagDrawerOpen, setIsBagDrawerOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isFromCheckout, setIsFromCheckout] = useState(false);

  // Intro Animated Splash screen state
  const [showIntroSplash, setShowIntroSplash] = useState(() => {
    try {
      return sessionStorage.getItem('diran-intro-seen') !== 'yes';
    } catch {
      return true;
    }
  });

  // Inspector & Simulation controls
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [simulationState, setSimulationState] = useState<SimulationState>('default');
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [isSideBySideTheme, setIsSideBySideTheme] = useState(false);

  // Manage system theme or manual override on root element
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      if (themeMode === 'dark') {
        root.classList.add('dark');
      } else if (themeMode === 'light') {
        root.classList.remove('dark');
      } else {
        if (mediaQuery.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    applyTheme();
    mediaQuery.addEventListener('change', applyTheme);
    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, [themeMode]);

  // Product Selection
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add single variant to bag
  const handleAddToCart = (variant: ProductVariant, product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.variantId === variant.id);
      if (existing) {
        return prev.map((item) =>
          item.variantId === variant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${variant.id}`,
          productId: product.id,
          variantId: variant.id,
          productName: product.name,
          productImage: product.images[0]?.url,
          colorName: variant.colorName,
          size: variant.size,
          unitPriceKobo: variant.priceKobo,
          quantity: 1,
          maxStock: variant.stock
        }
      ];
    });
    setIsBagDrawerOpen(true);
  };

  // Add Shop the Look signature bundle
  const handleAddBundleToBag = (itemsToAdd: { product: Product; variant: ProductVariant }[]) => {
    setCartItems((prev) => {
      let updated = [...prev];
      itemsToAdd.forEach(({ product, variant }) => {
        const existingIndex = updated.findIndex((i) => i.variantId === variant.id);
        if (existingIndex >= 0) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1
          };
        } else {
          updated.push({
            id: `bundle-${Date.now()}-${variant.id}`,
            productId: product.id,
            variantId: variant.id,
            productName: product.name,
            productImage: product.images[0]?.url,
            colorName: variant.colorName,
            size: variant.size,
            unitPriceKobo: variant.priceKobo,
            quantity: 1,
            maxStock: variant.stock
          });
        }
      });
      return updated;
    });
    setIsBagDrawerOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  // Remove Cart Item
  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Toggle Save / Wishlist
  const handleToggleSave = (productId: string) => {
    setSavedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Move saved item to bag
  const handleMoveToBag = (product: Product) => {
    const defaultVar = product.variants[0];
    handleAddToCart(defaultVar, product);
    handleToggleSave(product.id);
  };

  // Order Placement
  const handlePlaceOrder = (orderData: any) => {
    const newRef = `DW-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderReference: newRef,
      createdAt: 'Just now',
      status: 'processing',
      subtotalKobo: orderData.subtotalKobo,
      shippingKobo: orderData.shippingKobo,
      totalKobo: orderData.totalKobo,
      itemCount: orderData.items.length,
      items: orderData.items.map((it: CartItem) => ({
        id: `snap-${it.id}`,
        productId: it.productId,
        variantId: it.variantId,
        productName: it.productName,
        colorName: it.colorName,
        size: it.size,
        priceAtPurchaseKobo: it.unitPriceKobo,
        quantity: it.quantity,
        subtotalKobo: it.unitPriceKobo * it.quantity,
        image: it.productImage
      })),
      shippingAddress: {
        fullName: orderData.fullName,
        street: orderData.street,
        city: orderData.city,
        state: orderData.stateName,
        country: 'Nigeria',
        phone: orderData.phone
      },
      deliveryMethod: orderData.shippingMethod,
      paymentMethod: orderData.paymentMethod
    };

    setOrders([newOrder, ...orders]);
    setSelectedOrder(newOrder);
    setCartItems([]);
    setCurrentScreen('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth
  const handleLoginSuccess = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    if (isFromCheckout) {
      setIsFromCheckout(false);
      setCurrentScreen('checkout');
    } else {
      setCurrentScreen('orders');
    }
  };

  const handleRegisterSuccess = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnterFromIntro = (targetScreen: ScreenId = 'home') => {
    try { sessionStorage.setItem('diran-intro-seen', 'yes'); } catch { /* Storage is optional. */ }
    setShowIntroSplash(false);
    setCurrentScreen(targetScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSimulatedUrl = () => {
    switch (currentScreen) {
      case 'welcome':
        return 'https://diranwears.com/welcome';
      case 'home':
        return 'https://diranwears.com/';
      case 'shop':
        return 'https://diranwears.com/shop?cat=all';
      case 'pdp':
        return `https://diranwears.com/product/${selectedProduct.slug}`;
      case 'look':
        return 'https://diranwears.com/look/lagos-atelier-ensemble';
      case 'saved':
        return 'https://diranwears.com/saved';
      case 'bag':
        return 'https://diranwears.com/bag';
      case 'login':
        return 'https://diranwears.com/login';
      case 'register':
        return 'https://diranwears.com/register';
      case 'checkout':
        return 'https://diranwears.com/checkout';
      case 'confirmation':
        return `https://diranwears.com/order/confirmation/${selectedOrder.orderReference}`;
      case 'orders':
        return 'https://diranwears.com/account/orders';
      case 'order-detail':
        return `https://diranwears.com/account/orders/${selectedOrder.id}`;
      default:
        return 'https://diranwears.com/';
    }
  };

  // Renders the active screen content
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onExplore={() => handleNavigate('home')}
            onDirectShop={() => handleNavigate('shop')}
          />
        );
      case 'home':
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
            simulationState={simulationState}
          />
        );
      case 'shop':
        return (
          <ShopScreen
            onSelectProduct={handleSelectProduct}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
            simulationState={simulationState}
          />
        );
      case 'pdp':
        return (
          <ProductDetailScreen
            product={selectedProduct}
            onBack={() => handleNavigate('shop')}
            onAddToCart={handleAddToCart}
            isSaved={savedProductIds.includes(selectedProduct.id)}
            onToggleSave={handleToggleSave}
            simulationState={simulationState}
            onNavigateToLook={() => handleNavigate('look')}
          />
        );
      case 'look':
        return (
          <ShopTheLookScreen
            onAddBundleToBag={handleAddBundleToBag}
            onNavigate={handleNavigate}
            simulationState={simulationState}
          />
        );
      case 'saved':
        return (
          <SavedItemsScreen
            savedProductIds={savedProductIds}
            onRemoveSave={handleToggleSave}
            onMoveToBag={handleMoveToBag}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            simulationState={simulationState}
          />
        );
      case 'bag':
        return (
          <BagScreen
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            onNavigate={handleNavigate}
            simulationState={simulationState}
          />
        );
      case 'login':
        return (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleNavigate}
            isFromCheckout={isFromCheckout}
            simulationState={simulationState}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onRegisterSuccess={handleRegisterSuccess}
            onNavigate={handleNavigate}
            simulationState={simulationState}
          />
        );
      case 'checkout':
        return (
          <CheckoutScreen
            items={cartItems}
            onPlaceOrder={handlePlaceOrder}
            onNavigate={handleNavigate}
            isLoggedIn={isLoggedIn}
            userEmail={userEmail}
            simulationState={simulationState}
          />
        );
      case 'confirmation':
        return (
          <OrderConfirmationScreen
            order={selectedOrder}
            onNavigate={handleNavigate}
            onSelectOrder={setSelectedOrder}
          />
        );
      case 'orders':
        return (
          <OrderHistoryScreen
            orders={orders}
            onSelectOrder={setSelectedOrder}
            onNavigate={handleNavigate}
            simulationState={simulationState}
          />
        );
      case 'order-detail':
        return (
          <OrderDetailScreen
            order={selectedOrder}
            onBack={() => handleNavigate('orders')}
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
            simulationState={simulationState}
          />
        );
    }
  };

  if (showIntroSplash) return <AppIntroSplash onEnter={handleEnterFromIntro} />;

  return (
    <div className="min-h-screen bg-[#EFECE6] dark:bg-[#0B0A0A] text-[#181716] dark:text-[#E8E4DA] flex flex-col w-full overflow-x-hidden">
      {/* 1. REVIEW & PROTOTYPE INSPECTION TOOLBAR */}
      <ReviewToolbar
        currentScreen={currentScreen}
        onSelectScreen={handleNavigate}
        viewportMode={viewportMode}
        onSelectViewport={setViewportMode}
        simulationState={simulationState}
        onSelectSimulation={setSimulationState}
        themeMode={themeMode}
        onSelectTheme={setThemeMode}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        isSideBySideTheme={isSideBySideTheme}
        onToggleSideBySideTheme={() => setIsSideBySideTheme(!isSideBySideTheme)}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        savedCount={savedProductIds.length}
        onReplayIntro={() => setShowIntroSplash(true)}
      />

      {/* 2. DUAL-THEME SIDE-BY-SIDE REVIEW MODE */}
      {isSideBySideTheme ? (
        <div className="flex-1 p-2 sm:p-4 grid grid-cols-1 xl:grid-cols-2 gap-6 overflow-x-hidden">
          {/* Light Theme Panel */}
          <div className="bg-[#FAF7F2] text-[#181716] border border-[#E8E4DA] rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="px-4 py-2 bg-white border-b border-[#E8E4DA] flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-[#4E563E]">Light Theme (Warm Ivory & Ink)</span>
              <span className="text-neutral-400">prefers-color-scheme: light</span>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[85vh]">
              <Header
                currentScreen={currentScreen}
                onNavigate={handleNavigate}
                cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                savedCount={savedProductIds.length}
                onOpenBag={() => setIsBagDrawerOpen(true)}
                isLoggedIn={isLoggedIn}
                onReplayIntro={() => setShowIntroSplash(true)}
              />
              <main>{renderScreen()}</main>
              {currentScreen !== 'welcome' && <Footer onNavigate={handleNavigate} />}
            </div>
          </div>

          {/* Dark Theme Panel */}
          <div className="dark bg-[#141312] text-[#E8E4DA] border border-[#2A2724] rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="px-4 py-2 bg-[#1A1917] border-b border-[#2A2724] flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-[#9BAA7C]">Dark Theme (Obsidian & Muted Olive)</span>
              <span className="text-neutral-400">prefers-color-scheme: dark</span>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[85vh]">
              <Header
                currentScreen={currentScreen}
                onNavigate={handleNavigate}
                cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                savedCount={savedProductIds.length}
                onOpenBag={() => setIsBagDrawerOpen(true)}
                isLoggedIn={isLoggedIn}
                onReplayIntro={() => setShowIntroSplash(true)}
              />
              <main>{renderScreen()}</main>
              {currentScreen !== 'welcome' && <Footer onNavigate={handleNavigate} />}
            </div>
          </div>
        </div>
      ) : (
        /* 3. DEVICE VIEWPORT STAGING */
        <div className="flex-1 flex flex-col items-center justify-start p-1 sm:p-4 lg:p-6 w-full max-w-full overflow-x-hidden">
          {/* DESKTOP 1440px FRAME */}
          {viewportMode === 'desktop' && (
            <div className="w-full max-w-[1440px] bg-[#FAF7F2] dark:bg-[#141312] border border-[#D8D4CA] dark:border-[#2A2724] shadow-2xl rounded-xl overflow-hidden flex flex-col transition-all">
              {/* Simulated Desktop Browser Chrome Bar */}
              <div className="bg-[#EAE6DD] dark:bg-[#1C1A18] px-4 py-2.5 border-b border-[#D8D4CA] dark:border-[#2A2724] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#E06C75]" />
                  <span className="w-3 h-3 rounded-full bg-[#E5C07B]" />
                  <span className="w-3 h-3 rounded-full bg-[#98C379]" />
                </div>
                <div className="bg-[#FAF7F2] dark:bg-[#141312] border border-[#D8D4CA] dark:border-[#2A2724] rounded px-4 py-1 font-mono text-[11px] text-neutral-600 dark:text-neutral-400 w-1/2 text-center truncate">
                  {getSimulatedUrl()}
                </div>
                <div className="text-[11px] font-mono text-neutral-400">1440 &times; 900</div>
              </div>

              {/* Viewport Content */}
              <div className="flex-1 overflow-y-auto bg-[#FAF7F2] dark:bg-[#141312]">
                <Header
                  currentScreen={currentScreen}
                  onNavigate={handleNavigate}
                  cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                  savedCount={savedProductIds.length}
                  onOpenBag={() => setIsBagDrawerOpen(true)}
                  isLoggedIn={isLoggedIn}
                  onReplayIntro={() => setShowIntroSplash(true)}
                />
                <main>{renderScreen()}</main>
                {currentScreen !== 'welcome' && <Footer onNavigate={handleNavigate} />}
              </div>
            </div>
          )}

          {/* MOBILE 390px IPHONE FRAME */}
          {viewportMode === 'mobile' && (
            <div className="relative my-2 sm:my-4 w-[390px] max-w-full h-[844px] max-h-[90vh] bg-[#FAF7F2] dark:bg-[#141312] border-[8px] sm:border-[10px] border-[#222] rounded-[40px] sm:rounded-[48px] shadow-2xl overflow-hidden flex flex-col ring-1 ring-black/20">
              {/* iPhone Dynamic Island & Status Bar */}
              <div className="h-10 bg-[#FAF7F2] dark:bg-[#141312] shrink-0 flex items-center justify-between px-6 z-30 select-none">
                <span className="text-[11px] font-semibold font-mono text-neutral-700 dark:text-neutral-300">
                  9:41
                </span>
                <div className="w-24 h-4 bg-black rounded-full" />
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-700 dark:text-neutral-300">
                  <span>5G</span>
                  <span className="w-3 h-2 border border-current rounded-sm inline-block" />
                </div>
              </div>

              {/* Mobile Viewport Scroll Area (No horizontal scroll!) */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden smooth-scroll bg-[#FAF7F2] dark:bg-[#141312]">
                <Header
                  currentScreen={currentScreen}
                  onNavigate={handleNavigate}
                  cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                  savedCount={savedProductIds.length}
                  onOpenBag={() => setIsBagDrawerOpen(true)}
                  isLoggedIn={isLoggedIn}
                  onReplayIntro={() => setShowIntroSplash(true)}
                />
                <main>{renderScreen()}</main>
                {currentScreen !== 'welcome' && <Footer onNavigate={handleNavigate} />}
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="h-5 bg-[#FAF7F2] dark:bg-[#141312] shrink-0 flex items-center justify-center">
                <div className="w-32 h-1 bg-black/40 dark:bg-white/40 rounded-full" />
              </div>
            </div>
          )}

          {/* FLUID RESPONSIVE VIEW */}
          {viewportMode === 'responsive' && (
            <div className="w-full bg-[#FAF7F2] dark:bg-[#141312] min-h-screen overflow-x-hidden">
              <Header
                currentScreen={currentScreen}
                onNavigate={handleNavigate}
                cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                savedCount={savedProductIds.length}
                onOpenBag={() => setIsBagDrawerOpen(true)}
                isLoggedIn={isLoggedIn}
                onReplayIntro={() => setShowIntroSplash(true)}
              />
              <main>{renderScreen()}</main>
              {currentScreen !== 'welcome' && <Footer onNavigate={handleNavigate} />}
            </div>
          )}
        </div>
      )}

      {/* 4. SLIDE-OVER BAG DRAWER */}
      <BagDrawer
        isOpen={isBagDrawerOpen}
        onClose={() => setIsBagDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onNavigate={handleNavigate}
      />

      {/* 5. ARCHITECTURAL BLUEPRINT & SPECS MODAL */}
      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
    </div>
  );
}
