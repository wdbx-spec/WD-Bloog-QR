'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';
import { QRWorkspace } from '../components/qr/QRWorkspace';
import { SEOContent } from '../components/seo/SEOContent';
import { QRHistoryModal } from '../components/history/QRHistoryModal';
import { QRScannerModal } from '../components/scanner/QRScannerModal';
import { getSavedQRHistory } from '../lib/storage';
import { SavedQRItem, QRType } from '../lib/qr/types';
import { useLanguage } from '../components/providers/LanguageProvider';
import { QrCode, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function HomePage() {
  const { dict } = useLanguage();
  const [activeType, setActiveType] = useState<QRType>('url');
  const [history, setHistory] = useState<SavedQRItem[]>(() => {
    return typeof window !== 'undefined' ? getSavedQRHistory() : [];
  });
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [scannerModalOpen, setScannerModalOpen] = useState(false);
  const [scannedPayload, setScannedPayload] = useState<string | null>(null);

  const handleUpdateHistory = (updated: SavedQRItem[]) => {
    setHistory(updated);
  };

  const handleRefreshHistory = () => {
    setHistory(getSavedQRHistory());
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Header Navbar */}
      <Header
        savedCount={history.length}
        onOpenHistory={() => setHistoryModalOpen(true)}
        onOpenScanner={() => setScannerModalOpen(true)}
      />

      {/* Main Workspace Stage */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full space-y-10">
        {/* Concise Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-300 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
            <span>100% Free • Unlimited Scans • Vector SVG Export</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {dict.generator.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            {dict.generator.subtitle}
          </p>
        </div>

        {/* The Interactive QR Generator Workspace */}
        <QRWorkspace
          initialType="url"
          onTypeChange={setActiveType}
          onUpdateHistoryCount={handleRefreshHistory}
          scannedPayload={scannedPayload}
        />

        {/* Below-the-fold SEO Content, How-To, & FAQs */}
        <SEOContent
          type={activeType}
          title={dict.generator.title}
          description={dict.meta.description}
        />
      </main>

      {/* Camera QR Scanner Modal */}
      <QRScannerModal
        isOpen={scannerModalOpen}
        onClose={() => setScannerModalOpen(false)}
        onApplyToGenerator={(payload) => {
          setScannedPayload(payload);
        }}
      />

      {/* Saved History Modal Drawer */}
      <QRHistoryModal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        history={history}
        onLoadQR={(item) => {
          // Loaded item handled in workspace state
        }}
        onUpdateHistory={handleUpdateHistory}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
