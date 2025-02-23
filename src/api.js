export async function postData(data) {
  try {
    const response = await fetch('https://easydev.club/api/v1/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const returnedData = await response.json(); // Читаем ответ

    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${returnedData}`);
    }

    console.log('Ответ сервера:', returnedData);
    return returnedData;
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

export async function getData() {
  try {
    const response = await fetch('https://easydev.club/api/v1/todos?filter={all}');

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
