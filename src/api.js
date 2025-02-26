export async function postData(data) {
  try {
    const response = await fetch('https://easydev.club/api/v1/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${returnedData}`);
    }

    const returnedData = await response.json(); // Читаем ответ

    console.log('Ответ сервера:', returnedData);
    return returnedData;
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

export async function getData(param) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos?filter=${param}`);

    const { data } = await response.json(); // Читаем ответ

    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${data}`);
    }

    // console.log('Ответ сервера:', data);
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

export async function deleteData(id) {
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
    console.error('Ошибка при удалении:', error.message);
    return null;
  }
}


export async function updateData(id, updatedData) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при обновлении:", error.message);
    return null;
  }
}
