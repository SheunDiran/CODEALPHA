import React from 'react';
import { Package, Clock, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { Order, ScreenId, SimulationState } from '../../types/store';
import { formatNaira } from '../../data/mockData';

interface OrderHistoryScreenProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onNavigate: (screen: ScreenId) => void;
  simulationState: SimulationState;
}

export const OrderHistoryScreen: React.FC<OrderHistoryScreenProps> = ({
  orders,
  onSelectOrder,
  onNavigate,
  simulationState
}) => {
  const isSimulatedEmpty = simulationState === 'empty' || orders.length === 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="space-y-1 border-b border-[#E8E4DA] dark:border-[#2A2724] pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#4E563E] dark:text-[#9BAA7C]">
          Client Wardrobe
        </span>
        <h1 className="text-3xl font-serif text-[#181716] dark:text-white">
          Order History & Tracking
        </h1>
        <p className="text-xs text-neutral-500">
          Review your previous acquisitions, view fulfillment progress, and download immutable purchase invoices.
        </p>
      </div>

      {isSimulatedEmpty ? (
        <div className="py-20 text-center space-y-4 border border-dashed border-[#E8E4DA] dark:border-[#2A2724] p-8 max-w-xl mx-auto">
          <Package className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-700 stroke-1" />
          <span className="font-serif italic text-2xl text-neutral-700 dark:text-neutral-300 block">
            No orders found in your account
          </span>
          <p className="text-xs text-neutral-500 leading-relaxed">
            When you complete an order, its complete receipt snapshot and courier tracking will appear here.
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
        <div className="space-y-4">
          {orders.map((order) => {
            const isDelivered = order.status === 'delivered';
            const isProcessing = order.status === 'processing';

            return (
              <div
                key={order.id}
                onClick={() => {
                  onSelectOrder(order);
                  onNavigate('order-detail');
                }}
                className="p-5 bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] hover:border-[#4E563E] dark:hover:border-[#9BAA7C] transition-all cursor-pointer space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E4DA]/60 dark:border-[#2A2724]/60">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-[#181716] dark:text-white">
                      {order.orderReference}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      · {order.createdAt}
                    </span>
                  </div>

                  {/* Status chip */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded ${
                        isDelivered
                          ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : isProcessing
                          ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3 overflow-hidden">
                      {order.items.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="w-12 h-14 bg-neutral-100 dark:bg-neutral-800 border-2 border-white dark:border-[#1A1917] overflow-hidden"
                        >
                          <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      <span>{order.itemCount} {order.itemCount === 1 ? 'Piece' : 'Pieces'}</span>
                      <span className="block text-[11px] text-neutral-400 truncate max-w-xs">
                        {order.items.map((i) => i.productName).join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 uppercase font-mono block">
                        Total Settled
                      </span>
                      <span className="text-base font-mono font-semibold text-[#181716] dark:text-white tabular-nums">
                        {formatNaira(order.totalKobo)}
                      </span>
                    </div>

                    <ChevronRight className="w-4 h-4 text-neutral-400" />
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
