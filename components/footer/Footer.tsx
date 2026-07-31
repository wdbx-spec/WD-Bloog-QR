'use client';

import React from 'react';
import Link from 'next/link';
import { QrCode, ShieldCheck, Heart, Sparkles, Globe } from 'lucide-react';
import { QR_TYPE_NAV } from '../header/Header';
import { useLanguage } from '../providers/LanguageProvider';

export function Footer() {
  const { dict } = useLanguage();

  return (
    <footer className="w-full border-t border-slate-200/80 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                <QrCode className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                WDBloog QR
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              The world&apos;s fastest 100% client-side free QR code generator platform. Create customized vector QR codes with logos, custom dot styles, frames, and high-res SVG & PNG exports.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Secure & Private Client-Side Processing</span>
            </div>
          </div>

          {/* Core QR Code Types */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Specialized QR Code Generators
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {QR_TYPE_NAV.map((item) => (
                <Link
                  key={item.slug}
                  href={item.path}
                  className="flex items-center gap-2 text-xs text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors py-1"
                >
                  <item.icon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Platform Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Platform & Resources
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a href="#faq-section" className="hover:text-blue-600 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li className="pt-2 text-[11px] text-slate-400">
                Domain: <strong className="text-slate-600 dark:text-slate-300">qr.wdbloog.com</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} WDBloog Platform (qr.wdbloog.com). All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Built with precision for global performance</span>
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
