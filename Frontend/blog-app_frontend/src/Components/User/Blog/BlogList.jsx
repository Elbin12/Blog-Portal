import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blogList } from '../../../Features/User/UserActions';
import { BiDislike, BiLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function BlogList({blogs}) {

  const navigate = useNavigate();



  console.log(blogs,typeof(blogs), 'kk')
  return (
    <div className=' px-56 py-9'>
      <div className='space-y-6'>
        {blogs?.map((blog, index)=>(
          <div key={index} className='flex flex-col gap-3 w-3/4 border-b py-2 cursor-pointer' onClick={()=>navigate(`/blog/${blog?.id}`)}>
            <div className='flex w-full gap-9 justify-between'>
              <div className='space-y-2'>
                <h1 className='text-4xl font-bold'>{blog?.heading?.length > 60 ? `${blog.heading.slice(0, 60)} ...` : blog?.heading}</h1>
                <h1 className='text-2xl font-semibold text-neutral-700'>{blog?.sub_heading}</h1>
                <p className='text-sm'>{blog?.body?.length > 170 ? `${blog.body.slice(0, 170)} ...` : blog?.body}</p>
              </div>
              <div className='min-w-[15rem] max-w-[15rem]  h-36 p-3 overflow-hidden'>
                <img src={blog.image} alt="" className='w-full h-full object-cover'/>
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='flex items-center gap-1'>
                <BiLike className='text-lg'/>
                <p className='text-gray-600'>{blog?.like_count}</p>
              </div>
              <div className='flex items-center gap-1'>
                <BiDislike className='text-lg'/>
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
