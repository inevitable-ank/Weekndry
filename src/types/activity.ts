// Domain types for activities

export type ActivityCategory =
  | 'food'
  | 'entertainment'
  | 'outdoor'
  | 'relaxation'
  | 'learning'
  | 'social'
  | 'fitness'
  | 'travel';

export type ActivityMood = 'happy' | 'relaxed' | 'energetic' | 'creative' | 'social' | 'calm';

export interface Activity {
  id: string;
  name: string;
  description?: string;
  category: ActivityCategory;
  durationMinutes?: number; // default 60
  imageUrl?: string; // optional preview image
  icon?: string; // emoji or icon name
  mood?: ActivityMood;
  energyLevel?: 1 | 2 | 3 | 4 | 5; // 1 = chill, 5 = intense
  location?: string; // optional location text
}

export interface ActivityFilter {
  query?: string;
  categories?: ActivityCategory[];
  moods?: ActivityMood[];
  maxDurationMinutes?: number;
  energyRange?: [number, number];
}

export interface ActivityGroup {
  category: ActivityCategory;
  activities: Activity[];
}

