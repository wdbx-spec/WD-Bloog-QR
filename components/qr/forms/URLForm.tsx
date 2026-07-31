'use client';

import React from 'react';
import { Globe, Link as LinkIcon, Sparkles } from 'lucide-react';
import { URLPayload } from '../../../lib/qr/types';
import { useLanguage } from '../../providers/LanguageProvider';

interface URLFormProps {
  payload: URLPayload;
  onChange: (payload: URLPayload) => void;
}

export function URLForm({ payload, onChange }: URLFormProps) {
  const { dict } = useLanguage();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          {dict.types.url.inputLabel} <span className="text-red-500">*</span>
        </label>
        <div className="relative flex items-center">
          <Globe className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
          <input
            type="url"
            value={payload.url}
            onChange={(e) => onChange({ ...payload, url: e.target.value })}
            placeholder={dict.types.url.placeholder}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 rtl:pr-10 rtl:pl-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white transition-all"
            required
          />
        </div>
      </div>

      {/* Quick Preset URLs */}
      <div>
        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-2">
          Quick Link Shortcuts:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: 'WDBloog Main', url: 'https://wdbloog.com' },
            { label: 'YouTube Channel', url: 'https://youtube.com/@wdbloog' },
            { label: 'Instagram Profile', url: 'https://instagram.com' },
            { label: 'LinkedIn Page', url: 'https://linkedin.com' },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChange({ ...payload, url: preset.url })}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 transition-colors"
            >
              <LinkIcon className="h-3 w-3 text-blue-500" />
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
