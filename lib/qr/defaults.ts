import { QRDesignOptions } from './types';

export const DEFAULT_DESIGN_OPTIONS: QRDesignOptions = {
  dotStyle: 'rounded',
  cornerSquareStyle: 'extra-rounded',
  cornerDotStyle: 'dot',
  
  useGradient: false,
  dotsColor: '#0f172a', // Slate 900
  gradient: {
    type: 'linear',
    rotation: 45,
    colorStops: [
      { offset: 0, color: '#2563eb' }, // Blue 600
      { offset: 1, color: '#7c3aed' }, // Purple 600
    ],
  },
  bgColor: '#ffffff',
  transparentBg: false,
  
  cornerSquareColor: '#0f172a',
  cornerDotColor: '#2563eb',
  
  logoUrl: '',
  logoSize: 0.22,
  logoMargin: 6,
  hideDotsBehindLogo: true,
  
  frameTemplate: 'none',
  frameText: 'SCAN ME',
  frameColor: '#0f172a',
  frameTextColor: '#ffffff',
  
  errorCorrection: 'M',
  size: 1024,
};

export interface PresetTheme {
  id: string;
  name: string;
  category: 'professional' | 'vibrant' | 'dark' | 'minimal';
  design: Partial<QRDesignOptions>;
}

export const PRESET_THEMES: PresetTheme[] = [
  {
    id: 'classic-slate',
    name: 'Classic Dark',
    category: 'minimal',
    design: {
      dotStyle: 'rounded',
      cornerSquareStyle: 'extra-rounded',
      cornerDotStyle: 'dot',
      useGradient: false,
      dotsColor: '#0f172a',
      cornerSquareColor: '#0f172a',
      cornerDotColor: '#2563eb',
      bgColor: '#ffffff',
      transparentBg: false,
    },
  },
  {
    id: 'ocean-gradient',
    name: 'Ocean Wave',
    category: 'vibrant',
    design: {
      dotStyle: 'rounded',
      cornerSquareStyle: 'extra-rounded',
      cornerDotStyle: 'dot',
      useGradient: true,
      gradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#0284c7' },
          { offset: 1, color: '#2563eb' },
        ],
      },
      dotsColor: '#0284c7',
      cornerSquareColor: '#0369a1',
      cornerDotColor: '#2563eb',
      bgColor: '#ffffff',
    },
  },
  {
    id: 'emerald-eco',
    name: 'Emerald Green',
    category: 'professional',
    design: {
      dotStyle: 'classy-rounded',
      cornerSquareStyle: 'extra-rounded',
      cornerDotStyle: 'dot',
      useGradient: false,
      dotsColor: '#059669',
      cornerSquareColor: '#047857',
      cornerDotColor: '#10b981',
      bgColor: '#ffffff',
    },
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    category: 'vibrant',
    design: {
      dotStyle: 'dots',
      cornerSquareStyle: 'extra-rounded',
      cornerDotStyle: 'dot',
      useGradient: true,
      gradient: {
        type: 'linear',
        rotation: 135,
        colorStops: [
          { offset: 0, color: '#ea580c' },
          { offset: 1, color: '#e11d48' },
        ],
      },
      dotsColor: '#ea580c',
      cornerSquareColor: '#9a3412',
      cornerDotColor: '#e11d48',
      bgColor: '#ffffff',
    },
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    category: 'professional',
    design: {
      dotStyle: 'classy',
      cornerSquareStyle: 'square',
      cornerDotStyle: 'square',
      useGradient: true,
      gradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#7e22ce' },
          { offset: 1, color: '#c026d3' },
        ],
      },
      dotsColor: '#7e22ce',
      cornerSquareColor: '#581c87',
      cornerDotColor: '#c026d3',
      bgColor: '#ffffff',
    },
  },
  {
    id: 'cyberpunk-dark',
    name: 'Cyber Neon',
    category: 'dark',
    design: {
      dotStyle: 'square',
      cornerSquareStyle: 'square',
      cornerDotStyle: 'square',
      useGradient: false,
      dotsColor: '#06b6d4',
      cornerSquareColor: '#06b6d4',
      cornerDotColor: '#f43f5e',
      bgColor: '#090d16',
    },
  },
  {
    id: 'golden-luxury',
    name: 'Golden Elegance',
    category: 'professional',
    design: {
      dotStyle: 'classy-rounded',
      cornerSquareStyle: 'extra-rounded',
      cornerDotStyle: 'dot',
      useGradient: true,
      gradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#b45309' },
          { offset: 1, color: '#f59e0b' },
        ],
      },
      dotsColor: '#b45309',
      cornerSquareColor: '#78350f',
      cornerDotColor: '#d97706',
      bgColor: '#ffffff',
    },
  },
  {
    id: 'minimal-mono',
    name: 'Monochrome',
    category: 'minimal',
    design: {
      dotStyle: 'square',
      cornerSquareStyle: 'square',
      cornerDotStyle: 'square',
      useGradient: false,
      dotsColor: '#000000',
      cornerSquareColor: '#000000',
      cornerDotColor: '#000000',
      bgColor: '#ffffff',
    },
  },
];

export const PRESET_LOGOS = [
  { id: 'none', label: 'None', url: '' },
  {
    id: 'wifi',
    label: 'Wi-Fi',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%232563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%2325D366"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>',
  },
  {
    id: 'bitcoin',
    label: 'Bitcoin',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%23F7931A"><path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.24 14.903.358c6.43 1.605 10.342 8.115 8.735 14.546zM15.86 10.322c.287-1.92-1.173-2.952-3.17-3.64l.648-2.602-1.583-.395-.63 2.532c-.416-.104-.843-.203-1.268-.3l.635-2.547-1.583-.396-.648 2.597c-.344-.078-.686-.156-1.018-.237l.002-.01-2.185-.546-.421 1.691s1.176.27 1.15.286c.642.16.758.586.739.923l-.74 2.968c.044.011.102.028.165.053l-.168-.042-1.037 4.156c-.078.194-.277.485-.724.373.016.024-1.151-.287-1.151-.287l-.786 1.812 2.062.514c.384.096.76.197 1.13.292l-.656 2.637 1.582.395.648-2.6c.433.117.854.225 1.265.328l-.645 2.59 1.584.395.656-2.632c2.698.51 4.726.305 5.58-2.135.69-1.964-.034-3.097-1.455-3.834 1.035-.238 1.815-.918 2.022-2.32zm-3.62 4.96c-.49 1.966-3.8.904-4.872.637l.869-3.486c1.072.268 4.502.8 4.003 2.849zm.49-4.982c-.446 1.789-3.205.88-4.1.656l.789-3.163c.895.223 3.766.64 3.311 2.507z"/></svg>',
  },
  {
    id: 'user',
    label: 'Contact / vCard',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%232563eb"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
  },
  {
    id: 'email',
    label: 'Email',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%23ea580c"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  },
  {
    id: 'globe',
    label: 'Website / Link',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%230284c7"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
  },
  {
    id: 'pdf',
    label: 'PDF Document',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%23dc2626"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5z"/></svg>',
  },
];
