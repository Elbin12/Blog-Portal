import React, { useEffect } from 'react';
import Navbar from '../../Components/User/Navbar/Navbar'
import BlogList from '../../Components/User/Blog/BlogList';
import { blogList } from '../../Features/User/UserActions';
import { useDispatch, useSelector } from 'react-redux';

function BlogsListingPage() {
  const dispatch = useDispatch();

  const blogs = useSelector(state=> state?.user?.blogs)


  useEffect(()=>{
    console.log('kk');
    
    dispatch(blogList())
  }, [])

  return (
    <>
        <Navbar />
        <BlogList blogs={blogs}/>
    </>
  )
}

export default BlogsListingPage
