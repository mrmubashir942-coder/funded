import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Shield,
  Zap,
  Award,
  CheckCircle2,
  ArrowRight,
  Clock,
  DollarSign,
  BarChart3,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Percent,
  Layers,
  Lock
} from 'lucide-react';
import { FAQ_ITEMS } from '../../data/mockData';

export const HomePage: React.FC<{ onOpenCheckout: () => void; onOpenAuth: () => void }> = ({
  onOpenCheckout,
  onOpenAuth
}) => {
  const { challengeTiers, setCheckoutData, setCurrentView, setActiveTab } = useApp();

  const [selectedModel, setSelectedModel] = useState<'2-step' | '1-step' | 'instant'>('2-step');
  const [selectedTierId, setSelectedTierId] = useState<string>('tier_100k');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const selectedTier = challengeTiers.find((t) => t.id === selectedTierId) || challengeTiers[3];

  const handleSelectAndCheckout = (tierId: string) => {
    setCheckoutData((prev) => ({
      ...prev,
      tierId,
      model: selectedModel
    }));
    onOpenCheckout();
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#D4AF37]/10 via-[#0B0F1A]/50 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                Institutional Prop Evaluation Desk
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
                Trade Smart. <br />
                <span className="bg-gradient-to-r from-white via-slate-100 to-[#D4AF37] bg-clip-text text-transparent">
                  Prove Your Edge.
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Access up to <span className="text-white font-semibold">$200,000</span> in simulated capital. Trade raw institutional spreads on Forex, Gold, Crypto & Indices with up to <span className="text-[#D4AF37] font-semibold">90% simulated reward splits</span> and bi-weekly payouts.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleSelectAndCheckout(selectedTierId)}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A] font-bold rounded-xl text-sm shadow-lg shadow-[#D4AF37]/20 transition-all flex items-center gap-2"
                >
                  <span>Start Evaluation Challenge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setCurrentView('trader');
                    setActiveTab('webtrader');
                  }}
                  className="px-6 py-3.5 bg-[#131A2A] hover:bg-[#1A2234] border border-[#1F293D] hover:border-slate-600 text-white font-semibold rounded-xl text-sm transition-all flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                  <span>Explore WebTrader Demo</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1F293D]/80">
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">
                    $12.8M+
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Simulated Rewards Paid</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#D4AF37] font-mono tabular-nums">
                    4 Hours
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Average Payout Review</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">
                    0.0 Pips
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Raw Simulated Spreads</div>
                </div>
              </div>
            </div>

            {/* Right Visual Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#1F293D] shadow-2xl bg-[#131A2A]">
                <img
                  src="/src/assets/images/hero_trading_terminal_1793599900834.jpg"
                  alt="Ryvexia Institutional Trading Floor and Terminal"
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent opacity-80" />

                {/* Floating Institutional Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0B0F1A]/90 backdrop-blur-md border border-[#1F293D] rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Tier-1 Simulated Liquidity</div>
                      <div className="text-[11px] text-slate-400">Low-latency bridge to simulated FX & Futures</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    99.98% Fill
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Challenge Configurator & Pricing Matrix */}
      <section id="challenges-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
            Transparent Evaluation Plans
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Choose Your Funding Size
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Trade simulated capital with institutional conditions. Pass evaluation milestones to qualify for funded rewards.
          </p>

          {/* Model Selector Tabs */}
          <div className="flex items-center justify-center pt-4">
            <div className="inline-flex bg-[#131A2A] p-1 rounded-xl border border-[#1F293D]">
              <button
                onClick={() => setSelectedModel('2-step')}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  selectedModel === '2-step'
                    ? 'bg-[#1F293D] text-[#D4AF37] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2-Step Evaluation (Recommended)
              </button>
              <button
                onClick={() => setSelectedModel('1-step')}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  selectedModel === '1-step'
                    ? 'bg-[#1F293D] text-[#D4AF37] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1-Step Rapid
              </button>
              <button
                onClick={() => setSelectedModel('instant')}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  selectedModel === 'instant'
                    ? 'bg-[#1F293D] text-[#D4AF37] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Instant Simulated
              </button>
            </div>
          </div>
        </div>

        {/* Account Size Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto mb-8">
          {challengeTiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTierId(tier.id)}
              className={`py-3 px-4 rounded-xl text-center border transition-all ${
                selectedTierId === tier.id
                  ? 'bg-[#1F293D] border-[#D4AF37] text-white shadow-md'
                  : 'bg-[#131A2A] border-[#1F293D] text-slate-300 hover:border-slate-600'
              }`}
            >
              <div className="text-base font-bold font-mono">{tier.label}</div>
              <div className="text-[11px] text-[#D4AF37] font-medium mt-0.5">
                ${tier.fee} one-time
              </div>
            </button>
          ))}
        </div>

        {/* Selected Tier Feature Card */}
        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-[#1F293D] gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {selectedTier.label} Account
                </span>
                <span className="text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded font-semibold border border-[#D4AF37]/30">
                  {selectedModel === '2-step'
                    ? '2-Step Standard'
                    : selectedModel === '1-step'
                    ? '1-Step Rapid'
                    : 'Instant Funding'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Zero recurring subscriptions. One-time fee refundable with your first payout.
              </p>
            </div>
            <div className="text-left md:text-right">
              <div className="text-3xl font-extrabold text-[#D4AF37] font-mono">
                ${selectedTier.fee}
              </div>
              <div className="text-[11px] text-slate-400">One-time evaluation fee</div>
            </div>
          </div>

          {/* Grid of Rules for this Tier */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-b border-[#1F293D]">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Profit Target</div>
              <div className="text-lg font-bold text-white mt-1 font-mono">
                {selectedModel === '2-step'
                  ? `${selectedTier.twoStep.phase1TargetPct}% / ${selectedTier.twoStep.phase2TargetPct}%`
                  : selectedModel === '1-step'
                  ? `${selectedTier.oneStep.profitTargetPct}%`
                  : 'None (Direct Payout)'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {selectedModel === '2-step'
                  ? `$${(selectedTier.size * 0.08).toLocaleString()} (Phase 1)`
                  : `$${(selectedTier.size * 0.1).toLocaleString()}`}
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Daily Loss Limit</div>
              <div className="text-lg font-bold text-amber-400 mt-1 font-mono">
                {selectedModel === '2-step'
                  ? `${selectedTier.twoStep.dailyLossPct}%`
                  : selectedModel === '1-step'
                  ? `${selectedTier.oneStep.dailyLossPct}%`
                  : `${selectedTier.instant.dailyLossPct}%`}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                ${(selectedTier.size * 0.05).toLocaleString()} buffer / day
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Maximum Drawdown</div>
              <div className="text-lg font-bold text-rose-400 mt-1 font-mono">
                {selectedModel === '2-step'
                  ? `${selectedTier.twoStep.maxDrawdownPct}%`
                  : selectedModel === '1-step'
                  ? `${selectedTier.oneStep.maxDrawdownPct}%`
                  : `${selectedTier.instant.maxDrawdownPct}%`}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                ${(selectedTier.size * 0.1).toLocaleString()} static threshold
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Reward Profit Split</div>
              <div className="text-lg font-bold text-[#D4AF37] mt-1 font-mono">
                {selectedTier.profitSplit}%
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Scalable up to 90%</div>
            </div>
          </div>

          {/* Secondary Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Minimum Trading Days:{' '}
                <strong>{selectedModel === 'instant' ? '0 Days' : '5 Days'}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Leverage: <strong>{selectedTier.leverage}</strong> (Forex & Metals)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>News Trading & Weekend Holding Allowed</span>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Instant account credential delivery upon test checkout completion.
            </div>
            <button
              onClick={() => handleSelectAndCheckout(selectedTier.id)}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A] font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Start {selectedTier.label} Evaluation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Ryvexia Funding Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
            Institutional Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built by Traders for Discretionary & Quant Traders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Sub-10ms Simulated Execution</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our simulated bridge mirrors institutional LMAX and Currenex pricing without artificial latency slippage or asymmetric fill delays.
            </p>
          </div>

          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Bi-Weekly & On-Demand Payouts</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No 30-day waiting locks. Request simulated reward disbursements every 14 days directly in Crypto (USDT/USDC) or international SEPA/SWIFT wire.
            </p>
          </div>

          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Transparent, Objective Rules</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No hidden consistency rules designed to fail winning traders. Profit targets and drawdown limits are tracked live down to the second in your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Payout Proofs & Wall of Fame */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-8 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
                Proven Discipline
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Recent Simulated Reward Disbursals
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Audited Payout Desk Log</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-xs">Alex M.</span>
                <span className="text-[10px] text-emerald-400 font-mono">PAID (USDT)</span>
              </div>
              <div className="text-xl font-bold text-[#D4AF37] font-mono tabular-nums">
                $2,720.00
              </div>
              <div className="text-[11px] text-slate-500 font-mono truncate">
                TX: 0x8f2d5910be289...
              </div>
            </div>

            <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-xs">Marcus L.</span>
                <span className="text-[10px] text-emerald-400 font-mono">PAID (SWIFT)</span>
              </div>
              <div className="text-xl font-bold text-[#D4AF37] font-mono tabular-nums">
                $7,560.00
              </div>
              <div className="text-[11px] text-slate-500 font-mono truncate">
                REF: SWIFT-REF-992...
              </div>
            </div>

            <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-xs">Sophia C.</span>
                <span className="text-[10px] text-emerald-400 font-mono">PAID (USDC)</span>
              </div>
              <div className="text-xl font-bold text-[#D4AF37] font-mono tabular-nums">
                $12,780.00
              </div>
              <div className="text-[11px] text-slate-500 font-mono truncate">
                TX: 0x38b124c4c2b...
              </div>
            </div>

            <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-xs">David K.</span>
                <span className="text-[10px] text-emerald-400 font-mono">PAID (USDT)</span>
              </div>
              <div className="text-xl font-bold text-[#D4AF37] font-mono tabular-nums">
                $4,410.00
              </div>
              <div className="text-[11px] text-slate-500 font-mono truncate">
                TX: TR7NHqjeKQx...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
            Clarity & Rules
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.slice(0, 5).map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#131A2A] border border-[#1F293D] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-[#D4AF37] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-90 text-[#D4AF37]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-slate-300 leading-relaxed border-t border-[#1F293D]/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Pre-Footer Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#131A2A] via-[#1A2337] to-[#131A2A] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Prove Your Edge?
            </h2>
            <p className="text-slate-300 text-sm">
              Select your simulated capital tier, showcase disciplined risk management, and scale up to $2,000,000 in simulated funding.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={onOpenCheckout}
                className="px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A] font-bold rounded-xl text-sm shadow-lg shadow-[#D4AF37]/20 transition-all flex items-center gap-2"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCurrentView('trader');
                  setActiveTab('overview');
                }}
                className="px-6 py-3.5 bg-[#0B0F1A] hover:bg-[#131A2A] border border-[#1F293D] text-white font-semibold rounded-xl text-sm transition-all"
              >
                Enter Trader Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
