/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const BlogCard = ({ post, image }) => {
  const excerpt = post.body ? (post.body.length > 150 ? post.body.slice(0, 150) + '...' : post.body) : ''
  return (
    <article className='border rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transition transform hover:-translate-y-1 duration-200 ease-in-out'>
      <div className='h-48 w-full overflow-hidden'>
        <img src={image} alt={post.title} className='w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105' />
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-semibold mb-2'>{post.title}</h3>
        <p className='text-sm text-gray-700 mb-3'>{excerpt}</p>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 flex-wrap'>
            {post.tags && post.tags.slice(0, 4).map((t, i) => (
              <span key={i} className='text-xs bg-gray-100 px-2 py-1 rounded'>{t}</span>
            ))}
          </div>
          <Link to={`/blogs/${post.id}`} className='px-3 py-1 border rounded bg-white'>Read More</Link>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
