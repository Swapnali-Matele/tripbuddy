import { useState } from 'react'
import { Link } from 'react-router-dom'
import footer from '../assets/footer-pattern.jpg'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer
      className='bg-gray-800 text-white py-10'
      style={{
        backgroundImage: `url(${footer})`,
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
      }}
    >
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
          <div>
            <h1 className='font-bold text-4xl mb-4'><span className='text-red-500'>Trip</span>Buddy</h1>
            <p className='text-sm text-slate-200'>TripBuddy helps travelers discover inspiring hotels, browse destination stories, and save the stays they love for their next trip.</p>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2 text-sm text-slate-200'>
              <li><Link to='/' className='hover:text-white'>Home</Link></li>
              <li><Link to='/hotels' className='hover:text-white'>Hotels</Link></li>
              <li><Link to='/blogs' className='hover:text-white'>Blogs</Link></li>
              <li><Link to='/favorites' className='hover:text-white'>Favorites</Link></li>
              <li><Link to='/about' className='hover:text-white'>About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Newsletter</h3>
            <form onSubmit={handleSubmit} className='space-y-3'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email address'
                className='w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-red-300'
              />
              <button type='submit' className='w-full px-3 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors'>Subscribe</button>
              {subscribed && <p className='text-xs text-green-300'>Thanks for subscribing.</p>}
            </form>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact</h3>
            <ul className='space-y-2 text-sm text-slate-200'>
              <li>Phone: +1 234 567 890</li>
              <li>Email: hello@tripbuddy-demo.com</li>
              <li>Project demo contact info</li>
            </ul>
          </div>
        </div>

        <div className='mt-8 pt-8 border-t border-gray-700 text-center text-sm text-slate-200'>
          <p>&copy; {new Date().getFullYear()} TripBuddy. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
