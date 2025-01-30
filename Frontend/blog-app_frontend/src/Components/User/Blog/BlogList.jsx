import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";


function BlogList({blogs}) {

  const [editPopup, setEditPopup] = useState('');

  const user = useSelector(state=>state.user.userDetails)
  const navigate = useNavigate();

  console.log(blogs,typeof(blogs), 'kk')
  return (
    <div className=' px-56 py-9 pt-28'>
      <div className='space-y-6'>
        {blogs?.map((blog, index)=>(
          <div key={index} className='flex flex-col gap-3 w-3/4 border-b py-2 cursor-pointer'>
            {user?.id === blog?.user?.id &&
              <div className='flex justify-end w-full '>
                <HiDotsHorizontal onClick={()=>{editPopup===''? setEditPopup(index): setEditPopup('')}}/>
                {editPopup === index && 
                  <div className='fixed mt-4 py-1 rounded space-y-2 w-20 bg-gray-100 shadow-2xl mx-0.5'>
                    <div className='flex gap-1 items-center justify-end w-full pr-3 font-semibold text-neutral-700 hover:text-black' onClick={()=>navigate('/blog/edit', {state:blog})}>
                      <MdOutlineEdit className='text-lg'/>
                      <h1>Edit</h1>
                    </div>
                  </div>
                }
              </div>
            }
            <div className='flex w-full gap-9 justify-between' onClick={()=>navigate(`/blog/${blog?.id}`)}>
              <div className='space-y-2'>
                <h1 className='text-4xl font-bold'>{blog?.heading?.length > 60 ? `${blog.heading.slice(0, 60)} ...` : blog?.heading}</h1>
                <h1 className='text-2xl font-semibold text-neutral-700'>{blog?.sub_heading?.length > 40 ? `${blog.sub_heading.slice(0, 40)} ...` : blog?.sub_heading}</h1>
                <p className='text-sm'>{blog?.body?.length > 170 ? `${blog.body.slice(0, 170)} ...` : blog?.body}</p>
              </div>
              <div className='min-w-[15rem] max-w-[15rem]  h-36 py-3 overflow-hidden'>
                <img src={blog.image} alt="" className='w-full h-full object-cover'/>
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='flex items-center gap-1 text-stone-700'>
                <BiSolidLike className='text-lg'/>
                <p className='text-gray-600'>{blog?.like_count}</p>
              </div>
              <div className='flex items-center gap-1 text-stone-700'>
                <BiSolidDislike className='text-lg'/>
                <p className='text-gray-600'>{blog?.unlike_count}</p>
              </div>
              <div className='flex items-center gap-1 cursor-pointer'>
                <FaComment className='text-lg text-stone-700'/>
                <p className='text-gray-600'>{blog?.comments_count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList
