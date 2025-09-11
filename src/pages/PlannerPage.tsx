import React, { useState } from 'react';
import { Button, Modal, ModalContent, ModalFooter } from '../components/ui';
import { ActivityBrowser } from '../components/activity/ActivityBrowser';
import { ACTIVITIES } from '../data/activities';
import { WeekendSchedule } from '../components/schedule/WeekendSchedule';
import { useSchedule } from '../store/scheduleStore';
import type { Day, TimeBlock } from '../types/schedule';

export const PlannerPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Day>('Saturday');
  const [selectedBlock, setSelectedBlock] = useState<TimeBlock>('morning');
  const { addActivity } = useSchedule();

  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto text-center pt-12 pb-8">
        <h2 className="text-4xl md:text-5xl font-bold weekendly-text mb-3">Plan your perfect weekend</h2>
        <p className="text-gray-600">Browse activities, build your schedule, set your vibe, and share it.</p>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-black/10 to-transparent my-8" />

      {/* Activity Section */}
      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Activities</h3>
          <Button variant="secondary" onClick={() => setIsModalOpen(true)} icon="➕">
            Add to Schedule
          </Button>
        </div>
        <ActivityBrowser
          activities={ACTIVITIES}
          onSelect={() => setIsModalOpen(true)}
        />
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-black/10 to-transparent my-12" />

      {/* Schedule Section */}
      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Weekend Schedule</h3>
          <div className="flex gap-2">
            <select
              className="border rounded-lg px-3 py-2"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value as Day)}
              aria-label="Select day"
            >
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
            <select
              className="border rounded-lg px-3 py-2"
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value as TimeBlock)}
              aria-label="Select time block"
            >
              <option>morning</option>
              <option>afternoon</option>
              <option>evening</option>
            </select>
          </div>
        </div>
        <WeekendSchedule />
      </section>

      {/* Add to schedule modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Add Activity to Schedule"
        size="xl"
      >
        <ModalContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Choose a day and time, then click an activity.</p>
            <div className="flex gap-2">
              <select
                className="border rounded-lg px-3 py-2"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value as Day)}
              >
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
              <select
                className="border rounded-lg px-3 py-2"
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value as TimeBlock)}
              >
                <option>morning</option>
                <option>afternoon</option>
                <option>evening</option>
              </select>
            </div>
            <ActivityBrowser
              activities={ACTIVITIES}
              onSelect={(a) => {
                addActivity(a, selectedDay, selectedBlock)
                setIsModalOpen(false)
              }}
            />
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
