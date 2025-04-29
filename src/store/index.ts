import { configureStore } from '@reduxjs/toolkit';
import taskListSlice from './taskListSlice';
import authReducer from './authSlice';
import { setupInterceptors } from '../api/interceptors';

export const store = configureStore({
  reducer: { taskList: taskListSlice.reducer, auth: authReducer },
});

setupInterceptors(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
