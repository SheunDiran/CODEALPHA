import React, { useState } from 'react';
import { ArrowRight, UserCheck, AlertCircle, Sparkles } from 'lucide-react';
import { ScreenId, SimulationState } from '../../types/store';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
  onNavigate: (screen: ScreenId) => void;
  isFromCheckout: boolean;
  simulationState: SimulationState;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigate,
  isFromCheckout,
  simulationState
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isSimulatedError = simulationState === 'error';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSimulatedError || !email || !password) {
      setErrorMessage('Invalid credentials or network interruption. Please verify your email and password.');
      return;
    }
    onLoginSuccess(email);
  };

  const handleQuickFillDemo = () => {
    setEmail('seun@diranwears.com');
    setPassword('DemoPass2026!');
    setErrorMessage('');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#4E563E] dark:text-[#9BAA7C]">
          Client Concierge
        </span>
        <h1 className="text-3xl font-serif text-[#181716] dark:text-white">
          Sign In to Diran Wears
        </h1>
        <p className="text-xs text-neutral-500">
          Access your private wardrobe orders, delivery tracking, and saved pieces.
        </p>
      </div>

      {/* Checkout Redirection Notice */}
      {isFromCheckout && (
        <div className="p-3 bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-[#4E563E] shrink-0" />
          <span>Your shopping bag is safely held. You will return immediately to checkout after signing in.</span>
        </div>
      )}

      {/* Error Banner */}
      {(errorMessage || isSimulatedError) && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage || 'Simulated Auth Error: Invalid email or password provided.'}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-[#1A1917] p-6 border border-[#E8E4DA] dark:border-[#2A2724]">
        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            required
            className="w-full bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] px-3 py-2 text-xs text-[#181716] dark:text-white focus:outline-none focus:border-[#4E563E]"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
              Password
            </label>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#4E563E] hover:underline">
              Forgot?
            </a>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] px-3 py-2 text-xs text-[#181716] dark:text-white focus:outline-none focus:border-[#4E563E]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716] text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <span>Sign In</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Quick-fill Demo Account Button */}
        <button
          type="button"
          onClick={handleQuickFillDemo}
          className="w-full py-2.5 px-3 text-xs border border-dashed border-[#4E563E] text-[#4E563E] dark:text-[#9BAA7C] hover:bg-[#4E563E]/5 flex items-center justify-center gap-1.5 transition-colors font-mono"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick-Fill Demo Account (seun@diranwears.com)</span>
        </button>
      </form>

      {/* Switch to Register */}
      <div className="text-center text-xs text-neutral-500">
        Don't have a private account yet?{' '}
        <button
          onClick={() => onNavigate('register')}
          className="text-[#181716] dark:text-white font-semibold hover:underline"
        >
          Register here &rarr;
        </button>
      </div>
    </div>
  );
};
