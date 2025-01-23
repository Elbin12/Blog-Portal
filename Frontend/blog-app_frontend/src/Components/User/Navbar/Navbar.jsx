import React, { useState } from 'react'
import Signup from '../Signup';
import Signin from '../Signin';
import { useDispatch, useSelector } from 'react-redux';
import { RiAccountCircleFill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import PopupElement from './PopupElement';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from '../../../Features/User/UserSlice';


function Navbar() {
    const [activePopup, setActivePopup] = useState('');
    const userDetails = useSelector(state=>state.user.userDetails)

    const[popup, setPopup] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePopup = ()=>{
      setPopup(()=>{
        return popup? false : true
      })
    }

    const SignOut = () => {
      localStorage.removeItem('AccessToken');
      localStorage.removeItem('RefreshToken');
      localStorage.removeItem('userDetails');
      dispatch(setUserDetails(null));
      setPopup('')
    }

    const navigateTOProfile = ()=> navigate('/profile/')

  return (
    <>  
        {activePopup === 'signup' && <Signup setActivePopup={setActivePopup}/>}
        {activePopup === 'signin' && <Signin setActivePopup={setActivePopup}/>}
        {popup &&
          <div className="fixed right-11 mt-16 w-60 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
            <PopupElement title = 'Profile' icon={BsFillPersonFill} handlerFunction={navigateTOProfile}/>
            <PopupElement title = 'Sign Out' icon={IoLogOut} handlerFunction={SignOut}/>
          </div>
        }
        <div className='bg-white shadow-md w-full h-20 flex justify-between items-center px-11'>
            <h1 className='cursor-pointer font-semibold'>BLOG APPLICATION</h1>
            <div className='flex gap-4 items-center'>
              {userDetails?
                <>
                    <RiAccountCircleFill className='text-4xl cursor-pointer text-lime-700' onClick={handlePopup}/>
                </>
                :
                <>
                  <h1 className='font-semibold cursor-pointer hover:underline' onClick={()=>setActivePopup('signin')}>Sign In</h1>
                  <button className='bg-lime-700 hover:bg-lime-900 text-white px-6 py-2 rounded-full text-sm font-semibold' onClick={()=>setActivePopup('signup')}>Get started</button>
                </>
              }
            </div>
        </div>
    </>
  )
}

export default Navbar
