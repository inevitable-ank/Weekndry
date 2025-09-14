import React, { useState } from 'react';
import { ThemeSelector } from '../components/theme/ThemeSelector';
import { Button } from '../components/ui';
import { useSchedule } from '../store/scheduleStore';
import { useTheme } from '../store/themeStore';
import { useUserStore } from '../store/userStore';

export const SettingsPage: React.FC = () => {
  const { schedule, clear } = useSchedule();
  const { theme } = useTheme();
  const { city, showDiscover, setCity, toggleDiscover } = useUserStore();
  const [importText, setImportText] = useState('');

  const onExport = () => {
    const payload = { schedule, theme: theme.id };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weekendly-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const onImport = () => {
    try {
      const data = JSON.parse(importText);
      if (!data || typeof data !== 'object') throw new Error('Invalid JSON');
      localStorage.setItem('weekendly_schedule_v1', JSON.stringify(data.schedule));
      if (data.theme) localStorage.setItem('weekendly_theme_v1', data.theme);
      window.location.reload();
    } catch (e) {
      alert('Invalid backup JSON');
    }
  };

  return (
    <section className="max-w-4xl mx-auto pt-12 pb-24 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
      <div>
        <h3 className="text-lg font-semibold mb-2">Theme</h3>
        <ThemeSelector />
      </div>
      <div className="max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-black/10 to-transparent my-4" />
      <div>
        <h3 className="text-lg font-semibold mb-2">Location & Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default City
            </label>
            <div className="space-y-2">
              <input 
                className="border rounded-lg px-3 py-2 w-full max-w-md"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city name (e.g., Mumbai, New York, London)"
              />
              <p className="text-xs text-gray-500">
                This city will be used for weather and events when your location cannot be detected automatically.
              </p>
            </div>
          </div>
          <div>
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={showDiscover} onChange={toggleDiscover} />
              Show Discover panel (weather & events)
            </label>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-black/10 to-transparent my-4" />
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Backup & Restore</h3>
        <div className="flex gap-2">
          <Button onClick={onExport} icon="⬇️">Export JSON</Button>
          <Button variant="danger" onClick={clear}>Clear Schedule</Button>
        </div>
        <textarea 
          className="w-full border rounded-lg p-3 text-sm" 
          rows={6} 
          placeholder="Paste backup JSON here to restore"
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
        />
        <Button onClick={onImport} icon="⬆️">Import JSON</Button>
      </div>
    </section>
  );
};
