import { useState } from 'react';
import UserInput from '../components/UserInput';
import TaskList from '../components/TaskList';

export default function TodoListPage() {
  const [renderCount, setRenderCount] = useState(0);

  return (
    <>
      <header>
        <h1>Todolist</h1>
      </header>
      <main>
        <UserInput onAddTaskRender={setRenderCount} />
        <TaskList tasksUpdated={renderCount} updateRenderCount={setRenderCount} />
      </main>
    </>
  );
}
