import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ScheduleProvider, useSchedule } from '../scheduleStore'
import type { Activity } from '../../types/activity'

// Mock activity for testing
const mockActivity: Activity = {
  id: 'test-activity',
  name: 'Test Activity',
  description: 'A test activity',
  category: 'entertainment',
  durationMinutes: 60,
  mood: 'happy',
  energyLevel: 3,
  icon: '🎬'
}

const mockActivity2: Activity = {
  id: 'test-activity-2',
  name: 'Test Activity 2',
  description: 'Another test activity',
  category: 'outdoor',
  durationMinutes: 120,
  mood: 'energetic',
  energyLevel: 4,
  icon: '🥾'
}

// Helper function to render hook with provider
const renderScheduleHook = () => {
  return renderHook(() => useSchedule(), {
    wrapper: ({ children }) => (
      <ScheduleProvider>{children}</ScheduleProvider>
    ),
  })
}

describe('ScheduleStore', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should initialize with empty schedule', () => {
    const { result } = renderScheduleHook()
    
    expect(result.current.schedule).toEqual({
      Saturday: {
        morning: [],
        afternoon: [],
        evening: []
      },
      Sunday: {
        morning: [],
        afternoon: [],
        evening: []
      }
    })
  })

  it('should add activity to schedule', () => {
    const { result } = renderScheduleHook()
    
    act(() => {
      result.current.addActivity(mockActivity, 'Saturday', 'morning')
    })
    
    expect(result.current.schedule.Saturday.morning).toHaveLength(1)
    expect(result.current.schedule.Saturday.morning[0].activity).toEqual(mockActivity)
    expect(result.current.schedule.Saturday.morning[0].day).toBe('Saturday')
    expect(result.current.schedule.Saturday.morning[0].block).toBe('morning')
  })

  it('should add multiple activities to different time blocks', () => {
    const { result } = renderScheduleHook()
    
    act(() => {
      result.current.addActivity(mockActivity, 'Saturday', 'morning')
      result.current.addActivity(mockActivity2, 'Saturday', 'afternoon')
    })
    
    expect(result.current.schedule.Saturday.morning).toHaveLength(1)
    expect(result.current.schedule.Saturday.afternoon).toHaveLength(1)
    expect(result.current.schedule.Saturday.evening).toHaveLength(0)
  })

  it('should move activity between time blocks', () => {
    const { result } = renderScheduleHook()
    
    act(() => {
      result.current.addActivity(mockActivity, 'Saturday', 'morning')
    })
    
    const itemId = result.current.schedule.Saturday.morning[0].id
    
    act(() => {
      result.current.moveItem(itemId, 'Saturday', 'afternoon')
    })
    
    expect(result.current.schedule.Saturday.morning).toHaveLength(0)
    expect(result.current.schedule.Saturday.afternoon).toHaveLength(1)
    expect(result.current.schedule.Saturday.afternoon[0].id).toBe(itemId)
  })

  it('should move activity between days', () => {
    const { result } = renderScheduleHook()
    
    act(() => {
      result.current.addActivity(mockActivity, 'Saturday', 'morning')
    })
    
    const itemId = result.current.schedule.Saturday.morning[0].id
    
    act(() => {
      result.current.moveItem(itemId, 'Sunday', 'evening')
    })
    
    expect(result.current.schedule.Saturday.morning).toHaveLength(0)
    expect(result.current.schedule.Sunday.evening).toHaveLength(1)
    expect(result.current.schedule.Sunday.evening[0].id).toBe(itemId)
  })

  it('should update item mood', () => {
    const { result } = renderScheduleHook()
    
    act(() => {
      result.current.addActivity(mockActivity, 'Saturday', 'morning')
    })
    
    const itemId = result.current.schedule.Saturday.morning[0].id
    
    act(() => {
      result.current.updateItemMood(itemId, 'relaxed')
    })
    
    expect(result.current.schedule.Saturday.morning[0].mood).toBe('relaxed')
  })

  it('should update item time', () => {
    const { result } = renderScheduleHook()
    
    act(() => {
      result.current.addActivity(mockActivity, 'Saturday', 'morning')
    })
    
    const itemId = result.current.schedule.Saturday.morning[0].id
    
    act(() => {
      result.current.updateItemTime(itemId, 600) // 10:00 AM
    })
    
    expect(result.current.schedule.Saturday.morning[0].startMinutes).toBe(600)
  })

  it('should update item day and time', () => {
    const { result } = renderScheduleHook()
    
    act(() => {
      result.current.addActivity(mockActivity, 'Saturday', 'morning')
    })
    
    const itemId = result.current.schedule.Saturday.morning[0].id
    
    act(() => {
      result.current.updateItemDayAndTime(itemId, 'Sunday', 900) // 3:00 PM
    })
    
    expect(result.current.schedule.Saturday.morning).toHaveLength(0)
    expect(result.current.schedule.Sunday.afternoon).toHaveLength(1)
    expect(result.current.schedule.Sunday.afternoon[0].startMinutes).toBe(900)
  })

  it('should remove item from schedule', () => {
    const { result } = renderScheduleHook()
    
    act(() => {
      result.current.addActivity(mockActivity, 'Saturday', 'morning')
      result.current.addActivity(mockActivity2, 'Saturday', 'morning')
    })
    
    const itemId = result.current.schedule.Saturday.morning[0].id
    
    act(() => {
      result.current.removeItem(itemId)
    })
    
    expect(result.current.schedule.Saturday.morning).toHaveLength(1)
    expect(result.current.schedule.Saturday.morning[0].id).not.toBe(itemId)
  })

  it('should clear entire schedule', () => {
    const { result } = renderScheduleHook()
    
    act(() => {
      result.current.addActivity(mockActivity, 'Saturday', 'morning')
      result.current.addActivity(mockActivity2, 'Sunday', 'afternoon')
    })
    
    act(() => {
      result.current.clear()
    })
    
    expect(result.current.schedule.Saturday.morning).toHaveLength(0)
    expect(result.current.schedule.Saturday.afternoon).toHaveLength(0)
    expect(result.current.schedule.Saturday.evening).toHaveLength(0)
    expect(result.current.schedule.Sunday.morning).toHaveLength(0)
    expect(result.current.schedule.Sunday.afternoon).toHaveLength(0)
    expect(result.current.schedule.Sunday.evening).toHaveLength(0)
  })

  it('should persist schedule to localStorage', () => {
    const { result } = renderScheduleHook()
    
    act(() => {
      result.current.addActivity(mockActivity, 'Saturday', 'morning')
    })
    
    // Wait for the effect to run and localStorage to be updated
    setTimeout(() => {
      const stored = localStorage.getItem('weekendly_schedule_v1')
      expect(stored).toBeTruthy()
      
      if (stored) {
        const parsed = JSON.parse(stored)
        expect(parsed.Saturday.morning).toHaveLength(1)
      }
    }, 0)
  })

  it('should load schedule from localStorage on initialization', () => {
    // Pre-populate localStorage
    const initialSchedule = {
      Saturday: {
        morning: [{ 
          id: 'test-id', 
          activity: mockActivity, 
          day: 'Saturday', 
          block: 'morning',
          startMinutes: 480
        }],
        afternoon: [],
        evening: []
      },
      Sunday: {
        morning: [],
        afternoon: [],
        evening: []
      }
    }
    
    localStorage.setItem('weekendly_schedule_v1', JSON.stringify(initialSchedule))
    
    // Create a new hook instance to test initialization
    const { result } = renderHook(() => useSchedule(), {
      wrapper: ({ children }) => (
        <ScheduleProvider>{children}</ScheduleProvider>
      ),
    })
    
    expect(result.current.schedule.Saturday.morning).toHaveLength(1)
    expect(result.current.schedule.Saturday.morning[0].activity.name).toBe('Test Activity')
  })

  it('should handle time conflicts when updating item time', () => {
    const { result } = renderScheduleHook()
    
    act(() => {
      result.current.addActivity(mockActivity, 'Saturday', 'morning')
      result.current.addActivity(mockActivity2, 'Saturday', 'morning')
    })
    
    const itemId = result.current.schedule.Saturday.morning[0].id
    const originalTime = result.current.schedule.Saturday.morning[0].startMinutes
    
    // Try to move to a conflicting time (same as second activity)
    act(() => {
      result.current.updateItemTime(itemId, 480) // 8:00 AM
    })
    
    // Should keep original time due to conflict
    expect(result.current.schedule.Saturday.morning[0].startMinutes).toBe(originalTime)
  })

  it('should throw error when useSchedule is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      renderHook(() => useSchedule())
    }).toThrow('useSchedule must be used within ScheduleProvider')
    
    consoleSpy.mockRestore()
  })
})
