/* eslint-disable react/prop-types */
import { useState } from 'react';
import { updateTask, deleteTask } from '../../api/api.js';
import styles from './TaskItem.module.css';
import { MIN_TASK_LENGTH, MAX_TASK_LENGTH } from '../../utils/constans.js';

export default function TaskItem({ task, fetchTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskItemName, setTaskItemName] = useState(task.title);
  const [isChecked, setIsChecked] = useState(task.isDone);
  const [error, setError] = useState('');

  function validateTaskText(text) {
    if (!text.trim()) {
      return 'Задача не может быть пустой';
    }

    if (text.length < MIN_TASK_LENGTH) {
      return `Минимальная длина: ${MIN_TASK_LENGTH} символа.`;
    }

    if (text.length > MAX_TASK_LENGTH) {
      return `Максимальная длина: ${MAX_TASK_LENGTH} символов.`;
    }

    return '';
  }

  async function handleSubmitForm(event) {
    event.preventDefault();

    const trimmedValue = taskItemName.trim();
    const validationError = validateTaskText(trimmedValue);

    if (validationError) {
      setError(validationError);
      return;
    }

    await updateTask(task.id, {
      title: trimmedValue,
      isDone: isChecked,
    });

    setIsEditing(false);
    setError('');
    fetchTasks();
  }

  function handleCancelEdit() {
    setTaskItemName(task.title);
    setIsEditing(false);
    setError('');
  }

  async function handleRemoveTask(id) {
    await deleteTask(id);
    fetchTasks();
  }

  function handleChange(event) {
    const value = event.target.value;
    setTaskItemName(value);

    const validationError = validateTaskText(value);
    setError(validationError);
  }

  async function handleChecked(id, updatedData) {
    setIsChecked(!isChecked);
    await updateTask(id, updatedData);
    fetchTasks();
  }

  return (
    <li className={styles.task}>
      {isEditing ? (
        <form className={styles.editForm} onSubmit={handleSubmitForm}>
          <div className={styles.content}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={task.isDone}
              onChange={() => handleChecked(task.id, { title: taskItemName, isDone: !isChecked })}
            />
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type="text"
                value={taskItemName}
                onChange={handleChange}
                autoFocus
              />
              {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
          </div>
          <div className={styles.buttons}>
            <button
              type="submit"
              className={styles.buttonBlue}
              disabled={error || !taskItemName.trim()}>
              ✔️
            </button>
            <button type="button" className={styles.buttonRed} onClick={handleCancelEdit}>
              ✖️
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className={styles.content}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={task.isDone}
              onChange={() => handleChecked(task.id, { title: taskItemName, isDone: !isChecked })}
            />
            <span className={task.isDone ? styles.nameDone : styles.name}>{task.title}</span>
          </div>
          <div className={styles.buttons}>
            <button className={styles.buttonBlue} onClick={() => setIsEditing(true)}>
              ✏️
            </button>
            <button className={styles.buttonRed} onClick={() => handleRemoveTask(task.id)}>
              🗑️
            </button>
          </div>
        </>
      )}
    </li>
  );
}
