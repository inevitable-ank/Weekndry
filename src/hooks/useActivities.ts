import { useMemo, useState } from 'react';
import type { Activity, ActivityCategory } from '../types';

export function useActivities(all: Activity[]) {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState<ActivityCategory[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter(a => {
      const matchQ = !q || a.name.toLowerCase().includes(q) || a.description?.toLowerCase().includes(q);
      const matchC = categories.length === 0 || categories.includes(a.category);
      return matchQ && matchC;
    });
  }, [all, query, categories]);

  return { filtered, query, setQuery, categories, setCategories };
}


