import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProtected from './UserProtected';
import HomePage from '../Components/Pages/HomePage';

function UserRoutes() {
  return (
    <Routes>
        <Route path='' element={<UserProtected>< HomePage/></UserProtected>}/>
    </Routes>
  )
}

export default UserRoutes
