import {
  PlatformAccount,
  ContentItem,
  HeatmapCell,
  PlatformSpecificStats,
  DailyDataPoint,
} from '../types';

// Real asset paths generated in-session
export const AVATAR_IMAGE = '/src/assets/images/avatar_creator_1791038248215.jpg';
export const YT_THUMB_1 = '/src/assets/images/yt_thumb_architecture_1791038262073.jpg';
export const IG_THUMB_1 = '/src/assets/images/ig_thumb_creator_setup_1791038275567.jpg';
export const X_THUMB_1 = '/src/assets/images/x_thumb_infographic_1791038287419.jpg';

export const INITIAL_ACCOUNTS: PlatformAccount[] = [
  {
    id: 'yt-1',
    platform: 'youtube',
    username: 'alexrivera_dev',
    displayName: 'Alex Rivera Tech',
    handle: '@AlexRiveraCode',
    avatarUrl: AVATAR_IMAGE,
    connected: true,
    isDemo: true,
    lastSynced: '2 mins ago',
    syncStatus: 'idle',
    syncMessage: 'Sync complete (REST v3 API)',
    apiStatusCode: 200,
  },
  {
    id: 'ig-1',
    platform: 'instagram',
    username: 'alex.rivera.visuals',
    displayName: 'Alex Rivera | Visual Tech',
    handle: '@alex.rivera.visuals',
    avatarUrl: AVATAR_IMAGE,
    connected: true,
    isDemo: true,
    lastSynced: '15 mins ago',
    syncStatus: 'idle',
    syncMessage: 'Sync complete (Graph API v19.0)',
    apiStatusCode: 200,
  },
  {
    id: 'x-1',
    platform: 'x',
    username: 'alexrivera_x',
    displayName: 'Alex Rivera',
    handle: '@alexrivera_x',
    avatarUrl: AVATAR_IMAGE,
    connected: true,
    isDemo: true,
    lastSynced: '4 mins ago',
    syncStatus: 'idle',
    syncMessage: 'Sync complete (X API v2)',
    apiStatusCode: 200,
  },
];

export const INITIAL_PLATFORM_STATS: PlatformSpecificStats = {
  youtube: {
    subscribers: 84250,
    totalViews: 1420000,
    watchTimeHours: 68420,
    topVideoTitle: 'Building Enterprise System Architecture in 2026',
    topVideoViews: 184500,
    subscriberGrowthPercent: 6.8,
  },
  instagram: {
    followers: 31840,
    reach: 642000,
    likes: 48000,
    comments: 3420,
    topReelTitle: 'Minimalist Workspace Tour & Ergonomic Setup',
    topReelInteractions: 24900,
    interactionRate: 7.9,
  },
  x: {
    followers: 12670,
    impressions: 218000,
    likes: 14000,
    reposts: 2890,
    replies: 1650,
    topPostSnippet: 'Why unified analytics beat opening 5 tabs every morning (Thread)',
  },
};

