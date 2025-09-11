import React from 'react';
import { Day, TimeBlock } from '../../types/schedule';
import { useSchedule } from '../../store/scheduleStore';
import { TimeSlot } from './TimeSlot';

interface DayScheduleProps {
  day: Day;
}

const BLOCKS: TimeBlock[] = ['morning', 'afternoon', 'evening'];

export const DaySchedule: React.FC<DayScheduleProps> = ({ day }) => {
  const { schedule, removeItem } = useSchedule();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {BLOCKS.map(block => (
        <TimeSlot 
          key={block} 
          day={day}
          block={block} 
          items={schedule[day][block]} 
          onRemove={removeItem}
        />
      ))}
    </div>
  );
};
