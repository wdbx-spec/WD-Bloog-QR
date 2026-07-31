'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Download,
  HelpCircle,
  ChevronDown,
  Globe,
  Smartphone,
  CheckCircle2,
  FileCheck,
  Cpu,
  Lock,
  Layers,
  Search,
} from 'lucide-react';
import { QRType } from '../../lib/qr/types';
import { useLanguage } from '../providers/LanguageProvider';
import { AdBanner } from '../ads/AdBanner';

interface SEOContentProps {
  type: QRType;
  title: string;
  description: string;
}

const TYPE_SPECIFIC_FAQS: Record<QRType, { q: string; a: string }[]> = {
  url: [
    {
      q: 'How does a Website URL QR code work when scanned?',
      a: 'When scanned by any smartphone camera or QR reader app, a Website URL QR code instantly opens your designated web page, landing page, or online store without typing long web addresses.',
    },
    {
      q: 'Can I customize my Website QR code with a company logo?',
      a: 'Yes! You can upload your custom business logo or select from preset brand icons, change dot patterns, apply linear gradients, and add frame templates like "SCAN ME".',
    },
  ],
  wifi: [
    {
      q: 'How do guests connect to Wi-Fi using a Wi-Fi QR code?',
      a: 'When guests scan your Wi-Fi QR code with their mobile phone camera (iOS or Android), a prompt appears to automatically join the network without typing or revealing your Wi-Fi password.',
    },
    {
      q: 'Does a Wi-Fi QR code work on both iPhone and Android devices?',
      a: 'Yes! Modern iPhones (iOS 11+) and Android devices (Android 10+) natively support Wi-Fi QR code scanning directly through the default camera app.',
    },
    {
      q: 'Is my Wi-Fi network password stored on any server?',
      a: 'No. All Wi-Fi QR codes are generated 100% client-side inside your browser. Your network SSID and password never leave your device.',
    },
  ],
  vcard: [
    {
      q: 'What information is stored inside a vCard Contact QR code?',
      a: 'A vCard QR code encodes your full name, mobile phone number, work phone, email address, company name, job title, office address, website URL, and custom notes.',
    },
    {
      q: 'What happens when someone scans my vCard QR code?',
      a: 'Scanning a vCard QR code prompts the user\'s phone to save a new contact directly into Apple Contacts or Google Contacts with all fields automatically pre-filled.',
    },
    {
      q: 'Why should I export my vCard QR code in vector SVG format?',
      a: 'Vector SVG files scale infinitely without losing crispness or resolution, making SVG ideal for printing on high-grade business cards, badges, and promotional flyers.',
    },
  ],
  email: [
    {
      q: 'How does an Email QR code simplify user communications?',
      a: 'Scanning an Email QR code launches the user\'s default mail application (Apple Mail, Gmail, Outlook) pre-filled with the recipient email address, subject line, and body message.',
    },
    {
      q: 'Can I set up pre-formatted email templates for customer inquiries?',
      a: 'Yes! You can define a default subject (e.g. "Product Support Inquiry") and template text so customers can send structured messages with a single tap.',
    },
  ],
  sms: [
    {
      q: 'What happens when an SMS QR code is scanned?',
      a: 'Scanning an SMS QR code opens the smartphone\'s native text messaging app with your destination phone number and pre-composed SMS message ready to send.',
    },
    {
      q: 'How can businesses leverage SMS QR codes for marketing?',
      a: 'SMS QR codes are commonly used for opt-in marketing subscriptions, coupon code redemptions, appointment confirmations, and customer feedback.',
    },
  ],
  crypto: [
    {
      q: 'Which cryptocurrencies can I accept with WDBloog Crypto QR codes?',
      a: 'WDBloog supports Bitcoin (BTC), Ethereum (ETH), Tether (USDT), Solana (SOL), and Dogecoin (DOGE).',
    },
    {
      q: 'How does scanning a Crypto QR code prevent transaction errors?',
      a: 'Scanning the QR code inside crypto wallet apps automatically populates the recipient wallet address and payment amount, eliminating manual copy-paste errors.',
    },
    {
      q: 'Are my crypto wallet details safe when creating a QR code here?',
      a: 'Yes! All QR code encoding occurs 100% in your local browser memory. Your wallet addresses and private details are never stored or transmitted externally.',
    },
  ],
  pdf: [
    {
      q: 'How do users view my PDF document through a QR code?',
      a: 'When scanned, the QR code redirects users directly to your hosted PDF file link (e.g., restaurant menu, catalog, or brochure) for instant viewing or downloading.',
    },
    {
      q: 'Can I update the PDF file without changing the printed QR code?',
      a: 'Yes! As long as your PDF file is hosted at a permanent URL, replacing or updating the document at that link keeps your printed QR code working seamlessly.',
    },
  ],
  text: [
    {
      q: 'What type of content can I encode in a Plain Text QR code?',
      a: 'You can encode text notes, instructions, serial numbers, activation keys, quotes, or Wi-Fi passwords directly as plain unformatted text.',
    },
    {
      q: 'Do Plain Text QR codes work without an internet connection?',
      a: 'Yes! Because the text payload is encoded directly into the QR pattern, smartphone cameras can scan and display the text offline without cellular data or Wi-Fi.',
    },
  ],
  whatsapp: [
    {
      q: 'How does a WhatsApp QR code start a direct chat?',
      a: 'Scanning a WhatsApp QR code opens a direct chat window with your phone number in the official WhatsApp app or WhatsApp Web without adding you to contacts first.',
    },
    {
      q: 'Can I include a pre-written message for customer inquiries on WhatsApp?',
      a: 'Yes! You can set a welcome message like "Hello! I scanned your QR code and would like more information", giving customers an effortless way to initiate contact.',
    },
  ],
  event: [
    {
      q: 'What happens when an Event QR code is scanned by a smartphone?',
      a: 'Scanning an Event QR code prompts the phone to save the event (with title, start/end time, location, and description) directly to Apple Calendar or Google Calendar.',
    },
    {
      q: 'Can I create calendar QR codes for all-day events or multi-hour meetings?',
      a: 'Yes! You can specify exact start and end times or toggle an all-day event setting ideal for conferences, weddings, concerts, and workshops.',
    },
  ],
  location: [
    {
      q: 'How does a Google Maps Location QR code provide directions?',
      a: 'Scanning a Location QR code opens Google Maps or Apple Maps pinpointed directly to your specified GPS coordinates or business address for instant navigation.',
    },
    {
      q: 'Where should I place Location QR codes for best results?',
      a: 'Location QR codes are ideal for print invitations, store signs, posters, business cards, and event banners so visitors can get turn-by-turn directions.',
    },
  ],
};

