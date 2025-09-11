import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardTitle, Badge } from '../ui';
import { INDIAN_HOLIDAYS, getHolidaysForMonth, getHolidaysForDate, type Holiday } from '../../data/holidays';

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
  showHolidays?: boolean;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const Calendar: React.FC<CalendarProps> = ({ 
  onDateSelect, 
  selectedDate, 
  showHolidays = true 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthHolidays = useMemo(() => 
    showHolidays ? getHolidaysForMonth(year, month + 1) : [], 
    [year, month, showHolidays]
  );

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  }, [year, month]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setFullYear(newDate.getFullYear() - 1);
      } else {
        newDate.setFullYear(newDate.getFullYear() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month;
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const getHolidayForDate = (date: Date): Holiday | null => {
    const holidays = getHolidaysForDate(date);
    return holidays.length > 0 ? holidays[0] : null;
  };

  const getHolidayColor = (type: Holiday['type']) => {
    switch (type) {
      case 'national': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'religious': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'regional': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (viewMode === 'year') {
    return (
      <Card variant="elevated" className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <CardTitle className="text-2xl">{year}</CardTitle>
            <div className="flex gap-2">
              <button
                onClick={() => navigateYear('prev')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Previous year"
              >
                ←
              </button>
              <button
                onClick={() => setViewMode('month')}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Month View
              </button>
              <button
                onClick={() => navigateYear('next')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Next year"
              >
                →
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {MONTHS.map((monthName, index) => (
              <div key={index} className="text-center">
                <h3 className="font-semibold text-gray-800 mb-2">{monthName}</h3>
                <div className="text-sm text-gray-600">
                  {INDIAN_HOLIDAYS.filter(h => {
                    const [hYear, hMonth] = h.date.split('-').map(Number);
                    return hYear === year && hMonth === index + 1;
                  }).length} holidays
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="w-full">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <CardTitle className="text-2xl">
            {MONTHS[month]} {year}
          </CardTitle>
          <div className="flex gap-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Previous month"
            >
              ←
            </button>
            <button
              onClick={() => setViewMode('year')}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Year
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Next month"
            >
              →
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, index) => {
            const holiday = getHolidayForDate(date);
            const isCurrentMonthDay = isCurrentMonth(date);
            const isTodayDate = isToday(date);
            const isSelectedDate = isSelected(date);

            return (
              <button
                key={index}
                onClick={() => onDateSelect?.(date)}
                className={`
                  relative p-2 text-sm rounded-lg transition-all duration-200
                  ${isCurrentMonthDay 
                    ? 'text-gray-800 hover:bg-blue-50' 
                    : 'text-gray-400 hover:bg-gray-50'
                  }
                  ${isTodayDate ? 'bg-blue-100 font-semibold' : ''}
                  ${isSelectedDate ? 'bg-blue-500 text-white' : ''}
                  ${holiday ? 'border-l-4 border-l-orange-400' : ''}
                `}
              >
                <div className="flex flex-col items-center">
                  <span>{date.getDate()}</span>
                  {holiday && isCurrentMonthDay && (
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Holiday legend */}
        {showHolidays && monthHolidays.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">Holidays this month:</h4>
            <div className="space-y-2">
              {monthHolidays.map((holiday, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Badge 
                    variant="secondary" 
                    className={getHolidayColor(holiday.type)}
                  >
                    {holiday.type}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {new Date(holiday.date).getDate()} {MONTHS[month]} - {holiday.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
