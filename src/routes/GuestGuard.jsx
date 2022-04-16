import React from 'react'
import { Navigate } from 'react-router-dom'

// configs
import { PATH_NAME } from '../configs'

// helpers
import authStorage from '../helpers/authStorage';

function GuestGuard({ children }) {
    const isAuth = authStorage.isAuthenticated();

    if (isAuth) return <Navigate to={PATH_NAME.ROOT} />
    
    return <>{children}</>
}

export default GuestGuard