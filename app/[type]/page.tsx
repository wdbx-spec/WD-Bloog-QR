import React from 'react';
import { notFound } from 'next/navigation';
import { QRType } from '../../lib/qr/types';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { QRWorkspace } from '../../components/qr/QRWorkspace';
import { SEOContent } from '../../components/seo/SEOContent';
import { Sparkles } from 'lucide-react';

interface SEOPageProps {
  params: Promise<{ type: string }>;
}

const SEO_SLUG_MAP: Record<string, { type: QRType; title: string; subtitle: string; desc: string }> = {
  'url-qr-code': {
    type: 'url',
    title: 'Free Website URL QR Code Generator - WDBloog',
    subtitle: 'Create vector URL QR codes for websites, landing pages, menus, and social links.',
    desc: 'Generate custom URL QR codes with logos, custom dot styles, and vector SVG exports for free.',
  },
  'wifi-qr-code': {
    type: 'wifi',
    title: 'Free Wi-Fi QR Code Generator - Instant Connection',
    subtitle: 'Connect guests and customers to Wi-Fi instantly without typing long passwords.',
    desc: 'Easily encode Wi-Fi network SSID, WPA2/WPA3 passwords, and security settings into printable QR codes.',
  },
  'vcard-qr-code': {
    type: 'vcard',
    title: 'Free vCard Contact QR Code Generator - Digital Business Card',
    subtitle: 'Share your name, phone, email, and company straight to smartphone contact lists.',
    desc: 'Create digital vCard QR codes for business cards, resumes, email signatures, and badges.',
  },
  'email-qr-code': {
    type: 'email',
    title: 'Free Email QR Code Generator - Pre-filled Messages',
    subtitle: 'Open pre-filled emails with recipient, subject line, and body text in one scan.',
    desc: 'Generate Mailto QR codes for customer support, inquiries, and feedback forms.',
  },
  'sms-qr-code': {
    type: 'sms',
    title: 'Free SMS QR Code Generator - Direct Text Messages',
    subtitle: 'Send pre-written text messages to a phone number instantly upon scanning.',
    desc: 'Create SMS text message QR codes for marketing subscriptions, confirmations, and alerts.',
  },
  'crypto-qr-code': {
    type: 'crypto',
    title: 'Free Crypto Payment QR Code Generator - BTC, ETH, USDT & SOL',
    subtitle: 'Accept Bitcoin, Ethereum, USDT, Solana, and Dogecoin payments effortlessly.',
    desc: 'Generate wallet address QR codes with pre-filled payment amounts and memo notes.',
  },
  'pdf-to-qr-code': {
    type: 'pdf',
    title: 'Free PDF to QR Code Generator - Share Documents & Menus',
    subtitle: 'Share restaurant menus, product catalogs, brochures, and PDF documents.',
    desc: 'Convert any hosted PDF link into a customized printable QR code.',
  },
  'text-qr-code': {
    type: 'text',
    title: 'Free Plain Text QR Code Generator',
    subtitle: 'Encode plain text, serial numbers, passcodes, or messages into a QR code.',
    desc: 'Create plain text QR codes with instant client-side generation.',
  },
  'whatsapp-qr-code': {
    type: 'whatsapp',
    title: 'Free WhatsApp QR Code Generator - Direct Chat Links',
    subtitle: 'Start direct WhatsApp chats with customers using custom welcome messages.',
    desc: 'Generate WhatsApp click-to-chat QR codes for business support and customer service.',
  },
  'event-qr-code': {
    type: 'event',
    title: 'Free Calendar Event QR Code Generator - iCalendar Event',
    subtitle: 'Add meetings, webinars, and events directly to mobile calendars.',
    desc: 'Create iCal event QR codes with start time, location, and event description.',
  },
  'location-qr-code': {
    type: 'location',
    title: 'Free Location & Map QR Code Generator - Google Maps Pin',
    subtitle: 'Share business GPS coordinates and Google Maps locations effortlessly.',
    desc: 'Generate location map QR codes for directions, store locations, and venues.',
  },
};

export async function generateStaticParams() {
  return Object.keys(SEO_SLUG_MAP).map((slug) => ({
    type: slug,
  }));
}

export async function generateMetadata({ params }: SEOPageProps) {
  const { type } = await params;
  const item = SEO_SLUG_MAP[type];
  if (!item) return {};

  const url = `https://qr.wdbloog.com/${type}`;

  return {
    title: item.title,
    description: item.desc,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: item.title,
      description: item.desc,
      url: url,
      siteName: 'WDBloog QR',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.desc,
    },
  };
}

export default async function SEOQRPage({ params }: SEOPageProps) {
  const { type } = await params;
  const config = SEO_SLUG_MAP[type];

  if (!config) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full space-y-10">
        {/* SEO Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-300 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
            <span>Dedicated {config.type.toUpperCase()} QR Generator</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {config.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            {config.subtitle}
          </p>
        </div>

        {/* QR Workspace initialized with specific QR type */}
        <QRWorkspace initialType={config.type} />

        {/* SEO Content below workspace */}
        <SEOContent type={config.type} title={config.title} description={config.desc} />
      </main>

      <Footer />
    </div>
  );
}
