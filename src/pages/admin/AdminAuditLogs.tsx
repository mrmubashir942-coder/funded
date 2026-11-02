import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Search, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export const AdminAuditLogs: React.FC = () => {
  const { auditLogs } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  const filtered = auditLogs.filter((log) => {
    const matchCat = filterCategory === 'ALL' || log.category === filterCategory;
    const matchSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">System & Risk Audit Logs</h1>
          <p className="text-xs text-slate-400 mt-1">
            Tamper-evident chronological audit ledger of all risk locks, payouts, trades, and security actions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search action or actor..."
            className="bg-[#131A2A] border border-[#1F293D] rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#131A2A] border border-[#1F293D] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="ALL">All Categories</option>
            <option value="RISK">Risk Breaches</option>
            <option value="TRADE">Trade Orders</option>
            <option value="PAYOUT">Payout Settlements</option>
            <option value="AUTH">Authentication</option>
            <option value="SYSTEM">System Settings</option>
          </select>
        </div>
      </div>

      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F293D] text-slate-400 bg-[#172033]">
                <th className="py-3.5 px-5 font-semibold">Timestamp (UTC)</th>
                <th className="py-3.5 px-5 font-semibold">Action</th>
                <th className="py-3.5 px-5 font-semibold">Category</th>
                <th className="py-3.5 px-5 font-semibold">Actor</th>
                <th className="py-3.5 px-5 font-semibold">Details</th>
                <th className="py-3.5 px-5 font-semibold">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D] text-slate-200 font-mono">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-[#1A2234] transition-colors">
                  <td className="py-3.5 px-5 text-slate-400">{log.timestamp}</td>
                  <td className="py-3.5 px-5 font-bold text-white">{log.action}</td>
                  <td className="py-3.5 px-5 text-[#D4AF37]">{log.category}</td>
                  <td className="py-3.5 px-5 text-slate-300">{log.actor}</td>
                  <td className="py-3.5 px-5 text-slate-300 max-w-md truncate font-sans text-xs">
                    {log.details}
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        log.severity === 'CRITICAL'
                          ? 'bg-rose-950/70 text-rose-300 border border-rose-800'
                          : log.severity === 'WARNING'
                          ? 'bg-amber-950/70 text-amber-300 border border-amber-800'
                          : 'bg-blue-950/60 text-blue-300 border border-blue-800'
                      }`}
                    >
                      {log.severity}
                    </span>
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
