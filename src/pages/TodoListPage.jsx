import { useState, useEffect } from 'react';
import CreateTaskForm from '../components/CreateTaskForm/CreateTaskForm';
import TaskList from '../components/TaskList/TaskList';
import FilterTabs from '../components/FilterTabs/FilterTabs';
import { getTasks } from '../api/api';

export default function TodoListPage() {
  const [tasksList, setTasksList] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [allTasksCount, setAllTasksCount] = useState('');
  const [inWorkTasksCount, setInWorkTasksCount] = useState('');
  const [completedTasksCount, setCompletedTasksCount] = useState('');

  async function fetchTasks() {
    const data = await getTasks(activeFilter);
    setTasksList(data.data);
    setAllTasksCount(data.info.all);
    setInWorkTasksCount(data.info.inWork);
    setCompletedTasksCount(data.info.completed);
  }

  useEffect(() => {
    console.log('Компонент монтируется');
    fetchTasks(activeFilter);
  }, [activeFilter]);

  return (
    <>
      <header>
        <h1>Todolist</h1>
      </header>
      <main>
        <CreateTaskForm fetchTasks={fetchTasks} />
        <FilterTabs
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          allTasksCount={allTasksCount}
          inWorkTasksCount={inWorkTasksCount}
          completedTasksCount={completedTasksCount}
        />
        <TaskList tasksList={tasksList} fetchTasks={fetchTasks} />
      </main>
    </>
  );
}
