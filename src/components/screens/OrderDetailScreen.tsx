import React from 'react';
import { ArrowLeft, CheckCircle2, Truck, Package, Clock, ShieldCheck, Printer } from 'lucide-react';
import { Order, ScreenId } from '../../types/store';
import { formatNaira } from '../../data/mockData';

interface OrderDetailScreenProps {
  order: Order;
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({
  order,
  onBack,
  onNavigate
}) => {
  const isDelivered = order.status === 'delivered';
  const isProcessing = order.status === 'processing';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Back link */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Order History</span>
      </button>

      {/* Header Card */}
      <div className="p-6 bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E4DA] dark:border-[#2A2724] gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold text-[#181716] dark:text-white">
                {order.orderReference}
              </span>
              <span
                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                  isDelivered
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className="text-xs text-neutral-400 font-mono mt-1">
              Recorded: {order.createdAt}
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E8E4DA] dark:border-[#2A2724] text-xs text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white rounded"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Courier Tracking Stepper */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block">
            Real-time Courier Tracking
          </span>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 bg-[#FAF7F2] dark:bg-[#121110] border border-[#4E563E] text-[#4E563E] dark:text-[#9BAA7C] font-medium">
              1. Ordered
            </div>
            <div className="p-2.5 bg-[#FAF7F2] dark:bg-[#121110] border border-[#4E563E] text-[#4E563E] dark:text-[#9BAA7C] font-medium">
              2. Tailored
            </div>
            <div
              className={`p-2.5 border transition-colors ${
                isDelivered || isProcessing
                  ? 'bg-[#FAF7F2] dark:bg-[#121110] border-[#4E563E] text-[#4E563E] dark:text-[#9BAA7C] font-medium'
                  : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-400'
              }`}
            >
              3. Dispatched
            </div>
            <div
              className={`p-2.5 border transition-colors ${
                isDelivered
                  ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-medium'
                  : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-400'
              }`}
            >
              4. Delivered
            </div>
          </div>
        </div>

        {/* Line Items Snapshot */}
        <div className="space-y-4 pt-2">
          <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block">
            Purchased Pieces & Pricing Snapshot ({order.items.length})
          </span>
          <div className="divide-y divide-[#E8E4DA]/60 dark:divide-[#2A2724]/60">
            {order.items.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-16 bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0 border border-black/5">
                    <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-[#181716] dark:text-white">
                      {item.productName}
                    </h4>
                    <div className="text-[11px] font-mono text-neutral-500 mt-0.5">
                      Tone: {item.colorName} · Size: {item.size} · Unit Price: {formatNaira(item.priceAtPurchaseKobo)} · Qty: {item.quantity}
                    </div>
                  </div>
                </div>
                <span className="font-mono font-semibold tabular-nums text-sm text-[#181716] dark:text-white">
                  {formatNaira(item.subtotalKobo)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Address and Financial Summary */}
        <div className="pt-4 border-t border-[#E8E4DA] dark:border-[#2A2724] grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
              Shipping Destination
            </span>
            <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <strong>{order.shippingAddress.fullName}</strong>
              <br />
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state}
              <br />
              {order.shippingAddress.country}
              <br />
              Phone: {order.shippingAddress.phone}
            </div>
            <div className="text-[11px] text-neutral-500 font-mono pt-1">
              Method: {order.deliveryMethod}
            </div>
          </div>

          <div className="space-y-2 text-right">
            <div className="flex items-center justify-between text-neutral-500">
              <span>Subtotal:</span>
              <span className="font-mono tabular-nums">{formatNaira(order.subtotalKobo)}</span>
            </div>
            <div className="flex items-center justify-between text-neutral-500">
              <span>Delivery Fee:</span>
              <span className="font-mono tabular-nums">
                {order.shippingKobo === 0 ? 'FREE' : formatNaira(order.shippingKobo)}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#E8E4DA] dark:border-[#2A2724]">
              <span className="font-serif text-base text-[#181716] dark:text-white">Total Settled:</span>
              <span className="text-2xl font-mono font-semibold text-[#4E563E] dark:text-[#9BAA7C] tabular-nums">
                {formatNaira(order.totalKobo)}
              </span>
            </div>
            <div className="text-[11px] text-neutral-400 font-mono pt-1">
              Payment: {order.paymentMethod}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
