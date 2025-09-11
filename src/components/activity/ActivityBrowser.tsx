import React, { useMemo, useState } from 'react';
import type { Activity, ActivityCategory } from '../../types';
import { Modal, ModalContent, ModalFooter, Button } from '../ui';
import { ActivityCard } from './ActivityCard';
import { EmptyState } from '../common/EmptyState';
import { ActivityDetails } from './ActivityDetails';
import { ActivityFilter } from './ActivityFilter';
import { DiscoverPanel } from './DiscoverPanel';

interface ActivityBrowserProps {
  activities: Activity[];
  onSelect?: (activity: Activity) => void; // legacy click handler
  onAdd?: (activity: Activity) => void;    // when provided, shows details modal with Add
}

const CATEGORIES: ActivityCategory[] = ['food','entertainment','outdoor','relaxation','learning','social','fitness','travel'];

export const ActivityBrowser: React.FC<ActivityBrowserProps> = ({ activities, onSelect, onAdd }) => {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ActivityCategory[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [active, setActive] = useState<Activity | null>(null);

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

  const handleCardClick = (a: Activity) => {
    if (onAdd) {
      setActive(a);
    } else if (onSelect) {
      onSelect(a);
    }
  };

  return (
    <div className="space-y-4">
      {/* Mobile filters toggle */}
      <div className="md:hidden flex justify-end">
        <Button variant="secondary" size="sm" onClick={() => setFiltersOpen(v => !v)} aria-expanded={filtersOpen} aria-controls="activity-filters">
          {filtersOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      <div id="activity-filters" className={` ${filtersOpen ? 'block' : 'hidden'} md:block`}>
        <ActivityFilter 
          query={query}
          onQueryChange={setQuery}
          selected={selectedCategories}
          onToggleCategory={toggleCategory}
        />
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
            <div key={a.id}>
              <ActivityCard activity={a} onSelect={handleCardClick} />
            </div>
          ))}
        </div>
      )}

      {/* Discover panel */}
      <DiscoverPanel />

      {/* Details Modal (when onAdd is provided) */}
      {onAdd && (
        <Modal isOpen={!!active} onClose={() => setActive(null)} title={active?.name} size="md">
          <ModalContent>
            {active && (
              <ActivityDetails activity={active} />
            )}
          </ModalContent>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setActive(null)}>Close</Button>
            {active && <Button onClick={() => { onAdd(active); setActive(null); }} icon="➕">Add</Button>}
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};
