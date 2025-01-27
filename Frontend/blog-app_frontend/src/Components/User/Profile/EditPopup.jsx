import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import InputBox from './InputBox';
import { useDispatch, useSelector } from 'react-redux';
import { profileUpdate } from '../../../Features/User/UserActions';

function EditPopup({setPopup}) {
    
    const userDetails = useSelector(state=>state.user.userDetails)
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(userDetails? userDetails?.user_profile?.first_name : '');
    const [lastName, setLastName] = useState(userDetails? userDetails?.user_profile?.last_name : '');
    const [email, setEmail] = useState(userDetails? userDetails?.email : '');

    console.log(email, firstName, lastName, 'lee', userDetails?.email, userDetails.id, typeof(userDetails), userDetails)

    const handleSubmit = ()=> {
      const data = {
          first_name: firstName,
          last_name: lastName,
          email:email,
      }
      console.log('ll');
      
      dispatch(profileUpdate(data));
    }


  return (
    <div className='fixed inset-0 flex justify-center h-screen w-full'>
      <div className='w-[25rem] h-full bg-lime-900 bg-opacity-60 p-2'>
        <div className="flex justify-end">
            <button className="text-gray-300 hover:text-gray-700 transition-colors">
                <IoMdClose className="text-3xl" onClick={()=>setPopup('')}/>  
            </button>
        </div>
        <div className='px-4 space-y-24'>
            <h1 className='text-white font-semibold text-3xl pt-16'>Edit Profile</h1>
            <div className='px-4 space-y-9'>
                <InputBox Name={'First Name'} handler={setFirstName} curr={firstName}/>
                <InputBox Name={'Last Name'} handler={setLastName} curr={lastName}/>
                {/* <InputBox Name={'Email'} curr={email} handler={setEmail}/> */}
            </div>
        </div>
        <div className='bg-lime-700 mt-24 text-center py-2 cursor-pointer hover:bg-lime-900 rounded-lg mx-6' onClick={handleSubmit}>
          <h1 className='text-lg text-white' >Save Changes</h1>
        </div>
      </div>
    </div>
  )
}

export default EditPopup
