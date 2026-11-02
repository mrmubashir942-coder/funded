/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { ChallengesPricingPage } from './pages/public/ChallengesPricingPage';
import { TradingRulesPage } from './pages/public/TradingRulesPage';
import { AboutPage } from './pages/public/AboutPage';
import { FAQPage } from './pages/public/FAQPage';
import { ContactPage } from './pages/public/ContactPage';

// Trader Pages
import { TraderOverview } from './pages/trader/TraderOverview';
import { WebTrader } from './pages/trader/WebTrader';
import { TraderAnalytics } from './pages/trader/TraderAnalytics';
import { TraderRewards } from './pages/trader/TraderRewards';
import { TraderAccounts } from './pages/trader/TraderAccounts';
import { TraderSupport } from './pages/trader/TraderSupport';

// Admin Pages
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminAccounts } from './pages/admin/AdminAccounts';
import { AdminRules } from './pages/admin/AdminRules';
import { AdminRewards } from './pages/admin/AdminRewards';
import { AdminOrders } from './pages/admin/AdminOrders';

const MainLayout: React.FC = () => {
  const { currentView, activeTab, setActiveTab } = useApp();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleLaunchTrader = () => {
    setActiveTab('webtrader');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F1A] text-slate-100 selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
      {/* Top Navigation */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'public' && (
          <>
            {activeTab === 'home' && (
              <HomePage
                onOpenCheckout={() => setIsCheckoutOpen(true)}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            )}
            {activeTab === 'challenges' && (
              <ChallengesPricingPage onOpenCheckout={() => setIsCheckoutOpen(true)} />
            )}
            {activeTab === 'rules' && <TradingRulesPage />}
            {activeTab === 'about' && <AboutPage />}
            {activeTab === 'faq' && <FAQPage />}
            {activeTab === 'contact' && <ContactPage />}
          </>
        )}

        {currentView === 'trader' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'overview' && (
              <TraderOverview onLaunchTrader={handleLaunchTrader} />
            )}
            {activeTab === 'webtrader' && <WebTrader />}
            {activeTab === 'analytics' && <TraderAnalytics />}
            {activeTab === 'rewards' && <TraderRewards />}
            {activeTab === 'accounts' && (
              <TraderAccounts
                onOpenCheckout={() => setIsCheckoutOpen(true)}
                onLaunchTerminal={handleLaunchTrader}
              />
            )}
            {activeTab === 'support' && <TraderSupport />}
          </div>
        )}

        {currentView === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'overview' && <AdminOverview onNavigate={(tab) => setActiveTab(tab)} />}
            {activeTab === 'users' && <AdminUsers />}
            {activeTab === 'accounts' && <AdminAccounts />}
            {activeTab === 'rules' && <AdminRules />}
            {activeTab === 'rewards' && <AdminRewards />}
            {activeTab === 'orders' && <AdminOrders />}
          </div>
        )}
      </main>

      {/* Regulatory & Institutional Footer */}
      <Footer />

      {/* Global Modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
