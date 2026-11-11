import React, { useState } from 'react';
import { Download, Share, CheckCircle2, X, Smartphone, Laptop } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'full' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'compact' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);
  const [installedNotice, setInstalledNotice] = useState(false);

  // If already running inside standalone PWA window, show small verified tag or hide
  if (isInstalled) {
    if (variant === 'banner') return null;
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-[#4E563E] dark:text-[#9BAA7C] bg-[#4E563E]/10 rounded">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Installed App</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstalledNotice(true);
        setTimeout(() => setInstalledNotice(false), 3000);
      }
    } else {
      // Show guided desktop & mobile installation modal
      setShowModal(true);
    }
  };

  return (
    <>
      {variant === 'compact' ? (
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#4E563E] hover:bg-[#3E4531] text-white text-xs font-medium transition-all shadow-sm shrink-0"
          title="Install Diran Wears App on Desktop / Mobile"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Install App</span>
          <span className="sm:hidden">Install</span>
        </button>
      ) : variant === 'banner' ? (
        <div className="bg-[#FAF7F2] dark:bg-[#1A1917] border-b border-[#E8E4DA] dark:border-[#2A2724] px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-[#4E563E] dark:text-[#9BAA7C]" />
            <span className="text-neutral-700 dark:text-neutral-300">
              Install <strong>Diran Wears</strong> for instant offline wardrobe access and full-screen browsing.
            </span>
          </div>
          <button
            onClick={handleInstallClick}
            className="px-3 py-1 bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716] font-semibold text-[11px] uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Download PWA
          </button>
        </div>
      ) : (
        <button
          onClick={handleInstallClick}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#4E563E] hover:bg-[#3E4531] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Install Diran Wears App (Desktop & Mobile)</span>
        </button>
      )}

      {/* Guided Installation Dialog for iOS & Desktop browsers */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-[#FAF7F2] dark:bg-[#141312] text-[#181716] dark:text-[#E8E4DA] border border-[#E8E4DA] dark:border-[#2A2724] rounded-2xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#141312] text-white flex items-center justify-center font-serif text-lg border border-[#4E563E]">
                  DW
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#181716] dark:text-white">
                    Install Diran Wears
                  </h3>
                  <span className="text-xs text-neutral-500 font-mono">
                    Progressive Web Application (PWA)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <p>
                Experience Diran Wears as a standalone application on your device with faster startup, offline catalog caching, and zero browser address bars.
              </p>

              {/* iOS Instructions */}
              {isIOS ? (
                <div className="p-4 bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] rounded-lg space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-200">
                    <Smartphone className="w-4 h-4 text-[#4E563E]" />
                    <span>How to install on iPhone & iPad (Safari):</span>
                  </div>
                  <ol className="list-decimal pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
                    <li>Tap the <strong>Share</strong> button (box with upward arrow) in the Safari bottom bar.</li>
                    <li>Scroll down the share sheet and tap <strong>Add to Home Screen</strong>.</li>
                    <li>Confirm by tapping <strong>Add</strong> in the top-right corner.</li>
                  </ol>
                </div>
              ) : (
                /* Desktop Chrome / Edge Instructions */
                <div className="p-4 bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724] rounded-lg space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-200">
                    <Laptop className="w-4 h-4 text-[#4E563E]" />
                    <span>How to install on Desktop (Chrome, Edge, Brave):</span>
                  </div>
                  <ol className="list-decimal pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
                    <li>Look for the <strong>Install</strong> icon in your browser URL address bar (right side).</li>
                    <li>Or click browser menu (<strong className="font-mono">⋮</strong>) &rarr; <strong>Cast, save, and share</strong> &rarr; <strong>Install Diran Wears</strong>.</li>
                    <li>Launch directly from your desktop dock or application menu.</li>
                  </ol>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 px-4 bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716] text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
