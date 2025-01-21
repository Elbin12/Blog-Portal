import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from '../Components/Signup';
import Navbar from '../Components/Navbar';

function UserRoutes() {
  return (
    <Routes>
        <Route path='' element={<Navbar />}/>
    </Routes>
  )
}

export default UserRoutes
