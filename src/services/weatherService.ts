import type { WeatherData } from '../hooks/useWeather';

export async function fetchCurrentWeather(lat: number, lon: number): Promise<WeatherData | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    const tempC = json?.current?.temperature_2m ?? null;
    const code = json?.current?.weather_code ?? 0;
    const condition = mapWeatherCode(code);
    
    // Fetch location name
    let location = 'Unknown Location';
    try {
      const locationRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
      if (locationRes.ok) {
        const locationData = await locationRes.json();
        location = locationData.locality || locationData.city || locationData.principalSubdivision || 'Unknown Location';
      }
    } catch {
      // Keep default location if reverse geocoding fails
    }
    
    return { tempC, condition, location };
  } catch {
    return null;
  }
}

function mapWeatherCode(code: number): string {
  if ([0].includes(code)) return 'Clear';
  if ([1,2,3].includes(code)) return 'Partly cloudy';
  if ([45,48].includes(code)) return 'Fog';
  if ([51,53,55,61,63,65,80,81,82].includes(code)) return 'Rain';
  if ([71,73,75,85,86].includes(code)) return 'Snow';
  if ([95,96,99].includes(code)) return 'Thunderstorm';
  return 'Unknown';
}



