import React, { useEffect } from 'react';
import Navbar from '../../Components/User/Navbar/Navbar';
import BlogList from '../../Components/User/Blog/BlogList';
import { useDispatch, useSelector } from 'react-redux';
import { allBLogs } from '../../Features/User/UserActions';


function HomePage() {
    const dispatch = useDispatch();
  
    const blogs = useSelector(state=> state?.user?.allBlogs)
  
    useEffect(()=>{
      console.log('kk');
      
      dispatch(allBLogs())
    }, [])

    console.log(blogs, 'lkkk')
  return (
    <>
        <Navbar />
        <BlogList blogs={blogs}/>
    </>
  )
}

export default HomePage
