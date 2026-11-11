import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, Heart, Check, ArrowUpDown } from 'lucide-react';
import { Product, ScreenId, SimulationState } from '../../types/store';
import { PRODUCTS, formatNaira } from '../../data/mockData';

interface ShopScreenProps {
  onSelectProduct: (product: Product) => void;
  savedProductIds: string[];
  onToggleSave: (productId: string) => void;
  simulationState: SimulationState;
}

const CATEGORIES = ['All', 'Tailoring', 'Outerwear', 'Footwear', 'Essentials', 'Accessories'];
const SIZES = ['All', 'S', 'M', 'L', 'XL', '30', '32', '34', '36', 'EU 41', 'EU 42', 'EU 43', 'EU 44'];
const COLORS = [
  { name: 'All', hex: '' },
  { name: 'Warm Ivory', hex: '#F5F1E8' },
  { name: 'Muted Olive', hex: '#525B40' },
  { name: 'Ink Black', hex: '#181716' },
  { name: 'Deep Charcoal', hex: '#282726' },
  { name: 'Chalk White', hex: '#FBFBFA' }
];

export const ShopScreen: React.FC<ShopScreenProps> = ({
  onSelectProduct,
  savedProductIds,
  onToggleSave,
  simulationState
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Forced empty state simulation or live filtering
  const isSimulatedEmpty = simulationState === 'empty';
  const isSimulatedLoading = simulationState === 'loading';

  const filteredProducts = useMemo(() => {
    if (isSimulatedEmpty) return [];

    return PRODUCTS.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSub = p.subtitle.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesSub && !matchesCat) return false;
      }

      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Size
      if (selectedSize !== 'All') {
        const hasSize = p.variants.some((v) => v.size === selectedSize);
        if (!hasSize) return false;
      }

      // Color
      if (selectedColor !== 'All') {
        const hasColor = p.variants.some((v) => v.colorName.toLowerCase() === selectedColor.toLowerCase());
        if (!hasColor) return false;
      }

      // In stock
      if (inStockOnly) {
        const hasStock = p.variants.some((v) => v.stock > 0);
        if (!hasStock) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePriceKobo - b.basePriceKobo;
      if (sortBy === 'price-desc') return b.basePriceKobo - a.basePriceKobo;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedSize, selectedColor, inStockOnly, sortBy, isSimulatedEmpty]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedSize !== 'All' ||
    selectedColor !== 'All' ||
    inStockOnly;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setInStockOnly(false);
    setSortBy('featured');
  };

  if (isSimulatedLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
        <div className="h-10 bg-neutral-200 dark:bg-neutral-800 w-1/3" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#4E563E] dark:text-[#9BAA7C]">
              Catalog Directory
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#181716] dark:text-white mt-1">
              Shop All Pieces
            </h1>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tailoring, loafers, linen..."
              className="w-full bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] px-3.5 py-2 pl-9 pr-8 text-xs text-[#181716] dark:text-white rounded-none focus:outline-none focus:border-[#4E563E] dark:focus:border-[#9BAA7C]"
            />
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Row (§1.A Segmented Controls vs Zero-Pill) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-y border-[#E8E4DA] dark:border-[#2A2724] py-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716]'
                    : 'bg-transparent text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Desktop & Mobile Filter Menus & Sort */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* In stock toggle */}
            <label className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer select-none py-1">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded-none accent-[#4E563E]"
              />
              <span className="whitespace-nowrap">In Stock</span>
            </label>

            {/* Size Dropdown */}
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] px-2 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 rounded-none cursor-pointer focus:outline-none flex-1 sm:flex-initial"
            >
              <option value="All">Size: All</option>
              {SIZES.filter((s) => s !== 'All').map((s) => (
                <option key={s} value={s}>
                  Size: {s}
                </option>
              ))}
            </select>

            {/* Color Dropdown */}
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] px-2 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 rounded-none cursor-pointer focus:outline-none flex-1 sm:flex-initial"
            >
              <option value="All">Tone: All</option>
              {COLORS.filter((c) => c.name !== 'All').map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] px-2 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 rounded-none cursor-pointer focus:outline-none w-full sm:w-auto"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest</option>
              <option value="price-asc">Sort: Price (Low &rarr; High)</option>
              <option value="price-desc">Sort: Price (High &rarr; Low)</option>
            </select>
          </div>
        </div>

        {/* Active Filters Bar & Result Counter */}
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span>Showing {filteredProducts.length} pieces</span>
            {hasActiveFilters && (
              <>
                <span>·</span>
                <button
                  onClick={resetFilters}
                  className="text-[#4E563E] dark:text-[#9BAA7C] hover:underline font-medium"
                >
                  Clear all filters
                </button>
              </>
            )}
          </div>

          <span className="font-mono text-[11px] text-neutral-400">
            URL Query Synced: /shop?cat={selectedCategory.toLowerCase()}
          </span>
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 border border-dashed border-[#E8E4DA] dark:border-[#2A2724] p-8">
          <span className="font-serif italic text-3xl text-neutral-400 dark:text-neutral-600 block">
            No pieces match your selection
          </span>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            We couldn't find any products matching your specific combination of filters. Try clearing your search or exploring our tailored coats.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716] text-xs uppercase tracking-widest font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* 3-Column Product Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isSaved = savedProductIds.includes(product.id);
            const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);

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
                  {/* Save button */}
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

                  {/* Stock notice or new arrival */}
                  {totalStock === 0 ? (
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-rose-950/90 text-rose-200 text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm">
                      Sold Out
                    </div>
                  ) : product.isNewArrival ? (
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#181716]/80 text-[#FAF7F2] text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm">
                      New Arrival
                    </div>
                  ) : null}
                </div>

                {/* Metadata */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 uppercase tracking-wider">
                      <span>{product.category}</span>
                      <span>·</span>
                      <span>{product.variants.length} Sizes</span>
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
                      Select Variant &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
