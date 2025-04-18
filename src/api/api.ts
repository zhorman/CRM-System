import { TaskFilters, TodoRequest, MetaResponse } from '../types/todos';
import axios from 'axios';
import { setTokens, logout } from '../store/authSlice';
import { Dispatch } from '@reduxjs/toolkit';

export const todoApi = axios.create({
  baseURL: 'https://easydev.club/api/v1',
});

export const userApi = axios.create({
  baseURL: 'https://easydev.club/api/v1',
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const setupInterceptors = (dispatch: Dispatch) => {
  userApi.interceptors.request.use((config) => {
    console.log('request interceptor', config);
    const accessToken = localStorage.getItem('accessToken');

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
      console.log('ответ - ошибка originalResponse', originalResponse);
      const refreshToken = localStorage.getItem('refreshToken');

      if (
        error.response &&
        error.response.status === 401 &&
        !originalResponse._retry
      ) {
        originalResponse._retry = true;

        try {
          console.log(
            'Интерцептор response старт, refreshToken - ',
            refreshToken
          );
          await delay(1000);
          const response = await axios.post(
            'https://easydev.club/api/v1/auth/refresh',
            { refreshToken }
          );
          console.log('Ответ интерцептор response userApi.post', response.data);

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          dispatch(setTokens({ accessToken, refreshToken: newRefreshToken }));
          localStorage.setItem('refreshToken', newRefreshToken);
          localStorage.setItem('accessToken', accessToken);

          originalResponse.headers.Authorization = `Bearer ${accessToken}`;
          return userApi(originalResponse);
        } catch (error) {
          console.log('Error!:', error);
          dispatch(logout());
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
    const response = await todoApi.post('/todos', task);

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
    const response = await todoApi.get('/todos', {
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
    const response = await todoApi.delete(`/todos/${id}`);

    console.log('Ответ сервера delete:', response);
    return;
  } catch (error) {
    console.error('Ошибка при удалении:', error);
  }
}

export async function updateTask(id: number, updatedTask: TodoRequest) {
  try {
    const response = await todoApi.put(`/todos/${id}`, updatedTask);

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
