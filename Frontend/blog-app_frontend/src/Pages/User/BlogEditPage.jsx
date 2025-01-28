import React from 'react'
import Navbar from '../../Components/User/Navbar/Navbar'
import CreateBlog from '../../Components/User/Blog/CreateBlog'

function BlogEditPage() {
  return (
    <>
        <Navbar />
        <CreateBlog mode={'edit'}/>
    </>
  )
}

export default BlogEditPage
