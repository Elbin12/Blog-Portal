import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminSignin } from '../../Features/Admin/AdminActions';
import { toast } from 'sonner';
import { resetErrors } from '../../Features/Admin/AdminSlice';
import { useNavigate } from 'react-router-dom';

function Signin() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const error = useSelector(state=>state.admin.error)
  const success = useSelector(state=>state.admin.success)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(error){
      console.log('errrer')
      toast.error(error)
    }
    if(success){
      toast.success('Sign in successfull');
      navigate('/admin/home');
    }
    dispatch(resetErrors())
  }, [success, error])

  const handleSubmit = ()=> {
    const data = {
      email,
      password
    }
    dispatch(adminSignin(data))
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-neutral-100'>
      <div className='bg-lime-50 flex flex-col gap-9 w-1/4 px-9 py-16 shadow-lg rounded'>
        <h1 className='text-4xl'>Sign In</h1>
        <div className='space-y-4'>
            <div className='flex flex-col'>
                <label>Email</label>
                <input type="email" className='outline-none border focus:border-2 py-1 px-2 rounded bg-transparent border-black' onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className='flex flex-col'>
                <label>Password</label>
                <input type="password"  className='outline-none border focus:border-2 py-1 px-2 rounded bg-transparent border-black' onChange={(e)=>setPassword(e.target.value)}/>
            </div>
        </div>
        <button className='bg-lime-700 py-2 rounded-full text-white font-semibold hover:bg-lime-800' onClick={handleSubmit}>Sign In</button>
      </div>
    </div>
  )
}

export default Signin
