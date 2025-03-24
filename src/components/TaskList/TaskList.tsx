import { Todo } from '../../types/todos';
import TaskItem from '../TaskItem/TaskItem';

import { List } from 'antd';

interface TaskListProps {
  tasksList: Todo[];
  fetchTasks: () => void;
}

export default function TaskList({ tasksList, fetchTasks }: TaskListProps) {
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
