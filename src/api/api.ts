import { TaskFilters, TodoRequest, MetaResponse } from '../types/todos';
import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://easydev.club/api/v1',
});

export async function createTask(task: TodoRequest) {
  try {
    const response = await apiInstance.post('/todos', task);

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
    const response = await apiInstance.get('/todos', {
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
    const response = await apiInstance.delete(`/todos/${id}`);

    console.log('Ответ сервера delete:', response);
    return;
  } catch (error) {
    console.error('Ошибка при удалении:', error);
  }
}

export async function updateTask(id: number, updatedTask: TodoRequest) {
  try {
    const response = await apiInstance.put(`/todos/${id}`, updatedTask);

    console.log('Ответ сервера put:', response);
    return response;
  } catch (error) {
    console.error('Ошибка при обновлении:', error);
  }
}
