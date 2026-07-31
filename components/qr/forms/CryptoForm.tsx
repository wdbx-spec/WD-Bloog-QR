'use client';

import React from 'react';
import { Bitcoin, Wallet, DollarSign, FileText } from 'lucide-react';
import { CryptoPayload } from '../../../lib/qr/types';
import { useLanguage } from '../../providers/LanguageProvider';

interface CryptoFormProps {
  payload: CryptoPayload;
  onChange: (payload: CryptoPayload) => void;
}

export function CryptoForm({ payload, onChange }: CryptoFormProps) {
  const { dict } = useLanguage();

  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.crypto.currency}
          </label>
          <div className="relative flex items-center">
            <Bitcoin className="absolute left-3 h-4 w-4 text-amber-500 rtl:right-3 rtl:left-auto" />
            <select
              value={payload.currency}
              onChange={(e) =>
                onChange({ ...payload, currency: e.target.value as CryptoPayload['currency'] })
              }
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            >
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">Tether (USDT)</option>
              <option value="SOL">Solana (SOL)</option>
              <option value="DOGE">Dogecoin (DOGE)</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.crypto.address} <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <Wallet className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
            <input
              type="text"
              value={payload.address}
              onChange={(e) => onChange({ ...payload, address: e.target.value })}
              placeholder="e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm font-mono text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.crypto.amount}
          </label>
          <div className="relative flex items-center">
            <DollarSign className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
            <input
              type="text"
              value={payload.amount || ''}
              onChange={(e) => onChange({ ...payload, amount: e.target.value })}
              placeholder="0.05"
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {dict.types.crypto.memo}
          </label>
          <div className="relative flex items-center">
            <FileText className="absolute left-3 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
            <input
              type="text"
              value={payload.memo || ''}
              onChange={(e) => onChange({ ...payload, memo: e.target.value })}
              placeholder="Coffee payment"
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 rtl:pr-9 rtl:pl-3 text-sm text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
