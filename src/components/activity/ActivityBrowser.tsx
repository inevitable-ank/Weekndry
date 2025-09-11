import React, { useMemo, useState } from 'react';
import { Activity, ActivityCategory } from '../../types';
import { Input, Badge } from '../ui';
import { ActivityCard } from './ActivityCard';
import { EmptyState } from '../common/EmptyState';

interface ActivityBrowserProps {
  activities: Activity[];
  onSelect?: (activity: Activity) => void;
}

const CATEGORIES: ActivityCategory[] = ['food','entertainment','outdoor','relaxation','learning','social','fitness','travel'];

export const ActivityBrowser: React.FC<ActivityBrowserProps> = ({ activities, onSelect }) => {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ActivityCategory[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return activities.filter(a => {
      const matchesQuery = !q || a.name.toLowerCase().includes(q) || a.description?.toLowerCase().includes(q);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(a.category);
      return matchesQuery && matchesCategory;
    });
  }, [activities, query, selectedCategories]);

  const toggleCategory = (cat: ActivityCategory) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <Input 
          placeholder="Search activities..."
          aria-label="Search activities"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon="🔎"
          className="md:max-w-sm"
        />
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {CATEGORIES.map(cat => (
            <Badge 
              key={cat}
              variant={selectedCategories.includes(cat) ? 'primary' : 'default'}
              removable={selectedCategories.includes(cat)}
              onRemove={() => toggleCategory(cat)}
              className="cursor-pointer"
              onClick={() => toggleCategory(cat) as any}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState 
          icon="🔍" 
          title="No activities found"
          description="Try a different search or adjust your filters."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(a => (
            <ActivityCard key={a.id} activity={a} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};
