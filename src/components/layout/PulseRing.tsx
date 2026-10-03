import React from 'react';

interface PulseRingProps {
  score?: number; // 0 - 100
  size?: number;
  label?: string;
  isLive?: boolean;
}

export const PulseRing: React.FC<PulseRingProps> = ({
  score = 88,
  size = 64,
  label = 'Pulse Index',
  isLive = true,
}) => {
  const radius = size * 0.38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Animated outer aura */}
        {isLive && (
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(99, 102, 241, 0) 70%)',
              animationDuration: '3s',
            }}
          />
        )}

        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={size * 0.09}
            className="text-neutral-200 dark:text-neutral-800"
            fill="transparent"
          />
          {/* Active progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#pulseGradient)"
            strokeWidth={size * 0.09}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
          <defs>
            <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold tracking-tight font-mono tabular-nums text-neutral-900 dark:text-white">
            {score}
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {label}
          </span>
        </div>
        <span className="text-xs text-neutral-600 dark:text-neutral-300">
          High Social Resonance
        </span>
      </div>
    </div>
  );
};
