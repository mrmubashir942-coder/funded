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

export type ChallengeModel = '2-step' | '1-step' | 'instant';
export type ChallengePhase = 'phase-1' | 'phase-2' | 'funded' | 'failed';
export type AccountStatus = 'active' | 'passed' | 'failed';

export interface TraderAccount {
  id: string;
  accountNumber: string;
  title: string;
  tierSize: number; // e.g. 100000
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
  oneStep: {
    profitTargetPct: number;
    dailyLossPct: number;
    maxDrawdownPct: number;
    minTradingDays: number;
  };
  instant: {
    dailyLossPct: number;
    maxDrawdownPct: number;
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
