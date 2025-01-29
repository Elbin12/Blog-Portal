import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  
  const navigate = useNavigate();

  return (
    <div className='fixed w-full z-20 h-20 px-11 shadow-lg flex items-center justify-between'>
      <h1 className='text-2xl cursor-pointer' onClick={()=>navigate('/admin/home')}>Blog Admin</h1>
      <div className='flex gap-4'>
        <div className='cursor-pointer' onClick={()=>navigate('/admin/users')}>
          <h1 className={`text-xl ${window.location.pathname.includes('user') && 'underline'}`}>Users</h1>
        </div>
        <div className='cursor-pointer'>
          <h1 className='text-xl'>Blogs</h1>
        </div>
      </div>
    </div>
  )
}

export default Navbar
