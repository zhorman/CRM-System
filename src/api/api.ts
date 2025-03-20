import { TaskFilters, TodoRequest, MetaResponse } from '../types/todos';

export async function createTask(task: TodoRequest) {
  try {
    const response = await fetch('https://easydev.club/api/v1/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка ${response.status}: ${errorText}`);
    }

    const returnedData = await response.json();

    console.log('Ответ сервера:', returnedData);
    return returnedData;
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

export async function getTasks(
  param: TaskFilters
): Promise<MetaResponse | null> {
  try {
    const response = await fetch(
      `https://easydev.club/api/v1/todos?filter=${param}`
    );

    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${response.text}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
    return null;
  }
}

export async function deleteTask(id: number) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка ${response.status}: ${errorText}`);
    }
    console.log(response);
    return;
  } catch (error) {
    console.error('Ошибка при удалении:', error);
    return null;
  }
}

export async function updateTask(id: number, updatedTask: TodoRequest) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при обновлении:', error);
    return null;
  }
}
