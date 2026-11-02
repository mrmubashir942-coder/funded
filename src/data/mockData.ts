import {
  TraderAccount,
  TradeOrder,
  MarketQuote,
  ChallengeTierConfig,
  RewardRequest,
  SupportTicket,
  AppNotification,
  User,
  CouponCode,
  AffiliateUser,
  BlogPost,
  TradeJournalEntry,
  LeaderboardTrader,
  AchievementBadge,
  LoyaltyAccount,
  AuditLogEntry,
  OrderHistoryItem
} from '../types';

export const DEFAULT_TRADER: User = {
  id: 'usr_trader_01',
  name: 'Alex Mercer',
  email: 'trader@ryvexia.com',
  role: 'trader',
  avatar: '/src/assets/images/avatar_trader_alex_1793599901320.jpg',
  kycStatus: 'VERIFIED',
  country: 'United Kingdom',
  joinedDate: '2026-04-12'
};

export const DEFAULT_ADMIN: User = {
  id: 'usr_admin_01',
  name: 'Elena Vance',
  email: 'admin@ryvexia.com',
  role: 'admin',
  avatar: '/src/assets/images/avatar_trader_elena_1793599900954.jpg',
  kycStatus: 'VERIFIED',
  country: 'Switzerland (HQ)',
  joinedDate: '2025-01-10'
};

export const INITIAL_MARKET_QUOTES: MarketQuote[] = [
  {
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    bid: 1.08452,
    ask: 1.08466,
    change: 0.00214,
    changePct: 0.20,
    high: 1.08610,
    low: 1.08190,
    digits: 5,
    pipSize: 0.0001
  },
  {
    symbol: 'GBPUSD',
    name: 'British Pound / US Dollar',
    bid: 1.29340,
    ask: 1.29358,
    change: -0.00180,
    changePct: -0.14,
    high: 1.29650,
    low: 1.29080,
    digits: 5,
    pipSize: 0.0001
  },
  {
    symbol: 'XAUUSD',
    name: 'Spot Gold / US Dollar',
    bid: 2742.80,
    ask: 2743.15,
    change: 14.30,
    changePct: 0.52,
    high: 2748.50,
    low: 2724.10,
    digits: 2,
    pipSize: 0.1
  },
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin / US Dollar',
    bid: 91420.00,
    ask: 91435.00,
    change: 1840.00,
    changePct: 2.05,
    high: 92100.00,
    low: 89300.00,
    digits: 2,
    pipSize: 1
  },
  {
    symbol: 'US30',
    name: 'Wall Street 30 Index',
    bid: 43840.00,
    ask: 43844.00,
    change: 125.00,
    changePct: 0.29,
    high: 43920.00,
    low: 43680.00,
    digits: 2,
    pipSize: 1
  },
  {
    symbol: 'NAS100',
    name: 'US Tech 100 Index',
    bid: 20885.50,
    ask: 20888.00,
    change: -45.20,
    changePct: -0.22,
    high: 21010.00,
    low: 20820.00,
    digits: 2,
    pipSize: 1
  }
];

