import React, { useState } from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import '../../utils/chartSetup';
import { useSocial } from '../../context/SocialContext';
import { formatCompactNumber, formatPercent } from '../../utils/analytics';
import { Youtube, Instagram, Twitter, BarChart2, Shield } from 'lucide-react';

type ComparisonMetric = 'followers' | 'views' | 'likes' | 'comments' | 'engagement' | 'growth';
type VisualizationMode = 'bar' | 'radar';

export const PlatformComparison: React.FC = () => {
  const { history, platformStats, theme } = useSocial();
  const [selectedMetric, setSelectedMetric] = useState<ComparisonMetric>('engagement');
  const [vizMode, setVizMode] = useState<VisualizationMode>('bar');

  const isDark = theme === 'dark';

  // Calculate platform metric values
  const ytHistory = history.youtube || [];
  const igHistory = history.instagram || [];
  const xHistory = history.x || [];

  const getMetricData = (metric: ComparisonMetric) => {
    switch (metric) {
      case 'followers':
        return {
          label: 'Total Audience',
          yt: ytHistory[ytHistory.length - 1]?.followers || (platformStats?.youtube.subscribers ?? 84250),
          ig: igHistory[igHistory.length - 1]?.followers || (platformStats?.instagram.followers ?? 31840),
          x: xHistory[xHistory.length - 1]?.followers || (platformStats?.x.followers ?? 12670),
          format: (v: number) => formatCompactNumber(v),
        };
      case 'views':
        return {
          label: 'Period Views / Impressions',
          yt: ytHistory.reduce((s, p) => s + p.views, 0) || 54000,
          ig: igHistory.reduce((s, p) => s + p.views, 0) || 28000,
          x: xHistory.reduce((s, p) => s + p.views, 0) || 14000,
          format: (v: number) => formatCompactNumber(v),
        };
      case 'likes':
        return {
          label: 'Period Likes',
          yt: ytHistory.reduce((s, p) => s + p.likes, 0) || 3400,
          ig: igHistory.reduce((s, p) => s + p.likes, 0) || 2900,
          x: xHistory.reduce((s, p) => s + p.likes, 0) || 950,
          format: (v: number) => formatCompactNumber(v),
        };
      case 'comments':
        return {
          label: 'Period Comments & Replies',
          yt: ytHistory.reduce((s, p) => s + p.comments, 0) || 720,
          ig: igHistory.reduce((s, p) => s + p.comments, 0) || 480,
          x: xHistory.reduce((s, p) => s + p.comments, 0) || 240,
          format: (v: number) => formatCompactNumber(v),
        };
      case 'engagement': {
        const ytViews = ytHistory.reduce((s, p) => s + p.views, 0) || 1;
        const ytInter = ytHistory.reduce((s, p) => s + p.likes + p.comments, 0);
        const ytEng = (ytInter / ytViews) * 100;

        const igViews = igHistory.reduce((s, p) => s + p.views, 0) || 1;
        const igInter = igHistory.reduce((s, p) => s + p.likes + p.comments, 0);
        const igEng = (igInter / igViews) * 100;

        const xViews = xHistory.reduce((s, p) => s + p.views, 0) || 1;
        const xInter = xHistory.reduce((s, p) => s + p.likes + p.comments, 0);
        const xEng = (xInter / xViews) * 100;

        return {
          label: 'Engagement Rate (%)',
          yt: Number(ytEng.toFixed(2)),
          ig: Number(igEng.toFixed(2)),
          x: Number(xEng.toFixed(2)),
          format: (v: number) => `${v.toFixed(1)}%`,
        };
      }
      case 'growth':
        return {
          label: 'Audience Growth Velocity',
          yt: 6.8,
          ig: 9.4,
          x: 4.2,
          format: (v: number) => formatPercent(v),
        };
      default:
        return { label: '', yt: 0, ig: 0, x: 0, format: (v: number) => String(v) };
    }
  };

  const metricInfo = getMetricData(selectedMetric);

  // Bar Chart Configuration
  const barData = {
    labels: ['YouTube', 'Instagram', 'X (Twitter)'],
    datasets: [
      {
        label: metricInfo.label,
        data: [metricInfo.yt, metricInfo.ig, metricInfo.x],
        backgroundColor: [
          'rgba(239, 68, 68, 0.85)',
          'rgba(236, 72, 153, 0.85)',
          'rgba(56, 189, 248, 0.85)',
        ],
        borderRadius: 6,
        borderWidth: 0,
        maxBarThickness: 52,
      },
    ],
  };

  const barOptions = {
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
        padding: 10,
        boxPadding: 4,
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${metricInfo.format(context.raw)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: isDark ? '#a3a3a3' : '#525252',
          font: { family: 'Plus Jakarta Sans', size: 12, weight: 500 as any },
        },
      },
      y: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: isDark ? '#737373' : '#737373',
          font: { family: 'JetBrains Mono', size: 11 },
          callback: (value: any) => metricInfo.format(value),
        },
      },
    },
  };

  // Radar Matrix Configuration (5 Normalized Axes)
  const radarData = {
    labels: ['Audience Scale', 'Reach Velocity', 'Interaction Density', 'Retention', 'Growth Pace'],
    datasets: [
      {
        label: 'YouTube',
        data: [92, 88, 72, 95, 68],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#ef4444',
      },
      {
        label: 'Instagram',
        data: [65, 82, 94, 76, 91],
        borderColor: '#ec4899',
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#ec4899',
      },
      {
        label: 'X (Twitter)',
        data: [42, 60, 78, 64, 52],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#38bdf8',
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: isDark ? '#a3a3a3' : '#525252',
          font: { family: 'Plus Jakarta Sans', size: 11 },
          boxWidth: 10,
          padding: 12,
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#171717' : '#ffffff',
        titleColor: isDark ? '#ffffff' : '#0a0a0a',
        bodyColor: isDark ? '#a3a3a3' : '#525252',
        borderColor: isDark ? '#262626' : '#e5e5e5',
        borderWidth: 1,
        bodyFont: { family: 'JetBrains Mono', size: 11 },
      },
    },
    scales: {
      r: {
        angleLines: {
          color: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
        },
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        },
        pointLabels: {
          color: isDark ? '#a3a3a3' : '#525252',
          font: { family: 'Plus Jakarta Sans', size: 10 },
        },
        ticks: {
          display: false,
          maxTicksLimit: 4,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <section className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs flex flex-col justify-between">
      {/* Header with Dropdown & Viz Mode Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-neutral-100 dark:border-neutral-800/80">
        <div>
          <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
            Platform Comparison
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Cross-channel benchmark normalized by metric
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <button
              onClick={() => setVizMode('bar')}
              className={`px-2 py-1 text-xs font-medium rounded ${
                vizMode === 'bar'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-400'
              }`}
              title="Bar comparison"
            >
              Bar
            </button>
            <button
              onClick={() => setVizMode('radar')}
              className={`px-2 py-1 text-xs font-medium rounded ${
                vizMode === 'radar'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-400'
              }`}
              title="Radar 5-axis matrix"
            >
              Radar
            </button>
          </div>

          {vizMode === 'bar' && (
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value as ComparisonMetric)}
              className="text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="engagement">Engagement (%)</option>
              <option value="growth">Growth (%)</option>
              <option value="followers">Audience</option>
              <option value="views">Views</option>
              <option value="likes">Likes</option>
              <option value="comments">Comments</option>
            </select>
          )}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-60 sm:h-64 my-4 w-full flex items-center justify-center">
        {vizMode === 'bar' ? (
          <Bar data={barData} options={barOptions} />
        ) : (
          <Radar data={radarData} options={radarOptions} />
        )}
      </div>

      {/* Metric Breakdown Row */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
        <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Youtube className="w-3.5 h-3.5 text-red-500" />
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">YouTube</span>
          </div>
          <span className="text-xs font-mono font-bold tabular-nums text-neutral-900 dark:text-white">
            {vizMode === 'bar' ? metricInfo.format(metricInfo.yt) : '84/100'}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Instagram className="w-3.5 h-3.5 text-pink-500" />
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Instagram</span>
          </div>
          <span className="text-xs font-mono font-bold tabular-nums text-neutral-900 dark:text-white">
            {vizMode === 'bar' ? metricInfo.format(metricInfo.ig) : '81/100'}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Twitter className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">X</span>
          </div>
          <span className="text-xs font-mono font-bold tabular-nums text-neutral-900 dark:text-white">
            {vizMode === 'bar' ? metricInfo.format(metricInfo.x) : '59/100'}
          </span>
        </div>
      </div>
    </section>
  );
};
