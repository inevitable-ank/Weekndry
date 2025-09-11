// Minimal maps/geocoding using OpenStreetMap Nominatim (free) with rate limits

export interface GeocodeResult {
  displayName: string;
  lat: number;
  lon: number;
}

export async function geocode(query: string): Promise<GeocodeResult[]> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    if (!res.ok) throw new Error('geocode failed');
    const data = await res.json();
    return (data as any[]).slice(0, 5).map(item => ({
      displayName: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
    }));
  } catch {
    return [];
  }
}

export async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    if (!res.ok) throw new Error('reverse failed');
    const data = await res.json();
    return data?.display_name ?? null;
  } catch {
    return null;
  }
}


