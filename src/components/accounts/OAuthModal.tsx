import React, { useState } from 'react';
import { Platform } from '../../types';
import { useSocial } from '../../context/SocialContext';
import {
  Youtube,
  Instagram,
  Twitter,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  Lock,
  X,
  RotateCw,
} from 'lucide-react';

interface OAuthModalProps {
  platform: Platform;
  isOpen: boolean;
  onClose: () => void;
}

export const OAuthModal: React.FC<OAuthModalProps> = ({
  platform,
  isOpen,
  onClose,
}) => {
  const { connectPlatform } = useSocial();
  const [step, setStep] = useState<'consent' | 'authorizing' | 'success'>('consent');

  if (!isOpen) return null;

  const platformMeta = {
    youtube: {
      name: 'YouTube Data API v3',
      icon: <Youtube className="w-6 h-6 text-red-600" />,
      scopes: [
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/yt-analytics.readonly',
      ],
      description: 'Read-only access to subscriber counters, video metrics, and audience demographics.',
    },
    instagram: {
      name: 'Instagram Graph API v19.0',
      icon: <Instagram className="w-6 h-6 text-pink-500" />,
      scopes: [
        'instagram_basic',
        'instagram_manage_insights',
        'pages_read_engagement',
      ],
      description: 'Read-only access to account impressions, profile interactions, and reel statistics.',
    },
    x: {
      name: 'X Developer API v2',
      icon: <Twitter className="w-6 h-6 text-sky-400" />,
      scopes: ['users.read', 'tweet.read', 'space.read'],
      description: 'Read-only access to tweet impressions, reposts, user metrics, and bookmark counts.',
    },
  }[platform];

  const handleAuthorize = async () => {
    setStep('authorizing');
    await new Promise((r) => setTimeout(r, 1200));
    await connectPlatform(platform);
    setStep('success');
    setTimeout(() => {
      onClose();
      setStep('consent');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'consent' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                {platformMeta.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  Connect {platform.toUpperCase()}
                </h3>
                <span className="text-xs text-neutral-400 font-mono">
                  OAuth 2.0 PKCE Handshake
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              {platformMeta.description}
            </p>

            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 p-3 mb-5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Requested Scopes (Least Privilege)
              </span>
              <ul className="flex flex-col gap-1 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
                {platformMeta.scopes.map((scope) => (
                  <li key={scope} className="flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span className="truncate">{scope}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs mb-5">
              <Lock className="w-4 h-4 shrink-0" />
              <span>Zero credentials stored in browser. Uses ephemeral token exchange.</span>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAuthorize}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-xs"
              >
                <span>Authorize & Connect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {step === 'authorizing' && (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <RotateCw className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
              Authenticating with {platform.toUpperCase()}
            </h4>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Exchanging authorization code for Bearer token...
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-3" />
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
              Account Connected Successfully!
            </h4>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Live telemetry is now streaming into SocialPulse.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
