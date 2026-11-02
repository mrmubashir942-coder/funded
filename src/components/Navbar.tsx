import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  TrendingUp,
  User as UserIcon,
  Bell,
  LogOut,
  ChevronDown,
  Sparkles,
  Layers,
  ArrowRight,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const Navbar: React.FC<{ onOpenAuth: () => void; onOpenCheckout: () => void }> = ({
  onOpenAuth,
  onOpenCheckout
}) => {
  const {
    currentUser,
    currentView,
    activeTab,
    setCurrentView,
    setActiveTab,
    accounts,
    activeAccount,
    setActiveAccountId,
    notifications,
    markNotificationRead,
    clearAllNotifications,
    logout,
    switchRole
  } = useApp();

  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F1A]/95 backdrop-blur-md border-b border-[#1F293D]">
      {/* Compliance Notice Micro-strip */}
      <div className="bg-[#131A2A] text-slate-400 text-[11px] py-1 px-4 text-center border-b border-[#1F293D]/50 flex items-center justify-center gap-2">
        <span className="font-semibold text-[#D4AF37]">SIMULATED EVALUATION ENVIRONMENT</span>
        <span aria-hidden="true" className="text-slate-600">·</span>
        <span>All capital & trading positions are strictly educational and simulated</span>
        <span aria-hidden="true" className="text-slate-600">·</span>
        <span className="text-slate-300 font-mono">UTC Server: 22:14:00</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setCurrentView('public');
              setActiveTab('home');
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B38F22] flex items-center justify-center text-[#0B0F1A] font-extrabold text-base shadow-sm group-hover:scale-105 transition-transform">
              R
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                RYVEXIA
              </span>
              <span className="text-lg font-light tracking-widest text-[#D4AF37] ml-1.5">
                FUNDING
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Single-line, concise) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {currentView === 'public' ? (
            <>
              <button
                onClick={() => setActiveTab('home')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'home' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab('challenges')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'challenges' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Challenges & Pricing
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'rules' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Trading Rules
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'about' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'faq' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'contact' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Contact
              </button>
            </>
          ) : currentView === 'trader' ? (
            <>
              <button
                onClick={() => setActiveTab('overview')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'overview' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('webtrader')}
                className={`transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'webtrader' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                WebTrader
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'analytics' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Performance
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'rewards' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Simulated Rewards
              </button>
              <button
                onClick={() => setActiveTab('accounts')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'accounts' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                My Accounts
              </button>
              <button
                onClick={() => setActiveTab('support')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'support' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Support Desk
              </button>
            </>
          ) : (
            // Admin View
            <>
              <button
                onClick={() => setActiveTab('overview')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'overview' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Risk Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'users' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Traders
              </button>
              <button
                onClick={() => setActiveTab('accounts')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'accounts' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Live Accounts
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'rules' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
                Rule Config
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'rewards' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Payout Approvals
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'orders' ? 'text-[#D4AF37] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Trade Tape
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: Actions & Profile */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Environment View Switcher (Interactive Segmented Control) */}
          <div className="hidden lg:flex items-center bg-[#131A2A] p-1 rounded-lg border border-[#1F293D] text-xs font-medium">
            <button
              onClick={() => {
                setCurrentView('public');
                setActiveTab('home');
              }}
              className={`px-2.5 py-1 rounded transition-colors ${
                currentView === 'public'
                  ? 'bg-[#1F293D] text-[#D4AF37] shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Public
            </button>
            <button
              onClick={() => {
                switchRole('trader');
                setCurrentView('trader');
              }}
              className={`px-2.5 py-1 rounded transition-colors ${
                currentView === 'trader'
                  ? 'bg-[#1F293D] text-[#D4AF37] shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Trader Hub
            </button>
            <button
              onClick={() => {
                switchRole('admin');
                setCurrentView('admin');
              }}
              className={`px-2.5 py-1 rounded transition-colors ${
                currentView === 'admin'
                  ? 'bg-[#1F293D] text-[#D4AF37] shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Admin Desk
            </button>
          </div>

          {/* Active Account Pill (when in trader portal) */}
          {currentView === 'trader' && activeAccount && (
            <div className="relative">
              <button
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#131A2A] border border-[#1F293D] hover:border-[#D4AF37]/50 transition-colors text-xs"
              >
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-white font-mono">{activeAccount.accountNumber}</span>
                  <span className="text-[10px] text-slate-400">
                    Eq: <span className="text-[#D4AF37] font-mono tabular-nums">${activeAccount.equity.toLocaleString()}</span>
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showAccountDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-[#131A2A] border border-[#1F293D] rounded-xl shadow-2xl p-2 z-50">
                  <div className="text-[11px] font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
                    Select Account
                  </div>
                  <div className="space-y-1 mt-1">
                    {accounts.map((acc) => (
                      <button
                        key={acc.id}
                        onClick={() => {
                          setActiveAccountId(acc.id);
                          setShowAccountDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                          acc.id === activeAccount.id
                            ? 'bg-[#1F293D] text-white border border-[#D4AF37]/30'
                            : 'hover:bg-[#1A2234] text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-semibold font-mono flex items-center gap-1.5">
                            {acc.accountNumber}
                            {acc.status === 'passed' && (
                              <span className="text-[10px] text-emerald-400">✓ Passed</span>
                            )}
                            {acc.status === 'failed' && (
                              <span className="text-[10px] text-rose-400">✕ Failed</span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">{acc.title}</div>
                        </div>
                        <div className="text-right font-mono text-[#D4AF37] tabular-nums font-medium">
                          ${acc.balance.toLocaleString()}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 mt-2 border-t border-[#1F293D]">
                    <button
                      onClick={() => {
                        setShowAccountDropdown(false);
                        onOpenCheckout();
                      }}
                      className="w-full py-1.5 px-3 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Add New Evaluation Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="relative p-2 rounded-lg bg-[#131A2A] border border-[#1F293D] text-slate-300 hover:text-white transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] text-[#0B0F1A] font-bold rounded-full text-[10px] flex items-center justify-center font-mono">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#131A2A] border border-[#1F293D] rounded-xl shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#1F293D]">
                  <span className="text-xs font-semibold text-white">Rule & Account Notifications</span>
                  <button
                    onClick={clearAllNotifications}
                    className="text-[11px] text-slate-400 hover:text-slate-200"
                  >
                    Clear All
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto space-y-2 py-2">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-xs text-slate-400">No notifications</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 rounded-lg text-xs border cursor-pointer transition-colors ${
                          n.read
                            ? 'bg-[#0B0F1A]/50 border-transparent text-slate-400'
                            : 'bg-[#1F293D]/60 border-[#D4AF37]/30 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold mb-1">
                          <span className="flex items-center gap-1.5">
                            {n.type === 'alert' && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                            {n.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                            {n.title}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Login Menu */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-lg bg-[#131A2A] border border-[#1F293D] hover:border-slate-600 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-md object-cover border border-[#D4AF37]/40"
                />
                <span className="hidden sm:inline-block text-xs font-semibold text-white">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-[#131A2A] border border-[#1F293D] rounded-xl shadow-2xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-[#1F293D]">
                    <div className="font-semibold text-white text-xs">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{currentUser.email}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      KYC: {currentUser.kycStatus}
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        setCurrentView('trader');
                        setActiveTab('overview');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-[#1F293D] rounded-md transition-colors"
                    >
                      Trader Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        setCurrentView('trader');
                        setActiveTab('webtrader');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-[#1F293D] rounded-md transition-colors"
                    >
                      Simulated WebTrader
                    </button>
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        switchRole(currentUser.role === 'admin' ? 'trader' : 'admin');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#D4AF37] hover:bg-[#1F293D] rounded-md transition-colors font-medium"
                    >
                      Switch to {currentUser.role === 'admin' ? 'Trader View' : 'Admin Console'}
                    </button>
                  </div>
                  <div className="pt-1 border-t border-[#1F293D]">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/30 rounded-md transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-[#131A2A] border border-[#1F293D] rounded-lg hover:border-slate-600 transition-colors"
            >
              Client Login
            </button>
          )}

          {/* Primary CTA (Zone 3) */}
          {currentView === 'public' ? (
            <button
              onClick={onOpenCheckout}
              className="px-4 py-2 text-xs font-bold text-[#0B0F1A] bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Get Funded</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : currentView === 'trader' ? (
            <button
              onClick={() => setActiveTab('webtrader')}
              className="px-3.5 py-2 text-xs font-bold text-[#0B0F1A] bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Terminal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('accounts')}
              className="px-3.5 py-2 text-xs font-bold text-[#0B0F1A] bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Risk Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
