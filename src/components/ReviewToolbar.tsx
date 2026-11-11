import React, { useState } from 'react';
import {
  Monitor,
  Smartphone,
  Maximize2,
  Sun,
  Moon,
  Laptop,
  Layers,
  BookOpen,
  ChevronDown,
  Sparkles,
  Columns,
  Play,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { ScreenId, ViewportMode, SimulationState, ThemeMode } from '../types/store';

interface ReviewToolbarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  viewportMode: ViewportMode;
  onSelectViewport: (mode: ViewportMode) => void;
  simulationState: SimulationState;
  onSelectSimulation: (state: SimulationState) => void;
  themeMode: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
  onOpenArchitecture: () => void;
  isSideBySideTheme: boolean;
  onToggleSideBySideTheme: () => void;
  cartCount: number;
  savedCount: number;
  onReplayIntro?: () => void;
}

const SCREENS: { id: ScreenId; label: string; group: string }[] = [
  { id: 'welcome', label: '1. Welcome Campaign', group: 'Discovery' },
  { id: 'home', label: '2. Home Storefront', group: 'Discovery' },
  { id: 'shop', label: '3. Shop / Search & Filters', group: 'Catalog' },
  { id: 'pdp', label: '4. Product Detail (PDP)', group: 'Catalog' },
  { id: 'look', label: '5. Shop the Look (Signature)', group: 'Signature' },
  { id: 'saved', label: '6. Saved Pieces (Wishlist)', group: 'Account' },
  { id: 'bag', label: '7. Bag & Slide Cart', group: 'Commerce' },
  { id: 'login', label: '8. Customer Login', group: 'Auth' },
  { id: 'register', label: '9. Customer Registration', group: 'Auth' },
  { id: 'checkout', label: '10. 3-Step Checkout', group: 'Commerce' },
  { id: 'confirmation', label: '11. Order Confirmation', group: 'Commerce' },
  { id: 'orders', label: '12. Order History', group: 'Account' },
  { id: 'order-detail', label: '13. Order Detail & Tracking', group: 'Account' }
];

