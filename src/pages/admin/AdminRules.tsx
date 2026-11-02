import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sliders, Save, CheckCircle2, Shield, AlertCircle } from 'lucide-react';
import { ChallengeTierConfig } from '../../types';

export const AdminRules: React.FC = () => {
  const { challengeTiers, updateChallengeTier } = useApp();

  const [selectedTierId, setSelectedTierId] = useState<string>(challengeTiers[3].id); // 100k
  const [successMsg, setSuccessMsg] = useState(false);

  const selectedTier = challengeTiers.find((t) => t.id === selectedTierId) || challengeTiers[0];

  const [formData, setFormData] = useState({
    fee: selectedTier.fee,
    p1Target: selectedTier.twoStep.phase1TargetPct,
    p2Target: selectedTier.twoStep.phase2TargetPct,
    dailyLoss: selectedTier.twoStep.dailyLossPct,
    maxDrawdown: selectedTier.twoStep.maxDrawdownPct,
    minDays: selectedTier.twoStep.minTradingDays,
    profitSplit: selectedTier.profitSplit,
    leverage: selectedTier.leverage
  });

  const handleSelectTier = (tier: ChallengeTierConfig) => {
    setSelectedTierId(tier.id);
    setFormData({
      fee: tier.fee,
      p1Target: tier.twoStep.phase1TargetPct,
      p2Target: tier.twoStep.phase2TargetPct,
      dailyLoss: tier.twoStep.dailyLossPct,
      maxDrawdown: tier.twoStep.maxDrawdownPct,
      minDays: tier.twoStep.minTradingDays,
      profitSplit: tier.profitSplit,
      leverage: tier.leverage
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateChallengeTier(selectedTierId, {
      fee: formData.fee,
      profitSplit: formData.profitSplit,
      leverage: formData.leverage,
      twoStep: {
        phase1TargetPct: formData.p1Target,
        phase2TargetPct: formData.p2Target,
        dailyLossPct: formData.dailyLoss,
        maxDrawdownPct: formData.maxDrawdown,
        minTradingDays: formData.minDays
      }
    });

    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white">Challenge Engine & Rule Configuration</h1>
        <p className="text-xs text-slate-400 mt-1">
          Dynamically tune profit targets, drawdown constraints, minimum trading days, and pricing across evaluation tiers.
        </p>
      </div>

      {/* Tier Selector Pills */}
      <div className="flex flex-wrap gap-2">
        {challengeTiers.map((tier) => (
          <button
            key={tier.id}
            onClick={() => handleSelectTier(tier)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              selectedTierId === tier.id
                ? 'bg-[#D4AF37] text-[#0B0F1A] shadow-md'
                : 'bg-[#131A2A] text-slate-300 border border-[#1F293D] hover:border-slate-500'
            }`}
          >
            {tier.label}
          </button>
        ))}
      </div>

      {/* Config Form */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 max-w-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#1F293D]">
          <div>
            <h2 className="text-lg font-bold text-white font-mono">
              Editing: {selectedTier.label} Configuration
            </h2>
            <span className="text-xs text-slate-400">
              Live updates propagate immediately to newly generated accounts.
            </span>
          </div>
          {successMsg && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1 rounded border border-emerald-800">
              <CheckCircle2 className="w-4 h-4" /> Parameters Updated
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Phase 1 Profit Target (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={formData.p1Target}
                onChange={(e) => setFormData({ ...formData, p1Target: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                Target amount: ${(selectedTier.size * (formData.p1Target / 100)).toLocaleString()}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Phase 2 Profit Target (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={formData.p2Target}
                onChange={(e) => setFormData({ ...formData, p2Target: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                Target amount: ${(selectedTier.size * (formData.p2Target / 100)).toLocaleString()}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Daily Drawdown Limit (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={formData.dailyLoss}
                onChange={(e) => setFormData({ ...formData, dailyLoss: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                Max daily loss: ${(selectedTier.size * (formData.dailyLoss / 100)).toLocaleString()}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Maximum Overall Drawdown (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={formData.maxDrawdown}
                onChange={(e) => setFormData({ ...formData, maxDrawdown: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-rose-500"
              />
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                Max loss threshold: ${(selectedTier.size * (formData.maxDrawdown / 100)).toLocaleString()}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Minimum Trading Days Required
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={formData.minDays}
                onChange={(e) => setFormData({ ...formData, minDays: parseInt(e.target.value) || 0 })}
                className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Challenge Registration Fee ($)
              </label>
              <input
                type="number"
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Default Profit Split (%)
              </label>
              <input
                type="number"
                value={formData.profitSplit}
                onChange={(e) => setFormData({ ...formData, profitSplit: parseInt(e.target.value) || 80 })}
                className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Leverage Ratio
              </label>
              <input
                type="text"
                value={formData.leverage}
                onChange={(e) => setFormData({ ...formData, leverage: e.target.value })}
                className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#1F293D] flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] font-bold rounded-xl text-xs transition-colors flex items-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Rules for {selectedTier.label}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
