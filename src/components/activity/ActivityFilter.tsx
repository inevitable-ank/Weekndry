import React from 'react';
import type { ActivityCategory } from '../../types/activity';
import { Input, Badge } from '../ui';

interface ActivityFilterProps {
  query: string;
  onQueryChange: (v: string) => void;
  selected: ActivityCategory[];
  onToggleCategory: (c: ActivityCategory) => void;
}

const CATEGORIES: ActivityCategory[] = ['food','entertainment','outdoor','relaxation','learning','social','fitness','travel'];

export const ActivityFilter: React.FC<ActivityFilterProps> = ({ query, onQueryChange, selected, onToggleCategory }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
      <Input 
        placeholder="Search activities..."
        aria-label="Search activities"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        icon="🔎"
        className="md:max-w-sm"
      />
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {CATEGORIES.map(cat => (
          <Badge 
            key={cat}
            variant={selected.includes(cat) ? 'primary' : 'default'}
            removable={selected.includes(cat)}
            onRemove={() => onToggleCategory(cat)}
            className="cursor-pointer"
            onClick={() => onToggleCategory(cat) as any}
          >
            {cat}
          </Badge>
        ))}
      </div>
    </div>
  );
};


