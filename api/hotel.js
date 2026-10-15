const LITEAPI_BASE_URL = 'https://api.liteapi.travel/v3.0'

export default async function handler(req, res) {
  const apiKey = process.env.LITEAPI_API_KEY

  if (!apiKey) {
    return res.status(500).json({ success: false, error: 'Missing LITEAPI_API_KEY environment variable.' })
  }

  const { hotelId } = req.query

  if (!hotelId) {
    return res.status(400).json({ success: false, error: 'hotelId is required' })
  }

  try {
    const targetUrl = new URL(`${LITEAPI_BASE_URL}/data/hotel`)
    targetUrl.searchParams.set('hotelId', String(hotelId))

    const liteRes = await fetch(targetUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
    })

    const contentType = liteRes.headers.get('content-type') || ''
    const data = contentType.includes('application/json') ? await liteRes.json() : await liteRes.text()

    if (!liteRes.ok) {
      return res.status(liteRes.status).json({ success: false, error: data?.message || data || 'LiteAPI request failed.' })
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error('Hotel detail proxy error:', error)
    return res.status(500).json({ success: false, error: 'Hotel detail proxy request failed.' })
  }
}
