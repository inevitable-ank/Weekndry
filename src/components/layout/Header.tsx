import React from 'react';
import weekendlyLogo from '../../assets/logo-transparent-svg.svg';
import { Navigation } from './Navigation';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/30">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={weekendlyLogo} className="h-10 w-10" alt="Weekendly logo" />
            <h1 className="text-2xl font-extrabold weekendly-text">Weekendly</h1>
          </div>
          <div className="flex items-center gap-4">
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
};
