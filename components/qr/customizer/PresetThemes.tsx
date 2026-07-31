'use client';

import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { PRESET_THEMES, PresetTheme } from '../../../lib/qr/defaults';
import { QRDesignOptions } from '../../../lib/qr/types';
import { useLanguage } from '../../providers/LanguageProvider';

interface PresetThemesProps {
  currentDesign: QRDesignOptions;
  onApplyTheme: (themeDesign: Partial<QRDesignOptions>) => void;
}

export function PresetThemes({ currentDesign, onApplyTheme }: PresetThemesProps) {
  const { dict } = useLanguage();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span>{dict.customizer.presets}</span>
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {PRESET_THEMES.map((theme) => {
          const dotsColor = theme.design.dotsColor || '#000';
          const bgColor = theme.design.bgColor || '#fff';
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onApplyTheme(theme.design)}
              className="group relative flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white p-2.5 text-left shadow-xs hover:border-blue-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 transition-all"
            >
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center border border-slate-200/60 shadow-inner"
                style={{
                  background: theme.design.useGradient
                    ? `linear-gradient(${theme.design.gradient?.rotation || 45}deg, ${
                        theme.design.gradient?.colorStops[0].color
                      }, ${theme.design.gradient?.colorStops[1].color})`
                    : dotsColor,
                }}
              >
                <div
                  className="h-3 w-3 rounded-xs border border-white/40"
                  style={{ backgroundColor: bgColor }}
                />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {theme.name}
                </span>
                <span className="text-[10px] text-slate-400 capitalize truncate">
                  {theme.category}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
