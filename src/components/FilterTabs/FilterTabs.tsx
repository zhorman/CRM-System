import { TodoInfo, TaskFilters } from '../../types/todos';
import styles from './FilterTabs.module.css';
import { Flex, Button } from 'antd';

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
    <Flex>
      <Button
        type="text"
        className={activeFilter === 'all' ? styles.activeTab : styles.tabButton}
        onClick={() => loadTasks(TaskFilters.All)}>
        Все({taskCounts.all})
      </Button>
      <Button
        type="text"
        className={
          activeFilter === 'inWork' ? styles.activeTab : styles.tabButton
        }
        onClick={() => loadTasks(TaskFilters.InWork)}>
        в работе({taskCounts.inWork})
      </Button>
      <Button
        type="text"
        className={
          activeFilter === 'completed' ? styles.activeTab : styles.tabButton
        }
        onClick={() => loadTasks(TaskFilters.Completed)}>
        сделано({taskCounts.completed})
      </Button>
    </Flex>
  );
}
