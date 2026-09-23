import Navbar from './Components/Navbar/Navbar'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Hotels from './Pages/Hotels'
import HotelDetail from './Pages/HotelDetail'
import Favorites from './Pages/Favorites'
import Blogs from './Pages/Blogs'
import BlogDetail from './Pages/BlogDetail'
import Footer from './Components/Footer'
import ScrollToTop from 'react-scroll-to-top'

const router = createBrowserRouter([
  {
    path: '/',
    element: <><Navbar /><Home /><Footer /></>
  },
  {
    path: '/hotels',
    element: <><Navbar /><Hotels /><Footer /></>
  },
  {
    path: '/hotels/:hotelId',
    element: <><Navbar /><HotelDetail /><Footer /></>
  },
  {
    path: '/favorites',
    element: <><Navbar /><Favorites /><Footer /></>
  },
  {
    path: '/blogs',
    element: <><Navbar /><Blogs /><Footer /></>
  },
  {
    path: '/blogs/:blogId',
    element: <><Navbar /><BlogDetail /><Footer /></>
  },
  {
    path: '/about',
    element: <><Navbar /><About /><Footer /></>
  },
  {
    path: '*',
    element: <Navigate to='/' replace />
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router}/>
      <ScrollToTop color='white' smooth style={{backgroundColor:'#EF4444', display:'flex', alignItems:'center', justifyContent:'center'}}/>
    </>
  )
}

export default App
