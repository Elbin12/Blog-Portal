import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import {useDispatch, useSelector} from 'react-redux';
import { signup } from '../../Features/User/UserActions';
import { axiosInstance } from '../../axios';
import { toast } from 'sonner';
import { resetErrors } from '../../Features/User/UserSlice';

function Signup({setActivePopup}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [err, setErr] = useState();

  const [shwPswrdInpts, setShwPswrdInpts] = useState(false);

  const success = useSelector(state=>state.user.success)
  const error = useSelector(state=>state.user.error)

  const dispatch = useDispatch();

  const handleEmail = (e)=>{
    setEmail(e.target.value);
    setShwPswrdInpts(false);
  }

  useEffect(()=>{
    if(error){
      console.log('errrer')
      toast.error(error)
    }
    if(success){
      toast.success('sign up successfull');
      setActivePopup('');
    }
    
    dispatch(resetErrors())
  }, [success, error])

  const handleNext = ()=>{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email){
      setErr("Enter an email");
      return
    }else if (!email.match(validRegex)){
      setErr('Please give valid email.')
      return; 
    }else if (!shwPswrdInpts && email){
      setShwPswrdInpts(true);
    }else{
      if(!password || !confirmPassword){
        setErr('Please enter your password')
      }else if(password !== confirmPassword){
        setErr('Both passwords should same');
      }else{
        const data = {
          email : email,
          password: password,
        }
        dispatch(signup(data));
      }
    }
  }

  return (
    <div className='fixed h-screen w-screen z-20 bg-[#5454548f]'>  
      <div className='w-full mt-24 flex justify-center'>
        <div className='w-1/3 h-full bg-white rounded-lg p-3 shadow-2xl'>
          <div className="flex justify-end">
            <button className="text-gray-500 hover:text-gray-700 transition-colors" onClick={()=>setActivePopup('')}>
              <IoMdClose className="text-2xl"/>  
            </button>
          </div>
          <div className='flex flex-col gap-14 px-4 py-9 items-center'>
            <h1 className='text-3xl'>Sign up with email</h1>
            <div className='w-3/4'>
              <h1 className='mb-1 text-base font-semibold text-gray-900'>Your Email</h1>
              <input type="email" className='outline-none border text-center py-2 w-full rounded mb-4' onChange={handleEmail}/>
              {shwPswrdInpts &&
                <div>
                  <h1 className='mb-1 text-xs font-semibold text-gray-900'>Password</h1>
                  <input type="password" className='outline-none border px-2 py-2 w-full rounded mb-2' onChange={(e)=>{setPassword(e.target.value)}}/>
                  <h1 className='mb-1 text-xs font-semibold text-gray-900'>Confirm password</h1>
                  <input type="password" className='outline-none border px-2 py-2 w-full rounded mb-4' onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                </div>
              }
              <div>
                <button className='bg-lime-700 w-full py-1.5 rounded-full text-white font-semibold hover:bg-lime-800' onClick={handleNext}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
