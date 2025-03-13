export interface TodoRequest {
  title: string;
  isDone: boolean;
}

export async function createTask(data: TodoRequest) {
  try {
    const response = await fetch('https://easydev.club/api/v1/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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

export async function getTasks(param: string) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos?filter=${param}`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${data}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

export async function deleteTask(id: string) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка ${response.status}: ${errorText}`);
    }
    return;
  } catch (error) {
    console.error('Ошибка при удалении:', error);
    return null;
  }
}

export async function updateTask(id: string, updatedTask: TodoRequest) {
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
