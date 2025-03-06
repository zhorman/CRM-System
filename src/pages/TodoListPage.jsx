import { useState, useEffect } from 'react';
import CreateTaskForm from '../components/CreateTaskForm/CreateTaskForm';
import TaskList from '../components/TaskList/TaskList';
import FilterTabs from '../components/FilterTabs/FilterTabs';
import { getTasks } from '../api/api';

export default function TodoListPage() {
  const [tasksList, setTasksList] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [inWorkTasksCount, setInWorkTasksCount] = useState('');
  const [completedTasksCount, setCompletedTasksCount] = useState('');

  async function fetchTasks() {
    const data = await getTasks('all');
    setTasksList(data.data);
    setInWorkTasksCount(data.info.inWork);
    setCompletedTasksCount(data.info.completed);
    setActiveFilter('all');
  }

  useEffect(() => {
    console.log('Компонент монтируется');
    fetchTasks();
  }, []);

  return (
    <>
      <header>
        <h1>Todolist</h1>
      </header>
      <main>
        <CreateTaskForm fetchTasks={fetchTasks} />
        <FilterTabs
          setTasksList={setTasksList}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          inWorkTasksCount={inWorkTasksCount}
          completedTasksCount={completedTasksCount}
        />
        <TaskList tasksList={tasksList} fetchTasks={fetchTasks} />
      </main>
    </>
  );
}
