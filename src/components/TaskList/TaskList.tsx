import TaskItem from '../TaskItem/TaskItem.tsx';
import styles from './TaskList.module.css';

export interface TaskObj {
  id: string;
  title: string;
  isDone: boolean;
}

interface TaskListProps {
  tasksList: TaskObj[];
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
