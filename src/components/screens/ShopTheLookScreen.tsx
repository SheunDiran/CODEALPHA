import React, { useState, useMemo } from 'react';
import { Check, AlertTriangle, Sparkles, ShoppingBag, ArrowRight, RefreshCw, Info } from 'lucide-react';
import { Look, LookPiece, ProductVariant, ScreenId, SimulationState } from '../../types/store';
import { SIGNATURE_LOOK, formatNaira } from '../../data/mockData';

interface ShopTheLookScreenProps {
  onAddBundleToBag: (items: { product: any; variant: ProductVariant }[]) => void;
  onNavigate: (screen: ScreenId) => void;
  simulationState: SimulationState;
}

export const ShopTheLookScreen: React.FC<ShopTheLookScreenProps> = ({
  onAddBundleToBag,
  onNavigate,
  simulationState
}) => {
  const [pieces, setPieces] = useState<LookPiece[]>(SIGNATURE_LOOK.pieces);
  const [simulatedSoldOutPieceId, setSimulatedSoldOutPieceId] = useState<string | null>(null);
  const [bundleAddedToast, setBundleAddedToast] = useState(false);

  // Toggle inclusion of a piece
  const handleTogglePiece = (pieceId: string) => {
    setPieces((prev) =>
      prev.map((p) => (p.id === pieceId ? { ...p, included: !p.included } : p))
    );
  };

  // Change variant of a piece
  const handleVariantChange = (pieceId: string, variantId: string) => {
    setPieces((prev) =>
      prev.map((p) => (p.id === pieceId ? { ...p, selectedVariantId: variantId } : p))
    );
  };

  // Toggle out-of-stock simulation on piece 3 (Loafers)
  const toggleSimulateUnavailable = () => {
    setSimulatedSoldOutPieceId((prev) => (prev ? null : 'piece-3'));
  };

  // Calculate live bundle total
  const { totalKobo, includedPiecesCount, hasUnavailablePiece } = useMemo(() => {
    let total = 0;
    let count = 0;
    let unavailable = false;

    pieces.forEach((p) => {
      const isPieceSoldOut = simulatedSoldOutPieceId === p.id || simulationState === 'sold_out';
      if (p.included) {
        if (isPieceSoldOut) {
          unavailable = true;
        } else {
          const selectedVar = p.product.variants.find((v) => v.id === p.selectedVariantId) || p.product.variants[0];
          total += selectedVar.priceKobo;
          count += 1;
        }
      }
    });

    return { totalKobo: total, includedPiecesCount: count, hasUnavailablePiece: unavailable };
  }, [pieces, simulatedSoldOutPieceId, simulationState]);

  const handleAddBundle = () => {
    const validItemsToAdd = pieces
      .filter((p) => p.included && simulatedSoldOutPieceId !== p.id && simulationState !== 'sold_out')
      .map((p) => {
        const variant = p.product.variants.find((v) => v.id === p.selectedVariantId) || p.product.variants[0];
        return { product: p.product, variant };
      });

    if (validItemsToAdd.length > 0) {
      onAddBundleToBag(validItemsToAdd);
      setBundleAddedToast(true);
      setTimeout(() => setBundleAddedToast(false), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-20">
      {/* Editorial Header */}
      <div className="space-y-2 border-b border-[#E8E4DA] dark:border-[#2A2724] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#4E563E] dark:text-[#9BAA7C]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Signature Interactive Feature</span>
          <span>·</span>
          <span>Look 01</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif text-[#181716] dark:text-white">
          The Lagos Atelier Ensemble
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Curated by our design directors. Customize individual garment sizes, toggle pieces on or off, and bundle the styled wardrobe in a single transactional step.
        </p>
      </div>

      {/* Main Shop the Look Split Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Styled Editorial Visual */}
        <div className="lg:col-span-6 sticky top-20 space-y-4">
          <div className="relative aspect-[3/4] bg-neutral-900 border border-[#E8E4DA] dark:border-[#2A2724] overflow-hidden">
            <img
              src={SIGNATURE_LOOK.editorialImageUrl}
              alt="The Lagos Atelier Ensemble Full Outfit"
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-widest">
              Editorial Lookbook · 3 Pieces
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md p-3 text-xs text-neutral-800 dark:text-neutral-200 border border-white/20">
              <span className="font-semibold block font-serif">Styling Direction:</span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Oversized trench volume paired with structured wool-blend trousers and high-shine Goodyear loafers.
              </span>
            </div>
          </div>

          {/* Interactive Tester Simulation Control */}
          <div className="p-3 bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <Info className="w-3.5 h-3.5 text-[#4E563E] dark:text-[#9BAA7C]" />
              <span>Simulate out-of-stock piece recovery state:</span>
            </div>
            <button
              onClick={toggleSimulateUnavailable}
              className={`px-3 py-1 rounded text-[11px] font-mono transition-colors ${
                simulatedSoldOutPieceId
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200 border border-rose-300'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
              }`}
            >
              {simulatedSoldOutPieceId ? 'Disable Out-of-Stock Demo' : 'Simulate Sold-Out Loafer'}
            </button>
          </div>
        </div>

        {/* Right Column: Piece Configuration & Bundle Builder */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E4DA] dark:border-[#2A2724]">
            <h3 className="font-serif text-xl text-[#181716] dark:text-white">
              Pieces in This Outfit ({pieces.length})
            </h3>
            <span className="text-xs text-neutral-500 font-mono">
              Toggle to customize selection
            </span>
          </div>

          {/* Unavailable Piece Notice (if triggered) */}
          {hasUnavailablePiece && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-none text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>One piece in this look is temporarily unavailable</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-300 pl-6">
                The Polished Calfskin Penny Loafer is currently out of stock. Your other selections (Trench Coat & Trousers) are preserved and ready to bundle.
              </p>
            </div>
          )}

          {/* Piece Cards List */}
          <div className="space-y-4">
            {pieces.map((piece, index) => {
              const isPieceSoldOut = simulatedSoldOutPieceId === piece.id || simulationState === 'sold_out';
              const selectedVar =
                piece.product.variants.find((v) => v.id === piece.selectedVariantId) ||
                piece.product.variants[0];

              return (
                <div
                  key={piece.id}
                  className={`p-4 border transition-all ${
                    !piece.included
                      ? 'opacity-50 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30'
                      : isPieceSoldOut
                      ? 'border-amber-300 dark:border-amber-900 bg-amber-50/30 dark:bg-amber-950/20'
                      : 'border-[#E8E4DA] dark:border-[#2A2724] bg-white dark:bg-[#1A1917]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Piece Checkbox */}
                    <div className="pt-1">
                      <input
                        type="checkbox"
                        checked={piece.included}
                        onChange={() => handleTogglePiece(piece.id)}
                        className="w-4 h-4 rounded-none accent-[#4E563E] cursor-pointer"
                        aria-label={`Include ${piece.product.name} in look`}
                      />
                    </div>

                    {/* Thumbnail */}
                    <div className="w-16 h-20 bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0 border border-black/5">
                      <img
                        src={piece.product.images[0]?.url}
                        alt={piece.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details & Selectors */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                            Piece 0{index + 1} · {piece.product.category}
                          </span>
                          <h4 className="font-serif text-base text-[#181716] dark:text-white leading-tight">
                            {piece.product.name}
                          </h4>
                        </div>
                        <span className="text-xs font-mono font-medium tabular-nums text-[#181716] dark:text-white">
                          {formatNaira(selectedVar.priceKobo)}
                        </span>
                      </div>

                      {/* Variant Selectors (Size & Color) */}
                      {piece.included && !isPieceSoldOut && (
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div>
                            <label className="text-[10px] uppercase text-neutral-500 font-mono block mb-1">
                              Size
                            </label>
                            <select
                              value={piece.selectedVariantId}
                              onChange={(e) => handleVariantChange(piece.id, e.target.value)}
                              className="w-full bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] px-2 py-1.5 text-xs rounded-none cursor-pointer focus:outline-none"
                            >
                              {piece.product.variants.map((v) => (
                                <option key={v.id} value={v.id} disabled={v.stock <= 0}>
                                  {v.size} {v.stock <= 0 ? '(Sold Out)' : `(${v.colorName})`}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="text-[10px] uppercase text-neutral-500 font-mono block mb-1">
                              Selected Tone
                            </label>
                            <div className="flex items-center gap-1.5 py-1.5 px-2 bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] text-xs">
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-black/10"
                                style={{ backgroundColor: selectedVar.colorHex }}
                              />
                              <span className="truncate">{selectedVar.colorName}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Sold-out message */}
                      {isPieceSoldOut && (
                        <div className="text-[11px] text-amber-700 dark:text-amber-400 pt-1 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Sold out in selected variant. Will be skipped in bundle.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bundle Summary & Add to Bag CTA */}
          <div className="p-6 bg-[#FAF7F2] dark:bg-[#141312] border border-[#E8E4DA] dark:border-[#2A2724] space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-600 dark:text-neutral-400">
                Selected Ensemble Pieces:
              </span>
              <span className="font-mono font-medium text-[#181716] dark:text-white">
                {includedPiecesCount} of {pieces.length} Pieces
              </span>
            </div>

            <div className="flex items-center justify-between text-sm pt-2 border-t border-[#E8E4DA] dark:border-[#2A2724]">
              <span className="font-serif text-lg text-[#181716] dark:text-white">
                Combined Outfit Total:
              </span>
              <span className="text-2xl font-mono font-semibold text-[#4E563E] dark:text-[#9BAA7C] tabular-nums">
                {formatNaira(totalKobo)}
              </span>
            </div>

            <button
              onClick={handleAddBundle}
              disabled={includedPiecesCount === 0}
              className={`w-full py-4 px-6 text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 ${
                includedPiecesCount === 0
                  ? 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : 'bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716] hover:bg-[#333] dark:hover:bg-white/90'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                Add Selected Outfit to Bag ({includedPiecesCount} Pieces · {formatNaira(totalKobo)})
              </span>
            </button>

            {bundleAddedToast && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Successfully added {includedPiecesCount} pieces from The Lagos Atelier Ensemble to your shopping bag!
                </span>
              </div>
            )}

            <p className="text-[11px] text-neutral-500 text-center">
              Server-authoritative bundle validation guarantees stock reservation and precise order integrity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
