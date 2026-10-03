import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import { DateRange } from '../types';
import {
  Sun,
  Moon,
  Shield,
  Key,
  Database,
  Bell,
  Sliders,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { AVATAR_IMAGE } from '../data/mockData';

export const SettingsPage: React.FC = () => {
  const {
    theme,
    toggleTheme,
    dateRange,
    setDateRange,
    isDemoMode,
    setIsDemoMode,
    accounts,
    addToast,
  } = useSocial();

  const [refreshInterval, setRefreshInterval] = useState('60s');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [anomalyAlerts, setAnomalyAlerts] = useState(true);

  const handleSavePreferences = () => {
    addToast('success', 'Workspace preferences persisted successfully.');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 max-w-4xl">
      {/* Top Banner */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs">
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          System & Analytics Settings
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Configure ingestion protocols, user interface aesthetics, notifications, and security rules
        </p>
      </div>

      {/* Creator Profile Section */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs">
        <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
          Creator Profile
        </h2>
        <div className="flex items-center gap-4">
          <img
            src={AVATAR_IMAGE}
            alt="Alex Rivera"
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/40"
          />
          <div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
              Alex Rivera
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Senior Tech Creator & Digital Strategist
            </p>
            <span className="text-[11px] font-mono text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded mt-1 inline-block">
              Creator Pro Plan · Verified
            </span>
          </div>
        </div>
      </div>

      {/* 1. Interface & Display Settings */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs space-y-6">
        <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-500" />
          Dashboard Preferences
        </h2>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-800/80">
          <div>
            <span className="text-xs font-semibold text-neutral-900 dark:text-white">
              Color Theme
            </span>
            <p className="text-[11px] text-neutral-500">
              Toggle between modern dark slate and crisp daylight mode
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium"
          >
            {theme === 'dark' ? (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Default Date Range */}
        <div className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-800/80">
          <div>
            <span className="text-xs font-semibold text-neutral-900 dark:text-white">
              Default Horizon
            </span>
            <p className="text-[11px] text-neutral-500">
              Initial evaluation window selected upon login
            </p>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as DateRange)}
            className="text-xs font-mono font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white px-3 py-1.5 focus:outline-none"
          >
            <option value="7d">Last 7 Days (7D)</option>
            <option value="30d">Last 30 Days (30D)</option>
            <option value="90d">Last Quarter (90D)</option>
            <option value="1y">Full Year (1Y)</option>
          </select>
        </div>

        {/* Polling Interval */}
        <div className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-800/80">
          <div>
            <span className="text-xs font-semibold text-neutral-900 dark:text-white">
              Background Ingestion Cadence
            </span>
            <p className="text-[11px] text-neutral-500">
              Frequency of background API telemetry handshakes
            </p>
          </div>
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(e.target.value)}
            className="text-xs font-mono font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white px-3 py-1.5 focus:outline-none"
          >
            <option value="30s">Every 30 seconds</option>
            <option value="60s">Every 60 seconds (Recommended)</option>
            <option value="5m">Every 5 minutes</option>
            <option value="manual">Manual only</option>
          </select>
        </div>

        {/* Demo Mode Toggle */}
        <div className="flex items-center justify-between py-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                Realistic Demo Mode
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Generates mathematically coherent historical datasets without touching live platform rate limits
            </p>
          </div>
          <button
            onClick={() => {
              setIsDemoMode(!isDemoMode);
              addToast('info', `Demo Mode ${!isDemoMode ? 'Enabled' : 'Disabled'}`);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              isDemoMode
                ? 'bg-amber-500/10 border border-amber-500/30 text-amber-500'
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            {isDemoMode ? 'Active (Realistic Data)' : 'Disabled'}
          </button>
        </div>
      </div>

      {/* 2. Security & Credentials Architecture Guide */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Lock className="w-4 h-4 text-emerald-500" />
          <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
            Security & Real API Credentials Guide
          </h2>
        </div>

        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
          To connect real social channels in production, credentials MUST reside in server-side environment variables or a secure key management system. Frontend clients must never store client secrets.
        </p>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
            <span className="text-red-500 font-semibold block mb-0.5">YouTube (Google Cloud Console):</span>
            <code className="text-[11px] text-neutral-600 dark:text-neutral-300 block">
              YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_API_KEY
            </code>
            <p className="text-[10px] text-neutral-400 font-sans mt-1">
              Enable YouTube Data API v3 on Google Cloud. Configure OAuth 2.0 Client credentials with redirect URI.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
            <span className="text-pink-500 font-semibold block mb-0.5">Instagram (Meta for Developers):</span>
            <code className="text-[11px] text-neutral-600 dark:text-neutral-300 block">
              INSTAGRAM_APP_ID, INSTAGRAM_APP_SECRET, INSTAGRAM_WEBHOOK_VERIFY_TOKEN
            </code>
            <p className="text-[10px] text-neutral-400 font-sans mt-1">
              Create an app in Meta Developers portal. Add Instagram Graph API product with <code>instagram_manage_insights</code> scope.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
            <span className="text-sky-400 font-semibold block mb-0.5">X / Twitter (Twitter Developer Portal):</span>
            <code className="text-[11px] text-neutral-600 dark:text-neutral-300 block">
              TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET, TWITTER_BEARER_TOKEN
            </code>
            <p className="text-[10px] text-neutral-400 font-sans mt-1">
              Register app in Twitter Developer Portal. Enable OAuth 2.0 PKCE with read-only scopes.
            </p>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={handleSavePreferences}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-xs"
          >
            Save All Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
