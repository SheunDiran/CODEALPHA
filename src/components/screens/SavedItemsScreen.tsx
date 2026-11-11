import React from 'react';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product, ScreenId, SimulationState } from '../../types/store';
import { PRODUCTS, formatNaira } from '../../data/mockData';

interface SavedItemsScreenProps {
  savedProductIds: string[];
  onRemoveSave: (productId: string) => void;
  onMoveToBag: (product: Product) => void;
  onNavigate: (screen: ScreenId) => void;
  onSelectProduct: (product: Product) => void;
  simulationState: SimulationState;
}

export const SavedItemsScreen: React.FC<SavedItemsScreenProps> = ({
  savedProductIds,
  onRemoveSave,
  onMoveToBag,
  onNavigate,
  onSelectProduct,
  simulationState
}) => {
  const isSimulatedEmpty = simulationState === 'empty' || savedProductIds.length === 0;

  const savedProducts = PRODUCTS.filter((p) => savedProductIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="space-y-1 border-b border-[#E8E4DA] dark:border-[#2A2724] pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#4E563E] dark:text-[#9BAA7C]">
          Personal Wardrobe
        </span>
        <h1 className="text-3xl font-serif text-[#181716] dark:text-white">
          Saved Pieces ({isSimulatedEmpty ? 0 : savedProducts.length})
        </h1>
        <p className="text-xs text-neutral-500">
          Curated items saved across sessions. Guest items are preserved in localStorage and synced upon account sign-in.
        </p>
      </div>

      {isSimulatedEmpty ? (
        <div className="py-20 text-center space-y-4 border border-dashed border-[#E8E4DA] dark:border-[#2A2724] p-8 max-w-xl mx-auto">
          <Heart className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-700 stroke-1" />
          <span className="font-serif italic text-2xl text-neutral-700 dark:text-neutral-300 block">
            Your saved collection is empty
          </span>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Tap the heart on any piece in our collections or lookbooks to keep it here while you decide on sizes and tailoring.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="px-6 py-3 bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716] text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2"
          >
            <span>Explore The Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] overflow-hidden"
            >
              <div
                onClick={() => onSelectProduct(product)}
                className="relative aspect-[3/4] bg-[#FAF7F2] dark:bg-[#121110] overflow-hidden cursor-pointer"
              >
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveSave(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-black/60 text-neutral-700 dark:text-neutral-200 hover:text-rose-600 transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    {product.category}
                  </span>
                  <h4
                    onClick={() => onSelectProduct(product)}
                    className="font-serif text-lg text-[#181716] dark:text-white cursor-pointer hover:text-[#4E563E] transition-colors mt-0.5 line-clamp-1"
                  >
                    {product.name}
                  </h4>
                  <div className="text-sm font-mono font-medium text-[#181716] dark:text-white tabular-nums mt-1">
                    {formatNaira(product.basePriceKobo)}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E8E4DA] dark:border-[#2A2724] flex items-center gap-2">
                  <button
                    onClick={() => onMoveToBag(product)}
                    className="flex-1 py-2.5 px-3 bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716] text-xs uppercase tracking-wider font-semibold hover:opacity-90 flex items-center justify-center gap-1.5 transition-opacity"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                  <button
                    onClick={() => onRemoveSave(product.id)}
                    className="py-2.5 px-3 border border-[#E8E4DA] dark:border-[#2A2724] text-xs text-neutral-600 dark:text-neutral-400 hover:text-rose-600 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
