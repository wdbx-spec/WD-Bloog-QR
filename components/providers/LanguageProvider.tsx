'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDictionary, LOCALES } from '../../lib/i18n';
import { Dictionary, Locale } from '../../lib/i18n/types';

interface LanguageContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  dict: Dictionary;
  dir: 'ltr';
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  dict: getDictionary('en'),
  dir: 'ltr',
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  const setLocale = (newLoc: Locale) => {
    setLocaleState(newLoc);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wdbloog_qr_lang', newLoc);
      const dictionary = getDictionary(newLoc);
      document.documentElement.dir = dictionary.dir;
      document.documentElement.lang = newLoc;
    }
  };

  const dict = getDictionary(locale);
  const dir = dict.dir;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = dir;
      document.documentElement.lang = locale;
    }
  }, [locale, dir]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, dict, dir }}>
      <div dir={dir} className="font-sans">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
