import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogById } from '../services/blogApi'
import Hero1 from '../assets/Hero1.jpg'
import Hero2 from '../assets/Hero2.jpg'
import Hero3 from '../assets/Hero3.jpg'
import Bali from '../assets/Bali.jpg'
import Paris from '../assets/Paris.jpg'
import Tokyo from '../assets/Tokyo.jpg'
import India from '../assets/India.jpg'
import Venice from '../assets/Venice.jpg'

const IMAGES = [Hero1, Hero2, Hero3, Bali, Paris, Tokyo, India, Venice]

const assignImage = (id) => IMAGES[id % IMAGES.length]

const BlogDetail = () => {
  const { blogId } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [post, setPost] = useState(null)

  useEffect(() => {
    if (!blogId) return
    const fetch = async () => {
      setLoading(true)
      setError(null)
      const res = await getBlogById(blogId)
      setLoading(false)
      if (!res.success) {
        setError('Unable to load this blog.')
        return
      }
      setPost(res.post)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    fetch()
  }, [blogId])

  if (loading) {
    return (
      <div className='max-w-7xl mx-auto my-10 p-4'>
        <div className='animate-pulse'>
          <div className='h-64 bg-gray-200 rounded mb-4'></div>
          <div className='h-6 bg-gray-200 rounded w-1/2 mb-2'></div>
          <div className='h-4 bg-gray-200 rounded w-1/3 mb-2'></div>
          <div className='h-3 bg-gray-200 rounded w-full mb-1'></div>
          <div className='h-3 bg-gray-200 rounded w-full mb-1'></div>
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
          <Link to='/blogs' className='px-4 py-2 border rounded'>Back to Blogs</Link>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className='max-w-7xl mx-auto my-10 p-4 text-center'>
        <p>Blog not found.</p>
        <Link to='/blogs' className='px-4 py-2 border rounded mt-4 inline-block'>Back to Blogs</Link>
      </div>
    )
  }

  const image = assignImage(post.id || 0)

  return (
    <div className='max-w-7xl mx-auto my-10 p-4'>
      <div className='mb-6'>
        <Link to='/blogs' className='text-sm text-gray-600 underline'>Back to Blogs</Link>
        <h1 className='text-3xl font-bold mt-2'>{post.title}</h1>
        <p className='text-sm text-gray-500 mt-1'>Post ID: {post.id} • {post.reactions ? `${post.reactions} reactions` : ''}</p>
      </div>

      <div className='mb-6'>
        <img src={image} alt={post.title} className='w-full h-96 object-cover rounded' />
      </div>

      <div className='prose max-w-none'>
        <p>{post.body}</p>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className='mt-6'>
          <h3 className='font-semibold mb-2'>Tags</h3>
          <div className='flex gap-2 flex-wrap'>
            {post.tags.map((t, i) => (
              <span key={i} className='text-xs bg-gray-100 px-2 py-1 rounded'>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogDetail
