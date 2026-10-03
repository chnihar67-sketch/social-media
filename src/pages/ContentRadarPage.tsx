import React from 'react';
import { ContentRadar } from '../components/dashboard/ContentRadar';
import { Radio, Sparkles, TrendingUp, Layers } from 'lucide-react';

export const ContentRadarPage: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Intro Header */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-indigo-500" />
            <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Content Radar & Asset Intelligence
            </h1>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Real-time cross-platform content resonance categorization, interaction density, and lifecycle performance
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>High Engagement ({'>'}10%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>High Reach ({'>'}100K)</span>
          </div>
        </div>
      </div>

      {/* Main Content Radar View with full content items */}
      <ContentRadar showHeader={true} />
    </div>
  );
};
