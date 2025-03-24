/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { updateTask, deleteTask } from '../../api/api';
import { MIN_TASK_LENGTH, MAX_TASK_LENGTH } from '../../utils/constants';
import { generateError } from '../../utils/helpers';
import { Todo, TodoRequest } from '../../types/todos';

import styles from './TaskItem.module.css';
import { Button, List, Form, Input, Checkbox, Flex, Typography } from 'antd';
import {
  EditFilled,
  DeleteFilled,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
const { Text } = Typography;

interface TaskItemProps {
  task: Todo;
  fetchTasks: () => void;
}

export default function TaskItem({ task, fetchTasks }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskItemName, setTaskItemName] = useState<string>(task.title);
  const [isChecked, setIsChecked] = useState<boolean>(task.isDone);
  const [error, setError] = useState<string>('');

  async function handleSubmitForm() {
    const trimmedValue = taskItemName.trim();
    const validationError = generateError(trimmedValue);

    if (validationError) {
      setError(validationError);
      return;
    }

    await updateTask(task.id, {
      title: trimmedValue,
      isDone: isChecked,
    });

    setIsEditing(false);
    setError('');
    fetchTasks();
  }

  function handleCancelEdit() {
    setTaskItemName(task.title);
    setIsEditing(false);
    setError('');
  }

  async function handleRemoveTask(id: number) {
    await deleteTask(id);
    fetchTasks();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setTaskItemName(value);

    const validationError = generateError(value);
    setError(validationError);
  }

  async function handleChecked(id: number, updatedData: TodoRequest) {
    setIsChecked(!isChecked);
    await updateTask(id, updatedData);
    fetchTasks();
  }

  return (
    <List.Item style={{ padding: '5px 10px' }} className={styles.listItem}>
      {isEditing ? (
        <Form
          name="taksItemForm"
          className={styles.editForm}
          onFinish={handleSubmitForm}>
          <Form.Item style={{ margin: '0' }}>
            <Checkbox
              type="checkbox"
              checked={task.isDone}
              onChange={() =>
                handleChecked(task.id, {
                  title: taskItemName,
                  isDone: !isChecked,
                })
              }
            />
          </Form.Item>
          <Form.Item
            initialValue={taskItemName}
            name="taskItemName"
            style={{ flex: 1, margin: '0' }}
            rules={[
              { required: true, message: 'Поле не может быть пустым' },
              {
                min: MIN_TASK_LENGTH,
                message: `Минимальная длина — ${MIN_TASK_LENGTH} символа`,
              },
              {
                max: MAX_TASK_LENGTH,
                message: `Максимальная длина — ${MAX_TASK_LENGTH} символа`,
              },
            ]}>
            <Input type="text" onChange={handleChange} autoFocus />
          </Form.Item>
          <Form.Item style={{ margin: '0' }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!!error || !taskItemName.trim()}>
              <CheckOutlined />
            </Button>
          </Form.Item>
          <Form.Item style={{ margin: '0' }}>
            <Button type="primary" danger onClick={handleCancelEdit}>
              <CloseOutlined />
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Flex gap="small" align="center">
          <Checkbox
            type="checkbox"
            checked={task.isDone}
            onChange={() =>
              handleChecked(task.id, {
                title: taskItemName,
                isDone: !isChecked,
              })
            }
          />
          <Text
            style={{ flex: 1 }}
            className={task.isDone ? styles.nameDone : styles.name}>
            {task.title}
          </Text>
          <Button type="primary" onClick={() => setIsEditing(true)}>
            <EditFilled />
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleRemoveTask(task.id)}>
            <DeleteFilled />
          </Button>
        </Flex>
      )}
    </List.Item>
  );
}
