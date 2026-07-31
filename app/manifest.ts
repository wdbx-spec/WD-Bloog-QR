import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WDBloog QR Code Generator',
    short_name: 'WDBloog QR',
    description: 'Free custom QR code generator platform supporting vector SVG, PNG, PDF, logos, and custom styles.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: 'https://picsum.photos/seed/wdbloogqr/192/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://picsum.photos/seed/wdbloogqr/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
