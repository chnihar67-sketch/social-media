import {
  Platform,
  DateRange,
  PlatformAccount,
  ContentItem,
  DailyDataPoint,
  HeatmapCell,
  PlatformSpecificStats,
} from '../types';
import {
  INITIAL_ACCOUNTS,
  INITIAL_CONTENT_ITEMS,
  INITIAL_PLATFORM_STATS,
  HEATMAP_RAW_DATA,
  generateDailyHistory,
} from '../data/mockData';
import { sliceHistoryByRange } from '../utils/analytics';

/**
 * SocialPlatformService
 *
 * Provides a clean REST API abstraction for social network platforms.
 * In production, each method maps to its respective platform API:
 *  - YouTube: Google YouTube Data API v3 (/channels, /videos, /reports)
 *  - Instagram: Meta Graph API v19.0 (/me/insights, /media)
 *  - X: Twitter Developer API v2 (/users/by/username, /tweets/search)
 *
 * Current implementation provides realistic asynchronous behavior, latency,
 * and rate-limit simulation with comprehensive demo fallback.
 */

export interface ISocialPlatformService {
  getAccounts(): Promise<PlatformAccount[]>;
  getDailyHistory(range: DateRange): Promise<Record<string, DailyDataPoint[]>>;
  getContent(filterPlatform?: Platform): Promise<ContentItem[]>;
  getAudienceActivity(): Promise<HeatmapCell[]>;
  getPlatformStats(): Promise<PlatformSpecificStats>;
  syncPlatform(platform: Platform): Promise<{ success: boolean; message: string; statusCode: number }>;
  connectAccount(platform: Platform, authCode?: string): Promise<PlatformAccount>;
  disconnectAccount(platform: Platform): Promise<boolean>;
}

class SocialPlatformService implements ISocialPlatformService {
  private historyCache: Record<string, DailyDataPoint[]> = generateDailyHistory(365);
  private accounts: PlatformAccount[] = [...INITIAL_ACCOUNTS];
  private content: ContentItem[] = [...INITIAL_CONTENT_ITEMS];
  private stats: PlatformSpecificStats = { ...INITIAL_PLATFORM_STATS };

  // Simulated network latency helper
  private async delay(ms: number = 350): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getAccounts(): Promise<PlatformAccount[]> {
    await this.delay(200);
    return JSON.parse(JSON.stringify(this.accounts));
  }

  async getDailyHistory(range: DateRange): Promise<Record<string, DailyDataPoint[]>> {
    await this.delay(300);
    return {
      youtube: sliceHistoryByRange(this.historyCache.youtube, range),
      instagram: sliceHistoryByRange(this.historyCache.instagram, range),
      x: sliceHistoryByRange(this.historyCache.x, range),
      unified: sliceHistoryByRange(this.historyCache.unified, range),
    };
  }

  async getContent(filterPlatform?: Platform): Promise<ContentItem[]> {
    await this.delay(250);
    if (!filterPlatform || filterPlatform === ('all' as any)) {
      return [...this.content];
    }
    return this.content.filter((item) => item.platform === filterPlatform);
  }

  async getAudienceActivity(): Promise<HeatmapCell[]> {
    await this.delay(200);
    return [...HEATMAP_RAW_DATA];
  }

  async getPlatformStats(): Promise<PlatformSpecificStats> {
    await this.delay(200);
    return JSON.parse(JSON.stringify(this.stats));
  }

  async syncPlatform(platform: Platform): Promise<{ success: boolean; message: string; statusCode: number }> {
    await this.delay(650);

    const account = this.accounts.find((a) => a.platform === platform);
    if (!account) {
      return { success: false, message: 'Account not found', statusCode: 404 };
    }

    if (!account.connected) {
      return { success: false, message: 'Account is disconnected. Please re-authenticate.', statusCode: 401 };
    }

    account.lastSynced = 'Just now';
    account.syncStatus = 'success';
    account.apiStatusCode = 200;
    account.syncMessage = 'Sync successful. Up-to-date.';

    return {
      success: true,
      message: `${platform.toUpperCase()} API response 200 OK. Synced fresh telemetry.`,
      statusCode: 200,
    };
  }

  async connectAccount(platform: Platform, _authCode?: string): Promise<PlatformAccount> {
    await this.delay(700);

    let account = this.accounts.find((a) => a.platform === platform);
    if (!account) {
      account = {
        id: `${platform}-new`,
        platform,
        username: `alex.${platform}.creator`,
        displayName: `Alex Rivera (${platform.toUpperCase()})`,
        handle: `@alex_${platform}`,
        avatarUrl: '/src/assets/images/avatar_creator_1791038248215.jpg',
        connected: true,
        isDemo: true,
        lastSynced: 'Just now',
        syncStatus: 'success',
        syncMessage: 'OAuth token handshake confirmed',
        apiStatusCode: 200,
      };
      this.accounts.push(account);
    } else {
      account.connected = true;
      account.lastSynced = 'Just now';
      account.syncStatus = 'success';
      account.apiStatusCode = 200;
    }

    return { ...account };
  }

  async disconnectAccount(platform: Platform): Promise<boolean> {
    await this.delay(300);
    const account = this.accounts.find((a) => a.platform === platform);
    if (account) {
      account.connected = false;
      account.syncStatus = 'idle';
      account.syncMessage = 'Disconnected';
      return true;
    }
    return false;
  }
}

export const socialService = new SocialPlatformService();
