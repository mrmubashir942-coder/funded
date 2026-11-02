import {
  TraderAccount,
  TradeOrder,
  MarketQuote,
  ChallengeTierConfig,
  RewardRequest,
  SupportTicket,
  AppNotification,
  User
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
    id: 'tier_10k',
    size: 10000,
    label: '$10,000',
    fee: 99,
    twoStep: {
      phase1TargetPct: 8,
      phase2TargetPct: 5,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 5
    },
    oneStep: {
      profitTargetPct: 10,
      dailyLossPct: 4,
      maxDrawdownPct: 8,
      minTradingDays: 3
    },
    instant: {
      dailyLossPct: 4,
      maxDrawdownPct: 6
    },
    leverage: '1:100',
    profitSplit: 80
  },
  {
    id: 'tier_25k',
    size: 25000,
    label: '$25,000',
    fee: 199,
    twoStep: {
      phase1TargetPct: 8,
      phase2TargetPct: 5,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 5
    },
    oneStep: {
      profitTargetPct: 10,
      dailyLossPct: 4,
      maxDrawdownPct: 8,
      minTradingDays: 3
    },
    instant: {
      dailyLossPct: 4,
      maxDrawdownPct: 6
    },
    leverage: '1:100',
    profitSplit: 80
  },
  {
    id: 'tier_50k',
    size: 50000,
    label: '$50,000',
    fee: 299,
    twoStep: {
      phase1TargetPct: 8,
      phase2TargetPct: 5,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 5
    },
    oneStep: {
      profitTargetPct: 10,
      dailyLossPct: 4,
      maxDrawdownPct: 8,
      minTradingDays: 3
    },
    instant: {
      dailyLossPct: 4,
      maxDrawdownPct: 6
    },
    leverage: '1:100',
    profitSplit: 85
  },
  {
    id: 'tier_100k',
    size: 100000,
    label: '$100,000',
    fee: 499,
    twoStep: {
      phase1TargetPct: 8,
      phase2TargetPct: 5,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 5
    },
    oneStep: {
      profitTargetPct: 10,
      dailyLossPct: 4,
      maxDrawdownPct: 8,
      minTradingDays: 3
    },
    instant: {
      dailyLossPct: 4,
      maxDrawdownPct: 6
    },
    leverage: '1:100',
    profitSplit: 85
  },
  {
    id: 'tier_200k',
    size: 200000,
    label: '$200,000',
    fee: 899,
    twoStep: {
      phase1TargetPct: 8,
      phase2TargetPct: 5,
      dailyLossPct: 5,
      maxDrawdownPct: 10,
      minTradingDays: 5
    },
    oneStep: {
      profitTargetPct: 10,
      dailyLossPct: 4,
      maxDrawdownPct: 8,
      minTradingDays: 3
    },
    instant: {
      dailyLossPct: 4,
      maxDrawdownPct: 6
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
    dailyLossLimitAmount: 5000, // 5% of starting day or initial
    maxDrawdownLimitAmount: 10000, // 10%
    profitTargetAmount: 8000, // 8% ($108,000)
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
    profitTargetAmount: 0, // No target on funded
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
    profitTargetAmount: 10000, // 5%
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
    dailyLossLimitAmount: 1000, // 4%
    maxDrawdownLimitAmount: 2000, // 8%
    profitTargetAmount: 2500, // 10%
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
    answer: 'The Maximum Overall Drawdown is static or trailing based on your chosen challenge model. In the 2-Step model, it is a static 10% from initial balance. On a $100,000 account, the maximum permitted equity drawdown is $10,000 (breach point is $90,000).'
  },
  {
    category: 'Evaluation & Rules',
    question: 'Are there minimum trading days required?',
    answer: 'The 2-Step evaluation requires a minimum of 5 trading days for both Phase 1 and Phase 2. A trading day is counted if at least one position is opened on that calendar day. In our 1-Step model, minimum trading days is reduced to 3.'
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
