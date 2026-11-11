import React, { useState } from 'react';
import { ArrowLeft, Heart, Check, ShieldCheck, Ruler, ChevronDown, ChevronUp, Sparkles, AlertCircle } from 'lucide-react';
import { Product, ProductVariant, ScreenId, SimulationState } from '../../types/store';
import { formatNaira } from '../../data/mockData';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (variant: ProductVariant, product: Product) => void;
  isSaved: boolean;
  onToggleSave: (productId: string) => void;
  simulationState: SimulationState;
  onNavigateToLook: () => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onBack,
  onAddToCart,
  isSaved,
  onToggleSave,
  simulationState,
  onNavigateToLook
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id);
  const [fitGuideOpen, setFitGuideOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [addedToast, setAddedToast] = useState(false);

  // Simulation checks
  const isSimulatedSoldOut = simulationState === 'sold_out';
  const isSimulatedLoading = simulationState === 'loading';

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const effectiveStock = isSimulatedSoldOut ? 0 : selectedVariant?.stock ?? 0;
  const isOutOfStock = effectiveStock <= 0;

  // Group unique colors & sizes
  const uniqueColors = Array.from(new Set(product.variants.map((v) => v.colorName)));
  const uniqueSizes = Array.from(new Set(product.variants.map((v) => v.size)));

  const handleColorSelect = (colorName: string) => {
    const matchingVariant = product.variants.find(
      (v) => v.colorName === colorName && v.size === selectedVariant.size
    ) || product.variants.find((v) => v.colorName === colorName);
    if (matchingVariant) setSelectedVariantId(matchingVariant.id);
  };

  const handleSizeSelect = (size: string) => {
    const matchingVariant = product.variants.find(
      (v) => v.size === size && v.colorName === selectedVariant.colorName
    ) || product.variants.find((v) => v.size === size);
    if (matchingVariant) setSelectedVariantId(matchingVariant.id);
  };

  const handleAdd = () => {
    if (isOutOfStock) return;
    onAddToCart(selectedVariant, product);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  if (isSimulatedLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-12 gap-12 animate-pulse">
        <div className="md:col-span-7 aspect-[3/4] bg-neutral-200 dark:bg-neutral-800" />
        <div className="md:col-span-5 space-y-4">
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 w-1/3" />
          <div className="h-10 bg-neutral-200 dark:bg-neutral-800 w-3/4" />
          <div className="h-5 bg-neutral-200 dark:bg-neutral-800 w-1/4" />
          <div className="h-32 bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 pb-28 sm:pb-12">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collections</span>
        </button>
        <div className="flex items-center gap-1 text-[11px] font-mono">
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-[#181716] dark:text-white">{product.name}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Image Gallery (Contiguous Module §2.A) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[3/4] bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] overflow-hidden">
            <img
              src={product.images[selectedImageIndex]?.url || product.images[0]?.url}
              alt={product.images[selectedImageIndex]?.alt || product.name}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* Wishlist button */}
            <button
              onClick={() => onToggleSave(product.id)}
              aria-label={isSaved ? 'Saved piece' : 'Save piece'}
              className={`absolute top-4 right-4 p-2.5 rounded-full transition-colors ${
                isSaved
                  ? 'bg-[#4E563E] text-white'
                  : 'bg-white/80 dark:bg-black/60 text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Gallery Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 aspect-[3/4] border overflow-hidden ${
                    selectedImageIndex === idx
                      ? 'border-[#4E563E] dark:border-[#9BAA7C] ring-1 ring-[#4E563E]'
                      : 'border-[#E8E4DA] dark:border-[#2A2724] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Title & Price */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#4E563E] dark:text-[#9BAA7C]">
                {product.category} · Atelier Collection
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif text-[#181716] dark:text-white mt-1">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                {product.subtitle}
              </p>
              <div className="mt-4 text-xl font-mono font-medium text-[#181716] dark:text-[#FAF7F2] tabular-nums">
                {formatNaira(selectedVariant?.priceKobo ?? product.basePriceKobo)}
              </div>
            </div>

            {/* Colour Selector */}
            <div className="space-y-2 pt-2 border-t border-[#E8E4DA] dark:border-[#2A2724]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                  Colour: <strong className="text-[#181716] dark:text-white">{selectedVariant?.colorName}</strong>
                </span>
                <span className="text-neutral-400 font-mono text-[11px]">{uniqueColors.length} Tones</span>
              </div>
              <div className="flex items-center gap-2">
                {uniqueColors.map((color) => {
                  const sampleVariant = product.variants.find((v) => v.colorName === color);
                  const isSelected = selectedVariant?.colorName === color;
                  return (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={`group relative flex items-center gap-1.5 px-3 py-1.5 text-xs border transition-all ${
                        isSelected
                          ? 'border-[#181716] dark:border-white bg-[#FAF7F2] dark:bg-[#1F1D1B] font-semibold'
                          : 'border-[#E8E4DA] dark:border-[#2A2724] hover:border-neutral-400'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: sampleVariant?.colorHex || '#ccc' }}
                      />
                      <span>{color}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector with Live Stock Badges */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                  Select Size
                </span>
                <button
                  onClick={() => setFitGuideOpen(!fitGuideOpen)}
                  className="flex items-center gap-1 text-[#4E563E] dark:text-[#9BAA7C] hover:underline"
                >
                  <Ruler className="w-3 h-3" />
                  <span>Size & Fit Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {uniqueSizes.map((size) => {
                  const variant = product.variants.find(
                    (v) => v.size === size && v.colorName === selectedVariant?.colorName
                  );
                  const stock = isSimulatedSoldOut ? 0 : variant?.stock ?? 0;
                  const isSelected = selectedVariant?.size === size;
                  const isSoldOut = stock <= 0;

                  return (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      disabled={isSoldOut}
                      className={`py-2.5 px-2 text-xs font-mono transition-all border relative flex flex-col items-center justify-center ${
                        isSoldOut
                          ? 'border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-600 line-through bg-neutral-50 dark:bg-neutral-900/40 cursor-not-allowed'
                          : isSelected
                          ? 'border-[#181716] dark:border-white bg-[#181716] text-white dark:bg-white dark:text-[#181716] font-semibold'
                          : 'border-[#E8E4DA] dark:border-[#2A2724] text-neutral-800 dark:text-neutral-200 hover:border-black dark:hover:border-white'
                      }`}
                    >
                      <span>{size}</span>
                      {stock > 0 && stock <= 2 && (
                        <span className="text-[9px] font-sans font-normal opacity-80">
                          {stock} left
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Stock Status Notice */}
              <div className="pt-1 text-xs">
                {isOutOfStock ? (
                  <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>This variant is currently out of stock. Select another size or register for the waitlist.</span>
                  </div>
                ) : effectiveStock <= 2 ? (
                  <span className="text-amber-700 dark:text-amber-400">
                    Low stock: Only {effectiveStock} units available at the Lagos atelier.
                  </span>
                ) : (
                  <span className="text-emerald-700 dark:text-emerald-400">
                    In Stock · Ships within 24 hours
                  </span>
                )}
              </div>
            </div>

            {/* Fit Guide Accordion */}
            {fitGuideOpen && (
              <div className="p-4 bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] text-xs space-y-3 animate-in fade-in">
                <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                  Lagos Atelier Fit & Model Specs
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Our tailored garments are designed with an relaxed architectural drape. If you prefer a closer, traditional fit, we advise sizing down one size.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px] text-neutral-500">
                  <div>Model Height: 186cm</div>
                  <div>Chest: 38"</div>
                  <div>Wearing: Size M</div>
                </div>
              </div>
            )}

            {/* Desktop Add to Bag CTA */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAdd}
                disabled={isOutOfStock}
                className={`w-full py-4 px-6 text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 ${
                  isOutOfStock
                    ? 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716] hover:bg-[#333] dark:hover:bg-white/90'
                }`}
              >
                <span>{isOutOfStock ? 'Variant Sold Out' : 'Add to Bag'}</span>
                <span>·</span>
                <span className="font-mono tabular-nums">
                  {formatNaira(selectedVariant?.priceKobo ?? product.basePriceKobo)}
                </span>
              </button>

              {/* Toast Feedback */}
              {addedToast && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-between animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added {product.name} ({selectedVariant.size}) to your bag.</span>
                  </div>
                </div>
              )}

              {/* Direct Link to Shop The Look */}
              <button
                onClick={onNavigateToLook}
                className="w-full py-2.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-dashed border-[#E8E4DA] dark:border-[#2A2724] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#4E563E] dark:text-[#9BAA7C]" />
                <span>See this piece styled in Look 01 (Lagos Ensemble) &rarr;</span>
              </button>
            </div>

            {/* Product Details & Fabric Composition Accordion */}
            <div className="border-t border-[#E8E4DA] dark:border-[#2A2724] pt-4 space-y-4">
              <div>
                <button
                  onClick={() => setDetailsOpen(!detailsOpen)}
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200"
                >
                  <span>Fabric & Atelier Craftsmanship</span>
                  {detailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {detailsOpen && (
                  <div className="mt-3 text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
                    <p className="leading-relaxed">{product.description}</p>
                    <ul className="list-disc pl-4 space-y-1 pt-1">
                      {product.fabricDetails.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Purchase Bar (Capped at <= 15% viewport height per §1.I) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-[#FAF7F2]/95 dark:bg-[#141312]/95 backdrop-blur-md border-t border-[#E8E4DA] dark:border-[#2A2724] flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-xs font-serif truncate max-w-[150px] text-[#181716] dark:text-white">
            {product.name}
          </span>
          <span className="text-xs font-mono font-medium tabular-nums text-[#4E563E] dark:text-[#9BAA7C]">
            {formatNaira(selectedVariant?.priceKobo ?? product.basePriceKobo)}
          </span>
        </div>
        <button
          onClick={handleAdd}
          disabled={isOutOfStock}
          className={`flex-1 py-3 px-4 text-xs uppercase tracking-widest font-semibold transition-all ${
            isOutOfStock
              ? 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed'
              : 'bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716]'
          }`}
        >
          {isOutOfStock ? 'Sold Out' : 'Add to Bag'}
        </button>
      </div>
    </div>
  );
};
