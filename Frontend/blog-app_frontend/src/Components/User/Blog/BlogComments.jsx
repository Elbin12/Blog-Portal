import React, { useState } from 'react'
import { FaComments } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../../Features/User/UserActions';

function BlogComments({blog}) {

    const [comment, setComment] = useState();

    const user = useSelector(state=>state.user.userDetails)
    const dispatch = useDispatch()

    console.log(user, 'from comments', blog)

    const handleSubmit = ()=> {
        const data = {
            'comment': comment,
            'blog_id': blog?.id
        }
        dispatch(createComment(data));
        setComment('');
    }

    function timeAgo(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
    
        const timeIntervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };
    
        for (const [unit, seconds] of Object.entries(timeIntervals)) {
            const interval = Math.floor(diffInSeconds / seconds);
            if (interval > 0) {
                return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
            }
        }
    
        return "Just now";
    }

  return (
    <div className='px-3 space-y-2'>
        <div className='flex gap-2 items-center text-neutral-600'>
            <FaComments className='text-2xl'/>
            <h1 className='text-lg font-semibold'>All comments</h1>
        </div>
        <div className='rounded-lg flex'>
            <div className=' w-full px- py-4 space-y-3'>
                {user&&
                    <div className='bg-white rounded-lg py-6 px-4 shadow-lg space-y-2'>
                        <div className='flex items-center gap-2'>
                            <img src={user?.user_profile?.profile_pic} alt="" className='w-9 h-9 object-cover rounded-full'/>
                            <h1 className='font-semibold'>{user?.user_profile?.first_name} {user?.user_profile?.last_name}</h1>
                        </div>
                        <textarea name="" id="" placeholder='What are your thoughts?' className='p-2 w-full outline-none bg-transparent rounded' onChange={(e)=>setComment(e.target.value)}></textarea>
                        <div className='w-full text-end'>
                            <button className='py-1 px-4 bg-lime-600 rounded-full text-white font-semibold' onClick={handleSubmit}>Respond</button>
                        </div>
                    </div>
                }
                {blog?.comments?.map((comment, index)=>(
                    <div className='space-y-6 py-4 px-9 '>
                        <div className='space-y-4'>
                            <div className='flex gap-3'>
                                <img src={comment?.user?.user_profile?.profile_pic} alt="" className='w-11 h-11 object-cover rounded-full'/>
                                <div>
                                    <h1 className='font-semibold'>{comment?.user?.user_profile?.first_name} {comment?.user?.user_profile?.last_name}</h1>
                                    <p className='text-sm text-gray-500 '>{timeAgo(comment?.created_at)}</p>
                                </div>
                            </div>
                            <p className='font-medium px-14'>{comment?.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default BlogComments
