import { describe, it, expect } from 'vitest'
import { ACTIVITIES } from '../activities'
import type { Activity, ActivityCategory, ActivityMood } from '../../types/activity'

describe('Activities Data', () => {
  describe('ACTIVITIES array', () => {
    it('should contain activities', () => {
      expect(ACTIVITIES).toBeDefined()
      expect(Array.isArray(ACTIVITIES)).toBe(true)
      expect(ACTIVITIES.length).toBeGreaterThan(0)
    })

    it('should have valid activity structure', () => {
      ACTIVITIES.forEach((activity: Activity) => {
        expect(activity).toHaveProperty('id')
        expect(activity).toHaveProperty('name')
        expect(activity).toHaveProperty('category')
        expect(typeof activity.id).toBe('string')
        expect(typeof activity.name).toBe('string')
        expect(typeof activity.category).toBe('string')
      })
    })

    it('should have valid categories', () => {
      const validCategories: ActivityCategory[] = [
        'food', 'entertainment', 'outdoor', 'relaxation', 
        'learning', 'social', 'fitness', 'travel'
      ]
      
      ACTIVITIES.forEach((activity: Activity) => {
        expect(validCategories).toContain(activity.category)
      })
    })

    it('should have valid moods when specified', () => {
      const validMoods: ActivityMood[] = [
        'happy', 'relaxed', 'energetic', 'creative', 'social', 'calm'
      ]
      
      ACTIVITIES.forEach((activity: Activity) => {
        if (activity.mood) {
          expect(validMoods).toContain(activity.mood)
        }
      })
    })

    it('should have valid energy levels when specified', () => {
      ACTIVITIES.forEach((activity: Activity) => {
        if (activity.energyLevel) {
          expect(activity.energyLevel).toBeGreaterThanOrEqual(1)
          expect(activity.energyLevel).toBeLessThanOrEqual(5)
        }
      })
    })

    it('should have valid duration when specified', () => {
      ACTIVITIES.forEach((activity: Activity) => {
        if (activity.durationMinutes) {
          expect(activity.durationMinutes).toBeGreaterThan(0)
        }
      })
    })
  })

  describe('Activity distribution', () => {
    it('should have activities across different categories', () => {
      const categories = new Set(ACTIVITIES.map(a => a.category))
      expect(categories.size).toBeGreaterThan(1)
    })

    it('should have activities with different moods', () => {
      const moods = new Set(ACTIVITIES.map(a => a.mood).filter(Boolean))
      expect(moods.size).toBeGreaterThan(1)
    })

    it('should have activities with different energy levels', () => {
      const energyLevels = new Set(ACTIVITIES.map(a => a.energyLevel).filter(Boolean))
      expect(energyLevels.size).toBeGreaterThan(1)
    })
  })
})

