import React, { useState } from 'react';
import type { ScheduledItem } from '../../types/schedule';
import { Button } from '../ui';
import { MoodSelector } from '../mood/MoodSelector';

interface ScheduleItemProps {
  item: ScheduledItem;
  onRemove: (id: string) => void;
  onChangeMood: (id: string, mood: NonNullable<ScheduledItem['mood']>) => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}

export const ScheduleItem: React.FC<ScheduleItemProps> = ({ item, onRemove, onChangeMood, onDragStart }) => {
  const [openMood, setOpenMood] = useState(false);

  return (
    <div 
      className="bg-white/80 border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-all"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', item.id);
        e.dataTransfer.effectAllowed = 'move';
        onDragStart?.(e, item.id);
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden>{item.activity.icon ?? '⭐'}</span>
          <span className="text-sm text-gray-800">{item.activity.name}</span>
          {item.mood && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-black/5">{item.mood}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => setOpenMood((p) => !p)}>Mood</Button>
          <Button size="sm" variant="ghost" onClick={() => onRemove(item.id)}>Remove</Button>
        </div>
      </div>
      {openMood && (
        <div className="mt-3">
          <MoodSelector 
            value={item.mood}
            onChange={(m) => {
              onChangeMood(item.id, m);
              setOpenMood(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

