import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signin from '../Components/Admin/Signin';
import AdminProtected from './AdminProtected';
import HomePage from '../Pages/Admin/HomePage';
import UsersListingPage from '../Pages/Admin/UsersListingPage';

function AdminRoutes() {
  return (
    <Routes>
        <Route path='' element={< Signin/>}/>
        <Route path='/home' element={<AdminProtected>< HomePage/></AdminProtected>}/>
        <Route path='/users' element={<AdminProtected>< UsersListingPage/></AdminProtected>}/>
    </Routes>
  )
}

export default AdminRoutes
