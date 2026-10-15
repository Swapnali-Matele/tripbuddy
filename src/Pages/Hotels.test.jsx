import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Hotels from './Hotels'
import { fetchHotelsByCountry } from '../redux/slices/hotelsSlice'

const mockState = vi.hoisted(() => ({
  value: {
    favorites: { items: [] },
    hotels: { items: [], loading: false, error: null },
  },
}))

const mockDispatch = vi.hoisted(() => vi.fn())

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: (selector) => selector(mockState.value),
  }
})

describe('Hotels page', () => {
  beforeEach(() => {
    mockDispatch.mockClear()
    mockState.value = {
      favorites: { items: [] },
      hotels: { items: [], loading: false, error: null },
    }
  })

  it('renders the loading state while hotels are being fetched', () => {
    mockState.value.hotels = { items: [], loading: true, error: null }

    const { container } = render(
      <MemoryRouter>
        <Hotels />
      </MemoryRouter>
    )

    expect(screen.getByText('Explore Hotels')).toBeInTheDocument()
    expect(container.querySelectorAll('.animate-pulse').length).toBe(10)
  })

  it('renders hotel cards when hotel data is available', () => {
    mockState.value.hotels = {
      items: [
        { id: 'hotel-1', name: 'Ocean View', city: 'Lisbon', country: 'Portugal', description: 'Coastal stay', image: 'https://example.com/ocean.jpg' },
        { id: 'hotel-2', name: 'City Escape', city: 'Paris', country: 'France', description: 'Downtown stay', image: 'https://example.com/city.jpg' },
      ],
      loading: false,
      error: null,
    }

    render(
      <MemoryRouter>
        <Hotels />
      </MemoryRouter>
    )

    expect(screen.getByText('Ocean View')).toBeInTheDocument()
    expect(screen.getByText('City Escape')).toBeInTheDocument()
    expect(screen.getByText('Lisbon, Portugal')).toBeInTheDocument()
  })

  it('shows the error message and dispatches a retry thunk when the retry button is clicked', () => {
    mockState.value.hotels = { items: [], loading: false, error: 'Unable to load hotels.' }

    render(
      <MemoryRouter>
        <Hotels />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'US' } })

    expect(screen.getByText('Unable to load hotels.')).toBeInTheDocument()
    expect(mockDispatch.mock.calls.length).toBeGreaterThanOrEqual(2)
    expect(typeof mockDispatch.mock.calls[1][0]).toBe('function')

    fireEvent.click(screen.getByRole('button', { name: 'Try Again' }))
    expect(mockDispatch.mock.calls.length).toBeGreaterThan(2)
  })
})
