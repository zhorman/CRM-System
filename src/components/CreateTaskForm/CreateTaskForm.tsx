import { FormValues } from '../../types/todos';
import { createTask } from '../../api/api';
import { MIN_TASK_LENGTH, MAX_TASK_LENGTH } from '../../utils/constants';

import { Button, Form, Input } from 'antd';

interface CreateTaskProps {
  fetchTasks: () => void;
}

export default function CreateTaskForm({ fetchTasks }: CreateTaskProps) {
  async function handleAddTask(values: FormValues) {
    await createTask({ title: values.taskName, isDone: false });
    fetchTasks();
  }

  return (
    <Form layout="inline" onFinish={handleAddTask}>
      <Form.Item
        name="taskName"
        style={{ flex: 1 }}
        rules={[
          {
            required: true,
            whitespace: true,
            message: 'Поле не может быть пустым',
          },
          {
            min: MIN_TASK_LENGTH,
            message: `Минимальная длина — ${MIN_TASK_LENGTH} символа`,
            transform: (value) => value.trim(),
          },
          {
            max: MAX_TASK_LENGTH,
            message: `Минимальная длина — ${MAX_TASK_LENGTH} символа`,
            transform: (value) => value.trim(),
          },
        ]}>
        <Input type="text" placeholder="Task To Be Done..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}
