import http from 'node:http'
import { URL } from 'node:url'

const PORT = 3001
const LITEAPI_BASE_URL = 'https://api.liteapi.travel/v3.0'

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, error: 'Missing URL' }))
    return
  }

  const apiKey = process.env.LITEAPI_API_KEY
  if (!apiKey) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, error: 'Missing LITEAPI_API_KEY environment variable.' }))
    return
  }

  const requestUrl = new URL(req.url, `http://localhost:${PORT}`)
  const pathname = requestUrl.pathname

  if (pathname !== '/api/hotels' && pathname !== '/api/hotel') {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, error: 'Not found' }))
    return
  }

  const params = new URLSearchParams(requestUrl.search)
  const countryCode = params.get('countryCode')
  const hotelId = params.get('hotelId')

  const liteapiPath = pathname === '/api/hotels' ? '/data/hotels' : '/data/hotel'
  const liteapiUrl = new URL(`${LITEAPI_BASE_URL}${liteapiPath}`)

  if (countryCode) liteapiUrl.searchParams.set('countryCode', countryCode)
  if (hotelId) liteapiUrl.searchParams.set('hotelId', hotelId)

  try {
    const liteRes = await fetch(liteapiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
    })

    const contentType = liteRes.headers.get('content-type') || ''
    const data = contentType.includes('application/json') ? await liteRes.json() : await liteRes.text()

    res.writeHead(liteRes.ok ? 200 : liteRes.status, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
    })

    if (!liteRes.ok) {
      res.end(JSON.stringify({ success: false, error: data?.message || data || 'LiteAPI request failed.' }))
      return
    }

    res.end(JSON.stringify(data))
  } catch (error) {
    console.error('Proxy error:', error)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, error: 'Proxy request failed.' }))
  }
})

server.listen(PORT, () => {
  console.log(`Local LiteAPI proxy listening on http://localhost:${PORT}`)
})
