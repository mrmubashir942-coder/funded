import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, DollarSign, Award, ArrowRight, Copy, Check, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

export const AffiliateProgramPage: React.FC = () => {
  const { affiliate, requestAffiliatePayout } = useApp();
  const [referralsCount, setReferralsCount] = useState<number>(25);
  const [avgChallengePrice, setAvgChallengePrice] = useState<number>(349);
  const [copied, setCopied] = useState(false);
  const [payoutFeedback, setPayoutFeedback] = useState<string | null>(null);

  // Calculate estimated monthly commissions at 12%
  const totalVolume = referralsCount * avgChallengePrice;
  const estimatedCommission = totalVolume * 0.12;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`https://ryvexia.netlify.app/?ref=${affiliate.referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaimAffiliate = () => {
    const res = requestAffiliatePayout();
    setPayoutFeedback(res.message);
    setTimeout(() => setPayoutFeedback(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
          Ryvexia Partner Network
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Earn Up To 15% Lifetime Commissions
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Partner with an elite proprietary trading evaluation firm. Refer traders to our institutional evaluation challenges and earn recurring rewards with bi-weekly automated payouts.
        </p>
      </div>

      {/* Tier Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">Tier 1</span>
            <span className="text-xl font-extrabold text-white font-mono">10%</span>
          </div>
          <h2 className="text-base font-bold text-white">Associate Partner</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Starting rate from your very first referred trader. Instant cookie attribution and real-time dashboard analytics.
          </p>
          <div className="text-[11px] text-[#D4AF37] font-mono pt-2 border-t border-[#1F293D]">
            Volume: $0 – $10,000 / mo
          </div>
        </div>

        <div className="bg-[#131A2A] border border-[#D4AF37] rounded-2xl p-6 space-y-4 shadow-xl relative">
          <div className="absolute -top-3 right-6 bg-[#D4AF37] text-[#0B0F1A] text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
            Active Tier
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase">Tier 2</span>
            <span className="text-xl font-extrabold text-[#D4AF37] font-mono">12%</span>
          </div>
          <h2 className="text-base font-bold text-white">Institutional Desk</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Elevated commission tier for active trading community leaders, mentors, and YouTube educators.
          </p>
          <div className="text-[11px] text-[#D4AF37] font-mono pt-2 border-t border-[#1F293D]">
            Volume: $10,000 – $50,000 / mo
          </div>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Tier 3</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono">15%</span>
          </div>
          <h2 className="text-base font-bold text-white">VIP Syndicates</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Maximum revenue share plus tailored custom coupon codes, dedicated affiliate manager, and co-branded promotions.
          </p>
          <div className="text-[11px] text-emerald-400 font-mono pt-2 border-t border-[#1F293D]">
            Volume: $50,000+ / mo
          </div>
        </div>
      </div>

      {/* Interactive Commission Earnings Calculator */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto shadow-2xl space-y-8">
        <div>
          <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            Revenue Calculator
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Estimate Your Monthly Earnings</h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulate your potential payout based on monthly student or audience challenge enrollments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Monthly Referrals</span>
                <span className="font-mono text-[#D4AF37] font-bold">{referralsCount} Traders</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={referralsCount}
                onChange={(e) => setReferralsCount(parseInt(e.target.value))}
                className="w-full accent-[#D4AF37] h-2 bg-[#0B0F1A] rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Average Challenge Size</span>
                <span className="font-mono text-[#D4AF37] font-bold">${avgChallengePrice}</span>
              </div>
              <input
                type="range"
                min="89"
                max="899"
                step="10"
                value={avgChallengePrice}
                onChange={(e) => setAvgChallengePrice(parseInt(e.target.value))}
                className="w-full accent-[#D4AF37] h-2 bg-[#0B0F1A] rounded-lg"
              />
            </div>
          </div>

          <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs text-slate-400 font-mono">Estimated Monthly Commissions</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] font-mono tabular-nums mt-1">
                ${estimatedCommission.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-1">
                Based on ${totalVolume.toLocaleString()} monthly referred volume @ 12% commission
              </div>
            </div>

            <div className="text-xs text-slate-300 pt-3 border-t border-[#1F293D]">
              Payouts processed on the 1st and 15th of each month via Crypto (USDT) or Bank Wire.
            </div>
          </div>
        </div>
      </div>

      {/* Your Referral Hub Card */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Your Partner Portal & Link</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Share your dedicated link with trading communities, Discord channels, and private groups.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Pending:</span>
            <span className="text-base font-bold text-emerald-400 font-mono">
              ${affiliate.pendingCommission.toFixed(2)}
            </span>
            <button
              onClick={handleClaimAffiliate}
              className="ml-2 px-3.5 py-1.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] font-bold rounded-lg text-xs transition-colors"
            >
              Withdraw
            </button>
          </div>
        </div>

        {payoutFeedback && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 font-mono">
            {payoutFeedback}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-3">
            <span className="text-slate-500 text-[10px] block">Referral Code</span>
            <span className="text-white font-bold text-sm">{affiliate.referralCode}</span>
          </div>
          <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-3">
            <span className="text-slate-500 text-[10px] block">Referred Traders</span>
            <span className="text-white font-bold text-sm">{affiliate.totalReferrals}</span>
          </div>
          <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-3">
            <span className="text-slate-500 text-[10px] block">Lifetime Commissions Paid</span>
            <span className="text-[#D4AF37] font-bold text-sm">${affiliate.paidCommission.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            readOnly
            value={`https://ryvexia.netlify.app/?ref=${affiliate.referralCode}`}
            className="flex-1 bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-4 py-2.5 text-xs text-slate-200 font-mono"
          />
          <button
            onClick={copyReferralLink}
            className="px-5 py-2.5 bg-[#1F293D] hover:bg-[#2A374F] text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Copy Partner Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