export const INITIAL_CHALLENGE_TIERS: ChallengeTierConfig[] = [
  {
    id: 'tier_5k',
    size: 5000,
    label: '$5,000',
    fee: 49,
    twoStep: {
      phase1TargetPct: 8,
      phase2TargetPct: 5,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 5
    },
    twoStepAdvanced: {
      phase1TargetPct: 7,
      phase2TargetPct: 4,
      dailyLossPct: 4,
      maxDrawdownPct: 12,
      minTradingDays: 0
    },
    oneStep: {
      profitTargetPct: 10,
      dailyLossPct: 4,
      maxDrawdownPct: 8,
      minTradingDays: 3
    },
    threeStep: {
      phase1TargetPct: 6,
      phase2TargetPct: 6,
      phase3TargetPct: 5,
      dailyLossPct: 4,
      maxDrawdownPct: 12,
      minTradingDays: 3
    },
    instant: {
      dailyLossPct: 4,
      maxDrawdownPct: 6
    },
    starter: {
      profitTargetPct: 8,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 0
    },
    leverage: '1:100',
    profitSplit: 80
  },
  {
    id: 'tier_10k',
    size: 10000,
    label: '$10,000',
    fee: 89,
    twoStep: {
      phase1TargetPct: 8,
      phase2TargetPct: 5,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 5
    },
    twoStepAdvanced: {
      phase1TargetPct: 7,
      phase2TargetPct: 4,
      dailyLossPct: 4,
      maxDrawdownPct: 12,
      minTradingDays: 0
    },
    oneStep: {
      profitTargetPct: 10,
      dailyLossPct: 4,
      maxDrawdownPct: 8,
      minTradingDays: 3
    },
    threeStep: {
      phase1TargetPct: 6,
      phase2TargetPct: 6,
      phase3TargetPct: 5,
      dailyLossPct: 4,
      maxDrawdownPct: 12,
      minTradingDays: 3
    },
    instant: {
      dailyLossPct: 4,
      maxDrawdownPct: 6
    },
    starter: {
      profitTargetPct: 8,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 0
    },
    leverage: '1:100',
    profitSplit: 80
  },
  {
    id: 'tier_25k',
    size: 25000,
    label: '$25,000',
    fee: 179,
    twoStep: {
      phase1TargetPct: 8,
      phase2TargetPct: 5,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 5
    },
    twoStepAdvanced: {
      phase1TargetPct: 7,
      phase2TargetPct: 4,
      dailyLossPct: 4,
      maxDrawdownPct: 12,
      minTradingDays: 0
    },
    oneStep: {
      profitTargetPct: 10,
      dailyLossPct: 4,
      maxDrawdownPct: 8,
      minTradingDays: 3
    },
    threeStep: {
      phase1TargetPct: 6,
      phase2TargetPct: 6,
      phase3TargetPct: 5,
      dailyLossPct: 4,
      maxDrawdownPct: 12,
      minTradingDays: 3
    },
    instant: {
      dailyLossPct: 4,
      maxDrawdownPct: 6
    },
    starter: {
      profitTargetPct: 8,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 0
    },
    leverage: '1:100',
    profitSplit: 80
  },
  {
    id: 'tier_50k',
    size: 50000,
    label: '$50,000',
    fee: 289,
    twoStep: {
      phase1TargetPct: 8,
      phase2TargetPct: 5,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 5
    },
    twoStepAdvanced: {
      phase1TargetPct: 7,
      phase2TargetPct: 4,
      dailyLossPct: 4,
      maxDrawdownPct: 12,
      minTradingDays: 0
    },
    oneStep: {
      profitTargetPct: 10,
      dailyLossPct: 4,
      maxDrawdownPct: 8,
      minTradingDays: 3
    },
    threeStep: {
      phase1TargetPct: 6,
      phase2TargetPct: 6,
      phase3TargetPct: 5,
      dailyLossPct: 4,
      maxDrawdownPct: 12,
      minTradingDays: 3
    },
    instant: {
      dailyLossPct: 4,
      maxDrawdownPct: 6
    },
    starter: {
      profitTargetPct: 8,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 0
    },
    leverage: '1:100',
    profitSplit: 85
  },
  {
    id: 'tier_100k',
    size: 100000,
    label: '$100,000',
    fee: 479,
    twoStep: {
      phase1TargetPct: 8,
      phase2TargetPct: 5,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 5
    },
    twoStepAdvanced: {
      phase1TargetPct: 7,
      phase2TargetPct: 4,
      dailyLossPct: 4,
      maxDrawdownPct: 12,
      minTradingDays: 0
    },
    oneStep: {
      profitTargetPct: 10,
      dailyLossPct: 4,
      maxDrawdownPct: 8,
      minTradingDays: 3
    },
    threeStep: {
      phase1TargetPct: 6,
      phase2TargetPct: 6,
      phase3TargetPct: 5,
      dailyLossPct: 4,
      maxDrawdownPct: 12,
      minTradingDays: 3
    },
    instant: {
      dailyLossPct: 4,
      maxDrawdownPct: 6
    },
    starter: {
      profitTargetPct: 8,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 0
    },
    leverage: '1:100',
    profitSplit: 85
  },
  {
    id: 'tier_200k',
    size: 200000,
    label: '$200,000',
    fee: 849,
    twoStep: {
      phase1TargetPct: 8,
      phase2TargetPct: 5,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 5
    },
    twoStepAdvanced: {
      phase1TargetPct: 7,
      phase2TargetPct: 4,
      dailyLossPct: 4,
      maxDrawdownPct: 12,
      minTradingDays: 0
    },
    oneStep: {
      profitTargetPct: 10,
      dailyLossPct: 4,
      maxDrawdownPct: 8,
      minTradingDays: 3
    },
    threeStep: {
      phase1TargetPct: 6,
      phase2TargetPct: 6,
      phase3TargetPct: 5,
      dailyLossPct: 4,
      maxDrawdownPct: 12,
      minTradingDays: 3
    },
    instant: {
      dailyLossPct: 4,
      maxDrawdownPct: 6
    },
    starter: {
      profitTargetPct: 8,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 0
    },
    leverage: '1:100',
    profitSplit: 90
  }
];

