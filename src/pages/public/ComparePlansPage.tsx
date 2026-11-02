import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Shield, Zap, Sparkles, ArrowRight, HelpCircle, Layers, Sliders } from 'lucide-react';
import { ChallengeModel } from '../../types';

export const ComparePlansPage: React.FC<{ onOpenCheckout: () => void }> = ({ onOpenCheckout }) => {
  const { challengeTiers, setCheckoutData } = useApp();
  const [selectedTierSize, setSelectedTierSize] = useState<number>(100000);

  const selectedTier = challengeTiers.find((t) => t.size === selectedTierSize) || challengeTiers[4];

  const handleEnroll = (model: ChallengeModel) => {
    setCheckoutData((prev) => ({
      ...prev,
      tierId: selectedTier.id,
      model
    }));
    onOpenCheckout();
  };

  const planTypes: {
    key: ChallengeModel;
    name: string;
    badge: string;
    p1Target: string;
    p2Target: string;
    p3Target: string;
    dailyLoss: string;
    maxDrawdown: string;
    minDays: string;
    payoutSpeed: string;
    profitSplit: string;
    leverage: string;
    recommended?: boolean;
    description: string;
  }[] = [
    {
      key: '1-step',
      name: '1-Step Rapid',
      badge: 'Speed Oriented',
      p1Target: '10%',
      p2Target: 'N/A',
      p3Target: 'N/A',
      dailyLoss: '4% ($' + (selectedTier.size * 0.04).toLocaleString() + ')',
      maxDrawdown: '8% ($' + (selectedTier.size * 0.08).toLocaleString() + ')',
      minDays: '3 Days',
      payoutSpeed: 'Bi-Weekly',
      profitSplit: '80% - 90%',
      leverage: '1:50',
      description: 'Single milestone verification for confident momentum traders who want the fastest route to funded rewards.'
    },
    {
      key: '2-step',
      name: '2-Step Standard',
      badge: 'Most Popular',
      recommended: true,
      p1Target: '8%',
      p2Target: '5%',
      p3Target: 'N/A',
      dailyLoss: '5% ($' + (selectedTier.size * 0.05).toLocaleString() + ')',
      maxDrawdown: '10% ($' + (selectedTier.size * 0.1).toLocaleString() + ')',
      minDays: '5 Days',
      payoutSpeed: 'Bi-Weekly',
      profitSplit: '85% - 90%',
      leverage: '1:100',
      description: 'Our flagship institutional evaluation. Generous drawdown buffers with low targets and refundable fee on first payout.'
    },
    {
      key: '2-step-advanced',
      name: '2-Step Advanced',
      badge: 'Zero Min Days',
      p1Target: '7%',
      p2Target: '4%',
      p3Target: 'N/A',
      dailyLoss: '4% ($' + (selectedTier.size * 0.04).toLocaleString() + ')',
      maxDrawdown: '12% ($' + (selectedTier.size * 0.12).toLocaleString() + ')',
      minDays: '0 Days',
      payoutSpeed: '14 Days / On-Demand',
      profitSplit: '90%',
      leverage: '1:100',
      description: 'Designed for seasoned operators. 12% max drawdown cushion, 0 minimum days requirement, and instant 90% reward split.'
    },
    {
      key: '3-step',
      name: '3-Step Evaluation',
      badge: 'Lowest Stress',
      p1Target: '6%',
      p2Target: '6%',
      p3Target: '5%',
      dailyLoss: '4% ($' + (selectedTier.size * 0.04).toLocaleString() + ')',
      maxDrawdown: '12% ($' + (selectedTier.size * 0.12).toLocaleString() + ')',
      minDays: '3 Days',
      payoutSpeed: 'Bi-Weekly',
      profitSplit: '85%',
      leverage: '1:100',
      description: 'Ultra-low profit targets across 3 gentle phases. Built for swing traders who prioritize steady capital preservation.'
    },
    {
      key: 'instant',
      name: 'Instant Simulated',
      badge: 'Zero Evaluation',
      p1Target: 'None',
      p2Target: 'None',
      p3Target: 'None',
      dailyLoss: '4% ($' + (selectedTier.size * 0.04).toLocaleString() + ')',
      maxDrawdown: '6% ($' + (selectedTier.size * 0.06).toLocaleString() + ')',
      minDays: '0 Days',
      payoutSpeed: 'Bi-Weekly',
      profitSplit: '80%',
      leverage: '1:50',
      description: 'Skip evaluations entirely. Direct simulated capital allocation with instant reward eligibility from day one.'
    },
    {
      key: 'starter',
      name: 'Starter Challenge',
      badge: 'Low-Cost Entry',
      p1Target: '8%',
      p2Target: 'N/A',
      p3Target: 'N/A',
      dailyLoss: '5% ($' + (selectedTier.size * 0.05).toLocaleString() + ')',
      maxDrawdown: '10% ($' + (selectedTier.size * 0.1).toLocaleString() + ')',
      minDays: '0 Days',
      payoutSpeed: 'Bi-Weekly',
      profitSplit: '80%',
      leverage: '1:100',
      description: 'Accessible low-fee gateway for traders seeking to validate their edge before scaling into larger six-figure accounts.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
          Dynamic Plan Comparison
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Compare All 6 Evaluation Models
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          From 1-Step rapid verification to 3-Step low-stress targets and Instant simulated funding. Find the precise risk model matched to your trading edge.
        </p>

        {/* Account Size Selector */}
        <div className="pt-4 flex flex-wrap justify-center gap-2">
          {challengeTiers.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTierSize(t.size)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedTierSize === t.size
                  ? 'bg-[#D4AF37] text-[#0B0F1A] shadow-md'
                  : 'bg-[#131A2A] text-slate-300 border border-[#1F293D] hover:border-slate-500'
              }`}
            >
              {t.label} Account
            </button>
          ))}
        </div>
      </div>

      {/* Grid of the 6 Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planTypes.map((plan) => (
          <div
            key={plan.key}
            className={`bg-[#131A2A] border rounded-2xl p-6 space-y-5 flex flex-col justify-between transition-all shadow-xl ${
              plan.recommended
                ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-[#D4AF37]/5'
                : 'border-[#1F293D] hover:border-slate-600'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#1F293D] text-[#D4AF37] border border-[#D4AF37]/20 uppercase">
                  {plan.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {selectedTier.label}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{plan.description}</p>
              </div>

              {/* Rules List */}
              <div className="space-y-2.5 pt-2 border-t border-[#1F293D] text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[#1F293D]/50">
                  <span className="text-slate-400">Phase 1 Target:</span>
                  <span className="text-emerald-400 font-bold">{plan.p1Target}</span>
                </div>
                {plan.p2Target !== 'N/A' && (
                  <div className="flex justify-between py-1 border-b border-[#1F293D]/50">
                    <span className="text-slate-400">Phase 2 Target:</span>
                    <span className="text-emerald-400 font-bold">{plan.p2Target}</span>
                  </div>
                )}
                {plan.p3Target !== 'N/A' && (
                  <div className="flex justify-between py-1 border-b border-[#1F293D]/50">
                    <span className="text-slate-400">Phase 3 Target:</span>
                    <span className="text-emerald-400 font-bold">{plan.p3Target}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-[#1F293D]/50">
                  <span className="text-slate-400">Daily Loss Limit:</span>
                  <span className="text-amber-400 font-bold">{plan.dailyLoss}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1F293D]/50">
                  <span className="text-slate-400">Max Overall Drawdown:</span>
                  <span className="text-rose-400 font-bold">{plan.maxDrawdown}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1F293D]/50">
                  <span className="text-slate-400">Minimum Days:</span>
                  <span className="text-white">{plan.minDays}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1F293D]/50">
                  <span className="text-slate-400">Reward Profit Split:</span>
                  <span className="text-[#D4AF37] font-bold">{plan.profitSplit}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Leverage:</span>
                  <span className="text-white">{plan.leverage}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1F293D] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400">One-Time Fee:</span>
                  <div className="text-2xl font-extrabold text-[#D4AF37] font-mono">
                    ${plan.key === 'starter' ? Math.round(selectedTier.fee * 0.75) : selectedTier.fee}
                  </div>
                </div>
                <button
                  onClick={() => handleEnroll(plan.key)}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A] rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Select Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
