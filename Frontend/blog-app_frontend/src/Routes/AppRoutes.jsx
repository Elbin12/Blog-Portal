import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UserRoutes from './UserRoutes';
import AdminRoutes from './AdminRoutes';

function AppRoutes() {
  return (
    <Router>
        <Routes>
            <Route path='/*' element={<UserRoutes />}/>
            <Route path='admin/*' element={<AdminRoutes />}/>
        </Routes>
    </Router>
  )
}

export default AppRoutes
