import { getUser } from '../api/usersApi';
import { useAppDispatch } from '../store/hooks';
import { useEffect, useState } from 'react';
import { logout } from '../store/authSlice';
import { ProfileResponse } from '../types/user';

import {
  Card,
  Descriptions,
  Button,
  Flex,
  DescriptionsProps,
  Spin,
} from 'antd';

function ProfilePage() {
  const [user, setUser] = useState<ProfileResponse | null>(null);

  const dispatch = useAppDispatch();

  const fetchUserData = async () => {
    try {
      const data = await getUser();
      setUser(data);
    } catch (error) {
      console.log('ошибка fetchUserData', error);
    }
  };

  useEffect(() => {
    console.log('Монтируется профиль', user);
    fetchUserData();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return (
      <Card>
        <Spin tip="Loading">
          <p />
        </Spin>
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

  return (
    <>
      <Flex vertical align="start" gap={10}>
        <Card>
          <Descriptions column={1} title="Профиль" items={items} />
        </Card>
        <Button
          type="primary"
          danger
          onClick={handleLogout}
          style={{ alignSelf: 'end' }}>
          Logout
        </Button>
      </Flex>
    </>
  );
}
export default ProfilePage;
