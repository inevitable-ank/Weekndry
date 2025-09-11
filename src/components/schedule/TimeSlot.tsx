import React, { useCallback, useState } from 'react';
import { Day, ScheduledItem, TimeBlock } from '../../types/schedule';
import { Card, CardTitle, Button } from '../ui';
import { useSchedule } from '../../store/scheduleStore';
import { MoodSelector } from '../mood/MoodSelector';
import { EmptyState } from '../common/EmptyState';
import { useAnnouncer } from '../common/LiveRegion';

interface TimeSlotProps {
  day: Day;
  block: TimeBlock;
  items: ScheduledItem[];
  onRemove: (itemId: string) => void;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({ day, block, items, onRemove }) => {
  const { moveItem, updateItemMood } = useSchedule();
  const { announce } = useAnnouncer();
  const label = block.charAt(0).toUpperCase() + block.slice(1);
  const [openMoodFor, setOpenMoodFor] = useState<string | null>(null);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId) {
      moveItem(itemId, day, block);
      announce(`Moved activity to ${day} ${block}`);
    }
  }, [announce, block, day, moveItem]);

  return (
    <Card 
      variant="default"
      className="min-h-[180px] border-dashed border-2 border-transparent hover:border-blue-300 transition-colors"
    >
      <CardTitle className="text-sm mb-3 flex items-center justify-between">
        <span>{label}</span>
        <span className="text-xs text-gray-400">{items.length}</span>
      </CardTitle>
      <div 
        className="space-y-2"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {items.length === 0 && (
          <EmptyState title="No activities yet" description="Drag an activity here or add from the list." icon="🗂️" />
        )}
        {items.map(item => (
          <div 
            key={item.id} 
            className="bg-white/80 border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-all"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', item.id);
              e.dataTransfer.effectAllowed = 'move';
              announce(`Dragging ${item.activity.name}`);
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
                <Button size="sm" variant="ghost" onClick={() => setOpenMoodFor(openMoodFor === item.id ? null : item.id)}>Mood</Button>
                <Button size="sm" variant="ghost" onClick={() => onRemove(item.id)}>Remove</Button>
              </div>
            </div>
            {openMoodFor === item.id && (
              <div className="mt-3">
                <MoodSelector 
                  value={item.mood}
                  onChange={(m) => {
                    updateItemMood(item.id, m);
                    setOpenMoodFor(null);
                    announce(`Set mood to ${m} for ${item.activity.name}`);
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
