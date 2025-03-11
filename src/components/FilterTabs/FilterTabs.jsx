import styles from './FilterTabs.module.css';

export default function FilterTabs({
  activeFilter,
  setActiveFilter,
  allTasksCount,
  inWorkTasksCount,
  completedTasksCount,
}) {
  async function loadTasks(query) {
    setActiveFilter(query);
  }

  return (
    <div className={styles.tabs}>
      <button
        className={activeFilter === 'all' ? styles.activeTab : styles.tabButton}
        onClick={() => loadTasks('all')}>
        Все({allTasksCount})
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
