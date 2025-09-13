import { useEffect, useState } from 'react';

export interface WeatherData {
  tempC: number;
  condition: string;
  icon?: string;
}

// Lightweight weather using free open-meteo.com (no key) with geolocation fallback to a default
export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch weather');
        const json = await res.json();
        const tempC = json?.current?.temperature_2m ?? null;
        const code = json?.current?.weather_code ?? 0;
        const condition = mapWeatherCode(code);
        if (isMounted) setWeather({ tempC, condition, icon: iconForCondition(condition) });
      } catch (e) {
        if (isMounted) setError('Unable to load weather');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const getLocation = () => new Promise<GeolocationPosition | null>((resolve) => {
      if (!('geolocation' in navigator)) return resolve(null);
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos),
        () => resolve(null),
        { maximumAge: 60_000, timeout: 5000 }
      );
    });

    (async () => {
      const pos = await getLocation();
      const lat = pos?.coords.latitude ?? 37.7749; // fallback SF
      const lon = pos?.coords.longitude ?? -122.4194;
      await fetchWeather(lat, lon);
    })();

    return () => { isMounted = false; };
  }, []);

  return { weather, loading, error };
}

function mapWeatherCode(code: number): string {
  // very simplified mapper
  if ([0].includes(code)) return 'Clear';
  if ([1,2,3].includes(code)) return 'Partly cloudy';
  if ([45,48].includes(code)) return 'Fog';
  if ([51,53,55,61,63,65,80,81,82].includes(code)) return 'Rain';
  if ([71,73,75,85,86].includes(code)) return 'Snow';
  if ([95,96,99].includes(code)) return 'Thunderstorm';
  return 'Unknown';
}

function iconForCondition(condition: string): string {
  switch (condition) {
    case 'Clear': return '☀️';
    case 'Partly cloudy': return '⛅';
    case 'Fog': return '🌫️';
    case 'Rain': return '🌧️';
    case 'Snow': return '❄️';
    case 'Thunderstorm': return '⛈️';
    default: return '🌡️';
  }
}



