import React from 'react';
import type { Activity } from '../../types';
import { Card, CardContent, CardTitle, Badge, Button } from '../ui';
import { geocode } from '../../services/mapsService';

interface ActivityCardProps {
  activity: Activity;
  onSelect?: (activity: Activity) => void;
}

const ActivityCardBase: React.FC<ActivityCardProps> = ({ activity, onSelect }) => {
  const clickable = Boolean(onSelect);
  const onMap = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
    } catch {}
  };
  return (
    <Card 
      hover 
      className={`flex items-center gap-4 ${clickable ? 'cursor-pointer' : ''}`}
      onClick={onSelect ? () => onSelect(activity) : undefined}
    >
      <div className="text-3xl" aria-hidden>
        {activity.icon ?? '⭐'}
      </div>
      <CardContent className="flex-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base m-0">{activity.name}</CardTitle>
          <Badge variant="secondary">{activity.category}</Badge>
        </div>
        {activity.durationMinutes && (
          <p className="text-xs text-gray-500 mt-1">{activity.durationMinutes} min • energy {activity.energyLevel ?? 2}/5</p>
        )}
        <div className="mt-2 flex justify-end">
          <Button size="sm" variant="ghost" onClick={onMap} icon="🗺️">Map</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const ActivityCard = React.memo(ActivityCardBase);
