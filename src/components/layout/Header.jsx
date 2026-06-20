import { House, Moon, UserCog } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/prophet.png'

const Header = () => {
  return (
    <header className='flex items-center justify-between w-full px-6 py-4 bg-white shadow'>
      <div className="flex items-center gap-3">
        <div className="rounded-full text-white">
          {/* <Moon  color='#0f766e' fill='#0f766e' className='h-8 w-8' /> */}
          <img src={logo} alt="" srcSet=""className='h-8 w-8' />
        </div>
        <div>
          {/* <h1 className="text-lg font-semibold">Quran Circle — Ask</h1> */}
          <h1 className="text-lg font-semibold">Ask</h1>
          {/* <p className="text-xs text-gray-500">Submit questions anonymously — Admin only</p> */}
          <p className="text-xs text-gray-500">Submit questions anonymously</p>
        </div>
      </div>
      <nav className='flex items-ceter gap-4'>
        {/* <Link to={'/'} className='text-sm font-medium  flex items-center gap-1 text-[#0f766e]'><House />Home</Link> */}
        <Link to={'/admin-login'} className='text-sm font-medium  flex items-center gap-1 text-[#0f766e]'><UserCog />Admin</Link>
      </nav>
    </header>
  )
}

export default Header