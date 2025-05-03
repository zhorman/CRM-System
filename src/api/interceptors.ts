import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { setTokens, logout } from '../store/authSlice';
import { tokenManager } from '../utils/tokenManager';
import { api } from './apiClient';

export const setupInterceptors = (dispatch: Dispatch) => {
  api.interceptors.request.use((config) => {
    const accessToken = tokenManager.get();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalResponse = error.config;
      const refreshToken = localStorage.getItem('refreshToken');
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

      if (error.response?.status === 401 && !originalResponse._retry) {
        originalResponse._retry = true;

        try {
          await delay(1000);
          const response = await axios.post(
            'https://easydev.club/api/v1/auth/refresh',
            {
              refreshToken,
            }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          dispatch(setTokens({ refreshToken: newRefreshToken }));
          tokenManager.set(accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalResponse.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalResponse);
        } catch (error) {
          console.log('Не удалось обновить ацесс токен', error);
          dispatch(logout());
          tokenManager.clear();
          return Promise.reject(error);
        }
      } else {
        console.error('Ошибка, не связанная с 401:', error);
      }
      return Promise.reject(error);
    }
  );
};
