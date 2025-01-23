import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProtected from './UserProtected';
import HomePage from '../Pages/HomePage';
import Profilepage from '../Pages/Profilepage';

function UserRoutes() {
  return (
    <Routes>
        <Route path='' element={<UserProtected>< HomePage/></UserProtected>}/>
        <Route path='/profile/' element={<UserProtected>< Profilepage/></UserProtected>}/>
    </Routes>
  )
}

export default UserRoutes
