import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { vi } from 'vitest'
import HotelDetail from './HotelDetail'
import favoritesReducer from '../redux/slices/favoritesSlice'
import hotelsReducer from '../redux/slices/hotelsSlice'
import * as hotelsApi from '../services/hotelsApi'

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  hotels: hotelsReducer,
})

function renderHotelDetail({
  hotelId = 'hotel-1',
  favorites = [],
  preloadedHotels = [],
  mockApiResult,
}) {
  const store = createStore(rootReducer, {
    favorites: { items: favorites },
    hotels: { items: preloadedHotels, loading: false, error: null },
  })

  if (mockApiResult) {
    vi.spyOn(hotelsApi, 'getHotelById').mockResolvedValue(mockApiResult)
  }

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/hotels/${hotelId}`]}>
        <Routes>
          <Route path='/hotels/:hotelId' element={<HotelDetail />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  )
}

describe('HotelDetail page', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the loading skeleton while hotel details are loading', async () => {
    vi.spyOn(hotelsApi, 'getHotelById').mockImplementation(() => new Promise(() => {}))

    renderHotelDetail({
      hotelId: 'hotel-1',
      mockApiResult: undefined,
    })

    expect(document.querySelector('.animate-pulse')).toBeTruthy()
  })

  it('renders hotel details when the API resolves successfully', async () => {
    renderHotelDetail({
      hotelId: 'hotel-1',
      mockApiResult: {
        success: true,
        hotel: {
          id: 'hotel-1',
          name: 'Seaside Escape',
          city: 'Lisbon',
          country: 'Portugal',
          description: 'A relaxing break by the coast.',
          address: '123 Ocean Ave',
          images: ['https://example.com/hotel.jpg'],
          facilities: ['Pool', 'WiFi'],
          rooms: [{ name: 'Deluxe Room', description: 'King bed', occupancy: '2 adults' }],
          starRating: 4.5,
          importantInformation: 'Check-in from 3pm.',
          price: 180,
          raw: { id: 'hotel-1' },
        },
      },
    })

    await waitFor(() => {
      expect(screen.getByText('Seaside Escape')).toBeInTheDocument()
    })

    expect(screen.getByText('Lisbon, Portugal')).toBeInTheDocument()
    expect(screen.getByText('A relaxing break by the coast.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add to favorites' })).toBeInTheDocument()
  })

  it('renders the error state when hotel detail fetch fails', async () => {
    renderHotelDetail({
      hotelId: 'hotel-1',
      mockApiResult: {
        success: false,
        error: new Error('failed'),
      },
    })

    await waitFor(() => {
      expect(screen.getByText('Unable to load hotel details.')).toBeInTheDocument()
    })
  })
})
