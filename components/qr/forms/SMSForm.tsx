'use client';

import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { SMSPayload } from '../../../lib/qr/types';
import { useLanguage } from '../../providers/LanguageProvider';

interface SMSFormProps {
  payload: SMSPayload;
  onChange: (payload: SMSPayload) => void;
}

export function SMSForm({ payload, onChange }: SMSFormProps) {
  const { dict } = useLanguage();

  return (
    <div className="space-y-3.5">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {dict.types.sms.phone} <span className="text-red-500">*</span>
        </label>
        <div className="relative flex items-center">
          <Phone className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
          <input
            type="tel"
            value={payload.phone}
            onChange={(e) => onChange({ ...payload, phone: e.target.value })}
            placeholder="+1 (555) 019-2834"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {dict.types.sms.message}
        </label>
        <div className="relative flex items-start">
          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
          <textarea
            rows={3}
            value={payload.message || ''}
            onChange={(e) => onChange({ ...payload, message: e.target.value })}
            placeholder="Subscribe to updates"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}
