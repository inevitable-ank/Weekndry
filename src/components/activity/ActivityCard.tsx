import React, { useState } from 'react';
import type { Activity } from '../../types';
import { Card, CardContent, CardTitle, Badge, Button } from '../ui';
import { useActivityStore } from '../../store/activityStore';
import { LocationRecommendations } from './LocationRecommendations';

interface ActivityCardProps {
  activity: Activity;
  onSelect?: (activity: Activity) => void;
}

const ActivityCardBase: React.FC<ActivityCardProps> = ({ activity, onSelect }) => {
  const clickable = Boolean(onSelect);
  const { toggleFavorite, isFavorite } = useActivityStore();
  const fav = isFavorite(activity.id);
  const [showLocationModal, setShowLocationModal] = useState(false);
  
  const onMap = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowLocationModal(true);
  };
  return (
    <>
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
          <div className="mt-2 flex justify-end gap-2">
            <Button size="sm" variant={fav ? 'success' : 'ghost'} onClick={(e) => { e.stopPropagation(); toggleFavorite(activity.id); }} icon={fav ? '⭐' : '☆'}>
              {fav ? 'Favorited' : 'Favorite'}
            </Button>
            <Button size="sm" variant="ghost" onClick={onMap} icon="📍">Find Places</Button>
          </div>
        </CardContent>
      </Card>
      
      <LocationRecommendations
        activity={activity}
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
      />
    </>
  );
};

export const ActivityCard = React.memo(ActivityCardBase);
