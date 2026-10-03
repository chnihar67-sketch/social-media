import React, { useState } from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import '../utils/chartSetup';
import { useSocial } from '../context/SocialContext';
import { formatCompactNumber, formatPercent } from '../utils/analytics';
import { Platform } from '../types';
import { TrendingUp, BarChart2, PieChart, Users, Eye, Sparkles } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { history, platformStats, theme, dateRange, setDateRange } = useSocial();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');

  const isDark = theme === 'dark';

  // Compute platform distribution for views
  const ytViews = (history.youtube || []).reduce((s, p) => s + p.views, 0) || 54000;
  const igViews = (history.instagram || []).reduce((s, p) => s + p.views, 0) || 28000;
  const xViews = (history.x || []).reduce((s, p) => s + p.views, 0) || 14000;
  const totalPeriodViews = ytViews + igViews + xViews;

  const distributionData = {
    labels: ['YouTube', 'Instagram', 'X (Twitter)'],
    datasets: [
      {
        data: [ytViews, igViews, xViews],
        backgroundColor: [
          'rgba(239, 68, 68, 0.85)',
          'rgba(236, 72, 153, 0.85)',
          'rgba(56, 189, 248, 0.85)',
        ],
        borderWidth: 2,
        borderColor: isDark ? '#171717' : '#ffffff',
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: isDark ? '#a3a3a3' : '#525252',
          font: { family: 'Plus Jakarta Sans', size: 12 },
          boxWidth: 12,
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#171717' : '#ffffff',
        titleColor: isDark ? '#ffffff' : '#0a0a0a',
        bodyColor: isDark ? '#a3a3a3' : '#525252',
        borderColor: isDark ? '#262626' : '#e5e5e5',
        borderWidth: 1,
        bodyFont: { family: 'JetBrains Mono', size: 12 },
        callbacks: {
          label: (context: any) => {
            const val = context.raw;
            const pct = ((val / totalPeriodViews) * 100).toFixed(1);
            return `${context.label}: ${formatCompactNumber(val)} (${pct}%)`;
          },
        },
      },
    },
  };

  // Engagement Trend Data (unified daily points)
  const unifiedHistory = history.unified || [];
  const labels = unifiedHistory.map((d) => d.date.split('-').slice(1).join('/'));

  const engagementTrendData = {
    labels,
    datasets: [
      {
        label: 'Unified Engagement Rate (%)',
        data: unifiedHistory.map((d) => d.engagementRate),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.08)',
        borderWidth: 2,
        tension: 0.35,
        fill: true,
        pointRadius: labels.length > 30 ? 0 : 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#8b5cf6',
      },
    ],
  };

  const lineOptions = {
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
        bodyFont: { family: 'JetBrains Mono', size: 12 },
        callbacks: {
          label: (ctx: any) => `Engagement Rate: ${ctx.raw.toFixed(2)}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#737373', font: { family: 'JetBrains Mono', size: 11 }, maxTicksLimit: 8 },
      },
      y: {
        grid: { color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
        ticks: {
          color: '#737373',
          font: { family: 'JetBrains Mono', size: 11 },
          callback: (v: any) => `${v}%`,
        },
      },
    },
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Filters */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Deep Social Analytics
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Cross-platform telemetry breakdown, audience trajectory, and resonance distribution
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs">
            {(['all', 'youtube', 'instagram', 'x'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                className={`px-3 py-1 font-medium capitalize rounded-md transition-all ${
                  selectedPlatform === p
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {p === 'all' ? 'All Channels' : p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Row 1: Platform Distribution & Engagement Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Platform Share of Impressions */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
            <div>
              <h2 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <PieChart className="w-4 h-4 text-indigo-500" />
                Impression Distribution
              </h2>
              <span className="text-[11px] text-neutral-400 font-mono">
                {formatCompactNumber(totalPeriodViews)} total views
              </span>
            </div>
          </div>

          <div className="h-56 my-3 relative flex items-center justify-center">
            <Doughnut data={distributionData} options={doughnutOptions} />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 text-center font-mono text-xs">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase">YouTube</span>
              <div className="font-bold text-red-500">
                {((ytViews / totalPeriodViews) * 100).toFixed(0)}%
              </div>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase">Instagram</span>
              <div className="font-bold text-pink-500">
                {((igViews / totalPeriodViews) * 100).toFixed(0)}%
              </div>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase">X</span>
              <div className="font-bold text-sky-400">
                {((xViews / totalPeriodViews) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>

        {/* Unified Engagement Trend */}
        <div className="lg:col-span-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
            <div>
              <h2 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                Cross-Platform Engagement Trend
              </h2>
              <span className="text-[11px] text-neutral-400 font-mono">
                Daily interaction rate over active period
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-purple-400">
              Avg 7.8%
            </span>
          </div>

          <div className="h-64 my-2">
            <Line data={engagementTrendData} options={lineOptions} />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800/80 text-xs text-neutral-500 font-mono">
            <span>Peak: 9.8% (Week 3)</span>
            <span>Trough: 5.2% (Week 1)</span>
            <span>Volatility: Low (±1.4%)</span>
          </div>
        </div>
      </div>

      {/* Row 2: Deep Comparative Table */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs">
        <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white mb-1">
          Detailed Channel Metrics Breakdown
        </h2>
        <p className="text-xs text-neutral-500 mb-5">
          Audience scale, impressions, interactions, and conversion efficiency
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Platform</th>
                <th className="py-2.5 px-3">Audience</th>
                <th className="py-2.5 px-3">Growth Rate</th>
                <th className="py-2.5 px-3">Period Views</th>
                <th className="py-2.5 px-3">Likes</th>
                <th className="py-2.5 px-3">Comments</th>
                <th className="py-2.5 px-3">Engagement</th>
                <th className="py-2.5 px-3">Audience Sentiment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40">
                <td className="py-3.5 px-3 font-sans font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  YouTube Studio
                </td>
                <td className="py-3.5 px-3">{formatCompactNumber(platformStats?.youtube.subscribers || 84250)}</td>
                <td className="py-3.5 px-3 text-emerald-500 font-semibold">+6.8%</td>
                <td className="py-3.5 px-3">{formatCompactNumber(ytViews)}</td>
                <td className="py-3.5 px-3">3,420</td>
                <td className="py-3.5 px-3">720</td>
                <td className="py-3.5 px-3 text-indigo-400 font-semibold">7.6%</td>
                <td className="py-3.5 px-3 text-neutral-400">98.2% Positive</td>
              </tr>
              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40">
                <td className="py-3.5 px-3 font-sans font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500" />
                  Instagram Professional
                </td>
                <td className="py-3.5 px-3">{formatCompactNumber(platformStats?.instagram.followers || 31840)}</td>
                <td className="py-3.5 px-3 text-emerald-500 font-semibold">+9.4%</td>
                <td className="py-3.5 px-3">{formatCompactNumber(igViews)}</td>
                <td className="py-3.5 px-3">2,910</td>
                <td className="py-3.5 px-3">480</td>
                <td className="py-3.5 px-3 text-indigo-400 font-semibold">12.1%</td>
                <td className="py-3.5 px-3 text-neutral-400">96.8% Positive</td>
              </tr>
              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40">
                <td className="py-3.5 px-3 font-sans font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  X Analytics
                </td>
                <td className="py-3.5 px-3">{formatCompactNumber(platformStats?.x.followers || 12670)}</td>
                <td className="py-3.5 px-3 text-emerald-500 font-semibold">+4.2%</td>
                <td className="py-3.5 px-3">{formatCompactNumber(xViews)}</td>
                <td className="py-3.5 px-3">950</td>
                <td className="py-3.5 px-3">240</td>
                <td className="py-3.5 px-3 text-indigo-400 font-semibold">8.5%</td>
                <td className="py-3.5 px-3 text-neutral-400">94.5% Positive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
