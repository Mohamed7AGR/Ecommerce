import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
   <>
   
    <div className='min-h-screen flex flex-col justify-between'>
    <Navbar/>
    
   <div className="flex-grow container px-7">
   <Outlet/>
   </div>
    
    <Footer/>
      
    </div>
   </>
  )
}
