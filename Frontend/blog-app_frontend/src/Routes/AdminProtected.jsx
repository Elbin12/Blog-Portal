import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminProtected({children}) {

    const adminDetails = useSelector(state=>state.admin.adminDetails);
    const navigate = useNavigate();

    useEffect(()=>{
        if (adminDetails===undefined || adminDetails === null || adminDetails===''){
            navigate('/admin/')
        }
    })

  return children
}

export default AdminProtected