import React, { useMemo } from 'react';
import { useSchedule } from '../../store/scheduleStore';
import type { Day, TimeBlock } from '../../types/schedule';

const BLOCKS: TimeBlock[] = ['morning', 'afternoon', 'evening'];
const DAYS: Day[] = ['Saturday', 'Sunday'];

export const ScheduleTimeline: React.FC = () => {
  const { schedule } = useSchedule();

  const data = useMemo(() => {
    return DAYS.map(day => ({
      day,
      blocks: BLOCKS.map(block => ({
        block,
        count: schedule[day][block].length,
        moods: schedule[day][block].map(i => i.mood).filter(Boolean) as string[],
      })),
    }));
  }, [schedule]);

  return (
    <div className="grid gap-4">
      {data.map(d => (
        <div key={d.day} className="bg-white/70 border border-gray-100 rounded-xl p-4">
          <div className="font-semibold mb-2">{d.day}</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {d.blocks.map(b => (
              <div key={b.block} className="rounded-lg border p-3 bg-white/70">
                <div className="text-xs uppercase text-gray-500 mb-1">{b.block}</div>
                <div className="text-lg font-bold">{b.count} item{b.count !== 1 ? 's' : ''}</div>
                {b.moods.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1 text-xs text-gray-600">
                    {b.moods.slice(0, 6).map((m, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-black/5 rounded-full">{m}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

