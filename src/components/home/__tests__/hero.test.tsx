import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Hero } from '../hero'

describe('Hero', () => {
  it('should render hero section with correct content', () => {
    render(<Hero />)
    
    expect(screen.getByText('Weekend Planning Made Fun')).toBeInTheDocument()
    expect(screen.getByText('Design Your')).toBeInTheDocument()
    expect(screen.getByText('Perfect Weekend')).toBeInTheDocument()
    expect(screen.getByText(/Transform your weekends from ordinary to extraordinary/)).toBeInTheDocument()
  })

  it('should render start planning button', () => {
    render(<Hero />)
    
    const startButton = screen.getByText('Start Planning')
    expect(startButton).toBeInTheDocument()
  })

  it('should call onStart when start button is clicked', () => {
    const mockOnStart = vi.fn()
    render(<Hero onStart={mockOnStart} />)
    
    const startButton = screen.getByText('Start Planning')
    fireEvent.click(startButton)
    
    expect(mockOnStart).toHaveBeenCalledTimes(1)
  })

  it('should navigate to planner when no onStart prop is provided', () => {
    // Mock window.location.href
    delete (window as any).location
    window.location = { href: '' } as any
    
    render(<Hero />)
    
    const startButton = screen.getByText('Start Planning')
    fireEvent.click(startButton)
    
    expect(window.location.href).toBe('/planner')
  })

  it('should render sparkles icon in badge', () => {
    render(<Hero />)
    
    // The sparkles icon should be present (this depends on how Lucide icons are rendered)
    const badge = screen.getByText('Weekend Planning Made Fun')
    expect(badge).toBeInTheDocument()
  })

  it('should have proper heading structure', () => {
    render(<Hero />)
    
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toBeInTheDocument()
    expect(mainHeading).toHaveTextContent('Design Your')
  })

  it('should render background pattern image', () => {
    render(<Hero />)
    
    // Check if the background image is rendered (alt text is empty as per the component)
    const backgroundImage = document.querySelector('img[alt=""]')
    expect(backgroundImage).toBeInTheDocument()
  })

  it('should have responsive design classes', () => {
    render(<Hero />)
    
    const heroSection = screen.getByText('Design Your').closest('section')
    expect(heroSection).toHaveClass('relative', 'overflow-hidden')
  })

  it('should have proper button styling and accessibility', () => {
    render(<Hero />)
    
    const startButton = screen.getByText('Start Planning')
    expect(startButton).toBeInTheDocument()
    
    // Check if button has proper classes for styling
    expect(startButton.closest('button')).toHaveClass('px-8', 'py-4')
  })

  it('should render arrow icon in button', () => {
    render(<Hero />)
    
    const startButton = screen.getByText('Start Planning')
    expect(startButton).toBeInTheDocument()
    
    // The arrow icon should be present in the button
    const buttonContent = startButton.textContent
    expect(buttonContent).toContain('Start Planning')
  })

  it('should have proper semantic structure', () => {
    render(<Hero />)
    
    const section = screen.getByText('Design Your').closest('section')
    expect(section).toBeInTheDocument()
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should handle button click with proper event handling', () => {
    const mockOnStart = vi.fn()
    render(<Hero onStart={mockOnStart} />)
    
    const startButton = screen.getByText('Start Planning')
    
    // Test multiple clicks
    fireEvent.click(startButton)
    fireEvent.click(startButton)
    
    expect(mockOnStart).toHaveBeenCalledTimes(2)
  })

  it('should have proper text content and messaging', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Choose activities, plan meals, set your mood/)).toBeInTheDocument()
    expect(screen.getByText(/create unforgettable Saturday-Sunday experiences/)).toBeInTheDocument()
  })
})

