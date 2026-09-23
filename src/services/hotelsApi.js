import axios from 'axios'

const BASE_URL = import.meta.env.VITE_LITE_API_URL || 'https://api.liteapi.travel/v3.0'
const API_KEY = import.meta.env.VITE_LITE_API_KEY || ''

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(API_KEY ? { 'X-API-Key': API_KEY } : {}),
  },
})

export async function getHotelsByCountry(countryCode) {
  if (!countryCode) throw new Error('countryCode is required')
  try {
    const res = await client.get('/data/hotels', { params: { countryCode } })
    // Expect the hotels array to be in res.data or similar; return normalized structure
    const data = res.data
    // Try common shapes
    const hotels = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : data?.hotels ?? []
    return { success: true, hotels }
  } catch (err) {
    console.error('getHotelsByCountry error:', err)
    return { success: false, error: err }
  }
}

export default { getHotelsByCountry }

function normalizeHotel(raw) {
  if (!raw || typeof raw !== 'object') return null
  const id = raw.id ?? raw.hotelId ?? raw.hotel_id ?? raw.hotel?.id ?? null
  const name = raw.name ?? raw.hotelName ?? raw.hotel?.name ?? null
  const description = raw.hotelDescription ?? raw.description ?? raw.overview ?? raw.hotel?.description ?? null

  // images could be array of strings or objects
  let images = []
  const imgSources = raw.hotelImages ?? raw.images ?? raw.photos ?? raw.media ?? raw.hotel?.images ?? null
  if (Array.isArray(imgSources)) {
    images = imgSources.map(i => {
      if (!i) return null
      if (typeof i === 'string') return i
      return i.url ?? i.src ?? i.imageUrl ?? i.photo ?? null
    }).filter(Boolean)
  }

  const city = raw.city ?? raw.location?.city ?? raw.hotel?.city ?? null
  const country = raw.country ?? raw.location?.country ?? raw.hotel?.country ?? null
  const address = raw.address ?? raw.location?.address ?? raw.hotel?.address ?? null
  const facilities = raw.hotelFacilities ?? raw.facilities ?? raw.amenities ?? raw.hotel?.facilities ?? []
  const starRating = raw.starRating ?? raw.stars ?? raw.hotelClass ?? raw.hotel?.starRating ?? null
  const rooms = raw.rooms ?? raw.roomTypes ?? raw.hotel?.rooms ?? []
  const importantInformation = raw.hotelImportantInformation ?? raw.importantInformation ?? raw.hotel?.importantInformation ?? null

  // price/rates may be nested
  const price = raw.price ?? raw.rates?.[0]?.price ?? raw.hotel?.price ?? null

  return {
    id,
    name,
    description,
    images,
    city,
    country,
    address,
    facilities,
    starRating,
    rooms,
    importantInformation,
    price,
    raw,
  }
}

export async function getHotelById(hotelId) {
  if (!hotelId) return { success: false, error: new Error('hotelId is required') }
  try {
    const res = await client.get('/data/hotel', { params: { hotelId } })
    const data = res.data
    // response may be nested
    const raw = data?.data ?? data?.hotel ?? data ?? {}
    const hotel = normalizeHotel(raw)
    return { success: true, hotel }
  } catch (err) {
    console.error('getHotelById error:', err && err.message ? err.message : err)
    return { success: false, error: err }
  }
}
