import { useState, useEffect } from 'react';
import { getTasks } from '../api/api';
import { TaskCounts, TaskFilters, TaskObj } from '../types/todos';
import CreateTaskForm from '../components/CreateTaskForm/CreateTaskForm';
import TaskList from '../components/TaskList/TaskList';
import FilterTabs from '../components/FilterTabs/FilterTabs';

export default function TodoListPage() {
  const [tasksList, setTasksList] = useState<TaskObj[]>([]);
  const [activeFilter, setActiveFilter] = useState<TaskFilters>('all');
  const [taskCounts, setTaskCounts] = useState<TaskCounts>({ all: 0, completed: 0, inWork: 0 });

  async function fetchTasks() {
    const data = await getTasks(activeFilter);
    setTasksList(data.data);
    setTaskCounts(data.info);
  }

  useEffect(() => {
    console.log('Компонент монтируется');
    fetchTasks();
  }, [activeFilter]);

  return (
    <>
      <header>
        <h1>Todolist</h1>
      </header>
      <main>
        <CreateTaskForm fetchTasks={fetchTasks} />
        <FilterTabs
          taskCounts={taskCounts}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <TaskList tasksList={tasksList} fetchTasks={fetchTasks} />
      </main>
    </>
  );
}
