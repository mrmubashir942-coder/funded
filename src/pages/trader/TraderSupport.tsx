import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Plus,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { SupportTicket } from '../../types';

export const TraderSupport: React.FC = () => {
  const { tickets, createSupportTicket, replySupportTicket } = useApp();

  const [selectedTicketId, setSelectedTicketId] = useState<string>(tickets[0]?.id || '');
  const [replyText, setReplyText] = useState('');
  const [isNewTicketModal, setIsNewTicketModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState<'Evaluation Rules' | 'Account Credentials' | 'Simulated Payout' | 'Terminal Bug' | 'General'>('Evaluation Rules');
  const [newPriority, setNewPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [newInitialMsg, setNewInitialMsg] = useState('');

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0] || null;

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText || !selectedTicket) return;
    replySupportTicket(selectedTicket.id, replyText);
    setReplyText('');
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject || !newInitialMsg) return;
    createSupportTicket(newSubject, newCategory, newPriority, newInitialMsg);
    setIsNewTicketModal(false);
    setNewSubject('');
    setNewInitialMsg('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Support & Risk Desk</h1>
          <p className="text-xs text-slate-400 mt-1">
            24/5 direct communication with Ryvexia compliance, technical and payout desks.
          </p>
        </div>

        <button
          onClick={() => setIsNewTicketModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Support Ticket</span>
        </button>
      </div>

      {/* Main Support Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[580px]">
        {/* Ticket List (4 cols) */}
        <div className="lg:col-span-5 bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden flex flex-col shadow-xl">
          <div className="p-4 bg-[#172033] border-b border-[#1F293D] flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Your Tickets</span>
            <span className="text-xs text-slate-400 font-mono">{tickets.length} Total</span>
          </div>

          <div className="overflow-y-auto divide-y divide-[#1F293D] flex-1">
            {tickets.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">No active tickets</div>
            ) : (
              tickets.map((t) => {
                const isSelected = selectedTicket?.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTicketId(t.id)}
                    className={`w-full p-4 text-left transition-colors ${
                      isSelected ? 'bg-[#1F293D] border-l-2 border-[#D4AF37]' : 'hover:bg-[#182132]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold font-mono text-[#D4AF37]">#{t.id}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          t.status === 'RESOLVED'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                            : 'bg-blue-950/60 text-blue-300 border border-blue-800'
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-white truncate">{t.subject}</div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                      <span className="bg-[#0B0F1A] px-2 py-0.5 rounded border border-[#1F293D]">
                        {t.category}
                      </span>
                      <span className="font-mono">{t.createdAt.substring(0, 10)}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Conversation View (7 cols) */}
        <div className="lg:col-span-7 bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden flex flex-col shadow-xl">
          {selectedTicket ? (
            <>
              {/* Header */}
              <div className="p-4 bg-[#172033] border-b border-[#1F293D] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{selectedTicket.subject}</span>
                    <span className="text-xs text-slate-400 font-mono">({selectedTicket.category})</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                    Created: {selectedTicket.createdAt} · Priority: {selectedTicket.priority}
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    selectedTicket.status === 'RESOLVED'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                      : 'bg-blue-950/60 text-blue-300 border border-blue-800'
                  }`}
                >
                  {selectedTicket.status}
                </span>
              </div>

              {/* Messages Thread */}
              <div className="p-5 overflow-y-auto space-y-4 flex-1 bg-[#0D121F]">
                {selectedTicket.messages.map((m) => {
                  const isUser = m.sender === 'user';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[11px] text-slate-400 mb-1 flex items-center gap-2">
                        <span className="font-semibold text-slate-300">{m.senderName}</span>
                        <span className="font-mono text-[10px]">{m.time}</span>
                      </div>
                      <div
                        className={`p-3.5 rounded-2xl max-w-md text-xs leading-relaxed ${
                          isUser
                            ? 'bg-[#1F293D] text-slate-100 rounded-tr-none border border-[#2A374F]'
                            : 'bg-[#151D2E] text-slate-200 rounded-tl-none border border-[#D4AF37]/30'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Box */}
              <form onSubmit={handleSendReply} className="p-3 bg-[#131A2A] border-t border-[#1F293D] flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type reply to desk officer..."
                  className="flex-1 bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-slate-500 text-xs">
              Select a ticket to view discussion
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {isNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <h2 className="text-base font-bold text-white">Open New Inquiry Ticket</h2>

            <form onSubmit={handleCreateNew} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Inquiry Subject
                </label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Drawdown calculation inquiry on account RX-88429"
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Evaluation Rules">Evaluation Rules</option>
                    <option value="Account Credentials">Account Credentials</option>
                    <option value="Simulated Payout">Simulated Payout</option>
                    <option value="Terminal Bug">Terminal Bug</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e: any) => setNewPriority(e.target.value)}
                    className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">Urgent / Risk Issue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={newInitialMsg}
                  onChange={(e) => setNewInitialMsg(e.target.value)}
                  placeholder="Provide comprehensive details..."
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewTicketModal(false)}
                  className="px-4 py-2 bg-[#1F293D] text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] rounded-xl text-xs font-bold transition-colors"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