export const INITIAL_ACCOUNTS: TraderAccount[] = [
  {
    id: 'acc_01',
    accountNumber: 'RX-88429',
    title: '$100K 2-Step Evaluation (Phase 1)',
    tierSize: 100000,
    initialBalance: 100000,
    balance: 106850,
    equity: 107420,
    startOfDayBalance: 106200,
    dailyLossLimitAmount: 5000,
    maxDrawdownLimitAmount: 10000,
    profitTargetAmount: 8000,
    daysTraded: 4,
    minTradingDays: 5,
    model: '2-step',
    phase: 'phase-1',
    status: 'active',
    leverage: '1:100',
    platform: 'Ryvexia WebTrader',
    createdDate: '2026-10-24'
  },
  {
    id: 'acc_02',
    accountNumber: 'RX-99210',
    title: '$50K Master Funded Account',
    tierSize: 50000,
    initialBalance: 50000,
    balance: 54320,
    equity: 54750,
    startOfDayBalance: 53900,
    dailyLossLimitAmount: 2500,
    maxDrawdownLimitAmount: 5000,
    profitTargetAmount: 0,
    daysTraded: 18,
    minTradingDays: 0,
    model: '2-step',
    phase: 'funded',
    status: 'active',
    leverage: '1:100',
    platform: 'Ryvexia WebTrader',
    createdDate: '2026-09-15'
  },
  {
    id: 'acc_03',
    accountNumber: 'RX-10492',
    title: '$200K 2-Step Evaluation (Phase 2)',
    tierSize: 200000,
    initialBalance: 200000,
    balance: 211400,
    equity: 211400,
    startOfDayBalance: 210200,
    dailyLossLimitAmount: 10000,
    maxDrawdownLimitAmount: 20000,
    profitTargetAmount: 10000,
    daysTraded: 7,
    minTradingDays: 5,
    model: '2-step',
    phase: 'phase-2',
    status: 'passed',
    leverage: '1:100',
    platform: 'Ryvexia WebTrader',
    createdDate: '2026-10-10'
  },
  {
    id: 'acc_04',
    accountNumber: 'RX-44102',
    title: '$25K 1-Step Evaluation',
    tierSize: 25000,
    initialBalance: 25000,
    balance: 23650,
    equity: 23650,
    startOfDayBalance: 24800,
    dailyLossLimitAmount: 1000,
    maxDrawdownLimitAmount: 2000,
    profitTargetAmount: 2500,
    daysTraded: 2,
    minTradingDays: 3,
    model: '1-step',
    phase: 'failed',
    status: 'failed',
    violationReason: 'Daily Drawdown Breached: -$1,150 loss exceeded allowed limit of $1,000 on Oct 28.',
    leverage: '1:50',
    platform: 'MetaTrader 5',
    createdDate: '2026-10-27'
  }
];

export const INITIAL_ORDERS: TradeOrder[] = [
  {
    id: 'ord_101',
    accountId: 'acc_01',
    symbol: 'XAUUSD',
    type: 'BUY',
    lots: 2.0,
    openPrice: 2738.50,
    currentPrice: 2742.80,
    sl: 2730.00,
    tp: 2755.00,
    pnl: 860.00,
    openTime: '2026-11-01 14:22:10',
    status: 'OPEN'
  },
  {
    id: 'ord_102',
    accountId: 'acc_01',
    symbol: 'EURUSD',
    type: 'SELL',
    lots: 5.0,
    openPrice: 1.08510,
    currentPrice: 1.08452,
    sl: 1.08750,
    tp: 1.08100,
    pnl: 290.00,
    openTime: '2026-11-01 16:04:45',
    status: 'OPEN'
  },
  {
    id: 'ord_103',
    accountId: 'acc_01',
    symbol: 'BTCUSD',
    type: 'BUY',
    lots: 0.5,
    openPrice: 90200.00,
    currentPrice: 91420.00,
    closePrice: 91420.00,
    pnl: 610.00,
    openTime: '2026-10-31 09:12:00',
    closeTime: '2026-10-31 18:40:12',
    status: 'CLOSED'
  },
  {
    id: 'ord_104',
    accountId: 'acc_01',
    symbol: 'US30',
    type: 'BUY',
    lots: 1.5,
    openPrice: 43550.00,
    currentPrice: 43800.00,
    closePrice: 43800.00,
    pnl: 375.00,
    openTime: '2026-10-30 15:30:00',
    closeTime: '2026-10-30 21:15:32',
    status: 'CLOSED'
  },
  {
    id: 'ord_105',
    accountId: 'acc_01',
    symbol: 'GBPUSD',
    type: 'SELL',
    lots: 4.0,
    openPrice: 1.29800,
    currentPrice: 1.29450,
    closePrice: 1.29450,
    pnl: 1400.00,
    openTime: '2026-10-29 11:00:20',
    closeTime: '2026-10-29 17:35:10',
    status: 'CLOSED'
  },
  {
    id: 'ord_106',
    accountId: 'acc_01',
    symbol: 'NAS100',
    type: 'BUY',
    lots: 2.0,
    openPrice: 20950.00,
    currentPrice: 20850.00,
    closePrice: 20850.00,
    pnl: -400.00,
    openTime: '2026-10-28 14:10:00',
    closeTime: '2026-10-28 19:40:00',
    status: 'CLOSED'
  },
  {
    id: 'ord_201',
    accountId: 'acc_02',
    symbol: 'XAUUSD',
    type: 'BUY',
    lots: 1.5,
    openPrice: 2725.00,
    currentPrice: 2742.80,
    sl: 2715.00,
    tp: 2760.00,
    pnl: 2670.00,
    openTime: '2026-10-30 10:15:00',
    status: 'OPEN'
  }
];

