import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userBlock, userDetails, users } from '../../Features/Admin/AdminActions';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { BiDislike, BiLike } from 'react-icons/bi';
import { FaComment } from 'react-icons/fa';

function UsersList() {

    const usersList = useSelector(state=>state.admin?.users);
    const selectedUser = useSelector(state=>state.admin?.selectedUser)

    const dispatch = useDispatch();

    useEffect(()=>{
        console.log('llj')
        dispatch(users())
    }, [])

    console.log(usersList, 'users')
  return (
    <div className='px-28 pt-24'>
      <div className='flex gap-9'>
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
                    <div className='bg-lime-700 hover:bg-lime-900 h-full px-1 flex items-center cursor-pointer' onClick={()=>dispatch(userDetails(user.id))}>
                      <IoIosArrowDroprightCircle className='text-white text-2xl hover:text-lime-50'/>
                    </div>
                  </div>
              ))
            }
          </div>
        </div>
        {selectedUser&&
          <div className='pt-9 space-y-5 w-2/5'>
            <div className='space-y-5'>
              <h1 className='text-4xl text-neutral-700'>Profile of {selectedUser?.user_profile?.first_name}</h1>
              <div className='px-4 flex w-full gap-4'>
                <div className='w-1/2 border-r'>
                  <div className='w-20 h-20 rounded-full overflow-hidden'>
                    <img src={selectedUser?.user_profile?.profile_pic} alt="" className='w-full h-full object-cover'/>
                  </div>
                  <div className=''>
                    <h1 className='text-xl font-thin'>{selectedUser?.user_profile? selectedUser?.user_profile?.first_name +' '+ selectedUser?.user_profile?.last_name : 'No Profile' }</h1>
                    <h1 className='font-semibold text-stone-600'>{selectedUser?.email}</h1>
                  </div>
                </div>
                <div className='pt-2 space-y-4'>
                  <div className='flex gap-3'>
                    <h1>Status :</h1>
                    <p className={`font-bold text-lime-500 ${selectedUser?.is_active&&'text-gray-500'}`}>{selectedUser?.is_active? 'Active' : 'Inactive'}</p>
                  </div>
                  <div>
                    <button className='px-6 py-1 bg-lime-50 shadow-md rounded font-semibold' onClick={()=>dispatch(userBlock({'user_id':selectedUser?.id}))}>{selectedUser?.is_active?'Block':'Unblock'}</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <h1 className='text-lg font-semibold'>Blogs</h1>
              <div className='space-y-5'>
                {selectedUser?.user_blog.map((blog, index)=>
                  <div key={index} className='bg-lime-50 px-4 py-3 flex gap-2 items-center cursor-pointer shadow-lg'>
                    <div className='w-11 h-11 rounded-full overflow-hidden'>
                      <img src={blog?.image} alt="" className='w-full h-full object-cover'/>
                    </div>
                    <div className='space-y-0.5'>
                      <div>
                        <h1 className='text-sm font-bold'>{blog?.heading}</h1>
                        <h1 className='text-xs font-semibold text-gray-800'>{blog?.sub_heading}</h1>
                      </div>
                      <p className='text-[12px]'>{blog?.body.slice(0, 70)}</p>
                      <div className='flex gap-2'>
                        <div className='flex items-center gap-1 text-xs'>
                          <BiLike />
                          <p className='text-gray-600'>{blog?.like_count}</p>
                        </div>
                        <div className='flex items-center gap-1 text-xs'>
                          <BiDislike />
                          <p className='text-gray-600'>{blog?.unlike_count}</p>
                        </div>
                        <div className='flex items-center gap-1 text-xs cursor-pointer'>
                          <FaComment className='text-stone-700'/>
                          <p className='text-gray-600'>{blog?.comments_count}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default UsersList
