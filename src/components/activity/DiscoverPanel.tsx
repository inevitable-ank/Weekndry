import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, LoadingSpinner } from '../ui';
import { useWeather } from '../../hooks/useWeather';
import { fetchLocalEvents, type LocalEvent } from '../../services/eventsService';

export const DiscoverPanel: React.FC = () => {
  const { weather, loading: weatherLoading, error: weatherError } = useWeather();
  const [refreshKey, setRefreshKey] = useState(0);
  const [events, setEvents] = useState<LocalEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);
  const [showLocationHelp, setShowLocationHelp] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoadingEvents(true);
      const city = 'Your city';
      const list = await fetchLocalEvents(city);
      if (active) {
        setEvents(list);
        setLoadingEvents(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const suggestion = getSuggestionForWeather(weather?.condition);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Weather-aware suggestion</CardTitle>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => window.location.reload()}
              disabled={weatherLoading}
              className="text-gray-500 hover:text-gray-700"
            >
              🔄 Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {weatherLoading ? (
            <div className="flex items-center gap-2 text-gray-600">
              <LoadingSpinner size="sm" /> 
              <span>Loading weather...</span>
            </div>
          ) : weatherError ? (
            <div className="text-red-600 text-sm">
              <div className="font-medium">Weather unavailable</div>
              <div className="text-xs mt-1">Unable to fetch weather data. Using default suggestions.</div>
              <div className="text-sm mt-2 text-gray-700">Idea: {suggestion}</div>
            </div>
          ) : (
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-2xl">{weather?.icon} {weather?.tempC ?? '--'}°C</div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    📍 {weather?.location || 'Unknown Location'}
                  </div>
                  <button 
                    onClick={() => setShowLocationHelp(!showLocationHelp)}
                    className="text-xs text-blue-500 hover:text-blue-700"
                    title="Location help"
                  >
                    ❓
                  </button>
                </div>
              </div>
              <div className="font-medium">{weather?.condition ?? 'Unknown conditions'}</div>
              <div className="text-sm bg-blue-50 p-2 rounded-lg border-l-4 border-blue-200">
                <span className="font-medium text-blue-800">💡 Idea:</span>
                <span className="text-blue-700 ml-1">{suggestion}</span>
              </div>
              
              {showLocationHelp && (
                <div className="text-xs bg-yellow-50 p-2 rounded border-l-4 border-yellow-200">
                  <div className="font-medium text-yellow-800">📍 Location Info:</div>
                  <div className="text-yellow-700 mt-1">
                    We detect your location automatically. If you see the wrong city, please:
                    <br />• Allow location access in your browser
                    <br />• Check if you're using a VPN
                    <br />• Refresh the page to try again
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nearby events (mock)</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingEvents ? (
            <div className="flex items-center gap-2 text-gray-600"><LoadingSpinner size="sm" /> Loading events...</div>
          ) : (
            <ul className="space-y-2">
              {events.map(ev => (
                <li key={ev.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{ev.title}</div>
                    <div className="text-xs text-gray-500">{ev.date} {ev.location ? `• ${ev.location}` : ''}</div>
                  </div>
                  {ev.url && <Button size="sm" variant="ghost" onClick={() => window.open(ev.url, '_blank')}>Open</Button>}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

function getSuggestionForWeather(condition?: string): string {
  switch (condition) {
    case 'Clear': return 'Perfect for outdoor activities! Try a picnic, beach day, or hiking adventure';
    case 'Partly cloudy': return 'Great weather for outdoor cafes, light hiking, or exploring local markets';
    case 'Rain': return 'Cozy indoor vibes! Perfect for movie nights, board games, or cooking together';
    case 'Snow': return 'Winter wonderland! Try hot chocolate dates, ice skating, or building snowmen';
    case 'Thunderstorm': return 'Stay cozy indoors with cooking, reading, or crafting activities';
    case 'Fog': return 'Mysterious weather! Visit museums, art galleries, or enjoy a warm brunch';
    default: return 'Explore new neighborhood spots, try a yoga class, or discover local cafes';
  }
}



