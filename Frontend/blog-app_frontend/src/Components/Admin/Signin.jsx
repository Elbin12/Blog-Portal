import React from 'react'

function Signin() {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-neutral-100'>
      <div className='bg-lime-50 flex flex-col gap-9 w-1/4 px-9 py-16 shadow-lg rounded'>
        <h1 className='text-4xl'>Sign In</h1>
        <div className='space-y-4'>
            <div className='flex flex-col'>
                <label>Email</label>
                <input type="email" className='outline-none border focus:border-2 py-1 px-2 rounded bg-transparent border-black'/>
            </div>
            <div className='flex flex-col'>
                <label>Password</label>
                <input type="password"  className='outline-none border focus:border-2 py-1 px-2 rounded bg-transparent border-black'/>
            </div>
        </div>
        <button className='bg-lime-700 py-2 rounded-full text-white font-semibold hover:bg-lime-800'>Sign In</button>
      </div>
    </div>
  )
}

export default Signin
