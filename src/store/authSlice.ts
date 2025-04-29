import { createSlice } from '@reduxjs/toolkit';
import { signin } from './authThunk';
import { REFRESH_TOKEN_LIFETIME } from '../utils/constants';

interface AuthState {
  refreshToken: string | null;
  tokenExpiration: number | null;
  loading: boolean;
  error: any;
  isAuthorized: boolean;
}

const initialState: AuthState = {
  refreshToken: localStorage.getItem('refreshToken') || null,
  tokenExpiration: null,
  loading: false,
  error: null,
  isAuthorized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.refreshToken = action.payload.refreshToken;
      state.tokenExpiration = Date.now() + REFRESH_TOKEN_LIFETIME;
      state.isAuthorized = true;
    },
    setAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },
    logout(state) {
      state.refreshToken = null;
      localStorage.removeItem('refreshToken');
      state.isAuthorized = false;
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
        state.refreshToken = action.payload.refreshToken;
        state.tokenExpiration = Date.now() + REFRESH_TOKEN_LIFETIME;

        state.isAuthorized = true;
        console.log(state.isAuthorized);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(signin.rejected, (state, action) => {
        console.log('Rejected action.payload:', action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setTokens, setAuthorized } = authSlice.actions;

export default authSlice.reducer;
