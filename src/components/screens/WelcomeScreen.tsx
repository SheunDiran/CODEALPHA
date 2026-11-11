import React from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { ScreenId } from '../../types/store';
import { HERO_CAMPAIGN_IMG } from '../../data/mockData';

interface WelcomeScreenProps {
  onExplore: () => void;
  onDirectShop: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onExplore, onDirectShop }) => {
  return (
    <div className="relative min-h-[85vh] flex flex-col justify-between bg-[#FAF7F2] dark:bg-[#141312] text-[#181716] dark:text-[#E8E4DA] overflow-hidden">
      {/* Background / Split Campaign Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[85vh]">
        {/* Left Column: Editorial Campaign Photography */}
        <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full bg-[#181716] overflow-hidden">
          <img
            src={HERO_CAMPAIGN_IMG}
            alt="Diran Wears Editorial Campaign in Lagos"
            className="w-full h-full object-cover object-center filter contrast-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:hidden" />
          <div className="absolute bottom-6 left-6 right-6 text-white lg:hidden">
            <span className="text-[11px] font-mono tracking-widest uppercase bg-white/20 backdrop-blur-md px-2.5 py-1 rounded">
              Campaign 01 · Lagos Atelier
            </span>
          </div>
        </div>

        {/* Right Column: Editorial Welcome & Immediate Navigation Action */}
        <div className="lg:col-span-5 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 lg:py-20 bg-[#FAF7F2] dark:bg-[#141312]">
          <div className="max-w-md space-y-6">
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#4E563E] dark:text-[#9BAA7C]">
              <span>Collection 2026</span>
              <span>·</span>
              <span>Lagos, Nigeria</span>
            </div>

            {/* Wordmark & Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight leading-[1.1] text-[#181716] dark:text-white">
                DIRAN WEARS
              </h1>
              <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
                Modern Nigerian luxury tailored with quiet restraint. Woven in natural Normandy flax, unstructured tropical wools, and handcrafted calfskin footwear.
              </p>
            </div>

            {/* Editorial highlights */}
            <div className="py-2 border-y border-[#E8E4DA] dark:border-[#2A2724] space-y-2 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#4E563E] dark:text-[#9BAA7C]" />
                <span>Immediate access — zero forced intro delays</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#4E563E] dark:text-[#9BAA7C]" />
                <span>Signature Shop the Look interactive bundle flow</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#4E563E] dark:text-[#9BAA7C]" />
                <span>Transparent pricing in Nigerian Naira (₦)</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={onExplore}
                className="w-full flex items-center justify-between px-6 py-4 bg-[#181716] text-[#FAF7F2] dark:bg-[#FAF7F2] dark:text-[#181716] hover:bg-[#333] dark:hover:bg-white/90 rounded-none text-xs uppercase tracking-widest font-semibold transition-all group"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onDirectShop}
                className="w-full text-center py-2 text-xs text-neutral-500 hover:text-black dark:hover:text-white transition-colors underline underline-offset-4"
              >
                Direct to Shop Catalog & Search
              </button>
            </div>

            {/* Architecture review note */}
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500 pt-4 leading-normal">
              <strong>Reviewer Note:</strong> In production, this welcome experience is presented once per browser via a cookie/localStorage flag. Returning shoppers and direct product URLs bypass this screen directly to maintain zero-friction access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
