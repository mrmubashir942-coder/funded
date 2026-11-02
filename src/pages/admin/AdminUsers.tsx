import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, CheckCircle2, AlertTriangle, ShieldCheck, UserCheck } from 'lucide-react';
import { DEFAULT_TRADER, DEFAULT_ADMIN } from '../../data/mockData';

export const AdminUsers: React.FC = () => {
  const { accounts } = useApp();
  const [search, setSearch] = useState('');

  const [traderUsers, setTraderUsers] = useState([
    {
      id: DEFAULT_TRADER.id,
      name: DEFAULT_TRADER.name,
      email: DEFAULT_TRADER.email,
      role: 'Funded Trader',
      country: DEFAULT_TRADER.country,
      kycStatus: 'VERIFIED',
      accountsCount: accounts.length,
      joinedDate: '2026-04-12'
    },
    {
      id: 'usr_trader_02',
      name: 'Marcus Lindqvist',
      email: 'marcus.l@nordictrader.se',
      role: 'Funded Trader',
      country: 'Sweden',
      kycStatus: 'VERIFIED',
      accountsCount: 2,
      joinedDate: '2026-05-18'
    },
    {
      id: 'usr_trader_03',
      name: 'Sophia Chen',
      email: 'sophia.q@quantdesk.sg',
      role: 'Funded Trader',
      country: 'Singapore',
      kycStatus: 'VERIFIED',
      accountsCount: 3,
      joinedDate: '2026-06-01'
    },
    {
      id: 'usr_trader_04',
      name: 'Julian Alvarez',
      email: 'julian.fx@buenosaires.ar',
      role: 'Evaluation Candidate',
      country: 'Argentina',
      kycStatus: 'PENDING',
      accountsCount: 1,
      joinedDate: '2026-10-14'
    },
    {
      id: 'usr_trader_05',
      name: 'Kenji Takahashi',
      email: 'kenji.t@tokyotrade.jp',
      role: 'Evaluation Candidate',
      country: 'Japan',
      kycStatus: 'REQUIRED',
      accountsCount: 1,
      joinedDate: '2026-10-22'
    }
  ]);

  const toggleKyc = (id: string) => {
    setTraderUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = u.kycStatus === 'VERIFIED' ? 'PENDING' : 'VERIFIED';
          return { ...u, kycStatus: nextStatus };
        }
        return u;
      })
    );
  };

  const filtered = traderUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Registered Traders & KYC Registry</h1>
          <p className="text-xs text-slate-400 mt-1">
            Global trader directory, identity verification compliance status, and portfolio linkages.
          </p>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, country..."
          className="bg-[#131A2A] border border-[#1F293D] rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] w-64"
        />
      </div>

      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F293D] text-slate-400 bg-[#172033]">
                <th className="py-3.5 px-5 font-semibold">Trader</th>
                <th className="py-3.5 px-5 font-semibold">Classification</th>
                <th className="py-3.5 px-5 font-semibold">Country</th>
                <th className="py-3.5 px-5 font-semibold">Active Challenges</th>
                <th className="py-3.5 px-5 font-semibold">Joined Date</th>
                <th className="py-3.5 px-5 font-semibold">KYC Verification</th>
                <th className="py-3.5 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D] text-slate-200">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-[#1A2234] transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-white">{u.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-xs font-semibold text-[#D4AF37]">{u.role}</span>
                  </td>
                  <td className="py-4 px-5 text-slate-300">{u.country}</td>
                  <td className="py-4 px-5 font-mono text-white font-bold">{u.accountsCount}</td>
                  <td className="py-4 px-5 font-mono text-slate-400">{u.joinedDate}</td>
                  <td className="py-4 px-5">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        u.kycStatus === 'VERIFIED'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                          : u.kycStatus === 'PENDING'
                          ? 'bg-amber-950/60 text-amber-400 border border-amber-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {u.kycStatus}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => toggleKyc(u.id)}
                      className="px-3 py-1 bg-[#1F293D] hover:bg-[#2A374F] text-slate-300 rounded text-xs transition-colors"
                    >
                      {u.kycStatus === 'VERIFIED' ? 'Flag Review' : 'Approve KYC'}
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
