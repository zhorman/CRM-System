import { useState } from 'react';
import { postData } from '../api';
import styles from '../styles/UserInput.module.css';

export default function UserInput({ onAddTaskRender }) {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState('');

  const minLength = 2;
  const maxLength = 64;

  function handleChange(event) {
    const value = event.target.value;

    if (value.length > maxLength) {
      setError(`Максимальная длина: ${maxLength} символов.`);
      return;
    }

    setTaskName(value);

    if (value.length < minLength) {
      setError(`Минимальная длина: ${minLength} символов.`);
    } else {
      setError('');
    }
  }

  async function handleAddTask(event) {
    event.preventDefault();
    if (error || taskName.length < minLength) return;

    await postData({ title: taskName, isDone: false });
    onAddTaskRender((prev) => prev + 1);
  }

  return (
    <form className={styles.userInput} onSubmit={handleAddTask}>
      <input
        className={styles.input}
        type="text"
        value={taskName}
        onChange={handleChange}
        required
        minLength={minLength}
        placeholder="Task To Be Done..."
      />
      <button
        className={styles.button}
        type="submit"
        disabled={error || taskName.length < minLength}>
        Add
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
