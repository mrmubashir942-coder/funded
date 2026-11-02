import React from 'react';
import { X, Award, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';
import { TraderAccount, User } from '../types';

export const CertificateModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  account: TraderAccount | null;
  user: User | null;
}> = ({ isOpen, onClose, account, user }) => {
  if (!isOpen || !account) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0B0F1A] border-2 border-[#D4AF37] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative p-8 sm:p-12 text-center text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1F293D] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Decorative Border Inner */}
        <div className="border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-10 space-y-6 relative bg-gradient-to-b from-[#131A2A] to-[#0B0F1A]">
          {/* Crest */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#997A1E] text-[#0B0F1A] flex items-center justify-center mx-auto shadow-xl">
            <Award className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
              Ryvexia Funding Institutional Evaluation
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide font-serif">
              CERTIFICATE OF TRADING ACHIEVEMENT
            </h2>
          </div>

          <p className="text-xs text-slate-300 italic">
            This verification certifies that
          </p>

          <div className="text-2xl sm:text-3xl font-extrabold text-[#D4AF37] tracking-wider font-serif border-b border-[#D4AF37]/30 pb-2 max-w-sm mx-auto">
            {user?.name || 'Alex Mercer'}
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            has successfully proven disciplined risk management, strict adherence to drawdown limits, and met all required profit milestones for:
          </p>

          <div className="bg-[#0B0F1A]/80 border border-[#1F293D] rounded-xl py-3 px-6 inline-block font-mono text-sm font-bold text-white shadow-inner">
            {account.title} · Capital: ${account.tierSize.toLocaleString()} USD
          </div>

          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-[#1F293D] text-[11px] text-slate-400 font-mono">
            <div className="text-left">
              <span className="block text-slate-500">Account Reference:</span>
              <span className="text-slate-200 font-bold">{account.accountNumber}</span>
              <span className="block text-slate-500 mt-1">Verification Hash:</span>
              <span className="text-[#D4AF37] text-[10px]">RX-V-992184-SECURE</span>
            </div>
            <div className="text-right">
              <span className="block text-slate-500">Authorized Signatory:</span>
              <span className="text-slate-200 font-bold">Elena Vance</span>
              <span className="block text-slate-500 mt-1">Chief Risk Officer</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-[#1F293D] hover:bg-[#2A374F] text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download Certificate PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
