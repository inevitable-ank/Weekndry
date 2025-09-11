import type { Activity } from './activity';
import type { ActivityMood } from './activity';

export type Day = 'Saturday' | 'Sunday';
export const DAYS: Day[] = ['Saturday', 'Sunday'];

export type TimeBlock = 'morning' | 'afternoon' | 'evening';
export const TIME_BLOCKS: TimeBlock[] = ['morning', 'afternoon', 'evening'];

export interface ScheduledItem {
  id: string; // unique id in schedule
  activity: Activity;
  day: Day;
  block: TimeBlock;
  mood?: ActivityMood; // user-assigned mood for this instance
  notes?: string;
}

export interface ScheduleData {
  Saturday: Record<TimeBlock, ScheduledItem[]>;
  Sunday: Record<TimeBlock, ScheduledItem[]>;
}
