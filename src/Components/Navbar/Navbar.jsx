import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMenuAlt1 } from 'react-icons/hi'
import { FaHeart } from 'react-icons/fa'
import ResponsiveMenu from './ResponsiveMenu'
import { useSelector } from 'react-redux'
import { selectFavoriteCount } from '../../redux/slices/favoritesSlice'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => setShowMenu(!showMenu)
  const favCount = useSelector(selectFavoriteCount)

  return (
    <header className='sticky top-0 z-50 bg-transparent'>
      <div className='fixed inset-x-0 top-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between'>
          <Link to='/' className='flex items-center gap-2'>
            <h1 className='text-2xl font-bold text-white'>Trip<span className='text-red-500'>Buddy</span></h1>
          </Link>

          <nav className='hidden md:flex items-center gap-6 lg:gap-8'>
            <ul className='flex items-center gap-6 lg:gap-8 text-sm font-semibold text-white/90'>
              <Link to='/' className='hover:text-red-400 transition-colors'>Home</Link>
              <Link to='/hotels' className='hover:text-red-400 transition-colors'>Hotels</Link>
              <Link to='/blogs' className='hover:text-red-400 transition-colors'>Blogs</Link>
              <Link to='/favorites' className='flex items-center gap-2 hover:text-red-400 transition-colors'>
                <FaHeart className='text-red-500' />
                <span>Favorites</span>
                <span className='inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-red-500 px-1.5 text-xs font-bold text-white'>{favCount}</span>
              </Link>
              <Link to='/about' className='hover:text-red-400 transition-colors'>About</Link>
            </ul>
          </nav>

          <button
            aria-label='Open menu'
            onClick={toggleMenu}
            className='md:hidden text-white focus:outline-none focus:ring-2 focus:ring-red-300 rounded'
          >
            <HiMenuAlt1 className='cursor-pointer' size={30} />
          </button>
        </div>

        <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>

      <div aria-hidden='true' className='h-16 md:h-20' />
    </header>
  )
}

export default Navbar