export const INITIAL_REWARD_REQUESTS: RewardRequest[] = [
  {
    id: 'rew_001',
    accountId: 'acc_02',
    traderName: 'Alex Mercer',
    traderEmail: 'trader@ryvexia.com',
    amount: 3200,
    splitPct: 85,
    traderAmount: 2720,
    method: 'USDT',
    addressOrIban: '0x71C8A627341e98dE2b0cFa07689953F9b79Abc99',
    status: 'APPROVED',
    date: '2026-10-20',
    txHash: '0x8f2d5910be289d0092fa023e10283e390c421719a71029471abef198327189a1',
    notes: 'Payout processed within 4 hours. Bi-weekly simulated profit split.'
  },
  {
    id: 'rew_002',
    accountId: 'acc_02',
    traderName: 'Alex Mercer',
    traderEmail: 'trader@ryvexia.com',
    amount: 2500,
    splitPct: 85,
    traderAmount: 2125,
    method: 'USDC',
    addressOrIban: '0x38B124C4c2bFa5817aA88921B7Efa86498B26aD1',
    status: 'PENDING',
    date: '2026-11-01',
    notes: 'Awaiting admin risk desk verification.'
  },
  {
    id: 'rew_003',
    accountId: 'acc_ext_09',
    traderName: 'Marcus Lindqvist',
    traderEmail: 'marcus.l@nordictrader.se',
    amount: 8400,
    splitPct: 90,
    traderAmount: 7560,
    method: 'BANK_WIRE',
    addressOrIban: 'CH93 0076 2011 6238 5295 1',
    status: 'APPROVED',
    date: '2026-10-29',
    txHash: 'SWIFT-REF-992184021',
    notes: 'Approved by Elena Vance.'
  },
  {
    id: 'rew_004',
    accountId: 'acc_ext_15',
    traderName: 'Sophia Chen',
    traderEmail: 'sophia.q@quantdesk.sg',
    amount: 14200,
    splitPct: 90,
    traderAmount: 12780,
    method: 'USDT',
    addressOrIban: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    status: 'PENDING',
    date: '2026-11-01',
    notes: 'Simulated high-frequency consistency review in progress.'
  }
];

export const INITIAL_COUPONS: CouponCode[] = [
  {
    code: 'RYVEXIA15',
    discountPct: 15,
    description: '15% Off Any Evaluation Program',
    active: true,
    timesUsed: 142,
    expiry: '2026-12-31'
  },
  {
    code: 'WELCOME20',
    discountPct: 20,
    description: 'First-time Trader Welcome Bonus (20% Off)',
    active: true,
    timesUsed: 89,
    expiry: '2026-12-31'
  },
  {
    code: 'PROPEDGE',
    discountPct: 10,
    description: 'Prop Trading Community 10% Discount',
    active: true,
    timesUsed: 310,
    expiry: '2027-01-01'
  },
  {
    code: 'BLACKGOLD',
    discountPct: 25,
    description: 'VIP High-Watermark Trader Promo (25% Off)',
    active: false,
    timesUsed: 54,
    expiry: '2026-10-31'
  }
];

