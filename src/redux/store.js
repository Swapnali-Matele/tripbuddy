import { createStore, applyMiddleware, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import favoritesReducer from './slices/favoritesSlice'

const rootReducer = combineReducers({
  favorites: favoritesReducer,
})

const STORAGE_KEY = 'tripbuddy_favorites'

// Load initial favorites from localStorage safely
function loadPreloadedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return undefined
    return { favorites: { items: parsed } }
  } catch (e) {
    console.warn('Could not read favorites from localStorage:', e)
    return undefined
  }
}

const preloadedState = loadPreloadedState()

const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk))

// Persist favorites to localStorage on changes
store.subscribe(() => {
  try {
    const state = store.getState()
    const items = state.favorites && state.favorites.items ? state.favorites.items : []
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (e) {
    console.warn('Could not save favorites to localStorage:', e)
  }
})

export default store
