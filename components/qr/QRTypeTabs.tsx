'use client';

import React from 'react';
import {
  Globe,
  Wifi,
  Contact,
  Mail,
  MessageSquare,
  Bitcoin,
  FileText,
  Type,
  PhoneCall,
  Calendar,
  MapPin,
} from 'lucide-react';
import { QRType } from '../../lib/qr/types';

export const QR_TYPES: { id: QRType; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'url', label: 'URL / Link', icon: Globe, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60' },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi, color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/60' },
  { id: 'vcard', label: 'vCard Contact', icon: Contact, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60' },
  { id: 'email', label: 'Email', icon: Mail, color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/60' },
  { id: 'sms', label: 'SMS Text', icon: MessageSquare, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60' },
  { id: 'crypto', label: 'Crypto', icon: Bitcoin, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60' },
  { id: 'pdf', label: 'PDF File', icon: FileText, color: 'text-red-500 bg-red-50 dark:bg-red-950/60' },
  { id: 'text', label: 'Plain Text', icon: Type, color: 'text-slate-500 bg-slate-100 dark:bg-slate-800' },
  { id: 'whatsapp', label: 'WhatsApp', icon: PhoneCall, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' },
  { id: 'event', label: 'Event', icon: Calendar, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60' },
  { id: 'location', label: 'Location', icon: MapPin, color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/60' },
];

interface QRTypeTabsProps {
  activeType: QRType;
  onSelectType: (type: QRType) => void;
}

export function QRTypeTabs({ activeType, onSelectType }: QRTypeTabsProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 no-scrollbar">
      <div className="flex items-center gap-2 min-w-max p-1">
        {QR_TYPES.map((type) => {
          const Icon = type.icon;
          const isActive = activeType === type.id;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onSelectType(type.id)}
              className={`flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 dark:bg-white dark:text-slate-900 scale-102'
                  : 'border border-slate-200/80 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-lg ${
                  isActive ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900' : type.color
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span>{type.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
