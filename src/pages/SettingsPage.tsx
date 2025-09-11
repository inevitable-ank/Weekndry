import React from 'react';
import { ThemeSelector } from '../components/theme/ThemeSelector';

export const SettingsPage: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto pt-12 pb-24 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
      <div>
        <h3 className="text-lg font-semibold mb-2">Theme</h3>
        <ThemeSelector />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Preferences</h3>
        <p className="text-gray-500 text-sm">More options coming soon.</p>
      </div>
    </section>
  );
};
