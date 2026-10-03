import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocial } from '../../context/SocialContext';
import { formatCompactNumber, formatPercent } from '../../utils/analytics';
import {
  Youtube,
  Instagram,
  Twitter,
  RotateCw,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Platform } from '../../types';

export const PlatformCards: React.FC = () => {
  const { accounts, platformStats, syncPlatform, isSyncing } = useSocial();
  const navigate = useNavigate();

  const getAccount = (platform: Platform) => accounts.find((a) => a.platform === platform);

  const ytAccount = getAccount('youtube');
  const igAccount = getAccount('instagram');
  const xAccount = getAccount('x');

  const ytStats = platformStats?.youtube;
  const igStats = platformStats?.instagram;
  const xStats = platformStats?.x;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 1. YouTube Card */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
        {/* Subtle Platform Brand Accent Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />

        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-600">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  YouTube Studio
                </h3>
                <span className="text-xs text-neutral-400 font-mono">
                  {ytAccount?.handle || '@AlexRiveraCode'}
                </span>
              </div>
            </div>

            {/* Sync Status Badge */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-neutral-500 dark:text-neutral-400">
                {ytAccount?.connected ? 'Live Feed' : 'Disconnected'}
              </span>
            </div>
          </div>

          {/* Primary Metric: Subscribers & Views */}
          <div className="grid grid-cols-2 gap-4 my-5">
            <div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Subscribers</span>
              <div className="text-2xl font-bold font-mono tracking-tight tabular-nums text-neutral-900 dark:text-white mt-0.5">
                {formatCompactNumber(ytStats?.subscribers || 84250)}
              </div>
              <div className="text-[11px] text-emerald-500 font-mono font-medium mt-0.5">
                {formatPercent(ytStats?.subscriberGrowthPercent || 6.8)} MoM
              </div>
            </div>

            <div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Watch Time</span>
              <div className="text-2xl font-bold font-mono tracking-tight tabular-nums text-neutral-900 dark:text-white mt-0.5">
                {formatCompactNumber(ytStats?.watchTimeHours || 68420)}
                <span className="text-xs font-normal text-neutral-400 ml-1">hrs</span>
              </div>
              <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                {formatCompactNumber(ytStats?.totalViews || 1420000)} total views
              </div>
            </div>
          </div>

          {/* Top Video Feature Box */}
          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 text-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              Top Video (Past 30 Days)
            </span>
            <div className="font-medium text-neutral-900 dark:text-neutral-100 truncate mt-1">
              {ytStats?.topVideoTitle}
            </div>
            <div className="text-[11px] font-mono text-neutral-500 mt-1">
              {formatCompactNumber(ytStats?.topVideoViews || 184500)} views · 98.4% retention
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 mt-5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[11px]">
            <Clock className="w-3 h-3" />
            <span>Sync: {ytAccount?.lastSynced || '2m ago'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => syncPlatform('youtube')}
              disabled={isSyncing}
              className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              title="Refresh YouTube API feed"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/analytics?platform=youtube')}
              className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400 hover:underline"
            >
              <span>Deep View</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Instagram Card */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
        {/* Subtle Platform Brand Accent Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600" />

        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Instagram Professional
                </h3>
                <span className="text-xs text-neutral-400 font-mono">
                  {igAccount?.handle || '@alex.rivera.visuals'}
                </span>
              </div>
            </div>

            {/* Sync Status Badge */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-neutral-500 dark:text-neutral-400">
                {igAccount?.connected ? 'Live Feed' : 'Disconnected'}
              </span>
            </div>
          </div>

          {/* Primary Metric: Followers & Reach */}
          <div className="grid grid-cols-2 gap-4 my-5">
            <div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Followers</span>
              <div className="text-2xl font-bold font-mono tracking-tight tabular-nums text-neutral-900 dark:text-white mt-0.5">
                {formatCompactNumber(igStats?.followers || 31840)}
              </div>
              <div className="text-[11px] text-emerald-500 font-mono font-medium mt-0.5">
                +9.4% MoM
              </div>
            </div>

            <div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Accounts Reached</span>
              <div className="text-2xl font-bold font-mono tracking-tight tabular-nums text-neutral-900 dark:text-white mt-0.5">
                {formatCompactNumber(igStats?.reach || 642000)}
              </div>
              <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                {formatCompactNumber(igStats?.likes || 48000)} likes · {formatCompactNumber(igStats?.comments || 3420)} cmts
              </div>
            </div>
          </div>

          {/* Top Reel Feature Box */}
          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 text-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              Top Reel Resonance
            </span>
            <div className="font-medium text-neutral-900 dark:text-neutral-100 truncate mt-1">
              {igStats?.topReelTitle}
            </div>
            <div className="text-[11px] font-mono text-neutral-500 mt-1">
              {formatCompactNumber(igStats?.topReelInteractions || 24900)} interactions · 16.2% eng
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 mt-5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[11px]">
            <Clock className="w-3 h-3" />
            <span>Sync: {igAccount?.lastSynced || '15m ago'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => syncPlatform('instagram')}
              disabled={isSyncing}
              className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              title="Refresh Instagram API feed"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/analytics?platform=instagram')}
              className="flex items-center gap-1 text-xs font-medium text-pink-600 dark:text-pink-400 hover:underline"
            >
              <span>Deep View</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. X (Twitter) Card */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
        {/* Subtle Platform Brand Accent Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-sky-500" />

        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Twitter className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  X Analytics
                </h3>
                <span className="text-xs text-neutral-400 font-mono">
                  {xAccount?.handle || '@alexrivera_x'}
                </span>
              </div>
            </div>

            {/* Sync Status Badge */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-neutral-500 dark:text-neutral-400">
                {xAccount?.connected ? 'Live Feed' : 'Disconnected'}
              </span>
            </div>
          </div>

          {/* Primary Metric: Followers & Impressions */}
          <div className="grid grid-cols-2 gap-4 my-5">
            <div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Followers</span>
              <div className="text-2xl font-bold font-mono tracking-tight tabular-nums text-neutral-900 dark:text-white mt-0.5">
                {formatCompactNumber(xStats?.followers || 12670)}
              </div>
              <div className="text-[11px] text-emerald-500 font-mono font-medium mt-0.5">
                +4.2% MoM
              </div>
            </div>

            <div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Impressions</span>
              <div className="text-2xl font-bold font-mono tracking-tight tabular-nums text-neutral-900 dark:text-white mt-0.5">
                {formatCompactNumber(xStats?.impressions || 218000)}
              </div>
              <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                {formatCompactNumber(xStats?.reposts || 2890)} reposts · {formatCompactNumber(xStats?.replies || 1650)} replies
              </div>
            </div>
          </div>

          {/* Top Post Feature Box */}
          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 text-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              Top Thread Resonance
            </span>
            <div className="font-medium text-neutral-900 dark:text-neutral-100 truncate mt-1">
              "{xStats?.topPostSnippet}"
            </div>
            <div className="text-[11px] font-mono text-neutral-500 mt-1">
              68.4K impressions · 4,320 likes · 980 reposts
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 mt-5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[11px]">
            <Clock className="w-3 h-3" />
            <span>Sync: {xAccount?.lastSynced || '4m ago'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => syncPlatform('x')}
              disabled={isSyncing}
              className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              title="Refresh X API feed"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/analytics?platform=x')}
              className="flex items-center gap-1 text-xs font-medium text-sky-500 hover:underline"
            >
              <span>Deep View</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
