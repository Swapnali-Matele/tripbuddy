const DUMMYJSON_BASE_URL = 'https://dummyjson.com'

export default async function handler(req, res) {
  const { blogId } = req.query || {}

  if (!blogId) {
    return res.status(400).json({ success: false, error: 'blogId is required' })
  }

  try {
    const targetUrl = new URL(`${DUMMYJSON_BASE_URL}/posts/${encodeURIComponent(String(blogId))}`)
    const dummyRes = await fetch(targetUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const contentType = dummyRes.headers.get('content-type') || ''
    const data = contentType.includes('application/json') ? await dummyRes.json() : await dummyRes.text()

    if (!dummyRes.ok) {
      return res.status(dummyRes.status).json({ success: false, error: data?.message || data || 'DummyJSON request failed.' })
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error('Blog detail proxy error:', error)
    return res.status(500).json({ success: false, error: 'Blog detail proxy request failed.' })
  }
}
