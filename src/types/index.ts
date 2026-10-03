export type Platform = 'youtube' | 'instagram' | 'x';

export type DateRange = '7d' | '30d' | '90d' | '1y';

export type MetricType = 'followers' | 'views' | 'likes' | 'comments' | 'engagement';

export interface PlatformAccount {
  id: string;
  platform: Platform;
  username: string;
  displayName: string;
  avatarUrl: string;
  handle: string;
  connected: boolean;
  isDemo: boolean;
  lastSynced: string;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error' | 'rate_limited';
  syncMessage?: string;
  apiStatusCode: number;
}

export interface MetricSummary {
  current: number;
  previous: number;
  changePercent: number;
}

export interface DailyDataPoint {
  date: string;
  timestamp: number;
  followers: number;
  views: number;
  likes: number;
  comments: number;
  engagementRate: number;
}

export interface ContentItem {
  id: string;
  platform: Platform;
  title: string;
  type: 'video' | 'post' | 'reel' | 'short' | 'thread';
  publishedAt: string;
  thumbnailUrl: string;
  views: number;
  likes: number;
  comments: number;
  shares?: number;
  engagementRate: number;
  performanceLabel: 'High Engagement' | 'High Reach' | 'Growing' | 'Underperforming';
  url: string;
}

export type HeatmapSlot = 'morning' | 'afternoon' | 'evening' | 'night';

export interface HeatmapCell {
  dayIndex: number; // 0 = Mon, 6 = Sun
  dayName: string;
  slot: HeatmapSlot;
  likes: number;
  comments: number;
  views: number;
  engagementScore: number; // 0 - 100
}

export interface CalculatedInsight {
  id: string;
  title: string;
  description: string;
  type: 'growth' | 'engagement' | 'content' | 'anomaly';
  metricsBasis: string;
  platform?: Platform | 'unified';
  trend: 'positive' | 'negative' | 'neutral';
}

export interface PlatformSpecificStats {
  youtube: {
    subscribers: number;
    totalViews: number;
    watchTimeHours: number;
    topVideoTitle: string;
    topVideoViews: number;
    subscriberGrowthPercent: number;
  };
  instagram: {
    followers: number;
    reach: number;
    likes: number;
    comments: number;
    topReelTitle: string;
    topReelInteractions: number;
    interactionRate: number;
  };
  x: {
    followers: number;
    impressions: number;
    likes: number;
    reposts: number;
    replies: number;
    topPostSnippet: string;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  platform?: Platform;
  type: 'info' | 'success' | 'warning';
}
