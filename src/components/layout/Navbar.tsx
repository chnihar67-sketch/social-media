import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  RotateCw,
  Bell,
  Sun,
  Moon,
  Activity,
  Check,
  CheckCircle2,
  Menu,
  X,
  ExternalLink,
  Search,
} from 'lucide-react';
import { useSocial } from '../../context/SocialContext';
import { DateRange } from '../../types';
import { AVATAR_IMAGE } from '../../data/mockData';

export const Navbar: React.FC = () => {
  const {
    dateRange,
    setDateRange,
    isDemoMode,
    setIsDemoMode,
    theme,
    toggleTheme,
    isSyncing,
    syncAll,
    notifications,
    markNotificationRead,
    unreadNotificationsCount,
  } = useSocial();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close notifications popover on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'Content Radar', path: '/content' },
    { label: 'Accounts', path: '/accounts' },
    { label: 'Reports', path: '/reports' },
    { label: 'Settings', path: '/settings' },
  ];

  const dateRanges: { label: string; value: DateRange }[] = [
    { label: '7D', value: '7d' },
    { label: '30D', value: '30d' },
    { label: '90D', value: '90d' },
    { label: '1Y', value: '1y' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800/80 bg-white/95 dark:bg-neutral-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ZONE 1: Brand Wordmark (Single text element with icon) */}
          <NavLink
            to="/dashboard"
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
              SocialPulse
            </span>
            {isDemoMode && (
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium rounded border border-amber-500/30 text-amber-500 bg-amber-500/10 dark:bg-amber-500/10 ml-1">
                DEMO MODE
              </span>
            )}
          </NavLink>

          {/* ZONE 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800/80 shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* ZONE 3: Primary Actions & Utility Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Command Search Trigger */}
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 transition-colors"
              title="Quick Command Palette (Cmd + K)"
            >
              <Search className="w-3 h-3 text-neutral-400" />
              <span className="text-[11px]">Search...</span>
              <kbd className="text-[10px] font-mono bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-neutral-500">
                ⌘K
              </kbd>
            </button>

            {/* Date Range Selector Segmented Buttons */}
            <div className="hidden md:flex items-center bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-0.5">
              {dateRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setDateRange(range.value)}
                  className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-all ${
                    dateRange === range.value
                      ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                  title={`View data for last ${range.label}`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Refresh Data Button */}
            <button
              onClick={() => syncAll()}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors disabled:opacity-50"
              title="Synchronize all platform feeds"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-indigo-500' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Notifications Popover */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotifOpen((prev) => !prev)}
                className="relative p-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-3.5 h-3.5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      Notifications & Feeds
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {unreadNotificationsCount} unread
                    </span>
                  </div>

                  <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60 max-h-72 overflow-y-auto mt-2">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => markNotificationRead(item.id)}
                        className={`py-2.5 px-1 flex flex-col gap-1 cursor-pointer transition-colors ${
                          item.read ? 'opacity-60' : 'bg-indigo-50/40 dark:bg-indigo-950/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400">
                            {item.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-normal">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-neutral-700" />
              )}
            </button>

            {/* User Profile Avatar Link */}
            <NavLink
              to="/settings"
              className="flex items-center gap-2 pl-1 group cursor-pointer"
              title="Creator Settings & Credentials"
            >
              <img
                src={AVATAR_IMAGE}
                alt="Alex Rivera"
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover border border-neutral-300 dark:border-neutral-700 group-hover:border-indigo-500 transition-colors"
              />
            </NavLink>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-1.5 animate-in fade-in duration-150">
            {/* Mobile Date Selector */}
            <div className="flex items-center justify-between pb-2 mb-1 border-b border-neutral-100 dark:border-neutral-800/80 px-2">
              <span className="text-xs text-neutral-500">Period</span>
              <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900 p-0.5 rounded-lg">
                {dateRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setDateRange(range.value)}
                    className={`px-2 py-1 text-xs font-mono rounded ${
                      dateRange === range.value
                        ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white'
                        : 'text-neutral-400'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-2 mt-1 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between px-3">
              <span className="text-xs text-neutral-500">Demo Mode</span>
              <button
                onClick={() => setIsDemoMode(!isDemoMode)}
                className={`text-xs px-2.5 py-1 rounded font-mono ${
                  isDemoMode
                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                    : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600'
                }`}
              >
                {isDemoMode ? 'Active (Realistic Data)' : 'Disabled'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
