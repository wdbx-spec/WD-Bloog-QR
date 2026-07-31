import { SavedQRItem } from './qr/types';

const STORAGE_KEY_HISTORY = 'wdbloog_qr_history_v1';
const STORAGE_KEY_SETTINGS = 'wdbloog_qr_settings_v1';
const STORAGE_KEY_BLOG = 'wdbloog_qr_blog_v1';

export function getSavedQRHistory(): SavedQRItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveQRToHistory(item: Omit<SavedQRItem, 'id' | 'createdAt'>): SavedQRItem {
  const history = getSavedQRHistory();
  const newItem: SavedQRItem = {
    ...item,
    id: 'qr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
  };

  // Prepend and limit to 50 items
  const updated = [newItem, ...history.filter((h) => h.rawContent !== item.rawContent || h.type !== item.type)].slice(0, 50);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
    } catch {
      // Storage quota or disabled
    }
  }

  return newItem;
}

export function deleteQRFromHistory(id: string): SavedQRItem[] {
  const history = getSavedQRHistory();
  const updated = history.filter((item) => item.id !== id);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }
  return updated;
}

export function clearQRHistory(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch {
      // ignore
    }
  }
}
