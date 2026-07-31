'use client';

import React, { useState } from 'react';
import {
  CryptoPayload,
  EmailPayload,
  EventPayload,
  LocationPayload,
  PDFPayload,
  QRPayload,
  QRType,
  SMSPayload,
  TextPayload,
  URLPayload,
  VCardPayload,
  WhatsAppPayload,
  WiFiPayload,
  QRDesignOptions,
  SavedQRItem,
} from '../../lib/qr/types';
import { DEFAULT_DESIGN_OPTIONS } from '../../lib/qr/defaults';
import { formatQRContent } from '../../lib/qr/generator';
import { saveQRToHistory } from '../../lib/storage';
import { QRTypeTabs } from './QRTypeTabs';
import { DesignCustomizer } from './customizer/DesignCustomizer';
import { QRPreview } from './QRPreview';
import { URLForm } from './forms/URLForm';
import { WiFiForm } from './forms/WiFiForm';
import { VCardForm } from './forms/VCardForm';
import { EmailForm } from './forms/EmailForm';
import { SMSForm } from './forms/SMSForm';
import { CryptoForm } from './forms/CryptoForm';
import { PDFForm } from './forms/PDFForm';
import { TextForm } from './forms/TextForm';
import { WhatsAppForm } from './forms/WhatsAppForm';
import { EventForm } from './forms/EventForm';
import { LocationForm } from './forms/LocationForm';
import { useLanguage } from '../providers/LanguageProvider';
import { Sparkles, SlidersHorizontal, Eye } from 'lucide-react';

interface QRWorkspaceProps {
  initialType?: QRType;
  onTypeChange?: (type: QRType) => void;
  onUpdateHistoryCount?: () => void;
  scannedPayload?: string | null;
}

