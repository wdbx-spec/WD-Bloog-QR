export type QRType =
  | 'url'
  | 'wifi'
  | 'vcard'
  | 'email'
  | 'sms'
  | 'crypto'
  | 'pdf'
  | 'text'
  | 'whatsapp'
  | 'event'
  | 'location';

export type DotStyle = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
export type CornerSquareStyle = 'square' | 'dot' | 'extra-rounded';
export type CornerDotStyle = 'square' | 'dot';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type FrameTemplate = 'none' | 'scan-me' | 'bottom-bar' | 'tech-card' | 'badge' | 'banner';

export interface GradientOptions {
  type: 'linear' | 'radial';
  rotation: number;
  colorStops: { offset: number; color: string }[];
}

export interface QRDesignOptions {
  dotStyle: DotStyle;
  cornerSquareStyle: CornerSquareStyle;
  cornerDotStyle: CornerDotStyle;
  
  // Colors
  useGradient: boolean;
  dotsColor: string;
  gradient: GradientOptions;
  bgColor: string;
  transparentBg: boolean;
  
  cornerSquareColor: string;
  cornerDotColor: string;
  
  // Logo
  logoUrl?: string;
  logoSize: number; // 0.1 to 0.4
  logoMargin: number;
  hideDotsBehindLogo: boolean;
  
  // Frame
  frameTemplate: FrameTemplate;
  frameText: string;
  frameColor: string;
  frameTextColor: string;
  
  // Quality
  errorCorrection: ErrorCorrectionLevel;
  size: number; // Render resolution (e.g. 512, 1024, 2048)
}

// Payload Types
export interface URLPayload {
  url: string;
}

export interface WiFiPayload {
  ssid: string;
  password?: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardPayload {
  firstName: string;
  lastName: string;
  organization?: string;
  title?: string;
  phoneMobile?: string;
  phoneWork?: string;
  email?: string;
  url?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  note?: string;
}

export interface EmailPayload {
  email: string;
  subject?: string;
  body?: string;
}

export interface SMSPayload {
  phone: string;
  message?: string;
}

export interface CryptoPayload {
  currency: 'BTC' | 'ETH' | 'USDT' | 'SOL' | 'DOGE';
  address: string;
  amount?: string;
  memo?: string;
}

export interface PDFPayload {
  title: string;
  description?: string;
  fileUrl: string; // URL to hosted document or PDF
  fileName?: string;
}

export interface TextPayload {
  text: string;
}

export interface WhatsAppPayload {
  phone: string;
  message?: string;
}

export interface EventPayload {
  title: string;
  location?: string;
  startTime: string; // ISO or YYYY-MM-DDTHH:mm
  endTime: string;
  description?: string;
  allDay: boolean;
}

export interface LocationPayload {
  latitude: number | string;
  longitude: number | string;
  label?: string;
}

export type QRPayload =
  | URLPayload
  | WiFiPayload
  | VCardPayload
  | EmailPayload
  | SMSPayload
  | CryptoPayload
  | PDFPayload
  | TextPayload
  | WhatsAppPayload
  | EventPayload
  | LocationPayload;

export interface SavedQRItem {
  id: string;
  name: string;
  type: QRType;
  rawContent: string;
  createdAt: string;
  design: QRDesignOptions;
}
