'use client';

import React, { useState } from 'react';
import {
  Palette,
  Shapes,
  Image as ImageIcon,
  Frame,
  Settings2,
  Upload,
  Trash2,
  Check,
  Eye,
  Sparkles,
  Sliders,
} from 'lucide-react';
import { PRESET_LOGOS } from '../../../lib/qr/defaults';
import {
  CornerDotStyle,
  CornerSquareStyle,
  DotStyle,
  ErrorCorrectionLevel,
  FrameTemplate,
  QRDesignOptions,
} from '../../../lib/qr/types';
import { useLanguage } from '../../providers/LanguageProvider';
import { PresetThemes } from './PresetThemes';

interface DesignCustomizerProps {
  design: QRDesignOptions;
  onChange: (design: QRDesignOptions) => void;
}

export function DesignCustomizer({ design, onChange }: DesignCustomizerProps) {
  const { dict } = useLanguage();
  const [activeTab, setActiveTab] = useState<'themes' | 'shapes' | 'colors' | 'logo' | 'frame' | 'advanced'>('themes');

  const handleApplyTheme = (themeDesign: Partial<QRDesignOptions>) => {
    onChange({
      ...design,
      ...themeDesign,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onChange({
          ...design,
          logoUrl: result,
          errorCorrection: 'H', // auto boost error correction for custom logo
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Customizer Sub-tabs */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200 pb-3 dark:border-slate-800 no-scrollbar">
        {[
          { id: 'themes', label: dict.customizer.presets, icon: Sparkles },
          { id: 'shapes', label: dict.customizer.dotsStyle, icon: Shapes },
          { id: 'colors', label: dict.customizer.colors, icon: Palette },
          { id: 'logo', label: dict.customizer.logo, icon: ImageIcon },
          { id: 'frame', label: dict.customizer.frame, icon: Frame },
          { id: 'advanced', label: 'Quality', icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="pt-4">
        {/* TAB 1: PRESETS */}
        {activeTab === 'themes' && (
          <PresetThemes currentDesign={design} onApplyTheme={handleApplyTheme} />
        )}

        {/* TAB 2: SHAPES & PATTERNS */}
        {activeTab === 'shapes' && (
          <div className="space-y-4">
            {/* Dots Style */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                {dict.customizer.dotsStyle}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { id: 'rounded', label: 'Rounded' },
                  { id: 'dots', label: 'Dots' },
                  { id: 'classy', label: 'Classy' },
                  { id: 'classy-rounded', label: 'Smooth' },
                  { id: 'square', label: 'Square' },
                  { id: 'extra-rounded', label: 'Pill' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChange({ ...design, dotStyle: item.id as DotStyle })}
                    className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-xs font-medium transition-all ${
                      design.dotStyle === item.id
                        ? 'border-blue-600 bg-blue-50/60 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300 font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Corner Square Style */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                {dict.customizer.cornerSquareStyle}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'extra-rounded', label: 'Rounded Square' },
                  { id: 'square', label: 'Classic Square' },
                  { id: 'dot', label: 'Circle Eye' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      onChange({ ...design, cornerSquareStyle: item.id as CornerSquareStyle })
                    }
                    className={`rounded-xl border p-2 text-xs font-medium transition-all ${
                      design.cornerSquareStyle === item.id
                        ? 'border-blue-600 bg-blue-50/60 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300 font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Corner Dot Style */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                {dict.customizer.cornerDotStyle}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'dot', label: 'Round Inner Eye' },
                  { id: 'square', label: 'Square Inner Eye' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      onChange({ ...design, cornerDotStyle: item.id as CornerDotStyle })
                    }
                    className={`rounded-xl border p-2 text-xs font-medium transition-all ${
                      design.cornerDotStyle === item.id
                        ? 'border-blue-600 bg-blue-50/60 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300 font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COLORS & GRADIENTS */}
        {activeTab === 'colors' && (
          <div className="space-y-4">
            {/* Solid vs Gradient Toggle */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
              <button
                type="button"
                onClick={() => onChange({ ...design, useGradient: false })}
                className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
                  !design.useGradient
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {dict.customizer.solidColor}
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...design, useGradient: true })}
                className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
                  design.useGradient
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {dict.customizer.gradient}
              </button>
            </div>

            {/* Dots Color */}
            {!design.useGradient ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                    Foreground Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={design.dotsColor}
                      onChange={(e) => onChange({ ...design, dotsColor: e.target.value })}
                      className="h-9 w-12 cursor-pointer rounded-lg border border-slate-200 p-0.5"
                    />
                    <input
                      type="text"
                      value={design.dotsColor}
                      onChange={(e) => onChange({ ...design, dotsColor: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-mono dark:border-slate-800 dark:bg-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                    {dict.customizer.bgColor}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={design.bgColor}
                      onChange={(e) => onChange({ ...design, bgColor: e.target.value })}
                      disabled={design.transparentBg}
                      className="h-9 w-12 cursor-pointer rounded-lg border border-slate-200 p-0.5 disabled:opacity-50"
                    />
                    <input
                      type="text"
                      value={design.bgColor}
                      onChange={(e) => onChange({ ...design, bgColor: e.target.value })}
                      disabled={design.transparentBg}
                      className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-mono disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Start Color
                    </label>
                    <input
                      type="color"
                      value={design.gradient.colorStops[0].color}
                      onChange={(e) =>
                        onChange({
                          ...design,
                          gradient: {
                            ...design.gradient,
                            colorStops: [
                              { offset: 0, color: e.target.value },
                              design.gradient.colorStops[1],
                            ],
                          },
                        })
                      }
                      className="h-9 w-full cursor-pointer rounded-lg border border-slate-200 p-0.5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      End Color
                    </label>
                    <input
                      type="color"
                      value={design.gradient.colorStops[1].color}
                      onChange={(e) =>
                        onChange({
                          ...design,
                          gradient: {
                            ...design.gradient,
                            colorStops: [
                              design.gradient.colorStops[0],
                              { offset: 1, color: e.target.value },
                            ],
                          },
                        })
                      }
                      className="h-9 w-full cursor-pointer rounded-lg border border-slate-200 p-0.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Corner Eyes Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Corner Frame Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={design.cornerSquareColor}
                    onChange={(e) => onChange({ ...design, cornerSquareColor: e.target.value })}
                    className="h-8 w-10 cursor-pointer rounded-lg border border-slate-200 p-0.5"
                  />
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                    {design.cornerSquareColor}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Corner Eye Dot Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={design.cornerDotColor}
                    onChange={(e) => onChange({ ...design, cornerDotColor: e.target.value })}
                    className="h-8 w-10 cursor-pointer rounded-lg border border-slate-200 p-0.5"
                  />
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                    {design.cornerDotColor}
                  </span>
                </div>
              </div>
            </div>

            {/* Transparent BG option */}
            <label className="flex items-center gap-2 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={design.transparentBg}
                onChange={(e) => onChange({ ...design, transparentBg: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-blue-600"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {dict.customizer.transparentBg}
              </span>
            </label>
          </div>
        )}

        {/* TAB 4: LOGO */}
        {activeTab === 'logo' && (
          <div className="space-y-4">
            {/* Preset Logos */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                {dict.customizer.selectLogo}
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {PRESET_LOGOS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...design,
                        logoUrl: preset.url,
                        errorCorrection: preset.url ? 'H' : design.errorCorrection,
                      })
                    }
                    className={`flex flex-col items-center justify-center rounded-xl border p-2 text-[10px] font-medium transition-all ${
                      design.logoUrl === preset.url
                        ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300 font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {preset.url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={preset.url} alt={preset.label} className="h-6 w-6 object-contain" />
                    ) : (
                      <span className="h-6 flex items-center">None</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Upload */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                {dict.customizer.uploadLogo}
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer rounded-xl border border-dashed border-blue-400 bg-blue-50/50 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 transition-colors">
                  <Upload className="h-4 w-4" />
                  <span>Choose Image File...</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {design.logoUrl && (
                  <button
                    type="button"
                    onClick={() => onChange({ ...design, logoUrl: '' })}
                    className="flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>{dict.customizer.removeLogo}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Logo Size slider */}
            {design.logoUrl && (
              <div className="pt-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>{dict.customizer.logoSize}</span>
                  <span>{Math.round(design.logoSize * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.35"
                  step="0.02"
                  value={design.logoSize}
                  onChange={(e) => onChange({ ...design, logoSize: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-800"
                />
              </div>
            )}
          </div>
        )}

        {/* TAB 5: FRAME & BANNER */}
        {activeTab === 'frame' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                {dict.customizer.selectFrame}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'none', label: 'No Frame' },
                  { id: 'scan-me', label: 'SCAN ME Badge' },
                  { id: 'bottom-bar', label: 'Bottom Bar' },
                  { id: 'tech-card', label: 'Tech Card Frame' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChange({ ...design, frameTemplate: item.id as FrameTemplate })}
                    className={`rounded-xl border p-2.5 text-xs font-medium transition-all ${
                      design.frameTemplate === item.id
                        ? 'border-blue-600 bg-blue-50/60 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300 font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {design.frameTemplate !== 'none' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {dict.customizer.frameText}
                  </label>
                  <input
                    type="text"
                    value={design.frameText}
                    onChange={(e) => onChange({ ...design, frameText: e.target.value })}
                    placeholder="SCAN ME"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold uppercase dark:border-slate-800 dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {dict.customizer.frameColor}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={design.frameColor}
                      onChange={(e) => onChange({ ...design, frameColor: e.target.value })}
                      className="h-8 w-12 cursor-pointer rounded-lg border border-slate-200 p-0.5"
                    />
                    <span className="text-xs font-mono">{design.frameColor}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: ADVANCED / QUALITY */}
        {activeTab === 'advanced' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                {dict.customizer.errorCorrection}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'L', label: 'Low (7%)' },
                  { id: 'M', label: 'Medium (15%)' },
                  { id: 'Q', label: 'Quartile (25%)' },
                  { id: 'H', label: 'High (30%)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      onChange({ ...design, errorCorrection: item.id as ErrorCorrectionLevel })
                    }
                    className={`rounded-xl border p-2 text-xs font-medium transition-all ${
                      design.errorCorrection === item.id
                        ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300 font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500">
                High (30%) allows the QR code to be scanned reliably even when a custom logo or image is overlaid in the center.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
