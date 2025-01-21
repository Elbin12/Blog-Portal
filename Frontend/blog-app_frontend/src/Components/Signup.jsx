import React from 'react'
import { IoMdClose } from "react-icons/io";


function Signup({setActivePopup}) {
  return (
    <div className='fixed h-screen w-screen bg-[#686767a8]'>  
      <div className='w-full mt-24 flex justify-center'>
        <div className='w-1/3 h-full bg-white rounded-lg px-9 py-6 '>
          <div className="flex justify-end">
            <button className="text-gray-500 hover:text-gray-700 transition-colors" onClick={()=>setActivePopup('')}>
              <IoMdClose className="text-2xl"/>  
            </button>
          </div>
          <div className='flex flex-col gap-14'>
            <h1 className='text-3xl'>Sign up with email</h1>
            <div className='text-center'>
              <h1 className='mb-1 text-base font-semibold text-gray-900'>Your Email</h1>
              <input type="email" className='outline-none border text-center py-2 w-3/4 rounded'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
