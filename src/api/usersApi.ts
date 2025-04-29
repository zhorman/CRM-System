import { api } from "./apiClient";

export async function getUser() {
  try {
    const response = await api.get('/user/profile');

    console.log('Ответ сервера getUser:', response);
    return response.data;
  } catch (error) {
    console.error('Ошибка getUser:', error);
    return null;
  }
}