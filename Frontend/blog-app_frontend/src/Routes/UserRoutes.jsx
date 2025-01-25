import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProtected from './UserProtected';
import HomePage from '../Pages/User/HomePage';
import Profilepage from '../Pages/User/Profilepage';
import CreateBlogPage from '../Pages/User/CreateBlogPage';

function UserRoutes() {
  return (
    <Routes>
        <Route path='' element={<UserProtected>< HomePage/></UserProtected>}/>
        <Route path='/profile' element={<UserProtected>< Profilepage/></UserProtected>}/>
        <Route path='/create/blog' element={<UserProtected>< CreateBlogPage/></UserProtected>}/>
    </Routes>
  )
}

export default UserRoutes
