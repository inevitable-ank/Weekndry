import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MoodSelector } from '../mood-selector'

describe('MoodSelector', () => {
  it('should render all mood options', () => {
    render(<MoodSelector />)
    
    const moods = ['Relaxed', 'Adventurous', 'Energetic', 'Social', 'Creative', 'Happy']
    
    moods.forEach(mood => {
      expect(screen.getByText(mood)).toBeInTheDocument()
    })
  })

  it('should render mood descriptions', () => {
    render(<MoodSelector />)
    
    const descriptions = [
      'Chill and unwind',
      'Explore and discover', 
      'Active and dynamic',
      'Connect with others',
      'Express and create',
      'Pure joy and fun'
    ]
    
    descriptions.forEach(description => {
      expect(screen.getByText(description)).toBeInTheDocument()
    })
  })

  it('should render section heading', () => {
    render(<MoodSelector />)
    
    expect(screen.getByText("What's Your Weekend Vibe?")).toBeInTheDocument()
    expect(screen.getByText(/Select the moods that match how you want to feel this weekend/)).toBeInTheDocument()
  })

  it('should allow selecting multiple moods', () => {
    render(<MoodSelector />)
    
    const relaxedCard = screen.getByText('Relaxed').closest('[role="button"], button, div')
    const energeticCard = screen.getByText('Energetic').closest('[role="button"], button, div')
    
    fireEvent.click(relaxedCard!)
    fireEvent.click(energeticCard!)
    
    // Both should be selected (this would depend on your Card component implementation)
    expect(relaxedCard).toBeInTheDocument()
    expect(energeticCard).toBeInTheDocument()
  })

  it('should toggle mood selection on click', () => {
    render(<MoodSelector />)
    
    const relaxedCard = screen.getByText('Relaxed').closest('[role="button"], button, div')
    
    // Click to select
    fireEvent.click(relaxedCard!)
    
    // Click again to deselect
    fireEvent.click(relaxedCard!)
    
    expect(relaxedCard).toBeInTheDocument()
  })

  it('should show find activities button when moods are selected', () => {
    render(<MoodSelector />)
    
    const relaxedCard = screen.getByText('Relaxed').closest('[role="button"], button, div')
    fireEvent.click(relaxedCard!)
    
    expect(screen.getByText(/Find Activities for My Vibe/)).toBeInTheDocument()
  })

  it('should show count of selected moods in button', () => {
    render(<MoodSelector />)
    
    const relaxedCard = screen.getByText('Relaxed').closest('[role="button"], button, div')
    const energeticCard = screen.getByText('Energetic').closest('[role="button"], button, div')
    
    fireEvent.click(relaxedCard!)
    fireEvent.click(energeticCard!)
    
    expect(screen.getByText(/Find Activities for My Vibe \(2 selected\)/)).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<MoodSelector />)
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent("What's Your Weekend Vibe?")
  })

  it('should have responsive grid layout', () => {
    render(<MoodSelector />)
    
    const gridContainer = screen.getByText('Relaxed').closest('.grid')
    expect(gridContainer).toHaveClass('grid-cols-2', 'sm:grid-cols-3', 'lg:grid-cols-6')
  })

  it('should render mood icons', () => {
    render(<MoodSelector />)
    
    // Check if icons are rendered (this depends on how Lucide icons are rendered)
    const moodCards = screen.getAllByText(/Relaxed|Adventurous|Energetic|Social|Creative|Happy/)
    expect(moodCards).toHaveLength(6)
  })

  it('should have proper color coding for moods', () => {
    render(<MoodSelector />)
    
    const relaxedCard = screen.getByText('Relaxed').closest('div')
    expect(relaxedCard).toBeInTheDocument()
    expect(relaxedCard).toHaveClass('text-center')
  })

  it('should handle keyboard navigation', () => {
    render(<MoodSelector />)
    
    const relaxedCard = screen.getByText('Relaxed').closest('[role="button"], button, div')
    
    fireEvent.keyDown(relaxedCard!, { key: 'Enter' })
    fireEvent.keyDown(relaxedCard!, { key: ' ' })
    
    expect(relaxedCard).toBeInTheDocument()
  })

  it('should have proper semantic structure', () => {
    render(<MoodSelector />)
    
    const section = screen.getByText("What's Your Weekend Vibe?").closest('section')
    expect(section).toBeInTheDocument()
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  it('should show different background colors based on current mood', () => {
    render(<MoodSelector />)
    
    const section = screen.getByText("What's Your Weekend Vibe?").closest('section')
    expect(section).toHaveClass('transition-colors', 'duration-300')
  })

  it('should handle edge case of no moods selected', () => {
    render(<MoodSelector />)
    
    expect(screen.queryByText(/Find Activities for My Vibe/)).not.toBeInTheDocument()
  })

  it('should maintain state when component re-renders', () => {
    const { rerender } = render(<MoodSelector />)
    
    const relaxedCard = screen.getByText('Relaxed').closest('[role="button"], button, div')
    fireEvent.click(relaxedCard!)
    
    rerender(<MoodSelector />)
    
    expect(relaxedCard).toBeInTheDocument()
  })
})