const GENERIC_FAQS = [
  {
    q: `Are the QR codes generated on WDBloog 100% free forever?`,
    a: `Yes! All QR codes generated on qr.wdbloog.com are 100% free for commercial and personal use with unlimited scans. There are no scan limits, hidden fees, or subscription locks.`,
  },
  {
    q: `Do these QR codes expire?`,
    a: `No. Standard static QR codes created on WDBloog contain direct encoded payload data (such as your URL, Wi-Fi credentials, or vCard) and will never expire as long as your destination link or info remains active.`,
  },
  {
    q: `Can I download vector SVG format for printing?`,
    a: `Absolutely! WDBloog supports resolution-independent SVG vector export as well as ultra high-resolution PNG (up to 2048x2048px) and print-ready PDF files ideal for billboards, business cards, and flyers.`,
  },
  {
    q: `Is my data private and secure?`,
    a: `Yes. All QR code generation is processed 100% client-side inside your browser. Your sensitive information (Wi-Fi passwords, contact details, private URLs) is never sent to or stored on external servers.`,
  },
  {
    q: `How do I add my custom business logo inside the QR code?`,
    a: `Simply select the "Center Logo" tab in our customization panel. You can pick from built-in brand icons (Wi-Fi, WhatsApp, Bitcoin, Contact, etc.) or upload your own PNG/SVG logo image. We automatically boost error correction to level H for flawless scanning.`,
  },
];

