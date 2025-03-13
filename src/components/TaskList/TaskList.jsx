import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';

export default function TaskList({ tasksList, fetchTasks }) {
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
