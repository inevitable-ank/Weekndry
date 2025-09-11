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
        <h3 className="text-lg font-semibold mb-2">Preferences</h3>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className="text-sm text-gray-700">Default city</label>
          <input 
            className="border rounded-lg px-3 py-2 w-full sm:w-auto"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Your city"
          />
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={showDiscover} onChange={toggleDiscover} />
            Show Discover panel
          </label>
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
