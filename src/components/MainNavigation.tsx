import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

export default function MainNavigation() {
  return (
    <Menu
      style={{ backgroundColor: 'inherit', minHeight: '100%' }}
      mode="inline"
      defaultSelectedKeys={['todolist']}
      items={[
        {
          key: 'todolist',
          label: (
            <NavLink to="todolist" end type='primary'>
              Todolist
            </NavLink>
          ),
        },
        {
          key: 'profile',
          label: <NavLink to="/profile">Profile</NavLink>,
        },
      ]}
    />
  );
}
