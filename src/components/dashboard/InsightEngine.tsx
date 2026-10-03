import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { Sparkles, TrendingUp, BarChart3, AlertCircle } from 'lucide-react';

export const InsightEngine: React.FC = () => {
  const { insights } = useSocial();

  const getIcon = (type: string) => {
    switch (type) {
      case 'engagement':
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'growth':
        return <BarChart3 className="w-4 h-4 text-indigo-400" />;
      case 'anomaly':
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <section className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-neutral-100 dark:border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
              What Changed?
            </h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-indigo-500/30 text-indigo-500 bg-indigo-500/10">
              Deterministic Math Engine
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Computed anomalies, channel velocity disparities, and cross-platform momentum
          </p>
        </div>
      </div>

      {/* Insights List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="p-4 rounded-lg border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/30 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
          >
            <div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-neutral-100 dark:bg-neutral-800 shrink-0 mt-0.5">
                  {getIcon(insight.type)}
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-neutral-900 dark:text-white leading-snug">
                    {insight.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Underlying Metric Basis Box */}
            <div className="mt-3 pt-3 border-t border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-[11px] font-mono">
              <span className="text-neutral-400 text-[10px] uppercase tracking-wider">
                Metric Basis:
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                {insight.metricsBasis}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
