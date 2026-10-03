import React, { useState, useMemo } from 'react';
import { useSocial } from '../../context/SocialContext';
import { ContentItem } from '../../types';
import { formatCompactNumber } from '../../utils/analytics';
import { ContentInspectorModal } from './ContentInspectorModal';
import {
  Youtube,
  Instagram,
  Twitter,
  Search,
  Eye,
  Heart,
  MessageSquare,
  TrendingUp,
  Share2,
  Maximize2,
} from 'lucide-react';

export const ContentRadar: React.FC<{ limit?: number; showHeader?: boolean }> = ({
  limit,
  showHeader = true,
}) => {
  const { contentItems, theme } = useSocial();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectedItem, setInspectedItem] = useState<ContentItem | null>(null);

  const filteredItems = useMemo(() => {
    let result = [...contentItems];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((item) => item.title.toLowerCase().includes(q));
    }

    if (filterType === 'videos') {
      result = result.filter((i) => i.type === 'video');
    } else if (filterType === 'shorts') {
      result = result.filter((i) => i.type === 'reel' || i.type === 'short');
    } else if (filterType === 'posts') {
      result = result.filter((i) => i.type === 'post' || i.type === 'thread');
    } else if (filterType === 'high_eng') {
      result = result.filter((i) => i.performanceLabel === 'High Engagement');
    } else if (filterType === 'most_viewed') {
      result = [...result].sort((a, b) => b.views - a.views);
    } else if (filterType === 'recent') {
      // kept as is
    }

    if (limit) {
      result = result.slice(0, limit);
    }

    return result;
  }, [contentItems, filterType, searchQuery, limit]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-3.5 h-3.5 text-red-500" />;
      case 'instagram':
        return <Instagram className="w-3.5 h-3.5 text-pink-500" />;
      case 'x':
        return <Twitter className="w-3.5 h-3.5 text-sky-400" />;
      default:
        return null;
    }
  };

  const getLabelColor = (label: ContentItem['performanceLabel']) => {
    switch (label) {
      case 'High Engagement':
        return 'text-emerald-500 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'High Reach':
        return 'text-indigo-500 dark:text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
      case 'Growing':
        return 'text-sky-500 dark:text-sky-400 border-sky-500/30 bg-sky-500/10';
      case 'Underperforming':
        return 'text-amber-500 dark:text-amber-400 border-amber-500/30 bg-amber-500/10';
    }
  };

  return (
    <section className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs">
      {/* Header and Filter Bar */}
      {showHeader && (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
                Content Radar
              </h2>
              <span className="text-xs text-neutral-500 font-mono">
                · {filteredItems.length} active pieces
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Multi-factor engagement categorization across published media
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter titles..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-36 sm:w-48"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center overflow-x-auto p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800/80 text-xs">
              {[
                { id: 'all', label: 'All' },
                { id: 'videos', label: 'Videos' },
                { id: 'shorts', label: 'Shorts & Reels' },
                { id: 'posts', label: 'Posts & Threads' },
                { id: 'high_eng', label: 'High Eng' },
                { id: 'most_viewed', label: 'Most Viewed' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-2.5 py-1 whitespace-nowrap rounded-md font-medium transition-all ${
                    filterType === tab.id
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-5">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            onClick={() => setInspectedItem(item)}
            className="group rounded-lg border border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/40 p-3.5 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Media Thumbnail Container with styled fallback */}
              <div className="relative aspect-video w-full rounded-md overflow-hidden bg-neutral-200 dark:bg-neutral-800 mb-3">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to styled SVG representation if image ever fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Platform Badge Overlay */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[11px] text-white">
                  {getPlatformIcon(item.platform)}
                  <span className="capitalize text-[10px] font-medium">{item.type}</span>
                </div>

                {/* Inspect Hint Badge on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-xs text-[11px] font-mono font-medium text-white flex items-center gap-1.5 shadow-sm">
                    <Maximize2 className="w-3 h-3 text-indigo-400" /> Inspect Metrics
                  </span>
                </div>

                {/* Published Date */}
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[10px] font-mono text-neutral-300">
                  {item.publishedAt}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-relaxed group-hover:text-indigo-500 transition-colors">
                {item.title}
              </h3>
            </div>

            {/* Performance Metadata & Metrics */}
            <div className="mt-3.5 pt-3 border-t border-neutral-200/60 dark:border-neutral-800 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                {/* Descriptive Analytics Label */}
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${getLabelColor(
                    item.performanceLabel
                  )}`}
                >
                  {item.performanceLabel}
                </span>

                {/* Engagement Rate */}
                <div className="flex items-center gap-1 font-mono tabular-nums text-xs font-semibold text-neutral-700 dark:text-neutral-200">
                  <TrendingUp className="w-3 h-3 text-indigo-500" />
                  <span>{item.engagementRate.toFixed(1)}% eng</span>
                </div>
              </div>

              {/* Micro Metrics Row */}
              <div className="grid grid-cols-4 gap-1 text-[11px] text-neutral-500 dark:text-neutral-400 font-mono pt-1">
                <div className="flex items-center gap-1" title="Views">
                  <Eye className="w-3 h-3 text-neutral-400" />
                  <span>{formatCompactNumber(item.views)}</span>
                </div>
                <div className="flex items-center gap-1" title="Likes">
                  <Heart className="w-3 h-3 text-neutral-400" />
                  <span>{formatCompactNumber(item.likes)}</span>
                </div>
                <div className="flex items-center gap-1" title="Comments">
                  <MessageSquare className="w-3 h-3 text-neutral-400" />
                  <span>{formatCompactNumber(item.comments)}</span>
                </div>
                <div className="flex items-center gap-1" title="Shares">
                  <Share2 className="w-3 h-3 text-neutral-400" />
                  <span>{formatCompactNumber(item.shares || 0)}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Content Inspector Modal */}
      <ContentInspectorModal
        item={inspectedItem}
        onClose={() => setInspectedItem(null)}
        isDark={theme === 'dark'}
      />
    </section>
  );
};
