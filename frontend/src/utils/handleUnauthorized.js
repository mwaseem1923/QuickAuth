import { logout } from '../slices/userSlice';

const handleUnauthorized = (error, dispatch) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('authToken');
        dispatch(logout());
        window.location.href = '/login';
    } else {
        console.error('An unexpected error occurred:', error);
        alert('An unexpected error occurred');
    }
};

export default handleUnauthorized;
