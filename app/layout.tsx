import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { LanguageProvider } from '../components/providers/LanguageProvider';

export const metadata: Metadata = {
  title: 'Free Custom QR Code Generator with Logo & Vector Export - WDBloog',
  description:
    'Create high quality, customized QR codes for URLs, Wi-Fi, vCard contacts, WhatsApp, Emails, PDFs, & Crypto for free. Instant client-side generation with vector SVG & high-res PNG export.',
  metadataBase: new URL('https://qr.wdbloog.com'),
  alternates: {
    canonical: 'https://qr.wdbloog.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: [
    'QR Code Generator',
    'Free QR Code',
    'WiFi QR Code Generator',
    'vCard QR Code Generator',
    'WhatsApp QR Code',
    'Custom QR Code with Logo',
    'Vector SVG QR Code',
    'PDF to QR Code',
    'Crypto QR Code',
    'WDBloog QR',
    'Generative AI Search QR Tool',
    'Free Printable Barcode Generator',
  ],
  authors: [{ name: 'WDBloog Team' }],
  openGraph: {
    title: 'Free Custom QR Code Generator with Logo & SVG Export - WDBloog',
    description:
      'Create customized vector QR codes with logos, custom colors, dot styles, and frames in seconds. 100% free with unlimited scans.',
    url: 'https://qr.wdbloog.com',
    siteName: 'WDBloog QR',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Custom QR Code Generator - WDBloog',
    description: 'Instant, free, client-side vector QR code generator platform.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense Script Integration */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3618365568004987"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body suppressHydrationWarning className="antialiased min-h-screen selection:bg-blue-500 selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
