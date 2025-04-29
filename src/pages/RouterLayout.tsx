import { Outlet, Navigate } from 'react-router';
import MainNavigation from '../components/MainNavigation/MainNavigation';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { useEffect } from 'react';

import { Layout } from 'antd';
import { fetchUser } from '../store/userSlice';
const { Header, Footer, Sider, Content } = Layout;

function RootLayout() {
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);
  const tokenExpiration = useAppSelector((state) => state.auth.tokenExpiration);
  const isExpiredToken = tokenExpiration && Date.now() > tokenExpiration;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (!refreshToken || isExpiredToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout
      style={{ minHeight: '100vh', maxWidth: '1600px', margin: '0 auto' }}>
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
