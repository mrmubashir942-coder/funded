export type UserRole = 'trader' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  kycStatus: 'VERIFIED' | 'PENDING' | 'REQUIRED';
  country: string;
  joinedDate: string;
}

export type ChallengeModel =
  | '1-step'
  | '2-step'
  | '2-step-advanced'
  | '3-step'
  | 'instant'
  | 'starter';

export type ChallengePhase = 'phase-1' | 'phase-2' | 'phase-3' | 'funded' | 'failed';
export type AccountStatus = 'active' | 'passed' | 'failed';

export interface TraderAccount {
  id: string;
  accountNumber: string;
  title: string;
  tierSize: number; // e.g. 5000, 10000, 25000, 50000, 100000, 200000
  initialBalance: number;
  balance: number;
  equity: number;
  startOfDayBalance: number;
  dailyLossLimitAmount: number;
  maxDrawdownLimitAmount: number;
  profitTargetAmount: number;
  daysTraded: number;
  minTradingDays: number;
  model: ChallengeModel;
  phase: ChallengePhase;
  status: AccountStatus;
  violationReason?: string;
  leverage: string;
  platform: 'Ryvexia WebTrader' | 'MetaTrader 5';
  createdDate: string;
}

export type OrderType = 'BUY' | 'SELL';
export type OrderStatus = 'OPEN' | 'CLOSED' | 'PENDING';

export interface TradeOrder {
  id: string;
  accountId: string;
  symbol: string;
  type: OrderType;
  lots: number;
  openPrice: number;
  currentPrice: number;
  closePrice?: number;
  sl?: number;
  tp?: number;
  pnl: number;
  openTime: string;
  closeTime?: string;
  status: OrderStatus;
  limitPrice?: number;
}

export interface MarketQuote {
  symbol: string;
  name: string;
  bid: number;
  ask: number;
  change: number;
  changePct: number;
  high: number;
  low: number;
  digits: number;
  pipSize: number;
}

export interface ChallengeTierConfig {
  id: string;
  size: number;
  label: string;
  fee: number;
  twoStep: {
    phase1TargetPct: number;
    phase2TargetPct: number;
    dailyLossPct: number;
    maxDrawdownPct: number;
    minTradingDays: number;
  };
  twoStepAdvanced: {
    phase1TargetPct: number;
    phase2TargetPct: number;
    dailyLossPct: number;
    maxDrawdownPct: number;
    minTradingDays: number;
  };
  oneStep: {
    profitTargetPct: number;
    dailyLossPct: number;
    maxDrawdownPct: number;
    minTradingDays: number;
  };
  threeStep: {
    phase1TargetPct: number;
    phase2TargetPct: number;
    phase3TargetPct: number;
    dailyLossPct: number;
    maxDrawdownPct: number;
    minTradingDays: number;
  };
  instant: {
    dailyLossPct: number;
    maxDrawdownPct: number;
  };
  starter: {
    profitTargetPct: number;
    dailyLossPct: number;
    maxDrawdownPct: number;
    minTradingDays: number;
  };
  leverage: string;
  profitSplit: number;
}

export interface RewardRequest {
  id: string;
  accountId: string;
  traderName: string;
  traderEmail: string;
  amount: number;
  splitPct: number;
  traderAmount: number;
  method: 'USDT' | 'USDC' | 'BANK_WIRE';
  addressOrIban: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  date: string;
  txHash?: string;
  notes?: string;
}

export interface TicketMessage {
  id: string;
  sender: 'user' | 'support';
  senderName: string;
  text: string;
  time: string;
}

export interface SupportTicket {
  id: string;
  userEmail: string;
  userName: string;
  subject: string;
  category: 'Evaluation Rules' | 'Account Credentials' | 'Simulated Payout' | 'Terminal Bug' | 'General';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
  messages: TicketMessage[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  timestamp: string;
  read: boolean;
}

export interface CouponCode {
  code: string;
  discountPct: number;
  description: string;
  active: boolean;
  timesUsed: number;
  expiry: string;
}

export interface AffiliateUser {
  id: string;
  referralCode: string;
  totalReferrals: number;
  totalVolume: number;
  commissionRatePct: number;
  pendingCommission: number;
  paidCommission: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  category: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
}

export interface TradeJournalEntry {
  id: string;
  accountId: string;
  date: string;
  title: string;
  notes: string;
  emotion: 'DISCIPLINED' | 'FOMO' | 'PATIENT' | 'REVENGE';
  pnl: number;
  tradesCount: number;
}

export interface LeaderboardTrader {
  rank: number;
  name: string;
  country: string;
  avatar: string;
  accountTier: string;
  totalGainPct: number;
  winRate: number;
  profitFactor: number;
  payoutAmount: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'EVALUATION' | 'DISCIPLINE' | 'PERFORMANCE';
}

export interface LoyaltyAccount {
  points: number;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'BLACK';
  rewardsRedeemed: number;
  history: {
    id: string;
    desc: string;
    pts: number;
    date: string;
  }[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  category: 'RISK' | 'TRADE' | 'PAYOUT' | 'AUTH' | 'SYSTEM';
  details: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface OrderHistoryItem {
  id: string;
  orderNumber: string;
  date: string;
  planName: string;
  size: number;
  originalPrice: number;
  discountApplied: number;
  finalPrice: number;
  couponCode?: string;
  paymentMethod: string;
  status: 'COMPLETED' | 'PENDING' | 'REFUNDED';
  accountId: string;
}
