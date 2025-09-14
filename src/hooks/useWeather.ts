import { useEffect, useState } from 'react';

export interface WeatherData {
  tempC: number;
  condition: string;
  icon?: string;
  location?: string;
}

// Lightweight weather using free open-meteo.com (no key) with geolocation fallback to a default
export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchLocationName = async (lat: number, lon: number): Promise<string> => {
      try {
        // Using a free reverse geocoding service
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        if (!response.ok) throw new Error('Failed to fetch location');
        const data = await response.json();
        return data.locality || data.city || data.principalSubdivision || 'Unknown Location';
      } catch {
        return 'Unknown Location';
      }
    };

    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch weather');
        const json = await res.json();
        const tempC = json?.current?.temperature_2m ?? null;
        const code = json?.current?.weather_code ?? 0;
        const condition = mapWeatherCode(code);
        
        // Fetch location name in parallel
        const location = await fetchLocationName(lat, lon);
        
        if (isMounted) {
          setWeather({ 
            tempC, 
            condition, 
            icon: iconForCondition(condition),
            location 
          });
        }
      } catch (e) {
        if (isMounted) setError('Unable to load weather');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const getLocation = () => new Promise<GeolocationPosition | null>((resolve) => {
      if (!('geolocation' in navigator)) {
        console.warn('Geolocation not supported');
        return resolve(null);
      }
      
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.info('Geolocation successful:', pos.coords.latitude, pos.coords.longitude);
          resolve(pos);
        },
        (error) => {
          console.warn('Geolocation error:', error.message);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.warn('User denied location permission');
              break;
            case error.POSITION_UNAVAILABLE:
              console.warn('Location information unavailable');
              break;
            case error.TIMEOUT:
              console.warn('Location request timed out');
              break;
          }
          resolve(null);
        },
        { 
          maximumAge: 300_000, // 5 minutes
          timeout: 15000, // 15 seconds
          enableHighAccuracy: false // Faster, less accurate
        }
      );
    });

    (async () => {
      const pos = await getLocation();
      
      // Better fallback logic - try to detect if user might be in India
      let lat = 37.7749; // SF default
      let lon = -122.4194;
      
      if (!pos) {
        // Try to detect user's likely location based on timezone or other hints
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.info('Geolocation failed, detected timezone:', timezone);
        
        // If timezone suggests India, use Delhi coordinates
        if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta')) {
          lat = 28.6139; // Delhi
          lon = 77.2090;
          console.info('Using Delhi as fallback location');
        } else {
          console.info('Using San Francisco as fallback location');
        }
      } else {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
        console.info('Using detected location:', lat, lon);
      }
      
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



