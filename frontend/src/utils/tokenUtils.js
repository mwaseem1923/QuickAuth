export const setToken = (token) => {
    const expiryTime = new Date().getTime() + 5 * 60 * 1000; // 5 minutes from now
    localStorage.setItem('authToken', token);
    localStorage.setItem('tokenExpiry', expiryTime);
};

export const getToken = () => localStorage.getItem('authToken');
export const getTokenExpiry = () => parseInt(localStorage.getItem('tokenExpiry'));
export const isTokenExpired = () => {
    const expiryTime = getTokenExpiry();
    return !expiryTime || new Date().getTime() > expiryTime;
};

export const removeToken = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
};
