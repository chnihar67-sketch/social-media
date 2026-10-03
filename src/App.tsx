import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SocialProvider } from './context/SocialContext';
import { Navbar } from './components/layout/Navbar';
import { ToastContainer } from './components/layout/ToastContainer';
import { CommandPalette } from './components/common/CommandPalette';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ContentRadarPage } from './pages/ContentRadarPage';
import { AccountsPage } from './pages/AccountsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { Activity } from 'lucide-react';

export default function App() {
  return (
    <SocialProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-neutral-100/60 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-500/30 selection:text-indigo-600 dark:selection:text-indigo-200">
          {/* Top Bar Navigation */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/content" element={<ContentRadarPage />} />
              <Route path="/accounts" element={<AccountsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>

          {/* Quiet, Professional SaaS Footer */}
          <footer className="border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950 py-6 text-xs text-neutral-500 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center">
                  <Activity className="w-3 h-3 text-white" />
                </div>
                <span className="font-semibold text-neutral-800 dark:text-neutral-300">SocialPulse</span>
                <span>· Unified Cross-Channel Intelligence</span>
              </div>

              <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400 font-mono text-[11px]">
                <span>REST v3 / Graph v19 / X API v2</span>
                <span aria-hidden="true">·</span>
                <span>OAuth 2.0 PKCE Compliant</span>
              </div>
            </div>
          </footer>

          {/* Notifications & System Toast Layer */}
          <ToastContainer />

          {/* Quick Command Palette (Cmd + K) */}
          <CommandPalette />
        </div>
      </BrowserRouter>
    </SocialProvider>
  );
}