export const INITIAL_AFFILIATE: AffiliateUser = {
  id: 'aff_01',
  referralCode: 'ALEX88',
  totalReferrals: 28,
  totalVolume: 12450,
  commissionRatePct: 12,
  pendingCommission: 480,
  paidCommission: 1494
};

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog_1',
    title: 'The Mathematics of Daily Drawdown: Why Static vs Trailing Floors Matter',
    slug: 'mathematics-of-daily-drawdown',
    excerpt: 'Explore how high-water mark trailing loss traps destroy trader edge, and why Ryvexia uses institutional static calculation floors.',
    content: `When selecting a proprietary trading firm, the drawdown metric is the single most critical factor in your probability of success.\n\nMany retail prop firms market "trailing drawdown" rules where profitable open trades permanently drag up your loss floor. If you are up $3,000 on a trade and give back $1,500, a trailing drawdown engine fails your account even though you are net positive.\n\nAt RYVEXIA FUNDING, daily drawdown is strictly evaluated against the 00:00 UTC start-of-day balance or equity, protecting profits made during intraday sessions from predatory trailing ratchets.`,
    author: 'Elena Vance',
    authorRole: 'Chief Risk Officer',
    category: 'Risk Architecture',
    readTime: '5 min read',
    publishedAt: 'Oct 28, 2026',
    tags: ['Risk Management', 'Drawdown', 'Evaluation']
  },
  {
    id: 'blog_2',
    title: 'Executing Through High-Impact News: Slippage, Liquidity & Spread Protection',
    slug: 'executing-through-high-impact-news',
    excerpt: 'How our simulated liquidity bridge preserves sub-10ms fills during Non-Farm Payrolls, CPI prints, and FOMC rate decisions.',
    content: `Most prop firms ban news trading because their simulated infrastructure cannot handle volatility spikes without massive artificial slippage.\n\nRyvexia's simulated engine mirrors real interbank depth of book. Because our model evaluates raw trading execution rather than relying on trick rules, we permit holding and trading through all major macroeconomic data prints without arbitrary penalty windows.`,
    author: 'Marcus Lindqvist',
    authorRole: 'Head of Quant Simulation',
    category: 'Market Infrastructure',
    readTime: '6 min read',
    publishedAt: 'Oct 24, 2026',
    tags: ['News Trading', 'FX Liquidity', 'Execution']
  },
  {
    id: 'blog_3',
    title: 'Psychology of the Funded Trader: Surviving the Shift from Phase 2 to Live Payouts',
    slug: 'psychology-funded-trader-phase-to-live',
    excerpt: 'Practical strategies to eliminate performance anxiety when transitioning from evaluation targets to regular bi-weekly reward withdrawals.',
    content: `Passing evaluation is an objective milestone, but managing funded capital tests psychological discipline. The biggest mistake new funded traders make is doubling lot size to chase a fast first payout.\n\nIn this guide, we break down asymmetric risk-to-reward frameworks, lot-size capping, and daily loss discipline that keep funded traders profitable for months and years.`,
    author: 'Dr. Sarah Sterling',
    authorRole: 'Trader Performance Coach',
    category: 'Trading Psychology',
    readTime: '7 min read',
    publishedAt: 'Oct 19, 2026',
    tags: ['Psychology', 'Discipline', 'Funded Trading']
  },
  {
    id: 'blog_4',
    title: 'Scaling up to $2,000,000 in Simulated Capital: The Ryvexia Growth Ladder',
    slug: 'scaling-plan-two-million-growth-ladder',
    excerpt: 'Detailed breakdown of our 25% capital increase increments every 3 months for consistent, profitable prop operators.',
    content: `Traders who maintain consistency deserve exponential scaling. If you achieve 10% net gain over a consecutive 3-month cycle with at least 2 processed payouts, Ryvexia automatically increases your simulated account size by 25%, up to a firm-wide ceiling of $2,000,000.`,
    author: 'Alex Mercer',
    authorRole: 'Master Funded Trader',
    category: 'Scaling Plans',
    readTime: '4 min read',
    publishedAt: 'Oct 12, 2026',
    tags: ['Scaling', 'Institutional Growth']
  }
];

export const INITIAL_JOURNAL_ENTRIES: TradeJournalEntry[] = [
  {
    id: 'jrn_1',
    accountId: 'acc_01',
    date: '2026-11-01',
    title: 'Gold Breakout Long Execution',
    notes: 'Clean retest of 2,738 level after London liquidity sweep. Scaled into 2 lots with fixed 2,730 SL. Disciplined execution, zero FOMO.',
    emotion: 'DISCIPLINED',
    pnl: 860,
    tradesCount: 2
  },
  {
    id: 'jrn_2',
    accountId: 'acc_01',
    date: '2026-10-31',
    title: 'Bitcoin Weekend Momentum',
    notes: 'Took 0.5 lot long on BTC breakout at $90,200. Held into resistance at $91,420 and closed before evening chop.',
    emotion: 'PATIENT',
    pnl: 610,
    tradesCount: 1
  },
  {
    id: 'jrn_3',
    accountId: 'acc_01',
    date: '2026-10-30',
    title: 'Dow Jones Cash Open Scalp',
    notes: 'Entered US30 long after NYSE opening bell dip. Took quick profit at +$375.',
    emotion: 'DISCIPLINED',
    pnl: 375,
    tradesCount: 1
  },
  {
    id: 'jrn_4',
    accountId: 'acc_01',
    date: '2026-10-29',
    title: 'Cable Short Swing Entry',
    notes: 'Short GBPUSD at 1.2980 resistance. Covered at 1.2945 for +$1,400 gain. Best trade of the week.',
    emotion: 'DISCIPLINED',
    pnl: 1400,
    tradesCount: 1
  },
  {
    id: 'jrn_5',
    accountId: 'acc_01',
    date: '2026-10-28',
    title: 'Nasdaq Dip Buying Mistake',
    notes: 'Bought NAS100 too early into morning tech selloff. Hit stop loss at -$400. Accepted loss cleanly and closed terminal.',
    emotion: 'PATIENT',
    pnl: -400,
    tradesCount: 1
  }
];

