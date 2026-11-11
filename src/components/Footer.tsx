import React from 'react';
import { ScreenId } from '../types/store';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#E8E4DA] dark:border-[#2A2724] bg-[#F5F1E8] dark:bg-[#100F0E] text-[#181716] dark:text-[#E8E4DA] transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Philosophy */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-2xl font-serif tracking-[0.2em] uppercase text-[#181716] dark:text-[#F5F2EB] block">
              DIRAN WEARS
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
              A contemporary Nigerian luxury fashion house crafting unstructured tailoring, sculptural outerwear, and bespoke footwear. Built with warm ivory flax, deep ink black tones, and muted olive gabardine.
            </p>
            <div className="text-[11px] text-neutral-500 pt-2 font-mono">
              Atelier & Showroom: 14 Alexander Avenue, Ikoyi, Lagos, Nigeria
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Wardrobe
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#4E563E] transition-colors"
                >
                  All Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('look')}
                  className="hover:text-[#4E563E] transition-colors flex items-center gap-1.5"
                >
                  <span>Shop the Look</span>
                  <span className="text-[9px] px-1 py-0.2 bg-[#4E563E]/10 text-[#4E563E] dark:text-[#9BAA7C] rounded font-mono">
                    SIGNATURE
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#4E563E] transition-colors"
                >
                  Unstructured Tailoring
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#4E563E] transition-colors"
                >
                  Goodyear Welted Footwear
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge & CodeAlpha Details */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Client Care & Demo
            </div>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('orders')}
                  className="hover:text-[#4E563E] transition-colors"
                >
                  Order Tracking & History
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('saved')}
                  className="hover:text-[#4E563E] transition-colors"
                >
                  Saved Wardrobe Pieces
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('welcome')}
                  className="hover:text-[#4E563E] transition-colors"
                >
                  Campaign Welcome View
                </button>
              </li>
              <li className="pt-2 text-[11px] text-neutral-500 font-mono">
                CodeAlpha Task 1: Simple E-Commerce Store
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#E8E4DA]/60 dark:border-[#2A2724]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; 2026 DIRAN WEARS. All rights reserved. Prices displayed in Nigerian Naira (₦).
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Repository: CodeAlpha_DiranWears</span>
            <span>·</span>
            <span>Internship Submission: Task 1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
