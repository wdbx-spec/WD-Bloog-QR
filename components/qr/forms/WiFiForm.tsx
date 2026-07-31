'use client';

import React from 'react';
import { Wifi, Key, Shield, EyeOff } from 'lucide-react';
import { WiFiPayload } from '../../../lib/qr/types';
import { useLanguage } from '../../providers/LanguageProvider';

interface WiFiFormProps {
  payload: WiFiPayload;
  onChange: (payload: WiFiPayload) => void;
}

export function WiFiForm({ payload, onChange }: WiFiFormProps) {
  const { dict } = useLanguage();

  return (
    <div className="space-y-4">
      {/* Network SSID */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          {dict.types.wifi.ssid} <span className="text-red-500">*</span>
        </label>
        <div className="relative flex items-center">
          <Wifi className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
          <input
            type="text"
            value={payload.ssid}
            onChange={(e) => onChange({ ...payload, ssid: e.target.value })}
            placeholder="e.g. Cafe_Guest_WiFi"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 rtl:pr-10 rtl:pl-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white transition-all"
            required
          />
        </div>
      </div>

      {/* Password & Encryption */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {dict.types.wifi.password}
          </label>
          <div className="relative flex items-center">
            <Key className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
            <input
              type="text"
              value={payload.password || ''}
              onChange={(e) => onChange({ ...payload, password: e.target.value })}
              placeholder="e.g. SecretPass123"
              disabled={payload.encryption === 'nopass'}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 rtl:pr-10 rtl:pl-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {dict.types.wifi.encryption}
          </label>
          <div className="relative flex items-center">
            <Shield className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
            <select
              value={payload.encryption}
              onChange={(e) =>
                onChange({ ...payload, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' })
              }
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 rtl:pr-10 rtl:pl-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white transition-all appearance-none"
            >
              <option value="WPA">WPA / WPA2 / WPA3 (Recommended)</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Open Network (No Password)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hidden Network checkbox */}
      <label className="flex items-center gap-2 cursor-pointer pt-1">
        <input
          type="checkbox"
          checked={payload.hidden}
          onChange={(e) => onChange({ ...payload, hidden: e.target.checked })}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
          <EyeOff className="h-3.5 w-3.5 text-slate-400" />
          <span>{dict.types.wifi.hidden}</span>
        </div>
      </label>
    </div>
  );
}
