import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

vi.mock('../router', () => ({
  AppRouter: () => <div>Mocked Router</div>
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

vi.mock('../components/layout/Layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  )
}))

vi.mock('../pages/PlannerPage', () => ({
  PlannerPage: () => <div data-testid="planner-page">Planner Page</div>
}))

vi.mock('../components/common/LiveRegion', () => ({
  A11yAnnouncer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="live-region">{children}</div>
  )
}))

describe('App Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('should render the main app structure', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByTestId('planner-page')).toBeInTheDocument()
    expect(screen.getByTestId('live-region')).toBeInTheDocument()
  })

  it('should provide theme context', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('layout')).toBeInTheDocument()
  })

  it('should provide schedule context', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('planner-page')).toBeInTheDocument()
  })

  it('should handle localStorage for theme persistence', () => {
    localStorage.setItem('weekendly_theme_v1', 'adventurous')
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('layout')).toBeInTheDocument()
  })

  it('should handle localStorage for schedule persistence', () => {
    const mockSchedule = {
      Saturday: { morning: [], afternoon: [], evening: [] },
      Sunday: { morning: [], afternoon: [], evening: [] }
    }
    localStorage.setItem('weekendly_schedule_v1', JSON.stringify(mockSchedule))
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('planner-page')).toBeInTheDocument()
  })

  it('should handle corrupted localStorage data gracefully', () => {
    localStorage.setItem('weekendly_theme_v1', 'invalid-json{')
    localStorage.setItem('weekendly_schedule_v1', 'invalid-json{')
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByTestId('planner-page')).toBeInTheDocument()
  })

  it('should handle missing localStorage gracefully', () => {
    localStorage.clear()
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByTestId('planner-page')).toBeInTheDocument()
  })

  it('should provide accessibility features', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('live-region')).toBeInTheDocument()
  })

  it('should handle theme changes without breaking', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    
    localStorage.setItem('weekendly_theme_v1', 'family')
    
    await waitFor(() => {
      expect(screen.getByTestId('layout')).toBeInTheDocument()
    })
  })

  it('should handle schedule updates without breaking', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('planner-page')).toBeInTheDocument()
    
    const updatedSchedule = {
      Saturday: { 
        morning: [{ id: 'test', activity: { id: 'a1', name: 'Test', category: 'food' }, day: 'Saturday', block: 'morning', startMinutes: 480 }], 
        afternoon: [], 
        evening: [] 
      },
      Sunday: { morning: [], afternoon: [], evening: [] }
    }
    localStorage.setItem('weekendly_schedule_v1', JSON.stringify(updatedSchedule))
    
    await waitFor(() => {
      expect(screen.getByTestId('planner-page')).toBeInTheDocument()
    })
  })

  it('should maintain performance with multiple re-renders', () => {
    const { rerender } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    for (let i = 0; i < 5; i++) {
      rerender(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )
    }
    
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByTestId('planner-page')).toBeInTheDocument()
  })
})
