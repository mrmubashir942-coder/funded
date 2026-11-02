import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, ShieldCheck, CheckCircle2, DollarSign, TrendingUp, Sparkles, Lock } from 'lucide-react';

export const TraderAchievements: React.FC = () => {
  const { achievements } = useApp();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Certificates & Achievements Gallery</h1>
          <p className="text-xs text-slate-400 mt-1">
            Institutional milestones, discipline badges, and verified trading achievements earned on Ryvexia accounts.
          </p>
        </div>

        <div className="text-xs font-mono bg-[#131A2A] border border-[#1F293D] px-3.5 py-1.5 rounded-lg text-slate-300">
          Unlocked: <strong className="text-[#D4AF37]">{achievements.filter((a) => a.unlocked).length}</strong> / {achievements.length} Badges
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`border rounded-2xl p-6 space-y-4 shadow-xl transition-all ${
              ach.unlocked
                ? 'bg-[#131A2A] border-[#D4AF37]/50 shadow-[#D4AF37]/5'
                : 'bg-[#0E1320] border-[#1F293D] opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  ach.unlocked
                    ? 'bg-gradient-to-br from-[#D4AF37] to-[#997A1E] text-[#0B0F1A] shadow-lg'
                    : 'bg-[#1F293D] text-slate-500'
                }`}
              >
                {ach.unlocked ? <Award className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
              </div>

              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  ach.unlocked
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {ach.unlocked ? 'Unlocked' : 'Locked'}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{ach.title}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ach.description}</p>
            </div>

            <div className="pt-3 border-t border-[#1F293D] flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>{ach.category}</span>
              <span>{ach.unlockedAt || 'In Progress'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
