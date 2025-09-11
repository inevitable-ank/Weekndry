import React from 'react';
import { ScheduledItem, TimeBlock } from '../../types/schedule';
import { Card, CardTitle, Button } from '../ui';

interface TimeSlotProps {
  block: TimeBlock;
  items: ScheduledItem[];
  onRemove: (itemId: string) => void;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({ block, items, onRemove }) => {
  const label = block.charAt(0).toUpperCase() + block.slice(1);
  return (
    <Card variant="default">
      <CardTitle className="text-sm mb-3">{label}</CardTitle>
      <div className="space-y-2">
        {items.length === 0 && (
          <div className="text-gray-400 text-sm">No activities yet</div>
        )}
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between bg-white/70 border border-gray-100 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden>{item.activity.icon ?? '⭐'}</span>
              <span className="text-sm text-gray-800">{item.activity.name}</span>
            </div>
            <Button size="sm" variant="ghost" onClick={() => onRemove(item.id)}>Remove</Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
