'use client';

import React from 'react';
import { User, Phone, Mail, Building, Briefcase, Globe, MapPin, FileText } from 'lucide-react';
import { VCardPayload } from '../../../lib/qr/types';
import { useLanguage } from '../../providers/LanguageProvider';

interface VCardFormProps {
  payload: VCardPayload;
  onChange: (payload: VCardPayload) => void;
}

export function VCardForm({ payload, onChange }: VCardFormProps) {
  const { dict } = useLanguage();

  return (
    <div className="space-y-3.5">
      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.vcard.firstName} <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
            <input
              type="text"
              value={payload.firstName}
              onChange={(e) => onChange({ ...payload, firstName: e.target.value })}
              placeholder="e.g. Sarah"
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.vcard.lastName}
          </label>
          <input
            type="text"
            value={payload.lastName}
            onChange={(e) => onChange({ ...payload, lastName: e.target.value })}
            placeholder="e.g. Connor"
            className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Phone & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.vcard.phone}
          </label>
          <div className="relative flex items-center">
            <Phone className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
            <input
              type="tel"
              value={payload.phoneMobile || ''}
              onChange={(e) => onChange({ ...payload, phoneMobile: e.target.value })}
              placeholder="+1 (555) 019-2834"
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.vcard.email}
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
            <input
              type="email"
              value={payload.email || ''}
              onChange={(e) => onChange({ ...payload, email: e.target.value })}
              placeholder="sarah@company.com"
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Company & Job Title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.vcard.org}
          </label>
          <div className="relative flex items-center">
            <Building className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
            <input
              type="text"
              value={payload.organization || ''}
              onChange={(e) => onChange({ ...payload, organization: e.target.value })}
              placeholder="Acme Tech Inc"
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.vcard.title}
          </label>
          <div className="relative flex items-center">
            <Briefcase className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
            <input
              type="text"
              value={payload.title || ''}
              onChange={(e) => onChange({ ...payload, title: e.target.value })}
              placeholder="Product Director"
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Website & Note */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.vcard.website}
          </label>
          <div className="relative flex items-center">
            <Globe className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
            <input
              type="url"
              value={payload.url || ''}
              onChange={(e) => onChange({ ...payload, url: e.target.value })}
              placeholder="https://company.com"
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.vcard.city}
          </label>
          <div className="relative flex items-center">
            <MapPin className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
            <input
              type="text"
              value={payload.city || ''}
              onChange={(e) => onChange({ ...payload, city: e.target.value })}
              placeholder="San Francisco, CA"
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
