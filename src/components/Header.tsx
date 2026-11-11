import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, Sparkles, Download, Play, Compass, ArrowRight } from 'lucide-react';
import { ScreenId } from '../types/store';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  cartCount: number;
  savedCount: number;
  onOpenBag: () => void;
  isLoggedIn: boolean;
  onReplayIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  savedCount,
  onOpenBag,
  isLoggedIn,
  onReplayIntro
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (screen: ScreenId) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 dark:bg-[#141312]/95 backdrop-blur-md border-b border-[#E8E4DA] dark:border-[#2A2724] transition-colors w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-6">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="text-lg sm:text-2xl font-serif tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[#181716] dark:text-[#F5F2EB] hover:opacity-80 transition-opacity whitespace-nowrap text-left"
            >
              DIRAN WEARS
            </button>
          </div>

          {/* Zone 2: Desktop 4-5 single-line clean text nav links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-widest font-medium text-neutral-600 dark:text-neutral-400">
            <button
              onClick={() => handleNavClick('shop')}
              className={`hover:text-[#181716] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                currentScreen === 'shop' ? 'text-[#181716] dark:text-white border-b border-[#181716] dark:border-white pb-0.5' : ''
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('look')}
              className={`hover:text-[#181716] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${
                currentScreen === 'look' ? 'text-[#181716] dark:text-white border-b border-[#181716] dark:border-white pb-0.5' : ''
              }`}
            >
              <span>Shop the Look</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4E563E]" />
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="hover:text-[#181716] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Tailoring
            </button>
            <button
              onClick={() => handleNavClick('welcome')}
              className={`hover:text-[#181716] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                currentScreen === 'welcome' ? 'text-[#181716] dark:text-white border-b border-[#181716] dark:border-white pb-0.5' : ''
              }`}
            >
              Atelier
            </button>
          </nav>

          {/* Zone 3: Primary action & customer controls */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* PWA Install Button */}
            <PWAInstallButton variant="compact" />

            {/* Replay Intro Animation Button (Desktop) */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                title="Replay Brand Intro Splash"
                className="hidden lg:flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
              >
                <Play className="w-3 h-3 text-[#4E563E] dark:text-[#9BAA7C]" />
                <span>Intro</span>
              </button>
            )}

            {/* Search Trigger */}
            <button
              onClick={() => handleNavClick('shop')}
              aria-label="Search catalog"
              className="p-1.5 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Saved / Wishlist */}
            <button
              onClick={() => handleNavClick('saved')}
              aria-label={`Saved items: ${savedCount}`}
              className="relative p-1.5 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
            >
              <Heart className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#4E563E] text-white text-[10px] font-mono flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Bag Button */}
            <button
              onClick={onOpenBag}
              aria-label={`Shopping bag: ${cartCount} items`}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#181716] text-[#FAF7F2] dark:bg-[#FAF7F2] dark:text-[#181716] hover:opacity-90 transition-opacity"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="text-xs font-mono font-medium">{cartCount}</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white rounded"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Touch-Friendly Slide-Over Mobile Drawer (Zero Horizontal Scrolling!) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 md:hidden">
          <div className="w-[85%] max-w-[320px] bg-[#FAF7F2] dark:bg-[#141312] text-[#181716] dark:text-[#E8E4DA] h-full shadow-2xl flex flex-col justify-between border-l border-[#E8E4DA] dark:border-[#2A2724] animate-in slide-in-from-right duration-300">
            {/* Drawer Top Header */}
            <div className="px-5 py-4 border-b border-[#E8E4DA] dark:border-[#2A2724] flex items-center justify-between bg-white dark:bg-[#1A1917]">
              <div>
                <span className="font-serif tracking-widest text-base uppercase font-bold text-[#181716] dark:text-white block">
                  DIRAN WEARS
                </span>
                <span className="text-[10px] font-mono text-[#4E563E] dark:text-[#9BAA7C]">
                  Mobile Application Menu
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-neutral-500 hover:text-black dark:hover:text-white rounded"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Nav Links */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Primary Navigation */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block pb-1">
                  Storefront Navigation
                </span>

                <button
                  onClick={() => handleNavClick('home')}
                  className={`w-full flex items-center justify-between py-2 text-sm uppercase tracking-wider font-medium text-left ${
                    currentScreen === 'home' ? 'text-[#4E563E] dark:text-[#9BAA7C] font-semibold' : 'text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  <span>Home</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                </button>

                <button
                  onClick={() => handleNavClick('shop')}
                  className={`w-full flex items-center justify-between py-2 text-sm uppercase tracking-wider font-medium text-left ${
                    currentScreen === 'shop' ? 'text-[#4E563E] dark:text-[#9BAA7C] font-semibold' : 'text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  <span>Shop Collections</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                </button>

                <button
                  onClick={() => handleNavClick('look')}
                  className={`w-full flex items-center justify-between py-2.5 px-3 rounded bg-[#4E563E]/10 text-sm uppercase tracking-wider font-semibold text-left text-[#4E563E] dark:text-[#9BAA7C]`}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#4E563E] dark:text-[#9BAA7C]" />
                    <span>Shop the Look</span>
                  </div>
                  <span className="text-[9px] font-mono bg-[#4E563E] text-white px-1.5 py-0.5 rounded">
                    SIGNATURE
                  </span>
                </button>
              </div>

              {/* Personal & Account Section */}
              <div className="space-y-2 pt-2 border-t border-[#E8E4DA] dark:border-[#2A2724]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block pb-1">
                  Personal Wardrobe
                </span>

                <button
                  onClick={() => handleNavClick('saved')}
                  className="w-full flex items-center justify-between py-2 text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-300"
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5" />
                    <span>Saved Pieces</span>
                  </div>
                  <span className="font-mono text-xs">{savedCount}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBag();
                  }}
                  className="w-full flex items-center justify-between py-2 text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-300"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Shopping Bag</span>
                  </div>
                  <span className="font-mono text-xs">{cartCount}</span>
                </button>

                <button
                  onClick={() => handleNavClick(isLoggedIn ? 'orders' : 'login')}
                  className="w-full flex items-center justify-between py-2 text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-300"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    <span>{isLoggedIn ? 'Order History & Tracking' : 'Sign In / Register'}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                </button>
              </div>

              {/* App Specials: Replay Intro & PWA */}
              <div className="space-y-3 pt-2 border-t border-[#E8E4DA] dark:border-[#2A2724]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  App Actions
                </span>

                {onReplayIntro && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onReplayIntro();
                    }}
                    className="w-full py-2.5 px-3 border border-[#E8E4DA] dark:border-[#2A2724] text-xs font-mono text-neutral-700 dark:text-neutral-300 flex items-center justify-center gap-2 hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <Play className="w-3.5 h-3.5 text-[#4E563E] dark:text-[#9BAA7C]" />
                    <span>Replay Brand Intro Splash</span>
                  </button>
                )}

                <PWAInstallButton variant="full" />
              </div>
            </div>

            {/* Drawer Bottom Info */}
            <div className="p-4 border-t border-[#E8E4DA] dark:border-[#2A2724] bg-white dark:bg-[#1A1917] text-[11px] text-neutral-500 font-mono flex items-center justify-between">
              <span>Lagos Atelier · Task 1 PWA</span>
              <span>v1.0</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
