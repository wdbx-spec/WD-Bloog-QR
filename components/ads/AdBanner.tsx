'use client';

import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

interface AdBannerProps {
  slot?: string;
  client?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export function AdBanner({
  slot = '4314248288',
  client = 'ca-pub-3618365568004987',
  format = 'auto',
  className = '',
  label = 'Advertisement',
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef<boolean>(false);

  useEffect(() => {
    if (pushedRef.current) return;

    const tryPushAd = () => {
      if (!adRef.current || pushedRef.current) return;
      const width = adRef.current.offsetWidth || adRef.current.clientWidth;
      if (width > 0) {
        try {
          if (typeof window !== 'undefined') {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            pushedRef.current = true;
          }
        } catch (e) {
          console.warn('AdSense load notice:', e);
        }
      }
    };

    // Try immediately
    tryPushAd();

    if (pushedRef.current) return;

    // Use ResizeObserver if element width was 0 initially
    if (typeof ResizeObserver !== 'undefined' && adRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0 && !pushedRef.current) {
            tryPushAd();
            if (pushedRef.current) {
              observer.disconnect();
            }
          }
        }
      });
      observer.observe(adRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className={`my-4 w-full overflow-hidden text-center transition-all ${className}`}>
      <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-400 font-medium">
        <span>{label}</span>
      </div>
      <div className="relative min-h-[90px] w-full rounded-xl border border-slate-200/80 bg-slate-50/50 p-2 dark:border-slate-800/80 dark:bg-slate-900/40 flex flex-col items-center justify-center shadow-xs">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        {/* Placeholder fallback when adsbygoogle script doesn't render iframe in sandbox preview */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-3 opacity-60 hover:opacity-90 transition-opacity">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>WDBloog Sponsored Partner</span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            AdSense Slot #{slot} • High-yield ad placement
          </p>
        </div>
      </div>
    </div>
  );
}
