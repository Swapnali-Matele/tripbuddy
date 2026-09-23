import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FaLightbulb, FaRegClock, FaGlobeAmericas, FaHeart } from 'react-icons/fa'
import TopBannerImg from '../assets/TopBanner.jpg'
import IndiaImg from '../assets/India.jpg'
import ParisImg from '../assets/Paris.jpg'
import BaliImg from '../assets/Bali.jpg'
import TokyoImg from '../assets/Tokyo.jpg'
import VeniceImg from '../assets/Venice.jpg'

const Feature = ({ icon: Icon, title, desc }) => (
  <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
    <div className="text-3xl mb-4 text-red-500"><Icon className="h-8 w-8" /></div>
    <h3 className="text-lg font-semibold mb-2 text-slate-900">{title}</h3>
    <p className="text-sm text-slate-700 flex-1">{desc}</p>
  </div>
)

Feature.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
}

const PersonCard = ({ img, name, role, desc, socials }) => (
  <div className="bg-white rounded-lg shadow-sm p-5 hover:translate-y-1 transform transition h-full flex flex-col">
    <div className="flex items-center gap-4">
      <img src={img} alt={`${name} profile`} className="w-16 h-16 rounded-full object-cover" />
      <div>
        <div className="font-semibold text-slate-900">{name}</div>
        <div className="text-xs text-slate-600">{role}</div>
      </div>
    </div>
    <p className="mt-4 text-sm text-slate-700 flex-1">{desc}</p>
    <div className="mt-3 flex gap-3 text-slate-600">{socials}</div>
  </div>
)

PersonCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  socials: PropTypes.node,
}

const About = () => {
  const team = [
    {
      img: IndiaImg,
      name: 'Alex Morgan',
      role: 'Founder & CEO',
      desc: 'Leads product vision and business strategy for TripBuddy.'
    },
    {
      img: ParisImg,
      name: 'Priya Sharma',
      role: 'Product Lead',
      desc: 'Drives product design and user experience.'
    },
    {
      img: BaliImg,
      name: 'Daniel Wilson',
      role: 'Travel Experience Manager',
      desc: 'Curates travel stories and destination highlights.'
    },
    {
      img: TokyoImg,
      name: 'Sophia Patel',
      role: 'Technology Lead',
      desc: 'Oversees platform architecture and integrations.'
    }
  ]

  const cofounders = [
    {
      img: VeniceImg,
      name: 'Jordan Blake',
      role: 'Co-Founder & COO',
      desc: 'Operational lead focused on partnerships and growth.'
    },
    {
      img: ParisImg,
      name: 'Maya Singh',
      role: 'Co-Founder & CPO',
      desc: 'Product and customer experience champion.'
    }
  ]

  return (
    <main className="max-w-7xl mx-auto p-6 pt-10 md:pt-16 space-y-12">
      <section className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-sm font-semibold text-red-600">ABOUT TRIPBUDDY</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Travel Smarter. Explore More.</h1>
          <p className="mt-4 text-lg text-slate-700">TripBuddy is a modern travel platform that helps travelers discover destinations, explore hotels, read travel stories, save favorites, and plan memorable trips.</p>
          <div className="mt-6 space-y-3">
            <div>
              <h4 className="font-semibold text-slate-900">Mission</h4>
              <p className="text-slate-700">To make travel discovery and trip planning simple, inspiring, and accessible for everyone.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Vision</h4>
              <p className="text-slate-700">A world where travelers can easily find meaningful experiences, trusted stays, and curated stories to fuel their journeys.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">What We Provide</h4>
              <p className="text-slate-700">Destination discovery, hotel listings with details, travel blogs for inspiration, and simple tools to save favorites and plan your next trip.</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img src={TopBannerImg} alt="Collage of travel destinations" className="w-full h-72 md:h-96 object-cover rounded-lg shadow-md transform hover:scale-105 transition-transform duration-500" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-slate-900">Why Choose TripBuddy</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Feature icon={FaGlobeAmericas} title="Easy Hotel Discovery" desc="Search and filter hotels by destination, view details, and compare options quickly." />
          <Feature icon={FaLightbulb} title="Curated Travel Inspiration" desc="Browse travel stories and curated content to plan memorable trips." />
          <Feature icon={FaHeart} title="Simple Favorites" desc="Save hotels to your favorites and access them across sessions." />
          <Feature icon={FaRegClock} title="Easy Trip Planning" desc="Quick access to hotel details and travel blogs to plan efficiently." />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-slate-900">Meet Our Team (Demo Profiles)</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((t) => (
            <PersonCard key={t.name} img={t.img} name={t.name} role={t.role} desc={t.desc} socials={<></>} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-slate-900">Our Co-Founders (Demo Profiles)</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {cofounders.map((c) => (
            <PersonCard key={c.name} img={c.img} name={c.name} role={c.role} desc={c.desc} socials={<></>} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-slate-900">Investor & Partner Network</h2>
        <p className="text-sm text-slate-600 mb-4">Illustrative project content — partners shown for this demonstration.</p>
        <div className="flex flex-wrap gap-4">
          <div className="px-4 py-2 bg-white rounded shadow-sm">Horizon Ventures</div>
          <div className="px-4 py-2 bg-white rounded shadow-sm">TravelTech Partners</div>
          <div className="px-4 py-2 bg-white rounded shadow-sm">Global Journey Fund</div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-slate-900">Demo Project Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded shadow-sm">
            <div className="text-2xl font-bold text-slate-900">50+</div>
            <div className="text-sm text-slate-600">Destinations</div>
          </div>
          <div className="text-center p-6 bg-white rounded shadow-sm">
            <div className="text-2xl font-bold text-slate-900">10K+</div>
            <div className="text-sm text-slate-600">Travel Stories</div>
          </div>
          <div className="text-center p-6 bg-white rounded shadow-sm">
            <div className="text-2xl font-bold text-slate-900">100+</div>
            <div className="text-sm text-slate-600">Hotels</div>
          </div>
          <div className="text-center p-6 bg-white rounded shadow-sm">
            <div className="text-2xl font-bold text-slate-900">24/7</div>
            <div className="text-sm text-slate-600">Travel Support</div>
          </div>
        </div>
      </section>

      <section className="text-center py-12 bg-gradient-to-r from-white to-slate-50 rounded-lg">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-slate-900">Ready to Plan Your Next Journey?</h3>
        <div className="flex justify-center gap-4">
          <Link to="/hotels" className="px-6 py-3 bg-red-500 text-white rounded shadow hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-300">Explore Hotels</Link>
          <Link to="/blogs" className="px-6 py-3 border border-red-500 text-red-500 rounded hover:bg-red-50 transition focus:outline-none focus:ring-2 focus:ring-red-100">Read Travel Blogs</Link>
        </div>
      </section>
    </main>
  )
}

export default About

