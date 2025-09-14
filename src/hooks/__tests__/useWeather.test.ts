import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useWeather } from '../useWeather'

vi.mock('../../store/userStore', () => ({
  useUserStore: () => ({
    city: 'Mumbai'
  })
}))

describe('useWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    global.fetch = vi.fn()
    
    if (!navigator.geolocation) {
      Object.defineProperty(navigator, 'geolocation', {
        value: {
          getCurrentPosition: vi.fn(),
          watchPosition: vi.fn(),
          clearWatch: vi.fn(),
        },
        writable: true,
      })
    }
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return initial loading state', () => {
    const { result } = renderHook(() => useWeather())
    
    expect(result.current.loading).toBe(true)
    expect(result.current.weather).toBe(null)
    expect(result.current.error).toBe(null)
  })

  it('should handle geolocation success', async () => {
    const mockPosition = {
      coords: {
        latitude: 19.0760,
        longitude: 72.8777
      }
    }

    vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation((success) => {
      success(mockPosition as GeolocationPosition)
    })

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        current: {
          temperature_2m: 25,
          weather_code: 0
        }
      })
    } as Response)

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        locality: 'Mumbai',
        city: 'Mumbai',
        principalSubdivision: 'Maharashtra'
      })
    } as Response)

    const { result } = renderHook(() => useWeather())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.weather).toEqual({
      tempC: 25,
      condition: 'Clear',
      icon: '☀️',
      location: 'Mumbai',
      coordinates: {
        lat: 19.0760,
        lon: 72.8777
      }
    })
    expect(result.current.error).toBe(null)
  })

  it('should handle geolocation failure and use default city', async () => {
    // Mock failed geolocation
    vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation((_, error) => {
      const geolocationError = {
        code: 1,
        message: 'Geolocation failed',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
      } as GeolocationPositionError
      if (error) {
        error(geolocationError)
      }
    })

    // Mock successful weather API response for Mumbai
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        current: {
          temperature_2m: 28,
          weather_code: 1
        }
      })
    } as Response)

    // Mock successful location API response
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        locality: 'Mumbai',
        city: 'Mumbai',
        principalSubdivision: 'Maharashtra'
      })
    } as Response)

    const { result } = renderHook(() => useWeather())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.weather).toEqual({
      tempC: 28,
      condition: 'Partly cloudy',
      icon: '⛅',
      location: 'Mumbai',
      coordinates: {
        lat: 19.0760,
        lon: 72.8777
      }
    })
  })

  it('should handle API errors gracefully', async () => {
    // Mock failed geolocation
    vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation((_, error) => {
      const geolocationError = {
        code: 1,
        message: 'Geolocation failed',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
      } as GeolocationPositionError
      if (error) {
        error(geolocationError)
      }
    })

    // Mock failed weather API
    vi.mocked(fetch).mockRejectedValueOnce(new Error('API Error'))

    const { result } = renderHook(() => useWeather())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.weather).toBe(null)
    expect(result.current.error).toBe('Unable to load weather')
  })

  it('should map weather codes correctly', async () => {
    const testCases = [
      { code: 0, expected: 'Clear', icon: '☀️' },
      { code: 1, expected: 'Partly cloudy', icon: '⛅' },
      { code: 45, expected: 'Fog', icon: '🌫️' },
      { code: 61, expected: 'Rain', icon: '🌧️' },
      { code: 71, expected: 'Snow', icon: '❄️' },
      { code: 95, expected: 'Thunderstorm', icon: '⛈️' },
      { code: 999, expected: 'Unknown', icon: '🌡️' }
    ]

    for (const testCase of testCases) {
      // Mock successful geolocation
      vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation((success) => {
        success({
          coords: { latitude: 19.0760, longitude: 72.8777 }
        } as GeolocationPosition)
      })

      // Mock weather API response
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          current: {
            temperature_2m: 25,
            weather_code: testCase.code
          }
        })
      } as Response)

      // Mock location API response
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          locality: 'Mumbai'
        })
      } as Response)

      const { result } = renderHook(() => useWeather())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.weather?.condition).toBe(testCase.expected)
      expect(result.current.weather?.icon).toBe(testCase.icon)

      // Clean up for next iteration
      vi.clearAllMocks()
    }
  })
})
