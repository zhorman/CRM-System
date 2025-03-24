import React, { useState } from 'react';
import { createTask } from '../../api/api';
import { MIN_TASK_LENGTH, MAX_TASK_LENGTH } from '../../utils/constants';
import { generateError } from '../../utils/helpers';

import { Button, Form, Input } from 'antd';

interface CreateTaskProps {
  fetchTasks: () => void;
}

export default function CreateTaskForm({ fetchTasks }: CreateTaskProps) {
  const [taskName, setTaskName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    const validationError = generateError(value);

    if (validationError) {
      setError(true);
    } else {
      setError(false);
    }
    setTaskName(value);
  }

  async function handleAddTask() {
    await createTask({ title: taskName, isDone: false });
    fetchTasks();
  }

  return (
    <Form layout="inline" onFinish={handleAddTask}>
      <Form.Item
        name="taskName"
        style={{ flex: 1 }}
        rules={[
          { required: true, message: 'Поле не может быть пустым' },
          {
            min: MIN_TASK_LENGTH,
            message: `Минимальная длина — ${MIN_TASK_LENGTH} символа`,
          },
          {
            max: MAX_TASK_LENGTH,
            message: `Минимальная длина — ${MAX_TASK_LENGTH} символа`,
          },
        ]}>
        <Input
          type="text"
          value={taskName}
          onChange={handleChange}
          placeholder="Task To Be Done..."
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={error}>
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}
