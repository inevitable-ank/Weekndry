import { create } from 'zustand';
// import type { Activity } from '../types/activity';

interface ActivityState {
  favorites: Record<string, boolean>;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  favorites: {},
  toggleFavorite: (id: string) => set((state) => ({
    favorites: { ...state.favorites, [id]: !state.favorites[id] }
  })),
  isFavorite: (id: string) => Boolean(get().favorites[id]),
}));


