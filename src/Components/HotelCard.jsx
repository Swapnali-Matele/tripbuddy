/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite, selectIsFavorite } from '../redux/slices/favoritesSlice'

const HotelCard = ({ hotel, onRemove }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const id = hotel?.id ?? hotel?.hotelId ?? hotel?.hotel_id ?? hotel?.hotel?.id

  const isFavSelector = selectIsFavorite(id)
  const isFav = useSelector(state => isFavSelector(state))

  const handleView = () => {
    if (!id) return
    navigate(`/hotels/${id}`)
  }

  const handleToggle = () => {
    dispatch(toggleFavorite(hotel))
  }

  const img = hotel?.image || hotel?.images?.[0] || hotel?.hotel?.image || null
  const name = hotel?.name || hotel?.hotel?.name || 'Unnamed Hotel'
  const city = hotel?.city || hotel?.location || hotel?.hotel?.city || null
  const country = hotel?.country || hotel?.hotel?.country || null
  const rating = hotel?.rating || hotel?.hotel?.rating || null
  const reviewCount = hotel?.reviewCount || hotel?.hotel?.reviewCount || null
  const price = hotel?.price || hotel?.rates?.[0]?.price || null

  return (
    <div className='border rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transition transform hover:-translate-y-1 hover:scale-[1.01] duration-200 ease-in-out'>
      {img ? (
            <img src={img} alt={name} className='w-full h-40 sm:h-44 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105' />
      ) : (
        <div className='w-full h-40 sm:h-44 bg-gray-200 flex items-center justify-center text-gray-500'>No image</div>
      )}
      <div className='p-4'>
        <h3 className='text-lg font-semibold'>{name}</h3>
        <p className='text-sm text-gray-600'>{city ?? 'Location unavailable'}{country ? `, ${country}` : ''}</p>
        <p className='text-sm text-gray-700 mt-2'>{hotel?.description ? hotel.description.replace(/<[^>]+>/g, '').slice(0, 120) + (hotel.description.length > 120 ? '...' : '') : 'Description not available.'}</p>
        <div className='flex items-center justify-between mt-3'>
          <div>
            {rating ? <span className='text-yellow-500 font-semibold'>{rating}</span> : null}
            {reviewCount ? <span className='ml-2 text-sm text-gray-600'>({reviewCount} reviews)</span> : null}
            {price ? <span className='ml-3 text-gray-700'>${price}</span> : null}
          </div>
          <div className='flex gap-2'>
            <button aria-label={isFav ? `Remove ${name} from favorites` : `Add ${name} to favorites`} title={isFav ? `Remove ${name} from favorites` : `Add ${name} to favorites`} onClick={handleToggle} className={`px-3 py-1 rounded ${isFav ? 'bg-red-500 text-white' : 'bg-white border'}`}>
              {isFav ? 'Unfavorite' : 'Favorite'}
            </button>
            {onRemove && (
              <button aria-label={`Remove ${name} from favorites`} title={`Remove ${name} from favorites`} onClick={() => onRemove(id)} className='px-3 py-1 bg-red-500 text-white rounded'>Remove</button>
            )}
            <button aria-label='View details' title='View details' onClick={handleView} className={`px-3 py-1 border rounded ${id ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'}`} disabled={!id}>View Details</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelCard
