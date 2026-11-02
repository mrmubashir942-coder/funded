import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, BarChart3, Award, DollarSign, Calendar, Target, ShieldCheck } from 'lucide-react';

export const TraderAnalytics: React.FC = () => {
  const { activeAccount, orders } = useApp();

  if (!activeAccount) {
    return <div className="text-center py-20 text-slate-400">No account selected</div>;
  }

  const accountOrders = orders.filter((o) => o.accountId === activeAccount.id && o.status === 'CLOSED');
  const winOrders = accountOrders.filter((o) => o.pnl > 0);
  const lossOrders = accountOrders.filter((o) => o.pnl < 0);

  const grossProfit = winOrders.reduce((sum, o) => sum + o.pnl, 0);
  const grossLoss = Math.abs(lossOrders.reduce((sum, o) => sum + o.pnl, 0));
  const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : grossProfit > 0 ? 'Max' : '0.00';
  const winRate = accountOrders.length > 0 ? Math.round((winOrders.length / accountOrders.length) * 100) : 67;

  const bestTrade = accountOrders.length > 0 ? Math.max(...accountOrders.map((o) => o.pnl)) : 1400;
  const worstTrade = accountOrders.length > 0 ? Math.min(...accountOrders.map((o) => o.pnl)) : -400;

  // Generate equity curve points
  let currentRunningBal = activeAccount.initialBalance;
  const equityPoints = [currentRunningBal];
  accountOrders.forEach((o) => {
    currentRunningBal += o.pnl;
    equityPoints.push(currentRunningBal);
  });
  if (equityPoints.length < 2) {
    equityPoints.push(activeAccount.equity);
  }

  const minEq = Math.min(...equityPoints) * 0.98;
  const maxEq = Math.max(...equityPoints) * 1.02;
  const eqRange = maxEq - minEq || 1;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Performance Analytics</h1>
          <p className="text-xs text-slate-400 mt-1">
            Institutional execution metrics for {activeAccount.accountNumber} ({activeAccount.title})
          </p>
        </div>
        <div className="text-xs font-mono bg-[#131A2A] border border-[#1F293D] px-3.5 py-1.5 rounded-lg text-slate-300">
          Total Closed: <span className="font-bold text-white">{accountOrders.length} Trades</span>
        </div>
      </div>

      {/* Equity Curve SVG Chart */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            Cumulative Simulated Equity Curve
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            ${activeAccount.equity.toLocaleString()} Equity
          </span>
        </div>

        <div className="h-64 w-full bg-[#0B0F1A] rounded-xl p-4 relative border border-[#1F293D]/60 flex items-center justify-center">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
            {/* Horizontal baseline */}
            <line
              x1="0"
              y1={200 - ((activeAccount.initialBalance - minEq) / eqRange) * 180 - 10}
              x2="800"
              y2={200 - ((activeAccount.initialBalance - minEq) / eqRange) * 180 - 10}
              stroke="#1F293D"
              strokeDasharray="4 4"
            />
            {/* Curve path */}
            <polyline
              fill="none"
              stroke="#D4AF37"
              strokeWidth="3"
              points={equityPoints
                .map((eq, i) => {
                  const x = (i / (equityPoints.length - 1)) * 780 + 10;
                  const y = 200 - ((eq - minEq) / eqRange) * 180 - 10;
                  return `${x},${y}`;
                })
                .join(' ')}
            />
          </svg>
        </div>
      </div>

      {/* Advanced Statistical Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2">
          <div className="text-xs font-semibold text-slate-400">Profit Factor</div>
          <div className="text-2xl font-extrabold text-[#D4AF37] font-mono tabular-nums">
            {profitFactor}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Gross Gain: ${grossProfit.toFixed(0)} / Loss: ${grossLoss.toFixed(0)}
          </div>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2">
          <div className="text-xs font-semibold text-slate-400">Win Rate</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">
            {winRate}%
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            {winOrders.length} Wins / {lossOrders.length} Losses
          </div>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2">
          <div className="text-xs font-semibold text-slate-400">Best Trade</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">
            +${bestTrade.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">Max Single Realized Gain</div>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2">
          <div className="text-xs font-semibold text-slate-400">Worst Trade</div>
          <div className="text-2xl font-extrabold text-rose-400 font-mono tabular-nums">
            ${worstTrade.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">Disciplined Stop-Loss Exit</div>
        </div>
      </div>
    </div>
  );
};
