import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocial } from '../../context/SocialContext';
import {
  Search,
  LayoutDashboard,
  BarChart2,
  Radio,
  Users,
  FileText,
  Settings,
  RotateCw,
  Sun,
  Moon,
  Sparkles,
  Command,
  X,
  ShieldAlert,
} from 'lucide-react';
import { DateRange } from '../../types';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const {
    syncAll,
    toggleTheme,
    isDemoMode,
    setIsDemoMode,
    setDateRange,
    setSimulatedErrorMode,
    addToast,
  } = useSocial();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const items = [
    {
      category: 'Navigation',
      icon: <LayoutDashboard className="w-4 h-4 text-indigo-400" />,
      label: 'Go to Dashboard',
      action: () => navigate('/dashboard'),
    },
    {
      category: 'Navigation',
      icon: <BarChart2 className="w-4 h-4 text-purple-400" />,
      label: 'Go to Analytics & Distribution',
      action: () => navigate('/analytics'),
    },
    {
      category: 'Navigation',
      icon: <Radio className="w-4 h-4 text-pink-400" />,
      label: 'Go to Content Radar',
      action: () => navigate('/content'),
    },
    {
      category: 'Navigation',
      icon: <Users className="w-4 h-4 text-sky-400" />,
      label: 'Go to Connected Accounts & OAuth',
      action: () => navigate('/accounts'),
    },
    {
      category: 'Navigation',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      label: 'Go to Reports & CSV Exporter',
      action: () => navigate('/reports'),
    },
    {
      category: 'Navigation',
      icon: <Settings className="w-4 h-4 text-neutral-400" />,
      label: 'Go to Settings & Credentials Guide',
      action: () => navigate('/settings'),
    },
    {
      category: 'Actions',
      icon: <RotateCw className="w-4 h-4 text-indigo-400" />,
      label: 'Trigger Real-time Ingestion Sync',
      action: () => syncAll(),
    },
    {
      category: 'Actions',
      icon: <Sun className="w-4 h-4 text-amber-400" />,
      label: 'Toggle Dark / Light Mode',
      action: () => toggleTheme(),
    },
    {
      category: 'Actions',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      label: `Switch Demo Mode (${isDemoMode ? 'Turn OFF' : 'Turn ON'})`,
      action: () => {
        setIsDemoMode(!isDemoMode);
        addToast('info', `Demo Mode ${!isDemoMode ? 'Enabled' : 'Disabled'}`);
      },
    },
    {
      category: 'Date Horizon',
      icon: <Command className="w-4 h-4 text-neutral-400" />,
      label: 'Filter: Last 7 Days (7D)',
      action: () => setDateRange('7d'),
    },
    {
      category: 'Date Horizon',
      icon: <Command className="w-4 h-4 text-neutral-400" />,
      label: 'Filter: Last 30 Days (30D)',
      action: () => setDateRange('30d'),
    },
    {
      category: 'Date Horizon',
      icon: <Command className="w-4 h-4 text-neutral-400" />,
      label: 'Filter: Last Quarter (90D)',
      action: () => setDateRange('90d'),
    },
    {
      category: 'Simulations',
      icon: <ShieldAlert className="w-4 h-4 text-amber-400" />,
      label: 'Simulate API 429 Rate Limit',
      action: () => setSimulatedErrorMode('rate_limit'),
    },
    {
      category: 'Simulations',
      icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
      label: 'Simulate API 503 Service Unavailable',
      action: () => setSimulatedErrorMode('api_failure'),
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden font-sans">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-100 dark:border-neutral-800">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to page... (Esc to exit)"
            className="flex-1 bg-transparent text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-4 text-center text-xs text-neutral-400">
              No matching commands found.
            </div>
          ) : (
            <div className="space-y-1">
              {filteredItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs text-neutral-800 dark:text-neutral-200 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span className="font-medium group-hover:text-indigo-400 transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 border-t border-neutral-100 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-950 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
          <span>Press Enter to select</span>
          <span>Cmd + K to toggle</span>
        </div>
      </div>
    </div>
  );
};
