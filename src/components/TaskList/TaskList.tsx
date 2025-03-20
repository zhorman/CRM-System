import { Todo } from '../../types/todos';
import TaskItem from '../TaskItem/TaskItem';

import styles from './TaskList.module.css';

interface TaskListProps {
  tasksList: Todo[];
  fetchTasks: () => void;
}

export default function TaskList({ tasksList, fetchTasks }: TaskListProps) {
  return (
    <>
      <ul className={styles.taskList}>
        {tasksList.map((task) => (
          <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />
        ))}
      </ul>
    </>
  );
}
