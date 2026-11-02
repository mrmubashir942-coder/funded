import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, BookOpen, Plus, TrendingUp, TrendingDown, Check, Tag } from 'lucide-react';
import { TradeJournalEntry } from '../../types';

export const TraderJournal: React.FC = () => {
  const { journalEntries, addJournalEntry, activeAccount } = useApp();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [emotion, setEmotion] = useState<'DISCIPLINED' | 'FOMO' | 'PATIENT' | 'REVENGE'>('DISCIPLINED');
  const [pnl, setPnl] = useState<number>(0);
  const [tradesCount, setTradesCount] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !notes) return;

    addJournalEntry({
      accountId: activeAccount?.id || 'acc_01',
      date: new Date().toISOString().substring(0, 10),
      title,
      notes,
      emotion,
      pnl,
      tradesCount
    });

    setIsAddOpen(false);
    setTitle('');
    setNotes('');
    setPnl(0);
  };

  const totalJournalPnl = journalEntries.reduce((sum, j) => sum + j.pnl, 0);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Trade Journal & Daily Execution Log</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track your psychology, emotional discipline, and execution notes for {activeAccount?.accountNumber}.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#0B0F1A] rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Journal Log</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Logged Journal Entries</span>
          <div className="text-2xl font-extrabold text-white font-mono">{journalEntries.length} Sessions</div>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Cumulative Journaled P/L</span>
          <div
            className={`text-2xl font-extrabold font-mono tabular-nums ${
              totalJournalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {totalJournalPnl >= 0 ? '+' : ''}${totalJournalPnl.toLocaleString()}
          </div>
        </div>

        <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Discipline Rating</span>
          <div className="text-2xl font-extrabold text-[#D4AF37] font-mono">92 / 100 (Elite)</div>
        </div>
      </div>

      {/* Journal Cards List */}
      <div className="space-y-4">
        {journalEntries.map((entry) => (
          <div
            key={entry.id}
            className="bg-[#131A2A] border border-[#1F293D] hover:border-slate-600 rounded-2xl p-6 space-y-3 shadow-xl transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs text-slate-400 font-bold bg-[#0B0F1A] px-2.5 py-1 rounded border border-[#1F293D]">
                  {entry.date}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    entry.emotion === 'DISCIPLINED'
                      ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
                      : entry.emotion === 'PATIENT'
                      ? 'bg-blue-950/70 text-blue-300 border border-blue-800'
                      : 'bg-rose-950/70 text-rose-300 border border-rose-800'
                  }`}
                >
                  {entry.emotion}
                </span>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-slate-400">{entry.tradesCount} Trade(s)</span>
                <span
                  className={`font-bold tabular-nums text-sm ${
                    entry.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {entry.pnl >= 0 ? '+' : ''}${entry.pnl.toLocaleString()}
                </span>
              </div>
            </div>

            <h3 className="text-base font-bold text-white">{entry.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-[#0B0F1A] p-4 rounded-xl border border-[#1F293D]/60 font-mono">
              {entry.notes}
            </p>
          </div>
        ))}
      </div>

      {/* Add Journal Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <h2 className="text-base font-bold text-white">Log Trading Session Note</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Session Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Gold London breakout scalp"
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Mental State</label>
                  <select
                    value={emotion}
                    onChange={(e: any) => setEmotion(e.target.value)}
                    className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="DISCIPLINED">Disciplined</option>
                    <option value="PATIENT">Patient</option>
                    <option value="FOMO">FOMO / Chasing</option>
                    <option value="REVENGE">Revenge / Tilted</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Session P/L ($)</label>
                  <input
                    type="number"
                    step="10"
                    value={pnl}
                    onChange={(e) => setPnl(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Notes & Lessons</label>
                <textarea
                  rows={4}
                  required
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="What was the setup catalyst? Did you follow risk parameters?"
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 bg-[#1F293D] text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] rounded-xl text-xs font-bold transition-colors"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