export const INITIAL_LEADERBOARD: LeaderboardTrader[] = [
  {
    rank: 1,
    name: 'Sophia Chen',
    country: 'Singapore',
    avatar: '/src/assets/images/avatar_trader_elena_1793599900954.jpg',
    accountTier: '$200,000 Master Funded',
    totalGainPct: 18.4,
    winRate: 74,
    profitFactor: 2.85,
    payoutAmount: 28400
  },
  {
    rank: 2,
    name: 'Alex Mercer',
    country: 'United Kingdom',
    avatar: '/src/assets/images/avatar_trader_alex_1793599901320.jpg',
    accountTier: '$100,000 2-Step Phase 1',
    totalGainPct: 14.8,
    winRate: 71,
    profitFactor: 2.42,
    payoutAmount: 8900
  },
  {
    rank: 3,
    name: 'Marcus Lindqvist',
    country: 'Sweden',
    avatar: '/src/assets/images/avatar_trader_alex_1793599901320.jpg',
    accountTier: '$200,000 Master Funded',
    totalGainPct: 12.6,
    winRate: 68,
    profitFactor: 2.18,
    payoutAmount: 16500
  },
  {
    rank: 4,
    name: 'Julian Alvarez',
    country: 'Argentina',
    avatar: '/src/assets/images/avatar_trader_elena_1793599900954.jpg',
    accountTier: '$50,000 Master Funded',
    totalGainPct: 11.2,
    winRate: 65,
    profitFactor: 1.95,
    payoutAmount: 6200
  },
  {
    rank: 5,
    name: 'Tariq Al-Mansoor',
    country: 'United Arab Emirates',
    avatar: '/src/assets/images/avatar_trader_alex_1793599901320.jpg',
    accountTier: '$100,000 Master Funded',
    totalGainPct: 9.8,
    winRate: 64,
    profitFactor: 1.88,
    payoutAmount: 11200
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'ach_1',
    title: 'Phase 1 Victor',
    description: 'Achieve the 8% profit target on an official evaluation account.',
    iconName: 'Award',
    unlocked: true,
    unlockedAt: 'Oct 26, 2026',
    category: 'EVALUATION'
  },
  {
    id: 'ach_2',
    title: 'Risk Guardian',
    description: 'Trade 10 consecutive sessions keeping daily drawdown below 1.5%.',
    iconName: 'Shield',
    unlocked: true,
    unlockedAt: 'Oct 30, 2026',
    category: 'DISCIPLINE'
  },
  {
    id: 'ach_3',
    title: 'Master Funded Trader',
    description: 'Complete Phase 2 verification and unlock live simulated allocation.',
    iconName: 'CheckCircle2',
    unlocked: true,
    unlockedAt: 'Sep 15, 2026',
    category: 'EVALUATION'
  },
  {
    id: 'ach_4',
    title: 'First Payout Disbursed',
    description: 'Request and successfully receive your first simulated profit reward.',
    iconName: 'DollarSign',
    unlocked: true,
    unlockedAt: 'Oct 20, 2026',
    category: 'PERFORMANCE'
  },
  {
    id: 'ach_5',
    title: '10-Trade Win Streak',
    description: 'Close 10 consecutive winning positions with strict stop loss adherence.',
    iconName: 'TrendingUp',
    unlocked: false,
    category: 'PERFORMANCE'
  },
  {
    id: 'ach_6',
    title: 'Scaling Pioneer ($500K+)',
    description: 'Qualify for consecutive quarterly scaling to reach half a million capital.',
    iconName: 'Sparkles',
    unlocked: false,
    category: 'PERFORMANCE'
  }
];

