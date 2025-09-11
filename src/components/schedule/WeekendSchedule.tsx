import React from 'react';
import { Day } from '../../types/schedule';
import { DaySchedule } from './DaySchedule';

const DAYS: Day[] = ['Saturday', 'Sunday'];

export const WeekendSchedule: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {DAYS.map(day => (
        <div key={day}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{day}</h2>
          <DaySchedule day={day} />
        </div>
      ))}
    </div>
  );
};
