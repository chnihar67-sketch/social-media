import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import { Platform } from '../types';
import { OAuthModal } from '../components/accounts/OAuthModal';
import {
  Youtube,
  Instagram,
  Twitter,
  CheckCircle2,
  AlertCircle,
  Unlink,
  Link,
  ShieldCheck,
  KeyRound,
  ExternalLink,
  Clock,
  RotateCw,
} from 'lucide-react';

export const AccountsPage: React.FC = () => {
  const { accounts, disconnectPlatform, syncPlatform, isSyncing } = useSocial();
  const [activeModalPlatform, setActiveModalPlatform] = useState<Platform | null>(null);

  const getAccount = (p: Platform) => accounts.find((a) => a.platform === p);

  const platformsConfig: {
    platform: Platform;
    title: string;
    description: string;
    icon: React.ReactNode;
    colorClasses: string;
    borderClasses: string;
  }[] = [
    {
      platform: 'youtube',
      title: 'YouTube Studio API',
      description: 'Synchronizes channel subscriber telemetry, video view velocity, and audience retention figures via Google YouTube Data API v3.',
      icon: <Youtube className="w-5 h-5 text-red-500" />,
      colorClasses: 'bg-red-500/10 text-red-500',
      borderClasses: 'border-red-500/20',
    },
    {
      platform: 'instagram',
      title: 'Instagram Professional Graph API',
      description: 'Synchronizes account reach, reel interaction rates, and comment volumes via Meta Graph API v19.0.',
      icon: <Instagram className="w-5 h-5 text-pink-500" />,
      colorClasses: 'bg-pink-500/10 text-pink-500',
      borderClasses: 'border-pink-500/20',
    },
    {
      platform: 'x',
      title: 'X Developer Platform API',
      description: 'Streams tweet impressions, organic repost ratios, and profile bookmark rates via Twitter API v2 endpoints.',
      icon: <Twitter className="w-5 h-5 text-sky-400" />,
      colorClasses: 'bg-sky-500/10 text-sky-400',
      borderClasses: 'border-sky-500/20',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Connected Social Accounts
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Manage REST API authorizations, OAuth token states, and channel synchronization
          </p>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-600 dark:text-neutral-300">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>OAuth 2.0 PKCE Enforced</span>
        </div>
      </div>

      {/* Platform Connection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platformsConfig.map((cfg) => {
          const acc = getAccount(cfg.platform);
          const isConnected = acc?.connected ?? false;

          return (
            <div
              key={cfg.platform}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg border ${cfg.colorClasses} ${cfg.borderClasses}`}>
                      {cfg.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                        {cfg.title}
                      </h3>
                      <span className="text-[11px] font-mono text-neutral-400">
                        OAuth 2.0 Client
                      </span>
                    </div>
                  </div>

                  {isConnected ? (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-500 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Connected
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
                      Disconnected
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-4 leading-relaxed">
                  {cfg.description}
                </p>

                {/* Account Details if connected */}
                {isConnected && acc ? (
                  <div className="mt-5 p-3.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={acc.avatarUrl}
                        alt={acc.displayName}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
                      />
                      <div>
                        <div className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                          {acc.displayName}
                        </div>
                        <div className="text-[11px] font-mono text-neutral-400">
                          {acc.handle}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => syncPlatform(cfg.platform)}
                      disabled={isSyncing}
                      className="p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      title="Sync this channel"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="mt-5 p-3.5 rounded-lg border border-dashed border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-400">
                    No active account linked. Authorize to ingest analytics.
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
                  <Clock className="w-3 h-3" />
                  <span>{isConnected ? `Sync: ${acc?.lastSynced}` : 'Inactive'}</span>
                </div>

                {isConnected ? (
                  <button
                    onClick={() => disconnectPlatform(cfg.platform)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 transition-colors"
                  >
                    <Unlink className="w-3.5 h-3.5" />
                    <span>Disconnect</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveModalPlatform(cfg.platform)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-xs"
                  >
                    <Link className="w-3.5 h-3.5" />
                    <span>Connect {cfg.platform.toUpperCase()}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* OAuth Architecture Explanation Card */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs">
        <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white mb-2">
          Architecture: Real-World Social API & OAuth Pipeline
        </h2>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl mb-4">
          SocialPulse is structured for direct plug-and-play production replacement. The client interacts strictly through the <code className="font-mono text-indigo-400">ISocialPlatformService</code> interface. In production with real credentials, the flow proceeds as follows:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
            <span className="text-indigo-400 font-bold block mb-1">01. Authorization</span>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              User initiates OAuth 2.0 PKCE consent screen requesting read-only scopes.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
            <span className="text-indigo-400 font-bold block mb-1">02. Backend Token Exchange</span>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Auth code exchanged securely on backend server with client secret; refresh token saved in encrypted store.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
            <span className="text-indigo-400 font-bold block mb-1">03. REST Ingestion</span>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Cron or webhook worker calls YouTube, Meta Graph, & X API endpoints on schedule.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
            <span className="text-indigo-400 font-bold block mb-1">04. Normalization</span>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Raw payloads transformed into unified DailyDataPoint and ContentItem models.
            </p>
          </div>
        </div>
      </div>

      {/* OAuth Connection Modal */}
      {activeModalPlatform && (
        <OAuthModal
          platform={activeModalPlatform}
          isOpen={true}
          onClose={() => setActiveModalPlatform(null)}
        />
      )}
    </div>
  );
};
