import TaskItem from '../TaskItem/TaskItem';
import { useAppSelector } from '../../store/hooks';
import { List } from 'antd';

interface TaskListProps {
  fetchTasks: () => void;
}

export default function TaskList({ fetchTasks }: TaskListProps) {
  const tasksList = useAppSelector((state) => state.taskList.data);
  return (
    <>
      <List
        grid={{ column: 1 }}
        dataSource={tasksList}
        renderItem={(task) => (
          <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />
        )}
      />
    </>
  );
}
