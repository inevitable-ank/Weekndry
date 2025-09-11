import React from 'react';
import type { ActivityMood } from '../../types/activity';

const MOODS: { id: ActivityMood; label: string; emoji: string; color: string }[] = [
  { id: 'happy', label: 'Happy', emoji: '😊', color: 'bg-yellow-200 text-yellow-800' },
  { id: 'relaxed', label: 'Relaxed', emoji: '😌', color: 'bg-blue-200 text-blue-800' },
  { id: 'energetic', label: 'Energetic', emoji: '⚡', color: 'bg-orange-200 text-orange-800' },
  { id: 'creative', label: 'Creative', emoji: '🎨', color: 'bg-purple-200 text-purple-800' },
  { id: 'social', label: 'Social', emoji: '🤝', color: 'bg-pink-200 text-pink-800' },
  { id: 'calm', label: 'Calm', emoji: '🌿', color: 'bg-emerald-200 text-emerald-800' },
];

interface MoodSelectorProps {
  value?: ActivityMood;
  onChange: (m: ActivityMood) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {MOODS.map(m => (
        <button
          key={m.id}
          onClick={() => onChange(m.id)}
          className={`px-3 py-1 rounded-full text-sm transition-all border ${m.color} ${
            value === m.id ? 'ring-2 ring-black/10 scale-105' : 'opacity-90 hover:opacity-100'
          }`}
          aria-pressed={value === m.id}
        >
          <span className="mr-1" aria-hidden>{m.emoji}</span>
          {m.label}
        </button>
      ))}
    </div>
  );
};

