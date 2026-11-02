import React from 'react';
import { ShieldAlert, CheckCircle2, XCircle, Info, Calculator, Clock, HelpCircle } from 'lucide-react';

export const TradingRulesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
          Rulebook & Risk Architecture
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Clear, Objective Trading Rules
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          No subjective consistency traps or hidden penalties. Everything is monitored in real-time by the Ryvexia Risk Engine.
        </p>
      </div>

      {/* Primary Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Daily Drawdown Rule */}
        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              01
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Maximum Daily Loss (5%)</h2>
              <span className="text-xs text-amber-400 font-mono">High Water Mark Calculation</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            The daily loss limit is calculated based on the account equity or balance at <strong>00:00 UTC</strong> (whichever is higher at the start of the trading day).
          </p>

          <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-4 text-xs space-y-2 font-mono">
            <div className="text-slate-400 font-semibold">// Example Calculation:</div>
            <div className="text-slate-300">
              Account: <span className="text-white font-bold">$100,000</span>
            </div>
            <div className="text-slate-300">
              Start of Day Balance: <span className="text-white">$104,000</span> (5% Limit = $5,200)
            </div>
            <div className="text-amber-400 font-semibold">
              Daily Breach Threshold = $98,800 Equity
            </div>
          </div>

          <div className="text-[11px] text-slate-400 leading-relaxed">
            Note: Both closed trades and open floating losses count toward daily loss limit. If daily drawdown breaches 5%, the account is automatically locked.
          </div>
        </div>

        {/* Maximum Overall Drawdown Rule */}
        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold">
              02
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Maximum Overall Drawdown (10%)</h2>
              <span className="text-xs text-rose-400 font-mono">Static from Starting Balance</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            On the 2-Step Standard evaluation, the maximum overall drawdown is a static 10% based on the initial account size.
          </p>

          <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-4 text-xs space-y-2 font-mono">
            <div className="text-slate-400 font-semibold">// Example Calculation:</div>
            <div className="text-slate-300">
              Initial Capital: <span className="text-white font-bold">$100,000</span>
            </div>
            <div className="text-slate-300">
              Maximum Overall Loss: <span className="text-white">$10,000</span> (10%)
            </div>
            <div className="text-rose-400 font-semibold">
              Absolute Inviolable Floor = $90,000 Equity
            </div>
          </div>

          <div className="text-[11px] text-slate-400 leading-relaxed">
            Unlike predatory trailing drawdown models, your drawdown buffer never increases to choke your profitable trades.
          </div>
        </div>
      </div>

      {/* Allowed vs Prohibited Table */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 bg-[#172033] border-b border-[#1F293D]">
          <h2 className="text-lg font-bold text-white">Trading Strategies & Policy Matrix</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Clear guidelines on what trading methodologies are permitted in our simulated environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#1F293D]">
          {/* Permitted */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> Allowed Trading Styles
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>
                  <strong>News Trading:</strong> Holding and executing positions during high-impact economic releases (CPI, NFP, FOMC).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Weekend Holding:</strong> Holding swing positions across market closures.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Algorithmic Trading & EAs:</strong> Custom automated expert advisors and scalpers using legitimate price action logic.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Intra-Account Hedging:</strong> Opening opposing buy and sell orders on the same simulated account.
                </span>
              </li>
            </ul>
          </div>

          {/* Prohibited */}
          <div className="p-6 space-y-4 bg-[#111724]">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <XCircle className="w-4 h-4" /> Prohibited Practices
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Latency Arbitrage:</strong> Exploiting delayed demo price feeds against external low-latency feeds.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Account Sharing / Passing Services:</strong> Subcontracting trades to third-party commercial account passing services.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Reverse Hedging Across Accounts:</strong> Opening opposing maximum-lot positions between two different accounts to guarantee one passes.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Platform Bug Exploitation:</strong> Trading off erroneous quotes or un-updated weekend holiday prices.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
