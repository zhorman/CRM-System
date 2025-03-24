import { useState, useEffect } from 'react';
import { getTasks } from '../api/api';
import { TodoInfo, TaskFilters, Todo } from '../types/todos';
import CreateTaskForm from '../components/CreateTaskForm/CreateTaskForm';
import TaskList from '../components/TaskList/TaskList';
import FilterTabs from '../components/FilterTabs/FilterTabs';

export default function TodoListPage() {
  const [tasksList, setTasksList] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<TaskFilters>(
    TaskFilters.All
  );
  const [taskCounts, setTaskCounts] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [error, setError] = useState('');

  async function fetchTasks() {
    const data = await getTasks(activeFilter);

    if (!data) {
      setError('Ошибка при загрузки задач');
    } else {
      setTasksList(data.data);
      setTaskCounts(data.info);
    }
  }

  useEffect(() => {
    console.log('Компонент монтируется');
    fetchTasks();

    const updateInteval = setInterval(() => {
      console.log('Компонент ререндерится');
      fetchTasks();
    }, 5000);
    return () => clearInterval(updateInteval);
  }, [activeFilter]);

  return (
    <>
      <CreateTaskForm fetchTasks={fetchTasks} />
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <FilterTabs
            taskCounts={taskCounts}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          <TaskList tasksList={tasksList} fetchTasks={fetchTasks} />
        </>
      )}
    </>
  );
}
