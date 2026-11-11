import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, AlertTriangle, Check, ArrowRight, Lock, AlertCircle, RefreshCw } from 'lucide-react';
import { CartItem, ScreenId, SimulationState } from '../../types/store';
import { formatNaira } from '../../data/mockData';

interface CheckoutScreenProps {
  items: CartItem[];
  onPlaceOrder: (orderData: any) => void;
  onNavigate: (screen: ScreenId) => void;
  isLoggedIn: boolean;
  userEmail: string;
  simulationState: SimulationState;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  items,
  onPlaceOrder,
  onNavigate,
  isLoggedIn,
  userEmail,
  simulationState
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Address fields
  const [fullName, setFullName] = useState(isLoggedIn ? 'Oluwaseun Diran' : 'Oluwaseun Diran');
  const [email, setEmail] = useState(userEmail || 'seun@diranwears.com');
  const [street, setStreet] = useState('14 Alexander Avenue, Ikoyi');
  const [city, setCity] = useState('Lagos');
  const [stateName, setStateName] = useState('Lagos State');
  const [phone, setPhone] = useState('+234 803 456 7890');

  // Shipping
  const [shippingMethod, setShippingMethod] = useState<'express' | 'standard'>('express');

  // Simulation flags
  const [showRecoveryAlert, setShowRecoveryAlert] = useState(simulationState === 'checkout_recovery');
  const isSimulatedError = simulationState === 'error';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const subtotalKobo = items.reduce((acc, item) => acc + item.unitPriceKobo * item.quantity, 0);
  const shippingKobo = subtotalKobo >= 10000000 ? 0 : shippingMethod === 'express' ? 500000 : 800000;
  const totalKobo = subtotalKobo + shippingKobo;

  const handleAuthorizeDemoPayment = () => {
    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsSubmitting(false);
      if (isSimulatedError) {
        setErrorMessage('Demo Payment Gateway Error: Transaction timeout. Please retry authorization.');
        return;
      }

      onPlaceOrder({
        fullName,
        email,
        street,
        city,
        stateName,
        phone,
        shippingMethod: shippingMethod === 'express' ? 'Lagos Priority Courier (1–2 Days)' : 'Nationwide Standard Courier',
        paymentMethod: 'Demo Payment Authorization (CodeAlpha Sandbox)',
        subtotalKobo,
        shippingKobo,
        totalKobo,
        items
      });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Checkout Steps Progress Bar */}
      <div className="flex items-center justify-between border-b border-[#E8E4DA] dark:border-[#2A2724] pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#4E563E] dark:text-[#9BAA7C]">
            Secure Order Processing
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#181716] dark:text-white">
            Checkout
          </h1>
        </div>

        {/* Stepper tabs */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setStep(1)}
            className={`px-3 py-1 rounded transition-colors ${
              step === 1 ? 'bg-[#181716] text-white dark:bg-white dark:text-black font-semibold' : 'text-neutral-400'
            }`}
          >
            1. Address
          </button>
          <span className="text-neutral-300">&rarr;</span>
          <button
            onClick={() => setStep(2)}
            className={`px-3 py-1 rounded transition-colors ${
              step === 2 ? 'bg-[#181716] text-white dark:bg-white dark:text-black font-semibold' : 'text-neutral-400'
            }`}
          >
            2. Shipping
          </button>
          <span className="text-neutral-300">&rarr;</span>
          <button
            onClick={() => setStep(3)}
            className={`px-3 py-1 rounded transition-colors ${
              step === 3 ? 'bg-[#181716] text-white dark:bg-white dark:text-black font-semibold' : 'text-neutral-400'
            }`}
          >
            3. Payment
          </button>
        </div>
      </div>

