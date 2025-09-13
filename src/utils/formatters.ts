export function formatMinutes(min?: number): string {
  if (!min && min !== 0) return '';
  if (min < 60) return `${min} min`;
  const hours = Math.floor(min / 60);
  const mins = min % 60;
  return mins ? `${hours}h ${mins}m` : `${hours}h`;
}

export function titleCase(s: string): string {
  return s.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
}

export function formatDateISO(date: Date): string {
  return date.toISOString().slice(0, 10);
}



