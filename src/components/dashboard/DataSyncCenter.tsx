import React from 'react';
import { useSocial } from '../../context/SocialContext';
import {
  RotateCw,
  Server,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Wifi,
  Database,
  Cpu,
} from 'lucide-react';
import { Platform } from '../../types';

export const DataSyncCenter: React.FC = () => {
  const {
    accounts,
    syncPlatform,
    syncAll,
    isSyncing,
    simulatedErrorMode,
    setSimulatedErrorMode,
  } = useSocial();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'syncing':
        return <RotateCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />;
      case 'error':
        return <XCircle className="w-3.5 h-3.5 text-rose-500" />;
      case 'rate_limited':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const getStatusBadge = (account: any) => {
    if (account.syncStatus === 'syncing') {
      return (
        <span className="text-[11px] font-mono text-indigo-400 flex items-center gap-1">
          <RotateCw className="w-3 h-3 animate-spin" /> In Flight
        </span>
      );
    }
    if (account.syncStatus === 'rate_limited') {
      return (
        <span className="text-[11px] font-mono text-amber-400 font-semibold">
          429 Rate Limited
        </span>
      );
    }
    if (account.syncStatus === 'error') {
      return (
        <span className="text-[11px] font-mono text-rose-400 font-semibold">
          503 Error
        </span>
      );
    }
    return (
      <span className="text-[11px] font-mono text-emerald-400 font-semibold">
        200 OK
      </span>
    );
  };

  return (
    <section className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
                Data Sync Center
              </h2>
              <span className="text-xs text-neutral-400 font-mono">REST Gateway</span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Live asynchronous status, cache validation, and protocol telemetry
            </p>
          </div>
        </div>

        {/* Global Sync All Action */}
        <button
          onClick={() => syncAll()}
          disabled={isSyncing}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors disabled:opacity-50 shadow-xs"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>Synchronize All Feeds</span>
        </button>
      </div>

      {/* Synchronized Channels Table */}
      <div className="overflow-x-auto my-4">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 uppercase tracking-wider">
              <th className="py-2.5 px-3 font-semibold">Service</th>
              <th className="py-2.5 px-3 font-semibold">Status</th>
              <th className="py-2.5 px-3 font-semibold">HTTP Code</th>
              <th className="py-2.5 px-3 font-semibold">Last Synchronization</th>
              <th className="py-2.5 px-3 font-semibold">Gateway Source</th>
              <th className="py-2.5 px-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
            {accounts.map((acc) => (
              <tr
                key={acc.id}
                className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors"
              >
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2 font-sans font-semibold text-neutral-900 dark:text-white capitalize">
                    {acc.platform}
                  </div>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(acc.syncStatus)}
                    <span className="capitalize text-neutral-700 dark:text-neutral-300">
                      {acc.connected ? (acc.syncStatus === 'idle' ? 'Synchronized' : acc.syncStatus) : 'Offline'}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3">{getStatusBadge(acc)}</td>
                <td className="py-3 px-3 text-neutral-500 dark:text-neutral-400">
                  {acc.lastSynced}
                </td>
                <td className="py-3 px-3 text-neutral-500 dark:text-neutral-400">
                  {acc.isDemo ? 'REST Mock Provider (v1.4)' : 'OAuth 2.0 Bearer'}
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => syncPlatform(acc.platform as Platform)}
                    disabled={isSyncing || !acc.connected}
                    className="p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 disabled:opacity-30 transition-colors"
                    title={`Sync ${acc.platform}`}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interactive Demonstration Panel for API Resilience */}
      <div className="p-3.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-500" />
              API Resilience & Fault Testing Simulator
            </span>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Simulate real-world REST gateway edge cases to observe non-blocking UI recovery
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <button
              onClick={() => setSimulatedErrorMode('none')}
              className={`px-2.5 py-1 rounded border transition-all ${
                simulatedErrorMode === 'none'
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'border-neutral-300 dark:border-neutral-700 text-neutral-400'
              }`}
            >
              Normal (200 OK)
            </button>
            <button
              onClick={() => setSimulatedErrorMode('rate_limit')}
              className={`px-2.5 py-1 rounded border transition-all ${
                simulatedErrorMode === 'rate_limit'
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold'
                  : 'border-neutral-300 dark:border-neutral-700 text-neutral-400'
              }`}
            >
              Simulate 429
            </button>
            <button
              onClick={() => setSimulatedErrorMode('api_failure')}
              className={`px-2.5 py-1 rounded border transition-all ${
                simulatedErrorMode === 'api_failure'
                  ? 'bg-rose-500/10 border-rose-500/40 text-rose-600 dark:text-rose-400 font-bold'
                  : 'border-neutral-300 dark:border-neutral-700 text-neutral-400'
              }`}
            >
              Simulate 503
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
