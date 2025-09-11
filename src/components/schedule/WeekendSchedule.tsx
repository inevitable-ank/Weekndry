import React from 'react';
import type { Day } from '../../types/schedule';
import { DaySchedule } from './DaySchedule';
import { Card, CardTitle, CardContent } from '../ui';
import { getHolidaysForDate } from '../../data/holidays';

const DAYS: Day[] = ['Saturday', 'Sunday'];

export const WeekendSchedule: React.FC = () => {
  const getWeekendDate = (day: Day) => {
    const today = new Date();
    const currentDay = today.getDay();
    const daysUntilSaturday = (6 - currentDay) % 7;
    const daysUntilSunday = (7 - currentDay) % 7;
    
    const targetDate = new Date(today);
    if (day === 'Saturday') {
      targetDate.setDate(today.getDate() + daysUntilSaturday);
    } else {
      targetDate.setDate(today.getDate() + daysUntilSunday);
    }
    
    return targetDate;
  };

  return (
    <div className="space-y-10">
      {DAYS.map(day => {
        const weekendDate = getWeekendDate(day);
        const holidays = getHolidaysForDate(weekendDate);
        
        return (
          <Card key={day} variant="elevated" padding="lg" className="bg-white/90">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="m-0 text-2xl">{day}</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {weekendDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </span>
                {holidays.length > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                      🎉 {holidays[0].name}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <CardContent>
              <DaySchedule day={day} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
