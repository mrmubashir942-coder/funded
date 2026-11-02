import React from 'react';
import { Shield, Award, Globe, Users, TrendingUp } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
          About Ryvexia Funding
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          A Modern Prop Evaluation Standard
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Founded in Zurich by proprietary traders and institutional quant developers, RYVEXIA FUNDING bridges the gap between undiscovered retail talent and institutional risk capital models.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Our Mission</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            To provide the most realistic, reliable, and equitable evaluation ground for serious market operators. We reward disciplined risk management, consistency, and patience above hyper-gambling.
          </p>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Institutional Tech Stack</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Powered by high-throughput WebSocket price feeds that match tier-1 interbank liquidity. Sub-10ms simulated execution gives scalpers and algorithms genuine pricing precision.
          </p>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Global Presence</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Operating from our headquarters in Zurich, with support desks in Dubai (DIFC) and Singapore. Over 12,000 active traders across 140 countries participate in our simulated challenges.
          </p>
        </div>
      </div>
    </div>
  );
};
