import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UserRoutes from './UserRoutes';
import Signin from '../Components/Admin/Signin';

function AdminRoutes() {
  return (
    <Routes>
        <Route path='' element={< Signin/>}/>
    </Routes>
  )
}

export default AdminRoutes
