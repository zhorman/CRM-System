import React, { useState } from 'react';
import { createTask } from '../../api/api.ts';
import styles from './CreateTaskForm.module.css';
import { MIN_TASK_LENGTH, MAX_TASK_LENGTH } from '../../utils/constants.ts';
import { generateError } from '../../utils/helpers.ts';

interface FetchTasksProp {
  fetchTasks: () => void;
}

export const CreateTaskForm = ({ fetchTasks }: FetchTasksProp) => {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const validationError = generateError(value);

    if (validationError) {
      setError(validationError);
    } else {
      setError('');
    }
    setTaskName(value);
  }

  async function handleAddTask(event: React.FormEvent<HTMLFormElement>) {
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
      <button className={styles.button} type="submit" disabled={!!error}>
        Add
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};
