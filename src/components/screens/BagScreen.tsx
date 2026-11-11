import React from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { CartItem, ScreenId, SimulationState } from '../../types/store';
import { formatNaira } from '../../data/mockData';

interface BagScreenProps {
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onNavigate: (screen: ScreenId) => void;
  simulationState: SimulationState;
}

export const BagScreen: React.FC<BagScreenProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  simulationState
}) => {
  const isSimulatedEmpty = simulationState === 'empty' || items.length === 0;

  const subtotalKobo = items.reduce((acc, item) => acc + item.unitPriceKobo * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD_KOBO = 10000000; // ₦100,000
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_KOBO - subtotalKobo);
  const shippingProgressPct = Math.min(100, Math.round((subtotalKobo / FREE_SHIPPING_THRESHOLD_KOBO) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-20">
      {/* Header */}
      <div className="space-y-1 border-b border-[#E8E4DA] dark:border-[#2A2724] pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#4E563E] dark:text-[#9BAA7C]">
          Shopping Bag
        </span>
        <h1 className="text-3xl font-serif text-[#181716] dark:text-white">
          Review Your Bag ({isSimulatedEmpty ? 0 : items.length} {items.length === 1 ? 'Piece' : 'Pieces'})
        </h1>
      </div>

      {isSimulatedEmpty ? (
        <div className="py-20 text-center space-y-4 border border-dashed border-[#E8E4DA] dark:border-[#2A2724] p-8 max-w-xl mx-auto">
          <ShoppingBag className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-700 stroke-1" />
          <span className="font-serif italic text-2xl text-neutral-700 dark:text-neutral-300 block">
            Your shopping bag is empty
          </span>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Your bag is currently waiting for your next sartorial selection. Explore our tailoring, overcoats, and handcrafted footwear.
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Line Items */}
          <div className="lg:col-span-7 space-y-6">
            {/* Free Shipping Progress Indicator */}
            <div className="p-4 bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#4E563E] dark:text-[#9BAA7C]" />
                  <span>
                    {remainingForFreeShipping === 0
                      ? 'Congratulations! You qualify for complimentary express courier across Nigeria.'
                      : `Add ${formatNaira(remainingForFreeShipping)} more to qualify for complimentary express shipping.`}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-neutral-500">{shippingProgressPct}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4E563E] dark:bg-[#9BAA7C] transition-all duration-300"
                  style={{ width: `${shippingProgressPct}%` }}
                />
              </div>
            </div>

            {/* Line Item Cards */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] flex gap-4"
                >
                  <div className="w-20 h-24 bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0 border border-black/5">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-serif text-base text-[#181716] dark:text-white leading-tight">
                          {item.productName}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono mt-0.5">
                          <span>Tone: {item.colorName}</span>
                          <span>·</span>
                          <span>Size: {item.size}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-medium tabular-nums text-[#181716] dark:text-white">
                        {formatNaira(item.unitPriceKobo * item.quantity)}
                      </span>
                    </div>

                    {/* Steppers & Removal */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#E8E4DA]/60 dark:border-[#2A2724]/60">
                      <div className="flex items-center border border-[#E8E4DA] dark:border-[#2A2724]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-neutral-500 hover:text-black dark:hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono tabular-nums text-neutral-800 dark:text-neutral-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1.5 text-neutral-500 hover:text-black dark:hover:text-white disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-xs text-neutral-400 hover:text-rose-600 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Guest Cart Continuity Note */}
            <div className="p-4 bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] text-xs text-neutral-500 space-y-1">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300 block">
                Session Bag Continuity
              </span>
              <p className="leading-relaxed text-[11px]">
                Your guest bag is locally preserved. If you proceed to sign in, your selections are seamlessly merged with your saved user profile so no garments are lost.
              </p>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 p-6 bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] space-y-6">
            <h3 className="font-serif text-lg text-[#181716] dark:text-white pb-3 border-b border-[#E8E4DA] dark:border-[#2A2724]">
              Summary & Estimates
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Subtotal ({items.length} pieces)</span>
                <span className="font-mono tabular-nums text-neutral-800 dark:text-neutral-200">
                  {formatNaira(subtotalKobo)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Estimated Shipping (Lagos/Nigeria)</span>
                <span className="font-mono tabular-nums text-neutral-800 dark:text-neutral-200">
                  {subtotalKobo >= FREE_SHIPPING_THRESHOLD_KOBO ? 'FREE' : '₦5,000'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Duties & Import Taxes</span>
                <span className="font-mono tabular-nums text-neutral-800 dark:text-neutral-200">
                  Included
                </span>
              </div>

              <div className="pt-3 border-t border-[#E8E4DA] dark:border-[#2A2724] flex items-center justify-between">
                <span className="font-serif text-base text-[#181716] dark:text-white">
                  Estimated Total
                </span>
                <span className="text-xl font-mono font-semibold text-[#4E563E] dark:text-[#9BAA7C] tabular-nums">
                  {formatNaira(subtotalKobo + (subtotalKobo >= FREE_SHIPPING_THRESHOLD_KOBO ? 0 : 500000))}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('checkout')}
              className="w-full py-4 px-6 bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716] text-xs uppercase tracking-widest font-semibold hover:bg-[#333] dark:hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4E563E]" />
              <span>Safe 3-Step Checkout with Demo Payment Guarantee</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
