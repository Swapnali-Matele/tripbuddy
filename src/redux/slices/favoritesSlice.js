const STORAGE_KEY = 'tripbuddy_favorites'

const initialState = {
  items: [],
}

// Helper to extract a stable id from a hotel object
const getHotelId = (hotel) => {
  if (!hotel) return null
  return hotel.id ?? hotel.hotelId ?? hotel.hotel_id ?? null
}

// Action creators
export const addFavorite = (hotel) => ({ type: 'favorites/add', payload: hotel })
export const removeFavorite = (hotelId) => ({ type: 'favorites/remove', payload: hotelId })
export const toggleFavorite = (hotel) => ({ type: 'favorites/toggle', payload: hotel })
export const clearFavorites = () => ({ type: 'favorites/clear' })

// Selectors
export const selectFavorites = (state) => state.favorites.items
export const selectFavoriteCount = (state) => state.favorites.items.length
export const selectIsFavorite = (hotelId) => (state) => state.favorites.items.some(h => h.id === hotelId)

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case 'favorites/add': {
      const hotel = action.payload
      const id = getHotelId(hotel)
      if (!id) return state // cannot add item without id
      const exists = state.items.some(item => item.id === id)
      if (exists) return state
      // store a shallow copy with normalized `id` field
      const item = { ...hotel, id }
      return { ...state, items: [item, ...state.items] }
    }
    case 'favorites/remove': {
      const id = action.payload
      return { ...state, items: state.items.filter(item => item.id !== id) }
    }
    case 'favorites/toggle': {
      const hotel = action.payload
      const id = getHotelId(hotel)
      if (!id) return state
      const exists = state.items.some(item => item.id === id)
      if (exists) {
        return { ...state, items: state.items.filter(item => item.id !== id) }
      }
      const item = { ...hotel, id }
      return { ...state, items: [item, ...state.items] }
    }
    case 'favorites/clear':
      return { ...state, items: [] }
    default:
      return state
  }
}

