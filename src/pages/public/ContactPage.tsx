import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { createSupportTicket } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'Evaluation Rules' | 'Account Credentials' | 'Simulated Payout' | 'General'>('Evaluation Rules');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    createSupportTicket(subject, category, 'MEDIUM', message);
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
          Trader Inquiries & Institutional Desk
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Contact Support Desk
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Our risk officers and support engineers are available 24 hours a day during global market trading hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 sm:p-8 shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Inquiry Dispatched</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Your ticket has been logged into the support queue. Our desk typically responds within 30 minutes. You can also monitor active tickets in the Trader Hub.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2 bg-[#1F293D] hover:bg-[#2A374F] text-slate-200 rounded-lg text-xs font-semibold transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-2">Send a Direct Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Mercer"
                    className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="trader@domain.com"
                    className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Evaluation Rules">Evaluation Rules</option>
                    <option value="Account Credentials">Account Credentials</option>
                    <option value="Simulated Payout">Simulated Payout</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Inquiry regarding drawdown or payout"
                    className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your question or account details..."
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A] font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Global Locations & Fast Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white">Global Desks</h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-white">Zurich Headquarters</div>
                  <div className="text-slate-400 mt-0.5">Paradeplatz 8, 8001 Zürich, Switzerland</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-white">Dubai Hub (DIFC)</div>
                  <div className="text-slate-400 mt-0.5">Gate Precinct 4, Level 5, Dubai, UAE</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-white">Singapore Trading Bridge</div>
                  <div className="text-slate-400 mt-0.5">Marina Bay Financial Centre, Tower 2, Singapore</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-6 space-y-3 text-xs text-slate-300">
            <h2 className="text-sm font-bold text-white">Direct Contacts</h2>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center justify-between">
                <span>Support Desk:</span>
                <span className="font-mono text-white">support@ryvexia.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Compliance & KYC:</span>
                <span className="font-mono text-white">compliance@ryvexia.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Institutional Affiliates:</span>
                <span className="font-mono text-white">partners@ryvexia.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
