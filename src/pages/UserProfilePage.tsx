import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getUserById } from '../api/api';
import { EditOutlined } from '@ant-design/icons';

import {
  Card,
  Descriptions,
  DescriptionsProps,
  Form,
  Input,
  Button,
} from 'antd';
import { MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH } from '../utils/constants';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

interface User {
  username: string;
  email: string;
  phoneNumber: string;
}

function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const data = await getUserById(id);
        setUser(data);
      } else {
        console.error('ID пользователя не найден');
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return (
      <Card>
        <p style={{ textAlign: 'center' }}>Загрузка профиля...</p>{' '}
      </Card>
    );
  }

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Имя пользователя',
      children: user.username,
    },
    {
      key: '2',
      label: 'Почтовый адрес',
      children: user.email,
    },
    {
      key: '3',
      label: 'Телефон',
      children: user.phoneNumber,
    },
  ];

  function onFinish() {}

  function handleCancelEdit() {
    setIsEditing(false);
  }

  return (
    <>
      {isEditing ? (
        <Form name="taksItemForm" onFinish={onFinish} size="small">
          <Form.Item
            initialValue={user.username}
            name="username"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Поле не может быть пустым',
              },
              {
                min: MIN_USERNAME_LENGTH,
                message: `Минимальная длина — ${MIN_USERNAME_LENGTH} символа`,
                transform: (value) => value.trim(),
              },
              {
                max: MAX_USERNAME_LENGTH,
                message: `Максимальная длина — ${MAX_USERNAME_LENGTH} символа`,
                transform: (value) => value.trim(),
              },
            ]}>
            <Input type="text" autoFocus />
          </Form.Item>
          <Form.Item
            initialValue={user.email}
            name="email"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Поле не может быть пустым',
              },
              {
                min: MIN_USERNAME_LENGTH,
                message: `Минимальная длина — ${MIN_USERNAME_LENGTH} символа`,
                transform: (value) => value.trim(),
              },
              {
                max: MAX_USERNAME_LENGTH,
                message: `Максимальная длина — ${MAX_USERNAME_LENGTH} символа`,
                transform: (value) => value.trim(),
              },
            ]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item
            initialValue={user.phoneNumber}
            name="phoneNumber"
            rules={[
              {
                min: MIN_USERNAME_LENGTH,
                message: `Минимальная длина — ${MIN_USERNAME_LENGTH} символа`,
                transform: (value) => value.trim(),
              },
              {
                max: MAX_USERNAME_LENGTH,
                message: `Максимальная длина — ${MAX_USERNAME_LENGTH} символа`,
                transform: (value) => value.trim(),
              },
            ]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item style={{  gap: '10px' }}>
            <Button type="primary" htmlType="submit" icon={<CheckOutlined />} />
            <Button
              type="primary"
              danger
              onClick={handleCancelEdit}
              icon={<CloseOutlined />}
            />
          </Form.Item>
        </Form>
      ) : (
        <Card
          actions={[
            <EditOutlined
              key="edit"
              onClick={() => setIsEditing(!isEditing)}
            />,
          ]}>
          <Descriptions column={1} title="Профиль" items={items} />
        </Card>
      )}
    </>
  );
}
export default ProfilePage;
