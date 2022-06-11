
import React from 'react'
import { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'
import httpRequest from '../services/httpRequest';

// configs
import { PATH_NAME } from '../configs'

// helpers
import authStorage from '../helpers/authStorage';

function AuthGuard({ children }) {
    const navigate = useNavigate();
    const accessToken = authStorage.getStorage();
    const isAuth = authStorage.isAuthenticated();
    

    const checkAuthenticate = async () => {
        try {
            const res = await httpRequest.post("/user/auth", {}, {
                headers: {
                    'x-auth-token': accessToken
                }
            });
            const user = res.data?.data?.user;
            console.log('res: ', user)
        } catch(error) {
            authStorage.clearStorage()
            navigate(PATH_NAME.LOGIN)
        }
    }

    useEffect(() => {
        checkAuthenticate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!isAuth) return <Navigate to={PATH_NAME.LOGIN} />
    
    return <>{children}</>
}

export default AuthGuard