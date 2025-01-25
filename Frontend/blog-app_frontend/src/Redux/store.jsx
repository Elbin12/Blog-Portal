import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'; 
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from '../Features/User/UserSlice';
import adminReducer from '../Features/Admin/AdminSlice';

// const userPersistConfig = {
//   key: 'user',
//   storage,
//   whitelist: ['accessToken', 'refreshToken', 'userDetails'],
// };

// const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// const rootReducer = combineReducers({
//   user: persistedUserReducer,
//   admin: adminReducer,
// });

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoreActions: ['persist/PERSIST', 'persist/REHYDRATE'],
//       },
//     }),
// });

// export const persistor = persistStore(store);

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
});

export default store;