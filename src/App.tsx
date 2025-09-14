// import React from 'react'
import { Layout } from './components/layout/Layout'
import { PlannerPage } from './pages/PlannerPage'
import { ScheduleProvider } from './store/scheduleStore'
import { ThemeProvider } from './store/themeStore'
import { A11yAnnouncer } from './components/common/LiveRegion'

export default function App() {
  return (
    <ThemeProvider>
      <ScheduleProvider>
        <A11yAnnouncer>
          <Layout>
            <PlannerPage />
          </Layout>
        </A11yAnnouncer>
      </ScheduleProvider>
    </ThemeProvider>
  )
}
