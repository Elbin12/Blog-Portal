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
      <div>
        {blogs?.map((blog, index)=>(
          <div key={index} className='flex flex-col gap-3 w-3/4 border-b py-2 cursor-pointer' onClick={()=>navigate(`/blog/${blog?.id}`)}>
            <div className='flex w-full gap-9 justify-between'>
              <div className='space-y-2'>
                <h1 className='text-5xl'>{blog?.heading}</h1>
                <h1 className='text-3xl'>{blog?.sub_heading}</h1>
                <p className='text-lg'>{blog?.body} bf</p>
              </div>
              <div className='w-1/4 p-3'>
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
