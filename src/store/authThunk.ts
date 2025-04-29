import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/apiClient';
import { AuthData, UserRegistration } from '../types/user';
import { tokenManager } from '../utils/tokenManager';

export const signin = createAsyncThunk(
  'auth/signin',
  async (userData: AuthData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signin', userData);
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
  async (userData: UserRegistration, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signup', userData);
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
