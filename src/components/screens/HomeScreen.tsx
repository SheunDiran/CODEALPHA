import React from 'react';
import { ArrowRight, Sparkles, Heart, ArrowUpRight } from 'lucide-react';
import { Product, ScreenId, SimulationState } from '../../types/store';
import { PRODUCTS, SIGNATURE_LOOK, formatNaira, HERO_CAMPAIGN_IMG, LOOK_EDITORIAL_IMG } from '../../data/mockData';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectProduct: (product: Product) => void;
  savedProductIds: string[];
  onToggleSave: (productId: string) => void;
  simulationState: SimulationState;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectProduct,
  savedProductIds,
  onToggleSave,
  simulationState
}) => {
  const isSkeleton = simulationState === 'loading';

  if (isSkeleton) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-pulse">
        <div className="h-[460px] bg-neutral-200 dark:bg-neutral-800 rounded-none w-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[3/4] bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-3/4" />
              <div className="h-3 bg-neutral-200 dark:bg-neutral-800 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-20 pb-16">
      {/* Editorial Announcement Bar */}
      <div className="bg-[#FAF7F2] dark:bg-[#1A1917] border-b border-[#E8E4DA] dark:border-[#2A2724] py-2 px-4 text-center text-[11px] font-mono tracking-widest uppercase text-neutral-600 dark:text-neutral-400">
        Complimentary express courier across Lagos & Abuja on orders above ₦100,000
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-[#181716] text-white min-h-[520px] lg:min-h-[580px] flex items-end">
          <img
            src={HERO_CAMPAIGN_IMG}
            alt="Diran Wears Editorial Campaign"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-90 filter contrast-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

          {/* Hero Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D8E0C8]">
              Atelier Edition 01
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal leading-[1.1] tracking-tight">
              The Architecture of Linen & Wool
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed max-w-lg">
              Structured drape meets breathable West African ease. Sculpted overcoats, forward-pleated trousers, and handmade leather footwear.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-3.5 bg-white text-[#181716] hover:bg-[#FAF7F2] text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2"
              >
                <span>Explore Wardrobe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('look')}
                className="px-6 py-3.5 bg-black/40 border border-white/30 text-white hover:bg-black/60 text-xs uppercase tracking-widest font-semibold transition-all backdrop-blur-sm flex items-center gap-2"
              >
                <span>Shop the Look</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D8E0C8]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Drops Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-[#E8E4DA] dark:border-[#2A2724]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#4E563E] dark:text-[#9BAA7C]">
              Wardrobe Essentials
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#181716] dark:text-white mt-1">
              Curated New Arrivals
            </h3>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs uppercase tracking-widest font-semibold text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white flex items-center gap-1.5"
          >
            <span>View All ({PRODUCTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3-Column Product Grid adhering to §2.A of E-commerce guidelines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 3).map((product) => {
            const isSaved = savedProductIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] overflow-hidden transition-all hover:border-[#4E563E] dark:hover:border-[#9BAA7C]"
              >
                {/* Product Image Slot with Fallback Container */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-[3/4] bg-[#FAF7F2] dark:bg-[#121110] overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.images[0]?.url}
                    alt={product.images[0]?.alt || product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Save / Wishlist Action */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(product.id);
                    }}
                    aria-label={isSaved ? 'Remove from saved' : 'Save for later'}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                      isSaved
                        ? 'bg-[#4E563E] text-white'
                        : 'bg-white/80 dark:bg-black/60 text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>

                  {/* Kicker badge */}
                  {product.isNewArrival && (
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#181716]/80 text-[#FAF7F2] text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm">
                      New Arrival
                    </div>
                  )}
                </div>

                {/* Clean Metadata (Zero-Pill discipline) */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 uppercase tracking-wider">
                      <span>{product.category}</span>
                      <span>·</span>
                      <span>{product.variants.length} Variants</span>
                    </div>
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="text-left font-serif text-lg text-[#181716] dark:text-[#FAF7F2] hover:text-[#4E563E] dark:hover:text-[#9BAA7C] transition-colors mt-1 line-clamp-1"
                    >
                      {product.name}
                    </button>
                    <p className="text-xs text-neutral-500 line-clamp-2 mt-1">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E8E4DA]/60 dark:border-[#2A2724]/60">
                    <span className="text-sm font-mono font-medium text-[#181716] dark:text-[#FAF7F2] tabular-nums">
                      {formatNaira(product.basePriceKobo)}
                    </span>
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="text-xs uppercase tracking-wider font-semibold text-[#4E563E] dark:text-[#9BAA7C] hover:underline"
                    >
                      View Piece &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Signature Feature: Shop the Look Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative aspect-[3/4] overflow-hidden bg-neutral-900">
              <img
                src={LOOK_EDITORIAL_IMG}
                alt="Signature Look 01 Editorial Ensemble"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 text-white text-[10px] font-mono uppercase tracking-widest backdrop-blur-md">
                Signature Feature
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 lg:pl-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#4E563E] dark:text-[#9BAA7C]">
                  Curated Outfit Experience
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#181716] dark:text-white">
                  Shop the Look: The Lagos Atelier Ensemble
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Experience our signature interaction. Inspect the layered trench overcoat, wide-leg pleated trousers, and penny loafers in one editorial view. Customize sizes for each piece, remove or add components, and add the full styled ensemble to your bag in one click.
                </p>
              </div>

              {/* Pieces Included Preview */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {SIGNATURE_LOOK.pieces.map((piece) => (
                  <div key={piece.id} className="p-3 bg-white dark:bg-[#141312] border border-[#E8E4DA] dark:border-[#2A2724] text-xs">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">
                      {piece.product.category}
                    </div>
                    <div className="font-serif text-xs truncate mt-0.5 text-[#181716] dark:text-white">
                      {piece.product.name}
                    </div>
                    <div className="text-[11px] font-mono mt-1 text-[#4E563E] dark:text-[#9BAA7C]">
                      {formatNaira(piece.product.basePriceKobo)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('look')}
                  className="px-6 py-3.5 bg-[#4E563E] text-white hover:bg-[#3E4531] text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2"
                >
                  <span>Customize & Shop This Look</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-neutral-500 font-mono">
                  Full Bundle Total: ₦285,000
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship & Editorial Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[#E8E4DA] dark:border-[#2A2724] pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-neutral-600 dark:text-neutral-400">
          <div className="space-y-2">
            <span className="font-mono text-[#4E563E] dark:text-[#9BAA7C] uppercase tracking-wider font-semibold">
              01. Natural Materials
            </span>
            <h4 className="font-serif text-base text-[#181716] dark:text-white">Normandy Flax & Tropical Wool</h4>
            <p className="leading-relaxed">
              Every yard of linen is spun from certified European flax, breathing freely under high heat and gaining softness with each cleaning cycle.
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-mono text-[#4E563E] dark:text-[#9BAA7C] uppercase tracking-wider font-semibold">
              02. Architectural Fit
            </span>
            <h4 className="font-serif text-base text-[#181716] dark:text-white">Cut for Natural Motion</h4>
            <p className="leading-relaxed">
              Forward pleats, unstructured shoulders, and dropped chest lines deliver sculptural authority without stiff, uncomfortable padding.
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-mono text-[#4E563E] dark:text-[#9BAA7C] uppercase tracking-wider font-semibold">
              03. Transparent Commerce
            </span>
            <h4 className="font-serif text-base text-[#181716] dark:text-white">Integrity at Checkout</h4>
            <p className="leading-relaxed">
              Live inventory reservation prevents phantom sales, minor-unit currency precision protects order totals, and demo payment modes simulate real workflows safely.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
