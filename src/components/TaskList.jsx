import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { getData } from '../api';
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

  async function loadTasks(query) {
    const data = await getData(query);
    setTasksList(data);
    setActiveFilter(query);
  }

  const completedTasks = allTasks.filter((task) => task.isDone).length;
  const inWorkTasks = allTasks.filter((task) => !task.isDone).length;

  return (
    <>
      <div className={styles.filterButtons}>
        <button
          className={activeFilter === 'all' ? styles.activeFilterBtn : styles.filterButton}
          onClick={() => updateRenderCount((prev) => prev + 1)}>
          Все({allTasks.length})
        </button>
        <button
          className={activeFilter === 'inWork' ? styles.activeFilterBtn : styles.filterButton}
          onClick={() => loadTasks('inWork')}>
          в работе({inWorkTasks})
        </button>
        <button
          className={activeFilter === 'completed' ? styles.activeFilterBtn : styles.filterButton}
          onClick={() => loadTasks('completed')}>
          сделано({completedTasks})
        </button>
      </div>
      <ul className={styles.taskList}>
        {tasksList.map((task) => (
          <TaskItem key={task.id} task={task} updateRenderCount={updateRenderCount} />
        ))}
      </ul>
    </>
  );
}
