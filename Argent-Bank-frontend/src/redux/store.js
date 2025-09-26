import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import userReducer from './userSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
});

export default store;
