import favoritesReducer, {
  addFavorite,
  removeFavorite,
  clearFavorites,
  selectFavoriteCount,
} from './favoritesSlice'

describe('favoritesReducer', () => {
  it('adds a hotel to favorites', () => {
    const initialState = { items: [] }
    const hotel = { id: 'hotel-1', name: 'Ocean View' }

    const nextState = favoritesReducer(initialState, addFavorite(hotel))

    expect(nextState.items).toHaveLength(1)
    expect(nextState.items[0]).toEqual({ ...hotel, id: 'hotel-1' })
    expect(selectFavoriteCount({ favorites: nextState })).toBe(1)
  })

  it('removes a hotel from favorites', () => {
    const initialState = {
      items: [
        { id: 'hotel-1', name: 'Ocean View' },
        { id: 'hotel-2', name: 'Mountain Stay' },
      ],
    }

    const nextState = favoritesReducer(initialState, removeFavorite('hotel-1'))

    expect(nextState.items).toHaveLength(1)
    expect(nextState.items[0].id).toBe('hotel-2')
    expect(selectFavoriteCount({ favorites: nextState })).toBe(1)
  })

  it('updates favorites state correctly across add and clear actions', () => {
    let state = { items: [] }

    state = favoritesReducer(state, addFavorite({ id: 'hotel-1', name: 'Ocean View' }))
    state = favoritesReducer(state, addFavorite({ id: 'hotel-2', name: 'City Escape' }))

    expect(state.items).toHaveLength(2)
    expect(state.items.map(h => h.id)).toEqual(['hotel-2', 'hotel-1'])

    state = favoritesReducer(state, clearFavorites())

    expect(state.items).toEqual([])
    expect(selectFavoriteCount({ favorites: state })).toBe(0)
  })
})
