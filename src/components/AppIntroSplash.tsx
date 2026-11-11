import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Volume2, VolumeX, ShieldCheck, User } from 'lucide-react';
import { ScreenId } from '../types/store';

interface AppIntroSplashProps {
  onEnter: (targetScreen?: ScreenId) => void;
}

export const AppIntroSplash: React.FC<AppIntroSplashProps> = ({ onEnter }) => {
  const [phase, setPhase] = useState<'drawing' | 'letters' | 'subtitle' | 'ready'>('drawing');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Play luxury atelier chime using Web Audio API
  const playLuxuryChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Dual oscillator chord (E5 and B5 harmonic luxury chime)
      const notes = [659.25, 987.77, 1318.51];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);

        noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + i * 0.12 + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.12 + 2.2);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 2.5);
      });
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  useEffect(() => {
    // Stage 1: Draw Monogram
    const t1 = setTimeout(() => {
      setPhase('letters');
      if (soundEnabled) playLuxuryChime();
    }, 900);

    // Stage 2: Typography Reveal
    const t2 = setTimeout(() => {
      setPhase('subtitle');
    }, 1800);

    // Stage 3: Interactive Action Buttons Ready
    const t3 = setTimeout(() => {
      setPhase('ready');
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [soundEnabled]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-[#100F0E] text-[#FAF7F2] p-6 select-none overflow-hidden animate-in fade-in duration-500">
      {/* Subtle architectural ambient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#24261E]/40 via-[#100F0E] to-[#0A0909] pointer-events-none" />

      {/* Top utility row: Sound toggle & Skip */}
      <div className="relative z-10 w-full max-w-md flex items-center justify-between text-xs font-mono text-neutral-400 pt-2">
        <button
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) playLuxuryChime();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#9BAA7C]" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-500" />}
          <span className="text-[11px]">{soundEnabled ? 'Atelier Chime: ON' : 'Muted'}</span>
        </button>

        <button
          onClick={() => onEnter('home')}
          className="text-[11px] uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
        >
          Skip to Storefront &rarr;
        </button>
      </div>

      {/* Central Animated Monogram & Wordmark Reveal */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-6 text-center max-w-sm px-4">
        {/* Animated Architectural Monogram */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          {/* Subtle glowing halo */}
          <div className="absolute inset-0 rounded-full bg-[#4E563E]/20 blur-xl animate-pulse" />

          {/* SVG Monogram with Animated Stroke Drawing */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          >
            {/* Outer Geometric Ring */}
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="#4E563E"
              strokeWidth="1.5"
              strokeDasharray="289"
              className="transition-all duration-1000 ease-out"
              style={{
                strokeDashoffset: phase === 'drawing' ? '289' : '0',
                opacity: 0.6
              }}
            />

            {/* Letter D Contour */}
            <path
              d="M 28 26 L 28 74 L 48 74 C 64 74 72 62 72 50 C 72 38 64 26 48 26 Z"
              fill="none"
              stroke="#FAF7F2"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="200"
              className="transition-all duration-1000 ease-out delay-150"
              style={{
                strokeDashoffset: phase === 'drawing' ? '200' : '0'
              }}
            />

            {/* Intertwined Letter W in Muted Olive Gold */}
            <path
              d="M 44 42 L 50 68 L 58 48 L 66 68 L 72 42"
              fill="none"
              stroke="#9BAA7C"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="150"
              className="transition-all duration-1000 ease-out delay-300"
              style={{
                strokeDashoffset: phase === 'drawing' ? '150' : '0'
              }}
            />
          </svg>
        </div>

        {/* Animated Brand Typography */}
        <div className="space-y-3">
          <div className="overflow-hidden">
            <h1
              className={`font-serif text-3xl sm:text-4xl text-white tracking-[0.25em] sm:tracking-[0.3em] uppercase transition-all duration-700 ease-out transform ${
                phase === 'drawing'
                  ? 'translate-y-8 opacity-0'
                  : 'translate-y-0 opacity-100'
              }`}
            >
              DIRAN WEARS
            </h1>
          </div>

          <div className="overflow-hidden">
            <div
              className={`flex items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-[#9BAA7C] transition-all duration-700 delay-200 ${
                phase === 'drawing' || phase === 'letters'
                  ? 'opacity-0 translate-y-4'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              <span>Lagos Atelier</span>
              <span>·</span>
              <span>Est. 2026</span>
            </div>
          </div>

          <p
            className={`text-xs text-neutral-400 font-normal leading-relaxed max-w-xs transition-opacity duration-700 delay-300 ${
              phase === 'ready' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            A contemporary Nigerian luxury house crafting unstructured tailoring, sculptural outerwear, and bespoke footwear.
          </p>
        </div>
      </div>

      {/* Action Gateway & App Entry Controls */}
      <div
        className={`relative z-10 w-full max-w-sm space-y-3 pb-4 transition-all duration-500 ${
          phase === 'ready'
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <button
          onClick={() => onEnter('home')}
          className="w-full py-4 px-6 bg-[#FAF7F2] text-[#141312] hover:bg-white text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-between group shadow-xl"
        >
          <span>Enter Storefront</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-[#4E563E]" />
        </button>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => onEnter('login')}
            className="py-3 px-3 bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <User className="w-3.5 h-3.5 text-[#9BAA7C]" />
            <span>Client Sign In</span>
          </button>
          <button
            onClick={() => onEnter('look')}
            className="py-3 px-3 bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9BAA7C]" />
            <span>Shop the Look</span>
          </button>
        </div>

        <div className="text-center pt-2">
          <span className="text-[10px] font-mono text-neutral-500">
            CodeAlpha Full Stack Internship · Task 1 Mobile-First PWA
          </span>
        </div>
      </div>
    </div>
  );
};
