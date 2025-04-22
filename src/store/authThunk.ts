import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../api/api';
import { AuthData, UserRegistration } from '../types/user';
import { tokenManager } from '../utils/tokenManager';

export const signin = createAsyncThunk(
  'auth/signin',
  async ({ login, password }: AuthData, { rejectWithValue }) => {
    try {
      const response = await userApi.post('/auth/signin', {
        login,
        password,
      });
      tokenManager.set(response.data.accessToken);
      return response.data;
    } catch (error: any) {
      console.log('Ошибка signin', error.response.data);

      return rejectWithValue({
        status: error.response.status,
        message: error.response.data,
      });
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (
    { email, login, password, phoneNumber, username }: UserRegistration,
    { rejectWithValue }
  ) => {
    try {
      const response = await userApi.post('/auth/signup', {
        email,
        login,
        password,
        phoneNumber,
        username,
      });
      return response.data;
    } catch (error: any) {
      console.log('Ошибка signup', error);

      return rejectWithValue({
        status: error.response.status,
        message: error.response.data,
      });
    }
  }
);
