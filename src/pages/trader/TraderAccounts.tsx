import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Layers,
  Key,
  TrendingUp,
  Award,
  Sparkles,
  Copy,
  Check,
  X,
  ExternalLink
} from 'lucide-react';
import { TraderAccount } from '../../types';

export const TraderAccounts: React.FC<{ onOpenCheckout: () => void; onLaunchTerminal: () => void }> = ({
  onOpenCheckout,
  onLaunchTerminal
}) => {
  const { accounts, activeAccount, setActiveAccountId } = useApp();
  const [selectedCredAccount, setSelectedCredAccount] = useState<TraderAccount | null>(null);
  const [copied, setCopied] = useState(false);

  const copyCredentials = (acc: TraderAccount) => {
    navigator.clipboard.writeText(
      `Server: Ryvexia-SimLive\nLogin: ${acc.accountNumber}\nPassword: RyvexiaDemo2026!\nPlatform: ${acc.platform}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Evaluation & Funded Accounts</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your active challenges, switch terminal sessions, and view platform connection details.
          </p>
        </div>

        <button
          onClick={onOpenCheckout}
          className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          <span>Enroll New Challenge</span>
        </button>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((acc) => {
          const isActive = activeAccount?.id === acc.id;
          const netProfit = acc.balance - acc.initialBalance;

          return (
            <div
              key={acc.id}
              className={`bg-[#131A2A] border rounded-2xl p-6 space-y-5 transition-all shadow-xl ${
                isActive
                  ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-[#D4AF37]/5'
                  : 'border-[#1F293D] hover:border-slate-600'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-white font-mono">
                      {acc.accountNumber}
                    </span>
                    {isActive && (
                      <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded font-bold uppercase">
                        Active Terminal
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{acc.title}</div>
                </div>

                <span
                  className={`text-[10px] font-mono px-2.5 py-1 rounded font-bold uppercase ${
                    acc.status === 'passed'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                      : acc.status === 'failed'
                      ? 'bg-rose-950/60 text-rose-400 border border-rose-800'
                      : 'bg-blue-950/60 text-blue-300 border border-blue-800'
                  }`}
                >
                  {acc.status}
                </span>
              </div>

              {/* Account Balances Strip */}
              <div className="grid grid-cols-3 gap-3 bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-3 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Balance</span>
                  <span className="font-bold text-white tabular-nums">${acc.balance.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Equity</span>
                  <span className="font-bold text-[#D4AF37] tabular-nums">${acc.equity.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Profit</span>
                  <span
                    className={`font-bold tabular-nums ${
                      netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {netProfit >= 0 ? '+' : ''}${netProfit.toFixed(0)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Platform: <strong className="text-white">{acc.platform}</strong></span>
                <span>Leverage: <strong className="text-white font-mono">{acc.leverage}</strong></span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#1F293D] flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedCredAccount(acc)}
                  className="px-3 py-1.5 bg-[#1F293D] hover:bg-[#2A374F] text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Credentials</span>
                </button>

                <div className="flex items-center gap-2">
                  {!isActive && (
                    <button
                      onClick={() => setActiveAccountId(acc.id)}
                      className="px-3.5 py-1.5 bg-[#1F293D] hover:bg-[#2A374F] text-[#D4AF37] rounded-lg text-xs font-semibold transition-colors"
                    >
                      Set Active
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setActiveAccountId(acc.id);
                      onLaunchTerminal();
                    }}
                    className="px-4 py-1.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Trade</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Credentials Modal */}
      {selectedCredAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#1F293D]">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-[#D4AF37]" />
                Connection Credentials ({selectedCredAccount.accountNumber})
              </span>
              <button
                onClick={() => setSelectedCredAccount(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-4 font-mono text-xs space-y-3">
              <div className="flex justify-between border-b border-[#1F293D] pb-2">
                <span className="text-slate-500">Platform:</span>
                <span className="text-white font-bold">{selectedCredAccount.platform}</span>
              </div>
              <div className="flex justify-between border-b border-[#1F293D] pb-2">
                <span className="text-slate-500">Login ID:</span>
                <span className="text-[#D4AF37] font-bold">{selectedCredAccount.accountNumber}</span>
              </div>
              <div className="flex justify-between border-b border-[#1F293D] pb-2">
                <span className="text-slate-500">Server:</span>
                <span className="text-white">Ryvexia-SimLive</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Password:</span>
                <span className="text-white">RyvexiaDemo2026!</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => copyCredentials(selectedCredAccount)}
                className="px-4 py-2 bg-[#1F293D] hover:bg-[#2A374F] text-slate-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy All'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
