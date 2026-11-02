import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Sliders,
  X,
  Check,
  ChevronRight,
  Download,
  AlertCircle,
  Play
} from 'lucide-react';
import { TradeOrder } from '../../types';

export const WebTrader: React.FC = () => {
  const {
    activeAccount,
    marketQuotes,
    orders,
    placeOrder,
    closeOrder,
    modifyOrder,
    cancelPendingOrder,
    activeSymbol,
    setActiveSymbol
  } = useApp();

  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [executionMode, setExecutionMode] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [lots, setLots] = useState<number>(1.0);
  const [sl, setSl] = useState<string>('');
  const [tp, setTp] = useState<string>('');
  const [limitPrice, setLimitPrice] = useState<string>('');
  const [chartMode, setChartMode] = useState<'candles' | 'line'>('candles');
  const [timeframe, setTimeframe] = useState<'M5' | 'M15' | 'H1' | 'D1'>('M15');
  const [activeBottomTab, setActiveBottomTab] = useState<'positions' | 'pending' | 'history'>('positions');
  const [selectedModifyOrder, setSelectedModifyOrder] = useState<TradeOrder | null>(null);
  const [modifySl, setModifySl] = useState<string>('');
  const [modifyTp, setModifyTp] = useState<string>('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const currentQuote = marketQuotes.find((q) => q.symbol === activeSymbol) || marketQuotes[2]; // XAUUSD default

  // Calculate margin required (1:100 leverage assumed)
  const leverage = 100;
  const marginRequired = useMemo(() => {
    if (!currentQuote) return 0;
    if (activeSymbol === 'EURUSD' || activeSymbol === 'GBPUSD') {
      return (lots * 100000) / leverage;
    } else if (activeSymbol === 'XAUUSD') {
      return (lots * 100 * currentQuote.ask) / leverage;
    } else if (activeSymbol === 'BTCUSD') {
      return (lots * currentQuote.ask) / 20; // 1:20 on crypto
    } else {
      return (lots * currentQuote.ask) / leverage;
    }
  }, [activeSymbol, lots, currentQuote]);

  // Pip value estimate
  const pipValue = useMemo(() => {
    if (activeSymbol === 'EURUSD' || activeSymbol === 'GBPUSD') {
      return lots * 10;
    } else if (activeSymbol === 'XAUUSD') {
      return lots * 10;
    } else {
      return lots * 1;
    }
  }, [activeSymbol, lots]);

  // Synthetic deterministic candlestick generator based on quote & timeframe
  const candles = useMemo(() => {
    const base = currentQuote.bid;
    const numCandles = 28;
    const items = [];
    let currentOpen = base * 0.993;

    for (let i = 0; i < numCandles; i++) {
      const volatility = currentQuote.pipSize * (activeSymbol === 'BTCUSD' ? 120 : activeSymbol === 'XAUUSD' ? 3.5 : 0.0012);
      const isUp = (i * 7 + Math.floor(base * 10)) % 2 === 0;
      const change = (Math.sin(i * 0.6) * 0.7 + (isUp ? 0.6 : -0.5)) * volatility;
      const close = currentOpen + change;
      const high = Math.max(currentOpen, close) + Math.abs(change) * 0.6;
      const low = Math.min(currentOpen, close) - Math.abs(change) * 0.6;

      items.push({
        index: i,
        open: currentOpen,
        high,
        low,
        close,
        isUp: close >= currentOpen
      });
      currentOpen = close;
    }

    // Force the last candle close to match currentQuote.bid
    if (items.length > 0) {
      const last = items[items.length - 1];
      last.close = currentQuote.bid;
      last.high = Math.max(last.high, currentQuote.bid);
      last.low = Math.min(last.low, currentQuote.bid);
      last.isUp = last.close >= last.open;
    }

    return items;
  }, [currentQuote.bid, currentQuote.pipSize, activeSymbol, timeframe]);

  // Chart min and max
  const chartMin = Math.min(...candles.map((c) => c.low));
  const chartMax = Math.max(...candles.map((c) => c.high));
  const chartRange = chartMax - chartMin || 1;

  // Account orders
  const accountOrders = orders.filter((o) => o.accountId === activeAccount?.id);
  const openPositions = accountOrders.filter((o) => o.status === 'OPEN');
  const pendingOrders = accountOrders.filter((o) => o.status === 'PENDING');
  const closedHistory = accountOrders.filter((o) => o.status === 'CLOSED');

  // Handle Trade Execution
  const handleExecuteTrade = () => {
    if (!activeAccount) return;

    const res = placeOrder({
      symbol: activeSymbol,
      type: orderType,
      lots,
      sl: sl ? parseFloat(sl) : undefined,
      tp: tp ? parseFloat(tp) : undefined,
      isLimit: executionMode === 'LIMIT',
      limitPrice: limitPrice ? parseFloat(limitPrice) : undefined
    });

    setFeedbackMsg({ text: res.message, error: !res.success });
    setTimeout(() => setFeedbackMsg(null), 3000);

    if (res.success) {
      setSl('');
      setTp('');
      setLimitPrice('');
    }
  };

  const handleOpenModify = (ord: TradeOrder) => {
    setSelectedModifyOrder(ord);
    setModifySl(ord.sl ? ord.sl.toString() : '');
    setModifyTp(ord.tp ? ord.tp.toString() : '');
  };

  const handleSaveModify = () => {
    if (!selectedModifyOrder) return;
    modifyOrder(
      selectedModifyOrder.id,
      modifySl ? parseFloat(modifySl) : undefined,
      modifyTp ? parseFloat(modifyTp) : undefined
    );
    setSelectedModifyOrder(null);
  };

  const exportHistoryCsv = () => {
    const headers = ['Order ID,Symbol,Type,Lots,Open Price,Close Price,PnL,Open Time,Close Time\n'];
    const rows = closedHistory.map(
      (o) =>
        `${o.id},${o.symbol},${o.type},${o.lots},${o.openPrice},${o.closePrice || o.currentPrice},${o.pnl},${o.openTime},${o.closeTime || ''}`
    );
    const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ryvexia_Trade_History_${activeAccount?.accountNumber || 'Demo'}.csv`;
    a.click();
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Top Ticker Bar & Account Summary Strip */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-4">
          <span className="text-slate-400">Account:</span>
          <span className="font-bold text-white">{activeAccount?.accountNumber}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Balance:</span>
          <span className="font-bold text-white tabular-nums">${activeAccount?.balance.toLocaleString()}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Equity:</span>
          <span className="font-bold text-[#D4AF37] tabular-nums">${activeAccount?.equity.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-400">Daily Buffer Left:</span>
          <span className="text-emerald-400 font-bold tabular-nums">
            ${Math.max(0, (activeAccount?.dailyLossLimitAmount || 5000) - ((activeAccount?.startOfDayBalance || 100000) - (activeAccount?.equity || 100000))).toFixed(2)}
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Status:</span>
          <span className="font-bold text-emerald-400 uppercase">{activeAccount?.status}</span>
        </div>
      </div>

      {/* Main Terminal Grid: Market Watch (Left) + Central Chart (Center) + Order Entry (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 1. Market Watch Symbols List (2 Cols) */}
        <div className="lg:col-span-3 bg-[#131A2A] border border-[#1F293D] rounded-xl overflow-hidden flex flex-col h-[520px]">
          <div className="p-3 bg-[#172033] border-b border-[#1F293D] flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Market Watch</span>
            <span className="text-[10px] text-slate-400 font-mono">Spread (pips)</span>
          </div>

          <div className="overflow-y-auto divide-y divide-[#1F293D]/60 flex-1">
            {marketQuotes.map((q) => {
              const isSelected = activeSymbol === q.symbol;
              const spread = Math.round((q.ask - q.bid) / q.pipSize * 10) / 10;
              return (
                <button
                  key={q.symbol}
                  onClick={() => setActiveSymbol(q.symbol)}
                  className={`w-full p-3 text-left transition-colors flex items-center justify-between ${
                    isSelected ? 'bg-[#1F293D] border-l-2 border-[#D4AF37]' : 'hover:bg-[#182132]'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs text-white font-mono flex items-center gap-1.5">
                      {q.symbol}
                      <span className="text-[10px] font-normal text-slate-400 truncate max-w-[80px]">
                        {q.name}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                      Spr: <span className="text-[#D4AF37]">{spread.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-xs font-bold text-white tabular-nums">
                      {q.bid.toFixed(q.digits)}
                    </div>
                    <div
                      className={`text-[10px] flex items-center justify-end gap-0.5 ${
                        q.change >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {q.change >= 0 ? '+' : ''}
                      {q.changePct.toFixed(2)}%
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Chart (6 Cols) */}
        <div className="lg:col-span-6 bg-[#131A2A] border border-[#1F293D] rounded-xl overflow-hidden flex flex-col h-[520px]">
          {/* Chart Header Bar */}
          <div className="p-3 bg-[#172033] border-b border-[#1F293D] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-white font-mono text-sm">{activeSymbol}</span>
              <span className="text-slate-400 font-mono text-[11px]">{currentQuote.name}</span>
              <span className="text-emerald-400 font-mono font-bold">
                {currentQuote.bid.toFixed(currentQuote.digits)}
              </span>
            </div>

            {/* Timeframe & Mode Controls */}
            <div className="flex items-center gap-2">
              <div className="flex bg-[#0B0F1A] rounded p-0.5 border border-[#1F293D] text-[11px]">
                {(['M5', 'M15', 'H1', 'D1'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      timeframe === tf ? 'bg-[#1F293D] text-[#D4AF37] font-bold' : 'text-slate-400'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              <div className="flex bg-[#0B0F1A] rounded p-0.5 border border-[#1F293D] text-[11px]">
                <button
                  onClick={() => setChartMode('candles')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    chartMode === 'candles' ? 'bg-[#1F293D] text-[#D4AF37] font-bold' : 'text-slate-400'
                  }`}
                >
                  Candles
                </button>
                <button
                  onClick={() => setChartMode('line')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    chartMode === 'line' ? 'bg-[#1F293D] text-[#D4AF37] font-bold' : 'text-slate-400'
                  }`}
                >
                  Line
                </button>
              </div>
            </div>
          </div>

          {/* SVG Canvas Rendering Area */}
          <div className="relative flex-1 bg-[#090D17] p-4 flex flex-col justify-between select-none">
            {/* Grid Lines */}
            <div className="absolute inset-0 grid grid-rows-5 grid-cols-6 pointer-events-none opacity-10">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="border border-slate-400" />
              ))}
            </div>

            {/* Price Scale Indicators */}
            <div className="absolute right-2 top-4 bottom-4 flex flex-col justify-between text-[10px] font-mono text-slate-500 pointer-events-none">
              <span>{chartMax.toFixed(currentQuote.digits)}</span>
              <span>{(chartMin + chartRange * 0.75).toFixed(currentQuote.digits)}</span>
              <span>{(chartMin + chartRange * 0.5).toFixed(currentQuote.digits)}</span>
              <span>{(chartMin + chartRange * 0.25).toFixed(currentQuote.digits)}</span>
              <span>{chartMin.toFixed(currentQuote.digits)}</span>
            </div>

            {/* SVG Chart */}
            <div className="w-full h-full relative pr-16">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 400">
                {chartMode === 'candles' ? (
                  candles.map((c, i) => {
                    const x = 20 + i * 34;
                    const candleWidth = 18;
                    const yHigh = 400 - ((c.high - chartMin) / chartRange) * 360 - 20;
                    const yLow = 400 - ((c.low - chartMin) / chartRange) * 360 - 20;
                    const yOpen = 400 - ((c.open - chartMin) / chartRange) * 360 - 20;
                    const yClose = 400 - ((c.close - chartMin) / chartRange) * 360 - 20;
                    const rectY = Math.min(yOpen, yClose);
                    const rectHeight = Math.max(2, Math.abs(yClose - yOpen));
                    const color = c.isUp ? '#10B981' : '#F43F5E';

                    return (
                      <g key={i}>
                        {/* Wick */}
                        <line
                          x1={x + candleWidth / 2}
                          y1={yHigh}
                          x2={x + candleWidth / 2}
                          y2={yLow}
                          stroke={color}
                          strokeWidth="1.5"
                        />
                        {/* Body */}
                        <rect
                          x={x}
                          y={rectY}
                          width={candleWidth}
                          height={rectHeight}
                          fill={color}
                          rx="1.5"
                        />
                      </g>
                    );
                  })
                ) : (
                  /* Line Mode */
                  <polyline
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2.5"
                    points={candles
                      .map((c, i) => {
                        const x = 20 + i * 34 + 9;
                        const y = 400 - ((c.close - chartMin) / chartRange) * 360 - 20;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />
                )}

                {/* Current Price Line */}
                <line
                  x1="0"
                  y1={400 - ((currentQuote.bid - chartMin) / chartRange) * 360 - 20}
                  x2="1000"
                  y2={400 - ((currentQuote.bid - chartMin) / chartRange) * 360 - 20}
                  stroke="#D4AF37"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 3. Order Entry Desk (3 Cols) */}
        <div className="lg:col-span-3 bg-[#131A2A] border border-[#1F293D] rounded-xl p-4 flex flex-col justify-between h-[520px] shadow-xl">
          <div className="space-y-4">
            {/* Mode: Market vs Limit */}
            <div className="flex bg-[#0B0F1A] p-1 rounded-xl border border-[#1F293D] text-xs">
              <button
                onClick={() => setExecutionMode('MARKET')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                  executionMode === 'MARKET'
                    ? 'bg-[#1F293D] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Market Order
              </button>
              <button
                onClick={() => setExecutionMode('LIMIT')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                  executionMode === 'LIMIT'
                    ? 'bg-[#1F293D] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Pending Limit
              </button>
            </div>

            {/* Buy / Sell Bid-Ask Selectors */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('SELL')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  orderType === 'SELL'
                    ? 'bg-rose-950/40 border-rose-600 text-white shadow-md'
                    : 'bg-[#0B0F1A] border-[#1F293D] text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="text-[10px] uppercase font-bold text-rose-400">Sell by Market</div>
                <div className="text-base font-extrabold font-mono text-white mt-0.5">
                  {currentQuote.bid.toFixed(currentQuote.digits)}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('BUY')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  orderType === 'BUY'
                    ? 'bg-emerald-950/40 border-emerald-600 text-white shadow-md'
                    : 'bg-[#0B0F1A] border-[#1F293D] text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="text-[10px] uppercase font-bold text-emerald-400">Buy by Market</div>
                <div className="text-base font-extrabold font-mono text-white mt-0.5">
                  {currentQuote.ask.toFixed(currentQuote.digits)}
                </div>
              </button>
            </div>

            {/* Lot Size Input & Quick Buttons */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
                <span>Lot Size / Volume</span>
                <span className="font-mono text-slate-300">Pip: ~${pipValue.toFixed(2)}</span>
              </div>
              <input
                type="number"
                step="0.01"
                min="0.01"
                max="50"
                value={lots}
                onChange={(e) => setLots(Math.max(0.01, parseFloat(e.target.value) || 0.01))}
                className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:border-[#D4AF37]"
              />

              <div className="grid grid-cols-4 gap-1.5 mt-2">
                {[0.1, 0.5, 1.0, 2.0].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setLots(preset)}
                    className="py-1 bg-[#0B0F1A] border border-[#1F293D] hover:border-slate-500 rounded text-[11px] font-mono text-slate-300"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Limit Price Input if Limit Mode */}
            {executionMode === 'LIMIT' && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Limit Entry Price
                </label>
                <input
                  type="number"
                  step={currentQuote.pipSize}
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  placeholder={currentQuote.bid.toFixed(currentQuote.digits)}
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            )}

            {/* SL / TP */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                  Stop Loss (Price)
                </label>
                <input
                  type="number"
                  step={currentQuote.pipSize}
                  value={sl}
                  onChange={(e) => setSl(e.target.value)}
                  placeholder="Optional"
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                  Take Profit (Price)
                </label>
                <input
                  type="number"
                  step={currentQuote.pipSize}
                  value={tp}
                  onChange={(e) => setTp(e.target.value)}
                  placeholder="Optional"
                  className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Margin Info */}
            <div className="bg-[#0B0F1A] border border-[#1F293D] rounded-xl p-2.5 text-[11px] text-slate-400 space-y-1 font-mono">
              <div className="flex justify-between">
                <span>Margin Required:</span>
                <span className="text-white font-bold">${marginRequired.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Execution:</span>
                <span className="text-[#D4AF37]">Simulated Instant</span>
              </div>
            </div>
          </div>

          {/* Feedback & Execute Button */}
          <div className="pt-3 space-y-2">
            {feedbackMsg && (
              <div
                className={`p-2 rounded-lg text-[11px] text-center font-medium ${
                  feedbackMsg.error ? 'bg-rose-950/60 text-rose-300' : 'bg-emerald-950/60 text-emerald-300'
                }`}
              >
                {feedbackMsg.text}
              </div>
            )}

            <button
              type="button"
              onClick={handleExecuteTrade}
              className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                orderType === 'BUY'
                  ? 'bg-emerald-600 hover:bg-emerald-500'
                  : 'bg-rose-600 hover:bg-rose-500'
              }`}
            >
              <span>
                {executionMode === 'MARKET' ? `Fill ${orderType} Market` : `Place ${orderType} Limit`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Panel: Open Positions / Pending / Trade History */}
      <div className="bg-[#131A2A] border border-[#1F293D] rounded-xl overflow-hidden shadow-xl">
        {/* Tab Headers */}
        <div className="px-4 py-3 bg-[#172033] border-b border-[#1F293D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveBottomTab('positions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeBottomTab === 'positions'
                  ? 'bg-[#1F293D] text-[#D4AF37] border border-[#D4AF37]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Open Positions ({openPositions.length})
            </button>
            <button
              onClick={() => setActiveBottomTab('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeBottomTab === 'pending'
                  ? 'bg-[#1F293D] text-[#D4AF37] border border-[#D4AF37]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pending Orders ({pendingOrders.length})
            </button>
            <button
              onClick={() => setActiveBottomTab('history')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeBottomTab === 'history'
                  ? 'bg-[#1F293D] text-[#D4AF37] border border-[#D4AF37]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Trade History ({closedHistory.length})
            </button>
          </div>

          {activeBottomTab === 'history' && closedHistory.length > 0 && (
            <button
              onClick={exportHistoryCsv}
              className="px-3 py-1 bg-[#1F293D] hover:bg-[#2A374F] text-slate-300 rounded text-xs font-medium transition-colors flex items-center gap-1.5 font-mono"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="overflow-x-auto">
          {activeBottomTab === 'positions' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1F293D] text-slate-400 bg-[#131A2A]">
                  <th className="py-3 px-4 font-semibold">Order ID</th>
                  <th className="py-3 px-4 font-semibold">Symbol</th>
                  <th className="py-3 px-4 font-semibold">Type</th>
                  <th className="py-3 px-4 font-semibold">Lots</th>
                  <th className="py-3 px-4 font-semibold">Open Price</th>
                  <th className="py-3 px-4 font-semibold">Current Price</th>
                  <th className="py-3 px-4 font-semibold">SL</th>
                  <th className="py-3 px-4 font-semibold">TP</th>
                  <th className="py-3 px-4 font-semibold">Floating P&L ($)</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F293D] text-slate-200">
                {openPositions.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-8 text-slate-500">
                      No open positions. Use the order ticket above to enter simulated positions.
                    </td>
                  </tr>
                ) : (
                  openPositions.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#1A2234] transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-400">{ord.id}</td>
                      <td className="py-3 px-4 font-mono font-bold text-white">{ord.symbol}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                            ord.type === 'BUY'
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                              : 'bg-rose-950/60 text-rose-400 border border-rose-800'
                          }`}
                        >
                          {ord.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono">{ord.lots.toFixed(2)}</td>
                      <td className="py-3 px-4 font-mono">{ord.openPrice.toFixed(2)}</td>
                      <td className="py-3 px-4 font-mono">{ord.currentPrice.toFixed(2)}</td>
                      <td className="py-3 px-4 font-mono text-slate-400">
                        {ord.sl ? ord.sl.toFixed(2) : '—'}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400">
                        {ord.tp ? ord.tp.toFixed(2) : '—'}
                      </td>
                      <td
                        className={`py-3 px-4 font-mono font-bold tabular-nums ${
                          ord.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {ord.pnl >= 0 ? '+' : ''}${ord.pnl.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenModify(ord)}
                          className="px-2.5 py-1 bg-[#1F293D] hover:bg-[#2A374F] text-slate-300 rounded text-xs transition-colors"
                        >
                          Modify
                        </button>
                        <button
                          onClick={() => closeOrder(ord.id)}
                          className="px-3 py-1 bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 rounded text-xs font-semibold transition-colors"
                        >
                          Close
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {activeBottomTab === 'pending' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1F293D] text-slate-400 bg-[#131A2A]">
                  <th className="py-3 px-4 font-semibold">Order ID</th>
                  <th className="py-3 px-4 font-semibold">Symbol</th>
                  <th className="py-3 px-4 font-semibold">Type</th>
                  <th className="py-3 px-4 font-semibold">Lots</th>
                  <th className="py-3 px-4 font-semibold">Limit Trigger Price</th>
                  <th className="py-3 px-4 font-semibold">Time</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F293D] text-slate-200">
                {pendingOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-500">
                      No pending limit orders.
                    </td>
                  </tr>
                ) : (
                  pendingOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#1A2234] transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-400">{ord.id}</td>
                      <td className="py-3 px-4 font-mono font-bold text-white">{ord.symbol}</td>
                      <td className="py-3 px-4 font-mono">{ord.type} LIMIT</td>
                      <td className="py-3 px-4 font-mono">{ord.lots.toFixed(2)}</td>
                      <td className="py-3 px-4 font-mono text-[#D4AF37] font-bold">
                        {ord.limitPrice?.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400">{ord.openTime}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => cancelPendingOrder(ord.id)}
                          className="px-3 py-1 bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 rounded text-xs font-semibold transition-colors"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {activeBottomTab === 'history' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1F293D] text-slate-400 bg-[#131A2A]">
                  <th className="py-3 px-4 font-semibold">Order ID</th>
                  <th className="py-3 px-4 font-semibold">Symbol</th>
                  <th className="py-3 px-4 font-semibold">Type</th>
                  <th className="py-3 px-4 font-semibold">Lots</th>
                  <th className="py-3 px-4 font-semibold">Open Price</th>
                  <th className="py-3 px-4 font-semibold">Close Price</th>
                  <th className="py-3 px-4 font-semibold">Realized P&L ($)</th>
                  <th className="py-3 px-4 font-semibold">Close Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F293D] text-slate-200">
                {closedHistory.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-slate-500">
                      No closed trade history yet.
                    </td>
                  </tr>
                ) : (
                  closedHistory.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#1A2234] transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-400">{ord.id}</td>
                      <td className="py-3 px-4 font-mono font-bold text-white">{ord.symbol}</td>
                      <td className="py-3 px-4 font-mono">{ord.type}</td>
                      <td className="py-3 px-4 font-mono">{ord.lots.toFixed(2)}</td>
                      <td className="py-3 px-4 font-mono">{ord.openPrice.toFixed(2)}</td>
                      <td className="py-3 px-4 font-mono">
                        {ord.closePrice ? ord.closePrice.toFixed(2) : ord.currentPrice.toFixed(2)}
                      </td>
                      <td
                        className={`py-3 px-4 font-mono font-bold tabular-nums ${
                          ord.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {ord.pnl >= 0 ? '+' : ''}${ord.pnl.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400">{ord.closeTime || 'N/A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modify SL/TP Modal */}
      {selectedModifyOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#1F293D]">
              <span className="text-sm font-bold text-white">
                Modify Order #{selectedModifyOrder.id} ({selectedModifyOrder.symbol})
              </span>
              <button
                onClick={() => setSelectedModifyOrder(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Stop Loss (Price)
              </label>
              <input
                type="number"
                step="0.01"
                value={modifySl}
                onChange={(e) => setModifySl(e.target.value)}
                placeholder="Leave blank for none"
                className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Take Profit (Price)
              </label>
              <input
                type="number"
                step="0.01"
                value={modifyTp}
                onChange={(e) => setModifyTp(e.target.value)}
                placeholder="Leave blank for none"
                className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedModifyOrder(null)}
                className="px-4 py-2 bg-[#1F293D] text-slate-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveModify}
                className="px-4 py-2 bg-[#D4AF37] text-[#0B0F1A] font-bold rounded-lg text-xs hover:bg-[#E5C158]"
              >
                Save Brackets
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
