import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

describe('Footer newsletter', () => {
  it('rejects an empty email input', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/email address/i)
    const button = screen.getByRole('button', { name: /subscribe/i })

    fireEvent.click(button)

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
    expect(screen.queryByText(/thanks for subscribing/i)).not.toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('rejects an invalid email format', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/email address/i)
    const button = screen.getByRole('button', { name: /subscribe/i })

    fireEvent.change(input, { target: { value: 'travelers@tripbuddy' } })
    fireEvent.click(button)

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
    expect(screen.queryByText(/thanks for subscribing/i)).not.toBeInTheDocument()
  })

  it('accepts a valid email and shows the success state', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/email address/i)
    const button = screen.getByRole('button', { name: /subscribe/i })

    fireEvent.change(input, { target: { value: 'traveler@example.com' } })
    fireEvent.click(button)

    expect(screen.getByText(/thanks for subscribing/i)).toBeInTheDocument()
    expect(input).toHaveValue('')
    expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument()
  })
})
