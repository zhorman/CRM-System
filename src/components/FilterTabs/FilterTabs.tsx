import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { TaskFilters } from '../../types/todos';
import { taskListActions } from '../../store/taskListSlice';
import styles from './FilterTabs.module.css';
import { Flex, Button } from 'antd';

export default function FilterTabs() {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector((state) => state.taskList.activeFilter);
  const taskCounts = useAppSelector((state) => state.taskList.info);

  async function loadTasks(query: TaskFilters) {
    dispatch(taskListActions.setActiveFilter(query));
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
