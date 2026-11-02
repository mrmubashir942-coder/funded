import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Shield, Zap, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

export const ChallengesPricingPage: React.FC<{ onOpenCheckout: () => void }> = ({ onOpenCheckout }) => {
  const { challengeTiers, setCheckoutData } = useApp();
  const [selectedModel, setSelectedModel] = useState<'2-step' | '1-step' | 'instant'>('2-step');
  const [selectedTierId, setSelectedTierId] = useState<string>('tier_100k');

  const handleCheckout = (tierId: string) => {
    setCheckoutData((prev) => ({
      ...prev,
      tierId,
      model: selectedModel
    }));
    onOpenCheckout();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
          Institutional Evaluation Programs
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Select Your Simulated Funding Program
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Transparent rules, zero recurring subscriptions, and institutional spreads. Prove your trading edge and earn up to 90% simulated performance rewards.
        </p>

        {/* Model Tabs */}
        <div className="pt-4 flex justify-center">
          <div className="inline-flex bg-[#131A2A] p-1.5 rounded-2xl border border-[#1F293D]">
            <button
              onClick={() => setSelectedModel('2-step')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedModel === '2-step'
                  ? 'bg-[#1F293D] text-[#D4AF37] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2-Step Standard (Phase 1 + Phase 2)
            </button>
            <button
              onClick={() => setSelectedModel('1-step')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedModel === '1-step'
                  ? 'bg-[#1F293D] text-[#D4AF37] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1-Step Rapid (Single Phase)
            </button>
            <button
              onClick={() => setSelectedModel('instant')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedModel === 'instant'
                  ? 'bg-[#1F293D] text-[#D4AF37] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Instant Simulated Funding
            </button>
          </div>
        </div>
      </div>

      {/* Account Size Quick Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto">
        {challengeTiers.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setSelectedTierId(tier.id)}
            className={`py-3.5 px-4 rounded-xl text-center border transition-all ${
              selectedTierId === tier.id
                ? 'bg-[#1F293D] border-[#D4AF37] text-white shadow-lg'
                : 'bg-[#131A2A] border-[#1F293D] text-slate-300 hover:border-slate-600'
            }`}
          >
            <div className="text-lg font-bold font-mono">{tier.label}</div>
            <div className="text-xs text-[#D4AF37] font-medium mt-1">
              ${tier.fee} one-time
            </div>
          </button>
        ))}
      </div>

      {/* Full Detailed Comparison Matrix */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-6 py-5 bg-[#172033] border-b border-[#1F293D] flex items-center justify-between">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            Program Parameter Matrix ({selectedModel.toUpperCase()})
          </div>
          <span className="text-xs text-slate-400 font-mono">Currencies: USD / EUR / GBP</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F293D] text-slate-400 bg-[#131A2A]">
                <th className="py-4 px-6 font-semibold">Account Capital</th>
                <th className="py-4 px-6 font-semibold">Phase 1 Target</th>
                <th className="py-4 px-6 font-semibold">Phase 2 Target</th>
                <th className="py-4 px-6 font-semibold">Max Daily Loss</th>
                <th className="py-4 px-6 font-semibold">Max Overall Loss</th>
                <th className="py-4 px-6 font-semibold">Leverage</th>
                <th className="py-4 px-6 font-semibold">Profit Split</th>
                <th className="py-4 px-6 font-semibold">Fee</th>
                <th className="py-4 px-6 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D] text-slate-200">
              {challengeTiers.map((tier) => {
                const isSelected = selectedTierId === tier.id;
                return (
                  <tr
                    key={tier.id}
                    className={`transition-colors ${
                      isSelected ? 'bg-[#1F293D]/60' : 'hover:bg-[#1A2234]'
                    }`}
                  >
                    <td className="py-4 px-6 font-bold font-mono text-white text-sm">
                      {tier.label}
                    </td>
                    <td className="py-4 px-6 font-mono text-emerald-400 font-medium">
                      {selectedModel === '2-step'
                        ? `${tier.twoStep.phase1TargetPct}% ($${(tier.size * 0.08).toLocaleString()})`
                        : selectedModel === '1-step'
                        ? `${tier.oneStep.profitTargetPct}% ($${(tier.size * 0.1).toLocaleString()})`
                        : 'None'}
                    </td>
                    <td className="py-4 px-6 font-mono text-emerald-400 font-medium">
                      {selectedModel === '2-step'
                        ? `${tier.twoStep.phase2TargetPct}% ($${(tier.size * 0.05).toLocaleString()})`
                        : 'N/A (1-Step)'}
                    </td>
                    <td className="py-4 px-6 font-mono text-amber-400 font-medium">
                      {selectedModel === '2-step'
                        ? `${tier.twoStep.dailyLossPct}% ($${(tier.size * 0.05).toLocaleString()})`
                        : `${tier.oneStep.dailyLossPct}% ($${(tier.size * 0.04).toLocaleString()})`}
                    </td>
                    <td className="py-4 px-6 font-mono text-rose-400 font-medium">
                      {selectedModel === '2-step'
                        ? `${tier.twoStep.maxDrawdownPct}% ($${(tier.size * 0.1).toLocaleString()})`
                        : `${tier.oneStep.maxDrawdownPct}% ($${(tier.size * 0.08).toLocaleString()})`}
                    </td>
                    <td className="py-4 px-6 font-mono">{tier.leverage}</td>
                    <td className="py-4 px-6 font-mono font-bold text-[#D4AF37]">
                      {tier.profitSplit}%
                    </td>
                    <td className="py-4 px-6 font-mono font-extrabold text-white text-sm">
                      ${tier.fee}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleCheckout(tier.id)}
                        className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] font-bold rounded-lg text-xs transition-all shadow-sm"
                      >
                        Enroll
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Available Add-Ons Banner */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <div className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase">
            Customization Add-Ons
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Enhance Your Evaluation Package at Checkout
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">90% Lifetime Profit Split</span>
              <span className="text-xs font-mono text-[#D4AF37]">+$39</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Boost your simulated reward split from standard 80-85% directly to 90% across all future payouts.
            </p>
          </div>

          <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Bi-Weekly First Payout</span>
              <span className="text-xs font-mono text-[#D4AF37]">+$29</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unlock your very first simulated reward request in 14 days rather than the standard 30-day first payout cycle.
            </p>
          </div>

          <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">No Minimum Trading Days</span>
              <span className="text-xs font-mono text-[#D4AF37]">+$49</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pass as soon as you hit the profit target without waiting for the 5 minimum days requirement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
