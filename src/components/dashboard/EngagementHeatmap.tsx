import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { HeatmapSlot, HeatmapCell } from '../../types';
import { formatCompactNumber } from '../../utils/analytics';
import { Flame, Info } from 'lucide-react';

type HeatmapMetric = 'engagementScore' | 'likes' | 'comments' | 'views';

export const EngagementHeatmap: React.FC = () => {
  const { heatmapData } = useSocial();
  const [selectedMetric, setSelectedMetric] = useState<HeatmapMetric>('engagementScore');
  const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const slots: { id: HeatmapSlot; label: string; time: string }[] = [
    { id: 'morning', label: 'Morning', time: '06:00 - 12:00' },
    { id: 'afternoon', label: 'Afternoon', time: '12:00 - 17:00' },
    { id: 'evening', label: 'Evening', time: '17:00 - 22:00' },
    { id: 'night', label: 'Night', time: '22:00 - 06:00' },
  ];

  // Compute maximum for current metric to normalize color scale
  const maxValue = Math.max(...heatmapData.map((c) => c[selectedMetric]), 1);

  const getCellIntensity = (value: number) => {
    const ratio = value / maxValue;
    if (ratio < 0.25) return 'bg-indigo-950/20 dark:bg-neutral-800/60 border-neutral-200/50 dark:border-neutral-800';
    if (ratio < 0.5) return 'bg-indigo-600/30 dark:bg-indigo-900/60 border-indigo-500/20 text-indigo-300';
    if (ratio < 0.75) return 'bg-indigo-600/60 dark:bg-indigo-600/60 border-indigo-400/40 text-white';
    return 'bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-xs shadow-indigo-500/30 border-purple-400/50';
  };

  const getMetricDisplayValue = (cell: HeatmapCell) => {
    switch (selectedMetric) {
      case 'engagementScore':
        return `${cell.engagementScore}/100`;
      case 'likes':
        return `${formatCompactNumber(cell.likes)} likes`;
      case 'comments':
        return `${formatCompactNumber(cell.comments)} comments`;
      case 'views':
        return `${formatCompactNumber(cell.views)} views`;
    }
  };

  return (
    <section className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs relative">
      {/* Header and Metric Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
              When Your Audience Is Most Active
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Cross-network activity density by day and daypart
            </p>
          </div>
        </div>

        {/* Switcher Buttons */}
        <div className="flex items-center bg-neutral-100 dark:bg-neutral-800/80 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
          {(
            [
              { id: 'engagementScore', label: 'Engagement' },
              { id: 'likes', label: 'Likes' },
              { id: 'comments', label: 'Comments' },
              { id: 'views', label: 'Views' },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMetric(m.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                selectedMetric === m.id
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto my-5">
        <div className="min-w-[540px]">
          {/* Day Headers (X-Axis) */}
          <div className="grid grid-cols-[100px_repeat(7,1fr)] gap-2 pb-2">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider pl-1">
              Time Slot
            </div>
            {days.map((day, idx) => (
              <div
                key={day}
                className={`text-center text-xs font-mono font-medium ${
                  idx === 4 || idx === 2 ? 'text-indigo-400 font-bold' : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Time Slot Rows (Y-Axis) */}
          <div className="flex flex-col gap-2">
            {slots.map((slot) => (
              <div key={slot.id} className="grid grid-cols-[100px_repeat(7,1fr)] gap-2 items-center">
                <div className="flex flex-col pl-1">
                  <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    {slot.label}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {slot.time.split(' - ')[0]}
                  </span>
                </div>

                {days.map((_, dayIdx) => {
                  const cell = heatmapData.find(
                    (c) => c.dayIndex === dayIdx && c.slot === slot.id
                  );
                  const val = cell ? cell[selectedMetric] : 0;
                  const isHovered = hoveredCell === cell;

                  return (
                    <div
                      key={dayIdx}
                      onMouseEnter={() => cell && setHoveredCell(cell)}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`h-11 rounded-lg border flex items-center justify-center cursor-pointer transition-all duration-150 transform hover:scale-105 ${
                        cell ? getCellIntensity(val) : 'bg-neutral-800/20 border-transparent'
                      } ${isHovered ? 'ring-2 ring-indigo-400 ring-offset-1 dark:ring-offset-neutral-900 z-10' : ''}`}
                    >
                      <span className="text-[11px] font-mono font-semibold tabular-nums">
                        {cell ? (selectedMetric === 'engagementScore' ? cell.engagementScore : formatCompactNumber(val)) : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Heatmap Legend and Hover Detail Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 text-xs">
        <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 font-mono text-[11px]">
          <span>Less active</span>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 inline-block" />
            <span className="w-3 h-3 rounded bg-indigo-600/30 border border-indigo-500/20 inline-block" />
            <span className="w-3 h-3 rounded bg-indigo-600/60 inline-block" />
            <span className="w-3 h-3 rounded bg-gradient-to-tr from-indigo-500 to-purple-500 inline-block" />
          </div>
          <span>Peak resonance</span>
        </div>

        {/* Hovered Cell Detail readout */}
        <div className="text-xs font-mono">
          {hoveredCell ? (
            <span className="text-neutral-900 dark:text-neutral-100">
              <strong className="text-indigo-400">{hoveredCell.dayName}</strong> ({hoveredCell.slot}):{' '}
              {getMetricDisplayValue(hoveredCell)} · {formatCompactNumber(hoveredCell.views)} views
            </span>
          ) : (
            <span className="text-neutral-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> Hover any slot to inspect interaction density
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
