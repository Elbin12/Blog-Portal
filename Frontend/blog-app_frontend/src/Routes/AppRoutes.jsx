import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UserRoutes from './UserRoutes';

function AppRoutes() {
  return (
    <Router>
        <Routes>
            <Route path='/*' element={<UserRoutes />}/>
        </Routes>
    </Router>
  )
}

export default AppRoutes
