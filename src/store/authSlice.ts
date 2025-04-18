import { createSlice } from '@reduxjs/toolkit';
import { signin } from './authThunk';
import { REFRESH_TOKEN_LIFETIME } from '../utils/constants';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiration: number | null;
  loading: boolean;
  error: any;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  tokenExpiration: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('tokenExpiration');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.tokenExpiration = Date.now() + REFRESH_TOKEN_LIFETIME;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem(
          'tokenExpiration',
          Date.now() + REFRESH_TOKEN_LIFETIME.toString()
        );
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  },
});

export const { logout, setTokens } = authSlice.actions;

export default authSlice.reducer;
