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
    <Card variant="elevated" className="w-full bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-xl">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {MONTHS[month]} {year}
          </CardTitle>
          <div className="flex gap-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:scale-105"
              aria-label="Previous month"
            >
              <span className="text-lg">←</span>
            </button>
            <button
              onClick={() => setViewMode('year')}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-200 hover:scale-105 shadow-md"
            >
              Year
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:scale-105"
              aria-label="Next month"
            >
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {DAYS.map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
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
                  relative p-3 text-sm rounded-xl transition-all duration-300 hover:scale-105
                  ${isSelectedDate 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg' 
                    : isTodayDate 
                      ? 'bg-gradient-to-br from-blue-100 to-purple-100 font-semibold hover:from-blue-200 hover:to-purple-200 shadow-md text-gray-800'
                      : isCurrentMonthDay 
                        ? 'text-gray-800 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:text-gray-800 shadow-sm hover:shadow-md' 
                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-400'
                  }
                  ${holiday && !isSelectedDate ? 'border-l-4 border-l-orange-400 bg-gradient-to-r from-orange-50/50 to-transparent' : ''}
                `}
              >
                <div className="flex flex-col items-center">
                  <span>{date.getDate()}</span>
                  {holiday && isCurrentMonthDay && (
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mt-1 shadow-sm" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Holiday legend */}
        {showHolidays && monthHolidays.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gradient-to-r from-blue-200 to-purple-200">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">🎉</span>
              Holidays this month:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {monthHolidays.map((holiday, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-all duration-200">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                    holiday.type === 'national' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                    holiday.type === 'religious' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                    'bg-gradient-to-r from-blue-500 to-cyan-500'
                  }`}>
                    {(() => {
                      const [year, month, day] = holiday.date.split('-').map(Number);
                      return day;
                    })()}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-800">{holiday.name}</div>
                    <div className="text-xs text-gray-500">
                      {(() => {
                        const [year, month, day] = holiday.date.split('-').map(Number);
                        return `${day} ${MONTHS[month - 1]}`;
                      })()}
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getHolidayColor(holiday.type)}`}
                  >
                    {holiday.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
