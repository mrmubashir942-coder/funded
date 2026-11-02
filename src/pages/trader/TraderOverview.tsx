import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  DollarSign,
  BarChart3,
  RefreshCw,
  Sparkles,
  Sliders
} from 'lucide-react';
import { CertificateModal } from '../../components/CertificateModal';

export const TraderOverview: React.FC<{ onLaunchTrader: () => void }> = ({ onLaunchTrader }) => {
  const {
    currentUser,
    activeAccount,
    accounts,
    setActiveAccountId,
    orders,
    passPhase,
    resetAccount,
    failAccount,
    setActiveTab
  } = useApp();

  const [showCertificate, setShowCertificate] = useState(false);

  if (!activeAccount) {
    return (
      <div className="text-center py-24 text-slate-400">
        No evaluation accounts found. Please enroll in a challenge.
      </div>
    );
  }

  // Calculate metrics
  const netProfit = activeAccount.balance - activeAccount.initialBalance;
  const netProfitPct = (netProfit / activeAccount.initialBalance) * 100;

  // Daily Loss calculation
  const dailyLoss = activeAccount.startOfDayBalance - activeAccount.equity;
  const dailyLossRemaining = Math.max(0, activeAccount.dailyLossLimitAmount - dailyLoss);
  const dailyLossPctUsed = Math.min(100, Math.max(0, (dailyLoss / activeAccount.dailyLossLimitAmount) * 100));

  // Max Drawdown calculation
  const totalLoss = activeAccount.initialBalance - activeAccount.equity;
  const totalLossRemaining = Math.max(0, activeAccount.maxDrawdownLimitAmount - totalLoss);
  const totalLossPctUsed = Math.min(100, Math.max(0, (totalLoss / activeAccount.maxDrawdownLimitAmount) * 100));

  // Profit target progress
  const targetPctCompleted =
    activeAccount.profitTargetAmount > 0
      ? Math.min(100, Math.max(0, (netProfit / activeAccount.profitTargetAmount) * 100))
      : 100;

  // Filter orders for active account
  const accountOrders = orders.filter((o) => o.accountId === activeAccount.id);
  const closedOrders = accountOrders.filter((o) => o.status === 'CLOSED');
  const winningTrades = closedOrders.filter((o) => o.pnl > 0).length;
  const winRate = closedOrders.length > 0 ? Math.round((winningTrades / closedOrders.length) * 100) : 65;

  return (
    <div className="space-y-8 pb-12">
      {/* Account Header Strip & Quick Switcher */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white font-mono">
              {activeAccount.accountNumber}
            </h1>
            <span
              className={`px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider ${
                activeAccount.status === 'passed'
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                  : activeAccount.status === 'failed'
                  ? 'bg-rose-950/60 text-rose-400 border border-rose-800'
                  : 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
              }`}
            >
              {activeAccount.status === 'passed'
                ? 'Passed / Certificate Available'
                : activeAccount.status === 'failed'
                ? 'Rule Breached'
                : `${activeAccount.phase.toUpperCase()} ACTIVE`}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {activeAccount.title} · Platform:{' '}
            <span className="text-slate-200 font-semibold">{activeAccount.platform}</span> · Leverage:{' '}
            <span className="text-slate-200 font-semibold">{activeAccount.leverage}</span>
          </p>
        </div>

        {/* Demo Test Controls & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {activeAccount.status === 'passed' && (
            <button
              onClick={() => setShowCertificate(true)}
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Award className="w-4 h-4" />
              <span>View Milestone Certificate</span>
            </button>
          )}

          {activeAccount.status === 'active' && activeAccount.phase !== 'funded' && (
            <button
              onClick={() => passPhase(activeAccount.id)}
              className="px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              title="Test the challenge evaluation advancement engine"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Pass Phase (Demo Test)</span>
            </button>
          )}

          {activeAccount.status === 'active' && (
            <button
              onClick={() =>
                failAccount(
                  activeAccount.id,
                  'Daily Loss Limit Exceeded: Simulated -$5,200 loss breached $5,000 allowance.'
                )
              }
              className="px-3.5 py-2 bg-rose-900/20 hover:bg-rose-900/30 text-rose-400 border border-rose-800/40 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              title="Test the rule engine risk failure behavior"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Trigger Breach (Test)</span>
            </button>
          )}

          {activeAccount.status === 'failed' && (
            <button
              onClick={() => resetAccount(activeAccount.id)}
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Challenge Parameters</span>
            </button>
          )}

          <button
            onClick={onLaunchTrader}
            className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Launch WebTrader</span>
          </button>
        </div>
      </div>

      {/* Violation Alert Banner if failed */}
      {activeAccount.status === 'failed' && (
        <div className="bg-rose-950/40 border border-rose-800/60 rounded-2xl p-5 flex items-start gap-4 text-rose-200">
          <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Rule Breach Recorded by Risk Engine</h3>
            <p className="text-xs text-rose-300 leading-relaxed">
              {activeAccount.violationReason ||
                'Drawdown limits exceeded. Trading permissions locked in accordance with terms.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => resetAccount(activeAccount.id)}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Account Metrics (Sandbox Mode)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Passed Banner if passed */}
      {activeAccount.status === 'passed' && (
        <div className="bg-emerald-950/30 border border-emerald-700/50 rounded-2xl p-5 flex items-start gap-4 text-emerald-200">
          <Award className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Milestone Achieved!</h3>
            <p className="text-xs text-emerald-300 leading-relaxed">
              You have successfully satisfied all evaluation criteria. Your trading discipline has been verified.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setShowCertificate(true)}
                className="px-3.5 py-1.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                Inspect Certificate
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className="px-3.5 py-1.5 bg-[#1F293D] hover:bg-[#2A374F] text-slate-200 rounded-lg text-xs font-semibold transition-colors"
              >
                Request Reward Payout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Balance */}
        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2">
          <div className="text-xs font-semibold text-slate-400">Account Balance</div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            ${activeAccount.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Initial: ${activeAccount.initialBalance.toLocaleString()}
          </div>
        </div>

        {/* Equity */}
        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2">
          <div className="text-xs font-semibold text-slate-400">Current Equity</div>
          <div className="text-2xl font-extrabold text-[#D4AF37] font-mono tabular-nums">
            ${activeAccount.equity.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Floating:{' '}
            <span
              className={
                activeAccount.equity >= activeAccount.balance ? 'text-emerald-400' : 'text-rose-400'
              }
            >
              {activeAccount.equity >= activeAccount.balance ? '+' : ''}$
              {(activeAccount.equity - activeAccount.balance).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2">
          <div className="text-xs font-semibold text-slate-400">Net Profit / Gain</div>
          <div
            className={`text-2xl font-extrabold font-mono tabular-nums ${
              netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {netProfit >= 0 ? '+' : ''}${netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            {netProfit >= 0 ? '+' : ''}
            {netProfitPct.toFixed(2)}% of initial
          </div>
        </div>

        {/* Win Rate */}
        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2">
          <div className="text-xs font-semibold text-slate-400">Win Rate / Closed Trades</div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            {winRate}%
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            {closedOrders.length} Completed Trades
          </div>
        </div>
      </div>

      {/* Challenge Objectives & Live Rule Evaluation Trackers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#D4AF37]" />
            Challenge Objectives Progress Engine
          </h2>
          <span className="text-xs text-slate-400">Real-time Rule Evaluation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Profit Target */}
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Profit Target</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  netProfit >= activeAccount.profitTargetAmount && activeAccount.profitTargetAmount > 0
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                    : 'bg-[#1F293D] text-slate-300'
                }`}
              >
                {activeAccount.profitTargetAmount > 0 ? `${targetPctCompleted.toFixed(0)}%` : 'Passed'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Current Profit:</span>
                <span className="text-white font-bold">${netProfit.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Target Required:</span>
                <span className="text-[#D4AF37] font-bold">
                  {activeAccount.profitTargetAmount > 0
                    ? `$${activeAccount.profitTargetAmount.toLocaleString()}`
                    : 'Funded (None)'}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#0B0F1A] h-2.5 rounded-full overflow-hidden border border-[#1F293D]">
              <div
                className="bg-gradient-to-r from-[#D4AF37] to-[#E5C158] h-full rounded-full transition-all duration-500"
                style={{ width: `${targetPctCompleted}%` }}
              />
            </div>
          </div>

          {/* 2. Maximum Daily Loss */}
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Daily Loss Limit (5%)</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  dailyLossRemaining > 0
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                    : 'bg-rose-950/60 text-rose-400 border border-rose-800'
                }`}
              >
                {dailyLossRemaining > 0 ? 'Healthy' : 'Breached'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Buffer Remaining:</span>
                <span className="text-emerald-400 font-bold">${dailyLossRemaining.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Max Allowed Today:</span>
                <span className="text-slate-300 font-bold">
                  ${activeAccount.dailyLossLimitAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="w-full bg-[#0B0F1A] h-2.5 rounded-full overflow-hidden border border-[#1F293D]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  dailyLossPctUsed > 70 ? 'bg-rose-500' : 'bg-amber-500'
                }`}
                style={{ width: `${dailyLossPctUsed}%` }}
              />
            </div>
          </div>

          {/* 3. Maximum Overall Drawdown */}
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Max Overall Drawdown</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  totalLossRemaining > 0
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                    : 'bg-rose-950/60 text-rose-400 border border-rose-800'
                }`}
              >
                {totalLossRemaining > 0 ? 'Protected' : 'Breached'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Loss Buffer Left:</span>
                <span className="text-emerald-400 font-bold">${totalLossRemaining.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Static Drawdown Floor:</span>
                <span className="text-rose-400 font-bold font-mono">
                  ${(activeAccount.initialBalance - activeAccount.maxDrawdownLimitAmount).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="w-full bg-[#0B0F1A] h-2.5 rounded-full overflow-hidden border border-[#1F293D]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  totalLossPctUsed > 60 ? 'bg-rose-500' : 'bg-amber-500'
                }`}
                style={{ width: `${totalLossPctUsed}%` }}
              />
            </div>
          </div>

          {/* 4. Minimum Trading Days */}
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Minimum Days</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  activeAccount.daysTraded >= activeAccount.minTradingDays
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                    : 'bg-[#1F293D] text-slate-300'
                }`}
              >
                {activeAccount.daysTraded} / {activeAccount.minTradingDays} Days
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Days Traded:</span>
                <span className="text-white font-bold">{activeAccount.daysTraded} Days</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Requirement:</span>
                <span className="text-slate-300">{activeAccount.minTradingDays} Days</span>
              </div>
            </div>

            <div className="w-full bg-[#0B0F1A] h-2.5 rounded-full overflow-hidden border border-[#1F293D]">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${
                    activeAccount.minTradingDays > 0
                      ? Math.min(100, (activeAccount.daysTraded / activeAccount.minTradingDays) * 100)
                      : 100
                  }%`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Trades Table Preview */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 bg-[#172033] border-b border-[#1F293D] flex items-center justify-between">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#D4AF37]" />
            Recent Positions on {activeAccount.accountNumber}
          </div>
          <button
            onClick={onLaunchTrader}
            className="text-xs text-[#D4AF37] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Open Terminal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F293D] text-slate-400 bg-[#131A2A]">
                <th className="py-3 px-5 font-semibold">Symbol</th>
                <th className="py-3 px-5 font-semibold">Type</th>
                <th className="py-3 px-5 font-semibold">Lots</th>
                <th className="py-3 px-5 font-semibold">Open Price</th>
                <th className="py-3 px-5 font-semibold">Current Price</th>
                <th className="py-3 px-5 font-semibold">P&L ($)</th>
                <th className="py-3 px-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D] text-slate-200">
              {accountOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    No trades logged yet for this account. Launch WebTrader to place your first trade.
                  </td>
                </tr>
              ) : (
                accountOrders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#1A2234] transition-colors">
                    <td className="py-3 px-5 font-mono font-bold text-white">{ord.symbol}</td>
                    <td className="py-3 px-5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          ord.type === 'BUY'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                            : 'bg-rose-950/60 text-rose-400 border border-rose-800'
                        }`}
                      >
                        {ord.type}
                      </span>
                    </td>
                    <td className="py-3 px-5 font-mono">{ord.lots.toFixed(2)}</td>
                    <td className="py-3 px-5 font-mono">{ord.openPrice.toFixed(2)}</td>
                    <td className="py-3 px-5 font-mono">{ord.currentPrice.toFixed(2)}</td>
                    <td
                      className={`py-3 px-5 font-mono font-bold ${
                        ord.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {ord.pnl >= 0 ? '+' : ''}${ord.pnl.toFixed(2)}
                    </td>
                    <td className="py-3 px-5">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          ord.status === 'OPEN'
                            ? 'bg-blue-950/60 text-blue-300 border border-blue-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        account={activeAccount}
        user={currentUser}
      />
    </div>
  );
};
