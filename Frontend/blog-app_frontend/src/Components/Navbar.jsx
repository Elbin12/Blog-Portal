import React, { useState } from 'react'
import Signup from './Signup';

function Navbar() {
    const [activePopup, setActivePopup] = useState('');
  return (
    <>  
        {activePopup === 'signup' && <Signup setActivePopup={setActivePopup}/>}
        <div className='bg-white shadow-md w-full h-20 flex justify-between items-center px-11'>
            <h1 className='cursor-pointer font-semibold'>BLOG APPLICATION</h1>
            <div>
                <button className='bg-lime-800 text-white px-6 py-2 rounded-full text-sm font-semibold' onClick={()=>setActivePopup('signup')}>Get started</button>
            </div>
        </div>
    </>
  )
}

export default Navbar
