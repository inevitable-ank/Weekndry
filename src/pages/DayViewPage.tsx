import React, { useMemo } from 'react';
import { useSchedule } from '../store/scheduleStore';
import type { Day, TimeBlock, ScheduledItem } from '../types/schedule';
import { Card, CardContent, CardTitle, Badge } from '../components/ui';

const BLOCK_STARTS: Record<TimeBlock, number> = {
  morning: 8 * 60, // 08:00
  afternoon: 13 * 60, // 13:00
  evening: 18 * 60, // 18:00
};

const DEFAULT_DURATION = 60; // minutes
const CONTAINER_HEIGHT = 1440; // 60px per hour x 24h

function minutesToLabel(total: number): string {
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function buildTimelineForDay(day: Day, data: any) {
  const blocks: TimeBlock[] = ['morning','afternoon','evening'];
  const placed: Array<{ item: ScheduledItem; start: number; end: number }> = [];
  blocks.forEach((block) => {
    let current = BLOCK_STARTS[block];
    (data[day][block] as ScheduledItem[]).forEach((it: ScheduledItem) => {
      const dur = it.activity.durationMinutes ?? DEFAULT_DURATION;
      placed.push({ item: it, start: current, end: Math.min(current + dur, 24 * 60) });
      current += dur;
    });
  });
  return placed.sort((a, b) => a.start - b.start);
}

export const DayViewPage: React.FC = () => {
  const { schedule } = useSchedule();
  const days: Day[] = ['Saturday','Sunday'];
  const timelines = useMemo(() => Object.fromEntries(days.map(d => [d, buildTimelineForDay(d, schedule)])), [schedule]);

  return (
    <section className="max-w-6xl mx-auto pt-10 pb-24 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Day View (24‑hour)</h2>
        <p className="text-gray-600">A clean, hour‑by‑hour plan for both days.</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Time ruler */}
        <div className="col-span-2 pr-2">
          <div className="relative" style={{ height: CONTAINER_HEIGHT }}>
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="absolute left-0 right-0 flex items-center justify-end pr-2 text-xs text-gray-500" style={{ top: (i / 24) * CONTAINER_HEIGHT }}>
                {String(i).padStart(2, '0')}:00
              </div>
            ))}
          </div>
        </div>

        {/* Saturday and Sunday columns */}
        {days.map((day) => (
          <div key={day} className="col-span-5">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-gray-800">{day}</h3>
              <div className="text-xs text-gray-500">Your full‑day timeline</div>
            </div>
            <div className="relative rounded-xl border bg-white/70 backdrop-blur p-2">
              {/* hour grid lines */}
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="absolute left-2 right-2 border-t border-black/5" style={{ top: ((i + 1) / 24) * CONTAINER_HEIGHT }} />
              ))}
              {/* items */}
              <div className="relative" style={{ height: CONTAINER_HEIGHT }}>
                {timelines[day].map(({ item, start, end }: any) => {
                  const top = (start / (24 * 60)) * CONTAINER_HEIGHT;
                  const height = Math.max(44, ((end - start) / (24 * 60)) * CONTAINER_HEIGHT);
                  return (
                    <Card key={item.id} className="absolute left-2 right-2 shadow-sm overflow-hidden" style={{ top, height }}>
                      <CardContent className="h-full flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="text-2xl" aria-hidden>{item.activity.icon ?? '⭐'}</div>
                          <div>
                            <CardTitle className="m-0 text-base">{item.activity.name}</CardTitle>
                            <div className="text-xs text-gray-500">{minutesToLabel(start)} – {minutesToLabel(end)}</div>
                          </div>
                        </div>
                        {item.mood && <Badge variant="secondary">{item.mood}</Badge>}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


