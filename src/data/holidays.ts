export interface Holiday {
  date: string; // YYYY-MM-DD format
  name: string;
  type: 'national' | 'regional' | 'religious';
  description?: string;
}

// Major Indian National Holidays for 2024-2025
export const INDIAN_HOLIDAYS: Holiday[] = [
  // 2024
  { date: '2024-01-26', name: 'Republic Day', type: 'national' },
  { date: '2024-03-08', name: 'Holi', type: 'religious' },
  { date: '2024-03-25', name: 'Holi', type: 'religious' },
  { date: '2024-04-11', name: 'Ram Navami', type: 'religious' },
  { date: '2024-04-14', name: 'Ambedkar Jayanti', type: 'national' },
  { date: '2024-04-17', name: 'Ramzan Id', type: 'religious' },
  { date: '2024-05-01', name: 'Labour Day', type: 'national' },
  { date: '2024-08-15', name: 'Independence Day', type: 'national' },
  { date: '2024-08-26', name: 'Janmashtami', type: 'religious' },
  { date: '2024-09-07', name: 'Ganesh Chaturthi', type: 'religious' },
  { date: '2024-10-02', name: 'Gandhi Jayanti', type: 'national' },
  { date: '2024-10-12', name: 'Dussehra', type: 'religious' },
  { date: '2024-10-31', name: 'Diwali', type: 'religious' },
  { date: '2024-11-01', name: 'Diwali', type: 'religious' },
  { date: '2024-12-25', name: 'Christmas', type: 'religious' },

  // 2025
  { date: '2025-01-26', name: 'Republic Day', type: 'national' },
  { date: '2025-03-14', name: 'Holi', type: 'religious' },
  { date: '2025-03-30', name: 'Ram Navami', type: 'religious' },
  { date: '2025-04-14', name: 'Ambedkar Jayanti', type: 'national' },
  { date: '2025-04-18', name: 'Good Friday', type: 'religious' },
  { date: '2025-05-01', name: 'Labour Day', type: 'national' },
  { date: '2025-08-15', name: 'Independence Day', type: 'national' },
  { date: '2025-08-15', name: 'Independence Day', type: 'national' },
  { date: '2025-09-05', name: 'Janmashtami', type: 'religious' },
  { date: '2025-09-26', name: 'Ganesh Chaturthi', type: 'religious' },
  { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'national' },
  { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'national' },
  { date: '2025-10-20', name: 'Dussehra', type: 'religious' },
  { date: '2025-10-20', name: 'Dussehra', type: 'religious' },
  { date: '2025-11-17', name: 'Diwali', type: 'religious' },
  { date: '2025-11-18', name: 'Diwali', type: 'religious' },
  { date: '2025-12-25', name: 'Christmas', type: 'religious' },
];

export const getHolidaysForMonth = (year: number, month: number): Holiday[] => {
  return INDIAN_HOLIDAYS.filter(holiday => {
    const [holidayYear, holidayMonth] = holiday.date.split('-').map(Number);
    return holidayYear === year && holidayMonth === month;
  });
};

export const getHolidaysForDate = (date: Date): Holiday[] => {
  const dateStr = date.toISOString().split('T')[0];
  return INDIAN_HOLIDAYS.filter(holiday => holiday.date === dateStr);
};

export const isHoliday = (date: Date): boolean => {
  return getHolidaysForDate(date).length > 0;
};
