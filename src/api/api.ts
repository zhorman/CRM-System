import { TaskFilters, TodoRequest, MetaResponse } from '../types/todos';
import axios from 'axios';

export async function createTask(task: TodoRequest) {
  try {
    const response = await axios.post(
      'https://easydev.club/api/v1/todos',
      task
    );
    console.log('Ответ сервера post:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка post:', error);
  }
}

export async function getTasks(
  param: TaskFilters
): Promise<MetaResponse | null> {
  try {
    const response = await axios.get(
      `https://easydev.club/api/v1/todos?filter=${param}`
    );
    console.log('Ответ сервера get:', response);
    return response.data;
  } catch (error) {
    console.error('Ошибка get:', error);
    return null;
  }
}

export async function deleteTask(id: number) {
  try {
    const response = await axios.delete(
      `https://easydev.club/api/v1/todos/${id}`
    );
    console.log('Ответ сервера delete:', response);
    return;
  } catch (error) {
    console.error('Ошибка при удалении:', error);
  }
}

export async function updateTask(id: number, updatedTask: TodoRequest) {
  try {
    const response = await axios.put(
      `https://easydev.club/api/v1/todos/${id}`,
      updatedTask
    );
    console.log('Ответ сервера put:', response);
    return response;
  } catch (error) {
    console.error('Ошибка при обновлении:', error);
  }
}
