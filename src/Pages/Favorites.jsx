import { useSelector, useDispatch } from 'react-redux'
import { selectFavorites, selectFavoriteCount, removeFavorite } from '../redux/slices/favoritesSlice'
import HotelCard from '../Components/HotelCard'
import { Link } from 'react-router-dom'

const Favorites = () => {
  const favorites = useSelector(selectFavorites)
  const count = useSelector(selectFavoriteCount)
  const dispatch = useDispatch()

  const handleRemove = (id) => {
    dispatch(removeFavorite(id))
  }

  return (
    <div className='max-w-7xl mx-auto my-10 p-4'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold'>Favorites / My Favorite Hotels</h1>
        <p className='text-gray-600'>{count} saved {count === 1 ? 'hotel' : 'hotels'}</p>
      </div>

      {count === 0 ? (
        <div className='text-center py-20'>
          <h2 className='text-xl mb-4'>No favorite hotels yet.</h2>
          <Link to='/hotels' className='px-4 py-2 bg-red-500 text-white rounded'>Explore Hotels</Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {favorites.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} onRemove={handleRemove} isFavorite={true} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
