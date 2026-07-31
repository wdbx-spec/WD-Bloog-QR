'use client';

import React from 'react';
import { PhoneCall, MessageSquare } from 'lucide-react';
import { WhatsAppPayload } from '../../../lib/qr/types';
import { useLanguage } from '../../providers/LanguageProvider';

interface WhatsAppFormProps {
  payload: WhatsAppPayload;
  onChange: (payload: WhatsAppPayload) => void;
}

export function WhatsAppForm({ payload, onChange }: WhatsAppFormProps) {
  const { dict } = useLanguage();

  return (
    <div className="space-y-3.5">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {dict.types.whatsapp.phone} <span className="text-red-500">*</span>
        </label>
        <div className="relative flex items-center">
          <PhoneCall className="absolute left-3 h-4 w-4 text-emerald-600 rtl:right-3 rtl:left-auto" />
          <input
            type="tel"
            value={payload.phone}
            onChange={(e) => onChange({ ...payload, phone: e.target.value })}
            placeholder="+14155552671"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            required
          />
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Include country code without spaces or dashes (e.g., +1... or +44...)</p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {dict.types.whatsapp.message}
        </label>
        <div className="relative flex items-start">
          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
          <textarea
            rows={3}
            value={payload.message || ''}
            onChange={(e) => onChange({ ...payload, message: e.target.value })}
            placeholder="Hello! I scanned your QR code and would like more info."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}
