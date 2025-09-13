export type ThemeId = 'lazy' | 'adventurous' | 'family' | 'productive';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  bgClass: string; // tailwind gradient classes
  accentClass: string; // accent gradient
  previewEmoji: string;
}


