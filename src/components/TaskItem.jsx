/* eslint-disable react/prop-types */

import { useState } from 'react';
import { updateData, deleteData } from '../api/api.js';
import styles from '../styles/TaskItem.module.css';

export default function TaskItem({ task, updateRenderCount }) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskItemName, setTaskItemName] = useState(task.title);
  const [isChecked, setIsChecked] = useState(task.isDone);

  async function handleClickEdit(id, updatedData) {
    await updateData(id, updatedData).then((data) => console.log('обновлено', data));
    updateRenderCount((prev) => prev + 1);
    setIsEditing((editing) => !editing);
  }

  async function handleRemoveTask(id) {
    await deleteData(id);
    updateRenderCount((prev) => prev + 1);
  }

  function handleChange(event) {
    setTaskItemName(event.target.value);
  }

  async function handleChecked(id, updatedData) {
    setIsChecked(!isChecked);
    await updateData(id, updatedData);
    updateRenderCount((prev) => prev + 1);
    console.log(updatedData);
  }

  return (
    <li className={styles.task}>
      <div className={styles.content}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={task.isDone}
          onChange={() => handleChecked(task.id, { title: taskItemName, isDone: !isChecked })}
        />
        {isEditing ? (
          <input
            className={styles.input}
            type="text"
            value={taskItemName}
            onChange={handleChange}
          />
        ) : (
          <span className={task.isDone ? styles.nameDone : styles.name}>{task.title}</span>
        )}
      </div>
      <div className={styles.buttons}>
        {isEditing ? (
          <>
            <button
              className={styles.buttonBlue}
              onClick={() => {
                handleClickEdit(task.id, { title: taskItemName, isDone: isChecked });
              }}>
              ✔️
            </button>
            <button className={styles.buttonRed} onClick={() => setIsEditing(false)}>
              ✖️
            </button>
          </>
        ) : (
          <button className={styles.buttonBlue} onClick={() => setIsEditing(true)}>
            ✏️
          </button>
        )}
        <button className={styles.buttonRed} onClick={() => handleRemoveTask(task.id)}>
          🗑️
        </button>
      </div>
    </li>
  );
}
