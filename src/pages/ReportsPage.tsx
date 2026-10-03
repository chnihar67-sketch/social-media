import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import { formatCompactNumber, formatPercent, downloadCSV } from '../utils/analytics';
import {
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  Share2,
  Printer,
  Sparkles,
  BarChart2,
} from 'lucide-react';
import { DateRange } from '../types';

export const ReportsPage: React.FC = () => {
  const { summaryMetrics, insights, contentItems, history, dateRange, setDateRange } = useSocial();
  const [reportTitle, setReportTitle] = useState('Executive Social Performance Digest');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadCSV = () => {
    const rows: string[][] = [
      ['SocialPulse Report', reportTitle],
      ['Date Range', dateRange.toUpperCase()],
      ['Generated On', new Date().toLocaleDateString()],
      [],
      ['SUMMARY METRICS'],
      ['Metric', 'Current Value', 'Period Change (%)'],
      ['Total Followers', String(summaryMetrics.followers.current), formatPercent(summaryMetrics.followers.changePercent)],
      ['Total Views', String(summaryMetrics.views.current), formatPercent(summaryMetrics.views.changePercent)],
      ['Total Likes', String(summaryMetrics.likes.current), formatPercent(summaryMetrics.likes.changePercent)],
      ['Total Comments', String(summaryMetrics.comments.current), formatPercent(summaryMetrics.comments.changePercent)],
      ['Engagement Rate', `${summaryMetrics.engagement.current.toFixed(2)}%`, formatPercent(summaryMetrics.engagement.changePercent)],
      [],
      ['TOP PERFORMING CONTENT'],
      ['Title', 'Platform', 'Type', 'Views', 'Likes', 'Comments', 'Engagement Rate (%)', 'Performance Label'],
      ...contentItems.map((item) => [
        item.title,
        item.platform,
        item.type,
        String(item.views),
        String(item.likes),
        String(item.comments),
        `${item.engagementRate}%`,
        item.performanceLabel,
      ]),
      [],
      ['KEY MATHEMATICAL INSIGHTS'],
      ['Insight Title', 'Analysis', 'Metric Basis'],
      ...insights.map((ins) => [ins.title, ins.description, ins.metricsBasis]),
    ];

    downloadCSV(`SocialPulse_Report_${dateRange}_${new Date().toISOString().split('T')[0]}.csv`, rows);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Actions */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Performance Report Generator
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Export comprehensive multi-network reports for stakeholders, clients, and partners
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Report Customization Controls */}
      <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-neutral-400" />
          <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
            Selected Evaluation Period:
          </span>
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
            {(['7d', '30d', '90d', '1y'] as DateRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-all ${
                  dateRange === r
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-neutral-500 font-mono">
          Last refreshed: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Formatted Report Preview Document Container */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-md font-sans">
        {/* Report Header */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-indigo-500 mb-1">
              SocialPulse Analytics Report
            </div>
            <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
              {reportTitle}
            </h2>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Evaluated Period: <strong className="font-mono text-neutral-700 dark:text-neutral-300">{dateRange.toUpperCase()}</strong> · Channels: YouTube Studio, Instagram Professional, X Analytics
            </div>
          </div>

          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 text-right">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">Verification Status</span>
            <div className="text-xs font-bold text-emerald-500 flex items-center gap-1 justify-end mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Telemetry Certified
            </div>
          </div>
        </div>

        {/* Section 1: Executive KPI Summary */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono mb-4">
            01. Executive KPI Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800">
              <span className="text-xs text-neutral-500">Total Followers</span>
              <div className="text-xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white mt-1">
                {formatCompactNumber(summaryMetrics.followers.current)}
              </div>
              <div className="text-xs text-emerald-500 font-mono mt-1">
                {formatPercent(summaryMetrics.followers.changePercent)} net trajectory
              </div>
            </div>

            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800">
              <span className="text-xs text-neutral-500">Total Impressions</span>
              <div className="text-xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white mt-1">
                {formatCompactNumber(summaryMetrics.views.current)}
              </div>
              <div className="text-xs text-emerald-500 font-mono mt-1">
                {formatPercent(summaryMetrics.views.changePercent)} reach expansion
              </div>
            </div>

            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800">
              <span className="text-xs text-neutral-500">Interactions (Likes & Cmts)</span>
              <div className="text-xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white mt-1">
                {formatCompactNumber(summaryMetrics.likes.current + summaryMetrics.comments.current)}
              </div>
              <div className="text-xs text-emerald-500 font-mono mt-1">
                {formatPercent(summaryMetrics.likes.changePercent)} engagement surge
              </div>
            </div>

            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800">
              <span className="text-xs text-neutral-500">Overall Engagement Rate</span>
              <div className="text-xl font-bold font-mono tabular-nums text-indigo-500 mt-1">
                {summaryMetrics.engagement.current.toFixed(1)}%
              </div>
              <div className="text-xs text-emerald-500 font-mono mt-1">
                {formatPercent(summaryMetrics.engagement.changePercent)} basis points
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Key Strategic Insights */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono mb-4">
            02. Mathematical Insights & Anomalies
          </h3>
          <div className="space-y-3">
            {insights.map((ins) => (
              <div
                key={ins.id}
                className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white">
                    {ins.title}
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {ins.description}
                  </p>
                </div>
                <span className="font-mono text-[11px] text-indigo-500 shrink-0 bg-indigo-500/10 px-2 py-1 rounded">
                  {ins.metricsBasis}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Top Media Performers */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono mb-4">
            03. Leading Content Performers
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400">
                  <th className="py-2.5 px-3">Title</th>
                  <th className="py-2.5 px-3">Channel</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Views</th>
                  <th className="py-2.5 px-3">Engagement</th>
                  <th className="py-2.5 px-3">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {contentItems.slice(0, 4).map((cnt) => (
                  <tr key={cnt.id}>
                    <td className="py-3 px-3 font-sans font-medium text-neutral-900 dark:text-white max-w-xs truncate">
                      {cnt.title}
                    </td>
                    <td className="py-3 px-3 capitalize">{cnt.platform}</td>
                    <td className="py-3 px-3 uppercase text-[10px] text-neutral-400">{cnt.type}</td>
                    <td className="py-3 px-3">{formatCompactNumber(cnt.views)}</td>
                    <td className="py-3 px-3 text-indigo-400 font-bold">{cnt.engagementRate}%</td>
                    <td className="py-3 px-3 text-emerald-500">{cnt.performanceLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
