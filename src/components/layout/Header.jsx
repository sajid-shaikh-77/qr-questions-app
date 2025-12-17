import { Moon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='flex items-center justify-between w-full px-6 py-4 bg-white shadow'>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full text-white">
          <Moon className="w-5 h-5" color='#0f766e' fill='#0f766e' size={34} />
        </div>
        <div>
          <h1 className="text-lg font-semibold">Quran Circle — Ask</h1>
          <p className="text-xs text-gray-500">Submit questions anonymously — Admin only</p>
        </div>
      </div>
      <nav className='flex items-ceter gap-4'>
        <Link to={'/'} className='text-sm font-medium  flex items-center gap-1 text-[#0f766e]'>Home</Link>
        <Link to={'/admin-login'} className='text-sm font-medium  flex items-center gap-1 text-[#0f766e]'>Admin</Link>
      </nav>
    </header>
  )
}

export default Header