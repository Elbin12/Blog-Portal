import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { blogList } from '../../../Features/User/UserActions';

function BlogList() {

  const dispatch = useDispatch();

  useEffect(()=>{
    console.log('kk');
    
    dispatch(blogList())
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default BlogList
