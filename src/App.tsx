import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Badge, 
  ActivityBadge, 
  Modal, 
  ModalContent, 
  ModalFooter,
  Input
} from './components/ui'
import { ActivityBrowser } from './components/activity/ActivityBrowser'
import { ACTIVITIES } from './data/activities'
import { WeekendSchedule } from './components/schedule/WeekendSchedule'
import { ScheduleProvider, useSchedule } from './store/scheduleStore'
import { Day, TimeBlock } from './types/schedule'
import { ThemeProvider } from './store/themeStore'
import { ThemeSelector } from './components/theme/ThemeSelector'
import { ShareCard } from './components/share/ShareCard'
import { A11yAnnouncer } from './components/common/LiveRegion'

function Planner() {
  const [count, setCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Day>('Saturday')
  const [selectedBlock, setSelectedBlock] = useState<TimeBlock>('morning')
  const { addActivity } = useSchedule()

  return (
    <div className="min-h-screen flex flex-col items-stretch">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={viteLogo} className="h-8 w-8" alt="Vite logo" />
              <img src={reactLogo} className="h-8 w-8 animate-spin-slow" alt="React logo" />
              <h1 className="text-2xl font-extrabold weekendly-text">Weekendly</h1>
            </div>
            <ThemeSelector />
          </div>
        </div>
      </header>

      <main className="flex-1 px-6">
        {/* Hero */}
        <section className="max-w-6xl mx-auto text-center pt-12 pb-8">
          <h2 className="text-4xl md:text-5xl font-bold weekendly-text mb-3">Plan your perfect weekend</h2>
          <p className="text-gray-600">Browse activities, build your schedule, set your vibe, and share it.</p>
        </section>

        {/* Divider */}
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

        {/* Divider */}
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

        {/* Divider */}
        <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-black/10 to-transparent my-12" />

        {/* Share / Export */}
        <section className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Share</h3>
          <ShareCard />
        </section>
      </main>

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
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ScheduleProvider>
        <A11yAnnouncer>
          <Planner />
        </A11yAnnouncer>
      </ScheduleProvider>
    </ThemeProvider>
  )
}
