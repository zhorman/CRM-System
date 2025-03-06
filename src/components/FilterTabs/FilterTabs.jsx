import { getTasks } from '../../api/api.js';
import styles from './FilterTabs.module.css';

export default function FilterTabs({
  setTasksList,
  activeFilter,
  setActiveFilter,
  inWorkTasksCount,
  completedTasksCount,
}) {
  async function loadTasks(query) {
    const data = await getTasks(query);
    const tasks = data.data;
    setTasksList(tasks);
    setActiveFilter(query);
  }

  return (
    <div className={styles.tabs}>
      <button
        className={activeFilter === 'all' ? styles.activeTab : styles.tabButton}
        onClick={() => loadTasks('all')}>
        Все({inWorkTasksCount + completedTasksCount})
      </button>
      <button
        className={activeFilter === 'inWork' ? styles.activeTab : styles.tabButton}
        onClick={() => loadTasks('inWork')}>
        в работе({inWorkTasksCount})
      </button>
      <button
        className={activeFilter === 'completed' ? styles.activeTab : styles.tabButton}
        onClick={() => loadTasks('completed')}>
        сделано({completedTasksCount})
      </button>
    </div>
  );
}
