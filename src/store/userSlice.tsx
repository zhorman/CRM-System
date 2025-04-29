import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../api/api';
import { Role } from '../types/user';

interface User {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: false;
  roles: Role[];
  phoneNumber: string;
}

interface UserState {
  userData: User | null;
  error: string | null;
}

const initialState: UserState = {
  userData: null,
  error: null,
};

export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();
      console.log('fetchUser', response);
      return response; 
    } catch (error) {
      return rejectWithValue('Ошибка загрузки пользователя');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
    },
    clearUser(state) {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userData = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload || 'Неизвестная ошибка';
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
