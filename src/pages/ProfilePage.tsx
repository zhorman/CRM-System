import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/authSlice';

import {
  Card,
  Descriptions,
  Button,
  Flex,
  DescriptionsProps,
  Spin,
} from 'antd';

function ProfilePage() {
  const user = useAppSelector((state) => state.user.userData);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return (
      <>
        <Card>
          <Spin tip="Loading">
            <p />
          </Spin>
        </Card>
        <Button onClick={handleLogout}>Logout</Button>
      </>
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
