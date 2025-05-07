import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getUserById, updateUser } from '../api/usersApi';

import {
  Card,
  Descriptions,
  DescriptionsProps,
  Form,
  Input,
  Button,
  Flex,
} from 'antd';
import { MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH } from '../utils/constants';

interface User {
  username: string;
  email: string;
  phoneNumber: string;
}

function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchUserById = async () => {
    if (id) {
      const data = await getUserById(id);
      setUser(data);
    } else {
      console.error('ID пользователя не найден');
    }
  };

  useEffect(() => {
    fetchUserById();
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

  function onFieldsChange() {}

  async function onFinish() {
    if (!id) {
      console.error('ID пользователя не найден');
      return;
    }
    const changedFields = form.getFieldsValue(true, (meta) => meta.touched);
    await updateUser(id, changedFields);
    await fetchUserById();
    setIsEditing(false);
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  return (
    <>
      {!isEditing ? (
        <Card
          actions={[
            <Button
              key="edit"
              onClick={() => {
                form.setFieldsValue(user);
                setIsEditing(true);
              }}>
              Редактировать
            </Button>,
          ]}>
          <Descriptions column={1} title="Профиль" items={items} />
        </Card>
      ) : (
        <Card>
          <Form
            form={form}
            name="taksItemForm"
            onFieldsChange={onFieldsChange}
            onFinish={onFinish}
            colon={false}>
            <Form.Item
              name="username"
              label="Имя пользователя"
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
              name="email"
              label="Email"
              rules={[
                {
                  type: 'email',
                  message: 'Некорректный E-mail!',
                },
                {
                  required: true,
                  message: 'Введите ваш E-mail!',
                },
              ]}>
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Номер телефона"
              rules={[
                { message: 'Введите номер телефона!' },
                {
                  pattern: /^\+\d{11}$/,
                  message: 'Номер в формате +79991234567',
                },
              ]}>
              <Input type="text" />
            </Form.Item>
            <Form.Item style={{ gap: '10px' }}>
              <Flex gap="small">
                <Button type="primary" htmlType="submit">
                  Сохранить
                </Button>
                <Button danger onClick={handleCancelEdit}>
                  Отменить
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Card>
      )}
      <Button
        color="primary"
        variant="outlined"
        onClick={() => navigate('/users')}>
        Вернуться к таблице
      </Button>
    </>
  );
}
export default ProfilePage;
