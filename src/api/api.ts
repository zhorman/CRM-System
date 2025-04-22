import axios from 'axios';
import { TaskFilters, TodoRequest, MetaResponse } from '../types/todos';
import { setTokens, logout } from '../store/authSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { tokenManager } from '../utils/tokenManager';

export const userApi = axios.create({
  baseURL: 'https://easydev.club/api/v1',
});

export const setupInterceptors = (dispatch: Dispatch) => {
  userApi.interceptors.request.use((config) => {
    const accessToken = tokenManager.get();
    console.log('request interceptor', config);
    console.log('request interceptor accessToken', accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  userApi.interceptors.response.use(
    (response) => {
      console.log('Response:', response.status, response.data);
      return response;
    },
    async (error) => {
      const originalResponse = error.config;
      const refreshToken = localStorage.getItem('refreshToken');
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
      console.log('ответ - ошибка originalResponse', originalResponse);

      if (error.response?.status === 401 && !originalResponse._retry) {
        originalResponse._retry = true;

        try {
          console.log(
            'Интерцептор response старт, refreshToken - ',
            refreshToken
          );
          await delay(1000);
          const response = await axios.post(
            'https://easydev.club/api/v1/auth/refresh',
            {
              refreshToken,
            }
          );
          console.log('Ответ интерцептор response userApi.post', response.data);

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          dispatch(setTokens({ accessToken, refreshToken: newRefreshToken }));
          tokenManager.set(accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalResponse.headers.Authorization = `Bearer ${accessToken}`;
          return userApi(originalResponse);
        } catch (error) {
          console.log('Error!:', error);
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

export async function createTask(task: TodoRequest) {
  try {
    const response = await userApi.post('/todos', task);

    console.log('Ответ сервера post:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка post:', error);
  }
}

export async function getTasks(
  query: TaskFilters
): Promise<MetaResponse | null> {
  try {
    const response = await userApi.get('/todos', {
      params: { filter: query },
    });

    console.log('Ответ сервера get:', response);
    return response.data;
  } catch (error) {
    console.error('Ошибка get:', error);
    return null;
  }
}

export async function deleteTask(id: number) {
  try {
    const response = await userApi.delete(`/todos/${id}`);

    console.log('Ответ сервера delete:', response);
    return;
  } catch (error) {
    console.error('Ошибка при удалении:', error);
  }
}

export async function updateTask(id: number, updatedTask: TodoRequest) {
  try {
    const response = await userApi.put(`/todos/${id}`, updatedTask);

    console.log('Ответ сервера put:', response);
    return response;
  } catch (error) {
    console.error('Ошибка при обновлении:', error);
  }
}

export async function getUser() {
  try {
    const response = await userApi.get('/user/profile');

    console.log('Ответ сервера getUser:', response);
    return response.data;
  } catch (error) {
    console.error('Ошибка getUser:', error);
    return null;
  }
}
