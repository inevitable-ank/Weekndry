export function isWeekend(date: Date): boolean {
  const d = date.getDay();
  return d === 6 || d === 0;
}

export function nextSaturday(from = new Date()): Date {
  const date = new Date(from);
  const day = date.getDay();
  const diff = (6 - day + 7) % 7;
  date.setDate(date.getDate() + diff);
  return date;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}


