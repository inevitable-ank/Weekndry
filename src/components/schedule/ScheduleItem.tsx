import React, { useState } from 'react';
import type { ScheduledItem } from '../../types/schedule';
import { Button, Input } from '../ui';
import { useSchedule } from '../../store/scheduleStore';
import { MoodSelector } from '../mood/MoodSelector';

interface ScheduleItemProps {
  item: ScheduledItem;
  onRemove: (id: string) => void;
  onChangeMood: (id: string, mood: NonNullable<ScheduledItem['mood']>) => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}

export const ScheduleItem: React.FC<ScheduleItemProps> = ({ item, onRemove, onChangeMood, onDragStart }) => {
  const [openMood, setOpenMood] = useState(false);
  const { updateItemTime } = useSchedule();
  const start = item.startMinutes ?? (item.block === 'morning' ? 8*60 : item.block === 'afternoon' ? 13*60 : 18*60);
  const hours = Math.floor(start / 60);
  const minutes = start % 60;
  const onTimeChange = (value: string) => {
    const [h, m] = value.split(':').map(Number);
    if (Number.isFinite(h) && Number.isFinite(m)) {
      updateItemTime(item.id, h*60 + m);
    }
  };

  return (
    <div 
      className="bg-white/80 border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-all overflow-hidden"
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
          <Input
            aria-label="Start time"
            type="time"
            value={`${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-[110px]"
            noFocusScale
          />
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

