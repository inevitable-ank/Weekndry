import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ScheduleProvider } from './store/scheduleStore'
import { ThemeProvider } from './store/themeStore'
import { A11yAnnouncer } from './components/common/LiveRegion'
import { AppRouter } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ScheduleProvider>
        <A11yAnnouncer>
          <AppRouter />
        </A11yAnnouncer>
      </ScheduleProvider>
    </ThemeProvider>
  </StrictMode>,
)
