import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import FilterTabs from './FilterTabs';
import { getData } from '../api/api.js';
import styles from '../styles/TaskList.module.css';

export default function TaskList({ tasksUpdated, updateRenderCount }) {
  const [tasksList, setTasksList] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    console.log('Компонент монтируется');
    async function loadAllTasks() {
      const data = await getData('all');
      setTasksList(data);
      setAllTasks(data);
      setActiveFilter('all');
    }

    loadAllTasks();
  }, [tasksUpdated]);

  return (
    <>
      <FilterTabs
        setTasksList={setTasksList}
        allTasks={allTasks}
        updateRenderCount={updateRenderCount}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <ul className={styles.taskList}>
        {tasksList.map((task) => (
          <TaskItem key={task.id} task={task} updateRenderCount={updateRenderCount} />
        ))}
      </ul>
    </>
  );
}