export function SEOContent({ type, title, description }: SEOContentProps) {
  const { dict } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const typeFaqs = TYPE_SPECIFIC_FAQS[type] || TYPE_SPECIFIC_FAQS.url;
  const faqs = [...typeFaqs, ...GENERIC_FAQS];

  // Schema JSON-LD Data for WebSite, SoftwareApplication, FAQPage, HowTo, BreadcrumbList
  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WDBloog QR Code Generator',
    url: 'https://qr.wdbloog.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://qr.wdbloog.com/{type}',
      'query-input': 'required name=type',
    },
  };

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WDBloog Platform',
    url: 'https://qr.wdbloog.com',
    logo: 'https://qr.wdbloog.com/icon.png',
    sameAs: ['https://wdbloog.com'],
  };

  const jsonLdSoftware = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `WDBloog ${type.toUpperCase()} QR Code Generator`,
    operatingSystem: 'All (Web, iOS, Android, Windows, macOS, Linux)',
    applicationCategory: 'UtilitiesApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: description,
    featureList: [
      '100% Free Unlimited Scans',
      'Client-Side Private Generation',
      'Vector SVG & High-Res PNG Export',
      'Custom Logo & Branding Embedding',
      'High Error Correction (Level H)',
      '11 Content Formats (URL, Wi-Fi, vCard, Crypto, PDF, WhatsApp, SMS, Email)',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.95',
      reviewCount: '24300',
    },
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const jsonLdHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Generate a Free ${type.toUpperCase()} QR Code`,
    description: `Step-by-step instructions for creating customized, vector-compatible ${type.toUpperCase()} QR codes with custom logos and print-ready downloads.`,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Input Content Payload',
        text: 'Select your target QR code type (URL, Wi-Fi, vCard, WhatsApp, Crypto, PDF) and enter your specific data fields.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Design & Customize Visual Style',
        text: 'Customize dot styles, background colors, linear gradients, add a center logo image, and frame text like "SCAN ME".',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Export Vector SVG or High-Res PNG',
        text: 'Download your crisp vector SVG file for commercial printing or high-definition PNG image for digital sharing.',
      },
    ],
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://qr.wdbloog.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${type.toUpperCase()} QR Code Generator`,
        item: `https://qr.wdbloog.com/${type}-qr-code`,
      },
    ],
  };

  return (
    <section id="seo-content" className="w-full space-y-12 py-10">
      {/* Schema Injection for Search Engines & AI Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* AI Search & Generative AI Optimization Brief (GEO/AEO Entity Block) */}
      <article className="rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white p-6 sm:p-8 dark:border-blue-900/50 dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Cpu className="h-4 w-4" />
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            WDBloog QR Code Platform Specifications (AI Search Summary)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong>WDBloog QR Code Generator</strong> is a specialized, high-performance web platform for generating 2D barcode matrix patterns (ISO/IEC 18004 standards). All rendering takes place strictly on the client side using HTML5 Canvas and SVG vector elements, ensuring 100% data privacy with zero server retention.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="rounded-xl border border-blue-100 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-950/60">
            <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Privacy Engine</div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">100% Local In-Browser Canvas</div>
          </div>
          <div className="rounded-xl border border-blue-100 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-950/60">
            <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Export Formats</div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">SVG Vector, PNG (2048px), PDF</div>
          </div>
          <div className="rounded-xl border border-blue-100 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-950/60">
            <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Error Correction</div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">Level L, M, Q, & H (Up to 30%)</div>
          </div>
        </div>
      </article>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Zap,
            title: '100% Client-Side Speed',
            desc: 'Instant rendering in your browser with zero server latency or data tracking.',
            color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60',
          },
          {
            icon: Download,
            title: 'Vector SVG & HD PNG',
            desc: 'Export crisp vector graphics or high-res PNG up to 2048px for professional printing.',
            color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60',
          },
          {
            icon: Sparkles,
            title: 'Custom Branding',
            desc: 'Add company logos, gradient dots, corner eye styles, and "SCAN ME" frames.',
            color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60',
          },
          {
            icon: ShieldCheck,
            title: 'Unlimited Free Scans',
            desc: 'No scan caps, no expiration dates, and no registration required.',
            color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-all hover:shadow-md"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color} mb-3`}>
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Strategic Ad placement between content sections */}
      <AdBanner slot="4314248288" label="Advertisement" />

      {/* Technical Feature Data Table (For GEO & Google Structured Snippets) */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Supported QR Code Types & Capabilities Comparison
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Detailed technical breakdown of supported payload schemes for digital scanners and search AI agents.
        </p>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50 text-slate-900 dark:text-white font-bold">
                <th className="py-3 px-4">QR Payload Type</th>
                <th className="py-3 px-4">Standard Protocol</th>
                <th className="py-3 px-4">Recommended Format</th>
                <th className="py-3 px-4">Native Phone Support</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">URL / Web Link</td>
                <td className="py-3 px-4 font-mono text-[11px]">https://</td>
                <td className="py-3 px-4">Vector SVG / PNG</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">100% Universal</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Wi-Fi Connection</td>
                <td className="py-3 px-4 font-mono text-[11px]">WIFI:S:ssid;P:pass;;</td>
                <td className="py-3 px-4">Printable Acrylic / SVG</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">iOS 11+ & Android 10+</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">vCard Contact</td>
                <td className="py-3 px-4 font-mono text-[11px]">BEGIN:VCARD v3.0</td>
                <td className="py-3 px-4">Business Cards / High-Res PNG</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">Apple & Google Contacts</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Crypto Wallet</td>
                <td className="py-3 px-4 font-mono text-[11px]">bitcoin: / ethereum:</td>
                <td className="py-3 px-4">PNG with Center Logo</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">All Crypto Wallet Apps</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">WhatsApp Chat</td>
                <td className="py-3 px-4 font-mono text-[11px]">https://wa.me/phone</td>
                <td className="py-3 px-4">Storefront Display / PNG</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">WhatsApp & Web App</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* How To Section */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {dict.seo.howToTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Generate custom, print-ready QR codes for marketing, business cards, Wi-Fi sharing, and events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {[
            {
              step: '01',
              title: 'Select Content Type & Data',
              desc: 'Choose your desired format (URL, Wi-Fi, vCard, WhatsApp, Email, or PDF) and fill in the fields.',
            },
            {
              step: '02',
              title: 'Customize Design & Logo',
              desc: 'Select dot patterns, custom gradients, upload your business logo, and choose a scan frame template.',
            },
            {
              step: '03',
              title: 'Download & Print Anywhere',
              desc: 'Download your QR code in high-res PNG, vector SVG, or print directly on flyers and products.',
            },
          ].map((item, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center p-4">
              <span className="text-3xl font-extrabold text-blue-600/20 dark:text-blue-400/20 mb-1 font-mono">
                {item.step}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Glossary & Key Term Definitions for GEO (Answer Engine Optimization) */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            QR Code Technology & Terms Explained
          </h2>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40">
            <dt className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              What is QR Code Error Correction (Level H)?
            </dt>
            <dd className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Reed-Solomon error correction allows QR codes to remain scannable even if up to 30% of the symbol is covered by a custom central logo image or scratched on printed paper.
            </dd>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40">
            <dt className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              Why Choose Vector SVG over PNG for Commercial Printing?
            </dt>
            <dd className="text-slate-600 dark:text-slate-400 leading-relaxed">
              SVG (Scalable Vector Graphics) is a resolution-independent format composed of math vectors. It can be scaled to billboard dimensions without pixelation or blurriness.
            </dd>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40">
            <dt className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              What is Client-Side QR Generation?
            </dt>
            <dd className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Client-side generation executes encoding algorithms directly inside your web browser engine. Your Wi-Fi passwords, vCard details, and private links are never transmitted across the web.
            </dd>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40">
            <dt className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              Are Static QR Codes Safe from Expiration?
            </dt>
            <dd className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes! Static QR codes directly encode data into the matrix dots. Unlike dynamic QR codes that rely on third-party tracking links, static QR codes work indefinitely for free.
            </dd>
          </div>
        </dl>
      </div>

      {/* FAQ Accordion Section */}
      <div id="faq-section" className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {dict.seo.faqTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Answers to common questions about QR code generation and commercial usage.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/50 overflow-hidden dark:border-slate-800 dark:bg-slate-950/40 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-4 text-left text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs leading-relaxed text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
