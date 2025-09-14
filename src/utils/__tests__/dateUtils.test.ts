import { describe, it, expect } from 'vitest'
import { isWeekend, nextSaturday, addDays } from '../dateUtils'

describe('dateUtils', () => {
  describe('isWeekend', () => {
    it('should return true for Saturday', () => {
      const saturday = new Date('2024-01-06') // Saturday
      expect(isWeekend(saturday)).toBe(true)
    })

    it('should return true for Sunday', () => {
      const sunday = new Date('2024-01-07') // Sunday
      expect(isWeekend(sunday)).toBe(true)
    })

    it('should return false for Monday', () => {
      const monday = new Date('2024-01-01') // Monday
      expect(isWeekend(monday)).toBe(false)
    })

    it('should return false for Friday', () => {
      const friday = new Date('2024-01-05') // Friday
      expect(isWeekend(friday)).toBe(false)
    })
  })

  describe('nextSaturday', () => {
    it('should return the same date if today is Saturday', () => {
      const saturday = new Date('2024-01-06') // Saturday
      const result = nextSaturday(saturday)
      expect(result.getDay()).toBe(6) // Saturday
    })

    it('should return next Saturday if today is Sunday', () => {
      const sunday = new Date('2024-01-07') // Sunday
      const result = nextSaturday(sunday)
      expect(result.getDay()).toBe(6) // Saturday
      expect(result.getDate()).toBe(13) // Next Saturday
    })

    it('should return next Saturday if today is Monday', () => {
      const monday = new Date('2024-01-01') // Monday
      const result = nextSaturday(monday)
      expect(result.getDay()).toBe(6) // Saturday
      expect(result.getDate()).toBe(6) // Next Saturday
    })
  })

  describe('addDays', () => {
    it('should add positive days correctly', () => {
      const date = new Date('2024-01-01')
      const result = addDays(date, 5)
      expect(result.getDate()).toBe(6)
    })

    it('should subtract days when negative number is provided', () => {
      const date = new Date('2024-01-10')
      const result = addDays(date, -3)
      expect(result.getDate()).toBe(7)
    })

    it('should not mutate the original date', () => {
      const date = new Date('2024-01-01')
      const originalDate = new Date(date)
      addDays(date, 5)
      expect(date.getTime()).toBe(originalDate.getTime())
    })
  })
})
