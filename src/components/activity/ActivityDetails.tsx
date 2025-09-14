import React from 'react';
import type { Activity } from '../../types/activity';
import { Badge, Button } from '../ui';
import { geocode } from '../../services/mapsService';

interface ActivityDetailsProps {
  activity: Activity;
}

export const ActivityDetails: React.FC<ActivityDetailsProps> = ({ activity }) => {
  const onMapIt = async () => {
    const query = activity.location ?? activity.name;
    if (!query) return;
    try {
      const results = await geocode(query);
      if (results.length > 0) {
        const { lat, lon } = results[0];
        const url = `https://www.openstreetmap.org/#map=15/${lat}/${lon}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        const url = `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } catch {
      const url = `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="text-4xl" aria-hidden>{activity.icon ?? '⭐'}</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{activity.name}</h3>
          <div className="mt-1"><Badge variant="secondary">{activity.category}</Badge></div>
        </div>
      </div>
      {activity.description && (
        <p className="text-gray-600">{activity.description}</p>
      )}
      <div className="text-sm text-gray-500">
        {activity.durationMinutes ? <div>Duration: {activity.durationMinutes} min</div> : null}
        {activity.energyLevel ? <div>Energy: {activity.energyLevel}/5</div> : null}
        {activity.mood ? <div>Suggested vibe: {activity.mood}</div> : null}
        {activity.location ? <div>Location: {activity.location}</div> : null}
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="secondary" onClick={onMapIt} icon="🗺️">Map it</Button>
      </div>
    </div>
  );
};

