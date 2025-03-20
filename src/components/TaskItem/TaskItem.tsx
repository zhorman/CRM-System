/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { updateTask, deleteTask } from '../../api/api';
import { MIN_TASK_LENGTH, MAX_TASK_LENGTH } from '../../utils/constants';
import { generateError } from '../../utils/helpers';
import { Todo, TodoRequest } from '../../types/todos';

import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: Todo;
  fetchTasks: () => void;
}

export default function TaskItem({ task, fetchTasks }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskItemName, setTaskItemName] = useState<string>(task.title);
  const [isChecked, setIsChecked] = useState<boolean>(task.isDone);
  const [error, setError] = useState<string>('');

  async function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedValue = taskItemName.trim();
    const validationError = generateError(trimmedValue);

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

  async function handleRemoveTask(id: number) {
    await deleteTask(id);
    fetchTasks();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setTaskItemName(value);

    const validationError = generateError(value);
    setError(validationError);
  }

  async function handleChecked(id: number, updatedData: TodoRequest) {
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
                minLength={MIN_TASK_LENGTH}
                maxLength={MAX_TASK_LENGTH}
              />
              {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
          </div>
          <div className={styles.buttons}>
            <button
              type="submit"
              className={styles.buttonBlue}
              disabled={!!error || !taskItemName.trim()}>
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
