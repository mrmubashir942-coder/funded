import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Shield,
  CreditCard,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Copy,
  Check
} from 'lucide-react';
import { TraderAccount } from '../types';

export const CheckoutModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { challengeTiers, checkoutData, setCheckoutData, purchaseChallenge, setCurrentView, setActiveTab } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'wire'>('card');
  const [createdAccount, setCreatedAccount] = useState<TraderAccount | null>(null);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const currentTier = challengeTiers.find((t) => t.id === checkoutData.tierId) || challengeTiers[3];

  let totalPrice = currentTier.fee;
  if (checkoutData.addOnNinetySplit) totalPrice += 39;
  if (checkoutData.addOnBiWeekly) totalPrice += 29;
  if (checkoutData.addOnNoMinDays) totalPrice += 49;

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const acc = purchaseChallenge();
      setCreatedAccount(acc);
      setIsProcessing(false);
    }, 700);
  };

  const copyCreds = () => {
    if (!createdAccount) return;
    navigator.clipboard.writeText(`Server: Ryvexia-SimLive\nLogin: ${createdAccount.accountNumber}\nPassword: RyvexiaDemo2026!`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLaunchTerminal = () => {
    onClose();
    setCurrentView('trader');
    setActiveTab('webtrader');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-[#172033] border-b border-[#1F293D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              {createdAccount ? 'Account Successfully Provisioned' : 'Institutional Challenge Enrollment'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1F293D] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {createdAccount ? (
          /* Step 2: Success & Credentials View */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white">Evaluation Account Activated!</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Your simulated balance of{' '}
                <strong className="text-white font-mono">${createdAccount.initialBalance.toLocaleString()}</strong> is
                loaded and ready for trading.
              </p>
            </div>

            {/* Credential Card */}
            <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-5 text-left max-w-md mx-auto space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#1F293D] pb-2">
                <span className="text-slate-400">Account Number:</span>
                <span className="text-[#D4AF37] font-bold text-sm">{createdAccount.accountNumber}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#1F293D] pb-2">
                <span className="text-slate-400">Platform:</span>
                <span className="text-white font-medium">{createdAccount.platform}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#1F293D] pb-2">
                <span className="text-slate-400">Server:</span>
                <span className="text-white">Ryvexia-SimLive</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Master Password:</span>
                <span className="text-white">RyvexiaDemo2026!</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={copyCreds}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#1F293D] hover:bg-[#2A374F] text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Credentials Copied!' : 'Copy Credentials'}</span>
              </button>

              <button
                onClick={handleLaunchTerminal}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Launch WebTrader Terminal</span>
              </button>
            </div>
          </div>
        ) : (
          /* Step 1: Configuration & Payment */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Account Tier & Model Choice */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Account Size
                </label>
                <select
                  value={checkoutData.tierId}
                  onChange={(e) => setCheckoutData((prev) => ({ ...prev, tierId: e.target.value }))}
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-mono font-bold"
                >
                  {challengeTiers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label} Account — ${t.fee}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Evaluation Model
                </label>
                <select
                  value={checkoutData.model}
                  onChange={(e: any) => setCheckoutData((prev) => ({ ...prev, model: e.target.value }))}
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="2-step">2-Step Standard (8% / 5% Target)</option>
                  <option value="1-step">1-Step Rapid (10% Target)</option>
                  <option value="instant">Instant Simulated Funding</option>
                </select>
              </div>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Trading Platform
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCheckoutData((prev) => ({ ...prev, platform: 'Ryvexia WebTrader' }))}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    checkoutData.platform === 'Ryvexia WebTrader'
                      ? 'bg-[#1F293D] border-[#D4AF37] text-white'
                      : 'bg-[#0B0F1A] border-[#1F293D] text-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs text-white">Ryvexia WebTrader</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Built-in high-speed browser terminal</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCheckoutData((prev) => ({ ...prev, platform: 'MetaTrader 5' }))}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    checkoutData.platform === 'MetaTrader 5'
                      ? 'bg-[#1F293D] border-[#D4AF37] text-white'
                      : 'bg-[#0B0F1A] border-[#1F293D] text-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs text-white">MetaTrader 5 (MT5)</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Desktop & Mobile bridge access</div>
                </button>
              </div>
            </div>

            {/* Optional Add-Ons */}
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Optional Upgrades
              </label>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F1A] border border-[#1F293D] cursor-pointer hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checkoutData.addOnNinetySplit}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({ ...prev, addOnNinetySplit: e.target.checked }))
                      }
                      className="accent-[#D4AF37] w-4 h-4 rounded"
                    />
                    <div>
                      <span className="text-xs font-bold text-white">90% Lifetime Reward Split</span>
                      <span className="block text-[11px] text-slate-400">Increase profit split from 80% to 90%</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#D4AF37]">+$39</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F1A] border border-[#1F293D] cursor-pointer hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checkoutData.addOnBiWeekly}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({ ...prev, addOnBiWeekly: e.target.checked }))
                      }
                      className="accent-[#D4AF37] w-4 h-4 rounded"
                    />
                    <div>
                      <span className="text-xs font-bold text-white">Bi-Weekly First Payout</span>
                      <span className="block text-[11px] text-slate-400">First reward available after 14 days</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#D4AF37]">+$29</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F1A] border border-[#1F293D] cursor-pointer hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checkoutData.addOnNoMinDays}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({ ...prev, addOnNoMinDays: e.target.checked }))
                      }
                      className="accent-[#D4AF37] w-4 h-4 rounded"
                    />
                    <div>
                      <span className="text-xs font-bold text-white">Zero Minimum Trading Days</span>
                      <span className="block text-[11px] text-slate-400">Advance the moment targets are achieved</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#D4AF37]">+$49</span>
                </label>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Simulated Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#1F293D] border-[#D4AF37] text-white'
                      : 'bg-[#0B0F1A] border-[#1F293D] text-slate-400'
                  }`}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                    paymentMethod === 'crypto'
                      ? 'bg-[#1F293D] border-[#D4AF37] text-white'
                      : 'bg-[#0B0F1A] border-[#1F293D] text-slate-400'
                  }`}
                >
                  Crypto (USDT)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wire')}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                    paymentMethod === 'wire'
                      ? 'bg-[#1F293D] border-[#D4AF37] text-white'
                      : 'bg-[#0B0F1A] border-[#1F293D] text-slate-400'
                  }`}
                >
                  Bank Wire
                </button>
              </div>
            </div>

            {/* Total Summary & Checkout Button */}
            <div className="pt-4 border-t border-[#1F293D] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400">One-Time Fee:</span>
                <div className="text-2xl font-extrabold text-[#D4AF37] font-mono">${totalPrice}</div>
              </div>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleCompleteOrder}
                className="px-7 py-3 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A] font-bold rounded-xl text-xs shadow-lg transition-all flex items-center gap-2"
              >
                {isProcessing ? (
                  <span>Activating Challenge...</span>
                ) : (
                  <>
                    <span>Confirm & Activate Challenge</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
