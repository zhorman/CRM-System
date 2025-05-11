import { useState, useEffect } from 'react';
import { getTasks } from '../api/todoApi';
import CreateTaskForm from '../components/CreateTaskForm/CreateTaskForm';
import TaskList from '../components/TaskList/TaskList';
import FilterTabs from '../components/FilterTabs/FilterTabs';
import { taskListActions } from '../store/taskListSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks';

export default function TodoListPage() {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector((state) => state.taskList.activeFilter);
  const [error, setError] = useState<string>('');

  async function fetchTasks() {
    const data = await getTasks(activeFilter);

    if (!data) {
      setError('Ошибка при загрузки задач');
    } else {
      dispatch(
        taskListActions.setTaskList({ data: data.data, info: data.info })
      );
    }
  }

  useEffect(() => {
    console.log('Компонент монтируется');
    fetchTasks();

    const updateInteval = setInterval(() => {
      console.log('Компонент ререндерится каждые 5 сек');
      fetchTasks();
    }, 5000);
    return () => {
      console.log('Компонент демонтируется');
      return clearInterval(updateInteval);
    };
  }, [activeFilter]);

  return (
    <>
      <CreateTaskForm fetchTasks={fetchTasks} />
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <FilterTabs />
          <TaskList fetchTasks={fetchTasks} />
        </>
      )}
    </>
  );
}
