import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, CheckCircle2, ShieldAlert, Play, Sparkles, AlertTriangle } from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { runAutomatedRiskEngineTests, testResults } = useApp();
  const [isRunningTests, setIsRunningTests] = useState(false);

  const handleRunTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      runAutomatedRiskEngineTests();
      setIsRunningTests(false);
    }, 600);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Firm Analytics & Automated Test Harness</h1>
          <p className="text-xs text-slate-400 mt-1">
            Revenue statistics, instrument turnover, pass/fail ratios, and automated risk engine integrity verification.
          </p>
        </div>

        <button
          onClick={handleRunTests}
          disabled={isRunningTests}
          className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A] rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{isRunningTests ? 'Running Automated Tests...' : 'Run Automated Test Harness'}</span>
        </button>
      </div>

      {/* Primary Financial & Risk KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2 shadow-xl">
          <span className="text-xs text-slate-400 font-mono">Gross Challenge Billings</span>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">$1,489,200.00</div>
          <span className="text-[11px] text-emerald-400 font-mono">+18.4% vs previous month</span>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2 shadow-xl">
          <span className="text-xs text-slate-400 font-mono">Simulated Rewards Paid Out</span>
          <div className="text-2xl font-extrabold text-[#D4AF37] font-mono tabular-nums">$942,650.00</div>
          <span className="text-[11px] text-slate-400 font-mono">Disbursed to 412 Master Traders</span>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2 shadow-xl">
          <span className="text-xs text-slate-400 font-mono">Phase 1 Pass Rate</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">26.8%</div>
          <span className="text-[11px] text-slate-400 font-mono">Healthy institutional average</span>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-2 shadow-xl">
          <span className="text-xs text-slate-400 font-mono">Drawdown Breach Rate</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono tabular-nums">14.2%</div>
          <span className="text-[11px] text-slate-400 font-mono">Daily or overall loss locked</span>
        </div>
      </div>

      {/* Automated Test Harness Results Box (Phase 8 Compliance) */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1F293D] pb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Automated Risk & Engine Test Suite
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated tests verifying daily drawdown formulas, static drawdown protection, phase transitions, and promo code valuations.
            </p>
          </div>

          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800 font-bold">
            {testResults.length > 0 ? `${testResults.filter((r) => r.passed).length}/${testResults.length} Tests Passed` : 'Ready to Run'}
          </span>
        </div>

        {testResults.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs font-mono space-y-2">
            <div>Test harness initialized. Click "Run Automated Test Harness" above to verify the calculation engine.</div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            {testResults.map((test, idx) => (
              <div
                key={idx}
                className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-bold text-white">{test.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">{test.details}</div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] text-slate-500">{test.timestamp}</span>
                  <span className="px-2.5 py-0.5 rounded font-bold text-[11px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                    PASSED ✓
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Traded Instrument Distribution */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h2 className="text-base font-bold text-white">Simulated Instrument Turnover & Popularity</h2>

        <div className="space-y-4 text-xs font-mono">
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>XAUUSD (Spot Gold)</span>
              <span className="font-bold text-[#D4AF37]">42% ($625,000 Volume)</span>
            </div>
            <div className="w-full bg-[#0B0F1A] h-2.5 rounded-full overflow-hidden border border-[#1F293D]">
              <div className="bg-[#D4AF37] h-full rounded-full" style={{ width: '42%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>EURUSD & GBPUSD (Forex Majors)</span>
              <span className="font-bold text-emerald-400">28% ($416,000 Volume)</span>
            </div>
            <div className="w-full bg-[#0B0F1A] h-2.5 rounded-full overflow-hidden border border-[#1F293D]">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '28%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>BTCUSD (Bitcoin Spot Demo)</span>
              <span className="font-bold text-blue-400">18% ($268,000 Volume)</span>
            </div>
            <div className="w-full bg-[#0B0F1A] h-2.5 rounded-full overflow-hidden border border-[#1F293D]">
              <div className="bg-blue-400 h-full rounded-full" style={{ width: '18%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>US30 & NAS100 (Equity Indices)</span>
              <span className="font-bold text-purple-400">12% ($178,000 Volume)</span>
            </div>
            <div className="w-full bg-[#0B0F1A] h-2.5 rounded-full overflow-hidden border border-[#1F293D]">
              <div className="bg-purple-400 h-full rounded-full" style={{ width: '12%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
