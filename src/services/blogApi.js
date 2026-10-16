import axios from 'axios'

const PAGE_SIZE = 9

const client = axios.create({
  headers: { 'Content-Type': 'application/json' },
})

export async function getBlogs(page = 1) {
  const skip = (page - 1) * PAGE_SIZE

  try {
    const res = await client.get(`/api/blogs?limit=${PAGE_SIZE}&skip=${skip}`)
    const data = res.data
    const posts = Array.isArray(data?.posts) ? data.posts : Array.isArray(data) ? data : []
    const total = typeof data?.total === 'number' ? data.total : posts.length
    return { success: true, posts, total }
  } catch (error) {
    console.error('getBlogs error:', error?.message ?? error)
    return { success: false, error }
  }
}

export default { getBlogs }

export async function getBlogById(blogId) {
  if (!blogId) return { success: false, error: new Error('blogId is required') }

  try {
    const res = await client.get(`/api/blog?blogId=${encodeURIComponent(blogId)}`)
    const post = res.data?.post ?? res.data
    return { success: true, post }
  } catch (error) {
    console.error('getBlogById error:', error?.message ?? error)
    return { success: false, error }
  }
}
