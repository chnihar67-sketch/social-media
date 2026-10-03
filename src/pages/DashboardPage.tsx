import React from 'react';
import { UnifiedPulse } from '../components/dashboard/UnifiedPulse';
import { GrowthTimeline } from '../components/dashboard/GrowthTimeline';
import { PlatformComparison } from '../components/dashboard/PlatformComparison';
import { PlatformCards } from '../components/dashboard/PlatformCards';
import { ContentRadar } from '../components/dashboard/ContentRadar';
import { EngagementHeatmap } from '../components/dashboard/EngagementHeatmap';
import { InsightEngine } from '../components/dashboard/InsightEngine';
import { DataSyncCenter } from '../components/dashboard/DataSyncCenter';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. Unified Social Pulse (Visual Summary + Pulse Ring) */}
      <UnifiedPulse />

      {/* 2 & 3. Growth Timeline + Platform Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2">
          <GrowthTimeline />
        </div>
        <div className="lg:col-span-1">
          <PlatformComparison />
        </div>
      </div>

      {/* 6. Platform Cards (YouTube, Instagram, X) */}
      <PlatformCards />

      {/* 5. Engagement Heatmap */}
      <EngagementHeatmap />

      {/* 4. Content Radar (Top Performer Showcase) */}
      <ContentRadar limit={6} showHeader={true} />

      {/* 7 & 8. What Changed? (Insight Engine) + Data Sync Center */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <InsightEngine />
        <DataSyncCenter />
      </div>
    </div>
  );
};
