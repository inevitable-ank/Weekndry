import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Activity } from '../types/activity';
import { Day, DAYS, ScheduleData, TimeBlock, TIME_BLOCKS, ScheduledItem } from '../types/schedule';

interface ScheduleContextValue {
  schedule: ScheduleData;
  addActivity: (activity: Activity, day: Day, block: TimeBlock) => void;
  moveItem: (itemId: string, day: Day, block: TimeBlock) => void;
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
      const item: ScheduledItem = { id, activity, day, block };
      const next = structuredClone(prev) as ScheduleData;
      next[day][block] = [...next[day][block], item];
      return next;
    });
  };

  const moveItem = (itemId: string, day: Day, block: TimeBlock) => {
    setSchedule(prev => {
      const next = createInitialSchedule();
      // flatten and reassign
      (DAYS as Day[]).forEach(d => {
        (TIME_BLOCKS as TimeBlock[]).forEach(b => {
          prev[d][b].forEach(item => {
            if (item.id === itemId) {
              next[day][block].push({ ...item, day, block });
            } else {
              next[item.day][item.block].push(item);
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
      (DAYS as Day[]).forEach(d => {
        (TIME_BLOCKS as TimeBlock[]).forEach(b => {
          next[d][b] = prev[d][b].filter(item => item.id !== itemId);
        });
      });
      return next;
    });
  };

  const clear = () => setSchedule(createInitialSchedule());

  const value = useMemo(() => ({ schedule, addActivity, moveItem, removeItem, clear }), [schedule]);

  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>;
};

export function useSchedule() {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error('useSchedule must be used within ScheduleProvider');
  return ctx;
}
