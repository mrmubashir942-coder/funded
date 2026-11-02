import React, { useState, useEffect, useRef } from 'react';
import {
  MarketNewsItem,
  fetchMarketNewsApi,
  fetchBreakingAlertApi
} from '../services/marketNewsApi';
import {
  Radio,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Flame,
  TrendingUp,
  TrendingDown,
  Clock,
  ExternalLink,
  RefreshCw,
  Search,
  X,
  Layers
} from 'lucide-react';

interface MarketNewsTickerProps {
  onSelectSymbol?: (symbol: string) => void;
  activeSymbol?: string;
}

export const MarketNewsTicker: React.FC<MarketNewsTickerProps> = ({
  onSelectSymbol,
  activeSymbol
}) => {
  const [newsList, setNewsList] = useState<MarketNewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNewsDetail, setActiveNewsDetail] = useState<MarketNewsItem | null>(null);

  const breakingCounter = useRef(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Initial fetch from Mock API
  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    fetchMarketNewsApi().then((data) => {
      if (mounted) {
        setNewsList(data);
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  // Periodic breaking news injection from Mock API (every 24 seconds)
  useEffect(() => {
    const breakingInterval = setInterval(async () => {
      const newAlert = await fetchBreakingAlertApi(breakingCounter.current++);
      setNewsList((prev) => {
        // avoid duplicating same id
        if (prev.some((item) => item.id === newAlert.id)) return prev;
        return [newAlert, ...prev.slice(0, 11)];
      });
    }, 24000);

    return () => clearInterval(breakingInterval);
  }, []);

  // Auto-rotating ticker timer
  useEffect(() => {
    if (!isPlaying || newsList.length === 0) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsList.length);
    }, 5500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying, newsList.length]);

  const handlePrev = () => {
    if (newsList.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + newsList.length) % newsList.length);
  };

  const handleNext = () => {
    if (newsList.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % newsList.length);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    const data = await fetchMarketNewsApi();
    setNewsList(data);
    setCurrentIndex(0);
    setIsLoading(false);
  };

  const currentNews = newsList[currentIndex] || null;

  // Filtered news for drawer
  const filteredNews = newsList.filter((item) => {
    const matchesCategory =
      selectedCategory === 'ALL'
        ? true
        : selectedCategory === 'HIGH_IMPACT'
        ? item.impact === 'HIGH'
        : item.category.toUpperCase() === selectedCategory;

    const matchesSearch =
      item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symbols.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Rotating Ticker Bar */}
      <div
        className="bg-[#101625] border border-[#1F293D] rounded-xl px-3 py-2 flex items-center justify-between gap-3 shadow-md"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* Left: Market Wire Live Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-extrabold uppercase tracking-wider">
            <Radio className="w-3 h-3 text-[#D4AF37] animate-pulse" />
            <span>Market Wire</span>
          </div>

          <span className="hidden sm:inline-block text-[11px] font-mono text-slate-500 tabular-nums">
            {newsList.length > 0 ? `${currentIndex + 1}/${newsList.length}` : '—'}
          </span>
        </div>

        {/* Center: Rotating Headline & Meta */}
        <div className="flex-1 min-w-0 flex items-center gap-3 overflow-hidden">
          {isLoading ? (
            <div className="text-xs text-slate-400 font-mono animate-pulse flex items-center gap-2">
              <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
              <span>Streaming interbank news feed...</span>
            </div>
          ) : currentNews ? (
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Impact Badge */}
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider shrink-0 ${
                  currentNews.impact === 'HIGH'
                    ? 'bg-rose-950/70 text-rose-300 border border-rose-800'
                    : currentNews.impact === 'MEDIUM'
                    ? 'bg-amber-950/70 text-amber-300 border border-amber-800'
                    : 'bg-blue-950/60 text-blue-300 border border-blue-800'
                }`}
              >
                {currentNews.impact === 'HIGH' && '⚡ '}
                {currentNews.impact}
              </span>

              {/* Timestamp */}
              <span className="hidden md:inline-block text-[11px] font-mono text-slate-400 shrink-0">
                {currentNews.timestamp}
              </span>

              {/* Headline Text */}
              <button
                onClick={() => {
                  setActiveNewsDetail(currentNews);
                  setIsDrawerOpen(true);
                }}
                className="text-xs font-semibold text-white hover:text-[#D4AF37] transition-colors truncate text-left"
                title={currentNews.headline}
              >
                {currentNews.headline}
              </button>

              {/* Associated Symbol tags (clickable to immediately trade) */}
              <div className="hidden lg:flex items-center gap-1 shrink-0">
                {currentNews.symbols.map((sym) => (
                  <button
                    key={sym}
                    onClick={() => onSelectSymbol && onSelectSymbol(sym)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                      activeSymbol === sym
                        ? 'bg-[#D4AF37] text-[#0B0F1A]'
                        : 'bg-[#1F293D] text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                    title={`Switch chart & terminal to ${sym}`}
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500">No active news alerts.</div>
          )}
        </div>

        {/* Right: Controls & Drawer Trigger */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handlePrev}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-[#1F293D] transition-colors"
            title="Previous Headline"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-[#1F293D] transition-colors"
            title={isPlaying ? 'Pause Ticker' : 'Play Ticker'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>

          <button
            onClick={handleNext}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-[#1F293D] transition-colors"
            title="Next Headline"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-4 bg-[#1F293D] mx-1" />

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-2.5 py-1 bg-[#1F293D] hover:bg-[#2A374F] text-[#D4AF37] hover:text-white rounded text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Layers className="w-3 h-3" />
            <span className="hidden sm:inline">News Desk</span>
          </button>
        </div>
      </div>

      {/* Expanded News Desk Slide-over Modal / Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="px-6 py-4 bg-[#172033] border-b border-[#1F293D] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                    Ryvexia Institutional Market Wire
                  </h2>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Simulated Macro & FX Interbank Flow Feed
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="px-3 py-1.5 bg-[#0B0F1A] border border-[#1F293D] hover:border-slate-500 rounded-lg text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1F293D] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter Bar & Search */}
            <div className="px-6 py-3 bg-[#0E1422] border-b border-[#1F293D] flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Category Segmented Control */}
              <div className="flex flex-wrap items-center gap-1 text-xs">
                {[
                  { key: 'ALL', label: 'All Wire' },
                  { key: 'HIGH_IMPACT', label: '⚡ High Impact' },
                  { key: 'FOREX', label: 'Forex' },
                  { key: 'COMMODITIES', label: 'Gold & Metals' },
                  { key: 'CRYPTO', label: 'Crypto' },
                  { key: 'CENTRAL BANKS', label: 'Central Banks' }
                ].map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === cat.key
                        ? 'bg-[#1F293D] text-[#D4AF37] border border-[#D4AF37]/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search headlines or symbol..."
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* News Cards List */}
            <div className="p-6 overflow-y-auto space-y-3 flex-1 bg-[#090D17]">
              {filteredNews.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No headlines match the selected category or search filters.
                </div>
              ) : (
                filteredNews.map((news) => (
                  <div
                    key={news.id}
                    className="bg-[#131A2A] border border-[#1F293D] hover:border-slate-600 rounded-xl p-4 transition-all space-y-2.5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {/* Impact Tag */}
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            news.impact === 'HIGH'
                              ? 'bg-rose-950/70 text-rose-300 border border-rose-800'
                              : news.impact === 'MEDIUM'
                              ? 'bg-amber-950/70 text-amber-300 border border-amber-800'
                              : 'bg-blue-950/60 text-blue-300 border border-blue-800'
                          }`}
                        >
                          {news.impact === 'HIGH' && '⚡ '}
                          {news.impact} IMPACT
                        </span>

                        {/* Category */}
                        <span className="text-[10px] font-mono text-slate-400 bg-[#0B0F1A] px-2 py-0.5 rounded border border-[#1F293D]">
                          {news.category}
                        </span>

                        {/* Sentiment */}
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                            news.sentiment === 'BULLISH'
                              ? 'text-emerald-400 bg-emerald-950/50'
                              : news.sentiment === 'BEARISH'
                              ? 'text-rose-400 bg-rose-950/50'
                              : 'text-slate-400 bg-slate-900'
                          }`}
                        >
                          {news.sentiment}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                        <span>{news.source}</span>
                        <span>·</span>
                        <span>{news.timestamp}</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug">
                      {news.headline}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {news.summary}
                    </p>

                    <div className="pt-2 border-t border-[#1F293D]/60 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-500 font-mono">Affected Assets:</span>
                        {news.symbols.map((sym) => (
                          <button
                            key={sym}
                            onClick={() => {
                              if (onSelectSymbol) onSelectSymbol(sym);
                              setIsDrawerOpen(false);
                            }}
                            className="px-2 py-0.5 bg-[#0B0F1A] hover:bg-[#D4AF37] hover:text-[#0B0F1A] text-[#D4AF37] border border-[#D4AF37]/30 rounded text-[11px] font-mono font-bold transition-colors"
                          >
                            Trade {sym}
                          </button>
                        ))}
                      </div>

                      <span className="text-[10px] text-slate-500 italic">
                        Simulated Informational Wire
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-[#131A2A] border-t border-[#1F293D] flex items-center justify-between text-[11px] text-slate-400">
              <span>Showing {filteredNews.length} wire transmissions</span>
              <span>All news events simulated for educational challenge execution</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
