import React, { useRef } from 'react';
import { useSchedule } from '../../store/scheduleStore';
import { DAYS, TIME_BLOCKS } from '../../types/schedule';
import { Button, Card, CardTitle } from '../ui';
import { exportElementToPng } from '../../services/exportService';

export const ShareCard: React.FC = () => {
  const { schedule } = useSchedule();
  const ref = useRef<HTMLDivElement | null>(null);

  const handleExport = async () => {
    if (ref.current) {
      await exportElementToPng(ref.current, 'Weekendly-Plan.png');
    }
  };

  return (
    <div className="space-y-3">
      <Card variant="elevated" className="p-0">
        <div ref={ref} className="p-8 bg-white rounded-2xl w-[900px] max-w-full">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold tracking-tight">My Weekend Plan</h2>
            <p className="text-gray-500">Crafted with Weekendly</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {DAYS.map(day => (
              <div key={day}>
                <CardTitle className="text-lg mb-3">{day}</CardTitle>
                <div className="space-y-3">
                  {TIME_BLOCKS.map(block => (
                    <div key={block} className="border rounded-xl p-3">
                      <div className="text-xs uppercase text-gray-500 mb-2">{block}</div>
                      <div className="space-y-2">
                        {schedule[day][block].length === 0 && (
                          <div className="text-gray-400 text-sm">—</div>
                        )}
                        {schedule[day][block].map(item => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xl" aria-hidden>{item.activity.icon ?? '⭐'}</span>
                              <span className="text-sm text-gray-800">{item.activity.name}</span>
                            </div>
                            {item.mood && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-black/5">{item.mood}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-xs text-gray-400">weekendly.app • Plan your perfect weekend</div>
        </div>
      </Card>
      <div className="text-right">
        <Button onClick={handleExport} icon="📸">Export as Image</Button>
      </div>
    </div>
  );
};

