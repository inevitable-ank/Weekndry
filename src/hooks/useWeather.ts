import { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';

export interface WeatherData {
  tempC: number;
  condition: string;
  icon?: string;
  location?: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

// Lightweight weather using free open-meteo.com (no key) with geolocation fallback to user's default city
export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { city: defaultCity } = useUserStore();

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

    const getCoordinatesForCity = async (cityName: string): Promise<{ lat: number; lon: number } | null> => {
      try {
        // Hardcoded coordinates for major cities (reliable and fast)
        const majorCities: Record<string, { lat: number; lon: number }> = {
          'mumbai': { lat: 19.0760, lon: 72.8777 },
          'delhi': { lat: 28.6139, lon: 77.2090 },
          'bangalore': { lat: 12.9716, lon: 77.5946 },
          'hyderabad': { lat: 17.3850, lon: 78.4867 },
          'chennai': { lat: 13.0827, lon: 80.2707 },
          'kolkata': { lat: 22.5726, lon: 88.3639 },
          'pune': { lat: 18.5204, lon: 73.8567 },
          'ahmedabad': { lat: 23.0225, lon: 72.5714 },
          'jaipur': { lat: 26.9124, lon: 75.7873 },
          'surat': { lat: 21.1702, lon: 72.8311 },
          'lucknow': { lat: 26.8467, lon: 80.9462 },
          'kanpur': { lat: 26.4499, lon: 80.3319 },
          'nagpur': { lat: 21.1458, lon: 79.0882 },
          'indore': { lat: 22.7196, lon: 75.8577 },
          'thane': { lat: 19.2183, lon: 72.9781 },
          'bhopal': { lat: 23.2599, lon: 77.4126 },
          'visakhapatnam': { lat: 17.6868, lon: 83.2185 },
          'pimpri': { lat: 18.6298, lon: 73.7997 },
          'patna': { lat: 25.5941, lon: 85.1376 },
          'vadodara': { lat: 22.3072, lon: 73.1812 },
          // International cities
          'new york': { lat: 40.7128, lon: -74.0060 },
          'london': { lat: 51.5074, lon: -0.1278 },
          'paris': { lat: 48.8566, lon: 2.3522 },
          'tokyo': { lat: 35.6762, lon: 139.6503 },
          'sydney': { lat: -33.8688, lon: 151.2093 },
          'singapore': { lat: 1.3521, lon: 103.8198 },
          'dubai': { lat: 25.2048, lon: 55.2708 },
          'toronto': { lat: 43.6532, lon: -79.3832 },
          'berlin': { lat: 52.5200, lon: 13.4050 },
          'madrid': { lat: 40.4168, lon: -3.7038 }
        };
        
        const normalizedCity = cityName.toLowerCase().trim();
        if (majorCities[normalizedCity]) {
          return majorCities[normalizedCity];
        }
        
        // Try OpenStreetMap for other cities
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`, {
            headers: {
              'User-Agent': 'WeekendlyApp/1.0'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
              const result = data[0];
              if (result.lat && result.lon) {
                return {
                  lat: parseFloat(result.lat),
                  lon: parseFloat(result.lon)
                };
              }
            }
          }
        } catch {
          // Silently fail and return null
        }
        
        return null;
      } catch {
        return null;
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
            location,
            coordinates: { lat, lon }
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
        return resolve(null);
      }
      
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos),
        () => resolve(null),
        { 
          maximumAge: 300_000, // 5 minutes
          timeout: 15000, // 15 seconds
          enableHighAccuracy: false // Faster, less accurate
        }
      );
    });

    (async () => {
      const pos = await getLocation();
      
      let lat: number;
      let lon: number;
      
      if (!pos) {
        // Geolocation failed, try to use user's default city
        if (defaultCity && defaultCity !== 'Your city') {
          const coords = await getCoordinatesForCity(defaultCity);
          if (coords) {
            lat = coords.lat;
            lon = coords.lon;
          } else {
            // Fallback to timezone-based detection
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta')) {
              lat = 28.6139; // Delhi
              lon = 77.2090;
            } else {
              lat = 37.7749; // San Francisco
              lon = -122.4194;
            }
          }
        } else {
          // No default city set, use timezone-based fallback
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta')) {
            lat = 28.6139; // Delhi
            lon = 77.2090;
          } else {
            lat = 37.7749; // San Francisco
            lon = -122.4194;
          }
        }
      } else {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
      }
      
      await fetchWeather(lat, lon);
    })();

    return () => { isMounted = false; };
  }, [defaultCity]); // Re-run when default city changes

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



