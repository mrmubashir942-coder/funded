import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      <div className="space-y-2 border-b border-[#1F293D] pb-6">
        <div className="text-xs font-bold text-[#D4AF37] uppercase font-mono">Legal & Compliance</div>
        <h1 className="text-3xl font-extrabold text-white">Terms of Evaluation & Service</h1>
        <p className="text-xs text-slate-400 font-mono">Last Updated: October 2026 · Ryvexia Funding AG (CHE-284.192.831)</p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Nature of the Services & Simulated Environment</h2>
          <p>
            RYVEXIA FUNDING AG ("Ryvexia", "we", "us") provides simulated evaluation challenges for prospective traders. All customer accounts are provisioned with virtual fictitious balances. Under no circumstances do clients execute live trades with real financial counterparties, nor does Ryvexia accept customer deposits or act as a financial custodian, broker-dealer, or investment advisor.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Evaluation Milestones & Rule Invariants</h2>
          <p>
            Traders agree to abide by the programmatic rules of their chosen challenge tier, including Maximum Daily Loss (5% High Water Mark), Maximum Overall Loss (static 10% or 12%), and Minimum Trading Days. Any programmatic rule breach logged by the automated risk engine results in immediate account disqualification.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Performance Rewards & Profit Splits</h2>
          <p>
            Traders who pass evaluation milestones and enter the Master Funded stage are eligible for discretionary performance rewards calculated as 80% to 90% of net simulated trading gains. Simulated reward disbursements are governed by verification of identity (KYC) and confirmation of trading consistency.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Prohibited Trading Practices</h2>
          <p>
            The following practices are strictly prohibited and will void all accounts and eligibility: latency arbitrage, high-frequency quote sniffing, account-sharing or commercial passing services, and reverse hedging across multiple accounts.
          </p>
        </section>
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      <div className="space-y-2 border-b border-[#1F293D] pb-6">
        <div className="text-xs font-bold text-[#D4AF37] uppercase font-mono">Privacy Governance</div>
        <h1 className="text-3xl font-extrabold text-white">Privacy & Data Protection Policy</h1>
        <p className="text-xs text-slate-400 font-mono">GDPR & Swiss FADP Compliant · Last Updated: October 2026</p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Information We Collect</h2>
          <p>
            We collect personal identification data necessary for account provisioning and compliance, including: full name, email address, country of residence, and KYC verification documents (government photo ID, proof of address) upon qualifying for funded simulation rewards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Data Security & Storage</h2>
          <p>
            All user records, trading session data, and cryptographic authentication tokens are stored using enterprise encryption at rest (AES-256) and TLS 1.3 in transit. We do not sell or monetize client data to marketing third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Your Data Rights</h2>
          <p>
            Under Swiss FADP and European GDPR regulations, you maintain the right to access, export, or request permanent deletion of your personal records, subject to statutory fraud prevention retention periods.
          </p>
        </section>
      </div>
    </div>
  );
};

export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      <div className="space-y-2 border-b border-[#1F293D] pb-6">
        <div className="text-xs font-bold text-[#D4AF37] uppercase font-mono">Billing & Protection</div>
        <h1 className="text-3xl font-extrabold text-white">Evaluation Fee & Refund Policy</h1>
        <p className="text-xs text-slate-400 font-mono">Transparent Reimbursement Standards · Last Updated: October 2026</p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. 100% Evaluation Fee Refund Upon First Payout</h2>
          <p>
            When a trader successfully completes their evaluation program (Phase 1 and Phase 2) and requests their first simulated profit reward on their Master Funded account, <strong>100% of their initial registration fee is refunded</strong> back to their original payment method alongside their trading reward.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Pre-Trading Cancellation Window</h2>
          <p>
            Traders may request a full refund within 14 calendar days of challenge enrollment, provided that <strong>zero simulated orders</strong> have been executed on the credentials. Once trading activity has commenced, evaluation fees are non-refundable due to server allocation and liquidity bridge provisioning costs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Chargebacks and Fraud Prevention</h2>
          <p>
            Filing unwarranted chargebacks for accounts that have breached risk rules violates our Terms of Service and will result in permanent blacklisting from the Ryvexia partner network and associated proprietary trading registries.
          </p>
        </section>
      </div>
    </div>
  );
};

export const RiskDisclosurePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      <div className="space-y-2 border-b border-[#1F293D] pb-6">
        <div className="text-xs font-bold text-[#D4AF37] uppercase font-mono">Statutory Risk Statement</div>
        <h1 className="text-3xl font-extrabold text-white">Risk Disclosure & Regulatory Notice</h1>
        <p className="text-xs text-slate-400 font-mono">Mandatory Disclosure Under Financial Market Standards · October 2026</p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Simulated Trading Environment Notice</h2>
          <p>
            All products, services, and accounts offered by RYVEXIA FUNDING are strictly educational and conducted within a simulated demo trading environment using fictitious balances. RYVEXIA FUNDING does not operate as an investment firm, broker, or custodian of customer capital.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Inherent Limitations of Hypothetical Performance</h2>
          <p>
            Hypothetical or simulated performance results have inherent limitations. Unlike real-market performance records, simulated trades do not represent actual trading risk, market execution liquidity deficits, or broker insolvency risk. Past simulated performance in an evaluation challenge is not an indicator of future trading results.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Geographic & Regulatory Restrictions</h2>
          <p>
            The services offered on this platform are not directed at, nor intended for distribution to, residents of jurisdictions where proprietary simulated evaluation services contravene local financial legislation.
          </p>
        </section>
      </div>
    </div>
  );
};
