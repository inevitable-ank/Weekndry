import { createContext, useContext, useEffect, useMemo, useState, createElement } from 'react';
import { THEMES } from '../data/themes';
import type { ThemeConfig, ThemeId } from '../types/theme';

interface ThemeContextValue {
  theme: ThemeConfig;
  setTheme: (id: ThemeId) => void;
  themes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const STORAGE_KEY = 'weekendly_theme_v1';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    return saved ?? 'lazy';
  });

  const theme = useMemo(() => THEMES.find(t => t.id === themeId) ?? THEMES[0], [themeId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, themeId);
    document.body.className = '';
    document.body.classList.add('bg-gradient-to-br');
    theme.bgClass.split(' ').forEach(c => document.body.classList.add(c));
  }, [themeId, theme]);

  const setTheme = (id: ThemeId) => setThemeId(id);

  const value = useMemo(() => ({ theme, setTheme, themes: THEMES }), [theme]);
  return createElement(ThemeContext.Provider, { value }, children);
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
