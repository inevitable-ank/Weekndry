import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, LoadingSpinner } from '../ui';
import { useWeather } from '../../hooks/useWeather';
import { fetchLocalEvents, type LocalEvent } from '../../services/eventsService';

export const DiscoverPanel: React.FC = () => {
  const { weather, loading: weatherLoading } = useWeather();
  const [events, setEvents] = useState<LocalEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);

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
          <CardTitle>Weather-aware suggestion</CardTitle>
        </CardHeader>
        <CardContent>
          {weatherLoading ? (
            <div className="flex items-center gap-2 text-gray-600"><LoadingSpinner size="sm" /> Loading weather...</div>
          ) : (
            <div className="space-y-1 text-gray-700">
              <div className="text-2xl">{weather?.icon} {weather?.tempC ?? '--'}°C</div>
              <div>{weather?.condition ?? 'Unknown conditions'}</div>
              <div className="text-sm">Idea: {suggestion}</div>
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
    case 'Clear': return 'Plan an outdoor picnic or a city walk';
    case 'Partly cloudy': return 'Try a relaxed outdoor cafe or light hike';
    case 'Rain': return 'Consider a cozy movie night or board games';
    case 'Snow': return 'Hot chocolate date and a short walk';
    case 'Thunderstorm': return 'Indoor activities like cooking or reading';
    case 'Fog': return 'Visit a museum or brunch with friends';
    default: return 'Explore a new neighborhood spot or yoga class';
  }
}


