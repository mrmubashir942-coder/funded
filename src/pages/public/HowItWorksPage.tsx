import React from 'react';
import {
  Sparkles,
  Award,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Zap
} from 'lucide-react';

export const HowItWorksPage: React.FC<{ onOpenCheckout: () => void }> = ({ onOpenCheckout }) => {
  const steps = [
    {
      num: '01',
      title: 'Select Program & Account Size',
      desc: 'Choose from 6 evaluation models (1-Step, 2-Step Standard, 2-Step Advanced, 3-Step, Instant, or Starter) with simulated balances from $5,000 up to $200,000.',
      detail: 'Instant automated provisioning into Ryvexia WebTrader or MetaTrader 5 without subscription locks.'
    },
    {
      num: '02',
      title: 'Trade with Raw Institutional Spreads',
      desc: 'Execute trades on Forex, Spot Gold, Crypto, and Equity Indices. Respect daily loss thresholds (4%–5%) and static overall drawdown limits (8%–12%).',
      detail: 'Hold through major news releases and over weekends. Zero hidden consistency traps.'
    },
    {
      num: '03',
      title: 'Pass Evaluation & Verify Identity',
      desc: 'Once your profit target is reached, our automated risk engine evaluates your trading record in real time. Submit your basic KYC identity verification.',
      detail: 'Instant electronic simulated trader agreement issuance and Master Funded credentials.'
    },
    {
      num: '04',
      title: 'Receive Bi-Weekly Simulated Rewards',
      desc: 'Keep up to 90% of all simulated trading gains. Request payouts directly in Crypto (USDT ERC20/TRC20, USDC) or direct international Bank Wire.',
      detail: 'Disbursed in under 8 business hours with complete transparency and zero payout delays.'
    },
    {
      num: '05',
      title: 'Scale Capital up to $2,000,000',
      desc: 'Consistent profitability unlocks 25% balance increments every 3 months through our institutional capital growth ladder.',
      detail: 'Reach the elite tier of proprietary operators managing high seven-figure allocations.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
          Roadmap to Allocation
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          How Ryvexia Funding Works
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          From registration to bi-weekly reward payouts, our institutional process is engineered for speed, mathematical objectivity, and long-term trader partnership.
        </p>
      </div>

      {/* Steps Timeline */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {steps.map((step, idx) => (
          <div
            key={step.num}
            className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start gap-6 shadow-xl hover:border-[#D4AF37]/50 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B38F22] text-[#0B0F1A] font-extrabold text-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              {step.num}
            </div>

            <div className="space-y-2 flex-1">
              <h2 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                {step.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">{step.desc}</p>
              <div className="text-xs text-slate-400 font-mono pt-1 border-t border-[#1F293D]/60 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{step.detail}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-[#131A2A] border border-[#D4AF37]/40 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Ready to Start Your Evaluation?
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
          Enroll in minutes, trade with institutional spreads, and unlock performance rewards.
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenCheckout}
            className="px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A] font-bold rounded-xl text-sm transition-all shadow-lg flex items-center gap-2 mx-auto"
          >
            <span>Choose Your Challenge Tier</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