export const INITIAL_CONTENT_ITEMS: ContentItem[] = [
  {
    id: 'cnt-1',
    platform: 'youtube',
    title: 'Building Enterprise System Architecture in 2026: End-to-End Deep Dive',
    type: 'video',
    publishedAt: '2 days ago',
    thumbnailUrl: YT_THUMB_1,
    views: 184500,
    likes: 12400,
    comments: 890,
    shares: 1420,
    engagementRate: 7.9,
    performanceLabel: 'High Reach',
    url: 'https://youtube.com',
  },
  {
    id: 'cnt-2',
    platform: 'instagram',
    title: 'Desk aesthetics & productivity stack: Behind the scenes of my workspace',
    type: 'reel',
    publishedAt: '3 days ago',
    thumbnailUrl: IG_THUMB_1,
    views: 142800,
    likes: 18900,
    comments: 1240,
    shares: 3100,
    engagementRate: 16.2,
    performanceLabel: 'High Engagement',
    url: 'https://instagram.com',
  },
  {
    id: 'cnt-3',
    platform: 'x',
    title: 'The state of developer tooling & social data pipelines in 2026. A breakdown of API rate limits, webhooks, and cache strategies.',
    type: 'thread',
    publishedAt: '4 days ago',
    thumbnailUrl: X_THUMB_1,
    views: 68400,
    likes: 4320,
    comments: 540,
    shares: 980,
    engagementRate: 8.5,
    performanceLabel: 'Growing',
    url: 'https://x.com',
  },
  {
    id: 'cnt-4',
    platform: 'youtube',
    title: 'Micro-Frontend Orchestration: When to use it and when to stay monolithic',
    type: 'short',
    publishedAt: '5 days ago',
    thumbnailUrl: YT_THUMB_1,
    views: 92400,
    likes: 7800,
    comments: 420,
    shares: 610,
    engagementRate: 9.6,
    performanceLabel: 'High Engagement',
    url: 'https://youtube.com',
  },
  {
    id: 'cnt-5',
    platform: 'instagram',
    title: 'Weekend code sprints vs structured deep work — which model scales sustainable output?',
    type: 'post',
    publishedAt: '6 days ago',
    thumbnailUrl: IG_THUMB_1,
    views: 38200,
    likes: 2940,
    comments: 180,
    shares: 240,
    engagementRate: 8.8,
    performanceLabel: 'Growing',
    url: 'https://instagram.com',
  },
  {
    id: 'cnt-6',
    platform: 'x',
    title: 'Quick poll: Do you prefer real-time WebSocket dashboards or 60-second polling for social analytics?',
    type: 'post',
    publishedAt: '1 week ago',
    thumbnailUrl: X_THUMB_1,
    views: 24100,
    likes: 890,
    comments: 310,
    shares: 95,
    engagementRate: 5.4,
    performanceLabel: 'Underperforming',
    url: 'https://x.com',
  },
  {
    id: 'cnt-7',
    platform: 'youtube',
    title: 'Tailwind CSS v4 & Modern Layout Math: A Senior Engineer Guide',
    type: 'video',
    publishedAt: '10 days ago',
    thumbnailUrl: YT_THUMB_1,
    views: 121000,
    likes: 9800,
    comments: 630,
    shares: 1100,
    engagementRate: 9.5,
    performanceLabel: 'High Reach',
    url: 'https://youtube.com',
  },
  {
    id: 'cnt-8',
    platform: 'instagram',
    title: '5 ergonomic monitor mounting hacks that actually saved my neck after 12h sessions',
    type: 'reel',
    publishedAt: '12 days ago',
    thumbnailUrl: IG_THUMB_1,
    views: 89000,
    likes: 9200,
    comments: 540,
    shares: 1680,
    engagementRate: 12.8,
    performanceLabel: 'High Engagement',
    url: 'https://instagram.com',
  },
];

