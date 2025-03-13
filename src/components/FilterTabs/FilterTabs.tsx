import styles from './FilterTabs.module.css';

interface FilterTabsProps {
  activeFilter: string;
  setActiveFilter: (query: string) => void;
  allTasksCount: string;
  inWorkTasksCount: string;
  completedTasksCount: string;
}
export default function FilterTabs({
  activeFilter,
  setActiveFilter,
  allTasksCount,
  inWorkTasksCount,
  completedTasksCount,
}: FilterTabsProps) {
  async function loadTasks(query: string) {
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
