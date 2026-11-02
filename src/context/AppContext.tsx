import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  TraderAccount,
  TradeOrder,
  MarketQuote,
  ChallengeTierConfig,
  RewardRequest,
  SupportTicket,
  AppNotification,
  UserRole
} from '../types';
import {
  DEFAULT_TRADER,
  DEFAULT_ADMIN,
  INITIAL_MARKET_QUOTES,
  INITIAL_CHALLENGE_TIERS,
  INITIAL_ACCOUNTS,
  INITIAL_ORDERS,
  INITIAL_REWARD_REQUESTS,
  INITIAL_TICKETS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

interface CheckoutData {
  tierId: string;
  model: '2-step' | '1-step' | 'instant';
  platform: 'Ryvexia WebTrader' | 'MetaTrader 5';
  addOnNinetySplit: boolean;
  addOnBiWeekly: boolean;
  addOnNoMinDays: boolean;
}

interface AppContextType {
  currentUser: User | null;
  currentView: 'public' | 'trader' | 'admin';
  activeTab: string;
  accounts: TraderAccount[];
  activeAccount: TraderAccount | null;
  orders: TradeOrder[];
  marketQuotes: MarketQuote[];
  challengeTiers: ChallengeTierConfig[];
  rewardRequests: RewardRequest[];
  tickets: SupportTicket[];
  notifications: AppNotification[];
  checkoutData: CheckoutData;
  activeSymbol: string;
  isSimulatingTicks: boolean;
  
  // Setters & Navigation
  setCurrentView: (view: 'public' | 'trader' | 'admin') => void;
  setActiveTab: (tab: string) => void;
  setActiveAccountId: (id: string) => void;
  setActiveSymbol: (symbol: string) => void;
  setIsSimulatingTicks: (active: boolean) => void;
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckoutData>>;
  
  // Auth
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  
  // Trading Engine
  placeOrder: (data: {
    symbol: string;
    type: 'BUY' | 'SELL';
    lots: number;
    sl?: number;
    tp?: number;
    isLimit?: boolean;
    limitPrice?: number;
  }) => { success: boolean; message: string };
  closeOrder: (orderId: string) => void;
  modifyOrder: (orderId: string, sl?: number, tp?: number) => void;
  cancelPendingOrder: (orderId: string) => void;
  
  // Challenge & Account Actions
  passPhase: (accountId: string) => void;
  resetAccount: (accountId: string) => void;
  failAccount: (accountId: string, reason: string) => void;
  purchaseChallenge: (overrideData?: Partial<CheckoutData>) => TraderAccount;
  updateChallengeTier: (tierId: string, updates: Partial<ChallengeTierConfig>) => void;
  
  // Rewards
  requestReward: (amount: number, method: 'USDT' | 'USDC' | 'BANK_WIRE', addressOrIban: string) => { success: boolean; message: string };
  approveReward: (rewardId: string, txHash?: string) => void;
  rejectReward: (rewardId: string, notes?: string) => void;
  
  // Support & Notifications
  createSupportTicket: (subject: string, category: any, priority: any, initialMessage: string) => void;
  replySupportTicket: (ticketId: string, text: string) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'alert') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(DEFAULT_TRADER);
  const [currentView, setCurrentView] = useState<'public' | 'trader' | 'admin'>('public');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [accounts, setAccounts] = useState<TraderAccount[]>(INITIAL_ACCOUNTS);
  const [activeAccountId, setActiveAccountId] = useState<string>('acc_01');
  const [orders, setOrders] = useState<TradeOrder[]>(INITIAL_ORDERS);
  const [marketQuotes, setMarketQuotes] = useState<MarketQuote[]>(INITIAL_MARKET_QUOTES);
  const [challengeTiers, setChallengeTiers] = useState<ChallengeTierConfig[]>(INITIAL_CHALLENGE_TIERS);
  const [rewardRequests, setRewardRequests] = useState<RewardRequest[]>(INITIAL_REWARD_REQUESTS);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [activeSymbol, setActiveSymbol] = useState<string>('XAUUSD');
  const [isSimulatingTicks, setIsSimulatingTicks] = useState<boolean>(true);

  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    tierId: 'tier_100k',
    model: '2-step',
    platform: 'Ryvexia WebTrader',
    addOnNinetySplit: false,
    addOnBiWeekly: false,
    addOnNoMinDays: false
  });

  const activeAccount = accounts.find((a) => a.id === activeAccountId) || accounts[0] || null;

  // Real-time market tick simulator
  useEffect(() => {
    if (!isSimulatingTicks) return;

    const interval = setInterval(() => {
      setMarketQuotes((prevQuotes) => {
        return prevQuotes.map((q) => {
          // Subtle micro fluctuations
          const sign = Math.random() > 0.48 ? 1 : -1;
          const delta = (Math.random() * 2 + 0.5) * q.pipSize * sign;
          const newBid = Math.round((q.bid + delta) * (1 / q.pipSize)) / (1 / q.pipSize);
          const spread = Math.round((q.ask - q.bid) * (1 / q.pipSize)) / (1 / q.pipSize);
          const newAsk = Math.round((newBid + spread) * (1 / q.pipSize)) / (1 / q.pipSize);
          const newHigh = Math.max(q.high, newBid);
          const newLow = Math.min(q.low, newBid);

          return {
            ...q,
            bid: newBid,
            ask: newAsk,
            high: newHigh,
            low: newLow,
            change: +(newBid - q.low * 0.999).toFixed(q.digits),
            changePct: +(((newBid - q.low * 0.999) / newBid) * 100).toFixed(2)
          };
        });
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isSimulatingTicks]);

  // Recalculate open order floating PnL whenever quotes change
  useEffect(() => {
    setOrders((prevOrders) => {
      let updated = false;
      const nextOrders = prevOrders.map((ord) => {
        if (ord.status !== 'OPEN') return ord;
        const quote = marketQuotes.find((q) => q.symbol === ord.symbol);
        if (!quote) return ord;

        const currentPrice = ord.type === 'BUY' ? quote.bid : quote.ask;
        let pnl = 0;

        if (ord.symbol === 'EURUSD' || ord.symbol === 'GBPUSD') {
          // Standard lot: 1 lot = $10 per pip (0.0001)
          const pipDiff = (currentPrice - ord.openPrice) / quote.pipSize;
          pnl = (ord.type === 'BUY' ? pipDiff : -pipDiff) * 10 * ord.lots;
        } else if (ord.symbol === 'XAUUSD') {
          // 1 lot = 100 oz, $1 per $0.01 per lot => $100 per point
          const priceDiff = currentPrice - ord.openPrice;
          pnl = (ord.type === 'BUY' ? priceDiff : -priceDiff) * 100 * ord.lots;
        } else if (ord.symbol === 'BTCUSD') {
          const priceDiff = currentPrice - ord.openPrice;
          pnl = (ord.type === 'BUY' ? priceDiff : -priceDiff) * ord.lots;
        } else {
          // Indices US30 / NAS100: $1 per point per 1 contract/lot
          const priceDiff = currentPrice - ord.openPrice;
          pnl = (ord.type === 'BUY' ? priceDiff : -priceDiff) * ord.lots;
        }

        pnl = Math.round(pnl * 100) / 100;

        if (pnl !== ord.pnl || currentPrice !== ord.currentPrice) {
          updated = true;
          return {
            ...ord,
            currentPrice,
            pnl
          };
        }
        return ord;
      });

      return updated ? nextOrders : prevOrders;
    });
  }, [marketQuotes]);

  // Evaluate Challenge rules (Daily Loss, Max Drawdown, Profit Target) across accounts
  useEffect(() => {
    setAccounts((prevAccounts) => {
      return prevAccounts.map((acc) => {
        if (acc.status !== 'active') return acc;

        const openOrdersForAcc = orders.filter((o) => o.accountId === acc.id && o.status === 'OPEN');
        const floatingPnl = openOrdersForAcc.reduce((sum, o) => sum + o.pnl, 0);
        const equity = Math.round((acc.balance + floatingPnl) * 100) / 100;

        // Daily loss check (from start of day balance)
        const dailyDrawdown = acc.startOfDayBalance - equity;
        if (dailyDrawdown >= acc.dailyLossLimitAmount) {
          addNotification(
            'Daily Loss Limit Exceeded',
            `Account ${acc.accountNumber} breached daily loss limit ($${dailyDrawdown.toFixed(2)} / $${acc.dailyLossLimitAmount.toFixed(2)}).`,
            'alert'
          );
          return {
            ...acc,
            equity,
            status: 'failed',
            phase: 'failed',
            violationReason: `Daily Drawdown Limit Exceeded: loss reached $${dailyDrawdown.toFixed(2)} (Limit: $${acc.dailyLossLimitAmount.toFixed(2)})`
          };
        }

        // Max drawdown check (from initial balance)
        const totalDrawdown = acc.initialBalance - equity;
        if (totalDrawdown >= acc.maxDrawdownLimitAmount) {
          addNotification(
            'Maximum Drawdown Breached',
            `Account ${acc.accountNumber} breached overall drawdown limit ($${totalDrawdown.toFixed(2)} / $${acc.maxDrawdownLimitAmount.toFixed(2)}).`,
            'alert'
          );
          return {
            ...acc,
            equity,
            status: 'failed',
            phase: 'failed',
            violationReason: `Maximum Overall Drawdown Breached: total drawdown reached $${totalDrawdown.toFixed(2)} (Limit: $${acc.maxDrawdownLimitAmount.toFixed(2)})`
          };
        }

        // Profit Target check for Phase 1 & Phase 2
        if (acc.phase === 'phase-1' && acc.profitTargetAmount > 0) {
          const currentProfit = equity - acc.initialBalance;
          if (currentProfit >= acc.profitTargetAmount && acc.daysTraded >= acc.minTradingDays) {
            addNotification(
              'Phase 1 Challenge Passed!',
              `Congratulations! Account ${acc.accountNumber} has achieved the profit target with required trading days. Phase 2 unlocked!`,
              'success'
            );
            return {
              ...acc,
              equity,
              phase: 'phase-2',
              title: acc.title.replace('Phase 1', 'Phase 2'),
              profitTargetAmount: acc.initialBalance * 0.05 // Phase 2 target is 5%
            };
          }
        } else if (acc.phase === 'phase-2' && acc.profitTargetAmount > 0) {
          const currentProfit = equity - acc.initialBalance;
          if (currentProfit >= acc.profitTargetAmount && acc.daysTraded >= acc.minTradingDays) {
            addNotification(
              'Phase 2 Passed — Master Funded Account Awarded!',
              `Congratulations! Account ${acc.accountNumber} has completed evaluation. Master Funded Account granted!`,
              'success'
            );
            return {
              ...acc,
              equity,
              phase: 'funded',
              status: 'passed',
              title: `$${(acc.tierSize / 1000)}K Master Funded Account`,
              profitTargetAmount: 0 // No profit target on funded
            };
          }
        }

        return {
          ...acc,
          equity
        };
      });
    });
  }, [orders]);

  const addNotification = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'alert') => {
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title,
      message,
      type,
      timestamp: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const login = (email: string, role: UserRole = 'trader') => {
    if (role === 'admin') {
      setCurrentUser(DEFAULT_ADMIN);
      setCurrentView('admin');
      setActiveTab('overview');
    } else {
      setCurrentUser({
        ...DEFAULT_TRADER,
        email: email || DEFAULT_TRADER.email
      });
      setCurrentView('trader');
      setActiveTab('overview');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('public');
    setActiveTab('home');
  };

  const switchRole = (role: UserRole) => {
    if (role === 'admin') {
      setCurrentUser(DEFAULT_ADMIN);
      setCurrentView('admin');
      setActiveTab('overview');
    } else {
      setCurrentUser(DEFAULT_TRADER);
      setCurrentView('trader');
      setActiveTab('overview');
    }
  };

  const placeOrder = (data: {
    symbol: string;
    type: 'BUY' | 'SELL';
    lots: number;
    sl?: number;
    tp?: number;
    isLimit?: boolean;
    limitPrice?: number;
  }) => {
    if (!activeAccount) {
      return { success: false, message: 'No active account selected.' };
    }
    if (activeAccount.status !== 'active') {
      return { success: false, message: `Account is ${activeAccount.status.toUpperCase()}. Cannot place trades.` };
    }

    const quote = marketQuotes.find((q) => q.symbol === data.symbol);
    if (!quote) return { success: false, message: 'Invalid symbol quote.' };

    const price = data.isLimit && data.limitPrice
      ? data.limitPrice
      : data.type === 'BUY'
      ? quote.ask
      : quote.bid;

    const newOrder: TradeOrder = {
      id: `ord_${Date.now()}`,
      accountId: activeAccount.id,
      symbol: data.symbol,
      type: data.type,
      lots: data.lots,
      openPrice: price,
      currentPrice: price,
      sl: data.sl,
      tp: data.tp,
      pnl: 0,
      openTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: data.isLimit ? 'PENDING' : 'OPEN',
      limitPrice: data.isLimit ? data.limitPrice : undefined
    };

    setOrders((prev) => [newOrder, ...prev]);
    addNotification(
      'Order Executed (Simulated)',
      `${data.type} ${data.lots} Lots of ${data.symbol} filled @ ${price.toFixed(quote.digits)}.`,
      'info'
    );

    return { success: true, message: 'Order executed successfully.' };
  };

  const closeOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId && ord.status === 'OPEN') {
          const realizedPnl = ord.pnl;
          const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

          // Update account balance
          setAccounts((accs) =>
            accs.map((acc) => {
              if (acc.id === ord.accountId) {
                const newBal = Math.round((acc.balance + realizedPnl) * 100) / 100;
                return {
                  ...acc,
                  balance: newBal,
                  equity: newBal
                };
              }
              return acc;
            })
          );

          addNotification(
            'Position Closed',
            `${ord.symbol} ${ord.type} closed. Realized P&L: ${realizedPnl >= 0 ? '+' : ''}$${realizedPnl.toFixed(2)}.`,
            realizedPnl >= 0 ? 'success' : 'warning'
          );

          return {
            ...ord,
            status: 'CLOSED',
            closePrice: ord.currentPrice,
            closeTime: nowStr
          };
        }
        return ord;
      })
    );
  };

  const modifyOrder = (orderId: string, sl?: number, tp?: number) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            sl: sl !== undefined ? sl : ord.sl,
            tp: tp !== undefined ? tp : ord.tp
          };
        }
        return ord;
      })
    );
    addNotification('Order Modified', `SL/TP brackets updated for order #${orderId}.`, 'info');
  };

  const cancelPendingOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    addNotification('Order Cancelled', `Pending order #${orderId} was cancelled.`, 'info');
  };

  const passPhase = (accountId: string) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === accountId) {
          if (acc.phase === 'phase-1') {
            return {
              ...acc,
              phase: 'phase-2',
              title: acc.title.replace('Phase 1', 'Phase 2'),
              balance: acc.initialBalance,
              equity: acc.initialBalance,
              startOfDayBalance: acc.initialBalance,
              status: 'active',
              profitTargetAmount: acc.initialBalance * 0.05
            };
          } else {
            return {
              ...acc,
              phase: 'funded',
              title: `$${acc.tierSize / 1000}K Master Funded Account`,
              status: 'passed',
              profitTargetAmount: 0
            };
          }
        }
        return acc;
      })
    );
    addNotification('Account Promoted', `Account ${accountId} was advanced by administrator.`, 'success');
  };

  const resetAccount = (accountId: string) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === accountId) {
          return {
            ...acc,
            balance: acc.initialBalance,
            equity: acc.initialBalance,
            startOfDayBalance: acc.initialBalance,
            status: 'active',
            phase: 'phase-1',
            violationReason: undefined,
            daysTraded: 0
          };
        }
        return acc;
      })
    );
    // Close open orders for this account
    setOrders((prev) => prev.filter((o) => o.accountId !== accountId || o.status === 'CLOSED'));
    addNotification('Account Reset', `Account metrics have been reset to starting evaluation parameters.`, 'info');
  };

  const failAccount = (accountId: string, reason: string) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === accountId) {
          return {
            ...acc,
            status: 'failed',
            phase: 'failed',
            violationReason: reason
          };
        }
        return acc;
      })
    );
  };

  const purchaseChallenge = (overrideData?: Partial<CheckoutData>): TraderAccount => {
    const data = { ...checkoutData, ...overrideData };
    const tier = challengeTiers.find((t) => t.id === data.tierId) || challengeTiers[3]; // default 100k

    const randomAccNum = `RX-${Math.floor(10000 + Math.random() * 90000)}`;
    const newAccount: TraderAccount = {
      id: `acc_${Date.now()}`,
      accountNumber: randomAccNum,
      title: `${tier.label} ${data.model.toUpperCase()} Challenge`,
      tierSize: tier.size,
      initialBalance: tier.size,
      balance: tier.size,
      equity: tier.size,
      startOfDayBalance: tier.size,
      dailyLossLimitAmount: tier.size * ((tier.twoStep.dailyLossPct || 5) / 100),
      maxDrawdownLimitAmount: tier.size * ((tier.twoStep.maxDrawdownPct || 10) / 100),
      profitTargetAmount: data.model === 'instant' ? 0 : tier.size * 0.08,
      daysTraded: 0,
      minTradingDays: data.addOnNoMinDays ? 0 : 5,
      model: data.model,
      phase: data.model === 'instant' ? 'funded' : 'phase-1',
      status: 'active',
      leverage: tier.leverage,
      platform: data.platform,
      createdDate: new Date().toISOString().substring(0, 10)
    };

    setAccounts((prev) => [newAccount, ...prev]);
    setActiveAccountId(newAccount.id);

    addNotification(
      'Challenge Account Provisioned',
      `Welcome to Ryvexia! Your ${tier.label} ${data.platform} account (${randomAccNum}) is active and ready to trade.`,
      'success'
    );

    return newAccount;
  };

  const updateChallengeTier = (tierId: string, updates: Partial<ChallengeTierConfig>) => {
    setChallengeTiers((prev) =>
      prev.map((t) => (t.id === tierId ? { ...t, ...updates } : t))
    );
    addNotification('Rule Config Updated', `Evaluation rules updated for tier ${tierId}.`, 'info');
  };

  const requestReward = (amount: number, method: 'USDT' | 'USDC' | 'BANK_WIRE', addressOrIban: string) => {
    if (!activeAccount) {
      return { success: false, message: 'No active account selected.' };
    }
    const currentProfit = activeAccount.balance - activeAccount.initialBalance;
    if (currentProfit <= 0) {
      return { success: false, message: 'No net simulated profit available to request rewards from.' };
    }
    if (amount > currentProfit) {
      return { success: false, message: `Requested amount ($${amount}) exceeds available profit ($${currentProfit.toFixed(2)}).` };
    }

    const split = 85;
    const traderShare = Math.round(amount * (split / 100) * 100) / 100;

    const newReq: RewardRequest = {
      id: `rew_${Date.now()}`,
      accountId: activeAccount.id,
      traderName: currentUser?.name || 'Alex Mercer',
      traderEmail: currentUser?.email || 'trader@ryvexia.com',
      amount,
      splitPct: split,
      traderAmount: traderShare,
      method,
      addressOrIban,
      status: 'PENDING',
      date: new Date().toISOString().substring(0, 10),
      notes: 'Submitted via Trader Portal. Pending institutional desk clearance.'
    };

    setRewardRequests((prev) => [newReq, ...prev]);
    addNotification('Reward Request Submitted', `Request for $${traderShare.toFixed(2)} (${split}% split) logged for review.`, 'success');

    return { success: true, message: 'Reward request successfully submitted!' };
  };

  const approveReward = (rewardId: string, txHash?: string) => {
    const defaultTx = `0x${Math.random().toString(16).substring(2, 42)}`;
    setRewardRequests((prev) =>
      prev.map((r) =>
        r.id === rewardId
          ? {
              ...r,
              status: 'APPROVED',
              txHash: txHash || defaultTx,
              notes: 'Approved & processed by Risk Desk.'
            }
          : r
      )
    );
    addNotification('Reward Approved', `Simulated reward request #${rewardId} approved and marked paid.`, 'success');
  };

  const rejectReward = (rewardId: string, notes?: string) => {
    setRewardRequests((prev) =>
      prev.map((r) =>
        r.id === rewardId
          ? {
              ...r,
              status: 'REJECTED',
              notes: notes || 'Violated consistency or account verification rule.'
            }
          : r
      )
    );
    addNotification('Reward Rejected', `Reward request #${rewardId} was declined.`, 'warning');
  };

  const createSupportTicket = (subject: string, category: any, priority: any, initialMessage: string) => {
    const newTkt: SupportTicket = {
      id: `tkt_${Math.floor(100 + Math.random() * 900)}`,
      userEmail: currentUser?.email || 'trader@ryvexia.com',
      userName: currentUser?.name || 'Alex Mercer',
      subject,
      category,
      priority,
      status: 'OPEN',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      messages: [
        {
          id: `msg_${Date.now()}`,
          sender: 'user',
          senderName: currentUser?.name || 'Alex Mercer',
          text: initialMessage,
          time: new Date().toISOString().replace('T', ' ').substring(0, 19)
        }
      ]
    };

    setTickets((prev) => [newTkt, ...prev]);
    addNotification('Support Ticket Logged', `Ticket #${newTkt.id} dispatched to technical desk.`, 'info');
  };

  const replySupportTicket = (ticketId: string, text: string) => {
    const isDesk = currentUser?.role === 'admin';
    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: isDesk ? ('support' as const) : ('user' as const),
      senderName: currentUser?.name || (isDesk ? 'Ryvexia Compliance' : 'Trader'),
      text,
      time: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              messages: [...t.messages, newMsg],
              status: isDesk ? 'RESOLVED' : 'IN_PROGRESS'
            }
          : t
      )
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentView,
        activeTab,
        accounts,
        activeAccount,
        orders,
        marketQuotes,
        challengeTiers,
        rewardRequests,
        tickets,
        notifications,
        checkoutData,
        activeSymbol,
        isSimulatingTicks,
        setCurrentView,
        setActiveTab,
        setActiveAccountId,
        setActiveSymbol,
        setIsSimulatingTicks,
        setCheckoutData,
        login,
        logout,
        switchRole,
        placeOrder,
        closeOrder,
        modifyOrder,
        cancelPendingOrder,
        passPhase,
        resetAccount,
        failAccount,
        purchaseChallenge,
        updateChallengeTier,
        requestReward,
        approveReward,
        rejectReward,
        createSupportTicket,
        replySupportTicket,
        markNotificationRead,
        clearAllNotifications,
        addNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
