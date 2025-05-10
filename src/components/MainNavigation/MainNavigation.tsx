import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { useAppSelector } from '../../store/hooks';

export default function MainNavigation() {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || 'todolist';
  const userRoles = useAppSelector((state) => state.user?.userData?.roles);
  const isAdmin = userRoles?.includes('ADMIN');
  const isModerator = userRoles?.includes('MODERATOR');

  return (
    <Menu
      style={{ backgroundColor: 'inherit', minHeight: '100%' }}
      mode="inline"
      selectedKeys={[currentPath]}
      items={[
        {
          key: 'todolist',
          label: (
            <NavLink to="/todolist" end>
              Cписок задач
            </NavLink>
          ),
        },
        {
          key: 'profile',
          label: <NavLink to="/profile">Личный кабинет</NavLink>,
        },
        ...(isAdmin || isModerator
          ? [
              {
                key: 'users',
                label: <NavLink to="/users">Пользователи</NavLink>,
              },
            ]
          : []),
      ]}
    />
  );
}
