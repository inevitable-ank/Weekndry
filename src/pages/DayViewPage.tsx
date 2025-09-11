import React, { useMemo, useState } from 'react';
import { useSchedule } from '../store/scheduleStore';
import type { Day, TimeBlock, ScheduledItem } from '../types/schedule';
import { Card, CardContent, CardTitle, Badge } from '../components/ui';

const BLOCK_STARTS: Record<TimeBlock, number> = {
  morning: 8 * 60,
  afternoon: 13 * 60,
  evening: 18 * 60,
};

const DEFAULT_DURATION = 60;
const CONTAINER_HEIGHT = 1440; // 60px per hour

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
      const start = it.startMinutes ?? current;
      const dur = it.activity.durationMinutes ?? DEFAULT_DURATION;
      placed.push({ item: it, start, end: Math.min(start + dur, 24 * 60) });
      current = start + dur;
    });
  });
  return placed.sort((a, b) => a.start - b.start);
}

export const DayViewPage: React.FC = () => {
  const { schedule, updateItemTime, updateItemDayAndTime } = useSchedule();
  const days: Day[] = ['Saturday','Sunday'];
  const timelines = useMemo(() => Object.fromEntries(days.map(d => [d, buildTimelineForDay(d, schedule)])), [schedule]);

  const [guide, setGuide] = useState<{ y: number; label: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent, day: Day) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const minutes = Math.round((y / CONTAINER_HEIGHT) * 24 * 60);
    const hour = Math.floor(minutes / 60);
    const minute = Math.round((minutes % 60) / 15) * 15; // snap to 15min
    const finalMinutes = hour * 60 + minute;
    
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId) {
      // Find the original item to check if we're moving between days
      let originalDay: Day | null = null;
      (['Saturday','Sunday'] as Day[]).forEach(d => {
        (['morning','afternoon','evening'] as TimeBlock[]).forEach(b => {
          (schedule[d][b] as ScheduledItem[]).forEach(item => {
            if (item.id === itemId) originalDay = d;
          });
        });
      });
      
      if (originalDay && originalDay !== day) {
        // Moving between days
        updateItemDayAndTime(itemId, day, finalMinutes);
      } else {
        // Moving within same day
        updateItemTime(itemId, finalMinutes);
      }
    }
    setGuide(null);
    setIsDragging(false);
  };

  return (
    <section className="pt-10 pb-24 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Weekend Timeline (Saturday & Sunday)</h2>
        <p className="text-gray-600">A clean, hour‑by‑hour plan for both days.</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-2 pr-2">
          <div className="mb-3 h-[40px]" />
          <div className="relative" style={{ height: CONTAINER_HEIGHT }}>
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="absolute left-0 right-0 flex items-center justify-end pr-2 text-xs text-gray-500" style={{ top: (i / 24) * CONTAINER_HEIGHT }}>
                {String(i).padStart(2, '0')}:00
              </div>
            ))}
          </div>
        </div>

        {days.map((day) => (
          <div key={day} className="col-span-5">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-gray-800">{day}</h3>
              <div className="text-xs text-gray-500">Your full‑day timeline</div>
            </div>
            <div 
              className="relative rounded-xl border bg-white/70 backdrop-blur" 
              style={{ height: CONTAINER_HEIGHT }}
              onDragEnter={(e) => { 
                e.preventDefault(); 
                e.stopPropagation();
                setIsDragging(true); 
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                const y = e.clientY - rect.top;
                const minutes = Math.round((y / CONTAINER_HEIGHT) * 24 * 60);
                const hour = Math.floor(minutes / 60);
                const minute = Math.round((minutes % 60) / 15) * 15;
                setGuide({ y, label: `${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}` });
              }}
              onDragLeave={(e) => { 
                // Only clear if we're actually leaving the drop zone
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setGuide(null); 
                  setIsDragging(false); 
                }
              }}
              onDrop={(e) => handleDrop(e, day)}
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="absolute left-2 right-2 border-t border-black/5" style={{ top: ((i + 1) / 24) * CONTAINER_HEIGHT }} />
              ))}
              {/* Drag guide line & tooltip */}
              {isDragging && guide && (
                <>
                  <div className="absolute left-2 right-2 border-t-2 border-blue-400/70" style={{ top: Math.min(Math.max(0, guide.y), CONTAINER_HEIGHT-1) }} />
                  <div className="absolute -translate-y-1/2 left-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded" style={{ top: Math.min(Math.max(0, guide.y), CONTAINER_HEIGHT-1) }}>
                    {guide.label}
                  </div>
                </>
              )}
              {timelines[day].map(({ item, start, end }: any) => {
                const top = (start / (24 * 60)) * CONTAINER_HEIGHT;
                const height = Math.max(44, ((end - start) / (24 * 60)) * CONTAINER_HEIGHT);
                return (
                  <Card 
                    key={item.id} 
                    className="absolute left-2 right-2 shadow-sm overflow-hidden cursor-move" 
                    style={{ top, height }}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', item.id);
                      e.dataTransfer.effectAllowed = 'move';
                      setIsDragging(true);
                      // Add a small delay to ensure drag state is set
                      setTimeout(() => setIsDragging(true), 10);
                    }}
                    aria-label={`Move ${item.activity.name}`}
                  >
                    <CardContent className="h-full flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl" aria-hidden>{item.activity.icon ?? '⭐'}</div>
                        <div>
                          <CardTitle className="m-0 text-base">{item.activity.name}</CardTitle>
                          <div className="text-xs text-gray-500">{minutesToLabel(start)} – {minutesToLabel(end)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.mood && <Badge variant="secondary">{item.mood}</Badge>}
                        <span className="text-gray-400 select-none" aria-hidden>⋮⋮</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


