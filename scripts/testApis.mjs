import { getBlogs, getBlogById } from '../src/services/blogApi.js'
import { getHotelsByCountry, getHotelById } from '../src/services/hotelsApi.js'

async function run() {
  console.log('Testing Blogs API...')
  const b = await getBlogs(1)
  console.log('getBlogs success:', b.success, 'posts:', Array.isArray(b.posts) ? b.posts.length : 'n/a', 'total:', b.total)
  if (b.success && b.posts && b.posts.length > 0) {
    const id = b.posts[0].id
    const bd = await getBlogById(id)
    console.log('getBlogById', id, 'success:', bd.success, 'title:', bd.post?.title)
  }

  console.log('\nTesting Hotels API (may require API key)...')
  try {
    const h = await getHotelsByCountry('IN')
    console.log('getHotelsByCountry success:', h.success, 'hotels:', Array.isArray(h.hotels) ? h.hotels.length : 'n/a')
    if (h.success && Array.isArray(h.hotels) && h.hotels.length > 0) {
      const hid = h.hotels[0].id || h.hotels[0].hotelId || h.hotels[0].hotel?.id
      if (hid) {
        const hd = await getHotelById(hid)
        console.log('getHotelById', hid, 'success:', hd.success)
      }
    }
  } catch (e) {
    console.error('Hotels API test error:', e && e.message ? e.message : e)
  }
}

run().catch(e => { console.error('Test script failed:', e) })
