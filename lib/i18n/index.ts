import { en } from './dictionaries/en';
import { Dictionary, Locale } from './types';

export const dictionaries: Record<Locale, Dictionary> = {
  en,
};

export const LOCALES: { code: Locale; name: string; flag: string; dir: 'ltr' }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
];

export function getDictionary(locale: Locale = 'en'): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}
