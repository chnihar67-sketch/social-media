import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Platform,
  DateRange,
  PlatformAccount,
  ContentItem,
  DailyDataPoint,
  HeatmapCell,
  PlatformSpecificStats,
  CalculatedInsight,
  NotificationItem,
} from '../types';
import { socialService } from '../services/socialApi';
import {
  calculateSummaryMetrics,
  generateMathematicalInsights,
} from '../utils/analytics';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface SocialContextType {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  toggleTheme: () => void;
  
  // Accounts & Status
  accounts: PlatformAccount[];
  activeAccountsCount: number;
  connectPlatform: (platform: Platform) => Promise<void>;
  disconnectPlatform: (platform: Platform) => Promise<void>;
  syncPlatform: (platform: Platform) => Promise<void>;
  syncAll: () => Promise<void>;
  isSyncing: boolean;

  // Data
  history: Record<string, DailyDataPoint[]>;
  summaryMetrics: ReturnType<typeof calculateSummaryMetrics>;
  contentItems: ContentItem[];
  heatmapData: HeatmapCell[];
  platformStats: PlatformSpecificStats | null;
  insights: CalculatedInsight[];
  isLoading: boolean;

  // Error simulation for demonstration
  simulatedErrorMode: 'none' | 'rate_limit' | 'api_failure';
  setSimulatedErrorMode: (mode: 'none' | 'rate_limit' | 'api_failure') => void;

  // Notifications & Toasts
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  unreadNotificationsCount: number;
  toasts: Toast[];
  dismissToast: (id: string) => void;
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [accounts, setAccounts] = useState<PlatformAccount[]>([]);
  const [history, setHistory] = useState<Record<string, DailyDataPoint[]>>({
    youtube: [],
    instagram: [],
    x: [],
    unified: [],
  });
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [heatmapData, setHeatmapData] = useState<HeatmapCell[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformSpecificStats | null>(null);

  const [simulatedErrorMode, setSimulatedErrorMode] = useState<'none' | 'rate_limit' | 'api_failure'>('none');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'YouTube Sync Verified',
      description: 'REST v3 endpoint returned 200 OK. 184.5K view delta logged.',
      timestamp: '2 mins ago',
      read: false,
      platform: 'youtube',
      type: 'success',
    },
    {
      id: 'notif-2',
      title: 'High Engagement Alert',
      description: 'Your Instagram Reel reached 16.2% engagement, outperforming your 30-day baseline by 2.1x.',
      timestamp: '1 hour ago',
      read: false,
      platform: 'instagram',
      type: 'info',
    },
    {
      id: 'notif-3',
      title: 'Weekly Report Ready',
      description: 'Consolidated performance overview generated. Total reach increased +14.2%.',
      timestamp: '5 hours ago',
      read: true,
      type: 'info',
    },
  ]);

  const addToast = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  }, []);

  // Fetch all initial data
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [accs, hist, cnt, hm, stats] = await Promise.all([
        socialService.getAccounts(),
        socialService.getDailyHistory(dateRange),
        socialService.getContent(),
        socialService.getAudienceActivity(),
        socialService.getPlatformStats(),
      ]);

      setAccounts(accs);
      setHistory(hist);
      setContentItems(cnt);
      setHeatmapData(hm);
      setPlatformStats(stats);
    } catch {
      addToast('error', 'Failed to synchronize social telemetry.');
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, addToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Sync single platform
  const syncPlatform = useCallback(
    async (platform: Platform) => {
      setIsSyncing(true);
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.platform === platform ? { ...acc, syncStatus: 'syncing' } : acc
        )
      );

      try {
        if (simulatedErrorMode === 'rate_limit') {
          await new Promise((r) => setTimeout(r, 600));
          setAccounts((prev) =>
            prev.map((acc) =>
              acc.platform === platform
                ? {
                    ...acc,
                    syncStatus: 'rate_limited',
                    apiStatusCode: 429,
                    syncMessage: 'Platform API rate limit reached (HTTP 429). Using cached snapshot.',
                  }
                : acc
            )
          );
          addToast('error', `${platform.toUpperCase()} API limit reached (429). Showing cached snapshot.`);
          return;
        }

        if (simulatedErrorMode === 'api_failure') {
          await new Promise((r) => setTimeout(r, 600));
          setAccounts((prev) =>
            prev.map((acc) =>
              acc.platform === platform
                ? {
                    ...acc,
                    syncStatus: 'error',
                    apiStatusCode: 503,
                    syncMessage: 'Service Unavailable (HTTP 503). Retrying in backoff.',
                  }
                : acc
            )
          );
          addToast('error', `Unable to retrieve ${platform.toUpperCase()} data (503 Service Unavailable).`);
          return;
        }

        const res = await socialService.syncPlatform(platform);
        if (res.success) {
          setAccounts((prev) =>
            prev.map((acc) =>
              acc.platform === platform
                ? {
                    ...acc,
                    syncStatus: 'success',
                    lastSynced: 'Just now',
                    apiStatusCode: 200,
                    syncMessage: 'REST endpoint synchronized successfully (200 OK)',
                  }
                : acc
            )
          );
          addToast('success', `${platform.toUpperCase()} synchronized successfully.`);
        }
      } finally {
        setIsSyncing(false);
      }
    },
    [simulatedErrorMode, addToast]
  );

  // Sync all connected platforms
  const syncAll = useCallback(async () => {
    setIsSyncing(true);
    addToast('info', 'Syncing all connected social telemetry...');
    try {
      const connectedPlatforms = accounts
        .filter((a) => a.connected)
        .map((a) => a.platform);
      
      for (const p of connectedPlatforms) {
        await syncPlatform(p);
      }
      // Re-fetch daily history
      const freshHistory = await socialService.getDailyHistory(dateRange);
      setHistory(freshHistory);
      addToast('success', 'All channels updated with live telemetry.');
    } finally {
      setIsSyncing(false);
    }
  }, [accounts, dateRange, syncPlatform, addToast]);

  const connectPlatform = useCallback(
    async (platform: Platform) => {
      try {
        const updated = await socialService.connectAccount(platform);
        setAccounts((prev) => {
          const exists = prev.some((a) => a.platform === platform);
          if (exists) {
            return prev.map((a) => (a.platform === platform ? updated : a));
          }
          return [...prev, updated];
        });
        addToast('success', `Connected ${platform.toUpperCase()} account successfully.`);
      } catch {
        addToast('error', `Failed to connect ${platform.toUpperCase()}.`);
      }
    },
    [addToast]
  );

  const disconnectPlatform = useCallback(
    async (platform: Platform) => {
      try {
        await socialService.disconnectAccount(platform);
        setAccounts((prev) =>
          prev.map((a) => (a.platform === platform ? { ...a, connected: false } : a))
        );
        addToast('info', `Disconnected ${platform.toUpperCase()} account.`);
      } catch {
        addToast('error', `Failed to disconnect ${platform.toUpperCase()}.`);
      }
    },
    [addToast]
  );

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const activeAccountsCount = accounts.filter((a) => a.connected).length;
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const summaryMetrics = calculateSummaryMetrics(
    history.unified.length > 0 ? history.unified : [],
    dateRange
  );

  const insights = platformStats
    ? generateMathematicalInsights(history, dateRange, platformStats)
    : [];

  return (
    <SocialContext.Provider
      value={{
        dateRange,
        setDateRange,
        isDemoMode,
        setIsDemoMode,
        theme,
        setTheme,
        toggleTheme,
        accounts,
        activeAccountsCount,
        connectPlatform,
        disconnectPlatform,
        syncPlatform,
        syncAll,
        isSyncing,
        history,
        summaryMetrics,
        contentItems,
        heatmapData,
        platformStats,
        insights,
        isLoading,
        simulatedErrorMode,
        setSimulatedErrorMode,
        notifications,
        markNotificationRead,
        unreadNotificationsCount,
        toasts,
        dismissToast,
        addToast,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};
