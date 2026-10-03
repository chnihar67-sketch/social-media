import React from 'react';
import { ContentItem } from '../../types';
import { formatCompactNumber } from '../../utils/analytics';
import { Line } from 'react-chartjs-2';
import '../../utils/chartSetup';
import {
  X,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  TrendingUp,
  ExternalLink,
  Youtube,
  Instagram,
  Twitter,
  ArrowUpRight,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ContentInspectorModalProps {
  item: ContentItem | null;
  onClose: () => void;
  isDark?: boolean;
}

export const ContentInspectorModal: React.FC<ContentInspectorModalProps> = ({
  item,
  onClose,
  isDark = true,
}) => {
  if (!item) return null;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-500" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'x':
        return <Twitter className="w-4 h-4 text-sky-400" />;
      default:
        return null;
    }
  };

  // Simulated retention / read-through curve data
  const retentionLabels = ['0%', '20%', '40%', '60%', '80%', '100%'];
  const retentionCurve =
    item.type === 'video' || item.type === 'short'
      ? [100, 84, 76, 68, 62, 54]
      : [100, 92, 85, 78, 71, 64];

  const chartData = {
    labels: retentionLabels,
    datasets: [
      {
        label: 'Audience Retention (%)',
        data: retentionCurve,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.35,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#6366f1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#171717' : '#ffffff',
        titleColor: isDark ? '#ffffff' : '#0a0a0a',
        bodyColor: isDark ? '#a3a3a3' : '#525252',
        borderColor: isDark ? '#262626' : '#e5e5e5',
        borderWidth: 1,
        bodyFont: { family: 'JetBrains Mono', size: 11 },
        callbacks: {
          label: (ctx: any) => `Retention: ${ctx.raw}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#737373', font: { family: 'JetBrains Mono', size: 10 } },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
        ticks: {
          color: '#737373',
          font: { family: 'JetBrains Mono', size: 10 },
          callback: (v: any) => `${v}%`,
        },
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl p-6 relative flex flex-col gap-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Preview */}
        <div className="flex flex-col sm:flex-row gap-4 items-start pb-5 border-b border-neutral-100 dark:border-neutral-800/80">
          <div className="w-full sm:w-48 aspect-video rounded-lg overflow-hidden bg-neutral-800 shrink-0 relative">
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[10px] text-white">
              {getPlatformIcon(item.platform)}
              <span className="capitalize">{item.type}</span>
            </div>
          </div>

          <div className="flex-1 pr-6">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-500 font-semibold">
                Content Resonance Inspector
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                · {item.publishedAt}
              </span>
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-snug">
              {item.title}
            </h3>

            <div className="flex items-center gap-2 mt-3">
              <span className="text-[11px] font-medium font-mono px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                {item.performanceLabel}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                Resonance Index: <strong className="text-indigo-400 font-bold">{item.engagementRate}%</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
            <span className="text-[11px] text-neutral-500 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-neutral-400" /> Impressions
            </span>
            <div className="text-lg font-bold font-mono text-neutral-900 dark:text-white mt-0.5">
              {formatCompactNumber(item.views)}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
            <span className="text-[11px] text-neutral-500 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-neutral-400" /> Likes
            </span>
            <div className="text-lg font-bold font-mono text-neutral-900 dark:text-white mt-0.5">
              {formatCompactNumber(item.likes)}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
            <span className="text-[11px] text-neutral-500 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-neutral-400" /> Comments
            </span>
            <div className="text-lg font-bold font-mono text-neutral-900 dark:text-white mt-0.5">
              {formatCompactNumber(item.comments)}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
            <span className="text-[11px] text-neutral-500 flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5 text-neutral-400" /> Shares & Saves
            </span>
            <div className="text-lg font-bold font-mono text-neutral-900 dark:text-white mt-0.5">
              {formatCompactNumber(item.shares || Math.round(item.likes * 0.18))}
            </div>
          </div>
        </div>

        {/* Retention Curve Graph */}
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
              Audience Drop-off & Retention Curve
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              Avg Watch: 64.2% (Top 10% benchmark)
            </span>
          </div>
          <div className="h-40 w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Traffic Sources & Synthesis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
              Ingestion & Referral Vectors
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
                <span>Algorithmic Recommendation</span>
                <strong className="text-neutral-900 dark:text-white">48.2%</strong>
              </div>
              <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
                <span>Organic Search / Query</span>
                <strong className="text-neutral-900 dark:text-white">24.5%</strong>
              </div>
              <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
                <span>Direct / Channel Page</span>
                <strong className="text-neutral-900 dark:text-white">16.1%</strong>
              </div>
              <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
                <span>External / Embedded</span>
                <strong className="text-neutral-900 dark:text-white">11.2%</strong>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-indigo-50/50 dark:bg-indigo-950/20 text-neutral-700 dark:text-neutral-300 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-500 font-bold block mb-1">
                Strategy Recommendation
              </span>
              <p className="text-xs leading-relaxed">
                This asset generates a <strong>2.4x bookmark multiplier</strong> above your monthly channel baseline. Consider spinning out an expanded follow-up thread or long-form companion video.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
