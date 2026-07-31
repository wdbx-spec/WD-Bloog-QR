'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  QrCode,
  Globe,
  Wifi,
  Contact,
  Mail,
  MessageSquare,
  Bitcoin,
  FileText,
  Type,
  PhoneCall,
  Calendar,
  MapPin,
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  Bookmark,
} from 'lucide-react';
import { useLanguage } from '../providers/LanguageProvider';

export const QR_TYPE_NAV = [
  { slug: 'url-qr-code', label: 'URL / Website', icon: Globe, path: '/' },
  { slug: 'wifi-qr-code', label: 'Wi-Fi Network', icon: Wifi, path: '/wifi-qr-code' },
  { slug: 'vcard-qr-code', label: 'vCard Contact', icon: Contact, path: '/vcard-qr-code' },
  { slug: 'email-qr-code', label: 'Email', icon: Mail, path: '/email-qr-code' },
  { slug: 'sms-qr-code', label: 'SMS Text', icon: MessageSquare, path: '/sms-qr-code' },
  { slug: 'crypto-qr-code', label: 'Crypto Wallet', icon: Bitcoin, path: '/crypto-qr-code' },
  { slug: 'pdf-to-qr-code', label: 'PDF Document', icon: FileText, path: '/pdf-to-qr-code' },
  { slug: 'text-qr-code', label: 'Plain Text', icon: Type, path: '/text-qr-code' },
  { slug: 'whatsapp-qr-code', label: 'WhatsApp', icon: PhoneCall, path: '/whatsapp-qr-code' },
  { slug: 'event-qr-code', label: 'Calendar Event', icon: Calendar, path: '/event-qr-code' },
  { slug: 'location-qr-code', label: 'Location Map', icon: MapPin, path: '/location-qr-code' },
];

interface HeaderProps {
  savedCount?: number;
  onOpenHistory?: () => void;
}

export function Header({ savedCount = 0, onOpenHistory }: HeaderProps) {
  const { dict } = useLanguage();
  const pathname = usePathname();
  const [typesOpen, setTypesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <QrCode className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                WDBloog
              </span>
              <span className="rounded-md bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                QR Pro
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              qr.wdbloog.com
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {/* Main Generator */}
          <Link
            href="/"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === '/'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <QrCode className="h-4 w-4" />
            <span>{dict.nav.home}</span>
          </Link>

          {/* QR Types Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setTypesOpen(!typesOpen);
              }}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              <span>{dict.nav.types}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${typesOpen ? 'rotate-180' : ''}`} />
            </button>

            {typesOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setTypesOpen(false)} />
                <div className="absolute top-full left-0 z-20 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 grid grid-cols-1 gap-0.5">
                  <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                    Specialized QR Generators
                  </div>
                  {QR_TYPE_NAV.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.path;
                    return (
                      <Link
                        key={item.slug}
                        href={item.path}
                        onClick={() => setTypesOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition-colors ${
                          active
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 font-semibold'
                            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Admin */}
          <Link
            href="/admin"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname.startsWith('/admin')
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>{dict.nav.admin}</span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Saved History Trigger */}
          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              className="relative flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Saved QR Codes"
            >
              <Bookmark className="h-4 w-4 text-amber-500 fill-amber-500/20" />
              <span className="hidden sm:inline">{dict.nav.history}</span>
              {savedCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                  {savedCount}
                </span>
              )}
            </button>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 md:hidden items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 p-3 text-xs font-semibold text-slate-800 dark:border-slate-800 dark:text-slate-200"
            >
              <QrCode className="h-4 w-4 text-blue-600" />
              <span>{dict.nav.home}</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 p-3 text-xs font-semibold text-slate-800 dark:border-slate-800 dark:text-slate-200"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>{dict.nav.admin}</span>
            </Link>
          </div>

          <div className="pt-2">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Specialized Generators
            </div>
            <div className="grid grid-cols-2 gap-2">
              {QR_TYPE_NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.slug}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 text-[11px] font-medium text-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  >
                    <Icon className="h-3.5 w-3.5 text-blue-500" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
