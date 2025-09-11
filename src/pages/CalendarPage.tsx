import React, { useState } from 'react';
import { Calendar } from '../components/calendar/Calendar';
import { Card, CardContent, CardTitle } from '../components/ui';
import { getHolidaysForDate, INDIAN_HOLIDAYS } from '../data/holidays';

export const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const selectedHolidays = selectedDate ? getHolidaysForDate(selectedDate) : [];

  return (
    <section className="pt-10 pb-24 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Indian Holidays Calendar</h2>
        <p className="text-gray-600">Plan your weekends around Indian holidays and festivals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Calendar */}
        <div className="lg:col-span-2">
          <Calendar 
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
            showHolidays={true}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Date Info */}
          {selectedDate && (
            <Card variant="elevated">
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-4">
                  {selectedDate.toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
                
                {selectedHolidays.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">Holidays:</h4>
                    {selectedHolidays.map((holiday, index) => (
                      <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="font-medium text-orange-800">{holiday.name}</div>
                        <div className="text-sm text-orange-600 capitalize">{holiday.type}</div>
                        {holiday.description && (
                          <div className="text-sm text-gray-600 mt-1">{holiday.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 text-center py-4">
                    No holidays on this date
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card variant="elevated">
            <CardContent className="p-6">
              <CardTitle className="text-lg mb-4">Holiday Statistics</CardTitle>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Holidays:</span>
                  <span className="font-semibold">{INDIAN_HOLIDAYS.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">National:</span>
                  <span className="font-semibold">
                    {INDIAN_HOLIDAYS.filter(h => h.type === 'national').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Religious:</span>
                  <span className="font-semibold">
                    {INDIAN_HOLIDAYS.filter(h => h.type === 'religious').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Regional:</span>
                  <span className="font-semibold">
                    {INDIAN_HOLIDAYS.filter(h => h.type === 'regional').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Holidays */}
          <Card variant="elevated">
            <CardContent className="p-6">
              <CardTitle className="text-lg mb-4">Upcoming Holidays</CardTitle>
              <div className="space-y-2">
                {INDIAN_HOLIDAYS
                  .filter(holiday => new Date(holiday.date) > new Date())
                  .slice(0, 5)
                  .map((holiday, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <div className="font-medium text-sm">{holiday.name}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(holiday.date).toLocaleDateString('en-IN', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        holiday.type === 'national' ? 'bg-orange-100 text-orange-800' :
                        holiday.type === 'religious' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {holiday.type}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
