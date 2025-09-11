import React, { createContext, useContext, useEffect, useMemo, useState, createElement } from 'react';
import type { Activity } from '../types/activity';
import { DAYS, TIME_BLOCKS } from '../types/schedule';
import type { Day, ScheduleData, TimeBlock, ScheduledItem } from '../types/schedule';
import type { ActivityMood } from '../types/activity';

interface ScheduleContextValue {
  schedule: ScheduleData;
  addActivity: (activity: Activity, day: Day, block: TimeBlock) => void;
  moveItem: (itemId: string, day: Day, block: TimeBlock) => void;
  updateItemMood: (itemId: string, mood: ActivityMood) => void;
  updateItemTime: (itemId: string, startMinutes: number) => void;
  updateItemDayAndTime: (itemId: string, day: Day, startMinutes: number) => void;
  removeItem: (itemId: string) => void;
  clear: () => void;
}

const ScheduleContext = createContext<ScheduleContextValue | undefined>(undefined);

const STORAGE_KEY = 'weekendly_schedule_v1';

function createEmptyDay(): Record<TimeBlock, ScheduledItem[]> {
  return {
    morning: [],
    afternoon: [],
    evening: [],
  };
}

function createInitialSchedule(): ScheduleData {
  return {
    Saturday: createEmptyDay(),
    Sunday: createEmptyDay(),
  };
}

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schedule, setSchedule] = useState<ScheduleData>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as ScheduleData;
    } catch {}
    return createInitialSchedule();
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
    } catch {}
  }, [schedule]);

  const addActivity = (activity: Activity, day: Day, block: TimeBlock) => {
    setSchedule(prev => {
      const id = `si_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const defaultStart = block === 'morning' ? 8*60 : block === 'afternoon' ? 13*60 : 18*60;
      const item: ScheduledItem = { id, activity, day, block, startMinutes: defaultStart } as ScheduledItem;
      const next = structuredClone(prev) as ScheduleData;
      (next[day][block] as ScheduledItem[]) = [...next[day][block], item];
      return next;
    });
  };

  const moveItem = (itemId: string, day: Day, block: TimeBlock) => {
    setSchedule(prev => {
      const next = createInitialSchedule();
      (['Saturday','Sunday'] as Day[]).forEach(d => {
        (['morning','afternoon','evening'] as TimeBlock[]).forEach(b => {
          (prev[d][b] as ScheduledItem[]).forEach(item => {
            if (item.id === itemId) {
              (next[day][block] as ScheduledItem[]).push({ ...item, day, block });
            } else {
              (next[item.day][item.block] as ScheduledItem[]).push(item);
            }
          });
        });
      });
      return next;
    });
  };

  const updateItemMood = (itemId: string, mood: ActivityMood) => {
    setSchedule(prev => {
      const next = createInitialSchedule();
      (['Saturday','Sunday'] as Day[]).forEach(d => {
        (['morning','afternoon','evening'] as TimeBlock[]).forEach(b => {
          (prev[d][b] as ScheduledItem[]).forEach(item => {
            if (item.id === itemId) {
              (next[item.day][item.block] as ScheduledItem[]).push({ ...item, mood });
            } else {
              (next[item.day][item.block] as ScheduledItem[]).push(item);
            }
          });
        });
      });
      return next;
    });
  };

  const hasConflict = (items: ScheduledItem[], candidateId: string, start: number, duration: number) => {
    const end = start + duration;
    return items.some(it => {
      if (it.id === candidateId) return false;
      const itStart = it.startMinutes ?? 0;
      const itEnd = itStart + (it.activity.durationMinutes ?? 60);
      return Math.max(itStart, start) < Math.min(itEnd, end);
    });
  };

  const updateItemTime = (itemId: string, startMinutes: number) => {
    setSchedule(prev => {
      const next = createInitialSchedule();
      (['Saturday','Sunday'] as Day[]).forEach(d => {
        (['morning','afternoon','evening'] as TimeBlock[]).forEach(b => {
          const list = prev[d][b] as ScheduledItem[];
          list.forEach(item => {
            if (item.id === itemId) {
              const dur = item.activity.durationMinutes ?? 60;
              if (hasConflict(list, itemId, startMinutes, dur)) {
                // keep original if conflict
                (next[d][b] as ScheduledItem[]).push(item);
              } else {
                (next[d][b] as ScheduledItem[]).push({ ...item, startMinutes });
              }
            } else {
              (next[d][b] as ScheduledItem[]).push(item);
            }
          });
        });
      });
      return next;
    });
  };

  const timeToBlock = (start: number): TimeBlock => {
    if (start < 12*60) return 'morning';
    if (start < 17*60) return 'afternoon';
    return 'evening';
  };

  const updateItemDayAndTime = (itemId: string, day: Day, startMinutes: number) => {
    setSchedule(prev => {
      const next = createInitialSchedule();
      (['Saturday','Sunday'] as Day[]).forEach(d => {
        (['morning','afternoon','evening'] as TimeBlock[]).forEach(b => {
          const list = prev[d][b] as ScheduledItem[];
          list.forEach(item => {
            if (item.id === itemId) {
              const targetBlock = timeToBlock(startMinutes);
              const dur = item.activity.durationMinutes ?? 60;
              const targetList = prev[day][targetBlock] as ScheduledItem[];
              if (hasConflict(targetList, itemId, startMinutes, dur)) {
                (next[item.day][item.block] as ScheduledItem[]).push(item);
              } else {
                (next[day][targetBlock] as ScheduledItem[]).push({ ...item, day, block: targetBlock, startMinutes });
              }
            } else {
              (next[item.day][item.block] as ScheduledItem[]).push(item);
            }
          });
        });
      });
      return next;
    });
  };

  const removeItem = (itemId: string) => {
    setSchedule(prev => {
      const next = createInitialSchedule();
      (['Saturday','Sunday'] as Day[]).forEach(d => {
        (['morning','afternoon','evening'] as TimeBlock[]).forEach(b => {
          (next[d][b] as ScheduledItem[]) = (prev[d][b] as ScheduledItem[]).filter(item => item.id !== itemId);
        });
      });
      return next;
    });
  };

  const clear = () => setSchedule(createInitialSchedule());

  const value = useMemo(() => ({ schedule, addActivity, moveItem, updateItemMood, updateItemTime, updateItemDayAndTime, removeItem, clear }), [schedule]);

  return createElement(ScheduleContext.Provider, { value }, children);
};

export function useSchedule() {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error('useSchedule must be used within ScheduleProvider');
  return ctx;
}
