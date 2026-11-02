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
import { ComparePlansPage } from './pages/public/ComparePlansPage';
import { TradingRulesPage } from './pages/public/TradingRulesPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { AffiliateProgramPage } from './pages/public/AffiliateProgramPage';
import { BlogPage } from './pages/public/BlogPage';
import { AboutPage } from './pages/public/AboutPage';
import { FAQPage } from './pages/public/FAQPage';
import { ContactPage } from './pages/public/ContactPage';
import {
  TermsPage,
  PrivacyPage,
  RefundPolicyPage,
  RiskDisclosurePage
} from './pages/public/LegalPages';

// Trader Pages
import { TraderOverview } from './pages/trader/TraderOverview';
import { WebTrader } from './pages/trader/WebTrader';
import { TraderAnalytics } from './pages/trader/TraderAnalytics';
import { TraderJournal } from './pages/trader/TraderJournal';
import { TraderLeaderboard } from './pages/trader/TraderLeaderboard';
import { TraderAchievements } from './pages/trader/TraderAchievements';
import { TraderLoyalty } from './pages/trader/TraderLoyalty';
import { TraderRewards } from './pages/trader/TraderRewards';
import { TraderAccounts } from './pages/trader/TraderAccounts';
import { TraderProfile } from './pages/trader/TraderProfile';
import { TraderSupport } from './pages/trader/TraderSupport';

// Admin Pages
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminAccounts } from './pages/admin/AdminAccounts';
import { AdminRules } from './pages/admin/AdminRules';
import { AdminRewards } from './pages/admin/AdminRewards';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminCoupons } from './pages/admin/AdminCoupons';
import { AdminAffiliates } from './pages/admin/AdminAffiliates';
import { AdminContent } from './pages/admin/AdminContent';
import { AdminAuditLogs } from './pages/admin/AdminAuditLogs';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';

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
        {/* PUBLIC VIEW PAGES */}
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
            {activeTab === 'compare' && (
              <ComparePlansPage onOpenCheckout={() => setIsCheckoutOpen(true)} />
            )}
            {activeTab === 'rules' && <TradingRulesPage />}
            {activeTab === 'how-it-works' && (
              <HowItWorksPage onOpenCheckout={() => setIsCheckoutOpen(true)} />
            )}
            {activeTab === 'affiliate' && <AffiliateProgramPage />}
            {activeTab === 'blog' && <BlogPage />}
            {activeTab === 'about' && <AboutPage />}
            {activeTab === 'faq' && <FAQPage />}
            {activeTab === 'contact' && <ContactPage />}
            {activeTab === 'terms' && <TermsPage />}
            {activeTab === 'privacy' && <PrivacyPage />}
            {activeTab === 'refund' && <RefundPolicyPage />}
            {activeTab === 'risk' && <RiskDisclosurePage />}
          </>
        )}

        {/* TRADER DASHBOARD & TERMINAL */}
        {currentView === 'trader' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'overview' && (
              <TraderOverview onLaunchTrader={handleLaunchTrader} />
            )}
            {activeTab === 'webtrader' && <WebTrader />}
            {activeTab === 'analytics' && <TraderAnalytics />}
            {activeTab === 'journal' && <TraderJournal />}
            {activeTab === 'leaderboard' && <TraderLeaderboard />}
            {activeTab === 'achievements' && <TraderAchievements />}
            {activeTab === 'loyalty' && <TraderLoyalty />}
            {activeTab === 'rewards' && <TraderRewards />}
            {activeTab === 'accounts' && (
              <TraderAccounts
                onOpenCheckout={() => setIsCheckoutOpen(true)}
                onLaunchTerminal={handleLaunchTrader}
              />
            )}
            {activeTab === 'profile' && <TraderProfile />}
            {activeTab === 'support' && <TraderSupport />}
          </div>
        )}

        {/* ADMIN RISK & OPERATIONS CONSOLE */}
        {currentView === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'overview' && <AdminOverview onNavigate={(tab) => setActiveTab(tab)} />}
            {activeTab === 'users' && <AdminUsers />}
            {activeTab === 'accounts' && <AdminAccounts />}
            {activeTab === 'rules' && <AdminRules />}
            {activeTab === 'rewards' && <AdminRewards />}
            {activeTab === 'orders' && <AdminOrders />}
            {activeTab === 'coupons' && <AdminCoupons />}
            {activeTab === 'affiliates' && <AdminAffiliates />}
            {activeTab === 'content' && <AdminContent />}
            {activeTab === 'audit' && <AdminAuditLogs />}
            {activeTab === 'analytics' && <AdminAnalytics />}
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
