import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getHotelById } from '../services/hotelsApi'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite, selectIsFavorite } from '../redux/slices/favoritesSlice'
import { FaStar } from 'react-icons/fa'

const HotelDetail = () => {
  const { hotelId } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hotel, setHotel] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!hotelId) return
    const fetch = async () => {
      setLoading(true)
      setError(null)
      const res = await getHotelById(hotelId)
      setLoading(false)
      if (!res.success) {
        setError('Unable to load hotel details.')
        return
      }
      setHotel(res.hotel)
    }
    fetch()
  }, [hotelId])

  const isFavSelector = selectIsFavorite(hotel?.id)
  const isFav = useSelector(state => isFavSelector(state))

  const handleToggle = () => {
    if (!hotel) return
    dispatch(toggleFavorite(hotel.raw ?? hotel))
  }

  if (loading) {
    return (
      <div className='max-w-7xl mx-auto my-10 p-4'>
        <div className='animate-pulse'>
          <div className='h-64 bg-gray-200 rounded mb-4'></div>
          <div className='h-6 bg-gray-200 rounded w-1/3 mb-2'></div>
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-2'></div>
          <div className='h-3 bg-gray-200 rounded w-full mb-1'></div>
          <div className='h-3 bg-gray-200 rounded w-full mb-1'></div>
          <div className='h-3 bg-gray-200 rounded w-3/4 mb-1'></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='max-w-7xl mx-auto my-10 p-4 text-center'>
        <p className='text-red-600 mb-4'>{error}</p>
        <div className='flex justify-center gap-4'>
          <button onClick={() => window.location.reload()} className='px-4 py-2 bg-red-500 text-white rounded'>Try Again</button>
          <Link to='/hotels' className='px-4 py-2 border rounded'>Back to Hotels</Link>
        </div>
      </div>
    )
  }

  if (!hotel) {
    return (
      <div className='max-w-7xl mx-auto my-10 p-4 text-center'>
        <p>Hotel not found.</p>
        <Link to='/hotels' className='px-4 py-2 border rounded mt-4 inline-block'>Back to Hotels</Link>
      </div>
    )
  }

  const { name, images, description, city, country, address, facilities, rooms, starRating, importantInformation, price } = hotel

  return (
    <div className='max-w-7xl mx-auto my-10 p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <Link to='/hotels' className='text-sm text-gray-600 underline'>Back to Hotels</Link>
          <h1 className='text-3xl font-bold mt-2'>{name}</h1>
          <div className='flex items-center gap-3 mt-2 text-gray-700'>
            {starRating ? <div className='flex items-center gap-1'><FaStar className='text-yellow-500' /> <span>{starRating}</span></div> : null}
            <div>{city ?? 'Location unavailable'}{country ? `, ${country}` : ''}</div>
            {price ? <div className='ml-3 font-semibold'>From ${price}</div> : null}
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <button onClick={handleToggle} className={`px-4 py-2 rounded ${isFav ? 'bg-red-500 text-white' : 'bg-white border'}`} aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}>
            {isFav ? 'Unfavorite' : 'Add to Favorites'}
          </button>
        </div>
      </div>

      {/* Gallery */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6'>
        <div className='lg:col-span-2'>
          {images && images.length > 0 ? (
            <img src={images[0]} alt={name} className='w-full h-64 md:h-80 lg:h-96 object-cover rounded transition-transform duration-300 ease-in-out transform hover:scale-105' />
          ) : (
            <div className='w-full h-64 md:h-80 lg:h-96 bg-gray-200 flex items-center justify-center rounded'>No image available</div>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          {images && images.slice(1, 5).map((img, i) => (
            <div key={i} className='h-20 md:h-24 bg-gray-100 rounded overflow-hidden'>
              <img src={img} alt={`${name} ${i}`} className='w-full h-full object-cover' />
            </div>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <section className='mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>About</h2>
            <p className='text-gray-700'>{description ?? 'Description not available.'}</p>
          </section>

          <section className='mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>Amenities</h2>
            {facilities && facilities.length > 0 ? (
              <ul className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                {facilities.map((f, idx) => (
                  <li key={idx} className='text-sm bg-gray-100 p-2 rounded'>{typeof f === 'string' ? f : f.name ?? JSON.stringify(f)}</li>
                ))}
              </ul>
            ) : (
              <p>Facilities information not available.</p>
            )}
          </section>

          <section className='mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>Rooms</h2>
            {rooms && rooms.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {rooms.map((r, idx) => (
                  <div key={idx} className='border rounded p-4'>
                    <h3 className='font-semibold'>{r.name ?? r.roomName ?? 'Room'}</h3>
                    <p className='text-sm text-gray-700'>{r.description ?? 'No description available.'}</p>
                    {r.occupancy ? <p className='text-sm mt-2'>Occupancy: {r.occupancy}</p> : null}
                  </div>
                ))}
              </div>
            ) : (
              <p>Room information is not available.</p>
            )}
          </section>

          <section className='mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>Important Information</h2>
            <p className='text-gray-700'>{importantInformation ?? 'No additional information available.'}</p>
          </section>
        </div>

        <aside>
          <div className='border rounded p-4 mb-4'>
            <h3 className='font-semibold mb-2'>Address</h3>
            <p className='text-sm'>{address ?? 'Address not available'}</p>
          </div>
          <div className='border rounded p-4'>
            <h3 className='font-semibold mb-2'>Quick Facts</h3>
            <ul className='text-sm space-y-1'>
              {starRating ? <li>Star Rating: {starRating}</li> : null}
              {city ? <li>City: {city}</li> : null}
              {country ? <li>Country: {country}</li> : null}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default HotelDetail
