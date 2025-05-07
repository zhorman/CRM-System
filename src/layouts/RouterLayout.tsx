import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router';
import MainNavigation from '../components/MainNavigation/MainNavigation';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getTasks } from '../api/todoApi';
import { fetchUser } from '../store/userSlice';

import { Layout, Spin } from 'antd';
import { setAuthorized } from '../store/authSlice';
import { TaskFilters } from '../types/todos';
const { Header, Footer, Sider, Content } = Layout;

function RootLayout() {
  const dispatch = useAppDispatch();
  const refreshToken = localStorage.getItem('refreshToken');
  const [loading, setLoading] = useState(true);
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('запрос прав');
        await getTasks(TaskFilters.All);
        await dispatch(fetchUser());
        dispatch(setAuthorized(true));
      } catch (e) {
        console.log('Ошибка при обновлении токена');
        dispatch(setAuthorized(false));
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  if (!refreshToken || (!refreshToken && !isAuthorized)) {
    return <Navigate to="/login" replace />;
  }

  if (loading)
    return (
      <Spin tip="Loading" size="large" fullscreen>
        <p />
      </Spin>
    );

  return (
    <Layout
      style={{ minHeight: '100vh', maxWidth: '1650px', margin: '0 auto' }}>
      <Header style={{ backgroundColor: 'inherit', textAlign: 'center' }}>
        Header
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            backgroundColor: 'inherit',
          }}>
          <MainNavigation />
        </Sider>
        <Content style={{ flexGrow: 1, padding: '1rem' }}>
          <Outlet />
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Footer</Footer>
    </Layout>
  );
}

export default RootLayout;