// Generate consistent daily historical data points going back up to 365 days
export function generateDailyHistory(daysCount: number = 365): Record<string, DailyDataPoint[]> {
  const result: Record<string, DailyDataPoint[]> = {
    youtube: [],
    instagram: [],
    x: [],
    unified: [],
  };

  const now = new Date();
  
  // Base numbers 365 days ago
  let ytSubs = 62000;
  let ytViews = 820000;
  let ytLikes = 49000;
  let ytComments = 12000;

  let igFollowers = 21000;
  let igViews = 380000;
  let igLikes = 28000;
  let igComments = 8000;

  let xFollowers = 8400;
  let xViews = 110000;
  let xLikes = 7500;
  let xComments = 2900;

  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0];
    const timestamp = d.getTime();

    // Deterministic pseudo-random variation
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const boost = isWeekend ? 1.3 : 1.0;
    const wave = Math.sin(i * 0.15);

    // Incremental growth
    const ytSubDelta = Math.floor((45 + wave * 15 + Math.cos(i * 0.3) * 10) * boost);
    const ytViewDelta = Math.floor((1400 + wave * 400 + Math.random() * 300) * boost);
    const ytLikeDelta = Math.floor((90 + wave * 30 + Math.random() * 20) * boost);
    const ytCommentDelta = Math.floor((20 + wave * 8 + Math.random() * 6) * boost);

    ytSubs += ytSubDelta;
    ytViews += ytViewDelta;
    ytLikes += ytLikeDelta;
    ytComments += ytCommentDelta;

    const igFollowerDelta = Math.floor((24 + wave * 8 + Math.cos(i * 0.2) * 5) * boost);
    const igViewDelta = Math.floor((650 + wave * 220 + Math.random() * 150) * boost);
    const igLikeDelta = Math.floor((55 + wave * 18 + Math.random() * 14) * boost);
    const igCommentDelta = Math.floor((14 + wave * 5 + Math.random() * 4) * boost);

    igFollowers += igFollowerDelta;
    igViews += igViewDelta;
    igLikes += igLikeDelta;
    igComments += igCommentDelta;

    const xFollowerDelta = Math.floor((10 + wave * 4 + Math.cos(i * 0.4) * 3) * boost);
    const xViewDelta = Math.floor((280 + wave * 90 + Math.random() * 60) * boost);
    const xLikeDelta = Math.floor((18 + wave * 7 + Math.random() * 6) * boost);
    const xCommentDelta = Math.floor((8 + wave * 3 + Math.random() * 3) * boost);

    xFollowers += xFollowerDelta;
    xViews += xViewDelta;
    xLikes += xLikeDelta;
    xComments += xCommentDelta;

    const ytEng = Number(((ytLikeDelta + ytCommentDelta) / Math.max(1, ytViewDelta) * 100).toFixed(2));
    const igEng = Number(((igLikeDelta + igCommentDelta) / Math.max(1, igViewDelta) * 100).toFixed(2));
    const xEng = Number(((xLikeDelta + xCommentDelta) / Math.max(1, xViewDelta) * 100).toFixed(2));

    const ytPoint: DailyDataPoint = {
      date: dateStr,
      timestamp,
      followers: ytSubs,
      views: ytViewDelta,
      likes: ytLikeDelta,
      comments: ytCommentDelta,
      engagementRate: ytEng,
    };

    const igPoint: DailyDataPoint = {
      date: dateStr,
      timestamp,
      followers: igFollowers,
      views: igViewDelta,
      likes: igLikeDelta,
      comments: igCommentDelta,
      engagementRate: igEng,
    };

    const xPoint: DailyDataPoint = {
      date: dateStr,
      timestamp,
      followers: xFollowers,
      views: xViewDelta,
      likes: xLikeDelta,
      comments: xCommentDelta,
      engagementRate: xEng,
    };

    const totalViews = ytViewDelta + igViewDelta + xViewDelta;
    const totalInteractions = ytLikeDelta + ytCommentDelta + igLikeDelta + igCommentDelta + xLikeDelta + xCommentDelta;
    const unifiedEng = Number((totalInteractions / Math.max(1, totalViews) * 100).toFixed(2));

    const unifiedPoint: DailyDataPoint = {
      date: dateStr,
      timestamp,
      followers: ytSubs + igFollowers + xFollowers,
      views: totalViews,
      likes: ytLikeDelta + igLikeDelta + xLikeDelta,
      comments: ytCommentDelta + igCommentDelta + xCommentDelta,
      engagementRate: unifiedEng,
    };

    result.youtube.push(ytPoint);
    result.instagram.push(igPoint);
    result.x.push(xPoint);
    result.unified.push(unifiedPoint);
  }

  return result;
}

