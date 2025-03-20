import { TodoInfo, TaskFilters } from '../../types/todos';
import styles from './FilterTabs.module.css';

interface FilterTabsProps {
  activeFilter: TaskFilters;
  setActiveFilter: (query: TaskFilters) => void;
  taskCounts: TodoInfo;
}

export default function FilterTabs({
  activeFilter,
  setActiveFilter,
  taskCounts,
}: FilterTabsProps) {
  async function loadTasks(query: TaskFilters) {
    setActiveFilter(query);
  }

  return (
    <div className={styles.tabs}>
      <button
        className={activeFilter === 'all' ? styles.activeTab : styles.tabButton}
        onClick={() => loadTasks(TaskFilters.All)}>
        Все({taskCounts.all})
      </button>
      <button
        className={activeFilter === 'inWork' ? styles.activeTab : styles.tabButton}
        onClick={() => loadTasks(TaskFilters.InWork)}>
        в работе({taskCounts.inWork})
      </button>
      <button
        className={activeFilter === 'completed' ? styles.activeTab : styles.tabButton}
        onClick={() => loadTasks(TaskFilters.Completed)}>
        сделано({taskCounts.completed})
      </button>
    </div>
  );
}
