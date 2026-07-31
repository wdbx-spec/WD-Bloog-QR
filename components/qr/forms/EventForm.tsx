'use client';

import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { EventPayload } from '../../../lib/qr/types';
import { useLanguage } from '../../providers/LanguageProvider';

interface EventFormProps {
  payload: EventPayload;
  onChange: (payload: EventPayload) => void;
}

export function EventForm({ payload, onChange }: EventFormProps) {
  const { dict } = useLanguage();

  return (
    <div className="space-y-3.5">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {dict.types.event.title} <span className="text-red-500">*</span>
        </label>
        <div className="relative flex items-center">
          <Calendar className="absolute left-3 h-4 w-4 text-purple-600 rtl:right-3 rtl:left-auto" />
          <input
            type="text"
            value={payload.title}
            onChange={(e) => onChange({ ...payload, title: e.target.value })}
            placeholder="e.g. WDBloog Product Launch 2026"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.event.start}
          </label>
          <input
            type="datetime-local"
            value={payload.startTime}
            onChange={(e) => onChange({ ...payload, startTime: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.event.end}
          </label>
          <input
            type="datetime-local"
            value={payload.endTime}
            onChange={(e) => onChange({ ...payload, endTime: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {dict.types.event.location}
        </label>
        <div className="relative flex items-center">
          <MapPin className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
          <input
            type="text"
            value={payload.location || ''}
            onChange={(e) => onChange({ ...payload, location: e.target.value })}
            placeholder="Grand Convention Center, NY or Zoom Link"
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {dict.types.event.descLabel}
        </label>
        <textarea
          rows={2}
          value={payload.description || ''}
          onChange={(e) => onChange({ ...payload, description: e.target.value })}
          placeholder="Join us live for the official launch and Q&A..."
          className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        />
      </div>
    </div>
  );
}
