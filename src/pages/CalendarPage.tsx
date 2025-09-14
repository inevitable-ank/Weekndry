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
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100 via-red-100 to-green-100 rounded-3xl blur-3xl opacity-30 -z-10"></div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-green-600 bg-clip-text text-transparent mb-3">
          Indian Holidays Calendar
        </h2>
        <p className="text-gray-600 text-lg">Plan your weekends around Indian holidays and festivals</p>
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
            <span>National</span>
            <span className="w-2 h-2 bg-purple-400 rounded-full ml-4"></span>
            <span>Religious</span>
            <span className="w-2 h-2 bg-blue-400 rounded-full ml-4"></span>
            <span>Regional</span>
          </div>
        </div>
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
            <Card variant="elevated" className="bg-gradient-to-br from-white to-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {selectedDate.getDate()}
                  </div>
                  <div>
                    <CardTitle className="text-lg mb-1">
                      {selectedDate.toLocaleDateString('en-IN', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{selectedDate.getFullYear()}</p>
                  </div>
                </div>
                
                {selectedHolidays.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <span className="text-2xl">🎉</span>
                      Holidays
                    </h4>
                    {selectedHolidays.map((holiday, index) => (
                      <div key={index} className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                        holiday.type === 'national' ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200' :
                        holiday.type === 'religious' ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200' :
                        'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                            holiday.type === 'national' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                            holiday.type === 'religious' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                            'bg-gradient-to-r from-blue-500 to-cyan-500'
                          }`}>
                            {holiday.type === 'national' ? '🏛️' : holiday.type === 'religious' ? '🕉️' : '🏛️'}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{holiday.name}</div>
                            <div className="text-sm text-gray-600 capitalize">{holiday.type}</div>
                          </div>
                        </div>
                        {holiday.description && (
                          <div className="text-sm text-gray-600 mt-2 pl-11">{holiday.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📅</div>
                    <div className="text-gray-500">No holidays on this date</div>
                    <div className="text-sm text-gray-400 mt-1">Perfect for planning activities!</div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card variant="elevated" className="bg-gradient-to-br from-white to-green-50 border-green-200">
            <CardContent className="p-6">
              <CardTitle className="text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Holiday Statistics
              </CardTitle>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span className="text-gray-600">Total Holidays:</span>
                  </div>
                  <span className="font-bold text-lg text-gray-800">{INDIAN_HOLIDAYS.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                    <span className="text-gray-600">National:</span>
                  </div>
                  <span className="font-bold text-lg text-orange-600">
                    {INDIAN_HOLIDAYS.filter(h => h.type === 'national').length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <span className="text-gray-600">Religious:</span>
                  </div>
                  <span className="font-bold text-lg text-purple-600">
                    {INDIAN_HOLIDAYS.filter(h => h.type === 'religious').length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                    <span className="text-gray-600">Regional:</span>
                  </div>
                  <span className="font-bold text-lg text-blue-600">
                    {INDIAN_HOLIDAYS.filter(h => h.type === 'regional').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Holidays */}
          <Card variant="elevated" className="bg-gradient-to-br from-white to-purple-50 border-purple-200">
            <CardContent className="p-6">
              <CardTitle className="text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">🔮</span>
                Upcoming Holidays
              </CardTitle>
              <div className="space-y-3">
                {INDIAN_HOLIDAYS
                  .filter(holiday => {
                    const [year, month, day] = holiday.date.split('-').map(Number);
                    const holidayDate = new Date(year, month - 1, day);
                    return holidayDate > new Date();
                  })
                  .slice(0, 5)
                  .map((holiday, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-all duration-200">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                        holiday.type === 'national' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                        holiday.type === 'religious' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                        'bg-gradient-to-r from-blue-500 to-cyan-500'
                      }`}>
                        {(() => {
                          const [, , day] = holiday.date.split('-').map(Number);
                          return day;
                        })()}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-800">{holiday.name}</div>
                        <div className="text-xs text-gray-500">
                          {(() => {
                            const [year, month, day] = holiday.date.split('-').map(Number);
                            const date = new Date(year, month - 1, day);
                            return date.toLocaleDateString('en-IN', { 
                              month: 'long', 
                              day: 'numeric',
                              year: 'numeric'
                            });
                          })()}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
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
