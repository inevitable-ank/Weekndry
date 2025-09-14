import { describe, it, expect } from 'vitest'
import { THEMES } from '../themes'
import type { ThemeConfig, ThemeId } from '../../types/theme'

describe('Themes Data', () => {
  describe('THEMES array', () => {
    it('should contain themes', () => {
      expect(THEMES).toBeDefined()
      expect(Array.isArray(THEMES)).toBe(true)
      expect(THEMES.length).toBeGreaterThan(0)
    })

    it('should have valid theme structure', () => {
      THEMES.forEach((theme: ThemeConfig) => {
        expect(theme).toHaveProperty('id')
        expect(theme).toHaveProperty('name')
        expect(theme).toHaveProperty('bgClass')
        expect(theme).toHaveProperty('accentClass')
        expect(theme).toHaveProperty('previewEmoji')
        
        expect(typeof theme.id).toBe('string')
        expect(typeof theme.name).toBe('string')
        expect(typeof theme.bgClass).toBe('string')
        expect(typeof theme.accentClass).toBe('string')
        expect(typeof theme.previewEmoji).toBe('string')
      })
    })

    it('should have unique theme IDs', () => {
      const ids = THEMES.map(theme => theme.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have valid theme IDs', () => {
      const validIds: ThemeId[] = ['lazy', 'adventurous', 'family', 'productive']
      
      THEMES.forEach((theme: ThemeConfig) => {
        expect(validIds).toContain(theme.id)
      })
    })

    it('should have CSS classes for backgrounds', () => {
      THEMES.forEach((theme: ThemeConfig) => {
        expect(theme.bgClass).toContain('from-')
        expect(theme.bgClass).toContain('via-')
        expect(theme.bgClass).toContain('to-')
      })
    })

    it('should have CSS classes for accents', () => {
      THEMES.forEach((theme: ThemeConfig) => {
        expect(theme.accentClass).toContain('from-')
        expect(theme.accentClass).toContain('to-')
      })
    })

    it('should have emoji previews', () => {
      THEMES.forEach((theme: ThemeConfig) => {
        expect(typeof theme.previewEmoji).toBe('string')
        expect(theme.previewEmoji.length).toBeGreaterThan(0)
        expect(theme.previewEmoji.trim()).toBeTruthy()
      })
    })
  })

  describe('Theme content', () => {
    it('should have lazy weekend theme', () => {
      const lazyTheme = THEMES.find(t => t.id === 'lazy')
      expect(lazyTheme).toBeDefined()
      expect(lazyTheme?.name).toContain('Lazy')
    })

    it('should have adventurous theme', () => {
      const adventurousTheme = THEMES.find(t => t.id === 'adventurous')
      expect(adventurousTheme).toBeDefined()
      expect(adventurousTheme?.name).toContain('Adventurous')
    })

    it('should have family theme', () => {
      const familyTheme = THEMES.find(t => t.id === 'family')
      expect(familyTheme).toBeDefined()
      expect(familyTheme?.name).toContain('Family')
    })

    it('should have productive theme', () => {
      const productiveTheme = THEMES.find(t => t.id === 'productive')
      expect(productiveTheme).toBeDefined()
      expect(productiveTheme?.name).toContain('Productive')
    })
  })
})
