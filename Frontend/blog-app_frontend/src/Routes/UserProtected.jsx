import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function UserProtected({children}) {

    const userDetails = useSelector(state=>state.user.userDetails);
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (userDetails === null || userDetails === undefined || userDetails === ''){
            navigate('/')
        }
    }, [userDetails])

    return children
}

export default UserProtected