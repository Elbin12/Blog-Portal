import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProtected from './UserProtected';
import HomePage from '../Pages/User/HomePage';
import Profilepage from '../Pages/User/Profilepage';
import CreateBlogPage from '../Pages/User/CreateBlogPage';
import BlogsListingPage from '../Pages/User/BlogsListingPage';
import BlogDetailsPage from '../Pages/User/BlogDetailsPage';
import BlogEditPage from '../Pages/User/BlogEditPage';

function UserRoutes() {
  return (
    <Routes>
        <Route path='' element={<UserProtected>< HomePage/></UserProtected>}/>
        <Route path='/profile' element={<UserProtected>< Profilepage/></UserProtected>}/>
        <Route path='/blog/create' element={<UserProtected>< CreateBlogPage/></UserProtected>}/>
        <Route path='/blog/edit' element={<UserProtected>< BlogEditPage/></UserProtected>}/>
        <Route path='/blogs' element={<UserProtected>< BlogsListingPage/></UserProtected>}/>
        <Route path='/blog/:id' element={<UserProtected>< BlogDetailsPage/></UserProtected>}/>
    </Routes>
  )
}

export default UserRoutes
