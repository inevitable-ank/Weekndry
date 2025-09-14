import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalFooter, Button, Card, CardContent, Badge } from '../ui';
import { getActivityLocationRecommendations, type LocationRecommendation, type ActivityLocationQuery } from '../../services/mapsService';
import { useWeather } from '../../hooks/useWeather';
import type { Activity } from '../../types';

interface LocationRecommendationsProps {
  activity: Activity;
  isOpen: boolean;
  onClose: () => void;
}

export const LocationRecommendations: React.FC<LocationRecommendationsProps> = ({
  activity,
  isOpen,
  onClose
}) => {
  const [recommendations, setRecommendations] = useState<LocationRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { weather } = useWeather();

  useEffect(() => {
    if (isOpen && activity) {
      fetchRecommendations();
    }
  }, [isOpen, activity]);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const query: ActivityLocationQuery = {
        activityName: activity.name,
        category: activity.category,
        userLocation: weather?.coordinates
      };
      
      const results = await getActivityLocationRecommendations(query);
      setRecommendations(results);
    } catch (err) {
      setError('Failed to load location recommendations');
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = (recommendation: LocationRecommendation) => {
    const url = `https://www.openstreetmap.org/#map=15/${recommendation.lat}/${recommendation.lon}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDirectionsClick = (recommendation: LocationRecommendation) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${recommendation.lat},${recommendation.lon}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`📍 Best Places for ${activity.name}`} size="lg">
      <ModalContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            {weather?.location && (
              <p>📍 Showing recommendations near {weather.location}</p>
            )}
            <p>Click on a location to view on map, or get directions.</p>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Finding the best places...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{error}</p>
              <Button variant="secondary" onClick={fetchRecommendations}>
                Try Again
              </Button>
            </div>
          )}

          {!loading && !error && recommendations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No specific locations found for this activity.</p>
              <Button variant="secondary" onClick={fetchRecommendations}>
                Search Again
              </Button>
            </div>
          )}

          {!loading && recommendations.length > 0 && (
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <Card key={`${rec.lat}-${rec.lon}`} hover className="cursor-pointer" onClick={() => handleLocationClick(rec)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-800">{rec.name}</h4>
                          {rec.rating && (
                            <Badge variant="secondary" className="text-xs">
                              ⭐ {rec.rating.toFixed(1)}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                        <p className="text-xs text-gray-500">{rec.address}</p>
                      </div>
                      <div className="flex flex-col gap-1 ml-4">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLocationClick(rec);
                          }}
                          icon="🗺️"
                        >
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDirectionsClick(rec);
                          }}
                          icon="🧭"
                        >
                          Directions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && recommendations.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> These recommendations are based on your location and activity type. 
                Click on any location to view it on the map or get directions.
              </p>
            </div>
          )}
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>Close</Button>
        {!loading && recommendations.length > 0 && (
          <Button variant="secondary" onClick={fetchRecommendations} icon="🔄">
            Refresh
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};
