import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { blogDetails, updateInteractions } from '../../../Features/User/UserActions';
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike  } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import BlogComments from './BlogComments';

function BlogDetail() {

    const { id } = useParams();
    const dispatch = useDispatch();

    const blog = useSelector(state => state.user.selectedBlog)

    useEffect(()=>{
        dispatch(blogDetails(id))
    }, [])

    console.log(blog, 'blog', blog?.heading)

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year:'numeric'
        })
      }

    const handleLike = ()=> {
      const data = {
        'blog_id' : blog?.id,
        'is_liked': blog?.is_liked? false : true,
        'is_disliked':blog?.is_disliked===null?false:blog?.is_disliked&& false,
      }
      dispatch(updateInteractions(data));
    }

    const handleDisike = ()=> {
      const data = {
        'blog_id' : blog?.id,
        'is_liked': blog?.is_liked===null?false:blog?.is_liked&& false,
        'is_disliked':blog?.is_disliked? false:true,
      }
      dispatch(updateInteractions(data));
    }

  return (
    <div className='px-36 py-6 pt-24'>
      <div className='space-y-9'>
        <div className='flex items-center justify-between pr-11'>
          <div className='space-y-6 '>
            <h1 className='text-6xl font-semibold'>{blog?.heading}</h1>
            <h1 className='text-5xl text-neutral-800'>{blog?.sub_heading}</h1>
          </div>
          <div className='flex flex-col items-end w-1/4'>
            <div className='flex items-center py-1 gap-2 cursor-pointer'>
                <img src={blog?.user?.user_profile?.profile_pic} alt="" className='w-9 h-9 rounded-full object-cover'/>
                <h1 className='text- rounded-full'>{blog?.user?.user_profile?.first_name} {blog?.user?.user_profile?.last_name}</h1>
            </div>
            <p className='text-sm font-semibold text-gray-600'>Published in {formatDate(blog?.created_at)}</p>
          </div>
        </div>
        <div className='text-lg flex gap-4 border-b border-t border-gray-100 py-1'>
          <div className='flex items-center gap-1 cursor-pointer' onClick={handleLike}>
            {blog?.is_liked?
              <BiSolidLike className='text-lg text-lime-500'/>
              :
              <BiLike  className='text-lg'/>
            }
            <p className='text-gray-600'>{blog?.like_count}</p>
          </div>
          <div className='flex items-center gap-1 cursor-pointer' onClick={handleDisike}>
            {blog?.is_disliked?
              <BiSolidDislike className='text-lg text-gray-500'/>
              :
              <BiDislike/>
            }
            <p className='text-gray-600'>{blog?.unlike_count}</p>
          </div>
          <div className='flex items-center gap-1 cursor-pointer'>
            <FaComment className='text-lg text-stone-700'/>
            <p className='text-gray-600'>{blog?.comments_count}</p>
          </div>
        </div>
        <div className='space-y-5'>
            <div className='w-full h-[35rem] flex justify-center overflow-hidden'>
                <img src={blog?.image} alt="" className='object-cover w-3/4'/>
            </div>
            <p>{blog?.body}</p>
        </div>
        <BlogComments blog={blog&&blog}/>
      </div>
    </div>
  )
}

export default BlogDetail
