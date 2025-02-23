import { useState } from 'react';

export default function UserInput({ onAddClick }) {
  const [taskName, setTaskName] = useState('');

  function handleChange(event) {
    setTaskName(event.target.value);
  }

  return (
    <div className="user-input">
      <div className="inputs-group">
        <input type="text" onChange={handleChange} value={taskName} />
      </div>
      <button onClick={() => onAddClick(taskName)}>Add</button>
    </div>
  );
}
