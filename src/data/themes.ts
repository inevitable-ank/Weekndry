import { ThemeConfig } from '../types/theme';

export const THEMES: ThemeConfig[] = [
  { id: 'lazy', name: 'Lazy Weekend', bgClass: 'from-purple-200 via-pink-200 to-rose-200', accentClass: 'from-purple-500 to-pink-600', previewEmoji: '🛋️' },
  { id: 'adventurous', name: 'Adventurous', bgClass: 'from-emerald-200 via-teal-200 to-cyan-200', accentClass: 'from-emerald-500 to-teal-600', previewEmoji: '🗺️' },
  { id: 'family', name: 'Family Time', bgClass: 'from-rose-200 via-amber-200 to-yellow-200', accentClass: 'from-rose-500 to-amber-600', previewEmoji: '👨‍👩‍👧‍👦' },
  { id: 'productive', name: 'Productive', bgClass: 'from-indigo-200 via-blue-200 to-sky-200', accentClass: 'from-indigo-500 to-blue-600', previewEmoji: '🧠' },
];
