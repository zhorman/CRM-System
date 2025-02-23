/* eslint-disable react/prop-types */

import { useState } from 'react';

export default function TaskItem({ task, onRemove }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleClickEdit() {
    setIsEditing((editing) => !editing);
  }

  return (
    <li className="task">
      <input type="checkbox" id={task.title} />
      {isEditing ? (
        <input type="text" value={task.title} />
      ) : (
        <label htmlFor={task.title} className="task-content">
          <span className="task-name">{task.title}</span>
          {task.name && <span className="task-author">Автор: {task.name}</span>}
          {task.description && (
            <span className="task-description">Описание: {task.description}</span>
          )}
        </label>
      )}
      <div className="task-buttons">
        <button onClick={handleClickEdit}>Edit</button>
        <button>Delete</button>
      </div>
    </li>
  );
}
