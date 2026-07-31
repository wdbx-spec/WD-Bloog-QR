'use client';

import React from 'react';
import { Type } from 'lucide-react';
import { TextPayload } from '../../../lib/qr/types';
import { useLanguage } from '../../providers/LanguageProvider';

interface TextFormProps {
  payload: TextPayload;
  onChange: (payload: TextPayload) => void;
}

export function TextForm({ payload, onChange }: TextFormProps) {
  const { dict } = useLanguage();

  return (
    <div className="space-y-3.5">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {dict.types.text.textLabel} <span className="text-red-500">*</span>
        </label>
        <div className="relative flex items-start">
          <Type className="absolute left-3 top-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
          <textarea
            rows={4}
            value={payload.text}
            onChange={(e) => onChange({ ...payload, text: e.target.value })}
            placeholder={dict.types.text.placeholder}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            required
          />
        </div>
      </div>
    </div>
  );
}
