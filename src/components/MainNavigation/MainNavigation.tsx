import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

export default function MainNavigation() {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || 'todolist';

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
      ]}
    />
  );
}
