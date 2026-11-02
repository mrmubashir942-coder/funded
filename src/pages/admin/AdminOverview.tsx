import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  Users,
  Award,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Sliders,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const AdminOverview: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const { accounts, rewardRequests, orders, tickets } = useApp();

  const totalFunded = accounts.filter((a) => a.phase === 'funded').length;
  const activeChallenges = accounts.filter((a) => a.status === 'active' && a.phase !== 'funded').length;
  const breachedAccounts = accounts.filter((a) => a.status === 'failed').length;
  const pendingRewards = rewardRequests.filter((r) => r.status === 'PENDING').length;
  const openTickets = tickets.filter((t) => t.status !== 'RESOLVED').length;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-xl font-bold text-white uppercase tracking-wider">
              Institutional Risk Administration Desk
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Global simulated risk telemetry, automated challenge evaluations, and payout verification queue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('rewards')}
            className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Review Payouts ({pendingRewards})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2">
          <div className="text-xs font-semibold text-slate-400">Active Challenges</div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            {activeChallenges + 1420}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">Phase 1 & Phase 2 Enrolled</div>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2">
          <div className="text-xs font-semibold text-slate-400">Master Funded Accounts</div>
          <div className="text-2xl font-extrabold text-[#D4AF37] font-mono tabular-nums">
            {totalFunded + 312}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">Passing Verification</div>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2">
          <div className="text-xs font-semibold text-slate-400">Rule Breach Rate</div>
          <div className="text-2xl font-extrabold text-rose-400 font-mono tabular-nums">
            14.2%
          </div>
          <div className="text-[11px] text-slate-500 font-mono">Daily / Overall Drawdown Exceeded</div>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2">
          <div className="text-xs font-semibold text-slate-400">Pending Payout Requests</div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono tabular-nums">
            {pendingRewards} Requests
          </div>
          <div className="text-[11px] text-slate-500 font-mono">Awaiting Desk Approval</div>
        </div>
      </div>

      {/* Live Risk Alerts & Breached Accounts Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 bg-[#172033] border-b border-[#1F293D] flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              Live Risk Queue & Breached Accounts
            </h2>
            <button
              onClick={() => onNavigate('accounts')}
              className="text-xs text-[#D4AF37] hover:underline font-semibold"
            >
              View All Live Accounts
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1F293D] text-slate-400 bg-[#131A2A]">
                  <th className="py-3 px-5 font-semibold">Account</th>
                  <th className="py-3 px-5 font-semibold">Tier</th>
                  <th className="py-3 px-5 font-semibold">Balance</th>
                  <th className="py-3 px-5 font-semibold">Status</th>
                  <th className="py-3 px-5 font-semibold">Risk Engine Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F293D] text-slate-200">
                {accounts.map((acc) => (
                  <tr key={acc.id} className="hover:bg-[#1A2234] transition-colors">
                    <td className="py-3.5 px-5 font-mono font-bold text-white">
                      {acc.accountNumber}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-slate-300">
                      ${acc.tierSize.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-5 font-mono tabular-nums">${acc.balance.toLocaleString()}</td>
                    <td className="py-3.5 px-5">
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
                    <td className="py-3.5 px-5 text-slate-400 max-w-xs truncate text-[11px]">
                      {acc.violationReason || (acc.status === 'passed' ? 'Milestone achieved' : 'Healthy operating limits')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Admin Actions Box */}
        <div className="lg:col-span-4 bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Admin Console Shortcuts
          </h2>

          <div className="space-y-3">
            <button
              onClick={() => onNavigate('rules')}
              className="w-full p-3.5 bg-[#0B0F1A] hover:bg-[#1A2234] border border-[#1F293D] hover:border-[#D4AF37]/40 rounded-xl text-left transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-white group-hover:text-[#D4AF37]">
                  Rule Configurator
                </div>
                <div className="text-[11px] text-slate-400">Adjust targets, drawdown % & fees</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </button>

            <button
              onClick={() => onNavigate('rewards')}
              className="w-full p-3.5 bg-[#0B0F1A] hover:bg-[#1A2234] border border-[#1F293D] hover:border-[#D4AF37]/40 rounded-xl text-left transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-white group-hover:text-[#D4AF37]">
                  Payout Approvals Desk
                </div>
                <div className="text-[11px] text-slate-400">Review pending reward claims</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </button>

            <button
              onClick={() => onNavigate('users')}
              className="w-full p-3.5 bg-[#0B0F1A] hover:bg-[#1A2234] border border-[#1F293D] hover:border-[#D4AF37]/40 rounded-xl text-left transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-white group-hover:text-[#D4AF37]">
                  Trader Accounts & KYC
                </div>
                <div className="text-[11px] text-slate-400">Manage user identities & records</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </button>

            <button
              onClick={() => onNavigate('orders')}
              className="w-full p-3.5 bg-[#0B0F1A] hover:bg-[#1A2234] border border-[#1F293D] hover:border-[#D4AF37]/40 rounded-xl text-left transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-white group-hover:text-[#D4AF37]">
                  Global Trade Tape
                </div>
                <div className="text-[11px] text-slate-400">Real-time simulated order audit</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
