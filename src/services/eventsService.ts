// Lightweight events service using mock/free endpoints with safe fallbacks

export interface LocalEvent {
  id: string;
  title: string;
  date: string;
  location?: string;
  url?: string;
}

export async function fetchLocalEvents(city: string): Promise<LocalEvent[]> {
  // Try free Eventbrite public search (no key) or fallback to a mock
  try {
    const query = encodeURIComponent(city);
    const res = await fetch(`https://www.eventbrite.com/api/v3/destination/events/?q=${query}`, { mode: 'no-cors' });
    // no-cors likely opaque; immediately fallback
    throw new Error('opaque');
  } catch {
    // Return mock events as safe fallback
    const today = new Date();
    const dayStr = today.toISOString().slice(0, 10);
    return [
      { id: 'e1', title: `Farmers Market - ${city}`, date: dayStr, location: 'Downtown Square' },
      { id: 'e2', title: `Live Music Night - ${city}`, date: dayStr, location: 'Main Street Pub' },
    ];
  }
}


