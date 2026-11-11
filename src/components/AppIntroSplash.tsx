import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Volume2, VolumeX, ShieldCheck, User } from 'lucide-react';
import { ScreenId } from '../types/store';

interface AppIntroSplashProps {
  onEnter: (targetScreen?: ScreenId) => void;
}

export const AppIntroSplash: React.FC<AppIntroSplashProps> = ({ onEnter }) => {
  const [phase, setPhase] = useState<'drawing' | 'letters' | 'subtitle' | 'ready'>('drawing');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [opening, setOpening] = useState<'cover' | 'reveal' | 'pass'>('cover');
  const audio = useRef<AudioContext | null>(null);
  const leaving = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const [tearing, setTearing] = useState(false);

  useEffect(() => () => {
    window.clearTimeout(timer.current);
    window.speechSynthesis?.cancel();
    if (audio.current) void audio.current.close().catch(() => {});
  }, []);

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    const line = new SpeechSynthesisUtterance(text);
    line.lang = 'en-NG';
    line.rate = .9;
    window.speechSynthesis.speak(line);
  };

  const begin = (audible: boolean) => {
    setSoundEnabled(audible);
    setOpening('reveal');
    if (audible) {
      try {
        audio.current = new AudioContext();
        void audio.current.resume().catch(() => {});
      } catch { /* Visual entrance still works. */ }
      speak('Welcome to Diran Wears.');
      speak('Your Lagos Atelier pass is ready.');
    }
    timer.current = window.setTimeout(() => setOpening('pass'), 2150);
  };

  const enter = (target: ScreenId) => {
    if (leaving.current) return;
    leaving.current = true;
    setTearing(true);
    timer.current = window.setTimeout(() => onEnter(target),
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 340);
  };


  // Play luxury atelier chime using Web Audio API
  const playLuxuryChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = audio.current ??= new AudioContext();
      void ctx.resume().catch(() => {});

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
    if (opening !== 'pass') return;
    if (soundEnabled) playLuxuryChime();
    // Stage 1: Draw Monogram
    const t1 = setTimeout(() => {
      setPhase('letters');

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
  }, [opening]);

  if (opening !== 'pass') return (
    <main className="dw-cover">
      <div className="dw-motifs" aria-hidden="true">
        {['M8 8l7-4 5 6 5-6 7 4 4 9-7 4-2-4v17H13V17l-2 4-7-4z','M12 5h16l4 30h-9l-3-18-3 18H8z','M5 8h16l14 14-13 13L5 20z M11 13h1','M4 26c10-20 22 6 32-14 M4 30c10-20 22 6 32-14'].map((path, i, paths) =>
          [...paths, ...paths].slice(i * 2, i * 2 + 2).map((_, j) => <svg key={i * 2 + j} viewBox="0 0 40 40" style={{'--n': i * 2 + j} as React.CSSProperties}><path d={path}/></svg>))}
      </div>
      <button className="dw-skip" onClick={() => enter('home')}>Skip intro</button>
      <section className={`dw-opening ${opening === 'reveal' ? 'is-revealing' : ''}`}>
        <p className="dw-label">Lagos Atelier</p>
        <svg viewBox="0 0 100 100" className="dw-mark" role="img" aria-label="DW monogram">
          <circle cx="50" cy="50" r="46" pathLength="1" />
          <path pathLength="1" d="M28 26V74H48C64 74 72 62 72 50S64 26 48 26Z"/>
          <path pathLength="1" d="M44 42L50 68 58 48 66 68 72 42"/>
        </svg>
        {opening === 'reveal' ? <h1 className="dw-letters" aria-label="Diran Wears">
          {['DIRAN','WEARS'].map((word, i) => <span key={word} aria-hidden="true">
            {[...word].map((letter, j) => <b key={j} style={{'--n':i * 5 + j} as React.CSSProperties}>{letter}</b>)}
          </span>)}
        </h1> : <div className="dw-actions">
          <button onClick={() => begin(true)}>Enter with sound</button>
          <button onClick={() => begin(false)}>Continue silently</button>
        </div>}
      </section>
    </main>
  );

  return (
    <div className="dw-pass-stage">
      <div className={`dw-pass ${tearing ? 'is-tearing' : ''}`}>
      <div className="dw-pass-body">
      {/* Subtle architectural ambient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#24261E]/40 via-[#100F0E] to-[#0A0909] pointer-events-none" />

      {/* Top utility row: Sound toggle & Skip */}
      <div className="relative z-10 w-full max-w-md flex items-center justify-between text-xs font-mono text-neutral-400 pt-2">
        <button
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) playLuxuryChime();
            else if (audio.current) void audio.current.suspend().catch(() => {});
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#9BAA7C]" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-500" />}
          <span className="text-[11px]">{soundEnabled ? 'Atelier Chime: ON' : 'Muted'}</span>
        </button>

        <button
          onClick={() => enter('home')}
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
          onClick={() => enter('home')}
          className="w-full py-4 px-6 bg-[#FAF7F2] text-[#141312] hover:bg-white text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-between group shadow-xl"
        >
          <span>Enter Storefront</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-[#4E563E]" />
        </button>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => enter('login')}
            className="py-3 px-3 bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <User className="w-3.5 h-3.5 text-[#9BAA7C]" />
            <span>Client Sign In</span>
          </button>
          <button
            onClick={() => enter('look')}
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
      <aside className="dw-stub" aria-hidden="true">LAGOS ATELIER · ADMIT ONE · A01</aside>
      </div>
    </div>
  );
};
