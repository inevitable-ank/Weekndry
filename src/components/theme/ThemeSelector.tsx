import React from 'react';
import { useTheme } from '../../store/themeStore';

export const ThemeSelector: React.FC = () => {
  const { theme, themes, setTheme } = useTheme();

  return (
    <div className="flex flex-wrap gap-3">
      {themes.map(t => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`px-4 py-2 rounded-xl shadow transition-all duration-300 border backdrop-blur-sm hover:scale-105 ${
            theme.id === t.id ? 'border-black/20 ring-2 ring-black/10' : 'border-white/30'
          } bg-gradient-to-r ${t.accentClass} text-white`}
          aria-pressed={theme.id === t.id}
        >
          <span className="mr-2" aria-hidden>{t.previewEmoji}</span>
          {t.name}
        </button>
      ))}
    </div>
  );
};

