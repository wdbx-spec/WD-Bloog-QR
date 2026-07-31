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
} from './types';

export function formatQRContent(type: QRType, payload: QRPayload): string {
  switch (type) {
    case 'url': {
      const data = payload as URLPayload;
      if (!data.url) return 'https://qr.wdbloog.com';
      let formatted = data.url.trim();
      if (!/^https?:\/\//i.test(formatted)) {
        formatted = 'https://' + formatted;
      }
      return formatted;
    }

    case 'wifi': {
      const data = payload as WiFiPayload;
      if (!data.ssid) return 'WIFI:S:Sample_WiFi;T:WPA;P:password123;;';
      // WIFI:S:<SSID>;T:<WPA|WEP|nopass>;P:<PASSWORD>;H:<true|false>;;
      const escape = (v: string) => v.replace(/([\\;:,"])/g, '\\$1');
      const ssid = escape(data.ssid);
      const password = data.password ? escape(data.password) : '';
      const encryption = data.encryption || 'WPA';
      const hidden = data.hidden ? 'true' : 'false';
      return `WIFI:S:${ssid};T:${encryption};P:${password};H:${hidden};;`;
    }

    case 'vcard': {
      const data = payload as VCardPayload;
      const firstName = data.firstName || 'John';
      const lastName = data.lastName || 'Doe';
      
      const vcardLines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName};${firstName};;;`,
        `FN:${firstName} ${lastName}`.trim(),
      ];

      if (data.organization) vcardLines.push(`ORG:${data.organization}`);
      if (data.title) vcardLines.push(`TITLE:${data.title}`);
      if (data.phoneMobile) vcardLines.push(`TEL;TYPE=CELL:${data.phoneMobile}`);
      if (data.phoneWork) vcardLines.push(`TEL;TYPE=WORK:${data.phoneWork}`);
      if (data.email) vcardLines.push(`EMAIL;TYPE=INTERNET:${data.email}`);
      if (data.url) vcardLines.push(`URL:${data.url}`);

      if (data.street || data.city || data.state || data.zip || data.country) {
        const street = data.street || '';
        const city = data.city || '';
        const state = data.state || '';
        const zip = data.zip || '';
        const country = data.country || '';
        vcardLines.push(`ADR;TYPE=WORK:;;${street};${city};${state};${zip};${country}`);
      }

      if (data.note) vcardLines.push(`NOTE:${data.note}`);
      vcardLines.push('END:VCARD');

      return vcardLines.join('\n');
    }

    case 'email': {
      const data = payload as EmailPayload;
      if (!data.email) return 'mailto:contact@wdbloog.com';
      const params: string[] = [];
      if (data.subject) params.push(`subject=${encodeURIComponent(data.subject)}`);
      if (data.body) params.push(`body=${encodeURIComponent(data.body)}`);
      const queryString = params.length > 0 ? `?${params.join('&')}` : '';
      return `mailto:${data.email.trim()}${queryString}`;
    }

    case 'sms': {
      const data = payload as SMSPayload;
      if (!data.phone) return 'smsto:+1234567890:Hello!';
      const phone = data.phone.trim();
      const message = data.message ? `:${data.message}` : '';
      return `smsto:${phone}${message}`;
    }

    case 'whatsapp': {
      const data = payload as WhatsAppPayload;
      if (!data.phone) return 'https://wa.me/1234567890';
      const cleanPhone = data.phone.replace(/[^\d+]/g, '');
      const msgParam = data.message ? `?text=${encodeURIComponent(data.message)}` : '';
      return `https://wa.me/${cleanPhone}${msgParam}`;
    }

    case 'crypto': {
      const data = payload as CryptoPayload;
      if (!data.address) return 'bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
      const currency = data.currency || 'BTC';
      const address = data.address.trim();

      switch (currency) {
        case 'BTC': {
          const params: string[] = [];
          if (data.amount) params.push(`amount=${data.amount}`);
          if (data.memo) params.push(`label=${encodeURIComponent(data.memo)}`);
          return `bitcoin:${address}${params.length ? '?' + params.join('&') : ''}`;
        }
        case 'ETH': {
          const params: string[] = [];
          if (data.amount) params.push(`value=${data.amount}`);
          return `ethereum:${address}${params.length ? '?' + params.join('&') : ''}`;
        }
        case 'USDT':
        case 'SOL':
        case 'DOGE': {
          const prefix = currency.toLowerCase();
          const params: string[] = [];
          if (data.amount) params.push(`amount=${data.amount}`);
          return `${prefix}:${address}${params.length ? '?' + params.join('&') : ''}`;
        }
        default:
          return address;
      }
    }

    case 'pdf': {
      const data = payload as PDFPayload;
      if (!data.fileUrl) return 'https://qr.wdbloog.com/pdf-view';
      let formatted = data.fileUrl.trim();
      if (!/^https?:\/\//i.test(formatted)) {
        formatted = 'https://' + formatted;
      }
      return formatted;
    }

    case 'text': {
      const data = payload as TextPayload;
      return data.text ? data.text : 'WDBloog QR Code Generator';
    }

    case 'event': {
      const data = payload as EventPayload;
      if (!data.title) return 'BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Event\nEND:VEVENT\nEND:VCALENDAR';

      const formatICalDate = (isoStr: string) => {
        try {
          const date = new Date(isoStr);
          return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        } catch {
          return isoStr;
        }
      };

      const start = data.startTime ? formatICalDate(data.startTime) : formatICalDate(new Date().toISOString());
      const end = data.endTime ? formatICalDate(data.endTime) : start;

      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//WDBloog QR Code Generator//EN',
        'BEGIN:VEVENT',
        `SUMMARY:${data.title}`,
      ];

      if (data.location) lines.push(`LOCATION:${data.location}`);
      if (data.description) lines.push(`DESCRIPTION:${data.description}`);
      lines.push(`DTSTART:${start}`);
      lines.push(`DTEND:${end}`);
      lines.push('END:VEVENT');
      lines.push('END:VCALENDAR');

      return lines.join('\n');
    }

    case 'location': {
      const data = payload as LocationPayload;
      const lat = data.latitude || 37.7749;
      const lng = data.longitude || -122.4194;
      return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    }

    default:
      return 'https://qr.wdbloog.com';
  }
}
