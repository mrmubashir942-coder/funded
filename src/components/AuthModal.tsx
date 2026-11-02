import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Shield, User as UserIcon, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { login } = useApp();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'trader@ryvexia.com', 'trader');
    onClose();
  };

  const handleQuickDemoTrader = () => {
    login('trader@ryvexia.com', 'trader');
    onClose();
  };

  const handleQuickDemoAdmin = () => {
    login('admin@ryvexia.com', 'admin');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-[#172033] border-b border-[#1F293D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#D4AF37] flex items-center justify-center text-[#0B0F1A] font-extrabold text-xs">
              R
            </div>
            <span className="text-sm font-bold text-white">RYVEXIA PORTAL ACCESS</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1F293D] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick 1-Click Demo Logins */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Quick 1-Click Sandbox Logins
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleQuickDemoTrader}
                className="p-3 bg-[#0B0F1A] hover:bg-[#1A2234] border border-[#1F293D] hover:border-[#D4AF37]/50 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white group-hover:text-[#D4AF37]">
                    Trader Demo
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Funded</span>
                </div>
                <div className="text-[11px] text-slate-400">Alex Mercer</div>
              </button>

              <button
                onClick={handleQuickDemoAdmin}
                className="p-3 bg-[#0B0F1A] hover:bg-[#1A2234] border border-[#1F293D] hover:border-[#D4AF37]/50 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white group-hover:text-[#D4AF37]">
                    Risk Admin
                  </span>
                  <span className="text-[10px] text-[#D4AF37] font-mono">Head Desk</span>
                </div>
                <div className="text-[11px] text-slate-400">Elena Vance</div>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#1F293D] w-full" />
            <span className="bg-[#131A2A] px-3 text-[11px] text-slate-500 uppercase tracking-wider whitespace-nowrap">
              or enter credentials
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleCustomLogin} className="space-y-4">
            {tab === 'register' && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Account Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="trader@ryvexia.com"
                className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A] font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{tab === 'login' ? 'Sign In to Portal' : 'Create Trader Profile'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Tab */}
          <div className="text-center text-xs text-slate-400">
            {tab === 'login' ? (
              <span>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setTab('register')}
                  className="text-[#D4AF37] hover:underline font-semibold"
                >
                  Register here
                </button>
              </span>
            ) : (
              <span>
                Already have a profile?{' '}
                <button
                  type="button"
                  onClick={() => setTab('login')}
                  className="text-[#D4AF37] hover:underline font-semibold"
                >
                  Sign in
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
