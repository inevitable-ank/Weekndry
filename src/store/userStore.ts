import { create } from 'zustand';

interface UserPrefs {
  city: string;
  showDiscover: boolean;
}

interface UserState extends UserPrefs {
  setCity: (c: string) => void;
  toggleDiscover: () => void;
}

const STORAGE_KEY = 'weekendly_prefs_v1';

function load(): UserPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { city: 'Your city', showDiscover: true };
    return JSON.parse(raw) as UserPrefs;
  } catch {
    return { city: 'Your city', showDiscover: true };
  }
}

function save(prefs: UserPrefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {}
}

export const useUserStore = create<UserState>((set, get) => ({
  ...load(),
  setCity: (city: string) => {
    set({ city });
    save({ city, showDiscover: get().showDiscover });
  },
  toggleDiscover: () => {
    const next = !get().showDiscover;
    set({ showDiscover: next });
    save({ city: get().city, showDiscover: next });
  },
}));


