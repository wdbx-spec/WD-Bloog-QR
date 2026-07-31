'use client';

import React from 'react';
import { FileText, Link as LinkIcon, Info } from 'lucide-react';
import { PDFPayload } from '../../../lib/qr/types';
import { useLanguage } from '../../providers/LanguageProvider';

interface PDFFormProps {
  payload: PDFPayload;
  onChange: (payload: PDFPayload) => void;
}

export function PDFForm({ payload, onChange }: PDFFormProps) {
  const { dict } = useLanguage();

  return (
    <div className="space-y-3.5">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {dict.types.pdf.title} <span className="text-red-500">*</span>
        </label>
        <div className="relative flex items-center">
          <FileText className="absolute left-3 h-4 w-4 text-red-500 rtl:right-3 rtl:left-auto" />
          <input
            type="text"
            value={payload.title}
            onChange={(e) => onChange({ ...payload, title: e.target.value })}
            placeholder="e.g. Restaurant Summer Menu 2026"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {dict.types.pdf.fileUrl} <span className="text-red-500">*</span>
        </label>
        <div className="relative flex items-center">
          <LinkIcon className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
          <input
            type="url"
            value={payload.fileUrl}
            onChange={(e) => onChange({ ...payload, fileUrl: e.target.value })}
            placeholder="https://example.com/documents/menu.pdf"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            required
          />
        </div>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
          <Info className="h-3 w-3 text-blue-500 shrink-0" />
          <span>Paste the public download or view link to your PDF hosted on Google Drive, Dropbox, or your server.</span>
        </p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {dict.types.pdf.descLabel}
        </label>
        <textarea
          rows={2}
          value={payload.description || ''}
          onChange={(e) => onChange({ ...payload, description: e.target.value })}
          placeholder="Scan to view or download our full catalog & pricing list..."
          className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        />
      </div>
    </div>
  );
}
