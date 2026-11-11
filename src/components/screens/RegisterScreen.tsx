import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ScreenId, SimulationState } from '../../types/store';

interface RegisterScreenProps {
  onRegisterSuccess: (email: string) => void;
  onNavigate: (screen: ScreenId) => void;
  simulationState: SimulationState;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onNavigate,
  simulationState
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegisterSuccess(email || 'seun@diranwears.com');
  };

  const handleQuickFill = () => {
    setFirstName('Oluwaseun');
    setLastName('Diran');
    setEmail('seun@diranwears.com');
    setPhone('+234 803 456 7890');
    setPassword('DemoPass2026!');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#4E563E] dark:text-[#9BAA7C]">
          Atelier Membership
        </span>
        <h1 className="text-3xl font-serif text-[#181716] dark:text-white">
          Create Your Account
        </h1>
        <p className="text-xs text-neutral-500">
          Join Diran Wears for private drop access, bespoke tailoring consultations, and synchronized wardrobe bags.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-[#1A1917] p-6 border border-[#E8E4DA] dark:border-[#2A2724]">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Oluwaseun"
              required
              className="w-full bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] px-3 py-2 text-xs text-[#181716] dark:text-white focus:outline-none focus:border-[#4E563E]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Diran"
              required
              className="w-full bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] px-3 py-2 text-xs text-[#181716] dark:text-white focus:outline-none focus:border-[#4E563E]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seun@diranwears.com"
            required
            className="w-full bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] px-3 py-2 text-xs text-[#181716] dark:text-white focus:outline-none focus:border-[#4E563E]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
            Phone (Nigeria)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+234 803 456 7890"
            className="w-full bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] px-3 py-2 text-xs text-[#181716] dark:text-white focus:outline-none focus:border-[#4E563E]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            required
            className="w-full bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724] px-3 py-2 text-xs text-[#181716] dark:text-white focus:outline-none focus:border-[#4E563E]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-[#181716] text-[#FAF7F2] dark:bg-white dark:text-[#181716] text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <span>Create Private Account</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Quick Fill Button */}
        <button
          type="button"
          onClick={handleQuickFill}
          className="w-full py-2.5 px-3 text-xs border border-dashed border-[#4E563E] text-[#4E563E] dark:text-[#9BAA7C] hover:bg-[#4E563E]/5 flex items-center justify-center gap-1.5 transition-colors font-mono"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick-Fill Sample Data</span>
        </button>
      </form>

      <div className="text-center text-xs text-neutral-500">
        Already have an account?{' '}
        <button
          onClick={() => onNavigate('login')}
          className="text-[#181716] dark:text-white font-semibold hover:underline"
        >
          Sign in here &rarr;
        </button>
      </div>
    </div>
  );
};
