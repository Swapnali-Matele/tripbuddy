import { getHotelsByCountry } from '../../services/hotelsApi'

const MAX_RESULTS = 50

const initialState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchHotelsStart = () => ({ type: 'hotels/fetchStart' })
export const fetchHotelsSuccess = (hotels) => ({ type: 'hotels/fetchSuccess', payload: hotels })
export const fetchHotelsFailure = (error) => ({ type: 'hotels/fetchFailure', payload: error })
export const clearHotels = () => ({ type: 'hotels/clear' })

export const fetchHotelsByCountry = (countryCode) => async (dispatch) => {
  if (!countryCode) {
    dispatch(clearHotels())
    return
  }

  dispatch(fetchHotelsStart())

  const res = await getHotelsByCountry(countryCode)

  if (!res.success) {
    dispatch(fetchHotelsFailure('Unable to load hotels.'))
    return
  }

  const hotels = Array.isArray(res.hotels) ? res.hotels.slice(0, MAX_RESULTS) : []
  dispatch(fetchHotelsSuccess(hotels))
}

export const selectHotels = (state) => state.hotels?.items ?? []
export const selectHotelsLoading = (state) => state.hotels?.loading ?? false
export const selectHotelsError = (state) => state.hotels?.error ?? null

export default function hotelsReducer(state = initialState, action) {
  switch (action.type) {
    case 'hotels/fetchStart':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'hotels/fetchSuccess':
      return {
        ...state,
        items: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
        error: null,
      }
    case 'hotels/fetchFailure':
      return {
        ...state,
        items: [],
        loading: false,
        error: action.payload || 'Unable to load hotels.',
      }
    case 'hotels/clear':
      return {
        ...state,
        items: [],
        loading: false,
        error: null,
      }
    default:
      return state
  }
}
