import { createAsyncThunk } from '@reduxjs/toolkit';
import { todoApi } from '../api/api';
import { AuthData, UserRegistration, Token, Profile } from '../types/user';

export const signin = createAsyncThunk<Token, AuthData>(
  'auth/signin',
  async ({ login, password }: AuthData, thunkAPI) => {
    try {
      const response = await todoApi.post('/auth/signin', {
        login,
        password,
      });

      return response.data;
    } catch (error) {
      console.log('Ошибка signin', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signup = createAsyncThunk<Profile, UserRegistration>(
  'auth/signin',
  async (
    { email, login, password, phoneNumber, username }: UserRegistration,
    thunkAPI
  ) => {
    try {
      const response = await todoApi.post('/auth/signup', {
        email,
        login,
        password,
        phoneNumber,
        username,
      });
      return response.data;
    } catch (error) {
      console.log('Ошибка signup', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
