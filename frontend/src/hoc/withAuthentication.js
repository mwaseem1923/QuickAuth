// frontend/src/hoc/withAuthentication.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isTokenExpired } from '../utils/tokenUtils';

const withAuthentication = (WrappedComponent, redirectPath = '/login') => {
    return (props) => {
        const user = useSelector((state) => state.user.user);

        if (isTokenExpired() || !user) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('tokenExpiry');
            return <Navigate to={redirectPath} />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuthentication;