export const INITIAL_LOYALTY: LoyaltyAccount = {
  points: 1850,
  tier: 'SILVER',
  rewardsRedeemed: 1,
  history: [
    { id: 'loy_1', desc: 'Completed Phase 1 Evaluation', pts: 500, date: '2026-10-26' },
    { id: 'loy_2', desc: '10 Disciplined Trading Days', pts: 250, date: '2026-10-28' },
    { id: 'loy_3', desc: 'Challenge Enrollment Bonus', pts: 1000, date: '2026-10-24' },
    { id: 'loy_4', desc: 'Redeemed 10% Challenge Discount Token', pts: -500, date: '2026-10-27' }
  ]
};

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud_101',
    timestamp: '2026-11-01 16:04:45',
    actor: 'Alex Mercer (RX-88429)',
    action: 'ORDER_FILL',
    category: 'TRADE',
    details: 'SELL 5.0 Lots EURUSD @ 1.08510. Simulated spread: 0.1 pips. Commission: $15.00.',
    severity: 'INFO'
  },
  {
    id: 'aud_102',
    timestamp: '2026-11-01 14:22:10',
    actor: 'Alex Mercer (RX-88429)',
    action: 'ORDER_FILL',
    category: 'TRADE',
    details: 'BUY 2.0 Lots XAUUSD @ 2738.50. SL: 2730.00, TP: 2755.00.',
    severity: 'INFO'
  },
  {
    id: 'aud_103',
    timestamp: '2026-11-01 00:00:01',
    actor: 'Ryvexia Risk Engine',
    action: 'DAILY_RESET',
    category: 'RISK',
    details: 'Daily High Water Mark reset for RX-88429. Start-of-day equity: $106,200.00. Buffer: $5,000.',
    severity: 'INFO'
  },
  {
    id: 'aud_104',
    timestamp: '2026-10-28 17:44:12',
    actor: 'Ryvexia Risk Engine',
    action: 'BREACH_LOCK',
    category: 'RISK',
    details: 'Account RX-44102 locked: -$1,150.00 intraday loss breached $1,000.00 maximum daily loss limit.',
    severity: 'CRITICAL'
  },
  {
    id: 'aud_105',
    timestamp: '2026-10-20 18:30:00',
    actor: 'Elena Vance (Risk Desk)',
    action: 'PAYOUT_SETTLEMENT',
    category: 'PAYOUT',
    details: 'Approved simulated reward request #REW-001 for $2,720.00 to Alex Mercer. TX Hash logged.',
    severity: 'INFO'
  }
];

