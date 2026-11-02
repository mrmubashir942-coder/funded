import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Plus, CheckCircle2, XCircle, Percent, Clock } from 'lucide-react';
import { CouponCode } from '../../types';

export const AdminCoupons: React.FC = () => {
  const { coupons, addCoupon, toggleCoupon } = useApp();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [discountPct, setDiscountPct] = useState<number>(15);
  const [description, setDescription] = useState('');
  const [expiry, setExpiry] = useState('2026-12-31');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode) return;

    addCoupon({
      code: newCode.trim().toUpperCase(),
      discountPct,
      description,
      active: true,
      timesUsed: 0,
      expiry
    });

    setIsCreateOpen(false);
    setNewCode('');
    setDescription('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Coupons & Promotional Discount Manager</h1>
          <p className="text-xs text-slate-400 mt-1">
            Create and manage promotional discount codes for checkout challenge enrollments.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Discount Code</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F293D] text-slate-400 bg-[#172033]">
                <th className="py-3.5 px-5 font-semibold">Promo Code</th>
                <th className="py-3.5 px-5 font-semibold">Discount Multiplier</th>
                <th className="py-3.5 px-5 font-semibold">Description</th>
                <th className="py-3.5 px-5 font-semibold">Times Claimed</th>
                <th className="py-3.5 px-5 font-semibold">Expiration Date</th>
                <th className="py-3.5 px-5 font-semibold">Status</th>
                <th className="py-3.5 px-5 font-semibold text-right">Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D] text-slate-200">
              {coupons.map((c) => (
                <tr key={c.code} className="hover:bg-[#1A2234] transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-white text-sm">
                    {c.code}
                  </td>
                  <td className="py-4 px-5 font-mono font-extrabold text-[#D4AF37]">
                    {c.discountPct}% OFF
                  </td>
                  <td className="py-4 px-5 text-slate-300">{c.description}</td>
                  <td className="py-4 px-5 font-mono text-white font-bold">{c.timesUsed}</td>
                  <td className="py-4 px-5 font-mono text-slate-400">{c.expiry}</td>
                  <td className="py-4 px-5">
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded font-bold uppercase ${
                        c.active
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {c.active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => toggleCoupon(c.code)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                        c.active
                          ? 'bg-rose-950/40 text-rose-300 border border-rose-800 hover:bg-rose-950'
                          : 'bg-emerald-950/40 text-emerald-300 border border-emerald-800 hover:bg-emerald-950'
                      }`}
                    >
                      {c.active ? 'Disable' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h2 className="text-base font-bold text-white">Create Promotional Discount Voucher</h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Promo Code</label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="e.g. VIP25"
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white uppercase font-mono font-bold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={discountPct}
                    onChange={(e) => setDiscountPct(parseInt(e.target.value) || 1)}
                    className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Black Friday Special Promo"
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 bg-[#1F293D] text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] rounded-xl text-xs font-bold transition-colors"
                >
                  Create Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
