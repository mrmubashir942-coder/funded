import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DollarSign, CheckCircle2, XCircle, Clock, Search, ShieldCheck } from 'lucide-react';
import { RewardRequest } from '../../types';

export const AdminRewards: React.FC = () => {
  const { rewardRequests, approveReward, rejectReward } = useApp();
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const filtered = rewardRequests.filter((r) => {
    if (filter === 'ALL') return true;
    return r.status === filter;
  });

  const handleConfirmReject = () => {
    if (!rejectingId) return;
    rejectReward(rejectingId, rejectReason || 'Inconsistency in trading logs detected.');
    setRejectingId(null);
    setRejectReason('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Simulated Reward Disbursal Desk</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review trader payout requests, verify consistency invariants, and dispatch simulated settlements.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-[#131A2A] p-1 rounded-xl border border-[#1F293D] text-xs">
          {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filter === tab ? 'bg-[#1F293D] text-[#D4AF37]' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Rewards Desk Table */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F293D] text-slate-400 bg-[#172033]">
                <th className="py-3.5 px-5 font-semibold">Request ID</th>
                <th className="py-3.5 px-5 font-semibold">Trader Details</th>
                <th className="py-3.5 px-5 font-semibold">Account</th>
                <th className="py-3.5 px-5 font-semibold">Gross Profit</th>
                <th className="py-3.5 px-5 font-semibold">Trader Payout</th>
                <th className="py-3.5 px-5 font-semibold">Rail & Destination</th>
                <th className="py-3.5 px-5 font-semibold">Status</th>
                <th className="py-3.5 px-5 font-semibold text-right">Desk Clearance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D] text-slate-200">
              {filtered.map((req) => (
                <tr key={req.id} className="hover:bg-[#1A2234] transition-colors">
                  <td className="py-4 px-5 font-mono text-slate-300 font-bold">{req.id}</td>
                  <td className="py-4 px-5">
                    <div className="font-semibold text-white">{req.traderName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{req.traderEmail}</div>
                  </td>
                  <td className="py-4 px-5 font-mono font-bold text-white">{req.accountId}</td>
                  <td className="py-4 px-5 font-mono tabular-nums">${req.amount.toLocaleString()}</td>
                  <td className="py-4 px-5 font-mono font-bold text-[#D4AF37] tabular-nums">
                    ${req.traderAmount.toLocaleString()} ({req.splitPct}%)
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-mono text-slate-300 font-semibold">{req.method}</div>
                    <div className="text-[10px] text-slate-400 font-mono max-w-[160px] truncate">
                      {req.addressOrIban}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        req.status === 'APPROVED'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                          : req.status === 'PENDING'
                          ? 'bg-amber-950/60 text-amber-400 border border-amber-800'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right space-x-2">
                    {req.status === 'PENDING' ? (
                      <>
                        <button
                          onClick={() => approveReward(req.id)}
                          className="px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 rounded text-xs font-semibold transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => setRejectingId(req.id)}
                          className="px-3 py-1 bg-rose-950/40 hover:bg-rose-950 text-rose-400 border border-rose-800 rounded text-xs transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-mono">
                        {req.status === 'APPROVED' ? 'Disbursed' : 'Declined'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Reason Modal */}
      {rejectingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <h2 className="text-sm font-bold text-white">Decline Reward Request #{rejectingId}</h2>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Reason for Rejection
              </label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Inconsistent lot sizing or KYC discrepancy..."
                className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectingId(null)}
                className="px-3 py-1.5 bg-[#1F293D] text-slate-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
