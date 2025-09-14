import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { exportElementToPng } from '../exportService'

// Mock html-to-image
vi.mock('html-to-image', () => ({
  toPng: vi.fn()
}))

describe('exportService', () => {
  let mockElement: HTMLElement
  let mockLink: HTMLAnchorElement

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Create mock element
    mockElement = document.createElement('div')
    mockElement.textContent = 'Test Element'
    
    // Create mock link element
    mockLink = document.createElement('a')
    mockLink.download = ''
    mockLink.href = ''
    
    // Mock document.createElement for anchor
    const originalCreateElement = document.createElement
    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') {
        return mockLink
      }
      return originalCreateElement.call(document, tagName)
    })
    
    // Mock link.click
    mockLink.click = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should export element to PNG with default filename', async () => {
    const mockDataUrl = 'data:image/png;base64,test-image-data'
    const { toPng } = await import('html-to-image')
    
    vi.mocked(toPng).mockResolvedValue(mockDataUrl)
    
    await exportElementToPng(mockElement)
    
    expect(toPng).toHaveBeenCalledWith(mockElement, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    })
    
    expect(mockLink.download).toBe('weekendly.png')
    expect(mockLink.href).toBe(mockDataUrl)
    expect(mockLink.click).toHaveBeenCalled()
  })

  it('should export element to PNG with custom filename', async () => {
    const mockDataUrl = 'data:image/png;base64,test-image-data'
    const customFileName = 'my-weekend-plan.png'
    const { toPng } = await import('html-to-image')
    
    vi.mocked(toPng).mockResolvedValue(mockDataUrl)
    
    await exportElementToPng(mockElement, customFileName)
    
    expect(toPng).toHaveBeenCalledWith(mockElement, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    })
    
    expect(mockLink.download).toBe(customFileName)
    expect(mockLink.href).toBe(mockDataUrl)
    expect(mockLink.click).toHaveBeenCalled()
  })

  it('should handle export errors gracefully', async () => {
    const { toPng } = await import('html-to-image')
    
    vi.mocked(toPng).mockRejectedValue(new Error('Export failed'))
    
    await expect(exportElementToPng(mockElement)).rejects.toThrow('Export failed')
    
    expect(toPng).toHaveBeenCalledWith(mockElement, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    })
    
    expect(mockLink.click).not.toHaveBeenCalled()
  })

  it('should use correct export options', async () => {
    const { toPng } = await import('html-to-image')
    
    vi.mocked(toPng).mockResolvedValue('data:image/png;base64,test')
    
    await exportElementToPng(mockElement)
    
    expect(toPng).toHaveBeenCalledWith(mockElement, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    })
  })

  it('should create download link with correct attributes', async () => {
    const mockDataUrl = 'data:image/png;base64,test-image-data'
    const { toPng } = await import('html-to-image')
    
    vi.mocked(toPng).mockResolvedValue(mockDataUrl)
    
    await exportElementToPng(mockElement, 'test-export.png')
    
    expect(document.createElement).toHaveBeenCalledWith('a')
    expect(mockLink.download).toBe('test-export.png')
    expect(mockLink.href).toBe(mockDataUrl)
  })

  it('should handle different file extensions', async () => {
    const mockDataUrl = 'data:image/png;base64,test-image-data'
    const { toPng } = await import('html-to-image')
    
    vi.mocked(toPng).mockResolvedValue(mockDataUrl)
    
    const testCases = [
      'weekend-plan.png',
      'my-schedule.jpg',
      'weekend-export.webp',
      'plan-without-extension'
    ]
    
    for (const filename of testCases) {
      await exportElementToPng(mockElement, filename)
      expect(mockLink.download).toBe(filename)
    }
  })

  it('should work with different element types', async () => {
    const mockDataUrl = 'data:image/png;base64,test-image-data'
    const { toPng } = await import('html-to-image')
    
    vi.mocked(toPng).mockResolvedValue(mockDataUrl)
    
    const elements = [
      document.createElement('div'),
      document.createElement('section'),
      document.createElement('article'),
      document.createElement('main')
    ]
    
    for (const element of elements) {
      await exportElementToPng(element)
      expect(toPng).toHaveBeenCalledWith(element, expect.any(Object))
    }
  })

  it('should handle empty filename', async () => {
    const mockDataUrl = 'data:image/png;base64,test-image-data'
    const { toPng } = await import('html-to-image')
    
    vi.mocked(toPng).mockResolvedValue(mockDataUrl)
    
    await exportElementToPng(mockElement, '')
    
    expect(mockLink.download).toBe('')
    expect(mockLink.href).toBe(mockDataUrl)
    expect(mockLink.click).toHaveBeenCalled()
  })
})
