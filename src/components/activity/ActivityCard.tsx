import React from 'react';
import { Activity } from '../../types';
import { Card, CardContent, CardTitle, Badge } from '../ui';

interface ActivityCardProps {
  activity: Activity;
  onSelect?: (activity: Activity) => void;
}

const ActivityCardBase: React.FC<ActivityCardProps> = ({ activity, onSelect }) => {
  const clickable = Boolean(onSelect);
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
      </CardContent>
    </Card>
  );
};

export const ActivityCard = React.memo(ActivityCardBase);
