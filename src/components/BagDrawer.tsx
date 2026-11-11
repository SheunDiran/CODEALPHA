import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem, ScreenId } from '../types/store';
import { formatNaira } from '../data/mockData';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate
}) => {
  if (!isOpen) return null;

  const subtotalKobo = items.reduce((acc, item) => acc + item.unitPriceKobo * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    onNavigate('checkout');
  };

  const handleViewBag = () => {
    onClose();
    onNavigate('bag');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF7F2] dark:bg-[#141312] text-[#181716] dark:text-[#E8E4DA] h-full shadow-2xl flex flex-col justify-between border-l border-[#E8E4DA] dark:border-[#2A2724] animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#E8E4DA] dark:border-[#2A2724] flex items-center justify-between bg-white dark:bg-[#1A1917]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#4E563E] dark:text-[#9BAA7C]" />
            <h3 className="font-serif text-lg text-[#181716] dark:text-white">
              Your Wardrobe Bag ({items.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white rounded"
            aria-label="Close bag drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <span className="font-serif italic text-xl text-neutral-500 block">
                Your bag is empty
              </span>
              <p className="text-xs text-neutral-400">
                Browse our new drops or explore the signature atelier look.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('shop');
                }}
                className="px-5 py-2.5 bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716] text-xs uppercase tracking-widest font-semibold"
              >
                Explore Shop
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] flex gap-3 text-xs"
              >
                <div className="w-16 h-20 bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0 border border-black/5">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-sm line-clamp-1 text-[#181716] dark:text-white">
                      {item.productName}
                    </h4>
                    <div className="text-[11px] font-mono text-neutral-500 mt-0.5">
                      {item.colorName} · {item.size}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono font-medium tabular-nums text-neutral-800 dark:text-neutral-200">
                      {formatNaira(item.unitPriceKobo * item.quantity)}
                    </span>

                    <div className="flex items-center border border-[#E8E4DA] dark:border-[#2A2724]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-1.5 py-0.5 text-neutral-500 hover:text-black dark:hover:text-white"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="px-2 font-mono text-[11px]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        className="px-1.5 py-0.5 text-neutral-500 hover:text-black dark:hover:text-white disabled:opacity-30"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-neutral-400 hover:text-rose-600"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white dark:bg-[#1A1917] border-t border-[#E8E4DA] dark:border-[#2A2724] space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500">Subtotal:</span>
              <span className="font-mono text-base font-medium tabular-nums text-[#181716] dark:text-white">
                {formatNaira(subtotalKobo)}
              </span>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716] text-xs uppercase tracking-widest font-semibold hover:opacity-90 flex items-center justify-center gap-2"
              >
                <span>Checkout Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleViewBag}
                className="w-full py-2.5 text-xs text-neutral-600 dark:text-neutral-400 hover:underline text-center"
              >
                View Full Bag & Shipping Calculator
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
