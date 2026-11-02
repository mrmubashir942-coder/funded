import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, ShieldCheck, Key, Lock, CheckCircle2, Upload, AlertCircle } from 'lucide-react';

export const TraderProfile: React.FC = () => {
  const { currentUser } = useApp();

  const [kycStatus, setKycStatus] = useState<'VERIFIED' | 'PENDING' | 'REQUIRED'>(
    currentUser?.kycStatus || 'VERIFIED'
  );
  const [usdtAddress, setUsdtAddress] = useState('0x71C8A627341e98dE2b0cFa07689953F9b79Abc99');
  const [iban, setIban] = useState('CH93 0076 2011 6238 5295 1');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Trader Profile & Verification Desk</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your personal identification, KYC status, payout rails, and security credentials.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || '/src/assets/images/avatar_trader_alex_1793599901320.jpg'}
            alt="Trader Avatar"
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D4AF37]"
          />
          <div>
            <h2 className="text-xl font-bold text-white">{currentUser?.name || 'Alex Mercer'}</h2>
            <div className="text-xs text-slate-400 font-mono mt-0.5">{currentUser?.email}</div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              Member Since: {currentUser?.joinedDate} · {currentUser?.country}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-slate-400 font-mono">KYC Compliance</span>
          <span
            className={`text-xs font-mono px-3 py-1 rounded-lg font-bold uppercase flex items-center gap-1.5 ${
              kycStatus === 'VERIFIED'
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                : 'bg-amber-950/60 text-amber-400 border border-amber-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            {kycStatus}
          </span>
        </div>
      </div>

      {/* KYC Verification & Document Vault */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1F293D] pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            Identity Verification (KYC Level 2)
          </h3>
          <span className="text-xs font-mono text-emerald-400 font-semibold">
            ✓ Cleared for Automated Payouts
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Your identity verification has been validated by Ryvexia Compliance in accordance with international AML/CTF regulations. You are eligible to receive simulated reward disbursements up to the $2,000,000 maximum scaling cap.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
          <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-3.5 space-y-1">
            <span className="text-slate-500 text-[10px] block">Government Photo ID</span>
            <span className="text-white font-bold">UK Passport (Verified)</span>
            <span className="text-emerald-400 text-[10px] block">Hash: KYC-GB-992184</span>
          </div>

          <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-3.5 space-y-1">
            <span className="text-slate-500 text-[10px] block">Proof of Residential Address</span>
            <span className="text-white font-bold">Utility Statement (Verified)</span>
            <span className="text-emerald-400 text-[10px] block">London, United Kingdom</span>
          </div>
        </div>
      </div>

      {/* Payout Channels & Presets */}
      <form onSubmit={handleSave} className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1F293D] pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Default Payout Settlement Destinations</h3>
            <span className="text-xs text-slate-400">Used for expedited reward disbursement processing.</span>
          </div>
          {saveSuccess && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Primary USDT (ERC20 / TRC20) Wallet Address
            </label>
            <input
              type="text"
              value={usdtAddress}
              onChange={(e) => setUsdtAddress(e.target.value)}
              className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              International Bank Wire (IBAN / SWIFT)
            </label>
            <input
              type="text"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="twoFactor"
                checked={twoFactorEnabled}
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#D4AF37] rounded"
              />
              <label htmlFor="twoFactor" className="text-xs text-white font-semibold cursor-pointer">
                Require Two-Factor Authentication (2FA) for Payout Disbursals
              </label>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] font-bold rounded-xl text-xs transition-colors"
            >
              Update Preferences
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