      {/* Checkout Recovery Banner (§1.A State Switcher) */}
      {(showRecoveryAlert || simulationState === 'checkout_recovery') && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Checkout Inventory Recovery Notice</span>
          </div>
          <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-300">
            A concurrent customer just checked out the last unit of an accessory. Your bag has been automatically refreshed, preserving your primary garments and recalculating your total.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => setShowRecoveryAlert(false)}
              className="px-3 py-1.5 bg-[#4E563E] text-white font-semibold text-[11px] uppercase tracking-wider rounded"
            >
              Acknowledge & Continue Checkout
            </button>
            <button
              onClick={() => onNavigate('bag')}
              className="text-xs underline text-amber-800 dark:text-amber-200"
            >
              Review Updated Bag
            </button>
          </div>
        </div>
      )}

      {/* Error state */}
      {errorMessage && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Multi-Step Forms */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: CONTACT & DELIVERY ADDRESS */}
          {step === 1 && (
            <div className="bg-white dark:bg-[#1A1917] p-6 border border-[#E8E4DA] dark:border-[#2A2724] space-y-4">
              <h3 className="font-serif text-lg text-[#181716] dark:text-white pb-2 border-b border-[#E8E4DA] dark:border-[#2A2724]">
                1. Delivery Destination & Contact
              </h3>

              {!isLoggedIn && (
                <div className="p-3 bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] text-xs flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Checking out as Guest. Have an account?
                  </span>
                  <button
                    onClick={() => onNavigate('login')}
                    className="text-[#4E563E] dark:text-[#9BAA7C] font-semibold hover:underline"
                  >
                    Sign In &rarr;
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-neutral-500 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] p-2.5 text-xs text-[#181716] dark:text-white focus:outline-none focus:border-[#4E563E]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-neutral-500 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] p-2.5 text-xs text-[#181716] dark:text-white focus:outline-none focus:border-[#4E563E]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-neutral-500 block">
                  Street Address
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] p-2.5 text-xs text-[#181716] dark:text-white focus:outline-none focus:border-[#4E563E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-neutral-500 block">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] p-2.5 text-xs text-[#181716] dark:text-white focus:outline-none focus:border-[#4E563E]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-neutral-500 block">
                    State
                  </label>
                  <select
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] p-2.5 text-xs text-[#181716] dark:text-white focus:outline-none focus:border-[#4E563E]"
                  >
                    <option value="Lagos State">Lagos State</option>
                    <option value="Federal Capital Territory (Abuja)">Abuja (FCT)</option>
                    <option value="Rivers State">Rivers State (Port Harcourt)</option>
                    <option value="Oyo State">Oyo State (Ibadan)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-neutral-500 block">
                    Phone (Courier Contact)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] p-2.5 text-xs text-[#181716] dark:text-white focus:outline-none focus:border-[#4E563E]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716] text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
                >
                  <span>Continue to Delivery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SHIPPING SPEED */}
          {step === 2 && (
            <div className="bg-white dark:bg-[#1A1917] p-6 border border-[#E8E4DA] dark:border-[#2A2724] space-y-4">
              <h3 className="font-serif text-lg text-[#181716] dark:text-white pb-2 border-b border-[#E8E4DA] dark:border-[#2A2724]">
                2. Shipping & Dispatch Speed
              </h3>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-[#4E563E] bg-[#4E563E]/5'
                      : 'border-[#E8E4DA] dark:border-[#2A2724]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="accent-[#4E563E]"
                    />
                    <div>
                      <div className="font-semibold text-xs text-[#181716] dark:text-white">
                        Lagos Priority Atelier Courier
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Dispatched in bespoke garment bag · 1–2 business days
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#181716] dark:text-white">
                    {subtotalKobo >= 10000000 ? 'FREE' : '₦5,000'}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-[#4E563E] bg-[#4E563E]/5'
                      : 'border-[#E8E4DA] dark:border-[#2A2724]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-[#4E563E]"
                    />
                    <div>
                      <div className="font-semibold text-xs text-[#181716] dark:text-white">
                        Nationwide Express Air Cargo
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Insured door-to-door transit across Nigeria · 2–4 business days
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#181716] dark:text-white">
                    {subtotalKobo >= 10000000 ? 'FREE' : '₦8,000'}
                  </span>
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs text-neutral-500 hover:text-black dark:hover:text-white"
                >
                  &larr; Back to Address
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716] text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DEMO PAYMENT AUTHORIZATION */}
          {step === 3 && (
            <div className="bg-white dark:bg-[#1A1917] p-6 border border-[#E8E4DA] dark:border-[#2A2724] space-y-6">
              <h3 className="font-serif text-lg text-[#181716] dark:text-white pb-2 border-b border-[#E8E4DA] dark:border-[#2A2724]">
                3. Order Review & Demo Payment
              </h3>

              {/* Explicit Demo Callout */}
              <div className="p-4 bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#4E563E] dark:text-[#9BAA7C]">
                  <Lock className="w-4 h-4" />
                  <span>DEMO PAYMENT MODE — ZERO REAL CARD CHARGES</span>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  In accordance with CodeAlpha task specifications and security best practices, this store runs in an authenticated demonstration sandbox. No actual credit card numbers or banking secrets are collected.
                </p>
                <div className="pt-1 text-[11px] text-neutral-500 font-mono">
                  Gateway Provider: CodeAlpha Mock Transaction Engine (Test Mode Active)
                </div>
              </div>

              {/* Order Summary Snapshot */}
              <div className="space-y-2 text-xs">
                <span className="font-semibold text-neutral-700 dark:text-neutral-300 block">
                  Delivery Destination:
                </span>
                <p className="text-neutral-500">
                  {fullName} · {street}, {city}, {stateName} (Phone: {phone})
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-xs text-neutral-500 hover:text-black dark:hover:text-white"
                >
                  &larr; Back to Shipping
                </button>

                <button
                  onClick={handleAuthorizeDemoPayment}
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-[#4E563E] text-white hover:bg-[#3E4531] text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing Transaction...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Authorize Demo Order ({formatNaira(totalKobo)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary & Line Items */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1A1917] p-6 border border-[#E8E4DA] dark:border-[#2A2724] space-y-6">
          <h3 className="font-serif text-lg text-[#181716] dark:text-white pb-3 border-b border-[#E8E4DA] dark:border-[#2A2724]">
            Order Items ({items.length})
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-xs">
                <div className="w-12 h-14 bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0 border border-black/5">
                  <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-xs truncate text-[#181716] dark:text-white">
                    {item.productName}
                  </h4>
                  <div className="text-[10px] text-neutral-400 font-mono">
                    {item.size} · {item.colorName} · Qty: {item.quantity}
                  </div>
                </div>
                <span className="font-mono font-medium tabular-nums text-neutral-800 dark:text-neutral-200">
                  {formatNaira(item.unitPriceKobo * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E8E4DA] dark:border-[#2A2724] space-y-2 text-xs">
            <div className="flex items-center justify-between text-neutral-500">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums text-neutral-800 dark:text-neutral-200">
                {formatNaira(subtotalKobo)}
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-500">
              <span>Shipping Fee</span>
              <span className="font-mono tabular-nums text-neutral-800 dark:text-neutral-200">
                {shippingKobo === 0 ? 'FREE' : formatNaira(shippingKobo)}
              </span>
            </div>
            <div className="pt-3 border-t border-[#E8E4DA] dark:border-[#2A2724] flex items-center justify-between font-medium">
              <span className="font-serif text-base text-[#181716] dark:text-white">Total</span>
              <span className="text-xl font-mono text-[#4E563E] dark:text-[#9BAA7C] tabular-nums font-semibold">
                {formatNaira(totalKobo)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
