import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { formatCompactNumber, formatPercent } from '../../utils/analytics';
import { PulseRing } from '../layout/PulseRing';
import { Users, Eye, Heart, MessageSquare, TrendingUp, Layers } from 'lucide-react';

export const UnifiedPulse: React.FC = () => {
  const { summaryMetrics, activeAccountsCount, dateRange } = useSocial();

  const rangeLabelMap: Record<string, string> = {
    '7d': 'vs previous 7 days',
    '30d': 'vs previous 30 days',
    '90d': 'vs previous quarter',
    '1y': 'vs previous year',
  };

  const periodComparison = rangeLabelMap[dateRange] || 'vs previous period';

  return (
    <section className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 sm:p-7 shadow-xs">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100 dark:border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Unified Social Pulse
            </h1>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              · {periodComparison}
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Aggregated cross-platform intelligence across YouTube, Instagram, and X
          </p>
        </div>

        {/* Visual Pulse Ring Element */}
        <div className="sm:self-end">
          <PulseRing score={91} size={60} label="Resonance" isLive={true} />
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 pt-6">
        {/* Metric 1: Followers */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-1">
            <Users className="w-3.5 h-3.5 text-neutral-400" />
            <span>Followers</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight tabular-nums text-neutral-900 dark:text-white">
            {formatCompactNumber(summaryMetrics.followers.current)}
          </div>
          <div className="flex items-center gap-1 text-xs mt-1 font-mono">
            <span
              className={
                summaryMetrics.followers.changePercent >= 0
                  ? 'text-emerald-500 font-semibold'
                  : 'text-rose-500 font-semibold'
              }
            >
              {formatPercent(summaryMetrics.followers.changePercent)}
            </span>
            <span className="text-[11px] text-neutral-400">growth</span>
          </div>
        </div>

        {/* Metric 2: Views */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-1">
            <Eye className="w-3.5 h-3.5 text-neutral-400" />
            <span>Total Views</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight tabular-nums text-neutral-900 dark:text-white">
            {formatCompactNumber(summaryMetrics.views.current)}
          </div>
          <div className="flex items-center gap-1 text-xs mt-1 font-mono">
            <span
              className={
                summaryMetrics.views.changePercent >= 0
                  ? 'text-emerald-500 font-semibold'
                  : 'text-rose-500 font-semibold'
              }
            >
              {formatPercent(summaryMetrics.views.changePercent)}
            </span>
            <span className="text-[11px] text-neutral-400">reach</span>
          </div>
        </div>

        {/* Metric 3: Likes */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-1">
            <Heart className="w-3.5 h-3.5 text-neutral-400" />
            <span>Likes</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight tabular-nums text-neutral-900 dark:text-white">
            {formatCompactNumber(summaryMetrics.likes.current)}
          </div>
          <div className="flex items-center gap-1 text-xs mt-1 font-mono">
            <span
              className={
                summaryMetrics.likes.changePercent >= 0
                  ? 'text-emerald-500 font-semibold'
                  : 'text-rose-500 font-semibold'
              }
            >
              {formatPercent(summaryMetrics.likes.changePercent)}
            </span>
            <span className="text-[11px] text-neutral-400">velocity</span>
          </div>
        </div>

        {/* Metric 4: Comments */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-1">
            <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
            <span>Comments</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight tabular-nums text-neutral-900 dark:text-white">
            {formatCompactNumber(summaryMetrics.comments.current)}
          </div>
          <div className="flex items-center gap-1 text-xs mt-1 font-mono">
            <span
              className={
                summaryMetrics.comments.changePercent >= 0
                  ? 'text-emerald-500 font-semibold'
                  : 'text-rose-500 font-semibold'
              }
            >
              {formatPercent(summaryMetrics.comments.changePercent)}
            </span>
            <span className="text-[11px] text-neutral-400">conversations</span>
          </div>
        </div>

        {/* Metric 5: Engagement Rate */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-neutral-400" />
            <span>Engagement</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight tabular-nums text-indigo-600 dark:text-indigo-400">
            {summaryMetrics.engagement.current.toFixed(1)}%
          </div>
          <div className="flex items-center gap-1 text-xs mt-1 font-mono">
            <span
              className={
                summaryMetrics.engagement.changePercent >= 0
                  ? 'text-emerald-500 font-semibold'
                  : 'text-rose-500 font-semibold'
              }
            >
              {formatPercent(summaryMetrics.engagement.changePercent)}
            </span>
            <span className="text-[11px] text-neutral-400">points</span>
          </div>
        </div>

        {/* Metric 6: Connected Feeds */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-1">
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            <span>Active Channels</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight tabular-nums text-neutral-900 dark:text-white">
            {activeAccountsCount}
            <span className="text-sm font-normal text-neutral-400 ml-1">/ 3</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs mt-1 text-emerald-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Handshake Active
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