export const ReviewToolbar: React.FC<ReviewToolbarProps> = ({
  currentScreen,
  onSelectScreen,
  viewportMode,
  onSelectViewport,
  simulationState,
  onSelectSimulation,
  themeMode,
  onSelectTheme,
  onOpenArchitecture,
  isSideBySideTheme,
  onToggleSideBySideTheme,
  cartCount,
  savedCount,
  onReplayIntro
}) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  return (
    <aside
      aria-label="Wireframe Inspection & Prototype Controls"
      className="sticky top-0 z-40 bg-[#141312] text-[#E8E4DA] border-b border-[#2A2724] px-3 py-1.5 text-xs shadow-md w-full max-w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand & Screen Selector */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-serif italic text-sm tracking-wider text-white">DIRAN</span>
            <span className="px-1.5 py-0.5 rounded bg-[#4E563E] text-[9px] font-mono uppercase tracking-wider text-[#FAF7F2] hidden sm:inline">
              Phase 1 Review
            </span>
          </div>

          {/* Screen Select Dropdown */}
          <div className="relative inline-block min-w-0">
            <select
              value={currentScreen}
              onChange={(e) => onSelectScreen(e.target.value as ScreenId)}
              className="bg-[#1F1D1B] text-white border border-[#3A3632] rounded px-2 py-1 pr-6 text-[11px] font-medium cursor-pointer hover:border-[#4E563E] focus:outline-none appearance-none truncate max-w-[130px] sm:max-w-[200px]"
            >
              {SCREENS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 absolute right-1.5 top-2 pointer-events-none text-neutral-400" />
          </div>
        </div>

        {/* Desktop Controls (Hidden on small mobile) */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {/* Device Viewport Selector */}
          <div className="flex items-center gap-0.5 bg-[#1F1D1B] p-0.5 rounded border border-[#3A3632]">
            <button
              onClick={() => onSelectViewport('desktop')}
              title="Desktop 1440px"
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] transition-colors ${
                viewportMode === 'desktop' ? 'bg-[#4E563E] text-white font-medium' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => onSelectViewport('mobile')}
              title="Mobile iPhone 390px"
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] transition-colors ${
                viewportMode === 'mobile' ? 'bg-[#4E563E] text-white font-medium' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile (390px)</span>
            </button>
            <button
              onClick={() => onSelectViewport('responsive')}
              title="Fluid Viewport"
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] transition-colors ${
                viewportMode === 'responsive' ? 'bg-[#4E563E] text-white font-medium' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Maximize2 className="w-3 h-3" />
              <span>Fluid</span>
            </button>
          </div>

          {/* Simulation State Dropdown */}
          <div className="flex items-center gap-1 bg-[#1F1D1B] px-2 py-0.5 rounded border border-[#3A3632]">
            <select
              value={simulationState}
              onChange={(e) => onSelectSimulation(e.target.value as SimulationState)}
              className="bg-transparent text-white text-[11px] font-medium cursor-pointer focus:outline-none"
            >
              <option value="default" className="bg-[#1F1D1B] text-white">Default State</option>
              <option value="loading" className="bg-[#1F1D1B] text-white">⏳ Loading Skeletons</option>
              <option value="empty" className="bg-[#1F1D1B] text-white">📭 Empty States</option>
              <option value="error" className="bg-[#1F1D1B] text-white">⚠️ Error State</option>
              <option value="sold_out" className="bg-[#1F1D1B] text-white">🚫 Sold-Out Variant</option>
              <option value="checkout_recovery" className="bg-[#1F1D1B] text-white">🔄 Checkout Recovery</option>
            </select>
          </div>

          {/* Theme Mode Toggle */}
          <div className="flex items-center gap-0.5 bg-[#1F1D1B] p-0.5 rounded border border-[#3A3632]">
            <button
              onClick={() => onSelectTheme('system')}
              title="System Appearance"
              className={`p-1 rounded ${themeMode === 'system' ? 'bg-[#4E563E] text-white' : 'text-neutral-400 hover:text-white'}`}
            >
              <Laptop className="w-3 h-3" />
            </button>
            <button
              onClick={() => onSelectTheme('light')}
              title="Light Theme"
              className={`p-1 rounded ${themeMode === 'light' ? 'bg-[#4E563E] text-white' : 'text-neutral-400 hover:text-white'}`}
            >
              <Sun className="w-3 h-3" />
            </button>
            <button
              onClick={() => onSelectTheme('dark')}
              title="Dark Theme"
              className={`p-1 rounded ${themeMode === 'dark' ? 'bg-[#4E563E] text-white' : 'text-neutral-400 hover:text-white'}`}
            >
              <Moon className="w-3 h-3" />
            </button>
          </div>

          {/* Side by side theme */}
          <button
            onClick={onToggleSideBySideTheme}
            title="Inspect Light & Dark Side-by-Side"
            className={`hidden xl:flex items-center gap-1 px-2 py-1 rounded text-[11px] border ${
              isSideBySideTheme
                ? 'bg-[#4E563E] border-[#657050] text-white'
                : 'bg-[#1F1D1B] border-[#3A3632] text-neutral-300 hover:text-white'
            }`}
          >
            <Columns className="w-3 h-3" />
            <span>Dual Theme</span>
          </button>
        </div>

        {/* Right CTA cluster */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              title="Replay Brand Intro Animation & Sound"
              className="flex items-center gap-1 px-2 py-1 rounded bg-[#4E563E]/20 text-[#9BAA7C] hover:bg-[#4E563E]/40 border border-[#4E563E]/30 text-[11px] transition-colors"
            >
              <Play className="w-3 h-3 fill-current" />
              <span className="hidden sm:inline">Intro Animation</span>
            </button>
          )}

          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#FAF7F2] text-[#141312] font-semibold text-[11px] hover:bg-white transition-colors"
          >
            <BookOpen className="w-3 h-3 text-[#4E563E]" />
            <span className="hidden sm:inline">Specs</span>
          </button>

          {/* Mobile Inspector Controls Toggle */}
          <button
            onClick={() => setMobileExpanded(!mobileExpanded)}
            className="md:hidden p-1 rounded bg-[#1F1D1B] text-neutral-300 border border-[#3A3632]"
            aria-label="Toggle inspector controls"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expanded Review Controls on Mobile */}
      {mobileExpanded && (
        <div className="md:hidden pt-2 pb-1 border-t border-[#2A2724] mt-1.5 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-neutral-400">Viewport:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onSelectViewport('mobile')}
                className={`px-2 py-0.5 rounded text-[10px] ${viewportMode === 'mobile' ? 'bg-[#4E563E] text-white' : 'bg-[#1F1D1B] text-neutral-400'}`}
              >
                Mobile (390px)
              </button>
              <button
                onClick={() => onSelectViewport('desktop')}
                className={`px-2 py-0.5 rounded text-[10px] ${viewportMode === 'desktop' ? 'bg-[#4E563E] text-white' : 'bg-[#1F1D1B] text-neutral-400'}`}
              >
                Desktop
              </button>
              <button
                onClick={() => onSelectViewport('responsive')}
                className={`px-2 py-0.5 rounded text-[10px] ${viewportMode === 'responsive' ? 'bg-[#4E563E] text-white' : 'bg-[#1F1D1B] text-neutral-400'}`}
              >
                Fluid
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-neutral-400">State:</span>
            <select
              value={simulationState}
              onChange={(e) => onSelectSimulation(e.target.value as SimulationState)}
              className="bg-[#1F1D1B] text-white text-[10px] rounded px-2 py-0.5 border border-[#3A3632]"
            >
              <option value="default">Default State</option>
              <option value="loading">Loading Skeletons</option>
              <option value="empty">Empty States</option>
              <option value="error">Error State</option>
              <option value="sold_out">Sold-Out Variant</option>
              <option value="checkout_recovery">Checkout Recovery</option>
            </select>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-neutral-400">Theme:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onSelectTheme('system')}
                className={`px-2 py-0.5 rounded text-[10px] ${themeMode === 'system' ? 'bg-[#4E563E] text-white' : 'bg-[#1F1D1B] text-neutral-400'}`}
              >
                System
              </button>
              <button
                onClick={() => onSelectTheme('light')}
                className={`px-2 py-0.5 rounded text-[10px] ${themeMode === 'light' ? 'bg-[#4E563E] text-white' : 'bg-[#1F1D1B] text-neutral-400'}`}
              >
                Light
              </button>
              <button
                onClick={() => onSelectTheme('dark')}
                className={`px-2 py-0.5 rounded text-[10px] ${themeMode === 'dark' ? 'bg-[#4E563E] text-white' : 'bg-[#1F1D1B] text-neutral-400'}`}
              >
                Dark
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
