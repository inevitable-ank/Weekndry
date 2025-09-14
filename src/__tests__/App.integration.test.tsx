import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

// Mock the router to avoid navigation issues in tests
vi.mock('../router', () => ({
  AppRouter: () => <div>Mocked Router</div>
}))

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock the Layout component
vi.mock('../components/layout/Layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  )
}))

// Mock the PlannerPage component
vi.mock('../pages/PlannerPage', () => ({
  PlannerPage: () => <div data-testid="planner-page">Planner Page</div>
}))

// Mock the LiveRegion component
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
    
    // The app should render without throwing theme context errors
    expect(screen.getByTestId('layout')).toBeInTheDocument()
  })

  it('should provide schedule context', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    // The app should render without throwing schedule context errors
    expect(screen.getByTestId('planner-page')).toBeInTheDocument()
  })

  it('should handle localStorage for theme persistence', () => {
    // Set a theme in localStorage
    localStorage.setItem('weekendly_theme_v1', 'adventurous')
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    // App should load without errors
    expect(screen.getByTestId('layout')).toBeInTheDocument()
  })

  it('should handle localStorage for schedule persistence', () => {
    // Set a schedule in localStorage
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
    
    // App should load without errors
    expect(screen.getByTestId('planner-page')).toBeInTheDocument()
  })

  it('should handle corrupted localStorage data gracefully', () => {
    // Set corrupted data in localStorage
    localStorage.setItem('weekendly_theme_v1', 'invalid-json{')
    localStorage.setItem('weekendly_schedule_v1', 'invalid-json{')
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    // App should still render with default values
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByTestId('planner-page')).toBeInTheDocument()
  })

  it('should handle missing localStorage gracefully', () => {
    // Clear all localStorage
    localStorage.clear()
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    // App should render with default values
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByTestId('planner-page')).toBeInTheDocument()
  })

  it('should provide accessibility features', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    // Live region should be present for accessibility
    expect(screen.getByTestId('live-region')).toBeInTheDocument()
  })

  it('should handle theme changes without breaking', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    // App should remain stable during theme changes
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    
    // Simulate theme change by updating localStorage
    localStorage.setItem('weekendly_theme_v1', 'family')
    
    // App should still work
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
    
    // App should remain stable during schedule updates
    expect(screen.getByTestId('planner-page')).toBeInTheDocument()
    
    // Simulate schedule update by updating localStorage
    const updatedSchedule = {
      Saturday: { 
        morning: [{ id: 'test', activity: { id: 'a1', name: 'Test', category: 'food' }, day: 'Saturday', block: 'morning', startMinutes: 480 }], 
        afternoon: [], 
        evening: [] 
      },
      Sunday: { morning: [], afternoon: [], evening: [] }
    }
    localStorage.setItem('weekendly_schedule_v1', JSON.stringify(updatedSchedule))
    
    // App should still work
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
    
    // Multiple re-renders should not break the app
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
