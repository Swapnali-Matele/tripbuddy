import { useEffect, useState } from 'react'
import { getBlogs } from '../services/blogApi'
import BlogCard from '../Components/BlogCard'
import { Link } from 'react-router-dom'
import Hero1 from '../assets/Hero1.jpg'
import Hero2 from '../assets/Hero2.jpg'
import Hero3 from '../assets/Hero3.jpg'
import Bali from '../assets/Bali.jpg'
import Paris from '../assets/Paris.jpg'
import Tokyo from '../assets/Tokyo.jpg'
import India from '../assets/India.jpg'
import Venice from '../assets/Venice.jpg'

const IMAGES = [Hero1, Hero2, Hero3, Bali, Paris, Tokyo, India, Venice]
const PAGE_SIZE = 9

const Blogs = () => {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      setError(null)
      const res = await getBlogs(page)
      setLoading(false)
      if (!res.success) {
        setError('Unable to load blogs right now.')
        return
      }
      setPosts(res.posts)
      setTotal(res.total)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    fetch()
  }, [page])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const assignImage = (postId) => {
    return IMAGES[postId % IMAGES.length]
  }

  return (
    <div className='max-w-7xl mx-auto my-10 p-4'>
      <div className='mb-6 text-center'>
        <h1 className='text-3xl font-bold'>TripBuddy Blogs</h1>
        <p className='text-gray-600'>Discover travel stories, tips and inspiration for your next journey.</p>
      </div>

      {loading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className='animate-pulse bg-white rounded-lg h-64' />
          ))}
        </div>
      ) : error ? (
        <div className='text-center py-12'>
          <p className='text-red-600 mb-4'>{error}</p>
          <div className='flex items-center justify-center gap-4'>
            <button onClick={() => setPage(page)} className='px-4 py-2 bg-red-500 text-white rounded'>Try Again</button>
            <Link to='/' className='px-4 py-2 border rounded'>Home</Link>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className='text-center py-12'>
          <p>No blog posts available.</p>
          <Link to='/' className='px-4 py-2 border rounded mt-4 inline-block'>Home</Link>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {posts.map(post => (
              <BlogCard key={post.id} post={post} image={assignImage(post.id)} />
            ))}
          </div>

          <div className='flex items-center justify-center gap-3 mt-8'>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-300' : 'bg-red-500 text-white'}`}>Previous</button>
            <div>Page {page} of {totalPages}</div>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className={`px-3 py-1 rounded ${page === totalPages ? 'bg-gray-300' : 'bg-red-500 text-white'}`}>Next</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Blogs
