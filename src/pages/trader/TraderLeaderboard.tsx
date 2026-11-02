import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Medal, Award, TrendingUp, DollarSign } from 'lucide-react';

export const TraderLeaderboard: React.FC = () => {
  const { leaderboard } = useApp();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Global Trader Leaderboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Top performing simulated prop operators across all Ryvexia evaluation and funded accounts.
          </p>
        </div>

        <div className="bg-[#131A2A] border border-[#D4AF37]/30 px-4 py-2 rounded-xl text-xs font-mono text-[#D4AF37] flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          <span>Monthly Prize Pool: $50,000 Allocation Bonus</span>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F293D] text-slate-400 bg-[#172033]">
                <th className="py-3.5 px-5 font-semibold">Rank</th>
                <th className="py-3.5 px-5 font-semibold">Trader</th>
                <th className="py-3.5 px-5 font-semibold">Country</th>
                <th className="py-3.5 px-5 font-semibold">Program Allocation</th>
                <th className="py-3.5 px-5 font-semibold">Total Gain (%)</th>
                <th className="py-3.5 px-5 font-semibold">Win Rate</th>
                <th className="py-3.5 px-5 font-semibold">Profit Factor</th>
                <th className="py-3.5 px-5 font-semibold text-right">Simulated Payouts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D] text-slate-200">
              {leaderboard.map((item) => (
                <tr key={item.rank} className="hover:bg-[#1A2234] transition-colors">
                  <td className="py-4 px-5 font-mono">
                    {item.rank === 1 ? (
                      <span className="w-7 h-7 rounded-lg bg-[#D4AF37] text-[#0B0F1A] font-extrabold flex items-center justify-center text-xs">
                        1
                      </span>
                    ) : item.rank === 2 ? (
                      <span className="w-7 h-7 rounded-lg bg-slate-300 text-[#0B0F1A] font-extrabold flex items-center justify-center text-xs">
                        2
                      </span>
                    ) : item.rank === 3 ? (
                      <span className="w-7 h-7 rounded-lg bg-amber-700 text-white font-extrabold flex items-center justify-center text-xs">
                        3
                      </span>
                    ) : (
                      <span className="font-bold text-slate-400 pl-2">#{item.rank}</span>
                    )}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover border border-[#D4AF37]/30"
                      />
                      <span className="font-bold text-white">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-slate-300">{item.country}</td>
                  <td className="py-4 px-5 font-mono text-slate-300">{item.accountTier}</td>
                  <td className="py-4 px-5 font-mono font-bold text-emerald-400 tabular-nums">
                    +{item.totalGainPct.toFixed(1)}%
                  </td>
                  <td className="py-4 px-5 font-mono text-white">{item.winRate}%</td>
                  <td className="py-4 px-5 font-mono text-[#D4AF37]">{item.profitFactor.toFixed(2)}</td>
                  <td className="py-4 px-5 font-mono font-bold text-emerald-400 text-right tabular-nums">
                    ${item.payoutAmount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
