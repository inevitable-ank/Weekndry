import React from 'react';
import type { Day } from '../../types/schedule';
import { DaySchedule } from './DaySchedule';
import { Card, CardTitle, CardContent } from '../ui';

const DAYS: Day[] = ['Saturday', 'Sunday'];

export const WeekendSchedule: React.FC = () => {
  return (
    <div className="space-y-10">
      {DAYS.map(day => (
        <Card key={day} variant="elevated" padding="lg" className="bg-white/90">
          <CardTitle className="m-0 text-2xl mb-4">{day}</CardTitle>
          <CardContent>
            <DaySchedule day={day} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
