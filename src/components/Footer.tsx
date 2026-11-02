import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, MapPin, Globe, Clock, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setActiveTab } = useApp();

  return (
    <footer className="bg-[#080B13] border-t border-[#1F293D] text-slate-400 text-xs mt-auto">
      {/* Upper Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B38F22] flex items-center justify-center text-[#0B0F1A] font-extrabold text-base shadow-sm">
                R
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                RYVEXIA <span className="font-light text-[#D4AF37]">FUNDING</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Trade Smart. Prove Your Edge. Institutional evaluation models designed by professional proprietary traders. Simulate institutional execution with up to 90% reward splits.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Zurich · Dubai · Singapore
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> 24/5 Live Desk
              </span>
            </div>
          </div>

          {/* Column: Evaluation Programs */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Evaluation
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('public');
                    setActiveTab('challenges');
                  }}
                  className="hover:text-white transition-colors"
                >
                  2-Step Evaluation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('public');
                    setActiveTab('challenges');
                  }}
                  className="hover:text-white transition-colors"
                >
                  1-Step Rapid Evaluation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('public');
                    setActiveTab('challenges');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Instant Simulated Capital
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('public');
                    setActiveTab('rules');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Scaling Plan ($2M Cap)
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Trading Rules & Desk */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Trading Rules
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('public');
                    setActiveTab('rules');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Daily Drawdown Calculation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('public');
                    setActiveTab('rules');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Maximum Overall Loss
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('public');
                    setActiveTab('rules');
                  }}
                  className="hover:text-white transition-colors"
                >
                  News & Weekend Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('public');
                    setActiveTab('rules');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Prohibited Strategies
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Company & Portal */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Platforms & Portal
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('trader');
                    setActiveTab('webtrader');
                  }}
                  className="hover:text-white transition-colors text-[#D4AF37]"
                >
                  Launch WebTrader
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('trader');
                    setActiveTab('overview');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Trader Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('public');
                    setActiveTab('faq');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('public');
                    setActiveTab('contact');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Submit Support Ticket
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Simulated Environment Legal Disclaimer (Mandatory) */}
        <div className="mt-12 pt-8 border-t border-[#1F293D] space-y-4">
          <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-4 sm:p-5 text-[11px] leading-relaxed text-slate-400">
            <div className="flex items-center gap-2 text-slate-200 font-semibold mb-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              IMPORTANT REGULATORY NOTICE & SIMULATED TRADING DISCLOSURE
            </div>
            <p className="mb-2">
              All accounts and services provided by <strong>RYVEXIA FUNDING</strong> are simulated accounts funded with fictitious virtual balances. All trading activity is performed within a simulated sandbox environment utilizing real-time institutional price feed data. RYVEXIA FUNDING does not operate as a broker, custodian, or financial services provider, and does not accept or custody client investment deposits.
            </p>
            <p>
              Simulated trading performance does not represent actual market execution. Hypothetical or simulated performance results possess inherent limitations; past performance in a simulated evaluation is no indicator of future results. Simulated reward payouts are performance bonuses paid by Ryvexia Funding subject to verification and terms of service.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 pt-2">
            <div>
              © 2026 RYVEXIA FUNDING AG. All rights reserved. Registered under CHE-284.192.831.
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span aria-hidden="true">·</span>
              <span>Terms of Evaluation</span>
              <span aria-hidden="true">·</span>
              <span>Risk Disclosure</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
