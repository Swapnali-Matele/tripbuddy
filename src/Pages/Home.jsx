import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../Components/Hero'
import BlogCard from '../Components/BlogCard'
import { getBlogs } from '../services/blogApi'
import Hero1 from '../assets/Hero1.jpg'
import Hero2 from '../assets/Hero2.jpg'
import Hero3 from '../assets/Hero3.jpg'
import Bali from '../assets/Bali.jpg'
import Paris from '../assets/Paris.jpg'
import Tokyo from '../assets/Tokyo.jpg'
import India from '../assets/India.jpg'
import Venice from '../assets/Venice.jpg'

const IMAGES = [Hero1, Hero2, Hero3, Bali, Paris, Tokyo, India, Venice]

const assignImage = (id) => IMAGES[(id || 0) % IMAGES.length]

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const res = await getBlogs(1)
      setLoading(false)
      if (res.success) {
        setPosts((res.posts || []).slice(0, 3))
      }
    }

    fetch()
  }, [])

  return (
    <>
      <Hero />

      <section className='max-w-7xl mx-auto px-4 py-12 md:py-16'>
        <div className='flex items-end justify-between gap-4 mb-8'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-red-500'>Travel inspiration</p>
            <h2 className='mt-2 text-3xl md:text-4xl font-bold text-slate-900'>Latest TripBuddy stories</h2>
          </div>
          <Link to='/blogs' className='hidden sm:inline-flex items-center px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-50 transition-colors'>View All Blogs</Link>
        </div>

        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='animate-pulse bg-slate-200 rounded-xl h-80' />
            ))}
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} image={assignImage(post.id)} />
              ))}
            </div>

            <div className='mt-8 text-center sm:hidden'>
              <Link to='/blogs' className='inline-flex items-center px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-50 transition-colors'>View All Blogs</Link>
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default Home
