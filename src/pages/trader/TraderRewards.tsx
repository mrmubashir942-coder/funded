import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  DollarSign,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Send,
  X
} from 'lucide-react';

export const TraderRewards: React.FC = () => {
  const { activeAccount, rewardRequests, requestReward } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestAmount, setRequestAmount] = useState<number>(1000);
  const [method, setMethod] = useState<'USDT' | 'USDC' | 'BANK_WIRE'>('USDT');
  const [addressOrIban, setAddressOrIban] = useState('');
  const [feedback, setFeedback] = useState<{ text: string; error?: boolean } | null>(null);

  if (!activeAccount) {
    return <div className="text-center py-20 text-slate-400">No active account</div>;
  }

  const netProfit = Math.max(0, activeAccount.balance - activeAccount.initialBalance);
  const splitPct = 85;
  const eligibleReward = Math.round(netProfit * (splitPct / 100) * 100) / 100;

  // Filter rewards for this user/account
  const myRewards = rewardRequests.filter(
    (r) => r.accountId === activeAccount.id || r.traderEmail === 'trader@ryvexia.com'
  );

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressOrIban) return;

    const res = requestReward(requestAmount, method, addressOrIban);
    setFeedback({ text: res.message, error: !res.success });

    if (res.success) {
      setTimeout(() => {
        setIsModalOpen(false);
        setFeedback(null);
        setAddressOrIban('');
      }, 1500);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Simulated Rewards Hub</h1>
          <p className="text-xs text-slate-400 mt-1">
            Request and track simulated performance bonuses earned on verified evaluation and funded accounts.
          </p>
        </div>

        <button
          onClick={() => {
            setRequestAmount(netProfit > 500 ? netProfit : 1000);
            setIsModalOpen(true);
          }}
          disabled={netProfit <= 0}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md ${
            netProfit > 0
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A]'
              : 'bg-[#1F293D] text-slate-500 cursor-not-allowed'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Request Reward Payout</span>
        </button>
      </div>

      {/* Rewards Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 space-y-2 shadow-xl">
          <div className="text-xs font-semibold text-slate-400">Net Simulated Profit Available</div>
          <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
            ${netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Account: {activeAccount.accountNumber}
          </div>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 space-y-2 shadow-xl">
          <div className="text-xs font-semibold text-slate-400">Trader Reward Split ({splitPct}%)</div>
          <div className="text-3xl font-extrabold text-[#D4AF37] font-mono tabular-nums">
            ${eligibleReward.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            {splitPct}% of net gains disbursed
          </div>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 space-y-2 shadow-xl">
          <div className="text-xs font-semibold text-slate-400">Payout Review Turnaround</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
            &lt; 8 Hours
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            USDT · USDC · Direct Wire
          </div>
        </div>
      </div>

      {/* Reward History Table */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 bg-[#172033] border-b border-[#1F293D] flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            Simulated Reward Ledger & Payout History
          </h2>
          <span className="text-xs text-slate-400 font-mono">Audited Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F293D] text-slate-400 bg-[#131A2A]">
                <th className="py-3 px-5 font-semibold">Request ID</th>
                <th className="py-3 px-5 font-semibold">Date</th>
                <th className="py-3 px-5 font-semibold">Gross Profit</th>
                <th className="py-3 px-5 font-semibold">Split</th>
                <th className="py-3 px-5 font-semibold">Disbursed Amount</th>
                <th className="py-3 px-5 font-semibold">Method</th>
                <th className="py-3 px-5 font-semibold">Status</th>
                <th className="py-3 px-5 font-semibold">Transaction / Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D] text-slate-200">
              {myRewards.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-500">
                    No reward requests filed yet.
                  </td>
                </tr>
              ) : (
                myRewards.map((req) => (
                  <tr key={req.id} className="hover:bg-[#1A2234] transition-colors">
                    <td className="py-3.5 px-5 font-mono text-slate-300 font-bold">{req.id}</td>
                    <td className="py-3.5 px-5 font-mono text-slate-400">{req.date}</td>
                    <td className="py-3.5 px-5 font-mono text-white">${req.amount.toLocaleString()}</td>
                    <td className="py-3.5 px-5 font-mono text-[#D4AF37] font-semibold">
                      {req.splitPct}%
                    </td>
                    <td className="py-3.5 px-5 font-mono font-bold text-emerald-400">
                      ${req.traderAmount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-5 font-mono">{req.method}</td>
                    <td className="py-3.5 px-5">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
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
                    <td className="py-3.5 px-5 font-mono text-slate-400 max-w-xs truncate">
                      {req.txHash || 'In review by desk'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Reward Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#1F293D]">
              <span className="text-sm font-bold text-white">
                Submit Simulated Reward Request
              </span>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Gross Profit Amount to Withdraw (Max: ${netProfit.toFixed(2)})
                </label>
                <input
                  type="number"
                  min="100"
                  max={netProfit}
                  step="50"
                  value={requestAmount}
                  onChange={(e) => setRequestAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:border-[#D4AF37]"
                />
                <div className="text-[11px] text-[#D4AF37] font-mono mt-1">
                  Your {splitPct}% payout will be: ${(requestAmount * (splitPct / 100)).toFixed(2)}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Disbursement Rail
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['USDT', 'USDC', 'BANK_WIRE'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMethod(m)}
                      className={`py-2 px-2 rounded-lg border text-xs font-semibold transition-all ${
                        method === m
                          ? 'bg-[#1F293D] border-[#D4AF37] text-white'
                          : 'bg-[#0B0F1A] border-[#1F293D] text-slate-400'
                      }`}
                    >
                      {m === 'BANK_WIRE' ? 'Wire Transfer' : m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  {method === 'BANK_WIRE' ? 'Bank IBAN / SWIFT Code' : `${method} Crypto Wallet Address`}
                </label>
                <input
                  type="text"
                  required
                  value={addressOrIban}
                  onChange={(e) => setAddressOrIban(e.target.value)}
                  placeholder={
                    method === 'BANK_WIRE'
                      ? 'CH93 0076 2011 6238 5295 1'
                      : '0x71C8A627341e98dE2b0cFa07689953F9b79Abc99'
                  }
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {feedback && (
                <div
                  className={`p-2.5 rounded-lg text-xs text-center font-medium ${
                    feedback.error ? 'bg-rose-950/60 text-rose-300' : 'bg-emerald-950/60 text-emerald-300'
                  }`}
                >
                  {feedback.text}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A] font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit to Risk Desk</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
