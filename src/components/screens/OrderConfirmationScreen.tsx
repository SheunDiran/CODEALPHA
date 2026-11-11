import React from 'react';
import { CheckCircle2, ArrowRight, Package, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { Order, ScreenId } from '../../types/store';
import { formatNaira } from '../../data/mockData';

interface OrderConfirmationScreenProps {
  order: Order;
  onNavigate: (screen: ScreenId) => void;
  onSelectOrder: (order: Order) => void;
}

export const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({
  order,
  onNavigate,
  onSelectOrder
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10 pb-24">
      {/* Success Badge & Headline */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-[#4E563E]/10 dark:bg-[#9BAA7C]/20 text-[#4E563E] dark:text-[#9BAA7C] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs font-mono uppercase tracking-widest text-[#4E563E] dark:text-[#9BAA7C]">
          Order Confirmed & Logged
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#181716] dark:text-white">
          Thank you for choosing Diran Wears
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
          Your order has been recorded in our persistent store records. A confirmation receipt has been dispatched to your email.
        </p>
      </div>

      {/* Order Reference Card */}
      <div className="p-6 bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E4DA] dark:border-[#2A2724] gap-2">
          <div>
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              Order Reference
            </span>
            <div className="font-mono text-lg font-bold text-[#181716] dark:text-white">
              {order.orderReference}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs uppercase font-mono font-medium text-emerald-700 dark:text-emerald-400">
              Status: {order.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Fulfillment Timeline */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Fulfillment Timeline
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 bg-[#FAF7F2] dark:bg-[#121110] border border-[#4E563E] text-[#4E563E] dark:text-[#9BAA7C] font-medium">
              1. Confirmed
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-900 text-neutral-400">
              2. Atelier Inspection
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-900 text-neutral-400">
              3. Courier Dispatch
            </div>
          </div>
        </div>

        {/* Purchased Items Snapshot */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Snapshot of Purchased Pieces ({order.items.length})
          </div>
          <div className="divide-y divide-[#E8E4DA]/60 dark:divide-[#2A2724]/60">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0 border border-black/5">
                    <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-[#181716] dark:text-white">
                      {item.productName}
                    </h4>
                    <div className="text-[11px] font-mono text-neutral-500">
                      {item.colorName} · {item.size} · Qty: {item.quantity}
                    </div>
                  </div>
                </div>
                <span className="font-mono font-medium tabular-nums text-[#181716] dark:text-white">
                  {formatNaira(item.subtotalKobo)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address & Summary */}
        <div className="pt-4 border-t border-[#E8E4DA] dark:border-[#2A2724] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-neutral-400 uppercase tracking-wider font-mono text-[10px]">
              Destination
            </span>
            <div className="text-neutral-700 dark:text-neutral-300">
              {order.shippingAddress.fullName}
              <br />
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state}
              <br />
              Phone: {order.shippingAddress.phone}
            </div>
          </div>

          <div className="space-y-2 sm:text-right">
            <span className="text-neutral-400 uppercase tracking-wider font-mono text-[10px]">
              Final Amount Settled
            </span>
            <div className="font-mono text-2xl font-semibold text-[#4E563E] dark:text-[#9BAA7C] tabular-nums">
              {formatNaira(order.totalKobo)}
            </div>
            <div className="text-[11px] text-neutral-500 font-mono">
              Method: {order.paymentMethod}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => {
            onSelectOrder(order);
            onNavigate('order-detail');
          }}
          className="w-full sm:w-auto px-6 py-3.5 bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716] text-xs uppercase tracking-widest font-semibold hover:opacity-90 flex items-center justify-center gap-2"
        >
          <span>Track Order & View Invoice</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onNavigate('shop')}
          className="w-full sm:w-auto px-6 py-3.5 border border-[#E8E4DA] dark:border-[#2A2724] text-xs uppercase tracking-widest font-semibold hover:bg-white dark:hover:bg-neutral-800 transition-colors"
        >
          Continue Browsing Catalog
        </button>
      </div>
    </div>
  );
};
