import { useState } from 'react';
import UserInput from './components/UserInput';
import TaskList from './components/TaskList';
import { postData } from './api';

function App() {
  const [addedTask, setAddedTask] = useState();

  function  handleAddTask(taskName) {
     setAddedTask( postData({ title: taskName, isDone: false }));
    return addedTask;
  }

  // function handleEditTask() {}

  // function handleRemoveTask(id) {
  //   setTasks(tasks.filter((task) => task.id !== id));
  // }

  return (
    <>
      <header>
        <h1>Todolist</h1>
      </header>
      <main>
        <UserInput onAddClick={handleAddTask} />
        <TaskList addedTask={addedTask} />
      </main>
    </>
  );
}

export default App;
