import { useState } from 'react';
import { createTask } from '../../api/api.js';
import styles from './CreateTaskForm.module.css';
import { MIN_TASK_LENGTH, MAX_TASK_LENGTH } from '../../utils/constans.js';

export default function CreateTaskForm({ fetchTasks }) {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState('');

  function handleChange(event) {
    const value = event.target.value;

    if (value.length > MAX_TASK_LENGTH) {
      setError(`Максимальная длина: ${MAX_TASK_LENGTH} символов.`);
      return;
    }

    if (value.length < MIN_TASK_LENGTH) {
      setError(`Минимальная длина: ${MIN_TASK_LENGTH} символа.`);
    } else {
      setError('');
    }

    setTaskName(value);
  }

  async function handleAddTask(event) {
    event.preventDefault();

    if (!taskName.trim()) {
      setError('Задача не может быть пустой');
      return;
    }

    if (error || taskName.length < MIN_TASK_LENGTH) {
      return;
    }

    await createTask({ title: taskName, isDone: false });
    fetchTasks();
  }

  return (
    <form className={styles.userInput} onSubmit={handleAddTask}>
      <input
        className={styles.input}
        type="text"
        value={taskName}
        onChange={handleChange}
        required
        minLength={MIN_TASK_LENGTH}
        placeholder="Task To Be Done..."
      />
      <button
        className={styles.button}
        type="submit"
        disabled={error || taskName.length < MIN_TASK_LENGTH}>
        Add
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
