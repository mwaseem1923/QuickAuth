import { createSlice } from '@reduxjs/toolkit';
import { removeToken } from '../utils/tokenUtils';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
            removeToken();
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
