import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../Features/User/UserActions';

function Signin({setActivePopup}) {
  const [email, setEmail] = useState();
  const [psword, setPswrd] = useState();
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const token = useSelector(state=>state.user.accessToken)
  const loading = useSelector(state=>state.user.loading)

  console.log(token, 'token')

  const handleSubmit = () => {
    if (!email || !psword){
      setError('Email and password are required.');
      return;
    }
    console.log('vannn')
    const data = {
      'email':email,
      'password': psword
    }
    dispatch(signin(data));
  }

  return (
    <div className='fixed h-screen w-screen bg-[#ffffff8f]'>  
      <div className='w-full mt-24 flex justify-center'>
        <div className='w-1/4 h-full bg-white rounded-lg p-3 shadow-2xl'>
            <div className="flex justify-end">
                <button className="text-gray-500 hover:text-gray-700 transition-colors" onClick={()=>setActivePopup('')}>
                    <IoMdClose className="text-2xl"/>  
                </button>
            </div>
            <div className='flex flex-col gap-11 px-6 py-14'>
                <h1 className='text-3xl text-center'>Sign In</h1>
                <div>
                    <h1 className='mb-1 text-sm text-gray-900'>Your Email</h1>
                    <input type="email" className='outline-none border px-2 py-2 w-full rounded mb-4' onChange={(e)=>setEmail(e.target.value)}/>
                    <h1 className='mb-1 text-sm text-gray-900'>Password</h1>
                    <input type="password" className='outline-none border px-2 py-2 w-full rounded mb-0.5' onChange={(e)=>setPswrd(e.target.value)}/>
                    <p className='text-end w-full mb-4 text-xs cursor-pointer hover:underline'>Forgot Password?</p>
                    <div>
                        <button className='bg-lime-700 w-full py-1.5 rounded-full text-white font-semibold hover:bg-lime-800' onClick={handleSubmit}>Sign In</button>
                    </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
