import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import banner1 from '../assets/Hero1.jpg'
import banner2 from '../assets/Hero3.jpg'
import banner3 from '../assets/Hero4.jpg'

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
  }

  return (
    <div className='slider-container -mt-12 overflow-hidden'>
      <Slider {...settings}>
        {[banner1, banner2, banner3].map((banner, index) => (
          <div key={index}>
            <div
              className='min-h-[60vh] lg:min-h-[75vh] relative'
              style={{
                backgroundImage: `url(${banner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className='absolute inset-0 bg-black opacity-60' />
              <div className='relative max-w-7xl mx-auto'>
                <div className='flex min-h-[60vh] lg:min-h-[75vh] justify-center items-center lg:pt-0 pt-20'>
                  <div className='flex flex-col space-y-8 justify-center items-center text-center px-5 md:px-0'>
                    <p className='text-red-400 text-sm font-semibold uppercase tracking-[0.25em]'>TripBuddy</p>
                    <h1 className='text-white font-bold text-4xl lg:text-6xl'>Discover hotels. Read stories. Save favorites.</h1>
                    <p className='text-white lg:text-lg lg:w-[700px]'>Explore handpicked hotels, browse travel inspiration, and build your next memorable trip with TripBuddy.</p>
                    <div className='flex flex-col sm:flex-row gap-4'>
                      <Link to='/hotels' className='bg-red-500 px-5 py-3 text-white rounded-md font-semibold hover:bg-red-600 transition-colors'>Explore Hotels</Link>
                      <Link to='/blogs' className='bg-white/10 border border-white/30 px-5 py-3 text-white rounded-md font-semibold hover:bg-white/20 transition-colors'>Read Travel Blogs</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Hero
