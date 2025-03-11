import { useState } from 'react';
import { createTask } from '../../api/api.js';
import styles from './CreateTaskForm.module.css';
import { MIN_TASK_LENGTH, MAX_TASK_LENGTH } from '../../utils/constans.js';
import {generateError} from '../../utils/helpers.js'

export default function CreateTaskForm({ fetchTasks }) {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState('');

  function handleChange(event) {
    const value = event.target.value;

    const trimmedValue = value.trim();
    const validationError = generateError(trimmedValue);

    if (validationError) {
      setError(validationError);
    } else {
      setError('');
    }
    setTaskName(value);
  }

  async function handleAddTask(event) {
    event.preventDefault();

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
        maxLength={MAX_TASK_LENGTH}
        placeholder="Task To Be Done..."
      />
      <button className={styles.button} type="submit" disabled={error}>
        Add
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