export function QRWorkspace({ initialType = 'url', onTypeChange, onUpdateHistoryCount, scannedPayload }: QRWorkspaceProps) {
  const { dict } = useLanguage();
  const [qrType, setQrType] = useState<QRType>(initialType);

  const handleSelectType = (t: QRType) => {
    setQrType(t);
    if (onTypeChange) {
      onTypeChange(t);
    }
  };

  // Payloads State
  const [urlPayload, setUrlPayload] = useState<URLPayload>({ url: 'https://wdbloog.com' });
  const [wifiPayload, setWifiPayload] = useState<WiFiPayload>({
    ssid: 'WDBloog_WiFi',
    password: 'Password123!',
    encryption: 'WPA',
    hidden: false,
  });
  const [vcardPayload, setVcardPayload] = useState<VCardPayload>({
    firstName: 'John',
    lastName: 'Doe',
    phoneMobile: '+1 (555) 019-2834',
    email: 'john@wdbloog.com',
    organization: 'WDBloog Inc',
    title: 'Product Manager',
    url: 'https://wdbloog.com',
    city: 'San Francisco, CA',
  });
  const [emailPayload, setEmailPayload] = useState<EmailPayload>({
    email: 'contact@wdbloog.com',
    subject: 'Inquiry',
    body: 'Hello WDBloog Team...',
  });
  const [smsPayload, setSmsPayload] = useState<SMSPayload>({
    phone: '+15550192834',
    message: 'Hello!',
  });
  const [cryptoPayload, setCryptoPayload] = useState<CryptoPayload>({
    currency: 'BTC',
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    amount: '0.05',
    memo: 'WDBloog payment',
  });
  const [pdfPayload, setPdfPayload] = useState<PDFPayload>({
    title: 'WDBloog Catalog 2026',
    fileUrl: 'https://wdbloog.com/sample-catalog.pdf',
    description: 'Scan to download PDF document',
  });
  const [textPayload, setTextPayload] = useState<TextPayload>({
    text: 'Welcome to WDBloog QR Code Generator!',
  });
  const [whatsappPayload, setWhatsappPayload] = useState<WhatsAppPayload>({
    phone: '+14155552671',
    message: 'Hello! I scanned your QR code on WDBloog.',
  });
  const [eventPayload, setEventPayload] = useState<EventPayload>({
    title: 'WDBloog Launch Event',
    startTime: '2026-08-15T10:00',
    endTime: '2026-08-15T12:00',
    location: 'San Francisco, CA',
    description: 'Official WDBloog QR Platform Launch',
    allDay: false,
  });
  const [locationPayload, setLocationPayload] = useState<LocationPayload>({
    latitude: '37.7749',
    longitude: '-122.4194',
    label: 'San Francisco Headquarters',
  });

  // Handle scanned payload auto-fill
  React.useEffect(() => {
    if (!scannedPayload) return;
    const isLink = scannedPayload.startsWith('http://') || scannedPayload.startsWith('https://');
    const timer = setTimeout(() => {
      if (isLink) {
        setQrType('url');
        setUrlPayload({ url: scannedPayload });
      } else {
        setQrType('text');
        setTextPayload({ text: scannedPayload });
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [scannedPayload]);

  // Design Customization State
  const [design, setDesign] = useState<QRDesignOptions>(DEFAULT_DESIGN_OPTIONS);

  // Active Payload accessor
  const getCurrentPayload = (): QRPayload => {
    switch (qrType) {
      case 'url':
        return urlPayload;
      case 'wifi':
        return wifiPayload;
      case 'vcard':
        return vcardPayload;
      case 'email':
        return emailPayload;
      case 'sms':
        return smsPayload;
      case 'crypto':
        return cryptoPayload;
      case 'pdf':
        return pdfPayload;
      case 'text':
        return textPayload;
      case 'whatsapp':
        return whatsappPayload;
      case 'event':
        return eventPayload;
      case 'location':
        return locationPayload;
      default:
        return urlPayload;
    }
  };

  const rawContent = formatQRContent(qrType, getCurrentPayload());

  const handleSaveToHistory = () => {
    saveQRToHistory({
      name: `${qrType.toUpperCase()} QR - ${new Date().toLocaleTimeString()}`,
      type: qrType,
      rawContent,
      design,
    });
    if (onUpdateHistoryCount) onUpdateHistoryCount();
  };

  return (
    <div className="w-full space-y-6">
      {/* Selector Bar */}
      <QRTypeTabs activeType={qrType} onSelectType={handleSelectType} />

      {/* Main Split-Screen Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Form & Customizer (7 Cols on Desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1 & 2: Input Data Form Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 transition-all">
            <div className="mb-4 flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  {dict.generator.enterData}
                </h2>
              </div>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400 uppercase">
                Type: {qrType}
              </span>
            </div>

            {/* Render active form */}
            {qrType === 'url' && <URLForm payload={urlPayload} onChange={setUrlPayload} />}
            {qrType === 'wifi' && <WiFiForm payload={wifiPayload} onChange={setWifiPayload} />}
            {qrType === 'vcard' && <VCardForm payload={vcardPayload} onChange={setVcardPayload} />}
            {qrType === 'email' && <EmailForm payload={emailPayload} onChange={setEmailPayload} />}
            {qrType === 'sms' && <SMSForm payload={smsPayload} onChange={setSmsPayload} />}
            {qrType === 'crypto' && <CryptoForm payload={cryptoPayload} onChange={setCryptoPayload} />}
            {qrType === 'pdf' && <PDFForm payload={pdfPayload} onChange={setPdfPayload} />}
            {qrType === 'text' && <TextForm payload={textPayload} onChange={setTextPayload} />}
            {qrType === 'whatsapp' && (
              <WhatsAppForm payload={whatsappPayload} onChange={setWhatsappPayload} />
            )}
            {qrType === 'event' && <EventForm payload={eventPayload} onChange={setEventPayload} />}
            {qrType === 'location' && (
              <LocationForm payload={locationPayload} onChange={setLocationPayload} />
            )}
          </div>

          {/* Step 3: Design Customizer Card */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <Sparkles className="h-4 w-4 text-purple-600 animate-pulse" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {dict.generator.customize}
              </h2>
            </div>
            <DesignCustomizer design={design} onChange={setDesign} />
          </div>
        </div>

        {/* Right Column: Sticky Live QR Preview (5 Cols on Desktop) */}
        <div className="lg:col-span-5">
          <QRPreview
            rawContent={rawContent}
            design={design}
            qrType={qrType}
            onSave={handleSaveToHistory}
          />
        </div>
      </div>
    </div>
  );
}
