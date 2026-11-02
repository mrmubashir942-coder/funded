import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { AccountStatus } from '../../types';

export const AdminAccounts: React.FC = () => {
  const { accounts, passPhase, resetAccount, failAccount } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredAccounts = accounts.filter((acc) => {
    const matchesFilter = filterStatus === 'all' || acc.status === filterStatus;
    const matchesSearch =
      acc.accountNumber.toLowerCase().includes(search.toLowerCase()) ||
      acc.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Live Challenge & Account Risk Monitor</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time supervisor inspection of all active simulated accounts, drawdown thresholds, and manual overrides.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search account #..."
            className="bg-[#131A2A] border border-[#1F293D] rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] font-mono"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#131A2A] border border-[#1F293D] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="all">All Accounts ({accounts.length})</option>
            <option value="active">Active Only</option>
            <option value="passed">Passed Only</option>
            <option value="failed">Breached Only</option>
          </select>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F293D] text-slate-400 bg-[#172033]">
                <th className="py-3.5 px-5 font-semibold">Account #</th>
                <th className="py-3.5 px-5 font-semibold">Program & Model</th>
                <th className="py-3.5 px-5 font-semibold">Starting Capital</th>
                <th className="py-3.5 px-5 font-semibold">Current Balance</th>
                <th className="py-3.5 px-5 font-semibold">Equity</th>
                <th className="py-3.5 px-5 font-semibold">Days Traded</th>
                <th className="py-3.5 px-5 font-semibold">Status</th>
                <th className="py-3.5 px-5 font-semibold text-right">Desk Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D] text-slate-200">
              {filteredAccounts.map((acc) => {
                const netProfit = acc.balance - acc.initialBalance;

                return (
                  <tr key={acc.id} className="hover:bg-[#1A2234] transition-colors">
                    <td className="py-4 px-5 font-mono font-bold text-white">
                      {acc.accountNumber}
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-semibold text-white">{acc.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {acc.platform} · {acc.leverage}
                      </div>
                    </td>
                    <td className="py-4 px-5 font-mono text-slate-300">
                      ${acc.initialBalance.toLocaleString()}
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-white tabular-nums">
                      ${acc.balance.toLocaleString()}
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-[#D4AF37] tabular-nums">
                      ${acc.equity.toLocaleString()}
                    </td>
                    <td className="py-4 px-5 font-mono text-slate-300">
                      {acc.daysTraded} / {acc.minTradingDays}
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          acc.status === 'passed'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                            : acc.status === 'failed'
                            ? 'bg-rose-950/60 text-rose-400 border border-rose-800'
                            : 'bg-blue-950/60 text-blue-300 border border-blue-800'
                        }`}
                      >
                        {acc.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right space-x-2">
                      {acc.status !== 'passed' && (
                        <button
                          onClick={() => passPhase(acc.id)}
                          className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 rounded text-xs transition-colors"
                          title="Advance account to next phase or funded status"
                        >
                          Pass Phase
                        </button>
                      )}

                      {acc.status === 'active' && (
                        <button
                          onClick={() =>
                            failAccount(
                              acc.id,
                              'Manual desk action: Drawdown or risk violation recorded by risk officer.'
                            )
                          }
                          className="px-2.5 py-1 bg-rose-950/40 hover:bg-rose-950 text-rose-400 border border-rose-800 rounded text-xs transition-colors"
                          title="Trigger rule failure"
                        >
                          Revoke
                        </button>
                      )}

                      <button
                        onClick={() => resetAccount(acc.id)}
                        className="px-2.5 py-1 bg-[#1F293D] hover:bg-[#2A374F] text-slate-300 rounded text-xs transition-colors"
                        title="Reset balance and drawdown metrics"
                      >
                        Reset
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
