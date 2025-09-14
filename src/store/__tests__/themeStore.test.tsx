import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../themeStore'

const renderThemeHook = () => {
  return renderHook(() => useTheme(), {
    wrapper: ({ children }) => (
      <ThemeProvider>{children}</ThemeProvider>
    ),
  })
}

describe('ThemeStore', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    
    Object.defineProperty(document.body, 'classList', {
      value: {
        add: vi.fn(),
        remove: vi.fn(),
        contains: vi.fn(),
      },
      writable: true,
    })
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should initialize with default theme', () => {
    const { result } = renderThemeHook()
    
    expect(result.current.theme.id).toBe('lazy')
    expect(result.current.theme.name).toBe('Lazy Weekend')
    expect(result.current.themes).toHaveLength(4)
  })

  it('should load theme from localStorage on initialization', () => {
    localStorage.setItem('weekendly_theme_v1', 'adventurous')
    
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      ),
    })
    
    expect(result.current.theme.id).toBe('adventurous')
    expect(result.current.theme.name).toBe('Adventurous')
  })

  it('should change theme when setTheme is called', () => {
    const { result } = renderThemeHook()
    
    act(() => {
      result.current.setTheme('family')
    })
    
    expect(result.current.theme.id).toBe('family')
    expect(result.current.theme.name).toBe('Family Time')
  })

  it('should persist theme to localStorage when changed', () => {
    const { result } = renderThemeHook()
    
    act(() => {
      result.current.setTheme('productive')
    })
    
    setTimeout(() => {
      const stored = localStorage.getItem('weekendly_theme_v1')
      expect(stored).toBe('productive')
    }, 0)
  })

  it('should apply theme classes to document body', () => {
    const { result } = renderThemeHook()
    
    act(() => {
      result.current.setTheme('adventurous')
    })
    
    expect(document.body.classList.add).toHaveBeenCalledWith('bg-gradient-to-br')
    expect(document.body.classList.add).toHaveBeenCalledWith('from-emerald-200')
    expect(document.body.classList.add).toHaveBeenCalledWith('via-teal-200')
    expect(document.body.classList.add).toHaveBeenCalledWith('to-cyan-200')
  })

  it('should clear body classes before applying new theme', () => {
    const { result } = renderThemeHook()
    
    act(() => {
      result.current.setTheme('lazy')
    })
    
    expect(document.body.className).toBe('')
  })

  it('should provide all available themes', () => {
    const { result } = renderThemeHook()
    
    expect(result.current.themes).toHaveLength(4)
    expect(result.current.themes.map(t => t.id)).toEqual([
      'lazy',
      'adventurous', 
      'family',
      'productive'
    ])
  })

  it('should handle invalid theme ID gracefully', () => {
    const { result } = renderThemeHook()
    
    act(() => {
      result.current.setTheme('invalid' as any)
    })
    
    expect(result.current.theme.id).toBe('lazy')
  })

  it('should handle localStorage errors gracefully', () => {
    const originalGetItem = localStorage.getItem
    localStorage.getItem = vi.fn(() => {
      throw new Error('localStorage error')
    })
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    const { result } = renderThemeHook()
    
    expect(result.current.theme.id).toBe('lazy')
    
    localStorage.getItem = originalGetItem
    consoleSpy.mockRestore()
  })

  it('should handle localStorage setItem errors gracefully', () => {
    const originalSetItem = localStorage.setItem
    localStorage.setItem = vi.fn(() => {
      throw new Error('localStorage error')
    })
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    const { result } = renderThemeHook()
    
    expect(() => {
      act(() => {
        result.current.setTheme('family')
      })
    }).not.toThrow()
    
    localStorage.setItem = originalSetItem
    consoleSpy.mockRestore()
  })

  it('should throw error when useTheme is used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      renderHook(() => useTheme())
    }).toThrow('useTheme must be used within ThemeProvider')
    
    consoleSpy.mockRestore()
  })

  it('should have correct theme properties', () => {
    const { result } = renderThemeHook()
    
    result.current.themes.forEach(theme => {
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

  it('should cycle through all themes correctly', () => {
    const { result } = renderThemeHook()
    
    const themeIds = ['lazy', 'adventurous', 'family', 'productive']
    
    themeIds.forEach(themeId => {
      act(() => {
        result.current.setTheme(themeId as any)
      })
      
      expect(result.current.theme.id).toBe(themeId)
    })
  })
})
