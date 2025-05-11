import { configureStore } from '@reduxjs/toolkit';
import taskListSlice from './taskListSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import { setupInterceptors } from '../api/interceptors';

export const store = configureStore({
  reducer: {
    taskList: taskListSlice.reducer,
    auth: authReducer,
    user: userReducer,
  },
});

setupInterceptors(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