export const INITIAL_ORDER_HISTORY: OrderHistoryItem[] = [
  {
    id: 'ord_hist_01',
    orderNumber: 'RYV-99218',
    date: '2026-10-24',
    planName: '$100K 2-Step Standard Evaluation',
    size: 100000,
    originalPrice: 499,
    discountApplied: 74.85,
    finalPrice: 424.15,
    couponCode: 'RYVEXIA15',
    paymentMethod: 'Credit Card (Stripe)',
    status: 'COMPLETED',
    accountId: 'RX-88429'
  },
  {
    id: 'ord_hist_02',
    orderNumber: 'RYV-88104',
    date: '2026-09-15',
    planName: '$50K Master Funded Evaluation',
    size: 50000,
    originalPrice: 299,
    discountApplied: 0,
    finalPrice: 299.00,
    paymentMethod: 'Crypto (USDT)',
    status: 'COMPLETED',
    accountId: 'RX-99210'
  },
  {
    id: 'ord_hist_03',
    orderNumber: 'RYV-77192',
    date: '2026-10-10',
    planName: '$200K 2-Step Evaluation',
    size: 200000,
    originalPrice: 899,
    discountApplied: 89.90,
    finalPrice: 809.10,
    couponCode: 'PROPEDGE',
    paymentMethod: 'Bank Wire Transfer',
    status: 'COMPLETED',
    accountId: 'RX-10492'
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt_801',
    userEmail: 'trader@ryvexia.com',
    userName: 'Alex Mercer',
    subject: 'MT5 Bridge to Ryvexia WebTrader synchronization inquiry',
    category: 'Terminal Bug',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    createdAt: '2026-10-30 11:20:00',
    messages: [
      {
        id: 'msg_1',
        sender: 'user',
        senderName: 'Alex Mercer',
        text: 'Hello team, does the Ryvexia WebTrader sync tick-by-tick with external MT5 terminal if I decide to switch between both?',
        time: '2026-10-30 11:20:00'
      },
      {
        id: 'msg_2',
        sender: 'support',
        senderName: 'Ryvexia Institutional Desk',
        text: 'Greetings Alex. Yes, all orders and equity positions are synchronized via our high-speed bridge with sub-10ms simulated execution.',
        time: '2026-10-30 11:35:00'
      }
    ]
  },
  {
    id: 'tkt_802',
    userEmail: 'trader@ryvexia.com',
    userName: 'Alex Mercer',
    subject: 'Request for Phase 1 Certificate issuance upon target completion',
    category: 'Evaluation Rules',
    priority: 'LOW',
    status: 'RESOLVED',
    createdAt: '2026-10-26 15:45:00',
    messages: [
      {
        id: 'msg_3',
        sender: 'user',
        senderName: 'Alex Mercer',
        text: 'When I hit the 8% target on Phase 1, is the certificate generated automatically in my trader portal?',
        time: '2026-10-26 15:45:00'
      },
      {
        id: 'msg_4',
        sender: 'support',
        senderName: 'Ryvexia Compliance',
        text: 'Yes! As soon as all objectives (including minimum 5 trading days) are evaluated green, your Phase 1 verification badge and certificate will appear automatically.',
        time: '2026-10-26 16:10:00'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    title: 'Phase 1 Target: 85% Complete',
    message: 'Account RX-88429 current profit is +$6,850. Only $1,150 remaining to pass Phase 1.',
    type: 'success',
    timestamp: '15 mins ago',
    read: false
  },
  {
    id: 'notif_2',
    title: 'Daily Drawdown Buffer: Healthy',
    message: 'Today drawdown is currently $680 of $5,000 maximum daily buffer.',
    type: 'info',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 'notif_3',
    title: 'Simulated Reward Processing',
    message: 'Your reward request #REW-002 for $2,125 is under routine risk desk verification.',
    type: 'info',
    timestamp: '5 hours ago',
    read: true
  }
];

export const FAQ_ITEMS = [
  {
    category: 'Evaluation & Rules',
    question: 'How does the Daily Drawdown calculation work?',
    answer: 'The daily loss limit is calculated based on the account equity or balance at 00:00 UTC (the higher of the two, High Water Mark model). For example, on a $100,000 account with a 5% daily limit ($5,000), your equity cannot drop below $95,000 during that trading day.'
  },
  {
    category: 'Evaluation & Rules',
    question: 'What is the Maximum Overall Drawdown rule?',
    answer: 'The Maximum Overall Drawdown is static based on your chosen challenge model. In the 2-Step model, it is a static 10% from initial balance. On a $100,000 account, the maximum permitted equity drawdown is $10,000 (breach point is $90,000).'
  },
  {
    category: 'Evaluation & Rules',
    question: 'Are there minimum trading days required?',
    answer: 'The 2-Step evaluation requires a minimum of 5 trading days for both Phase 1 and Phase 2. A trading day is counted if at least one position is opened on that calendar day. In our 1-Step model, minimum trading days is 3, while our Advanced and Instant models require 0 minimum days.'
  },
  {
    category: 'Evaluation & Rules',
    question: 'What are the 6 evaluation models offered by Ryvexia?',
    answer: 'Ryvexia offers: 1) One-Step Evaluation (rapid 10% single milestone), 2) Two-Step Standard (8% and 5% targets), 3) Two-Step Advanced (7% and 4% targets with 12% max drawdown), 4) Three-Step Evaluation (low-stress 6%/6%/5% targets), 5) Instant Simulated Account (direct funded allocation), and 6) Starter Challenge (low-cost entry from $49).'
  },
  {
    category: 'Simulated Payouts & Rewards',
    question: 'How and when can I request simulated reward payouts?',
    answer: 'Funded traders can request their first payout on demand after 14 days of trading on their funded account, followed by bi-weekly payouts. Payouts are processed via Crypto (USDT ERC20/TRC20, USDC) or Bank Wire transfer within 8 business hours.'
  },
  {
    category: 'Simulated Payouts & Rewards',
    question: 'What is the simulated reward profit split?',
    answer: 'Traders start with an 80% to 85% profit split depending on account size, scalable up to 90% through our Scaling Plan or by selecting the 90% add-on at checkout.'
  },
  {
    category: 'Trading Environment',
    question: 'What instruments can I trade?',
    answer: 'You can trade Major and Minor FX pairs, Spot Commodities (Gold XAUUSD, Silver, Crude Oil), Indices (US30, NAS100, SPX500, GER40), and Major Cryptocurrencies (BTCUSD, ETHUSD) with raw institutional simulated spreads.'
  },
  {
    category: 'Trading Environment',
    question: 'Are News Trading and Weekend Holding permitted?',
    answer: 'Yes! Standard evaluations allow news trading and weekend holding without restriction. We do not enforce arbitrary news stop rules on standard accounts.'
  },
  {
    category: 'Legal & Compliance',
    question: 'Is RYVEXIA FUNDING a broker or investment firm?',
    answer: 'No. RYVEXIA FUNDING provides purely simulated evaluation accounts with demo capital. We are not a broker, we do not solicit real investor funds, and simulated performance does not guarantee future financial market results.'
  }
];
