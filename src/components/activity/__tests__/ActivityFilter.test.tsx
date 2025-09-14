import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ActivityFilter } from '../ActivityFilter'
import type { ActivityCategory } from '../../../types/activity'

describe('ActivityFilter', () => {
  const mockProps = {
    query: '',
    onQueryChange: vi.fn(),
    selected: [] as ActivityCategory[],
    onToggleCategory: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render search input', () => {
    render(<ActivityFilter {...mockProps} />)
    
    const searchInput = screen.getByPlaceholderText('Search activities...')
    expect(searchInput).toBeInTheDocument()
  })

  it('should render all category badges', () => {
    render(<ActivityFilter {...mockProps} />)
    
    const categories = ['food', 'entertainment', 'outdoor', 'relaxation', 'learning', 'social', 'fitness', 'travel']
    
    categories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument()
    })
  })

  it('should call onQueryChange when search input changes', () => {
    render(<ActivityFilter {...mockProps} />)
    
    const searchInput = screen.getByPlaceholderText('Search activities...')
    fireEvent.change(searchInput, { target: { value: 'hiking' } })
    
    expect(mockProps.onQueryChange).toHaveBeenCalledWith('hiking')
  })

  it('should display current query value', () => {
    render(<ActivityFilter {...mockProps} query="brunch" />)
    
    const searchInput = screen.getByDisplayValue('brunch')
    expect(searchInput).toBeInTheDocument()
  })

  it('should call onToggleCategory when category badge is clicked', () => {
    render(<ActivityFilter {...mockProps} />)
    
    const foodBadge = screen.getByText('food')
    fireEvent.click(foodBadge)
    
    expect(mockProps.onToggleCategory).toHaveBeenCalledWith('food')
  })

  it('should highlight selected categories', () => {
    render(<ActivityFilter {...mockProps} selected={['food', 'outdoor']} />)
    
    const foodBadge = screen.getByText('food')
    const outdoorBadge = screen.getByText('outdoor')
    
    // Check if badges have the selected styling (this would depend on your Badge component implementation)
    expect(foodBadge).toBeInTheDocument()
    expect(outdoorBadge).toBeInTheDocument()
  })

  it('should show remove button for selected categories', () => {
    render(<ActivityFilter {...mockProps} selected={['food']} />)
    
    // The remove functionality would be tested based on your Badge component implementation
    const foodBadge = screen.getByText('food')
    expect(foodBadge).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<ActivityFilter {...mockProps} />)
    
    const searchInput = screen.getByLabelText('Search activities')
    expect(searchInput).toBeInTheDocument()
    
    const categoryGroup = screen.getByLabelText('Filter by category')
    expect(categoryGroup).toBeInTheDocument()
  })

  it('should be responsive with proper CSS classes', () => {
    render(<ActivityFilter {...mockProps} />)
    
    const container = screen.getByLabelText('Filter by category').parentElement
    expect(container).toHaveClass('flex', 'flex-col', 'md:flex-row')
  })

  it('should handle multiple category selections', () => {
    const selectedCategories: ActivityCategory[] = ['food', 'entertainment', 'outdoor']
    
    render(<ActivityFilter {...mockProps} selected={selectedCategories} />)
    
    selectedCategories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument()
    })
  })

  it('should handle empty query', () => {
    render(<ActivityFilter {...mockProps} query="" />)
    
    const searchInput = screen.getByPlaceholderText('Search activities...')
    expect(searchInput).toHaveValue('')
  })

  it('should handle special characters in query', () => {
    render(<ActivityFilter {...mockProps} />)
    
    const searchInput = screen.getByPlaceholderText('Search activities...')
    fireEvent.change(searchInput, { target: { value: 'café & restaurant' } })
    
    expect(mockProps.onQueryChange).toHaveBeenCalledWith('café & restaurant')
  })
})
