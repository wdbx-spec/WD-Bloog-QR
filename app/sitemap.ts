import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://qr.wdbloog.com';

  const seoRoutes = [
    '',
    '/url-qr-code',
    '/wifi-qr-code',
    '/vcard-qr-code',
    '/email-qr-code',
    '/sms-qr-code',
    '/crypto-qr-code',
    '/pdf-to-qr-code',
    '/text-qr-code',
    '/whatsapp-qr-code',
    '/event-qr-code',
    '/location-qr-code',
  ];

  const routesMap: MetadataRoute.Sitemap = seoRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routesMap;
}
