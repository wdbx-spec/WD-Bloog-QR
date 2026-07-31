'use client';

import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { LocationPayload } from '../../../lib/qr/types';
import { useLanguage } from '../../providers/LanguageProvider';

interface LocationFormProps {
  payload: LocationPayload;
  onChange: (payload: LocationPayload) => void;
}

export function LocationForm({ payload, onChange }: LocationFormProps) {
  const { dict } = useLanguage();

  const handleCurrentLocation = () => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        onChange({
          ...payload,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        });
      });
    }
  };

  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.location.lat} <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="any"
            value={payload.latitude}
            onChange={(e) => onChange({ ...payload, latitude: e.target.value })}
            placeholder="37.7749"
            className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.location.lng} <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="any"
            value={payload.longitude}
            onChange={(e) => onChange({ ...payload, longitude: e.target.value })}
            placeholder="-122.4194"
            className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {dict.types.location.placeLabel}
        </label>
        <div className="relative flex items-center">
          <MapPin className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
          <input
            type="text"
            value={payload.label || ''}
            onChange={(e) => onChange({ ...payload, label: e.target.value })}
            placeholder="WDBloog HQ, San Francisco, CA"
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleCurrentLocation}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 pt-1"
      >
        <Navigation className="h-3.5 w-3.5" />
        <span>Use My Current Location GPS</span>
      </button>
    </div>
  );
}
