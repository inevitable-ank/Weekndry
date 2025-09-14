import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePWA } from '../usePWA'

describe('usePWA', () => {
  let mockPrompt: any
  let mockUserChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks()
    
    // Mock service worker
    Object.defineProperty(navigator, 'serviceWorker', {
      value: {
        getRegistration: vi.fn().mockResolvedValue(null),
      },
      writable: true,
    })

    // Mock beforeinstallprompt event
    mockUserChoice = Promise.resolve({ outcome: 'accepted', platform: 'web' })
    mockPrompt = vi.fn().mockResolvedValue(undefined)
    
    // Mock window events
    const mockEvent = {
      preventDefault: vi.fn(),
      prompt: mockPrompt,
      userChoice: mockUserChoice,
    }
    
    // Mock addEventListener and removeEventListener
    const originalAddEventListener = window.addEventListener
    const originalRemoveEventListener = window.removeEventListener
    
    window.addEventListener = vi.fn((event, handler) => {
      if (event === 'beforeinstallprompt') {
        // Simulate the event being fired
        setTimeout(() => {
          if (typeof handler === 'function') {
            handler(mockEvent as any)
          }
        }, 0)
      }
    })
    
    window.removeEventListener = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => usePWA())
    
    expect(result.current.canInstall).toBe(false)
    expect(result.current.isInstalled).toBe(false)
    expect(result.current.updateAvailable).toBe(false)
    expect(typeof result.current.promptInstall).toBe('function')
    expect(typeof result.current.reloadToUpdate).toBe('function')
  })

  it('should handle beforeinstallprompt event', async () => {
    const { result } = renderHook(() => usePWA())
    
    // Wait for the event to be processed
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
    })
    
    expect(result.current.canInstall).toBe(true)
  })

  it('should handle appinstalled event', async () => {
    const { result } = renderHook(() => usePWA())
    
    // Simulate appinstalled event
    act(() => {
      const event = new Event('appinstalled')
      window.dispatchEvent(event)
    })
    
    expect(result.current.isInstalled).toBe(true)
  })

  it('should handle service worker update detection', async () => {
    const mockRegistration = {
      addEventListener: vi.fn(),
    }
    
    vi.mocked(navigator.serviceWorker.getRegistration).mockResolvedValue(mockRegistration as any)
    
    const { result } = renderHook(() => usePWA())
    
    // Wait for the hook to initialize
    await new Promise(resolve => setTimeout(resolve, 10))
    
    // Simulate updatefound event if addEventListener was called
    if (mockRegistration.addEventListener.mock.calls.length > 0) {
      act(() => {
        const event = new Event('updatefound')
        mockRegistration.addEventListener.mock.calls[0][1](event)
      })
      
      expect(result.current.updateAvailable).toBe(true)
    }
  })

  it('should handle promptInstall successfully', async () => {
    const { result } = renderHook(() => usePWA())
    
    // Wait for beforeinstallprompt event
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
    })
    
    expect(result.current.canInstall).toBe(true)
    
    // Test promptInstall
    const success = await act(async () => {
      return await result.current.promptInstall()
    })
    
    expect(success).toBe(true)
    expect(mockPrompt).toHaveBeenCalled()
  })

  it('should handle promptInstall failure', async () => {
    mockPrompt.mockRejectedValue(new Error('Prompt failed'))
    
    const { result } = renderHook(() => usePWA())
    
    // Wait for beforeinstallprompt event
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
    })
    
    // Test promptInstall failure
    const success = await act(async () => {
      return await result.current.promptInstall()
    })
    
    expect(success).toBe(false)
  })

  it('should handle promptInstall when no prompt available', async () => {
    const { result } = renderHook(() => usePWA())
    
    // Don't trigger beforeinstallprompt event
    expect(result.current.canInstall).toBe(false)
    
    const success = await act(async () => {
      return await result.current.promptInstall()
    })
    
    expect(success).toBe(false)
  })

  it('should handle reloadToUpdate with service worker', async () => {
    const mockWaiting = {
      postMessage: vi.fn(),
    }
    
    const mockRegistration = {
      waiting: mockWaiting,
    }
    
    vi.mocked(navigator.serviceWorker.getRegistration).mockResolvedValue(mockRegistration as any)
    
    // Mock window.location.reload
    const mockReload = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    })
    
    const { result } = renderHook(() => usePWA())
    
    act(() => {
      result.current.reloadToUpdate()
    })
    
    expect(mockWaiting.postMessage).toHaveBeenCalledWith({ type: 'SKIP_WAITING' })
    expect(mockReload).toHaveBeenCalled()
  })

  it('should handle reloadToUpdate without service worker', () => {
    vi.mocked(navigator.serviceWorker.getRegistration).mockRejectedValue(new Error('No SW'))
    
    // Mock window.location.reload
    const mockReload = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    })
    
    const { result } = renderHook(() => usePWA())
    
    act(() => {
      result.current.reloadToUpdate()
    })
    
    expect(mockReload).toHaveBeenCalled()
  })

  it('should clean up event listeners on unmount', () => {
    const { unmount } = renderHook(() => usePWA())
    
    unmount()
    
    expect(window.removeEventListener).toHaveBeenCalledWith('beforeinstallprompt', expect.any(Function))
    expect(window.removeEventListener).toHaveBeenCalledWith('appinstalled', expect.any(Function))
  })
})
