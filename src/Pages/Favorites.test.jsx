import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createStore, combineReducers } from 'redux'
import { vi } from 'vitest'
import Favorites from './Favorites'
import favoritesReducer from '../redux/slices/favoritesSlice'

const rootReducer = combineReducers({
  favorites: favoritesReducer,
})

function renderFavorites(favorites = []) {
  const store = createStore(rootReducer, {
    favorites: { items: favorites },
  })

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    </Provider>
  )
}

describe('Favorites page', () => {
  it('shows the empty state when there are no saved hotels', () => {
    renderFavorites([])

    expect(screen.getByText('No favorite hotels yet.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explore Hotels' })).toBeInTheDocument()
  })

  it('displays saved hotels when favorites exist', () => {
    renderFavorites([
      { id: 'hotel-1', name: 'Ocean View', city: 'Lisbon', country: 'Portugal', image: 'https://example.com/ocean.jpg' },
      { id: 'hotel-2', name: 'City Escape', city: 'Paris', country: 'France', image: 'https://example.com/city.jpg' },
    ])

    expect(screen.getByText('Ocean View')).toBeInTheDocument()
    expect(screen.getByText('City Escape')).toBeInTheDocument()
    expect(screen.getByText('2 saved hotels')).toBeInTheDocument()
  })

  it('removes a favorite hotel from the list', () => {
    renderFavorites([
      { id: 'hotel-1', name: 'Ocean View', city: 'Lisbon', country: 'Portugal', image: 'https://example.com/ocean.jpg' },
    ])

    const hotelCard = screen.getByText('Ocean View').closest('div')
    const removeButton = hotelCard?.querySelectorAll('button')[1]

    fireEvent.click(removeButton)

    expect(screen.getByText('No favorite hotels yet.')).toBeInTheDocument()
  })
})
