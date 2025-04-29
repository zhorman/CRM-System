/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { updateTask, deleteTask } from '../../api/todoApi';
import { MIN_TASK_LENGTH, MAX_TASK_LENGTH } from '../../utils/constants';
import { Todo, TodoRequest, FormValues } from '../../types/todos';

import styles from './TaskItem.module.css';
import { Button, List, Form, Input, Checkbox, Flex, Typography } from 'antd';
const { Text } = Typography;
import {
  EditFilled,
  DeleteFilled,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';

interface TaskItemProps {
  task: Todo;
  fetchTasks: () => void;
}

const TaskItem = React.memo(function TaskItem({
  task,
  fetchTasks,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(task.isDone);

  console.log('Rendering Task:', task.id);

  async function handleSubmitForm(values: FormValues) {
    await updateTask(task.id, {
      title: values.taskName,
      isDone: isChecked,
    });

    setIsEditing(false);
    fetchTasks();
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  async function handleRemoveTask(id: number) {
    await deleteTask(id);
    fetchTasks();
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
                  title: task.title,
                  isDone: !isChecked,
                })
              }
            />
          </Form.Item>
          <Form.Item
            initialValue={task.title}
            name="taskName"
            style={{ flex: 1, margin: '0' }}
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
                message: `Максимальная длина — ${MAX_TASK_LENGTH} символа`,
                transform: (value) => value.trim(),
              },
            ]}>
            <Input type="text" autoFocus />
          </Form.Item>
          <Form.Item style={{ margin: '0' }}>
            <Button type="primary" htmlType="submit" icon={<CheckOutlined />} />
          </Form.Item>
          <Form.Item style={{ margin: '0' }}>
            <Button
              type="primary"
              danger
              onClick={handleCancelEdit}
              icon={<CloseOutlined />}
            />
          </Form.Item>
        </Form>
      ) : (
        <Flex gap="small" align="center">
          <Checkbox
            type="checkbox"
            checked={task.isDone}
            onChange={() =>
              handleChecked(task.id, {
                title: task.title,
                isDone: !isChecked,
              })
            }
          />
          <Text
            style={{ flex: 1 }}
            className={task.isDone ? styles.nameDone : styles.name}>
            {task.title}
          </Text>
          <Button
            type="primary"
            onClick={() => setIsEditing(true)}
            icon={<EditFilled />}
          />
          <Button
            type="primary"
            danger
            onClick={() => handleRemoveTask(task.id)}
            icon={<DeleteFilled />}
          />
        </Flex>
      )}
    </List.Item>
  );
});

export default TaskItem;
