import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiCamera } from "react-icons/ci";
import { MdOutlineModeEditOutline } from "react-icons/md";

function Profile() {

    const userDetails = useSelector(state=>state.user.userDetails)

    const [img, setImg] = useState();

    const inputRef = useRef();
    const dispatch = useDispatch();

    const handleImg = (e)=> {
        console.log( e.target.files[0], 'file')
        const file = e.target.files[0]
        if(file){
            const cachedURL = URL.createObjectURL(file);
            setImg(cachedURL);
        }
    }

  return (
    <div className='h-screen bg-stone-100'>
      <div className='p-24 bg-gray-300 flex gap-4 items-center'>
        <div className='bg-white w-36 h-36 rounded-full flex justify-center items-center'>
            <input type="file" className='hidden' ref={inputRef} onChange={handleImg}/>
            {userDetails?.user_profile?.profile_img?
                <img src={userDetails?.user_profile?.profile_img} alt="" className='w-11 h-11 object-cover rounded-full'/>
                : img?
                <>
                    <img src={img} alt="" className='w-full h-full object-cover rounded-full'/>
                    <div className='fixed text-3xl opacity-0 rounded-full w-36 flex items-center justify-center h-36 bg-black bg-opacity-50 text-white hover:opacity-100 transition-opacity duration-300 cursor-pointer' onClick={()=>{inputRef.current.click()}}>
                        <MdOutlineModeEditOutline/>
                    </div>
                </>
                :
                <div className='flex flex-col items-center cursor-pointer' onClick={()=>{inputRef.current.click()}}>
                    <CiCamera className='text-4xl text-stone-700'/>
                </div>
            }
        </div>
        <div>
            <h1 className='text-5xl'>{userDetails?.user_profile?.first_name}Elbin Shiby</h1>
            <p className='mt-1 text- underline pl-1 cursor-pointer hover:text-stone-700 font-semibold'>Edit Profile</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
