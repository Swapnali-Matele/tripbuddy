import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectFavoriteCount } from '../../redux/slices/favoritesSlice'

const ResponsiveMenu = ({ showMenu, setShowMenu }) => {
  const favCount = useSelector(selectFavoriteCount)

  return (
    <div className={`${showMenu ? 'right-0' : '-right-full'} fixed inset-y-0 right-0 z-50 w-3/4 max-w-xs flex flex-col justify-between bg-white px-6 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-l-xl shadow-md`}>
      <div>
        <button aria-label='Close menu' className='border border-black rounded-lg absolute top-4 right-6 p-1 focus:outline-none focus:ring-2 focus:ring-red-300' onClick={() => setShowMenu(false)}>
          <X />
        </button>

        <nav className='mt-4'>
          <ul className='space-y-4 text-lg text-black flex flex-col'>
            <Link to='/' onClick={() => setShowMenu(false)}><li>Home</li></Link>
            <Link to='/hotels' onClick={() => setShowMenu(false)}><li>Hotels</li></Link>
            <Link to='/blogs' onClick={() => setShowMenu(false)}><li>Blogs</li></Link>
            <Link to='/favorites' onClick={() => setShowMenu(false)}><li className='flex items-center gap-2'><FaHeart className='text-red-500' /> Favorites <span className='text-red-500 font-semibold'>({favCount})</span></li></Link>
            <Link to='/about' onClick={() => setShowMenu(false)}><li>About</li></Link>
          </ul>
        </nav>
      </div>

      <div className='text-sm text-slate-500'>TripBuddy</div>
    </div>
  )
}

export default ResponsiveMenu
