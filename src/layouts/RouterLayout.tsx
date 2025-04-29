import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router';
import MainNavigation from '../components/MainNavigation/MainNavigation';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { tokenManager } from '../utils/tokenManager';
import { getTasks } from '../api/todoApi';

import { Layout, Spin } from 'antd';
import { setAuthorized } from '../store/authSlice';
import { TaskFilters } from '../types/todos';
const { Header, Footer, Sider, Content } = Layout;

function RootLayout() {
  const dispatch = useAppDispatch();
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);
  const [loading, setLoading] = useState(true);
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  useEffect(() => {
    const initAuth = async () => {
      if (!tokenManager.get() && refreshToken) {
        try {
          await getTasks(TaskFilters.All);

          dispatch(setAuthorized(true));
        } catch (e) {
          console.warn('Ошибка при обновлении токена');
          dispatch(setAuthorized(false));
        }
      } else {
        dispatch(setAuthorized(!!tokenManager.get()));
      }
      setLoading(false);
    };

    initAuth();
  }, [refreshToken]);

  if (loading)
    return (
      <Spin tip="Loading" size="large" fullscreen>
        <p />
      </Spin>
    );

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout
      style={{ minHeight: '100vh', maxWidth: '1200px', margin: '0 auto' }}>
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
