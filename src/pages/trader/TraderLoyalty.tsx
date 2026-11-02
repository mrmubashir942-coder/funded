import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Gift, Award, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const TraderLoyalty: React.FC = () => {
  const { loyalty, redeemLoyaltyReward } = useApp();
  const [feedback, setFeedback] = useState<string | null>(null);

  const rewardsCatalog = [
    {
      id: 'rew_1',
      title: '10% Challenge Discount Voucher',
      cost: 500,
      description: 'Applicable to any new challenge enrollment tier up to $200,000.'
    },
    {
      id: 'rew_2',
      title: 'VIP Payout Priority Lane',
      cost: 800,
      description: 'Guarantees simulated payout review and dispatch within 2 business hours.'
    },
    {
      id: 'rew_3',
      title: 'Free Phase 1 Parameter Reset',
      cost: 1200,
      description: 'One-time automatic reset of a breached Phase 1 account to starting balance.'
    },
    {
      id: 'rew_4',
      title: '90% Lifetime Profit Split Upgrade',
      cost: 2000,
      description: 'Permanently unlocks 90% reward split on your current funded account.'
    }
  ];

  const handleRedeem = (cost: number, title: string) => {
    const res = redeemLoyaltyReward(cost, title);
    setFeedback(res.message);
    setTimeout(() => setFeedback(null), 3000);
  };

  const nextTierPts = loyalty.tier === 'BRONZE' ? 1000 : loyalty.tier === 'SILVER' ? 3000 : 5000;
  const progressPct = Math.min(100, Math.round((loyalty.points / nextTierPts) * 100));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Ryvexia Edge Club — Loyalty & Points</h1>
          <p className="text-xs text-slate-400 mt-1">
            Earn points with every disciplined trading day, passed milestone, and community contribution.
          </p>
        </div>

        <div className="bg-[#131A2A] border border-[#D4AF37]/40 px-4 py-2 rounded-xl text-xs font-mono text-white flex items-center gap-2 shadow-lg">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Balance: <strong className="text-[#D4AF37] text-sm">{loyalty.points.toLocaleString()}</strong> Edge Points</span>
        </div>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 font-mono text-center">
          {feedback}
        </div>
      )}

      {/* Tier Progress Card */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400">Current Status:</span>
            <div className="text-2xl font-extrabold text-[#D4AF37] font-mono mt-0.5">
              {loyalty.tier} STATUS TIER
            </div>
          </div>
          <div className="text-right text-xs font-mono text-slate-400">
            <span>Next Tier: <strong>GOLD ({nextTierPts} pts)</strong></span>
          </div>
        </div>

        <div className="w-full bg-[#0B0F1A] h-3 rounded-full overflow-hidden border border-[#1F293D]">
          <div
            className="bg-gradient-to-r from-[#D4AF37] to-[#E5C158] h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Redeem Rewards Catalog */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Gift className="w-4 h-4 text-[#D4AF37]" />
          Redeem Edge Points for Trader Perks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rewardsCatalog.map((rew) => {
            const canAfford = loyalty.points >= rew.cost;
            return (
              <div
                key={rew.id}
                className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{rew.title}</h3>
                    <span className="text-xs font-mono font-bold text-[#D4AF37] bg-[#0B0F1A] px-2.5 py-1 rounded border border-[#1F293D]">
                      {rew.cost} PTS
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{rew.description}</p>
                </div>

                <div className="pt-3 border-t border-[#1F293D] flex justify-end">
                  <button
                    disabled={!canAfford}
                    onClick={() => handleRedeem(rew.cost, rew.title)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      canAfford
                        ? 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] shadow-md'
                        : 'bg-[#1F293D] text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem Perk' : 'Need More Points'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Point History */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Points Ledger</h2>
        <div className="divide-y divide-[#1F293D] text-xs font-mono">
          {loyalty.history.map((h) => (
            <div key={h.id} className="py-2.5 flex items-center justify-between">
              <div>
                <span className="text-slate-200">{h.desc}</span>
                <span className="text-slate-500 text-[11px] ml-2">({h.date})</span>
              </div>
              <span className={`font-bold ${h.pts > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {h.pts > 0 ? `+${h.pts}` : h.pts} PTS
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
