import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import '../../utils/chartSetup';
import { useSocial } from '../../context/SocialContext';
import { DateRange, MetricType, DailyDataPoint } from '../../types';
import { formatCompactNumber } from '../../utils/analytics';
import { Youtube, Instagram, Twitter } from 'lucide-react';

export const GrowthTimeline: React.FC = () => {
  const { history, dateRange, setDateRange, theme } = useSocial();
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('views');

  // Platform visibility toggles
  const [visiblePlatforms, setVisiblePlatforms] = useState<{
    youtube: boolean;
    instagram: boolean;
    x: boolean;
  }>({
    youtube: true,
    instagram: true,
    x: true,
  });

  const isDark = theme === 'dark';

  const togglePlatform = (p: 'youtube' | 'instagram' | 'x') => {
    setVisiblePlatforms((prev) => {
      const next = { ...prev, [p]: !prev[p] };
      // Ensure at least one platform remains checked
      if (!next.youtube && !next.instagram && !next.x) {
        return prev;
      }
      return next;
    });
  };

  // Extract dates labels from unified or youtube
  const baseSeries = history.youtube || [];
  const labels = baseSeries.map((item) => {
    const parts = item.date.split('-');
    return `${parts[1]}/${parts[2]}`;
  });

  const extractMetricValue = (d: DailyDataPoint, metric: MetricType): number => {
    if (metric === 'engagement') return d.engagementRate;
    return (d as any)[metric] ?? 0;
  };

  const datasets: any[] = [];

  if (visiblePlatforms.youtube && history.youtube) {
    datasets.push({
      label: 'YouTube',
      data: history.youtube.map((d) => extractMetricValue(d, selectedMetric)),
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.08)',
      borderWidth: 2,
      pointRadius: labels.length > 30 ? 0 : 3,
      pointHoverRadius: 5,
      pointBackgroundColor: '#ef4444',
      tension: 0.3,
      fill: true,
    });
  }

  if (visiblePlatforms.instagram && history.instagram) {
    datasets.push({
      label: 'Instagram',
      data: history.instagram.map((d) => extractMetricValue(d, selectedMetric)),
      borderColor: '#ec4899',
      backgroundColor: 'rgba(236, 72, 153, 0.08)',
      borderWidth: 2,
      pointRadius: labels.length > 30 ? 0 : 3,
      pointHoverRadius: 5,
      pointBackgroundColor: '#ec4899',
      tension: 0.3,
      fill: true,
    });
  }

  if (visiblePlatforms.x && history.x) {
    datasets.push({
      label: 'X (Twitter)',
      data: history.x.map((d) => extractMetricValue(d, selectedMetric)),
      borderColor: '#38bdf8',
      backgroundColor: 'rgba(56, 189, 248, 0.08)',
      borderWidth: 2,
      pointRadius: labels.length > 30 ? 0 : 3,
      pointHoverRadius: 5,
      pointBackgroundColor: '#38bdf8',
      tension: 0.3,
      fill: true,
    });
  }

  const chartData = {
    labels,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? '#171717' : '#ffffff',
        titleColor: isDark ? '#ffffff' : '#0a0a0a',
        bodyColor: isDark ? '#a3a3a3' : '#525252',
        borderColor: isDark ? '#262626' : '#e5e5e5',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        bodyFont: { family: 'JetBrains Mono', size: 12 },
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${formatCompactNumber(context.raw)}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
        },
        ticks: {
          color: isDark ? '#737373' : '#737373',
          font: { family: 'JetBrains Mono', size: 11 },
          maxTicksLimit: 8,
        },
      },
      y: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: isDark ? '#737373' : '#737373',
          font: { family: 'JetBrains Mono', size: 11 },
          callback: (value: any) => formatCompactNumber(value),
        },
      },
    },
  };

  const metricTabs: { id: MetricType; label: string }[] = [
    { id: 'views', label: 'Views' },
    { id: 'followers', label: 'Followers' },
    { id: 'likes', label: 'Likes' },
    { id: 'comments', label: 'Comments' },
  ];

  const rangeButtons: { id: DateRange; label: string }[] = [
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '90d', label: '90D' },
    { id: '1y', label: '1Y' },
  ];

  return (
    <section className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800/80">
        <div>
          <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
            Growth Timeline
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Temporal telemetry with granular platform segmentation
          </p>
        </div>

        {/* Controls Cluster */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Metric Selector */}
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800/80 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
            {metricTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedMetric(tab.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  selectedMetric === tab.id
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Date Range Selector */}
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800/80 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
            {rangeButtons.map((r) => (
              <button
                key={r.id}
                onClick={() => setDateRange(r.id)}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-all ${
                  dateRange === r.id
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Filter Toggles Row */}
      <div className="flex items-center gap-3 my-4">
        <span className="text-xs text-neutral-500 dark:text-neutral-400">Channels:</span>
        <button
          onClick={() => togglePlatform('youtube')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-all ${
            visiblePlatforms.youtube
              ? 'border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400'
              : 'border-neutral-200 dark:border-neutral-800 text-neutral-400 opacity-50'
          }`}
        >
          <Youtube className="w-3.5 h-3.5 text-red-500" />
          <span>YouTube</span>
        </button>

        <button
          onClick={() => togglePlatform('instagram')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-all ${
            visiblePlatforms.instagram
              ? 'border-pink-500/40 bg-pink-500/10 text-pink-600 dark:text-pink-400'
              : 'border-neutral-200 dark:border-neutral-800 text-neutral-400 opacity-50'
          }`}
        >
          <Instagram className="w-3.5 h-3.5 text-pink-500" />
          <span>Instagram</span>
        </button>

        <button
          onClick={() => togglePlatform('x')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-all ${
            visiblePlatforms.x
              ? 'border-sky-500/40 bg-sky-500/10 text-sky-600 dark:text-sky-400'
              : 'border-neutral-200 dark:border-neutral-800 text-neutral-400 opacity-50'
          }`}
        >
          <Twitter className="w-3.5 h-3.5 text-sky-400" />
          <span>X (Twitter)</span>
        </button>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 sm:h-80 w-full mt-2">
        <Line data={chartData} options={chartOptions} />
      </div>
    </section>
  );
};
