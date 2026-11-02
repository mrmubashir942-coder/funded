export interface MarketNewsItem {
  id: string;
  headline: string;
  summary: string;
  category: 'Forex' | 'Commodities' | 'Indices' | 'Crypto' | 'Central Banks';
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  symbols: string[];
  source: string;
  timestamp: string;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}

export const INITIAL_MARKET_NEWS: MarketNewsItem[] = [
  {
    id: 'news_101',
    headline: 'Spot Gold touches $2,745 as central bank accumulation offsets strong USD yields',
    summary: 'Institutional desks report sustained sovereign demand for bullion, with safe-haven hedging pushing XAUUSD toward all-time resistance levels despite resilient Treasury benchmarks.',
    category: 'Commodities',
    impact: 'HIGH',
    symbols: ['XAUUSD'],
    source: 'Ryvexia Institutional Wire',
    timestamp: '2m ago',
    sentiment: 'BULLISH'
  },
  {
    id: 'news_102',
    headline: 'FOMC Minutes highlight neutral rate debate; Fed officials favor measured 25bps recalibration',
    summary: 'Federal Open Market Committee policy participants reiterated confidence in inflation glidepath while signaling caution against rapid easing amid tight employment data.',
    category: 'Central Banks',
    impact: 'HIGH',
    symbols: ['EURUSD', 'GBPUSD', 'US30'],
    source: 'Federal Reserve Bulletin',
    timestamp: '7m ago',
    sentiment: 'NEUTRAL'
  },
  {
    id: 'news_103',
    headline: 'Bitcoin tests $91,500 liquidity band following $820M spot ETF net inflows',
    summary: 'Institutional custody wallets observed massive institutional accumulation into US spot ETFs, compressing crypto exchange reserves to multi-year lows.',
    category: 'Crypto',
    impact: 'HIGH',
    symbols: ['BTCUSD'],
    source: 'Bloomberg Crypto Pulse',
    timestamp: '14m ago',
    sentiment: 'BULLISH'
  },
  {
    id: 'news_104',
    headline: 'Eurozone preliminary CPI moderates to 2.1%; ECB rate cut probability reaches 88%',
    summary: 'Core services inflation eased across Germany and France, cementing expectations for European Central Bank deposit facility reduction at the upcoming meeting.',
    category: 'Forex',
    impact: 'MEDIUM',
    symbols: ['EURUSD'],
    source: 'Reuters FX Desk',
    timestamp: '22m ago',
    sentiment: 'BEARISH'
  },
  {
    id: 'news_105',
    headline: 'US Tech 100 futures steady near 20,900 ahead of semiconductor earnings cycle',
    summary: 'Wall Street equity index futures trade in tight ranges as quantitative funds balance high-beta tech exposure with defensive utility allocations.',
    category: 'Indices',
    impact: 'MEDIUM',
    symbols: ['NAS100', 'US30'],
    source: 'Ryvexia Equity Flow',
    timestamp: '35m ago',
    sentiment: 'BULLISH'
  },
  {
    id: 'news_106',
    headline: 'Bank of England Governor Bailey signals persistence in UK service sector wage pressure',
    summary: 'Sterling holds support near 1.2930 as Monetary Policy Committee signals gradual pace of rate reductions compared to continental counterparts.',
    category: 'Forex',
    impact: 'MEDIUM',
    symbols: ['GBPUSD'],
    source: 'Financial Times FX',
    timestamp: '48m ago',
    sentiment: 'BULLISH'
  },
  {
    id: 'news_107',
    headline: 'WTI Crude tests $71 support as Middle East shipping corridors normalize',
    summary: 'Energy futures encounter institutional supply after commercial inventory data indicated higher than projected crude stockpiles in Cushing, Oklahoma.',
    category: 'Commodities',
    impact: 'LOW',
    symbols: ['XAUUSD'],
    source: 'Platts Energy Wire',
    timestamp: '1h ago',
    sentiment: 'BEARISH'
  },
  {
    id: 'news_108',
    headline: 'US 10-Year Treasury Yields consolidate around 4.22% following auction results',
    summary: 'Foreign direct bidding for US 10-year paper exceeded dealer averages, dampening volatility across major currency pairs heading into London market close.',
    category: 'Central Banks',
    impact: 'LOW',
    symbols: ['EURUSD', 'US30'],
    source: 'Treasury Direct Feed',
    timestamp: '1h 15m ago',
    sentiment: 'NEUTRAL'
  }
];

export const BREAKING_NEWS_POOL: MarketNewsItem[] = [
  {
    id: 'news_break_201',
    headline: 'BREAKING: US Non-Farm Payrolls revise +192K vs +175K expected; Unemployment steady at 4.1%',
    summary: 'US labor market metrics exceed consensus estimates, sparking immediate volatility across Gold and FX majors.',
    category: 'Central Banks',
    impact: 'HIGH',
    symbols: ['XAUUSD', 'EURUSD', 'US30'],
    source: 'Bureau of Labor Statistics',
    timestamp: 'Just now',
    sentiment: 'BULLISH'
  },
  {
    id: 'news_break_202',
    headline: 'ECB President Lagarde: Growth outlook tilted downward; inflation risks balanced',
    summary: 'European Central Bank signals readiness to deploy further accommodative policy levers if regional manufacturing contracts further.',
    category: 'Central Banks',
    impact: 'HIGH',
    symbols: ['EURUSD'],
    source: 'ECB Press Briefing',
    timestamp: 'Just now',
    sentiment: 'BEARISH'
  },
  {
    id: 'news_break_203',
    headline: 'Gold spikes +$12.50 to $2,752.40 on heavy CME institutional futures volume',
    summary: 'Algorithmic breakout triggers triggered cascade buy stops above 2,748 level as bullion resumes upward channel.',
    category: 'Commodities',
    impact: 'HIGH',
    symbols: ['XAUUSD'],
    source: 'CME Group Flow',
    timestamp: 'Just now',
    sentiment: 'BULLISH'
  },
  {
    id: 'news_break_204',
    headline: 'Dow Jones Index surges +220 pts as industrial conglomerates report margin expansion',
    summary: 'Heavyweight blue chip earnings beat street expectations, driving US30 cash session toward session highs.',
    category: 'Indices',
    impact: 'MEDIUM',
    symbols: ['US30'],
    source: 'Wall Street Tape',
    timestamp: 'Just now',
    sentiment: 'BULLISH'
  }
];

// Mock API client simulating async latency and live data polling
export const fetchMarketNewsApi = async (): Promise<MarketNewsItem[]> => {
  // Simulate network roundtrip latency
  await new Promise((resolve) => setTimeout(resolve, 320));
  return [...INITIAL_MARKET_NEWS];
};

export const fetchBreakingAlertApi = async (index: number): Promise<MarketNewsItem> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return BREAKING_NEWS_POOL[index % BREAKING_NEWS_POOL.length];
};
