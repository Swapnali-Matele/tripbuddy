import { describe, it, expect, vi, beforeEach } from 'vitest'
import hotelsReducer, {
  fetchHotelsByCountry,
  fetchHotelsStart,
  fetchHotelsSuccess,
  fetchHotelsFailure,
  clearHotels,
} from './hotelsSlice'
import * as hotelsApi from '../../services/hotelsApi'

describe('hotelsReducer and fetchHotelsByCountry', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('fetches hotels successfully and stores fulfilled state', async () => {
    const hotels = [
      { id: 'hotel-1', name: 'Ocean View' },
      { id: 'hotel-2', name: 'City Stay' },
    ]

    vi.spyOn(hotelsApi, 'getHotelsByCountry').mockResolvedValue({ success: true, hotels })

    const dispatch = vi.fn()
    await fetchHotelsByCountry('US')(dispatch)

    expect(hotelsApi.getHotelsByCountry).toHaveBeenCalledWith('US')
    expect(dispatch).toHaveBeenNthCalledWith(1, fetchHotelsStart())
    expect(dispatch).toHaveBeenNthCalledWith(2, fetchHotelsSuccess(hotels))

    const nextState = hotelsReducer(
      { items: [], loading: false, error: null },
      fetchHotelsSuccess(hotels)
    )

    expect(nextState.items).toEqual(hotels)
    expect(nextState.loading).toBe(false)
    expect(nextState.error).toBeNull()
  })

  it('sets the loading state while a hotel fetch is in progress', () => {
    const nextState = hotelsReducer(
      { items: [], loading: false, error: 'Previous error' },
      fetchHotelsStart()
    )

    expect(nextState.loading).toBe(true)
    expect(nextState.error).toBeNull()
  })

  it('handles a failed hotel fetch and sets the rejected error state', async () => {
    vi.spyOn(hotelsApi, 'getHotelsByCountry').mockResolvedValue({ success: false, error: 'network failed' })

    const dispatch = vi.fn()
    await fetchHotelsByCountry('US')(dispatch)

    expect(dispatch).toHaveBeenNthCalledWith(1, fetchHotelsStart())
    expect(dispatch).toHaveBeenNthCalledWith(2, fetchHotelsFailure('Unable to load hotels.'))

    const nextState = hotelsReducer(
      { items: [{ id: 'hotel-1' }], loading: true, error: null },
      fetchHotelsFailure('Unable to load hotels.')
    )

    expect(nextState.items).toEqual([])
    expect(nextState.loading).toBe(false)
    expect(nextState.error).toBe('Unable to load hotels.')
  })

  it('clears hotels when no country code is provided', async () => {
    const dispatch = vi.fn()
    await fetchHotelsByCountry('')(dispatch)

    expect(dispatch).toHaveBeenCalledWith(clearHotels())
  })
})
