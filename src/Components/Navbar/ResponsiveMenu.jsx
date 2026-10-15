import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectFavoriteCount } from '../../redux/slices/favoritesSlice'

const ResponsiveMenu = ({ showMenu, setShowMenu }) => {
  const favCount = useSelector(selectFavoriteCount)

  return (
    <div
      id='responsive-menu'
      className={`${showMenu ? 'block' : 'hidden'} lg:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-sm`}
      aria-label='Mobile menu'
    >
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 py-3'>
        <ul className='flex flex-col space-y-3 text-sm font-semibold text-white/90'>
          <Link to='/' onClick={() => setShowMenu(false)} className='hover:text-red-400 transition-colors'>Home</Link>
          <Link to='/hotels' onClick={() => setShowMenu(false)} className='hover:text-red-400 transition-colors'>Hotels</Link>
          <Link to='/blogs' onClick={() => setShowMenu(false)} className='hover:text-red-400 transition-colors'>Blogs</Link>
          <Link to='/favorites' onClick={() => setShowMenu(false)} className='flex items-center gap-2 hover:text-red-400 transition-colors'>
            <FaHeart className='text-red-500' />
            <span>Favorites</span>
            <span className='inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-red-500 px-1.5 text-xs font-bold text-white'>{favCount}</span>
          </Link>
          <Link to='/about' onClick={() => setShowMenu(false)} className='hover:text-red-400 transition-colors'>About</Link>
        </ul>
      </nav>
    </div>
  )
}

export default ResponsiveMenu
