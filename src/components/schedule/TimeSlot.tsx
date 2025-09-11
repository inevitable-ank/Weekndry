import React, { useCallback, useState } from 'react';
import type { Day, ScheduledItem, TimeBlock } from '../../types/schedule';
import { Card, CardTitle } from '../ui';
import { useSchedule } from '../../store/scheduleStore';
import { EmptyState } from '../common/EmptyState';
import { useAnnouncer } from '../common/LiveRegion';
import { ScheduleItem } from './ScheduleItem';

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
          <ScheduleItem
            key={item.id}
            item={item}
            onRemove={onRemove}
            onChangeMood={(id, mood) => updateItemMood(id, mood)}
            onDragStart={() => announce(`Dragging ${item.activity.name}`)}
          />
        ))}
      </div>
    </Card>
  );
};
