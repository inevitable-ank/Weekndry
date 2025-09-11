import React from 'react';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { ThemeSelector } from '../theme/ThemeSelector';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/30">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={viteLogo} className="h-8 w-8" alt="Vite logo" />
            <img src={reactLogo} className="h-8 w-8 animate-spin-slow" alt="React logo" />
            <h1 className="text-2xl font-extrabold weekendly-text">Weekendly</h1>
          </div>
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
};
