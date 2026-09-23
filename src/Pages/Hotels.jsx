import { useState, useEffect } from 'react'
import { getHotelsByCountry } from '../services/hotelsApi'
import countryCodes from '../utils/countryCodes'
import Pagination from '../Components/Pagination'
import HotelCard from '../Components/HotelCard'

const PAGE_SIZE = 10
const MAX_RESULTS = 50

const Hotels = () => {
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hotels, setHotels] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [country])

  useEffect(() => {
    if (!country) return
    const fetch = async () => {
      setLoading(true)
      setError(null)
      setHotels([])
      const res = await getHotelsByCountry(country)
      setLoading(false)
      if (!res.success) {
        setError('Unable to load hotels.')
        return
      }
      const list = Array.isArray(res.hotels) ? res.hotels.slice(0, MAX_RESULTS) : []
      setHotels(list)
    }
    fetch()
  }, [country])

  const totalPages = Math.max(1, Math.ceil(hotels.length / PAGE_SIZE))
  const currentSlice = hotels.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleRetry = () => {
    setCountry((c) => { return c })
  }

  return (
    <div className='max-w-7xl mx-auto my-10 p-4'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold'>Explore Hotels</h1>
        <p className='text-gray-600'>Select a country to discover hotels powered by LiteAPI.</p>
      </div>

      <div className='mb-6 flex items-center gap-4'>
        <label className='font-semibold'>Select Country</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)} className='border px-3 py-2 rounded'>
          <option value=''>-- Choose a country --</option>
          {countryCodes.map(c => (
            <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
          ))}
        </select>
      </div>

      {loading && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className='animate-pulse bg-white rounded-lg h-56' />
          ))}
        </div>
      )}

      {error && (
        <div className='text-center py-12'>
          <p className='text-red-600 mb-4'>{error}</p>
          <button onClick={handleRetry} className='px-4 py-2 bg-red-500 text-white rounded'>Try Again</button>
        </div>
      )}

      {!loading && !error && hotels.length === 0 && country && (
        <div className='text-center py-12'>
          <p>No hotels found for this country.</p>
        </div>
      )}

      {!loading && !error && hotels.length > 0 && (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {currentSlice.map((hotel, idx) => (
              <HotelCard key={hotel.id ?? hotel.hotelId ?? idx} hotel={hotel} />
            ))}
          </div>

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
        </>
      )}
    </div>
  )
}

export default Hotels
