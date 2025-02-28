import { getData } from '../api/api.js';
import styles from '../styles/FilterTabs.module.css';

export default function FilterTabs({
  allTasks,
  setTasksList,
  updateRenderCount,
  activeFilter,
  setActiveFilter,
}) {
  async function loadTasks(query) {
    const data = await getData(query);
    setTasksList(data);
    setActiveFilter(query);
  }

  const completedTasks = allTasks.filter((task) => task.isDone).length;
  const inWorkTasks = allTasks.filter((task) => !task.isDone).length;

  return (
    <div className={styles.tabs}>
      <button
        className={activeFilter === 'all' ? styles.activeTab : styles.tabButton}
        onClick={() => updateRenderCount((prev) => prev + 1)}>
        Все({allTasks.length})
      </button>
      <button
        className={activeFilter === 'inWork' ? styles.activeTab : styles.tabButton}
        onClick={() => loadTasks('inWork')}>
        в работе({inWorkTasks})
      </button>
      <button
        className={activeFilter === 'completed' ? styles.activeTab : styles.tabButton}
        onClick={() => loadTasks('completed')}>
        сделано({completedTasks})
      </button>
    </div>
  );
}
