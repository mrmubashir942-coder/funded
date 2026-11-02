import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, DollarSign, Award, CheckCircle2 } from 'lucide-react';

export const AdminAffiliates: React.FC = () => {
  const { affiliate } = useApp();

  const mockAffiliates = [
    {
      id: 'aff_01',
      traderName: 'Alex Mercer',
      code: 'ALEX88',
      tier: 'Tier 2 (12%)',
      totalReferrals: 28,
      volume: 12450,
      commissionsPaid: 1494,
      pending: 480,
      joined: '2026-04-15'
    },
    {
      id: 'aff_02',
      traderName: 'Marcus Lindqvist',
      code: 'NORDIC_FX',
      tier: 'Tier 3 (15%)',
      totalReferrals: 84,
      volume: 48900,
      commissionsPaid: 7335,
      pending: 1240,
      joined: '2026-03-01'
    },
    {
      id: 'aff_03',
      traderName: 'Sophia Chen',
      code: 'QUANT_ASIA',
      tier: 'Tier 3 (15%)',
      totalReferrals: 112,
      volume: 72100,
      commissionsPaid: 10815,
      pending: 2150,
      joined: '2026-02-14'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Affiliate Partner Network Desk</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track referral volumes, commission tiers, and verify partner payout disbursements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">Total Partner Volume:</span>
          <span className="text-base font-bold text-[#D4AF37] font-mono">$133,450.00</span>
        </div>
      </div>

      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F293D] text-slate-400 bg-[#172033]">
                <th className="py-3.5 px-5 font-semibold">Partner</th>
                <th className="py-3.5 px-5 font-semibold">Referral Code</th>
                <th className="py-3.5 px-5 font-semibold">Commission Tier</th>
                <th className="py-3.5 px-5 font-semibold">Traders Referred</th>
                <th className="py-3.5 px-5 font-semibold">Total Volume ($)</th>
                <th className="py-3.5 px-5 font-semibold">Lifetime Paid ($)</th>
                <th className="py-3.5 px-5 font-semibold">Pending Claim ($)</th>
                <th className="py-3.5 px-5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D] text-slate-200">
              {mockAffiliates.map((aff) => (
                <tr key={aff.id} className="hover:bg-[#1A2234] transition-colors">
                  <td className="py-4 px-5 font-bold text-white">{aff.traderName}</td>
                  <td className="py-4 px-5 font-mono text-[#D4AF37] font-bold">{aff.code}</td>
                  <td className="py-4 px-5 text-slate-300 font-semibold">{aff.tier}</td>
                  <td className="py-4 px-5 font-mono text-white">{aff.totalReferrals}</td>
                  <td className="py-4 px-5 font-mono tabular-nums">${aff.volume.toLocaleString()}</td>
                  <td className="py-4 px-5 font-mono tabular-nums text-emerald-400">
                    ${aff.commissionsPaid.toLocaleString()}
                  </td>
                  <td className="py-4 px-5 font-mono tabular-nums text-amber-400 font-bold">
                    ${aff.pending.toLocaleString()}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button className="px-3 py-1 bg-[#1F293D] hover:bg-[#2A374F] text-slate-300 rounded text-xs transition-colors">
                      Review Log
                    </button>
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
