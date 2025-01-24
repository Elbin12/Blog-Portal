import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Features/User/UserSlice';
import adminReducer from '../Features/Admin/AdminSlice';

export const store = configureStore({
    reducer: {
      user: userReducer,
      admin: adminReducer,
    },
});

export default store;