export const HEATMAP_RAW_DATA: HeatmapCell[] = [
  // Monday
  { dayIndex: 0, dayName: 'Monday', slot: 'morning', likes: 1420, comments: 230, views: 18400, engagementScore: 42 },
  { dayIndex: 0, dayName: 'Monday', slot: 'afternoon', likes: 2890, comments: 410, views: 32000, engagementScore: 68 },
  { dayIndex: 0, dayName: 'Monday', slot: 'evening', likes: 4120, comments: 650, views: 49000, engagementScore: 88 },
  { dayIndex: 0, dayName: 'Monday', slot: 'night', likes: 1980, comments: 190, views: 22000, engagementScore: 50 },

  // Tuesday
  { dayIndex: 1, dayName: 'Tuesday', slot: 'morning', likes: 1890, comments: 290, views: 21000, engagementScore: 52 },
  { dayIndex: 1, dayName: 'Tuesday', slot: 'afternoon', likes: 3410, comments: 480, views: 39000, engagementScore: 76 },
  { dayIndex: 1, dayName: 'Tuesday', slot: 'evening', likes: 4680, comments: 740, views: 56000, engagementScore: 94 },
  { dayIndex: 1, dayName: 'Tuesday', slot: 'night', likes: 2150, comments: 240, views: 26000, engagementScore: 56 },

  // Wednesday
  { dayIndex: 2, dayName: 'Wednesday', slot: 'morning', likes: 1720, comments: 260, views: 20000, engagementScore: 48 },
  { dayIndex: 2, dayName: 'Wednesday', slot: 'afternoon', likes: 3650, comments: 530, views: 42000, engagementScore: 82 },
  { dayIndex: 2, dayName: 'Wednesday', slot: 'evening', likes: 5120, comments: 880, views: 61000, engagementScore: 98 },
  { dayIndex: 2, dayName: 'Wednesday', slot: 'night', likes: 2400, comments: 270, views: 29000, engagementScore: 60 },

  // Thursday
  { dayIndex: 3, dayName: 'Thursday', slot: 'morning', likes: 2100, comments: 340, views: 24000, engagementScore: 58 },
  { dayIndex: 3, dayName: 'Thursday', slot: 'afternoon', likes: 3900, comments: 590, views: 46000, engagementScore: 86 },
  { dayIndex: 3, dayName: 'Thursday', slot: 'evening', likes: 4980, comments: 820, views: 58000, engagementScore: 92 },
  { dayIndex: 3, dayName: 'Thursday', slot: 'night', likes: 2300, comments: 260, views: 27000, engagementScore: 58 },

  // Friday
  { dayIndex: 4, dayName: 'Friday', slot: 'morning', likes: 1950, comments: 310, views: 23000, engagementScore: 54 },
  { dayIndex: 4, dayName: 'Friday', slot: 'afternoon', likes: 4200, comments: 680, views: 51000, engagementScore: 91 },
  { dayIndex: 4, dayName: 'Friday', slot: 'evening', likes: 5400, comments: 920, views: 67000, engagementScore: 100 },
  { dayIndex: 4, dayName: 'Friday', slot: 'night', likes: 3100, comments: 410, views: 38000, engagementScore: 72 },

  // Saturday
  { dayIndex: 5, dayName: 'Saturday', slot: 'morning', likes: 2800, comments: 420, views: 34000, engagementScore: 70 },
  { dayIndex: 5, dayName: 'Saturday', slot: 'afternoon', likes: 4600, comments: 750, views: 57000, engagementScore: 93 },
  { dayIndex: 5, dayName: 'Saturday', slot: 'evening', likes: 4800, comments: 790, views: 59000, engagementScore: 90 },
  { dayIndex: 5, dayName: 'Saturday', slot: 'night', likes: 3400, comments: 450, views: 41000, engagementScore: 75 },

  // Sunday
  { dayIndex: 6, dayName: 'Sunday', slot: 'morning', likes: 3100, comments: 490, views: 37000, engagementScore: 74 },
  { dayIndex: 6, dayName: 'Sunday', slot: 'afternoon', likes: 4900, comments: 810, views: 60000, engagementScore: 96 },
  { dayIndex: 6, dayName: 'Sunday', slot: 'evening', likes: 4300, comments: 690, views: 53000, engagementScore: 84 },
  { dayIndex: 6, dayName: 'Sunday', slot: 'night', likes: 2100, comments: 230, views: 25000, engagementScore: 51 },
];
