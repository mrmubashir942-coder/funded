import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, Search, Download, Filter } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders } = useApp();
  const [symbolFilter, setSymbolFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filtered = orders.filter((o) => {
    const matchSym = symbolFilter === 'ALL' || o.symbol === symbolFilter;
    const matchStat = statusFilter === 'ALL' || o.status === statusFilter;
    return matchSym && matchStat;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Global Simulated Trade Tape</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time feed of all simulated positions, order executions, and realized performance across all traders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={symbolFilter}
            onChange={(e) => setSymbolFilter(e.target.value)}
            className="bg-[#131A2A] border border-[#1F293D] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="ALL">All Instruments</option>
            <option value="XAUUSD">XAUUSD (Gold)</option>
            <option value="EURUSD">EURUSD</option>
            <option value="GBPUSD">GBPUSD</option>
            <option value="BTCUSD">BTCUSD</option>
            <option value="US30">US30</option>
            <option value="NAS100">NAS100</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#131A2A] border border-[#1F293D] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">Open Only</option>
            <option value="CLOSED">Closed Only</option>
          </select>
        </div>
      </div>

      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F293D] text-slate-400 bg-[#172033]">
                <th className="py-3.5 px-5 font-semibold">Order ID</th>
                <th className="py-3.5 px-5 font-semibold">Account Link</th>
                <th className="py-3.5 px-5 font-semibold">Symbol</th>
                <th className="py-3.5 px-5 font-semibold">Direction</th>
                <th className="py-3.5 px-5 font-semibold">Volume (Lots)</th>
                <th className="py-3.5 px-5 font-semibold">Open Price</th>
                <th className="py-3.5 px-5 font-semibold">Current / Exit Price</th>
                <th className="py-3.5 px-5 font-semibold">P&L ($)</th>
                <th className="py-3.5 px-5 font-semibold">Status</th>
                <th className="py-3.5 px-5 font-semibold">Execution Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D] text-slate-200">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#1A2234] transition-colors">
                  <td className="py-3.5 px-5 font-mono text-slate-400">{ord.id}</td>
                  <td className="py-3.5 px-5 font-mono text-white font-bold">{ord.accountId}</td>
                  <td className="py-3.5 px-5 font-mono font-bold text-white">{ord.symbol}</td>
                  <td className="py-3.5 px-5">
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
                  <td className="py-3.5 px-5 font-mono">{ord.lots.toFixed(2)}</td>
                  <td className="py-3.5 px-5 font-mono">{ord.openPrice.toFixed(2)}</td>
                  <td className="py-3.5 px-5 font-mono">
                    {ord.closePrice ? ord.closePrice.toFixed(2) : ord.currentPrice.toFixed(2)}
                  </td>
                  <td
                    className={`py-3.5 px-5 font-mono font-bold tabular-nums ${
                      ord.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {ord.pnl >= 0 ? '+' : ''}${ord.pnl.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        ord.status === 'OPEN'
                          ? 'bg-blue-950/60 text-blue-300 border border-blue-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 font-mono text-slate-400">{ord.openTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
