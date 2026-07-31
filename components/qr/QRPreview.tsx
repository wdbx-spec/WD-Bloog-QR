'use client';

import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import confetti from 'canvas-confetti';
import {
  Download,
  Printer,
  Copy,
  Bookmark,
  Share2,
  Check,
  Sparkles,
  FileCode,
  FileText,
  Smartphone,
  Info,
} from 'lucide-react';
import { QRDesignOptions, QRType } from '../../lib/qr/types';
import {
  copyCanvasToClipboard,
  createFramedCanvas,
  downloadCanvasAsPDF,
  downloadCanvasAsPNG,
  printCanvas,
} from '../../lib/qr/downloader';
import { useLanguage } from '../providers/LanguageProvider';
import { AdBanner } from '../ads/AdBanner';

interface QRPreviewProps {
  rawContent: string;
  design: QRDesignOptions;
  qrType: QRType;
  onSave: () => void;
}

export function QRPreview({ rawContent, design, qrType, onSave }: QRPreviewProps) {
  const { dict } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [resolution, setResolution] = useState<number>(1024);

  // Initialize or update QRCodeStyling instance
  useEffect(() => {
    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        width: 320,
        height: 320,
        data: rawContent || 'https://qr.wdbloog.com',
        margin: 10,
        qrOptions: {
          typeNumber: 0,
          mode: 'Byte',
          errorCorrectionLevel: design.errorCorrection,
        },
        imageOptions: {
          hideBackgroundDots: design.hideDotsBehindLogo,
          imageSize: design.logoSize,
          margin: design.logoMargin,
          crossOrigin: 'anonymous',
        },
        dotsOptions: {
          type: design.dotStyle,
          color: design.dotsColor,
          gradient: design.useGradient
            ? {
                type: design.gradient.type,
                rotation: (design.gradient.rotation * Math.PI) / 180,
                colorStops: design.gradient.colorStops,
              }
            : undefined,
        },
        backgroundOptions: {
          color: design.transparentBg ? 'transparent' : design.bgColor || '#ffffff',
        },
        cornersSquareOptions: {
          type: design.cornerSquareStyle,
          color: design.cornerSquareColor || design.dotsColor,
        },
        cornersDotOptions: {
          type: design.cornerDotStyle,
          color: design.cornerDotColor || design.dotsColor,
        },
        image: design.logoUrl || undefined,
      });

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        qrCodeRef.current.append(containerRef.current);
      }
    } else {
      qrCodeRef.current.update({
        data: rawContent || 'https://qr.wdbloog.com',
        qrOptions: {
          errorCorrectionLevel: design.errorCorrection,
        },
        imageOptions: {
          hideBackgroundDots: design.hideDotsBehindLogo,
          imageSize: design.logoSize,
          margin: design.logoMargin,
        },
        dotsOptions: {
          type: design.dotStyle,
          color: design.dotsColor,
          gradient: design.useGradient
            ? {
                type: design.gradient.type,
                rotation: (design.gradient.rotation * Math.PI) / 180,
                colorStops: design.gradient.colorStops,
              }
            : undefined,
        },
        backgroundOptions: {
          color: design.transparentBg ? 'transparent' : design.bgColor || '#ffffff',
        },
        cornersSquareOptions: {
          type: design.cornerSquareStyle,
          color: design.cornerSquareColor || design.dotsColor,
        },
        cornersDotOptions: {
          type: design.cornerDotStyle,
          color: design.cornerDotColor || design.dotsColor,
        },
        image: design.logoUrl || undefined,
      });
    }
  }, [rawContent, design]);

  // Helper to get framed canvas
  const getRenderedCanvas = async (): Promise<HTMLCanvasElement | null> => {
    if (!qrCodeRef.current) return null;
    const rawCanvas = await qrCodeRef.current.getRawData('png');
    if (!rawCanvas) return null;

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = resolution;
        tempCanvas.height = resolution;
        const ctx = tempCanvas.getContext('2d');
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0, resolution, resolution);
        const framed = createFramedCanvas(tempCanvas, design);
        resolve(framed);
      };
      img.src = URL.createObjectURL(rawCanvas as Blob);
    });
  };

  const handleDownloadPNG = async () => {
    const canvas = await getRenderedCanvas();
    if (canvas) {
      downloadCanvasAsPNG(canvas, `wdbloog-qr-${qrType}-${Date.now()}.png`);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    }
  };

  const handleDownloadSVG = async () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({
        name: `wdbloog-qr-${qrType}-${Date.now()}`,
        extension: 'svg',
      });
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    }
  };

  const handleDownloadPDF = async () => {
    const canvas = await getRenderedCanvas();
    if (canvas) {
      downloadCanvasAsPDF(canvas, `QR Code: ${qrType.toUpperCase()}`, `wdbloog-qr-${qrType}.pdf`);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    }
  };

  const handleCopyImage = async () => {
    const canvas = await getRenderedCanvas();
    if (canvas) {
      const success = await copyCanvasToClipboard(canvas);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  const handlePrint = async () => {
    const canvas = await getRenderedCanvas();
    if (canvas) {
      printCanvas(canvas, `WDBloog QR - ${qrType.toUpperCase()}`);
    }
  };

  const handleSaveToHistory = () => {
    onSave();
    setSaved(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setSaved(false), 2500);
  };

  const handleShareLink = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  return (
    <div className="sticky top-20 flex flex-col gap-4">
      {/* Main Preview Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col items-center">
        {/* Header */}
        <div className="flex w-full items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {dict.generator.instantPreview}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
            <span>{resolution}x{resolution}px</span>
          </div>
        </div>

        {/* Live Canvas Stage */}
        <div className="relative my-6 flex items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/50 p-6 shadow-inner dark:border-slate-800 dark:bg-slate-950/60 transition-all">
          {/* Decorative Frame Overlay Preview */}
          {design.frameTemplate === 'scan-me' && (
            <div className="absolute top-2 rounded-full bg-slate-900 px-3 py-0.5 text-[10px] font-bold tracking-widest text-white uppercase shadow-sm">
              {design.frameText || 'SCAN ME'}
            </div>
          )}

          <div
            ref={containerRef}
            className="flex items-center justify-center transition-all hover:scale-102"
          />
        </div>

        {/* Scan Hint */}
        <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          <Smartphone className="h-4 w-4 text-blue-500" />
          <span>{dict.generator.scanHint}</span>
        </p>

        {/* Download Buttons Group */}
        <div className="mt-6 w-full space-y-2.5">
          {/* Primary PNG Download */}
          <button
            onClick={handleDownloadPNG}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:opacity-95 hover:shadow-xl active:scale-98 transition-all"
          >
            <Download className="h-4 w-4 stroke-[2.5]" />
            <span>{dict.generator.downloadPng}</span>
          </button>

          {/* Secondary Exports (SVG & PDF) */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownloadSVG}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 transition-colors"
            >
              <FileCode className="h-3.5 w-3.5 text-blue-600" />
              <span>{dict.generator.downloadSvg}</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 transition-colors"
            >
              <FileText className="h-3.5 w-3.5 text-red-600" />
              <span>{dict.generator.downloadPdf}</span>
            </button>
          </div>

          {/* Action Row: Print, Copy, Save, Share */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            <button
              onClick={handlePrint}
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 p-2 text-[10px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300"
              title={dict.generator.print}
            >
              <Printer className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <span>{dict.generator.print}</span>
            </button>

            <button
              onClick={handleCopyImage}
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 p-2 text-[10px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300"
              title={dict.generator.copyImage}
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Copy className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              )}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={handleSaveToHistory}
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 p-2 text-[10px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300"
              title={dict.generator.saveToHistory}
            >
              {saved ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Bookmark className="h-4 w-4 text-amber-500" />
              )}
              <span>{saved ? 'Saved!' : 'Save'}</span>
            </button>

            <button
              onClick={handleShareLink}
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 p-2 text-[10px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300"
              title={dict.generator.shareLink}
            >
              {shared ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Share2 className="h-4 w-4 text-indigo-500" />
              )}
              <span>{shared ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* AdBanner placed strategically below preview on desktop */}
      <AdBanner slot="4314248288" label="Sponsor" />
    </div>
  );
}
