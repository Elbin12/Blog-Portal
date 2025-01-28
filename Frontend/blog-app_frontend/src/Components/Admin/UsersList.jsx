import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { users } from '../../Features/Admin/AdminActions';
import { IoIosArrowDroprightCircle } from "react-icons/io";

function UsersList() {

    const usersList = useSelector(state=>state.admin?.users);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log('llj')
        dispatch(users())
    }, [])

    console.log(usersList, 'users')
  return (
    <div className='px-28 pt-11 bg-stone-50 h-screen'>
      <div>
        <div className='w-3/5 border-r border-neutral-400'>
          <h1 className='text-4xl mb-9'>Users</h1>
          <div className='grid grid-cols-2 space-y-2 space-x-4 px-2 pr-5'>
            {usersList &&
              usersList?.map((user, index)=>(
                  <div className='shadow-xl bg-white rounded flex items-center justify-between gap-2'>
                    <div className='flex gap-2 pl-6 py-5'>
                      <div className='w-20 h-20 rounded-full overflow-hidden'>
                        <img src={user?.user_profile?.profile_pic} alt="" className='w-full h-full object-cover'/>
                      </div>
                      <div className=''>
                        <h1 className='text-xl font-thin'>{user?.user_profile? user?.user_profile?.first_name +' '+ user?.user_profile?.last_name : 'No Profile' }</h1>
                        <h1 className='font-semibold text-stone-600'>{user?.email}</h1>
                      </div>
                    </div>
                    <div className='bg-lime-700 hover:bg-lime-900 h-full px-1 flex items-center cursor-pointer'>
                      <IoIosArrowDroprightCircle className='text-white text-2xl hover:text-lime-50'/>
                    </div>
                  </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersList
