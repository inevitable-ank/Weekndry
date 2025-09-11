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

function Planner() {
  const [count, setCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Day>('Saturday')
  const [selectedBlock, setSelectedBlock] = useState<TimeBlock>('morning')
  const { addActivity } = useSchedule()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center space-x-8 mb-8">
          <a href="https://vite.dev" target="_blank" className="group">
            <img 
              src={viteLogo} 
              className="h-24 w-24 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" 
              alt="Vite logo" 
            />
          </a>
          <a href="https://react.dev" target="_blank" className="group">
            <img 
              src={reactLogo} 
              className="h-24 w-24 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12 animate-spin-slow" 
              alt="React logo" 
            />
          </a>
        </div>
        
        <h1 className="text-6xl font-bold weekendly-text mb-4">
          Weekendly
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Your Perfect Weekend Planner
        </p>
        <div className="flex justify-center">
          <ThemeSelector />
        </div>
      </div>

      {/* Activity Section */}
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Activities</h2>
          <Button variant="secondary" onClick={() => setIsModalOpen(true)} icon="➕">
            Add to Schedule
          </Button>
        </div>
        <ActivityBrowser
          activities={ACTIVITIES}
          onSelect={() => setIsModalOpen(true)}
        />
      </div>

      {/* Schedule Section */}
      <div className="w-full max-w-5xl mt-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Weekend Schedule</h2>
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
        </div>
        <WeekendSchedule />
      </div>

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

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-400 text-sm">
          Beautiful custom components powered by Tailwind CSS
        </p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ScheduleProvider>
        <Planner />
      </ScheduleProvider>
    </ThemeProvider>
  )
}
