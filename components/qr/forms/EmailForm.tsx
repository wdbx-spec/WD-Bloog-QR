'use client';

import React from 'react';
import { Mail, FileText } from 'lucide-react';
import { EmailPayload } from '../../../lib/qr/types';
import { useLanguage } from '../../providers/LanguageProvider';

interface EmailFormProps {
  payload: EmailPayload;
  onChange: (payload: EmailPayload) => void;
}

export function EmailForm({ payload, onChange }: EmailFormProps) {
  const { dict } = useLanguage();

  return (
    <div className="space-y-3.5">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {dict.types.email.email} <span className="text-red-500">*</span>
        </label>
        <div className="relative flex items-center">
          <Mail className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
          <input
            type="email"
            value={payload.email}
            onChange={(e) => onChange({ ...payload, email: e.target.value })}
            placeholder="contact@wdbloog.com"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {dict.types.email.subject}
        </label>
        <input
          type="text"
          value={payload.subject || ''}
          onChange={(e) => onChange({ ...payload, subject: e.target.value })}
          placeholder="Inquiry about QR Services"
          className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {dict.types.email.body}
        </label>
        <textarea
          rows={3}
          value={payload.body || ''}
          onChange={(e) => onChange({ ...payload, body: e.target.value })}
          placeholder="Hi team, I scanned your QR code and would like to learn more..."
          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        />
      </div>
    </div>
  );
}
