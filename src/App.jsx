import { useState } from 'react';
import UserInput from './components/UserInput';
import TaskList from './components/TaskList';
import styles from './styles/App.module.css';

function App() {
  const [renderCount, setRenderCount] = useState(0);

  return (
    <div className={styles.container}>
      <header>
        <h1>Todolist</h1>
      </header>
      <main>
        <UserInput onAddTaskRender={setRenderCount} />
        <TaskList tasksUpdated={renderCount} updateRenderCount={setRenderCount} />
      </main>
    </div>
  );
}

export default App;
