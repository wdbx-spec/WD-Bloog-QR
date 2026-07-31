'use client';

import React from 'react';
import { X, Bookmark, Download, Trash2, ArrowUpRight, Sparkles } from 'lucide-react';
import { SavedQRItem } from '../../lib/qr/types';
import { deleteQRFromHistory } from '../../lib/storage';
import { useLanguage } from '../providers/LanguageProvider';

interface QRHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: SavedQRItem[];
  onLoadQR: (item: SavedQRItem) => void;
  onUpdateHistory: (updated: SavedQRItem[]) => void;
}

export function QRHistoryModal({
  isOpen,
  onClose,
  history,
  onLoadQR,
  onUpdateHistory,
}: QRHistoryModalProps) {
  const { dict } = useLanguage();

  if (!isOpen) return null;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteQRFromHistory(id);
    onUpdateHistory(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <Bookmark className="h-5 w-5 fill-amber-500/20" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Saved QR Codes History
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {history.length} items saved locally in your browser
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-2.5">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Sparkles className="h-10 w-10 text-slate-300 dark:text-slate-700 mb-2" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                No saved QR codes yet
              </p>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Customize any QR code and click &quot;Save to My QRs&quot; to keep your design setups here!
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onLoadQR(item);
                  onClose();
                }}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 hover:border-blue-500 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-950/50 dark:hover:bg-slate-900 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800"
                    style={{ backgroundColor: item.design.bgColor || '#ffffff' }}
                  >
                    <div
                      className="h-6 w-6 rounded-xs"
                      style={{ backgroundColor: item.design.dotsColor || '#000000' }}
                    />
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {item.type}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate max-w-xs sm:max-w-md">
                      {item.rawContent}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLoadQR(item);
                      onClose();
                    }}
                    className="flex items-center gap-1 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:bg-blue-950/60 dark:text-blue-300"
                  >
                    <span>Load</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleDelete(item.id, e)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
