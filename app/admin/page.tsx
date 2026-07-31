'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  BarChart3,
  Users,
  Download,
  BookOpen,
  Languages,
  Settings,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Globe,
  Plus,
} from 'lucide-react';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'blog' | 'i18n' | 'ads'>('analytics');
  const [adsEnabled, setAdsEnabled] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md">
              <ShieldCheck className="h-6 w-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  WDBloog Platform Admin
                </h1>
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Live System
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage SEO landing pages, AdSense units, internationalization, and platform analytics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
              Domain: qr.wdbloog.com
            </span>
          </div>
        </div>

        {/* Admin Nav Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-3 dark:border-slate-800 no-scrollbar">
          {[
            { id: 'analytics', label: 'Analytics & Traffic', icon: BarChart3 },
            { id: 'blog', label: 'Blog CMS', icon: BookOpen },
            { id: 'i18n', label: 'Translations (5 Locales)', icon: Languages },
            { id: 'ads', label: 'AdSense & SEO Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900'
                    : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ANALYTICS OVERVIEW */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Monthly Visitors', val: '142,850', change: '+18.4%', icon: Users, color: 'text-blue-600' },
                { label: 'QRs Generated', val: '389,120', change: '+24.1%', icon: Sparkles, color: 'text-purple-600' },
                { label: 'Vector SVG Downloads', val: '94,300', change: '+31.0%', icon: Download, color: 'text-emerald-600' },
                { label: 'AdSense RPM Est.', val: '$4.85', change: '+12.2%', icon: TrendingUp, color: 'text-amber-600' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>{stat.label}</span>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {stat.val}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Popular Types Distribution */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Most Popular QR Generation Types
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'URL / Website Links (/url-qr-code)', pct: 45, color: 'bg-blue-600' },
                  { name: 'Wi-Fi Networks (/wifi-qr-code)', pct: 24, color: 'bg-sky-500' },
                  { name: 'vCard Digital Contact (/vcard-qr-code)', pct: 14, color: 'bg-indigo-600' },
                  { name: 'WhatsApp Direct Chat (/whatsapp-qr-code)', pct: 9, color: 'bg-emerald-600' },
                  { name: 'PDF Documents & Crypto (/pdf-to-qr-code)', pct: 8, color: 'bg-red-500' },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>{item.name}</span>
                      <span>{item.pct}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BLOG CMS */}
        {activeTab === 'blog' && (
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Published Blog Articles
              </h3>
              <button className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                <span>Create Article</span>
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Articles automatically link back to specific QR code generator tools for high SEO conversion.
            </p>
          </div>
        )}

        {/* TAB 3: TRANSLATIONS */}
        {activeTab === 'i18n' && (
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Multilingual SEO & Localized Directories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { code: 'en', name: 'English', status: 'Active (Default)', flag: '🇺🇸' },
                { code: 'fr', name: 'Français', status: 'Active', flag: '🇫🇷' },
                { code: 'ar', name: 'العربية (RTL)', status: 'Active (Strict RTL)', flag: '🇸🇦' },
                { code: 'es', name: 'Español', status: 'Active', flag: '🇪🇸' },
                { code: 'de', name: 'Deutsch', status: 'Active', flag: '🇩🇪' },
              ].map((item) => (
                <div
                  key={item.code}
                  className="rounded-2xl border border-slate-200 p-3.5 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50 space-y-1"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                    <span>{item.flag}</span>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ADSENSE & SEO SETTINGS */}
        {activeTab === 'ads' && (
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Google AdSense Integration & Slots
            </h3>

            <div className="space-y-4 max-w-xl">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Enable AdSense Units
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Controls display of manual banner units and auto-ads script.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={adsEnabled}
                  onChange={(e) => setAdsEnabled(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  AdSense Publisher ID
                </label>
                <input
                  type="text"
                  defaultValue="ca-pub-3618365568004987"
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-mono dark:border-slate-800 dark:bg-slate-900"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Manual Ad Slot ID (ADS1)
                </label>
                <input
                  type="text"
                  defaultValue="4314248288"
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-mono dark:border-slate-800 dark:bg-slate-900"
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
