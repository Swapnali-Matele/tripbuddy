import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import About from './About'

describe('About page FAQ', () => {
  it('expands and collapses a FAQ item', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    )

    const button = screen.getByRole('button', { name: /what is tripbuddy/i })

    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/TripBuddy helps travelers discover/i)).toBeInTheDocument()

    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText(/TripBuddy helps travelers discover/i)).not.toBeInTheDocument()

    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/TripBuddy helps travelers discover/i)).toBeInTheDocument()
  })
})
