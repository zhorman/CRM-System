import { api } from './apiClient';
import { TaskFilters, TodoRequest, MetaResponse } from '../types/todos';

export async function createTask(task: TodoRequest) {
  try {
    const response = await api.post('/todos', task);

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
    const response = await api.get('/todos', {
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
    const response = await api.delete(`/todos/${id}`);

    console.log('Ответ сервера delete:', response);
    return;
  } catch (error) {
    console.error('Ошибка при удалении:', error);
  }
}

export async function updateTask(id: number, updatedTask: TodoRequest) {
  try {
    const response = await api.put(`/todos/${id}`, updatedTask);

    console.log('Ответ сервера put:', response);
    return response;
  } catch (error) {
    console.error('Ошибка при обновлении:', error);
  }
}